<?php

namespace App\Http\Controllers;

use App\Models\LeavePolicy;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class LeavePolicyController extends Controller
{
    public function index(Request $request)
    {
        $tenantId = auth()->user()->tenant_id;

        $policies = LeavePolicy::where('tenant_id', $tenantId)
            ->with('rules.leaveType')
            ->latest()
            ->get();

        return Inertia::render('LeaveManagement/LeavePolicies/Index', [
            'policies' => $policies,
        ]);
    }

    public function store(Request $request)
    {
        $tenantId = auth()->user()->tenant_id;

        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'year' => [
                'required',
                'integer',
                'min:2000',
                'max:2100',
                Rule::unique('leave_policies', 'year')
                    ->where('tenant_id', $tenantId)
                    ->where('name', $request->name),
            ],
        ]);

        LeavePolicy::create([
            ...$validated,
            'tenant_id' => $tenantId,
        ]);

        return redirect()->route('leave-policies.index')
            ->with('success', 'Leave policy created successfully.');
    }

    public function update(Request $request, LeavePolicy $leavePolicy)
    {
        $tenantId = auth()->user()->tenant_id;

        abort_unless($leavePolicy->tenant_id === $tenantId, 404);

        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'year' => [
                'required',
                'integer',
                'min:2000',
                'max:2100',
                Rule::unique('leave_policies', 'year')
                    ->where('tenant_id', $tenantId)
                    ->where('name', $request->name)
                    ->ignore($leavePolicy->id),
            ],
        ]);

        $leavePolicy->update($validated);

        return redirect()->route('leave-policies.index')
            ->with('success', 'Leave policy updated successfully.');
    }

    public function destroy(LeavePolicy $leavePolicy)
    {
        $tenantId = auth()->user()->tenant_id;

        abort_unless($leavePolicy->tenant_id === $tenantId, 404);

        $leavePolicy->delete();

        return redirect()->route('leave-policies.index')
            ->with('success', 'Leave policy deleted successfully.');
    }
}