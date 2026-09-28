<?php

namespace App\Http\Controllers;

use App\Models\Tenant;
use App\Services\TenantDefaultDataService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TenantController extends Controller
{
    public function index()
    {
        $tenants = Tenant::latest()->get();

        return Inertia::render('Tenants/Index', [
            'tenants' => $tenants,
        ]);
    }

    public function create()
    {
        return Inertia::render('Tenants/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:200',
            'slug' => 'required|string|max:100|unique:tenants,slug',
            'status' => 'required|in:active,suspended',
            'timezone' => 'required|string|max:50',
            'currency' => 'required|string|size:3',
            'locale' => 'required|string|max:10',
        ]);

        $validated['public_id'] = str()->ulid();

        $tenant = Tenant::create($validated);

        app(TenantDefaultDataService::class)
            ->createFor($tenant);

        return redirect()
            ->route('tenants.index')
            ->with('success', 'Tenant created successfully.');
    }

    public function edit(Tenant $tenant)
    {
        return Inertia::render('Tenants/Edit', [
            'tenant' => $tenant,
        ]);
    }

    public function update(Request $request, Tenant $tenant)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:200',
            'slug' => 'required|string|max:100|unique:tenants,slug,' . $tenant->id,
            'status' => 'required|in:active,suspended',
            'timezone' => 'required|string|max:50',
            'currency' => 'required|string|size:3',
            'locale' => 'required|string|max:10',
        ]);

        $tenant->update($validated);

        return redirect()
            ->route('tenants.index')
            ->with('success', 'Tenant updated successfully.');
    }

    public function destroy(Tenant $tenant)
    {
        $tenant->delete();

        return redirect()
            ->route('tenants.index')
            ->with('success', 'Tenant deleted successfully.');
    }
}