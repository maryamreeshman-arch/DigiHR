<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\UserScope;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class UserScopeController extends Controller
{
    public function index()
    {
        return Inertia::render('UserScopes/Index', [
            'users' => User::orderBy('name')
                ->get(['id', 'name', 'email']),

            'userScopes' => UserScope::with('user:id,name,email')
                ->orderBy('user_id')
                ->get(),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'user_id' => ['required', 'integer', 'exists:users,id'],
            'scope_type' => [
                'required',
                Rule::in([
                    'company',
                    'business_unit',
                    'branch',
                    'department',
                    'division',
                    'location',
                    'cost_center',
                ]),
            ],
            'scope_id' => ['required', 'integer', 'min:1'],
        ]);

        $exists = UserScope::where('user_id', $validated['user_id'])
            ->where('scope_type', $validated['scope_type'])
            ->where('scope_id', $validated['scope_id'])
            ->exists();

        if ($exists) {
            return back()->withErrors([
                'scope_id' => 'This scope is already assigned to this user.',
            ]);
        }

        UserScope::create($validated);

        return redirect()
            ->route('user-scopes.index')
            ->with('success', 'User scope assigned successfully.');
    }

    public function destroy(UserScope $userScope)
    {
        $userScope->delete();

        return redirect()
            ->route('user-scopes.index')
            ->with('success', 'User scope removed successfully.');
    }
}
