<?php

namespace App\Http\Controllers;

use App\Models\Permission;
use App\Models\Role;
use Illuminate\Http\Request;
use Inertia\Inertia;

class RolePermissionController extends Controller
{
    public function index()
    {
        $roles = Role::orderBy('name')->get();

        $permissions = Permission::orderBy('module')
            ->orderBy('name')
            ->get();

        $roles->load('permissions');

        return Inertia::render('RolePermissions/Index', [
            'roles' => $roles,
            'permissions' => $permissions,
        ]);
    }

    public function update(Request $request, Role $role)
    {
        $validated = $request->validate([
            'permission_ids' => ['array'],
            'permission_ids.*' => ['integer', 'exists:permissions,id'],
        ]);

        $role->permissions()->sync(
            $validated['permission_ids'] ?? []
        );

        return redirect()
            ->route('role-permissions.index')
            ->with('success', 'Permissions updated successfully.');
    }
}