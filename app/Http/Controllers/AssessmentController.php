<?php

namespace App\Http\Controllers;

use App\Models\Application;
use App\Models\Assessment;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AssessmentController extends Controller
{
    public function index()
    {
        $assessments = Assessment::with([
            'application.candidate',
            'application.jobPosting',
            'assessedBy',
        ])
            ->latest()
            ->get();

        return Inertia::render(
            'Recruitment/Assessments/Index',
            [
                'assessments' => $assessments,

                'applications' => Application::with([
                    'candidate',
                    'jobPosting',
                ])
                    ->latest()
                    ->get(),

                'users' => User::orderBy('name')->get(),
            ]
        );
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'application_id' => 'required|exists:applications,id',
            'assessment_type' => 'required|string|max:100',
            'score' => 'nullable|numeric|min:0|max:100',
            'result' => 'required|string|max:50',
            'feedback' => 'nullable|string',
            'assessed_by' => 'nullable|exists:users,id',
        ]);

        Assessment::create($validated);

        return redirect()
            ->route('assessments.index')
            ->with(
                'success',
                'Assessment created successfully.'
            );
    }

    public function update(
        Request $request,
        Assessment $assessment
    ) {
        $validated = $request->validate([
            'application_id' => 'required|exists:applications,id',
            'assessment_type' => 'required|string|max:100',
            'score' => 'nullable|numeric|min:0|max:100',
            'result' => 'required|string|max:50',
            'feedback' => 'nullable|string',
            'assessed_by' => 'nullable|exists:users,id',
        ]);

        $assessment->update($validated);

        return redirect()
            ->route('assessments.index')
            ->with(
                'success',
                'Assessment updated successfully.'
            );
    }

    public function destroy(Assessment $assessment)
    {
        $assessment->delete();

        return redirect()
            ->route('assessments.index')
            ->with(
                'success',
                'Assessment deleted successfully.'
            );
    }
}