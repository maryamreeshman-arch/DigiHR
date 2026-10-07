<?php

namespace App\Http\Controllers;

use App\Models\Candidate;
use App\Models\Tenant;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CandidateController extends Controller
{
    public function index()
    {
        $candidates = Candidate::with('tenant')
            ->latest()
            ->get();

        return Inertia::render(
            'Recruitment/Candidates/Index',
            [
                'candidates' => $candidates,
                'tenants' => Tenant::orderBy('name')->get(),
            ]
        );
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'tenant_id' => 'required|exists:tenants,id',
            'candidate_no' => 'required|string|max:100|unique:candidates,candidate_no',
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'required|string|max:50',
            'date_of_birth' => 'nullable|date',
            'current_company' => 'nullable|string|max:255',
            'current_position' => 'nullable|string|max:255',
            'source' => 'required|string|max:100',
            'status' => 'required|string|max:50',
        ]);

        Candidate::create($validated);

        return redirect()
            ->route('candidates.index')
            ->with('success', 'Candidate created successfully.');
    }

    public function update(
        Request $request,
        Candidate $candidate
    ) {
        $validated = $request->validate([
            'tenant_id' => 'required|exists:tenants,id',
            'candidate_no' => 'required|string|max:100|unique:candidates,candidate_no,' . $candidate->id,
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'required|string|max:50',
            'date_of_birth' => 'nullable|date',
            'current_company' => 'nullable|string|max:255',
            'current_position' => 'nullable|string|max:255',
            'source' => 'required|string|max:100',
            'status' => 'required|string|max:50',
        ]);

        $candidate->update($validated);

        return redirect()
            ->route('candidates.index')
            ->with('success', 'Candidate updated successfully.');
    }

    public function destroy(Candidate $candidate)
    {
        $candidate->delete();

        return redirect()
            ->route('candidates.index')
            ->with('success', 'Candidate deleted successfully.');
    }
}