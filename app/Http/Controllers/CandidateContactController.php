<?php

namespace App\Http\Controllers;

use App\Models\Candidate;
use App\Models\CandidateContact;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CandidateContactController extends Controller
{
    public function index()
    {
        $contacts = CandidateContact::with('candidate')
            ->latest()
            ->get();

        return Inertia::render(
            'Recruitment/CandidateContacts/Index',
            [
                'contacts' => $contacts,
                'candidates' => Candidate::orderBy('first_name')->get(),
            ]
        );
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'candidate_id' => 'required|exists:candidates,id',
            'contact_type' => 'required|string|max:100',
            'contact_value' => 'required|string|max:255',
            'is_primary' => 'required|boolean',
        ]);

        CandidateContact::create($validated);

        return redirect()
            ->route('candidate-contacts.index')
            ->with('success', 'Candidate contact created successfully.');
    }

    public function update(
        Request $request,
        CandidateContact $candidateContact
    ) {
        $validated = $request->validate([
            'candidate_id' => 'required|exists:candidates,id',
            'contact_type' => 'required|string|max:100',
            'contact_value' => 'required|string|max:255',
            'is_primary' => 'required|boolean',
        ]);

        $candidateContact->update($validated);

        return redirect()
            ->route('candidate-contacts.index')
            ->with('success', 'Candidate contact updated successfully.');
    }

    public function destroy(CandidateContact $candidateContact)
    {
        $candidateContact->delete();

        return redirect()
            ->route('candidate-contacts.index')
            ->with('success', 'Candidate contact deleted successfully.');
    }
}