<?php

namespace App\Http\Controllers;

use App\Models\Interview;
use App\Models\Interviewer;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class InterviewerController extends Controller
{
    public function index()
    {
        $interviewers = Interviewer::with([
            'interview.application.candidate',
            'interview.application.jobPosting',
            'user',
        ])
            ->latest()
            ->get();

        return Inertia::render(
            'Recruitment/Interviewers/Index',
            [
                'interviewers' => $interviewers,

                'interviews' => Interview::with([
                    'application.candidate',
                    'application.jobPosting',
                ])
                    ->latest('scheduled_at')
                    ->get(),

                'users' => User::orderBy('name')->get(),
            ]
        );
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'interview_id' => 'required|exists:interviews,id',
            'user_id' => 'required|exists:users,id',
        ]);

        Interviewer::create($validated);

        return redirect()
            ->route('interviewers.index')
            ->with(
                'success',
                'Interviewer assigned successfully.'
            );
    }

    public function update(
        Request $request,
        Interviewer $interviewer
    ) {
        $validated = $request->validate([
            'interview_id' => 'required|exists:interviews,id',
            'user_id' => 'required|exists:users,id',
        ]);

        $interviewer->update($validated);

        return redirect()
            ->route('interviewers.index')
            ->with(
                'success',
                'Interviewer updated successfully.'
            );
    }

    public function destroy(Interviewer $interviewer)
    {
        $interviewer->delete();

        return redirect()
            ->route('interviewers.index')
            ->with(
                'success',
                'Interviewer removed successfully.'
            );
    }
}