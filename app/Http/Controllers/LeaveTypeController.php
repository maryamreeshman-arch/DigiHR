<?php

namespace App\Http\Controllers;

use App\Models\LeaveType;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class LeaveTypeController extends Controller
{
    public function index(Request $request)
    {
        $tenantId = auth()->user()->tenant_id;

        $leaveTypes = LeaveType::where('tenant_id', $tenantId)
            ->latest()
            ->get();

        return Inertia::render('LeaveManagement/LeaveTypes/Index', [
            'leaveTypes' => $leaveTypes,
        ]);
    }

    public function store(Request $request)
    {
        $tenantId = auth()->user()->tenant_id;

        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'code' => [
                'required',
                'string',
                'max:20',
                Rule::unique('leave_types', 'code')
                    ->where('tenant_id', $tenantId),
            ],
            'paid' => ['required', 'boolean'],
            'requires_document' => ['required', 'boolean'],
            'allow_half_day' => ['required', 'boolean'],
            'allow_hourly' => ['required', 'boolean'],
            'status' => ['required', 'boolean'],
        ]);

        LeaveType::create([
            ...$validated,
            'tenant_id' => $tenantId,
        ]);

        return redirect()->route('leave-types.index')
            ->with('success', 'Leave type created successfully.');
    }

    public function update(Request $request, LeaveType $leaveType)
    {
        $tenantId = auth()->user()->tenant_id;

        abort_unless($leaveType->tenant_id === $tenantId, 404);

        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'code' => [
                'required',
                'string',
                'max:20',
                Rule::unique('leave_types', 'code')
                    ->where('tenant_id', $tenantId)
                    ->ignore($leaveType->id),
            ],
            'paid' => ['required', 'boolean'],
            'requires_document' => ['required', 'boolean'],
            'allow_half_day' => ['required', 'boolean'],
            'allow_hourly' => ['required', 'boolean'],
            'status' => ['required', 'boolean'],
        ]);

        $leaveType->update($validated);

        return redirect()->route('leave-types.index')
            ->with('success', 'Leave type updated successfully.');
    }

    public function destroy(LeaveType $leaveType)
    {
        $tenantId = auth()->user()->tenant_id;

        abort_unless($leaveType->tenant_id === $tenantId, 404);

        $leaveType->delete();

        return redirect()->route('leave-types.index')
            ->with('success', 'Leave type deleted successfully.');
    }
}