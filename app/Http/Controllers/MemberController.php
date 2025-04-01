<?php

namespace App\Http\Controllers;

use App\Models\Member;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;
use Inertia\Inertia;

class MemberController extends Controller
{
    /**
     * Hiển thị danh sách thành viên
     */
    public function index()
    {
        $members = Member::orderBy('sort_order')->get()->map(function ($member) {
            return [
                'id' => $member->id,
                'name' => $member->name,
                'position' => $member->position,
                'email' => $member->email,
                'phone' => $member->phone,
                'is_active' => $member->is_active,
                'avatar' => $member->getFirstMediaUrl('avatar'),
                'avatar_thumb' => $member->getFirstMediaUrl('avatar', 'thumb'),
                'sort_order' => $member->sort_order,
            ];
        });

        return Inertia::render('members/index', [
            'members' => $members
        ]);
    }

    /**
     * Hiển thị form tạo thành viên mới
     */
    public function create()
    {
        return Inertia::render('members/create');
    }

    /**
     * Lưu thành viên mới vào database
     */
    public function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'name' => 'required|string|max:255',
                'position' => 'nullable|string|max:255',
                'bio' => 'nullable|string',
                'email' => 'nullable|email|max:255',
                'phone' => 'nullable|string|max:20',
                'facebook' => 'nullable|string|max:255',
                'twitter' => 'nullable|string|max:255',
                'linkedin' => 'nullable|string|max:255',
                'instagram' => 'nullable|string|max:255',
                'is_active' => 'boolean',
                'avatar' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
                'sort_order' => 'nullable|integer',
            ]);

            // Tìm sort_order cao nhất và thêm 10
            if (empty($validated['sort_order'])) {
                $maxOrder = Member::max('sort_order') ?? 0;
                $validated['sort_order'] = $maxOrder + 10;
            }

            // Tạo thành viên mới
            $member = Member::create($validated);

            // Xử lý tải lên hình ảnh đại diện
            if ($request->hasFile('avatar')) {
                $member->addMediaFromRequest('avatar')
                    ->sanitizingFileName(function($fileName) {
                        return Str::slug(pathinfo($fileName, PATHINFO_FILENAME)) . '.' . pathinfo($fileName, PATHINFO_EXTENSION);
                    })
                    ->toMediaCollection('avatar');
                
                Log::info('Đã tải lên hình ảnh đại diện cho thành viên ID: ' . $member->id);
            }

            // Thiết lập flash message
            session()->flash('toast', true);
            session()->flash('toast.type', 'success');
            session()->flash('toast.message', 'Thành viên đã được tạo thành công');

            return redirect()->route('members.index');
            
        } catch (\Exception $e) {
            Log::error('Lỗi khi tạo thành viên: ' . $e->getMessage());
            
            return back()->with([
                'toast' => true,
                'toast.type' => 'error',
                'toast.message' => 'Có lỗi xảy ra khi tạo thành viên: ' . $e->getMessage()
            ])->withInput();
        }
    }

    /**
     * Hiển thị chi tiết thành viên
     */
    public function show(Member $member)
    {
        return Inertia::render('members/show', [
            'member' => [
                'id' => $member->id,
                'name' => $member->name,
                'position' => $member->position,
                'bio' => $member->bio,
                'email' => $member->email,
                'phone' => $member->phone,
                'facebook' => $member->facebook,
                'twitter' => $member->twitter,
                'linkedin' => $member->linkedin,
                'instagram' => $member->instagram,
                'is_active' => $member->is_active,
                'avatar' => $member->getFirstMediaUrl('avatar'),
                'avatar_medium' => $member->getFirstMediaUrl('avatar', 'medium'),
                'sort_order' => $member->sort_order,
            ]
        ]);
    }

    /**
     * Hiển thị form chỉnh sửa thành viên
     */
    public function edit(Member $member)
    {
        return Inertia::render('members/edit', [
            'member' => [
                'id' => $member->id,
                'name' => $member->name,
                'position' => $member->position,
                'bio' => $member->bio,
                'email' => $member->email,
                'phone' => $member->phone,
                'facebook' => $member->facebook,
                'twitter' => $member->twitter,
                'linkedin' => $member->linkedin,
                'instagram' => $member->instagram,
                'is_active' => $member->is_active,
                'avatar' => $member->getFirstMediaUrl('avatar'),
                'sort_order' => $member->sort_order,
            ]
        ]);
    }

    /**
     * Cập nhật thông tin thành viên
     */
    public function update(Request $request, Member $member)
    {
        try {
            $validated = $request->validate([
                'name' => 'required|string|max:255',
                'position' => 'nullable|string|max:255',
                'bio' => 'nullable|string',
                'email' => 'nullable|email|max:255',
                'phone' => 'nullable|string|max:20',
                'facebook' => 'nullable|string|max:255',
                'twitter' => 'nullable|string|max:255',
                'linkedin' => 'nullable|string|max:255',
                'instagram' => 'nullable|string|max:255',
                'is_active' => 'boolean',
                'avatar' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
                'sort_order' => 'nullable|integer',
            ]);

            // Cập nhật thành viên
            $member->update($validated);

            // Xử lý tải lên hình ảnh đại diện mới nếu có
            if ($request->hasFile('avatar')) {
                // Xóa hình ảnh cũ
                $member->clearMediaCollection('avatar');
                
                // Thêm hình ảnh mới
                $member->addMediaFromRequest('avatar')
                    ->sanitizingFileName(function($fileName) {
                        return Str::slug(pathinfo($fileName, PATHINFO_FILENAME)) . '.' . pathinfo($fileName, PATHINFO_EXTENSION);
                    })
                    ->toMediaCollection('avatar');
                
                Log::info('Đã cập nhật hình ảnh đại diện cho thành viên ID: ' . $member->id);
            }

            return redirect()->route('members.index')->with([
                'toast' => true,
                'toast.type' => 'success',
                'toast.message' => 'Thành viên đã được cập nhật thành công'
            ]);
            
        } catch (\Exception $e) {
            Log::error('Lỗi khi cập nhật thành viên: ' . $e->getMessage());
            
            return back()->with([
                'toast' => true,
                'toast.type' => 'error',
                'toast.message' => 'Có lỗi xảy ra khi cập nhật thành viên'
            ])->withInput();
        }
    }

    /**
     * Xóa thành viên
     */
    public function destroy(Member $member)
    {
        try {
            // Xóa tất cả media liên quan
            $member->clearMediaCollection('avatar');
            
            // Xóa thành viên (soft delete)
            $member->delete();
            
            return redirect()->route('members.index')->with([
                'toast' => true,
                'toast.type' => 'success',
                'toast.message' => 'Thành viên đã được xóa thành công'
            ]);
            
        } catch (\Exception $e) {
            Log::error('Lỗi khi xóa thành viên: ' . $e->getMessage());
            
            return back()->with([
                'toast' => true,
                'toast.type' => 'error',
                'toast.message' => 'Có lỗi xảy ra khi xóa thành viên'
            ]);
        }
    }
    
    /**
     * Cập nhật thứ tự sắp xếp của thành viên
     */
    public function updateOrder(Request $request)
    {
        $request->validate([
            'orders' => 'required|array',
            'orders.*.id' => 'required|exists:members,id',
            'orders.*.sort_order' => 'required|integer',
        ]);

        foreach ($request->orders as $item) {
            Member::where('id', $item['id'])->update(['sort_order' => $item['sort_order']]);
        }

        return response()->json(['message' => 'Thứ tự đã được cập nhật']);
    }
}
