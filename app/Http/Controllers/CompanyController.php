<?php

namespace App\Http\Controllers;

use App\Models\Company;
use App\Models\LegalEntity;
use App\Models\Tenant;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CompanyController extends Controller
{
    public function index()
    {
        $companies = Company::with('legalEntity', 'tenant')
            ->latest()
            ->get();

        return Inertia::render('Tenants/Organization/Companies', [
            'companies' => $companies,
        ]);
    }

    public function create()
    {
        $tenants = Tenant::where('status', 'active')
            ->get();

        $legalEntities = LegalEntity::where('status', 'active')
            ->get();

        return Inertia::render('Tenants/Organization/CreateCompany', [
            'tenants' => $tenants,
            'legalEntities' => $legalEntities,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'tenant_id' => 'required|exists:tenants,id',
            'legal_entity_id' => 'required|exists:legal_entities,id',
            'name' => 'required|string|max:200',
            'code' => 'required|string|max:100',
            'registration_no' => 'nullable|string|max:100',
            'tax_number' => 'nullable|string|max:100',
            'email' => 'nullable|email|max:150',
            'phone' => 'nullable|string|max:50',
            'address' => 'nullable|string',
            'status' => 'required|in:active,inactive',
        ]);

        Company::create($validated);

        return redirect()
            ->route('companies.index')
            ->with('success', 'Company created successfully.');
    }
}