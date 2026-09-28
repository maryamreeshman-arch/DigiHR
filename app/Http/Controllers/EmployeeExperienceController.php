<?php

namespace App\Http\Controllers;

use App\Models\Employee;
use Illuminate\Http\Request;
use Inertia\Inertia;

class EmployeeExperienceController extends Controller
{
    public function create(Employee $employee)
    {
        $experiences = $employee->experiences()
            ->latest()
            ->get();

        return Inertia::render('Employees/Experience', [
            'employee' => $employee,
            'experiences' => $experiences,
        ]);
    }

    public function store(Request $request, Employee $employee)
    {
        $validated = $request->validate([
            'company_name' => 'required|string|max:200',
            'position' => 'required|string|max:200',
            'start_date' => 'required|date',
            'end_date' => 'nullable|date|after_or_equal:start_date',
            'description' => 'nullable|string',
        ]);

        $employee->experiences()->create($validated);

        return redirect()
            ->route('employees.experience.create', $employee)
            ->with('success', 'Experience added successfully.');
    }

    public function destroy(Employee $employee, $experience)
    {
        $employee->experiences()
            ->where('id', $experience)
            ->delete();

        return redirect()
            ->route('employees.experience.create', $employee)
            ->with('success', 'Experience deleted successfully.');
    }
}