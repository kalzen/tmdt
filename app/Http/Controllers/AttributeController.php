<?php

namespace App\Http\Controllers;

use App\Models\Attribute;
use App\Models\AttributeValue;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Illuminate\Support\Str;

class AttributeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $filters = $request->only(['search', 'type', 'is_filterable', 'per_page']);
        $per_page = $filters['per_page'] ?? 10;
        
        $query = Attribute::query()
            ->withCount('values');
            
        // Search by name or code
        if ($request->filled('search')) {
            $query->where(function ($q) use ($request) {
                $q->where('name', 'like', '%' . $request->search . '%')
                  ->orWhere('code', 'like', '%' . $request->search . '%');
            });
        }
        
        // Filter by type
        if ($request->filled('type')) {
            $query->where('type', $request->type);
        }
        
        // Filter by filterable status
        if ($request->filled('is_filterable')) {
            $query->where('is_filterable', $request->is_filterable === 'true');
        }
        
        // Get the attributes
        $attributes = $query->orderBy('display_order')
            ->paginate($per_page)
            ->withQueryString();
            
        return Inertia::render('Attributes/Index', [
            'attributes' => $attributes,
            'filters' => $filters,
            'types' => [
                ['value' => 'text', 'label' => 'Text'],
                ['value' => 'textarea', 'label' => 'Textarea'],
                ['value' => 'select', 'label' => 'Select'],
                ['value' => 'multiselect', 'label' => 'Multi-select'],
                ['value' => 'radio', 'label' => 'Radio Buttons'],
            ]
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Attributes/Create', [
            'types' => [
                ['value' => 'text', 'label' => 'Text'],
                ['value' => 'textarea', 'label' => 'Textarea'],
                ['value' => 'select', 'label' => 'Select'],
                ['value' => 'multiselect', 'label' => 'Multi-select'],
                ['value' => 'radio', 'label' => 'Radio Buttons'],
            ]
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'name' => 'required|string|max:255|unique:attributes,name',
                'code' => 'nullable|string|max:255|unique:attributes,code',
                'type' => 'required|in:text,textarea,select,multiselect,radio',
                'is_filterable' => 'boolean',
                'is_required' => 'boolean',
                'display_order' => 'nullable|integer|min:0',
                'is_active' => 'boolean',
                'values' => 'nullable|array',
                'values.*.value' => 'required|string|max:255',
                'values.*.color_code' => 'nullable|string|max:7',
            ]);
            
            // Generate code from name if not provided
            if (empty($validated['code'])) {
                $validated['code'] = Str::slug($validated['name']);
            }
            
            // Start a database transaction
            DB::beginTransaction();
            
            // Create the attribute
            $attribute = Attribute::create([
                'name' => $validated['name'],
                'code' => $validated['code'],
                'type' => $validated['type'],
                'is_filterable' => $validated['is_filterable'] ?? false,
                'is_required' => $validated['is_required'] ?? false,
                'display_order' => $validated['display_order'] ?? 0,
                'is_active' => $validated['is_active'] ?? true,
            ]);
            
            // Create attribute values if provided and if the type supports values
            if (in_array($validated['type'], ['select', 'multiselect', 'radio']) && !empty($validated['values'])) {
                foreach ($validated['values'] as $valueData) {
                    $attribute->values()->create([
                        'value' => $valueData['value'],
                        'color_code' => $valueData['color_code'] ?? null,
                    ]);
                }
            }
            
            // Commit the transaction
            DB::commit();
            
            return redirect()->route('attributes.index')->with([
                'toast' => true,
                'toast.type' => 'success',
                'toast.message' => 'Attribute created successfully',
            ]);
        } catch (\Exception $e) {
            // Rollback the transaction in case of errors
            DB::rollBack();
            Log::error('Error creating attribute: ' . $e->getMessage());
            
            return back()->with([
                'toast' => true,
                'toast.type' => 'error',
                'toast.message' => 'Error creating attribute: ' . $e->getMessage(),
            ])->withInput();
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Attribute $attribute)
    {
        $attribute->load('values');
        
        return Inertia::render('Attributes/Show', [
            'attribute' => $attribute,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Attribute $attribute)
    {
        $attribute->load('values');
        
        return Inertia::render('Attributes/Edit', [
            'attribute' => $attribute,
            'types' => [
                ['value' => 'text', 'label' => 'Text'],
                ['value' => 'textarea', 'label' => 'Textarea'],
                ['value' => 'select', 'label' => 'Select'],
                ['value' => 'multiselect', 'label' => 'Multi-select'],
                ['value' => 'radio', 'label' => 'Radio Buttons'],
            ]
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Attribute $attribute)
    {
        try {
            $validated = $request->validate([
                'name' => 'required|string|max:255|unique:attributes,name,' . $attribute->id,
                'code' => 'nullable|string|max:255|unique:attributes,code,' . $attribute->id,
                'type' => 'required|in:text,textarea,select,multiselect,radio',
                'is_filterable' => 'boolean',
                'is_required' => 'boolean',
                'display_order' => 'nullable|integer|min:0',
                'is_active' => 'boolean',
                'values' => 'nullable|array',
                'values.*.id' => 'nullable|exists:attribute_values,id',
                'values.*.value' => 'required|string|max:255',
                'values.*.color_code' => 'nullable|string|max:7',
                'values.*._action' => 'nullable|in:create,update,delete',
            ]);
            
            // Generate code from name if not provided
            if (empty($validated['code'])) {
                $validated['code'] = Str::slug($validated['name']);
            }
            
            // Start a database transaction
            DB::beginTransaction();
            
            // Update the attribute
            $attribute->update([
                'name' => $validated['name'],
                'code' => $validated['code'],
                'type' => $validated['type'],
                'is_filterable' => $validated['is_filterable'] ?? false,
                'is_required' => $validated['is_required'] ?? false,
                'display_order' => $validated['display_order'] ?? 0,
                'is_active' => $validated['is_active'] ?? true,
            ]);
            
            // Handle attribute values if the type supports values
            if (in_array($validated['type'], ['select', 'multiselect', 'radio'])) {
                if (!empty($validated['values'])) {
                    foreach ($validated['values'] as $valueData) {
                        $action = $valueData['_action'] ?? 'update';
                        
                        if ($action === 'delete' && !empty($valueData['id'])) {
                            // Delete the value
                            AttributeValue::find($valueData['id'])->delete();
                        } elseif ($action === 'create' || empty($valueData['id'])) {
                            // Create a new value
                            $attribute->values()->create([
                                'value' => $valueData['value'],
                                'color_code' => $valueData['color_code'] ?? null,
                            ]);
                        } else {
                            // Update the value
                            AttributeValue::find($valueData['id'])->update([
                                'value' => $valueData['value'],
                                'color_code' => $valueData['color_code'] ?? null,
                            ]);
                        }
                    }
                } else if ($request->has('clear_values') && $request->clear_values) {
                    // If clear_values is true, delete all values
                    $attribute->values()->delete();
                }
            } else {
                // If the type doesn't support values, remove all existing values
                $attribute->values()->delete();
            }
            
            // Commit the transaction
            DB::commit();
            
            return redirect()->route('attributes.index')->with([
                'toast' => true,
                'toast.type' => 'success',
                'toast.message' => 'Attribute updated successfully',
            ]);
        } catch (\Exception $e) {
            // Rollback the transaction in case of errors
            DB::rollBack();
            Log::error('Error updating attribute: ' . $e->getMessage());
            
            return back()->with([
                'toast' => true,
                'toast.type' => 'error',
                'toast.message' => 'Error updating attribute: ' . $e->getMessage(),
            ])->withInput();
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Attribute $attribute)
    {
        try {
            // Check if the attribute is used in any products
            $usageCount = $attribute->productAttributes()->count();
            
            if ($usageCount > 0) {
                return back()->with([
                    'toast' => true,
                    'toast.type' => 'error',
                    'toast.message' => "Cannot delete attribute. It's used in {$usageCount} products.",
                ]);
            }
            
            // Start a database transaction
            DB::beginTransaction();
            
            // Delete attribute values first
            $attribute->values()->delete();
            
            // Delete the attribute
            $attribute->delete();
            
            // Commit the transaction
            DB::commit();
            
            return redirect()->route('attributes.index')->with([
                'toast' => true,
                'toast.type' => 'success',
                'toast.message' => 'Attribute deleted successfully',
            ]);
        } catch (\Exception $e) {
            // Rollback the transaction in case of errors
            DB::rollBack();
            Log::error('Error deleting attribute: ' . $e->getMessage());
            
            return back()->with([
                'toast' => true,
                'toast.type' => 'error',
                'toast.message' => 'Error deleting attribute: ' . $e->getMessage(),
            ]);
        }
    }
}
