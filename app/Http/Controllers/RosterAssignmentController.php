<?php

namespace App\Http\Controllers;

use App\Models\Employee;
use App\Models\Roster;
use App\Models\RosterAssignment;
use App\Models\Shift;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class RosterAssignmentController extends Controller
{
    private function getTenantId(Request $request): int
    {
        $tenantId = $request->user()->tenant_id;

        abort_if(!$tenantId, 403, 'Your account is not assigned to a company.');

        return (int) $tenantId;
    }

    public function store(Request $request)
    {
        $tenantId = $this->getTenantId($request);

        $validated = $request->validate([
            'roster_id' => 'required|integer',
            'employee_id' => 'required|integer',
            'date' => 'required|date',
            'shift_id' => 'nullable|integer',
            'status' => ['required', Rule::in(['scheduled', 'off'])],
        ]);

        $roster = Roster::where('id', $validated['roster_id'])
            ->where('tenant_id', $tenantId)
            ->firstOrFail();

        abort_unless(
            $validated['date'] >= $roster->period_start->format('Y-m-d') &&
            $validated['date'] <= $roster->period_end->format('Y-m-d'),
            422,
            'Assignment date must be within the roster period.'
        );

        Employee::where('id', $validated['employee_id'])
            ->where('tenant_id', $tenantId)
            ->firstOrFail();

        if ($validated['status'] === 'scheduled' && empty($validated['shift_id'])) {
            return back()->withErrors([
                'shift_id' => 'Please select a shift for scheduled days.',
            ]);
        }

        if ($validated['status'] === 'off') {
            $validated['shift_id'] = null;
        }

        if (!empty($validated['shift_id'])) {
            Shift::where('id', $validated['shift_id'])
                ->where('tenant_id', $tenantId)
                ->firstOrFail();
        }

        RosterAssignment::create($validated);

        return back()->with('success', 'Roster assignment created successfully.');
    }

    public function update(Request $request, RosterAssignment $rosterAssignment)
    {
        $tenantId = $this->getTenantId($request);

        abort_unless(
            $rosterAssignment->roster()->where('tenant_id', $tenantId)->exists(),
            404
        );

        $validated = $request->validate([
            'employee_id' => 'required|integer',
            'date' => 'required|date',
            'shift_id' => 'nullable|integer',
            'status' => ['required', Rule::in(['scheduled', 'off'])],
        ]);

        $roster = $rosterAssignment->roster;

        abort_unless(
            $validated['date'] >= $roster->period_start->format('Y-m-d') &&
            $validated['date'] <= $roster->period_end->format('Y-m-d'),
            422,
            'Assignment date must be within the roster period.'
        );

        Employee::where('id', $validated['employee_id'])
            ->where('tenant_id', $tenantId)
            ->firstOrFail();

        if ($validated['status'] === 'scheduled' && empty($validated['shift_id'])) {
            return back()->withErrors([
                'shift_id' => 'Please select a shift for scheduled days.',
            ]);
        }

        if ($validated['status'] === 'off') {
            $validated['shift_id'] = null;
        }

        if (!empty($validated['shift_id'])) {
            Shift::where('id', $validated['shift_id'])
                ->where('tenant_id', $tenantId)
                ->firstOrFail();
        }

        $duplicate = RosterAssignment::where('roster_id', $roster->id)
            ->where('employee_id', $validated['employee_id'])
            ->whereDate('date', $validated['date'])
            ->where('id', '!=', $rosterAssignment->id)
            ->exists();

        if ($duplicate) {
            return back()->withErrors([
                'employee_id' => 'This employee already has an assignment on this date.',
            ]);
        }

        $rosterAssignment->update($validated);

        return back()->with('success', 'Roster assignment updated successfully.');
    }

    public function destroy(Request $request, RosterAssignment $rosterAssignment)
    {
        $tenantId = $this->getTenantId($request);

        abort_unless(
            $rosterAssignment->roster()->where('tenant_id', $tenantId)->exists(),
            404
        );

        $rosterAssignment->delete();

        return back()->with('success', 'Roster assignment deleted successfully.');
    }
}
