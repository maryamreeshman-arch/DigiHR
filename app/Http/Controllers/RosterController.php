<?php

namespace App\Http\Controllers;

use App\Models\Employee;
use App\Models\Roster;
use App\Models\Shift;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class RosterController extends Controller
{
    private function getTenantId(Request $request): int
    {
        $tenantId = $request->user()->tenant_id;

        abort_if(!$tenantId, 403, 'Your account is not assigned to a company.');

        return (int) $tenantId;
    }

    public function index(Request $request)
    {
        $tenantId = $this->getTenantId($request);

        $rosters = Roster::with([
            'assignments.employee',
            'assignments.shift',
        ])
            ->where('tenant_id', $tenantId)
            ->orderByDesc('period_start')
            ->get();

        $employees = Employee::where('tenant_id', $tenantId)
            ->orderBy('employee_no')
            ->get();

        $shifts = Shift::where('tenant_id', $tenantId)
            ->where('status', 'active')
            ->orderBy('name')
            ->get();

        return Inertia::render('Attendance/Rosters/Index', [
            'rosters' => $rosters,
            'employees' => $employees,
            'shifts' => $shifts,
        ]);
    }

    public function store(Request $request)
    {
        $tenantId = $this->getTenantId($request);

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'period_start' => 'required|date',
            'period_end' => 'required|date|after_or_equal:period_start',
            'status' => [
                'required',
                Rule::in(['draft', 'published', 'completed']),
            ],
        ]);

        Roster::create([
            ...$validated,
            'tenant_id' => $tenantId,
        ]);

        return redirect()->route('rosters.index')
            ->with('success', 'Roster created successfully.');
    }

    public function update(Request $request, Roster $roster)
    {
        $tenantId = $this->getTenantId($request);

        abort_unless((int) $roster->tenant_id === $tenantId, 404);

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'period_start' => 'required|date',
            'period_end' => 'required|date|after_or_equal:period_start',
            'status' => [
                'required',
                Rule::in(['draft', 'published', 'completed']),
            ],
        ]);

        $roster->update($validated);

        return redirect()->route('rosters.index')
            ->with('success', 'Roster updated successfully.');
    }

    public function destroy(Request $request, Roster $roster)
    {
        $tenantId = $this->getTenantId($request);

        abort_unless((int) $roster->tenant_id === $tenantId, 404);

        $roster->delete();

        return redirect()->route('rosters.index')
            ->with('success', 'Roster deleted successfully.');
    }
}
