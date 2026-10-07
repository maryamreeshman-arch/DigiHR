<?php

namespace App\Http\Controllers;

use App\Models\Application;
use App\Models\Interview;
use Illuminate\Http\Request;
use Inertia\Inertia;

class InterviewController extends Controller
{
    public function index()
    {
        $interviews = Interview::with([
            'application.candidate',
            'application.jobPosting',
        ])
            ->latest('scheduled_at')
            ->get();

        return Inertia::render(
            'Recruitment/Interviews/Index',
            [
                'interviews' => $interviews,

                'applications' => Application::with([
                    'candidate',
                    'jobPosting',
                ])
                    ->latest()
                    ->get(),
            ]
        );
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'application_id' => 'required|exists:applications,id',
            'interview_type' => 'required|string|max:100',
            'scheduled_at' => 'required|date',
            'location' => 'nullable|string|max:255',
            'meeting_url' => 'nullable|url|max:255',
            'status' => 'required|string|max:50',
            'feedback' => 'nullable|string',
        ]);

        Interview::create($validated);

        return redirect()
            ->route('interviews.index')
            ->with(
                'success',
                'Interview created successfully.'
            );
    }

    public function update(
        Request $request,
        Interview $interview
    ) {
        $validated = $request->validate([
            'application_id' => 'required|exists:applications,id',
            'interview_type' => 'required|string|max:100',
            'scheduled_at' => 'required|date',
            'location' => 'nullable|string|max:255',
            'meeting_url' => 'nullable|url|max:255',
            'status' => 'required|string|max:50',
            'feedback' => 'nullable|string',
        ]);

        $interview->update($validated);

        return redirect()
            ->route('interviews.index')
            ->with(
                'success',
                'Interview updated successfully.'
            );
    }

    public function destroy(Interview $interview)
    {
        $interview->delete();

        return redirect()
            ->route('interviews.index')
            ->with(
                'success',
                'Interview deleted successfully.'
            );
    }
}