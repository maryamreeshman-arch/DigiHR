<?php

namespace App\Http\Controllers;

use App\Models\Company;
use App\Models\Department;
use App\Models\Tenant;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DepartmentController extends Controller
{
    public function index()
    {
        $departments = Department::with('company', 'parent', 'tenant')
            ->latest()
            ->get();

        return Inertia::render('Tenants/Organization/Departments', [
            'departments' => $departments,
        ]);
    }

    public function create()
    {
        $tenants = Tenant::where('status', 'active')
            ->get();

        $companies = Company::where('status', 'active')
            ->get();

        $parentDepartments = Department::whereNull('parent_id')
            ->where('status', 'active')
            ->get();

        return Inertia::render('Tenants/Organization/CreateDepartment', [
            'tenants' => $tenants,
            'companies' => $companies,
            'parentDepartments' => $parentDepartments,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'tenant_id' => 'required|exists:tenants,id',
            'company_id' => 'required|exists:companies,id',
            'parent_id' => 'nullable|exists:departments,id',
            'name' => 'required|string|max:200',
            'code' => 'required|string|max:100',
            'description' => 'nullable|string',
            'status' => 'required|in:active,inactive',
        ]);

        Department::create($validated);

        return redirect()
            ->route('departments.index')
            ->with('success', 'Department created successfully.');
    }
}