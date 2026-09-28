<?php

namespace App\Http\Controllers;

use App\Models\Branch;
use App\Models\BusinessUnit;
use App\Models\Company;
use App\Models\Tenant;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BranchController extends Controller
{
    public function index()
    {
        $branches = Branch::with('company', 'businessUnit', 'tenant')
            ->latest()
            ->get();

        return Inertia::render('Tenants/Organization/Branches', [
            'branches' => $branches,
        ]);
    }

    public function create()
    {
        $tenants = Tenant::where('status', 'active')
            ->get();

        $companies = Company::where('status', 'active')
            ->get();

        $businessUnits = BusinessUnit::where('status', 'active')
            ->get();

        return Inertia::render('Tenants/Organization/CreateBranch', [
            'tenants' => $tenants,
            'companies' => $companies,
            'businessUnits' => $businessUnits,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'tenant_id' => 'required|exists:tenants,id',
            'company_id' => 'required|exists:companies,id',
            'business_unit_id' => 'nullable|exists:business_units,id',
            'name' => 'required|string|max:200',
            'code' => 'required|string|max:100',
            'address' => 'nullable|string',
            'city' => 'nullable|string|max:100',
            'phone' => 'nullable|string|max:50',
            'email' => 'nullable|email|max:150',
            'latitude' => 'nullable|numeric',
            'longitude' => 'nullable|numeric',
            'status' => 'required|in:active,inactive',
        ]);

        Branch::create($validated);

        return redirect()
            ->route('branches.index')
            ->with('success', 'Branch created successfully.');
    }
}