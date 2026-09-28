<?php

namespace App\Http\Controllers;

use App\Models\Branch;
use App\Models\Company;
use App\Models\Location;
use App\Models\Tenant;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LocationController extends Controller
{
    public function index()
    {
        $locations = Location::with('company', 'branch', 'tenant')
            ->latest()
            ->get();

        return Inertia::render('Tenants/Organization/Locations', [
            'locations' => $locations,
        ]);
    }

    public function create()
    {
        $tenants = Tenant::where('status', 'active')
            ->get();

        $companies = Company::where('status', 'active')
            ->get();

        $branches = Branch::where('status', 'active')
            ->get();

        return Inertia::render('Tenants/Organization/CreateLocation', [
            'tenants' => $tenants,
            'companies' => $companies,
            'branches' => $branches,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'tenant_id' => 'required|exists:tenants,id',
            'company_id' => 'required|exists:companies,id',
            'branch_id' => 'nullable|exists:branches,id',
            'name' => 'required|string|max:200',
            'code' => 'required|string|max:100',
            'address' => 'nullable|string',
            'latitude' => 'nullable|numeric',
            'longitude' => 'nullable|numeric',
            'geofence_radius' => 'nullable|numeric|min:0',
            'status' => 'required|in:active,inactive',
        ]);

        Location::create($validated);

        return redirect()
            ->route('locations.index')
            ->with('success', 'Location created successfully.');
    }
}