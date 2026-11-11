<?php

namespace App\Http\Controllers;

use App\Models\Employee;
use App\Models\LeaveBalance;
use App\Models\LeaveType;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LeaveBalanceController extends Controller
{
    public function index(Request $request)
    {
        $tenantId = auth()->user()->tenant_id;

        $balances = LeaveBalance::whereHas('employee', function ($query) use ($tenantId) {
            $query->where('tenant_id', $tenantId);
        })
            ->with(['employee', 'leaveType'])
            ->orderBy('year', 'desc')
            ->get();

        $employees = Employee::where('tenant_id', $tenantId)->get();

        $leaveTypes = LeaveType::where('tenant_id', $tenantId)
            ->where('status', true)
            ->get();

        return Inertia::render('LeaveManagement/LeaveBalances/Index', [
            'balances' => $balances,
            'employees' => $employees,
            'leaveTypes' => $leaveTypes,
        ]);
    }

    public function store(Request $request)
    {
        $tenantId = auth()->user()->tenant_id;

        $validated = $request->validate([
            'employee_id' => ['required', 'integer'],
            'leave_type_id' => ['required', 'integer'],
            'year' => ['required', 'integer', 'min:2000', 'max:2100'],
            'opening_balance' => ['required', 'numeric', 'min:0'],
            'accrued' => ['nullable', 'numeric'],
            'used' => ['nullable', 'numeric', 'min:0'],
            'adjusted' => ['nullable', 'numeric'],
            'carried_forward' => ['nullable', 'numeric', 'min:0'],
        ]);

        Employee::where('tenant_id', $tenantId)
            ->findOrFail($validated['employee_id']);

        LeaveType::where('tenant_id', $tenantId)
            ->findOrFail($validated['leave_type_id']);

        $accrued = $validated['accrued'] ?? 0;
        $used = $validated['used'] ?? 0;
        $adjusted = $validated['adjusted'] ?? 0;
        $carriedForward = $validated['carried_forward'] ?? 0;

        LeaveBalance::create([
            ...$validated,
            'accrued' => $accrued,
            'used' => $used,
            'adjusted' => $adjusted,
            'carried_forward' => $carriedForward,
            'closing_balance' => $validated['opening_balance']
                + $accrued
                + $adjusted
                + $carriedForward
                - $used,
        ]);

        return redirect()->route('leave-balances.index')
            ->with('success', 'Leave balance created successfully.');
    }

    public function update(Request $request, LeaveBalance $leaveBalance)
    {
        $tenantId = auth()->user()->tenant_id;

        abort_unless(
            $leaveBalance->employee()
                ->where('tenant_id', $tenantId)
                ->exists(),
            404
        );

        $validated = $request->validate([
            'opening_balance' => ['required', 'numeric', 'min:0'],
            'accrued' => ['nullable', 'numeric'],
            'used' => ['nullable', 'numeric', 'min:0'],
            'adjusted' => ['nullable', 'numeric'],
            'carried_forward' => ['nullable', 'numeric', 'min:0'],
        ]);

        $accrued = $validated['accrued'] ?? 0;
        $used = $validated['used'] ?? 0;
        $adjusted = $validated['adjusted'] ?? 0;
        $carriedForward = $validated['carried_forward'] ?? 0;

        $leaveBalance->update([
            ...$validated,
            'accrued' => $accrued,
            'used' => $used,
            'adjusted' => $adjusted,
            'carried_forward' => $carriedForward,
            'closing_balance' => $validated['opening_balance']
                + $accrued
                + $adjusted
                + $carriedForward
                - $used,
        ]);

        return redirect()->route('leave-balances.index')
            ->with('success', 'Leave balance updated successfully.');
    }

    public function destroy(LeaveBalance $leaveBalance)
    {
        $tenantId = auth()->user()->tenant_id;

        abort_unless(
            $leaveBalance->employee()
                ->where('tenant_id', $tenantId)
                ->exists(),
            404
        );

        $leaveBalance->delete();

        return redirect()->route('leave-balances.index')
            ->with('success', 'Leave balance deleted successfully.');
    }
}