<?php

namespace App\Http\Controllers;

use App\Models\EmploymentStatus;
use Illuminate\Http\Request;
use Inertia\Inertia;

class EmploymentStatusController extends Controller
{
    public function index()
    {
        $employmentStatuses = EmploymentStatus::orderBy('name')->get();

        return Inertia::render(
            'Employees/EmploymentStructure/EmploymentStatuses',
            [
                'employmentStatuses' => $employmentStatuses,
            ]
        );
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'tenant_id' => 'required|exists:tenants,id',
            'name' => 'required|string|max:100',
            'code' => 'required|string|max:50',
        ]);

        EmploymentStatus::create($validated);

        return redirect()
            ->route('employment-statuses.index')
            ->with('success', 'Employment status added successfully.');
    }

    public function update(
        Request $request,
        EmploymentStatus $employmentStatus
    ) {
        $validated = $request->validate([
            'tenant_id' => 'required|exists:tenants,id',
            'name' => 'required|string|max:100',
            'code' => 'required|string|max:50',
        ]);

        $employmentStatus->update($validated);

        return redirect()
            ->route('employment-statuses.index')
            ->with('success', 'Employment status updated successfully.');
    }

    public function destroy(
        EmploymentStatus $employmentStatus
    ) {
        $employmentStatus->delete();

        return redirect()
            ->route('employment-statuses.index')
            ->with('success', 'Employment status deleted successfully.');
    }
}