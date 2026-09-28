<?php

namespace App\Http\Controllers;

use App\Models\Branch;
use App\Models\Company;
use App\Models\Department;
use App\Models\Division;
use App\Models\Employee;
use App\Models\EmployeeEmploymentHistory;
use App\Models\EmploymentType;
use App\Models\JobGrade;
use App\Models\JobLevel;
use App\Models\Position;
use App\Models\Tenant;
use Illuminate\Http\Request;
use Inertia\Inertia;

class EmployeeEmploymentHistoryController extends Controller
{
    public function index()
    {
        $histories = EmployeeEmploymentHistory::with([
            'employee',
            'company',
            'branch',
            'department',
            'division',
            'position',
            'manager',
            'employmentType',
            'jobGrade',
            'jobLevel',
            'tenant',
        ])
            ->latest('start_date')
            ->get();

        return Inertia::render(
            'Employees/EmploymentHistory/EmployeeEmploymentHistory',
            [
                'histories' => $histories,

                'tenants' => Tenant::orderBy('name')->get(),

                'employees' => Employee::orderBy('id')->get(),

                'companies' => Company::orderBy('name')->get(),

                'branches' => Branch::orderBy('name')->get(),

                'departments' => Department::orderBy('name')->get(),

                'divisions' => Division::orderBy('name')->get(),

                'positions' => Position::orderBy('title')->get(),

                'employmentTypes' => EmploymentType::orderBy('name')->get(),

                'jobGrades' => JobGrade::orderBy('name')->get(),

                'jobLevels' => JobLevel::orderBy('rank')->get(),
            ]
        );
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'tenant_id' => 'required|exists:tenants,id',
            'employee_id' => 'required|exists:employees,id',
            'company_id' => 'required|exists:companies,id',

            'branch_id' => 'nullable|exists:branches,id',
            'department_id' => 'nullable|exists:departments,id',
            'division_id' => 'nullable|exists:divisions,id',
            'position_id' => 'nullable|exists:positions,id',

            'manager_id' => 'nullable|exists:employees,id',

            'employment_type_id' =>
                'nullable|exists:employment_types,id',

            'job_grade_id' =>
                'nullable|exists:job_grades,id',

            'job_level_id' =>
                'nullable|exists:job_levels,id',

            'start_date' => 'required|date',

            'end_date' =>
                'nullable|date|after_or_equal:start_date',

            'reason' =>
                'nullable|string|max:255',

            'notes' =>
                'nullable|string',
        ]);

        EmployeeEmploymentHistory::create($validated);

        return redirect()
            ->route('employment-history.index')
            ->with(
                'success',
                'Employment history added successfully.'
            );
    }

    public function update(
        Request $request,
        EmployeeEmploymentHistory $employeeEmploymentHistory
    ) {
        $validated = $request->validate([
            'tenant_id' => 'required|exists:tenants,id',
            'employee_id' => 'required|exists:employees,id',
            'company_id' => 'required|exists:companies,id',

            'branch_id' => 'nullable|exists:branches,id',
            'department_id' => 'nullable|exists:departments,id',
            'division_id' => 'nullable|exists:divisions,id',
            'position_id' => 'nullable|exists:positions,id',

            'manager_id' => 'nullable|exists:employees,id',

            'employment_type_id' =>
                'nullable|exists:employment_types,id',

            'job_grade_id' =>
                'nullable|exists:job_grades,id',

            'job_level_id' =>
                'nullable|exists:job_levels,id',

            'start_date' => 'required|date',

            'end_date' =>
                'nullable|date|after_or_equal:start_date',

            'reason' =>
                'nullable|string|max:255',

            'notes' =>
                'nullable|string',
        ]);

        $employeeEmploymentHistory->update($validated);

        return redirect()
            ->route('employment-history.index')
            ->with(
                'success',
                'Employment history updated successfully.'
            );
    }

    public function destroy(
        EmployeeEmploymentHistory $employeeEmploymentHistory
    ) {
        $employeeEmploymentHistory->delete();

        return redirect()
            ->route('employment-history.index')
            ->with(
                'success',
                'Employment history deleted successfully.'
            );
    }
}
