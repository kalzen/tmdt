<?php

namespace App\Http\Controllers;

use App\Models\Store;
use App\Models\User;
use App\Models\Catalogue;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use Inertia\Inertia;

class StoreController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $filters = $request->only(['search', 'status', 'per_page']);
        $per_page = $filters['per_page'] ?? 10;
        
        $query = Store::query()
            ->with('user:id,name,email')
            ->withCount('products');
        
        // If user is not admin, limit to viewing only their own store
        if (!Auth::user()->is_admin) {
            $query->where('user_id', Auth::id());
        }
            
        // Search by name, description
        if ($request->filled('search')) {
            $query->where(function ($q) use ($request) {
                $q->where('name', 'like', '%' . $request->search . '%')
                  ->orWhere('description', 'like', '%' . $request->search . '%');
            });
        }
        
        // Filter by status
        if ($request->filled('status')) {
            if ($request->status === 'active') {
                $query->where('is_active', true);
            } elseif ($request->status === 'inactive') {
                $query->where('is_active', false);
            }
        }
        
        $stores = $query->orderBy('created_at', 'desc')
            ->paginate($per_page)
            ->withQueryString();
            
        // Format the data for the frontend with consistent structure
        $formattedData = [
            'data' => collect($stores->items())->map(function ($store) {
                return [
                    'id' => $store->id,
                    'name' => $store->name,
                    'slug' => $store->slug,
                    'is_active' => $store->is_active,
                    'is_featured' => $store->is_featured,
                    'products_count' => $store->products_count,
                    'user' => $store->user,
                    'created_at' => $store->created_at->format('Y-m-d H:i:s'),
                    'logo' => $store->getFirstMediaUrl('logo'),
                ];
            })->toArray(),
            'meta' => [
                'current_page' => $stores->currentPage(),
                'from' => $stores->firstItem() ?? 0,
                'last_page' => $stores->lastPage(),
                'per_page' => $stores->perPage(),
                'to' => $stores->lastItem() ?? 0,
                'total' => $stores->total(),
            ],
        ];
            
        return Inertia::render('Stores/Index', [
            'stores' => $formattedData,
            'filters' => $filters,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        // Only admin users can create new stores
        if (!Auth::user()->is_admin) {
            return Inertia::render('errors/not-found');
        }
        
        // Get users who don't have a store yet
        $users = User::doesntHave('store')
            ->where('is_admin', false)
            ->select('id', 'name', 'email')
            ->orderBy('name')
            ->get();
            
        // Get all categories for multiselect
        $catalogues = Catalogue::select('id', 'name', 'parent_id', 'level')
            ->orderBy('level', 'asc')
            ->orderBy('name', 'asc')
            ->get()
            ->map(function ($catalogue) {
                $levelIndicator = $catalogue->level > 0 ? str_repeat('—', $catalogue->level) . ' ' : '';
                return [
                    'id' => $catalogue->id,
                    'name' => $levelIndicator . $catalogue->name,
                    'level' => $catalogue->level,
                ];
            });
            
        return Inertia::render('Stores/Create', [
            'users' => $users,
            'catalogues' => $catalogues,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Only admin users can create new stores
        if (!Auth::user()->is_admin) {
            return Inertia::render('errors/not-found');
        }
        
        try {
            $validated = $request->validate([
                'name' => 'required|string|max:255|unique:stores,name',
                'slug' => 'nullable|string|max:255|unique:stores,slug',
                'description' => 'nullable|string',
                'user_id' => 'required|exists:users,id',
                'is_active' => 'boolean',
                'is_featured' => 'boolean',
                'address' => 'nullable|string|max:255',
                'city' => 'nullable|string|max:100',
                'state' => 'nullable|string|max:100',
                'postal_code' => 'nullable|string|max:20',
                'country' => 'nullable|string|max:100',
                'phone' => 'nullable|string|max:20',
                'email' => 'nullable|email|max:255',
                'logo' => 'nullable|image|max:2048',
                'banner' => 'nullable|image|max:2048',
                'meta_title' => 'nullable|string|max:255',
                'meta_description' => 'nullable|string',
                'catalogue_ids' => 'nullable|array',
                'catalogue_ids.*' => 'exists:catalogues,id',
                'tax_number' => 'nullable|string|max:50',
                'bio' => 'nullable|string',
            ]);
            
            // Generate slug if not provided
            if (empty($validated['slug'])) {
                $validated['slug'] = Str::slug($validated['name']);
            }
            
            // Start transaction
            DB::beginTransaction();
            
            // Create the store
            $store = Store::create([
                'name' => $validated['name'],
                'slug' => $validated['slug'],
                'description' => $validated['description'] ?? null,
                'user_id' => $validated['user_id'],
                'is_active' => $validated['is_active'] ?? true,
                'is_featured' => $validated['is_featured'] ?? false,
                'address' => $validated['address'] ?? null,
                'city' => $validated['city'] ?? null,
                'state' => $validated['state'] ?? null,
                'postal_code' => $validated['postal_code'] ?? null,
                'country' => $validated['country'] ?? null,
                'phone' => $validated['phone'] ?? null,
                'email' => $validated['email'] ?? null,
                'meta_title' => $validated['meta_title'] ?? null,
                'meta_description' => $validated['meta_description'] ?? null,
                'tax_number' => $validated['tax_number'] ?? null,
                'bio' => $validated['bio'] ?? null,
            ]);
            
            // Attach catalogues
            if (!empty($validated['catalogue_ids'])) {
                $store->catalogues()->attach($validated['catalogue_ids']);
            }
            
            // Upload logo
            if ($request->hasFile('logo')) {
                $store->addMediaFromRequest('logo')
                    ->toMediaCollection('logo');
            }
            
            // Upload banner
            if ($request->hasFile('banner')) {
                $store->addMediaFromRequest('banner')
                    ->toMediaCollection('banner');
            }
            
            // Commit transaction
            DB::commit();
            
            return redirect()->route('stores.index')->with([
                'toast' => true,
                'toast.type' => 'success',
                'toast.message' => 'Store created successfully!',
            ]);
        } catch (\Exception $e) {
            // Rollback transaction
            DB::rollBack();
            Log::error('Error creating store: ' . $e->getMessage());
            
            return back()->with([
                'toast' => true,
                'toast.type' => 'error',
                'toast.message' => 'Error creating store: ' . $e->getMessage(),
            ])->withInput();
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Store $store)
    {
        // Check if user can view this store
        if (!Auth::user()->is_admin && $store->user_id !== Auth::id()) {
            return Inertia::render('errors/not-found');
        }
        
        $store->load(['user:id,name,email', 'catalogues:id,name']);
        
        // Get media URLs
        $store->logo = $store->getFirstMediaUrl('logo');
        $store->banner = $store->getFirstMediaUrl('banner');
        
        // Get products count
        $productsCount = $store->products()->count();
        
        return Inertia::render('Stores/Show', [
            'store' => $store,
            'productsCount' => $productsCount,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Store $store)
    {
        // Check if user can edit this store
        if (!Auth::user()->is_admin && $store->user_id !== Auth::id()) {
            return Inertia::render('errors/not-found');
        }
        
        // Get users for dropdown (only for admin)
        $users = [];
        if (Auth::user()->is_admin) {
            $users = User::where('is_admin', false)
                ->where(function ($query) use ($store) {
                    $query->doesntHave('store')
                        ->orWhere('id', $store->user_id);
                })
                ->select('id', 'name', 'email')
                ->orderBy('name')
                ->get();
        }
        
        // Get all categories for multiselect
        $catalogues = Catalogue::select('id', 'name', 'parent_id', 'level')
            ->orderBy('level', 'asc')
            ->orderBy('name', 'asc')
            ->get()
            ->map(function ($catalogue) {
                $levelIndicator = $catalogue->level > 0 ? str_repeat('—', $catalogue->level) . ' ' : '';
                return [
                    'id' => $catalogue->id,
                    'name' => $levelIndicator . $catalogue->name,
                    'level' => $catalogue->level,
                ];
            });
            
        // Get media URLs
        $logoUrl = $store->getFirstMediaUrl('logo');
        $bannerUrl = $store->getFirstMediaUrl('banner');
        
        // Get the store's categories
        $storeCatalogueIds = $store->catalogues()->pluck('catalogues.id')->toArray();
        
        return Inertia::render('Stores/Edit', [
            'store' => array_merge($store->toArray(), [
                'logo' => $logoUrl,
                'banner' => $bannerUrl,
            ]),
            'users' => $users,
            'catalogues' => $catalogues,
            'storeCatalogueIds' => $storeCatalogueIds,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Store $store)
    {
        // Check if user can update this store
        if (!Auth::user()->is_admin && $store->user_id !== Auth::id()) {
            return Inertia::render('errors/not-found');
        }
        
        try {
            $validationRules = [
                'name' => 'required|string|max:255|unique:stores,name,' . $store->id,
                'slug' => 'nullable|string|max:255|unique:stores,slug,' . $store->id,
                'description' => 'nullable|string',
                'is_active' => 'boolean',
                'address' => 'nullable|string|max:255',
                'city' => 'nullable|string|max:100',
                'state' => 'nullable|string|max:100',
                'postal_code' => 'nullable|string|max:20',
                'country' => 'nullable|string|max:100',
                'phone' => 'nullable|string|max:20',
                'email' => 'nullable|email|max:255',
                'logo' => 'nullable|image|max:2048',
                'banner' => 'nullable|image|max:2048',
                'meta_title' => 'nullable|string|max:255',
                'meta_description' => 'nullable|string',
                'catalogue_ids' => 'nullable|array',
                'catalogue_ids.*' => 'exists:catalogues,id',
                'tax_number' => 'nullable|string|max:50',
                'bio' => 'nullable|string',
            ];
            
            // Only admin can change the store owner or featured status
            if (Auth::user()->is_admin) {
                $validationRules['user_id'] = 'required|exists:users,id';
                $validationRules['is_featured'] = 'boolean';
            }
            
            $validated = $request->validate($validationRules);
            
            // Generate slug if not provided
            if (empty($validated['slug'])) {
                $validated['slug'] = Str::slug($validated['name']);
            }
            
            // Start transaction
            DB::beginTransaction();
            
            // Prepare update data
            $updateData = [
                'name' => $validated['name'],
                'slug' => $validated['slug'],
                'description' => $validated['description'] ?? null,
                'is_active' => $validated['is_active'] ?? $store->is_active,
                'address' => $validated['address'] ?? null,
                'city' => $validated['city'] ?? null,
                'state' => $validated['state'] ?? null,
                'postal_code' => $validated['postal_code'] ?? null,
                'country' => $validated['country'] ?? null,
                'phone' => $validated['phone'] ?? null,
                'email' => $validated['email'] ?? null,
                'meta_title' => $validated['meta_title'] ?? null,
                'meta_description' => $validated['meta_description'] ?? null,
                'tax_number' => $validated['tax_number'] ?? null,
                'bio' => $validated['bio'] ?? null,
            ];
            
            // Only admin can update these fields
            if (Auth::user()->is_admin) {
                $updateData['user_id'] = $validated['user_id'];
                $updateData['is_featured'] = $validated['is_featured'] ?? $store->is_featured;
            }
            
            // Update the store
            $store->update($updateData);
            
            // Sync catalogues
            if (isset($validated['catalogue_ids'])) {
                $store->catalogues()->sync($validated['catalogue_ids']);
            }
            
            // Upload logo
            if ($request->hasFile('logo')) {
                $store->clearMediaCollection('logo');
                $store->addMediaFromRequest('logo')
                    ->toMediaCollection('logo');
            }
            
            // Upload banner
            if ($request->hasFile('banner')) {
                $store->clearMediaCollection('banner');
                $store->addMediaFromRequest('banner')
                    ->toMediaCollection('banner');
            }
            
            // Commit transaction
            DB::commit();
            
            return redirect()->route('stores.index')->with([
                'toast' => true,
                'toast.type' => 'success',
                'toast.message' => 'Store updated successfully!',
            ]);
        } catch (\Exception $e) {
            // Rollback transaction
            DB::rollBack();
            Log::error('Error updating store: ' . $e->getMessage());
            
            return back()->with([
                'toast' => true,
                'toast.type' => 'error',
                'toast.message' => 'Error updating store: ' . $e->getMessage(),
            ])->withInput();
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Store $store)
    {
        // Only admin users can delete stores
        if (!Auth::user()->is_admin) {
            return Inertia::render('errors/not-found');
        }
        
        try {
            // Check if store has products
            $productsCount = $store->products()->count();
            
            if ($productsCount > 0) {
                return back()->with([
                    'toast' => true,
                    'toast.type' => 'error',
                    'toast.message' => "Cannot delete store. It has {$productsCount} products attached.",
                ]);
            }
            
            // Start transaction
            DB::beginTransaction();
            
            // Remove media
            $store->clearMediaCollection('logo');
            $store->clearMediaCollection('banner');
            
            // Detach catalogues
            $store->catalogues()->detach();
            
            // Delete store
            $store->delete();
            
            // Commit transaction
            DB::commit();
            
            return redirect()->route('stores.index')->with([
                'toast' => true,
                'toast.type' => 'success',
                'toast.message' => 'Store deleted successfully!',
            ]);
        } catch (\Exception $e) {
            // Rollback transaction
            DB::rollBack();
            Log::error('Error deleting store: ' . $e->getMessage());
            
            return back()->with([
                'toast' => true,
                'toast.type' => 'error',
                'toast.message' => 'Error deleting store: ' . $e->getMessage(),
            ]);
        }
    }
}
