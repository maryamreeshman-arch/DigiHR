<?php

namespace App\Http\Controllers;

use App\Models\EmploymentType;
use Illuminate\Http\Request;
use Inertia\Inertia;

class EmploymentTypeController extends Controller
{
    /**
     * Display all employment types.
     */
    public function index()
    {
        $employmentTypes = EmploymentType::orderBy('name')
            ->get();

        return Inertia::render(
            'Employees/EmploymentStructure/EmploymentTypes',
            [
                'employmentTypes' => $employmentTypes,
            ]
        );
    }

    /**
     * Store a new employment type.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'tenant_id' => 'required|exists:tenants,id',
            'name' => 'required|string|max:100',
            'code' => 'required|string|max:50',
        ]);

        EmploymentType::create($validated);

        return redirect()
            ->route('employment-types.index')
            ->with(
                'success',
                'Employment type added successfully.'
            );
    }

    /**
     * Update an existing employment type.
     */
    public function update(
        Request $request,
        EmploymentType $employmentType
    ) {
        $validated = $request->validate([
            'tenant_id' => 'required|exists:tenants,id',
            'name' => 'required|string|max:100',
            'code' => 'required|string|max:50',
        ]);

        $employmentType->update($validated);

        return redirect()
            ->route('employment-types.index')
            ->with(
                'success',
                'Employment type updated successfully.'
            );
    }

    /**
     * Delete an employment type.
     */
    public function destroy(
        EmploymentType $employmentType
    ) {
        $employmentType->delete();

        return redirect()
            ->route('employment-types.index')
            ->with(
                'success',
                'Employment type deleted successfully.'
            );
    }
}