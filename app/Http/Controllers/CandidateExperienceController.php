<?php

namespace App\Http\Controllers;

use App\Models\Candidate;
use App\Models\CandidateExperience;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CandidateExperienceController extends Controller
{
    public function index()
    {
        $experiences = CandidateExperience::with('candidate')
            ->latest()
            ->get();

        return Inertia::render(
            'Recruitment/CandidateExperience/Index',
            [
                'experiences' => $experiences,
                'candidates' => Candidate::orderBy('first_name')->get(),
            ]
        );
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'candidate_id' => 'required|exists:candidates,id',
            'company' => 'required|string|max:255',
            'position' => 'required|string|max:255',
            'start_date' => 'nullable|date',
            'end_date' => 'nullable|date|after_or_equal:start_date',
            'description' => 'nullable|string',
        ]);

        CandidateExperience::create($validated);

        return redirect()
            ->route('candidate-experience.index')
            ->with('success', 'Candidate experience created successfully.');
    }

    public function update(
        Request $request,
        CandidateExperience $candidateExperience
    ) {
        $validated = $request->validate([
            'candidate_id' => 'required|exists:candidates,id',
            'company' => 'required|string|max:255',
            'position' => 'required|string|max:255',
            'start_date' => 'nullable|date',
            'end_date' => 'nullable|date|after_or_equal:start_date',
            'description' => 'nullable|string',
        ]);

        $candidateExperience->update($validated);

        return redirect()
            ->route('candidate-experience.index')
            ->with('success', 'Candidate experience updated successfully.');
    }

    public function destroy(
        CandidateExperience $candidateExperience
    ) {
        $candidateExperience->delete();

        return redirect()
            ->route('candidate-experience.index')
            ->with('success', 'Candidate experience deleted successfully.');
    }
}