<?php

namespace App\Http\Controllers;

use App\Models\Application;
use App\Models\Candidate;
use App\Models\JobPosting;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ApplicationController extends Controller
{
    public function index()
    {
        $applications = Application::with([
            'candidate',
            'jobPosting',
        ])
            ->latest()
            ->get();

        return Inertia::render(
            'Recruitment/Applications/Index',
            [
                'applications' => $applications,
                'candidates' => Candidate::orderBy('first_name')->get(),
                'jobPostings' => JobPosting::orderBy('title')->get(),
            ]
        );
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'candidate_id' => 'required|exists:candidates,id',
            'job_posting_id' => 'required|exists:job_postings,id',
            'applied_at' => 'required|date',
            'status' => 'required|string|max:50',
            'rating' => 'nullable|numeric|min:0|max:100',
            'notes' => 'nullable|string',
        ]);

        Application::create($validated);

        return redirect()
            ->route('applications.index')
            ->with('success', 'Application created successfully.');
    }

    public function update(
        Request $request,
        Application $application
    ) {
        $validated = $request->validate([
            'candidate_id' => 'required|exists:candidates,id',
            'job_posting_id' => 'required|exists:job_postings,id',
            'applied_at' => 'required|date',
            'status' => 'required|string|max:50',
            'rating' => 'nullable|numeric|min:0|max:100',
            'notes' => 'nullable|string',
        ]);

        $application->update($validated);

        return redirect()
            ->route('applications.index')
            ->with('success', 'Application updated successfully.');
    }

    public function destroy(Application $application)
    {
        $application->delete();

        return redirect()
            ->route('applications.index')
            ->with('success', 'Application deleted successfully.');
    }
}