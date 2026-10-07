<?php

namespace App\Http\Controllers;

use App\Models\EmploymentType;
use App\Models\JobPosting;
use App\Models\JobRequisition;
use App\Models\Tenant;
use Illuminate\Http\Request;
use Inertia\Inertia;

class JobPostingController extends Controller
{
    public function index()
    {
        $postings = JobPosting::with([
            'tenant',
            'jobRequisition',
            'employmentType',
        ])
            ->latest()
            ->get();

        return Inertia::render(
            'Recruitment/JobPostings/Index',
            [
                'postings' => $postings,
                'tenants' => Tenant::orderBy('name')->get(),
                'jobRequisitions' => JobRequisition::latest()->get(),
                'employmentTypes' => EmploymentType::orderBy('name')->get(),
            ]
        );
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'tenant_id' => 'required|exists:tenants,id',
            'job_requisition_id' => 'required|exists:job_requisitions,id',
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'requirements' => 'required|string',
            'location' => 'required|string|max:255',
            'employment_type_id' => 'required|exists:employment_types,id',
            'published_at' => 'nullable|date',
            'closing_at' => 'nullable|date|after_or_equal:published_at',
            'status' => 'required|string|max:50',
        ]);

        JobPosting::create($validated);

        return redirect()
            ->route('job-postings.index')
            ->with('success', 'Job posting created successfully.');
    }

    public function update(
        Request $request,
        JobPosting $jobPosting
    ) {
        $validated = $request->validate([
            'tenant_id' => 'required|exists:tenants,id',
            'job_requisition_id' => 'required|exists:job_requisitions,id',
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'requirements' => 'required|string',
            'location' => 'required|string|max:255',
            'employment_type_id' => 'required|exists:employment_types,id',
            'published_at' => 'nullable|date',
            'closing_at' => 'nullable|date|after_or_equal:published_at',
            'status' => 'required|string|max:50',
        ]);

        $jobPosting->update($validated);

        return redirect()
            ->route('job-postings.index')
            ->with('success', 'Job posting updated successfully.');
    }

    public function destroy(JobPosting $jobPosting)
    {
        $jobPosting->delete();

        return redirect()
            ->route('job-postings.index')
            ->with('success', 'Job posting deleted successfully.');
    }
}