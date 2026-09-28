<?php

namespace App\Http\Controllers;

use App\Models\LegalEntity;
use App\Models\Tenant;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LegalEntityController extends Controller
{
    public function create()
    {
        $tenants = Tenant::where('status', 'active')
            ->get();

        return Inertia::render('Tenants/Organization/CreateLegalEntity', [
            'tenants' => $tenants,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'tenant_id' => 'required|exists:tenants,id',
            'name' => 'required|string|max:200',
            'registration_no' => 'nullable|string|max:100',
            'tax_no' => 'nullable|string|max:100',
            'address' => 'nullable|string',
            'phone' => 'nullable|string|max:50',
            'email' => 'nullable|email|max:150',
            'status' => 'required|in:active,inactive',
        ]);

        LegalEntity::create($validated);

        return redirect()
            ->route('legal-entities.index')
            ->with('success', 'Legal Entity created successfully.');
    }
}