<?php

namespace App\Http\Controllers;

use App\Models\Role;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UserRoleController extends Controller
{
    public function index()
    {
        $users = User::orderBy('name')
            ->get(['id', 'name', 'email'])
            ->map(function ($user) {
                $user->roles = $user->roles()->get([
                    'roles.id',
                    'roles.name',
                    'roles.code',
                ]);

                return $user;
            });

        $roles = Role::orderBy('name')
            ->get(['id', 'name', 'code']);

        return Inertia::render('UserRoles/Index', [
            'users' => $users,
            'roles' => $roles,
        ]);
    }

    public function update(Request $request, User $user)
    {
        $validated = $request->validate([
            'role_ids' => ['present', 'array'],
            'role_ids.*' => [
                'integer',
                'distinct',
                'exists:roles,id',
            ],
        ]);

        $user->roles()->sync($validated['role_ids']);

        return redirect()
            ->route('user-roles.index')
            ->with('success', 'User roles updated successfully.');
    }
}