<?php

namespace App\Http\Controllers;

use App\Models\BusinessUnit;
use App\Models\Company;
use App\Models\Tenant;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BusinessUnitController extends Controller
{
    public function index()
    {
        $businessUnits = BusinessUnit::with('company', 'tenant')
            ->latest()
            ->get();

        return Inertia::render('Tenants/Organization/BusinessUnits', [
            'businessUnits' => $businessUnits,
        ]);
    }

    public function create()
    {
        $tenants = Tenant::where('status', 'active')
            ->get();

        $companies = Company::where('status', 'active')
            ->get();

        return Inertia::render('Tenants/Organization/CreateBusinessUnit', [
            'tenants' => $tenants,
            'companies' => $companies,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'tenant_id' => 'required|exists:tenants,id',
            'company_id' => 'required|exists:companies,id',
            'name' => 'required|string|max:200',
            'code' => 'required|string|max:100',
            'description' => 'nullable|string',
            'status' => 'required|in:active,inactive',
        ]);

        BusinessUnit::create($validated);

        return redirect()
            ->route('business-units.index')
            ->with('success', 'Business Unit created successfully.');
    }
}