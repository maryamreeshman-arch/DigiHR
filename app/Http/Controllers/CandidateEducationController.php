<?php

namespace App\Http\Controllers;

use App\Models\Candidate;
use App\Models\CandidateEducation;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CandidateEducationController extends Controller
{
    public function index()
    {
        $educations = CandidateEducation::with('candidate')
            ->latest()
            ->get();

        return Inertia::render(
            'Recruitment/CandidateEducation/Index',
            [
                'educations' => $educations,
                'candidates' => Candidate::orderBy('first_name')->get(),
            ]
        );
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'candidate_id' => 'required|exists:candidates,id',
            'qualification' => 'required|string|max:255',
            'institution' => 'required|string|max:255',
            'field_of_study' => 'nullable|string|max:255',
            'start_year' => 'nullable|string|max:20',
            'end_year' => 'nullable|string|max:20',
            'description' => 'nullable|string',
        ]);

        CandidateEducation::create($validated);

        return redirect()
            ->route('candidate-education.index')
            ->with('success', 'Candidate education created successfully.');
    }

    public function update(
        Request $request,
        CandidateEducation $candidateEducation
    ) {
        $validated = $request->validate([
            'candidate_id' => 'required|exists:candidates,id',
            'qualification' => 'required|string|max:255',
            'institution' => 'required|string|max:255',
            'field_of_study' => 'nullable|string|max:255',
            'start_year' => 'nullable|string|max:20',
            'end_year' => 'nullable|string|max:20',
            'description' => 'nullable|string',
        ]);

        $candidateEducation->update($validated);

        return redirect()
            ->route('candidate-education.index')
            ->with('success', 'Candidate education updated successfully.');
    }

    public function destroy(CandidateEducation $candidateEducation)
    {
        $candidateEducation->delete();

        return redirect()
            ->route('candidate-education.index')
            ->with('success', 'Candidate education deleted successfully.');
    }
}
