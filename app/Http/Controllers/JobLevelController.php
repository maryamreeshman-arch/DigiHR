<?php

namespace App\Http\Controllers;

use App\Models\JobLevel;
use Illuminate\Http\Request;
use Inertia\Inertia;

class JobLevelController extends Controller
{
    public function index()
    {
        $jobLevels = JobLevel::orderBy('rank')->get();

        return Inertia::render(
            'Employees/EmploymentStructure/JobLevels',
            [
                'jobLevels' => $jobLevels,
            ]
        );
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'tenant_id' => 'required|exists:tenants,id',
            'name' => 'required|string|max:100',
            'code' => 'required|string|max:50',
            'rank' => 'required|integer|min:1',
        ]);

        JobLevel::create($validated);

        return redirect()
            ->route('job-levels.index')
            ->with('success', 'Job level added successfully.');
    }

    public function update(
        Request $request,
        JobLevel $jobLevel
    ) {
        $validated = $request->validate([
            'tenant_id' => 'required|exists:tenants,id',
            'name' => 'required|string|max:100',
            'code' => 'required|string|max:50',
            'rank' => 'required|integer|min:1',
        ]);

        $jobLevel->update($validated);

        return redirect()
            ->route('job-levels.index')
            ->with('success', 'Job level updated successfully.');
    }

    public function destroy(JobLevel $jobLevel)
    {
        $jobLevel->delete();

        return redirect()
            ->route('job-levels.index')
            ->with('success', 'Job level deleted successfully.');
    }
}