<?php

namespace App\Http\Controllers;

use App\Models\JobGrade;
use Illuminate\Http\Request;
use Inertia\Inertia;

class JobGradeController extends Controller
{
    public function index()
    {
        $jobGrades = JobGrade::orderBy('name')->get();

        return Inertia::render(
            'Employees/EmploymentStructure/JobGrades',
            [
                'jobGrades' => $jobGrades,
            ]
        );
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'tenant_id' => 'required|exists:tenants,id',
            'name' => 'required|string|max:100',
            'code' => 'required|string|max:50',
            'min_salary' => 'required|numeric|min:0',
            'max_salary' => 'required|numeric|min:0|gte:min_salary',
            'description' => 'nullable|string',
            'status' => 'required|in:active,inactive',
        ]);

        JobGrade::create($validated);

        return redirect()
            ->route('job-grades.index')
            ->with('success', 'Job grade added successfully.');
    }

    public function update(
        Request $request,
        JobGrade $jobGrade
    ) {
        $validated = $request->validate([
            'tenant_id' => 'required|exists:tenants,id',
            'name' => 'required|string|max:100',
            'code' => 'required|string|max:50',
            'min_salary' => 'required|numeric|min:0',
            'max_salary' => 'required|numeric|min:0|gte:min_salary',
            'description' => 'nullable|string',
            'status' => 'required|in:active,inactive',
        ]);

        $jobGrade->update($validated);

        return redirect()
            ->route('job-grades.index')
            ->with('success', 'Job grade updated successfully.');
    }

    public function destroy(JobGrade $jobGrade)
    {
        $jobGrade->delete();

        return redirect()
            ->route('job-grades.index')
            ->with('success', 'Job grade deleted successfully.');
    }
}