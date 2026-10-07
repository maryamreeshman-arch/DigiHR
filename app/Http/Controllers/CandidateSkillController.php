<?php

namespace App\Http\Controllers;

use App\Models\Candidate;
use App\Models\CandidateSkill;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CandidateSkillController extends Controller
{
    public function index()
    {
        $skills = CandidateSkill::with('candidate')
            ->latest()
            ->get();

        return Inertia::render(
            'Recruitment/CandidateSkills/Index',
            [
                'skills' => $skills,
                'candidates' => Candidate::orderBy('first_name')->get(),
            ]
        );
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'candidate_id' => 'required|exists:candidates,id',
            'skill' => 'required|string|max:255',
            'proficiency' => 'nullable|string|max:100',
            'description' => 'nullable|string',
        ]);

        CandidateSkill::create($validated);

        return redirect()
            ->route('candidate-skills.index')
            ->with('success', 'Candidate skill created successfully.');
    }

    public function update(
        Request $request,
        CandidateSkill $candidateSkill
    ) {
        $validated = $request->validate([
            'candidate_id' => 'required|exists:candidates,id',
            'skill' => 'required|string|max:255',
            'proficiency' => 'nullable|string|max:100',
            'description' => 'nullable|string',
        ]);

        $candidateSkill->update($validated);

        return redirect()
            ->route('candidate-skills.index')
            ->with('success', 'Candidate skill updated successfully.');
    }

    public function destroy(CandidateSkill $candidateSkill)
    {
        $candidateSkill->delete();

        return redirect()
            ->route('candidate-skills.index')
            ->with('success', 'Candidate skill deleted successfully.');
    }
}