<?php

namespace App\Http\Controllers;

use App\Models\EducationLevel;
use App\Models\Employee;
use Illuminate\Http\Request;
use Inertia\Inertia;

class EmployeeEducationController extends Controller
{
    public function create(Employee $employee)
    {
        $education = $employee->education()
            ->with('educationLevel')
            ->latest()
            ->get();

        $educationLevels = EducationLevel::orderBy('name')
            ->get();

        return Inertia::render('Employees/Education', [
            'employee' => $employee,
            'education' => $education,
            'educationLevels' => $educationLevels,
        ]);
    }

    public function store(Request $request, Employee $employee)
    {
        $validated = $request->validate([
            'education_level_id' => 'required|exists:education_levels,id',
            'institution' => 'required|string|max:200',
            'qualification' => 'required|string|max:200',
            'field_of_study' => 'nullable|string|max:200',
            'start_date' => 'nullable|date',
            'end_date' => 'nullable|date|after_or_equal:start_date',
            'grade' => 'nullable|string|max:100',
            'certificate_path' => 'nullable|string|max:255',
        ]);

        $employee->education()->create($validated);

        return redirect()
            ->route('employees.education.create', $employee)
            ->with('success', 'Education added successfully.');
    }

    public function destroy(Employee $employee, $education)
    {
        $employee->education()
            ->where('id', $education)
            ->delete();

        return redirect()
            ->route('employees.education.create', $employee)
            ->with('success', 'Education deleted successfully.');
    }
}