<?php

namespace App\Http\Controllers;

use App\Models\Company;
use App\Models\Department;
use App\Models\Division;
use App\Models\Tenant;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DivisionController extends Controller
{
    public function index()
    {
        $divisions = Division::with('company', 'department', 'tenant')
            ->latest()
            ->get();

        return Inertia::render('Tenants/Organization/Divisions', [
            'divisions' => $divisions,
        ]);
    }

    public function create()
    {
        $tenants = Tenant::where('status', 'active')
            ->get();

        $companies = Company::where('status', 'active')
            ->get();

        $departments = Department::where('status', 'active')
            ->get();

        return Inertia::render('Tenants/Organization/CreateDivision', [
            'tenants' => $tenants,
            'companies' => $companies,
            'departments' => $departments,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'tenant_id' => 'required|exists:tenants,id',
            'company_id' => 'required|exists:companies,id',
            'department_id' => 'required|exists:departments,id',
            'name' => 'required|string|max:200',
            'code' => 'required|string|max:100',
            'status' => 'required|in:active,inactive',
        ]);

        Division::create($validated);

        return redirect()
            ->route('divisions.index')
            ->with('success', 'Division created successfully.');
    }
}