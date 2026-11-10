<?php

namespace App\Http\Controllers;

use App\Models\Employee;
use App\Models\EmployeeShiftAssignment;
use App\Models\Shift;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;

class EmployeeShiftAssignmentController extends Controller
{
    private function getTenantId(Request $request): int
    {
        $tenantId = $request->user()->tenant_id;

        abort_if(
            !$tenantId,
            403,
            'Your account is not assigned to a company.'
        );

        return (int) $tenantId;
    }

    public function index(Request $request)
    {
        $tenantId = $this->getTenantId($request);

        $assignments = EmployeeShiftAssignment::with([
            'employee',
            'shift',
        ])
            ->whereHas('employee', function ($query) use ($tenantId) {
                $query->where('tenant_id', $tenantId);
            })
            ->orderByDesc('start_date')
            ->get();

        $employees = Employee::where('tenant_id', $tenantId)
            ->orderBy('employee_no')
            ->get();

        $shifts = Shift::where('tenant_id', $tenantId)
            ->where('status', 'active')
            ->orderBy('name')
            ->get();

        return Inertia::render(
            'Attendance/ShiftAssignments/Index',
            [
                'assignments' => $assignments,
                'employees' => $employees,
                'shifts' => $shifts,
            ]
        );
    }

    private function validateAssignment(
        array $validated,
        int $tenantId,
        ?int $ignoreAssignmentId = null
    ): void {
        $employee = Employee::where('id', $validated['employee_id'])
            ->where('tenant_id', $tenantId)
            ->firstOrFail();

        Shift::where('id', $validated['shift_id'])
            ->where('tenant_id', $tenantId)
            ->firstOrFail();

        $overlappingAssignment = EmployeeShiftAssignment::where(
            'employee_id',
            $employee->id
        )
            ->where(
                'start_date',
                '<=',
                $validated['end_date'] ?? '9999-12-31'
            )
            ->where(function ($query) use ($validated) {
                $query->whereNull('end_date')
                    ->orWhere(
                        'end_date',
                        '>=',
                        $validated['start_date']
                    );
            })
            ->when(
                $ignoreAssignmentId,
                fn ($query) => $query->where(
                    'id',
                    '!=',
                    $ignoreAssignmentId
                )
            )
            ->exists();

        if ($overlappingAssignment) {
            throw ValidationException::withMessages([
                'employee_id' => 'This employee already has a shift assignment during the selected dates.',
            ]);
        }
    }

    public function store(Request $request)
    {
        $tenantId = $this->getTenantId($request);

        $validated = $request->validate([
            'employee_id' => [
                'required',
                'integer',
                Rule::exists('employees', 'id')
                    ->where('tenant_id', $tenantId),
            ],
            'shift_id' => [
                'required',
                'integer',
                Rule::exists('shifts', 'id')
                    ->where('tenant_id', $tenantId),
            ],
            'start_date' => 'required|date',
            'end_date' => 'nullable|date|after_or_equal:start_date',
        ]);

        $this->validateAssignment($validated, $tenantId);

        EmployeeShiftAssignment::create($validated);

        return redirect()
            ->route('shift-assignments.index')
            ->with('success', 'Employee shift assigned successfully.');
    }

    public function update(
        Request $request,
        EmployeeShiftAssignment $shiftAssignment
    ) {
        $tenantId = $this->getTenantId($request);

        abort_unless(
            $shiftAssignment->employee()
                ->where('tenant_id', $tenantId)
                ->exists(),
            404
        );

        $validated = $request->validate([
            'employee_id' => [
                'required',
                'integer',
                Rule::exists('employees', 'id')
                    ->where('tenant_id', $tenantId),
            ],
            'shift_id' => [
                'required',
                'integer',
                Rule::exists('shifts', 'id')
                    ->where('tenant_id', $tenantId),
            ],
            'start_date' => 'required|date',
            'end_date' => 'nullable|date|after_or_equal:start_date',
        ]);

        $this->validateAssignment(
            $validated,
            $tenantId,
            $shiftAssignment->id
        );

        $shiftAssignment->update($validated);

        return redirect()
            ->route('shift-assignments.index')
            ->with('success', 'Shift assignment updated successfully.');
    }

    public function destroy(
        Request $request,
        EmployeeShiftAssignment $shiftAssignment
    ) {
        $tenantId = $this->getTenantId($request);

        abort_unless(
            $shiftAssignment->employee()
                ->where('tenant_id', $tenantId)
                ->exists(),
            404
        );

        $shiftAssignment->delete();

        return redirect()
            ->route('shift-assignments.index')
            ->with('success', 'Shift assignment deleted successfully.');
    }
}
