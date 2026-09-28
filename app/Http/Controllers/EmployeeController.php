<?php

namespace App\Http\Controllers;

use App\Models\Branch;
use App\Models\Company;
use App\Models\CostCenter;
use App\Models\Department;
use App\Models\Division;
use App\Models\Employee;
use App\Models\EmploymentStatus;
use App\Models\EmploymentType;
use App\Models\Location;
use App\Models\Position;
use App\Models\Tenant;
use Inertia\Inertia;
use Illuminate\Http\Request;

class EmployeeController extends Controller
{
    public function index()
    {
        $employees = Employee::with([
            'tenant',
            'company',
            'branch',
            'department',
            'division',
            'location',
            'costCenter',
            'position',
            'employmentType',
            'employmentStatus',
        ])
            ->latest()
            ->get();

        return Inertia::render('Employees/Index', [
            'employees' => $employees,
        ]);
    }

    public function create()
    {
        $tenants = Tenant::where('status', 'active')->get();

        $companies = Company::where('status', 'active')->get();

        $branches = Branch::where('status', 'active')->get();

        $departments = Department::where('status', 'active')->get();

        $divisions = Division::where('status', 'active')->get();

        $locations = Location::where('status', 'active')->get();

        $costCenters = CostCenter::all();

        $positions = Position::where('status', 'active')->get();

        $employmentTypes = EmploymentType::where('status', 'active')->get();

        $employmentStatuses = EmploymentStatus::where('status', 'active')->get();

        $managers = Employee::where('status', 'active')->get();

        return Inertia::render('Employees/Create', [
            'tenants' => $tenants,
            'companies' => $companies,
            'branches' => $branches,
            'departments' => $departments,
            'divisions' => $divisions,
            'locations' => $locations,
            'costCenters' => $costCenters,
            'positions' => $positions,
            'employmentTypes' => $employmentTypes,
            'employmentStatuses' => $employmentStatuses,
            'managers' => $managers,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'tenant_id' => 'required|exists:tenants,id',
            'employee_no' => 'required|string|max:100|unique:employees,employee_no',
            'company_id' => 'required|exists:companies,id',
            'branch_id' => 'nullable|exists:branches,id',
            'department_id' => 'nullable|exists:departments,id',
            'division_id' => 'nullable|exists:divisions,id',
            'location_id' => 'nullable|exists:locations,id',
            'cost_center_id' => 'nullable|exists:cost_centers,id',
            'position_id' => 'nullable|exists:positions,id',
            'employment_type_id' => 'nullable|exists:employment_types,id',
            'employment_status_id' => 'nullable|exists:employment_statuses,id',
            'manager_id' => 'nullable|exists:employees,id',
            'join_date' => 'nullable|date',
            'confirmation_date' => 'nullable|date',
            'termination_date' => 'nullable|date',
            'status' => 'required|in:active,inactive',
        ]);

        Employee::create($validated);

        return redirect()
            ->route('employees.index')
            ->with('success', 'Employee created successfully.');
    }

    public function show(Employee $employee)
    {
        $employee->load([
            'tenant',
            'company',
            'branch',
            'department',
            'division',
            'location',
            'costCenter',
            'position',
            'employmentType',
            'employmentStatus',
            'manager',

            'personalDetail',
            'contacts',
            'addresses',
            'emergencyContacts',
            'familyMembers',
            'education.educationLevel',
            'experiences',
            'skills.skill',
            'certifications.certification',
        ]);

        return Inertia::render('Employees/Profile', [
            'employee' => $employee,
        ]);
    }
}