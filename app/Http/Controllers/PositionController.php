<?php

namespace App\Http\Controllers;

use App\Models\Position;
use App\Models\Company;
use App\Models\Department;
use App\Models\JobGrade;
use App\Models\JobLevel;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PositionController extends Controller
{
   public function index()
{
    $positions = Position::with([
        'company',
        'department',
        'jobGrade',
        'jobLevel',
    ])
        ->orderBy('title')
        ->get();

    $companies = Company::orderBy('name')->get();

    $departments = Department::orderBy('name')->get();

    $jobGrades = JobGrade::orderBy('name')->get();

    $jobLevels = JobLevel::orderBy('rank')->get();

    return Inertia::render(
        'Employees/EmploymentStructure/Positions',
        [
            'positions' => $positions,
            'companies' => $companies,
            'departments' => $departments,
            'jobGrades' => $jobGrades,
            'jobLevels' => $jobLevels,
        ]
    );
}
    public function store(Request $request)
    {
        $validated = $request->validate([
            'tenant_id' => 'required|exists:tenants,id',
            'company_id' => 'required|exists:companies,id',
            'department_id' => 'required|exists:departments,id',
            'job_grade_id' => 'required|exists:job_grades,id',
            'job_level_id' => 'required|exists:job_levels,id',
            'title' => 'required|string|max:150',
            'code' => 'required|string|max:50',
            'description' => 'nullable|string',
            'headcount' => 'required|integer|min:1',
            'status' => 'required|in:active,inactive',
        ]);

        Position::create($validated);

        return redirect()
            ->route('positions.index')
            ->with('success', 'Position added successfully.');
    }

    public function update(
        Request $request,
        Position $position
    ) {
        $validated = $request->validate([
            'tenant_id' => 'required|exists:tenants,id',
            'company_id' => 'required|exists:companies,id',
            'department_id' => 'required|exists:departments,id',
            'job_grade_id' => 'required|exists:job_grades,id',
            'job_level_id' => 'required|exists:job_levels,id',
            'title' => 'required|string|max:150',
            'code' => 'required|string|max:50',
            'description' => 'nullable|string',
            'headcount' => 'required|integer|min:1',
            'status' => 'required|in:active,inactive',
        ]);

        $position->update($validated);

        return redirect()
            ->route('positions.index')
            ->with('success', 'Position updated successfully.');
    }

    public function destroy(Position $position)
    {
        $position->delete();

        return redirect()
            ->route('positions.index')
            ->with('success', 'Position deleted successfully.');
    }
}