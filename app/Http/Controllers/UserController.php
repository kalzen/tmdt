<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;

class UserController extends Controller
{
    /**
     * Display a listing of users.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Inertia\Response
     */
    public function index(Request $request)
    {
        $filters = $request->only(['search', 'role', 'per_page']);
        $perPage = $filters['per_page'] ?? 10;

        $query = User::query();

        // Apply search filter
        if (isset($filters['search'])) {
            $query->where(function ($q) use ($filters) {
                $q->where('name', 'like', '%' . $filters['search'] . '%')
                  ->orWhere('email', 'like', '%' . $filters['search'] . '%');
            });
        }

        // Apply role filter
        if (isset($filters['role']) && $filters['role'] !== 'all') {
            switch ($filters['role']) {
                case 'admin':
                    $query->where('is_admin', true);
                    break;
                case 'gold':
                    $query->where('is_gold', true);
                    break;
                case 'regular':
                    $query->where('is_admin', false)->where('is_gold', false);
                    break;
            }
        }

        // Get users with pagination
        $users = $query->latest()->paginate($perPage);
        
        // Format the users for the frontend
        $formattedUsers = [
            'data' => collect($users->items())->map(function ($user) {
                return [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'is_admin' => $user->is_admin,
                    'is_gold' => $user->is_gold,
                    'created_at' => $user->created_at->format('Y-m-d H:i:s'),
                    'email_verified_at' => $user->email_verified_at ? $user->email_verified_at->format('Y-m-d H:i:s') : null,
                    'avatar' => $user->avatar_thumb_url,
                ];
            })->toArray(),
            'meta' => [
                'current_page' => $users->currentPage(),
                'from' => $users->firstItem() ?? 0,
                'last_page' => $users->lastPage(),  
                'per_page' => $users->perPage(),
                'to' => $users->lastItem() ?? 0,
                'total' => $users->total(),
            ],
        ];

        return Inertia::render('Users/Index', [
            'users' => $formattedUsers,
            'filters' => $filters,
        ]);
    }

    /**
     * Show the form for creating a new user.
     *
     * @return \Inertia\Response
     */
    public function create()
    {
        return Inertia::render('Users/Create');
    }

    /**
     * Store a newly created user in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
            'is_admin' => 'boolean',
            'is_gold' => 'boolean',
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'is_admin' => $request->is_admin ?? false,
            'is_gold' => $request->is_gold ?? false,
        ]);

        return redirect()->route('users.index')->with('success', 'User created successfully');
    }

    /**
     * Show the form for editing the specified user.
     *
     * @param  \App\Models\User  $user
     * @return \Inertia\Response
     */
    public function edit(User $user)
    {
        return Inertia::render('Users/Edit', [
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'is_admin' => $user->is_admin,
                'is_gold' => $user->is_gold,
                'avatar' => $user->avatar_url,
            ],
        ]);
    }

    /**
     * Update the specified user in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\RedirectResponse
     */
    public function update(Request $request, User $user)
    {
        // Only validate fields that are actually present in the request
        $rules = [];
        
        if ($request->has('name')) {
            $rules['name'] = 'required|string|max:255';
        }
        
        if ($request->has('email')) {
            $rules['email'] = 'required|string|email|max:255|unique:users,email,' . $user->id;
        }
        
        if ($request->has('password') && $request->password) {
            $rules['password'] = ['confirmed', Rules\Password::defaults()];
        }
        
        $request->validate($rules);

        // Start with the existing user data
        $userData = [
            'is_admin' => $request->has('is_admin') ? (bool)$request->is_admin : $user->is_admin,
            'is_gold' => $request->has('is_gold') ? (bool)$request->is_gold : $user->is_gold,
        ];
        
        // Only update fields that were passed in the request
        if ($request->has('name')) {
            $userData['name'] = $request->name;
        }
        
        if ($request->has('email')) {
            $userData['email'] = $request->email;
        }

        if ($request->has('password') && $request->password) {
            $userData['password'] = Hash::make($request->password);
        }

        $user->update($userData);

        // Handle avatar upload if it exists
        if ($request->hasFile('avatar')) {
            $user->clearMediaCollection('avatar');
            $user->addMediaFromRequest('avatar')->toMediaCollection('avatar');
        }

        return redirect()->route('users.index')->with('success', 'User updated successfully');
    }

    /**
     * Remove the specified user from storage.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\RedirectResponse
     */
    public function destroy(User $user)
    {
        // Prevent deleting yourself
        if ($user->id === auth()->id()) {
            return back()->with('error', 'You cannot delete your own account');
        }

        $user->delete();

        return redirect()->route('users.index')->with('success', 'User deleted successfully');
    }
}
