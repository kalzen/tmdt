<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Catalogue;
use App\Models\Store;
use App\Models\Attribute;
use App\Models\AttributeValue;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Str;
use Inertia\Inertia;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $filters = $request->only(['search', 'catalogue_id', 'status', 'sort', 'per_page']);
        $per_page = $filters['per_page'] ?? 10;
        
        $query = Product::query()
            ->with(['catalogue:id,name,parent_id,level', 'store:id,name'])
            ->withCount('catalogues')
            ->withCount('media');
        
        // If user is not admin, limit to viewing only products from their own store
        if (!Auth::user()->is_admin) {
            // Get the user's store
            $userStore = Auth::user()->store;
            if ($userStore) {
                $query->where('store_id', $userStore->id);
            } else {
                // If user has no store, show no products
                $query->where('id', 0);
            }
        }
        
        // Tìm kiếm theo tên, mã sản phẩm
        if ($request->filled('search')) {
            $query->where(function ($q) use ($request) {
                $q->where('title', 'like', '%' . $request->search . '%')
                   ->orWhere('sku', 'like', '%' . $request->search . '%')
                   ->orWhere('description', 'like', '%' . $request->search . '%');
            });
        }
        
        // Lọc theo danh mục
        if ($request->filled('catalogue_id')) {
            $query->where('catalogue_id', $request->catalogue_id);
        }
        
        // Lọc theo trạng thái
        if ($request->filled('status')) {
            if ($request->status === 'active') {
                $query->where('is_active', true);
            } elseif ($request->status === 'inactive') {
                $query->where('is_active', false);
            }
        }
        
        // Sắp xếp
        if ($request->filled('sort')) {
            [$column, $direction] = explode('|', $request->sort);
            $query->orderBy($column, $direction);
        } else {
            $query->latest();
        }
        
        $products = $query->paginate($per_page)->withQueryString();
        
        // Add thumbnail URL to each product
        $products->getCollection()->transform(function ($product) {
            $product->thumbnail_url = $product->getFirstMediaUrl('thumbnail');
            return $product;
        });
        
        // Lấy danh sách danh mục cho bộ lọc
        $catalogues = Catalogue::select('id', 'name', 'parent_id', 'level')
            ->orderBy('level', 'asc')
            ->orderBy('name', 'asc')
            ->get();
            
        return Inertia::render('Products/Index', [
            'products' => $products,
            'filters' => $filters,
            'catalogues' => $catalogues,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        // Fetch only top-level categories and their children
        $rootCatalogues = Catalogue::whereNull('parent_id')
            ->where('is_active', true)
            ->with(['children' => function($query) {
                $query->where('is_active', true)
                    ->with(['children' => function($q) {
                        $q->where('is_active', true);
                    }]);
            }])
            ->orderBy('position')
            ->get()
            ->map(function ($catalogue) {
                return [
                    'id' => $catalogue->id,
                    'name' => $catalogue->name,
                    'level' => 0,
                    'children' => $catalogue->children->map(function ($child) {
                        return [
                            'id' => $child->id,
                            'name' => $child->name,
                            'level' => 1,
                            'children' => $child->children->map(function ($grandChild) {
                                return [
                                    'id' => $grandChild->id,
                                    'name' => $grandChild->name,
                                    'level' => 2,
                                ];
                            }),
                        ];
                    }),
                ];
            });
            
        // For compatibility with existing code, also create a flat list
        $allCatalogues = Catalogue::select('id', 'name', 'parent_id', 'level')
            ->where('is_active', true)
            ->orderBy('level')
            ->orderBy('name')
            ->get()
            ->map(function ($catalogue) {
                $levelIndicator = $catalogue->level > 0 ? str_repeat('—', $catalogue->level) . ' ' : '';
                return [
                    'id' => $catalogue->id,
                    'name' => $levelIndicator . $catalogue->name,
                    'level' => $catalogue->level,
                    'parent_id' => $catalogue->parent_id,
                ];
            });
            
        // Nếu người dùng có gian hàng, lấy danh sách gian hàng của họ
        $user = Auth::user();
        $stores = [];
        $defaultStoreId = null;
        
        if ($user->is_admin) {
            // Nếu là admin, hiển thị tất cả các gian hàng
            $stores = Store::select('id', 'name')->orderBy('name')->get();
        } elseif ($user->store) {
            // Nếu là chủ gian hàng, chỉ hiển thị gian hàng của họ và đặt làm mặc định
            $stores = [$user->store];
            $defaultStoreId = $user->store->id;
        }
        
        // Lấy danh sách thuộc tính
        $attributes = Attribute::with('values')
            ->where('is_active', true)
            ->orderBy('display_order')
            ->get();
            
        return Inertia::render('Products/Create', [
            'catalogues' => $allCatalogues,
            'catalogueTree' => $rootCatalogues,
            'stores' => $stores,
            'attributes' => $attributes,
            'defaultStoreId' => $defaultStoreId,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'sku' => 'nullable|string|max:100|unique:products,sku',
            'description' => 'nullable|string',
            'content' => 'nullable|string',
            'price' => 'required|numeric|min:0',
            'sale_price' => 'nullable|numeric|min:0|lt:price',
            'stock_quantity' => 'required|integer|min:0',
            'catalogue_id' => 'required|exists:catalogues,id',
            'catalogue_ids' => 'nullable|array',
            'catalogue_ids.*' => 'exists:catalogues,id',
            'store_id' => 'nullable|exists:stores,id',
            'is_active' => 'boolean',
            'is_featured' => 'boolean',
            'meta_title' => 'nullable|string|max:255',
            'meta_description' => 'nullable|string',
            'thumbnail' => 'nullable|image|max:2048',
            'gallery.*' => 'nullable|image|max:2048',
            'attributes' => 'nullable|array',
        ]);

        try {
            // Tạo slug từ tiêu đề
            $slug = Str::slug($request->title);
            
            // Kiểm tra xem slug đã tồn tại chưa, nếu có thì thêm timestamp
            $count = Product::where('slug', $slug)->count();
            if ($count > 0) {
                $slug = $slug . '-' . time();
            }
            
            // Xác định store_id - với server-side validation
            if (Auth::user()->is_admin) {
                // Admin can choose any store
                $store_id = $request->store_id;
                if (!$store_id) {
                    return back()->withInput()->with([
                        'toast' => true,
                        'toast.type' => 'error',
                        'toast.message' => 'Please select a store for this product'
                    ]);
                }
            } else {
                // Non-admin users can only use their own store
                $store_id = Auth::user()->store?->id;
                if (!$store_id) {
                    return back()->withInput()->with([
                        'toast' => true,
                        'toast.type' => 'error',
                        'toast.message' => 'You need to have a store to create products'
                    ]);
                }
                
                // If store_id was passed in request but doesn't match the user's store, reject it
                if ($request->store_id && $request->store_id != $store_id) {
                    return Inertia::render('errors/not-found');
                }
            }
            
            // Ensure we have catalogue_ids array, at minimum containing the primary catalogue_id
            $catalogueIds = $request->catalogue_ids ?? [];
            if (!in_array($request->catalogue_id, $catalogueIds)) {
                $catalogueIds[] = $request->catalogue_id;
            }
            
            // Create product
            $product = Product::create([
                'title' => $request->title,
                'slug' => $slug,
                'sku' => $request->sku,
                'description' => $request->description,
                'content' => $request->content,
                'price' => $request->price,
                'sale_price' => $request->sale_price,
                'stock_quantity' => $request->stock_quantity,
                'catalogue_id' => $request->catalogue_id, // Keep primary catalogue
                'user_id' => Auth::id(),
                'store_id' => $store_id,
                'is_active' => $request->is_active ?? true,
                'is_featured' => $request->is_featured ?? false,
                'meta_title' => $request->meta_title,
                'meta_description' => $request->meta_description,
            ]);
            
            // Sync catalogues
            $product->catalogues()->sync($catalogueIds);
            
            // Xử lý thuộc tính nếu có
            if ($request->has('attributes') && is_array($request->attributes)) {
                foreach ($request->attributes as $attributeId => $value) {
                    if (!empty($value)) {
                        $product->attributes()->create([
                            'attribute_id' => $attributeId,
                            'text_value' => is_array($value) ? implode(',', $value) : $value,
                        ]);
                    }
                }
            }
            
            // Upload ảnh đại diện
            if ($request->hasFile('thumbnail')) {
                $product->addMediaFromRequest('thumbnail')
                    ->toMediaCollection('thumbnail');
            }
            
            // Upload gallery
            if ($request->hasFile('gallery')) {
                foreach ($request->file('gallery') as $image) {
                    $product->addMedia($image)
                        ->toMediaCollection('gallery');
                }
            }
            
            return Redirect::route('products.index')->with([
                'toast' => true,
                'toast.type' => 'success',
                'toast.message' => 'Product created successfully!'
            ]);
        } catch (\Exception $e) {
            Log::error('Error creating product: ' . $e->getMessage());
            
            return back()->with([
                'toast' => true,
                'toast.type' => 'error',
                'toast.message' => 'Error creating product: ' . $e->getMessage()
            ])->withInput();
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Product $product)
    {
        // Check if user can view this product
        if (!Auth::user()->is_admin) {
            $userStore = Auth::user()->store;
            if (!$userStore || $product->store_id !== $userStore->id) {
                return Inertia::render('errors/not-found');
            }
        }

        $product->load(['catalogue', 'user', 'store', 'attributes.attribute', 'catalogues']);
        
        // Lấy media
        $product->thumbnail = $product->getFirstMediaUrl('thumbnail');
        $product->gallery = $product->getMedia('gallery')->map(function ($media) {
            return [
                'id' => $media->id,
                'url' => $media->getUrl(),
                'name' => $media->name,
            ];
        });
        
        return Inertia::render('Products/Show', [
            'product' => $product
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Product $product)
    {
        // Check if user can edit this product
        if (!Auth::user()->is_admin) {
            $userStore = Auth::user()->store;
            if (!$userStore || $product->store_id !== $userStore->id) {
                return Inertia::render('errors/not-found');
            }
        }

        // Fetch only top-level categories and their children
        $rootCatalogues = Catalogue::whereNull('parent_id')
            ->where('is_active', true)
            ->with(['children' => function($query) {
                $query->where('is_active', true)
                    ->with(['children' => function($q) {
                        $q->where('is_active', true);
                    }]);
            }])
            ->orderBy('position')
            ->get()
            ->map(function ($catalogue) {
                return [
                    'id' => $catalogue->id,
                    'name' => $catalogue->name,
                    'level' => 0,
                    'children' => $catalogue->children->map(function ($child) {
                        return [
                            'id' => $child->id,
                            'name' => $child->name,
                            'level' => 1,
                            'children' => $child->children->map(function ($grandChild) {
                                return [
                                    'id' => $grandChild->id,
                                    'name' => $grandChild->name,
                                    'level' => 2,
                                ];
                            }),
                        ];
                    }),
                ];
            });
            
        // For compatibility, also include the flattened list
        $allCatalogues = Catalogue::select('id', 'name', 'parent_id', 'level')
            ->where('is_active', true)
            ->orderBy('level', 'asc')
            ->orderBy('name', 'asc')
            ->get()
            ->map(function ($catalogue) {
                // Tạo tên hiển thị với indent cho cấp độ
                $levelIndicator = $catalogue->level > 0 ? str_repeat('—', $catalogue->level) . ' ' : '';
                return [
                    'id' => $catalogue->id,
                    'name' => $levelIndicator . $catalogue->name,
                    'level' => $catalogue->level,
                    'parent_id' => $catalogue->parent_id,
                ];
            });
            
        // Nếu người dùng có gian hàng, lấy danh sách gian hàng của họ
        $user = Auth::user();
        $stores = [];
        
        if ($user->is_admin) {
            // Nếu là admin, hiển thị tất cả các gian hàng
            $stores = Store::select('id', 'name')->orderBy('name')->get();
        } elseif ($user->store) {
            // Nếu là chủ gian hàng, chỉ hiển thị gian hàng của họ
            $stores = [$user->store];
        }
        
        // Lấy thông tin thuộc tính
        $attributes = Attribute::with('values')
            ->where('is_active', true)
            ->orderBy('display_order')
            ->get();
            
        // Lấy giá trị thuộc tính hiện tại của sản phẩm
        $productAttributes = $product->attributes()
            ->with('attribute')
            ->get()
            ->keyBy('attribute_id')
            ->map(function ($item) {
                return $item->text_value;
            })
            ->toArray();
            
        // Lấy media
        $thumbnailUrl = $product->getFirstMediaUrl('thumbnail');
        $gallery = $product->getMedia('gallery')->map(function ($media) {
            return [
                'id' => $media->id,
                'url' => $media->getUrl(),
                'name' => $media->name,
            ];
        });
        
        return Inertia::render('Products/Edit', [
            'product' => array_merge($product->toArray(), [
                'thumbnail' => $thumbnailUrl,
                'gallery' => $gallery,
                'catalogues' => $product->catalogues()->select('catalogues.id', 'name', 'level')->get(), // Fix the column ambiguity by specifying the table name
            ]),
            'catalogues' => $allCatalogues,
            'catalogueTree' => $rootCatalogues,
            'stores' => $stores,
            'attributes' => $attributes,
            'productAttributes' => $productAttributes,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Product $product)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'sku' => 'nullable|string|max:100|unique:products,sku,' . $product->id,
            'description' => 'nullable|string',
            'content' => 'nullable|string',
            'price' => 'required|numeric|min:0',
            'sale_price' => 'nullable|numeric|min:0|lt:price',
            'stock_quantity' => 'required|integer|min:0',
            'catalogue_id' => 'required|exists:catalogues,id',
            'catalogue_ids' => 'nullable|array',
            'catalogue_ids.*' => 'exists:catalogues,id',
            'store_id' => 'nullable|exists:stores,id',
            'is_active' => 'boolean',
            'is_featured' => 'boolean',
            'meta_title' => 'nullable|string|max:255',
            'meta_description' => 'nullable|string',
            'thumbnail' => 'nullable|image|max:2048',
            'attributes' => 'nullable|array',
        ]);

        try {
            // Xác định store_id with security check
            if (Auth::user()->is_admin) {
                // Admin can choose any store or keep the current one
                $store_id = $request->store_id ?? $product->store_id;
            } else {
                // Non-admin users can only use their own store
                $userStoreId = Auth::user()->store?->id;
                
                // If the product doesn't belong to the user's store or user has no store, reject it
                if (!$userStoreId || $product->store_id !== $userStoreId) {
                    return Inertia::render('errors/not-found');
                }
                
                // If store_id was passed in request but doesn't match the user's store, reject it
                if ($request->has('store_id') && $request->store_id != $userStoreId) {
                    return Inertia::render('errors/not-found');
                }
                
                // Always use the user's store id
                $store_id = $userStoreId;
            }
            
            // Ensure we have catalogue_ids array, at minimum containing the primary catalogue_id
            $catalogueIds = $request->catalogue_ids ?? [];
            if (!in_array($request->catalogue_id, $catalogueIds)) {
                $catalogueIds[] = $request->catalogue_id;
            }
            
            // Cập nhật sản phẩm
            $product->update([
                'title' => $request->title,
                'sku' => $request->sku,
                'description' => $request->description,
                'content' => $request->content,
                'price' => $request->price,
                'sale_price' => $request->sale_price,
                'stock_quantity' => $request->stock_quantity,
                'catalogue_id' => $request->catalogue_id, // Keep primary catalogue
                'store_id' => $store_id,
                'is_active' => $request->is_active ?? $product->is_active,
                'is_featured' => $request->is_featured ?? $product->is_featured,
                'meta_title' => $request->meta_title,
                'meta_description' => $request->meta_description,
            ]);
            
            // Sync catalogues
            $product->catalogues()->sync($catalogueIds);
            
            // Cập nhật thuộc tính
            if ($request->has('attributes') && is_array($request->attributes)) {
                // Xóa thuộc tính cũ
                $product->attributes()->delete();
                
                // Thêm thuộc tính mới
                foreach ($request->attributes as $attributeId => $value) {
                    if (!empty($value)) {
                        $product->attributes()->create([
                            'attribute_id' => $attributeId,
                            'text_value' => is_array($value) ? implode(',', $value) : $value,
                        ]);
                    }
                }
            }
            
            // Upload ảnh đại diện mới nếu có
            if ($request->hasFile('thumbnail')) {
                $product->clearMediaCollection('thumbnail');
                $product->addMediaFromRequest('thumbnail')
                    ->toMediaCollection('thumbnail');
            }
            
            // Upload gallery mới nếu có
            if ($request->hasFile('gallery')) {
                foreach ($request->file('gallery') as $image) {
                    $product->addMedia($image)
                        ->toMediaCollection('gallery');
                }
            }
            
            return Redirect::route('products.index')->with([
                'toast' => true,
                'toast.type' => 'success',
                'toast.message' => 'Product updated successfully!'
            ]);
        } catch (\Exception $e) {
            Log::error('Error updating product: ' . $e->getMessage());
            
            return back()->with([
                'toast' => true,
                'toast.type' => 'error',
                'toast.message' => 'Error updating product: ' . $e->getMessage()
            ])->withInput();
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product)
    {
        try {
            // Xóa media
            $product->clearMediaCollection('thumbnail');
            $product->clearMediaCollection('gallery');
            
            // Xóa các thuộc tính liên quan
            $product->attributes()->delete();
            
            // Xóa sản phẩm
            $product->delete();
            
            return Redirect::route('products.index')->with([
                'toast' => true,
                'toast.type' => 'success',
                'toast.message' => 'Product deleted successfully!'
            ]);
        } catch (\Exception $e) {
            Log::error('Error deleting product: ' . $e->getMessage());
            
            return back()->with([
                'toast' => true,
                'toast.type' => 'error',
                'toast.message' => 'Error deleting product: ' . $e->getMessage()
            ]);
        }
    }
    
    /**
     * Delete a media item from gallery
     */
    public function deleteMedia(Request $request, Product $product)
    {
        try {
            $mediaId = $request->input('media_id');
            $media = $product->getMedia('gallery')->firstWhere('id', $mediaId);
            
            if ($media) {
                $media->delete();
                return response()->json(['success' => true]);
            }
            
            return response()->json(['success' => false, 'message' => 'Media not found'], 404);
        } catch (\Exception $e) {
            Log::error('Error deleting media: ' . $e->getMessage());
            return response()->json(['success' => false, 'message' => $e->getMessage()], 500);
        }
    }
}
