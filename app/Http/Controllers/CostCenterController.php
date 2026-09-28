<?php

namespace App\Http\Controllers;

use App\Models\Company;
use App\Models\CostCenter;
use App\Models\Tenant;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CostCenterController extends Controller
{
    public function index()
    {
        $costCenters = CostCenter::with('company', 'parent', 'tenant')
            ->latest()
            ->get();

        return Inertia::render('Tenants/Organization/CostCenters', [
            'costCenters' => $costCenters,
        ]);
    }

    public function create()
    {
        $tenants = Tenant::where('status', 'active')
            ->get();

        $companies = Company::where('status', 'active')
            ->get();

        $parentCostCenters = CostCenter::whereNull('parent_id')
            ->get();

        return Inertia::render('Tenants/Organization/CreateCostCenter', [
            'tenants' => $tenants,
            'companies' => $companies,
            'parentCostCenters' => $parentCostCenters,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'tenant_id' => 'required|exists:tenants,id',
            'company_id' => 'required|exists:companies,id',
            'parent_id' => 'nullable|exists:cost_centers,id',
            'code' => 'required|string|max:100',
            'name' => 'required|string|max:200',
            'description' => 'nullable|string',
        ]);

        CostCenter::create($validated);

        return redirect()
            ->route('cost-centers.index')
            ->with('success', 'Cost Center created successfully.');
    }
}