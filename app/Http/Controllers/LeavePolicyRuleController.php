<?php

namespace App\Http\Controllers;

use App\Models\LeavePolicy;
use App\Models\LeavePolicyRule;
use App\Models\LeaveType;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LeavePolicyRuleController extends Controller
{
    public function index(Request $request)
    {
        $tenantId = auth()->user()->tenant_id;

        $policies = LeavePolicy::where('tenant_id', $tenantId)
            ->with('rules.leaveType')
            ->get();

        $leaveTypes = LeaveType::where('tenant_id', $tenantId)
            ->where('status', true)
            ->get();

        return Inertia::render('LeaveManagement/LeavePolicyRules/Index', [
            'policies' => $policies,
            'leaveTypes' => $leaveTypes,
        ]);
    }

    public function store(Request $request)
    {
        $tenantId = auth()->user()->tenant_id;

        $validated = $request->validate([
            'leave_policy_id' => ['required', 'integer', 'exists:leave_policies,id'],
            'leave_type_id' => ['required', 'integer', 'exists:leave_types,id'],
            'entitlement_days' => ['required', 'numeric', 'min:0'],
            'carry_forward' => ['required', 'boolean'],
            'max_carry_forward' => ['required', 'numeric', 'min:0'],
            'encashment_allowed' => ['required', 'boolean'],
            'probation_allowed' => ['required', 'boolean'],
        ]);

        $policy = LeavePolicy::where('tenant_id', $tenantId)
            ->findOrFail($validated['leave_policy_id']);

        $leaveType = LeaveType::where('tenant_id', $tenantId)
            ->findOrFail($validated['leave_type_id']);

        LeavePolicyRule::create([
            ...$validated,
        ]);

        return redirect()->route('leave-policy-rules.index')
            ->with('success', 'Leave policy rule created successfully.');
    }

    public function update(Request $request, LeavePolicyRule $leavePolicyRule)
    {
        $tenantId = auth()->user()->tenant_id;

        abort_unless(
            $leavePolicyRule->leavePolicy()
                ->where('tenant_id', $tenantId)
                ->exists(),
            404
        );

        $validated = $request->validate([
            'leave_policy_id' => ['required', 'integer', 'exists:leave_policies,id'],
            'leave_type_id' => ['required', 'integer', 'exists:leave_types,id'],
            'entitlement_days' => ['required', 'numeric', 'min:0'],
            'carry_forward' => ['required', 'boolean'],
            'max_carry_forward' => ['required', 'numeric', 'min:0'],
            'encashment_allowed' => ['required', 'boolean'],
            'probation_allowed' => ['required', 'boolean'],
        ]);

        LeavePolicy::where('tenant_id', $tenantId)
            ->findOrFail($validated['leave_policy_id']);

        LeaveType::where('tenant_id', $tenantId)
            ->findOrFail($validated['leave_type_id']);

        $leavePolicyRule->update($validated);

        return redirect()->route('leave-policy-rules.index')
            ->with('success', 'Leave policy rule updated successfully.');
    }

    public function destroy(LeavePolicyRule $leavePolicyRule)
    {
        $tenantId = auth()->user()->tenant_id;

        abort_unless(
            $leavePolicyRule->leavePolicy()
                ->where('tenant_id', $tenantId)
                ->exists(),
            404
        );

        $leavePolicyRule->delete();

        return redirect()->route('leave-policy-rules.index')
            ->with('success', 'Leave policy rule deleted successfully.');
    }
}