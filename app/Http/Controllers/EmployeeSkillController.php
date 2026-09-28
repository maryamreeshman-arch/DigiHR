<?php

namespace App\Http\Controllers;

use App\Models\Employee;
use App\Models\Skill;
use Illuminate\Http\Request;
use Inertia\Inertia;

class EmployeeSkillController extends Controller
{
    public function create(Employee $employee)
    {
        $employeeSkills = $employee->skills()
            ->with('skill')
            ->latest()
            ->get();

        $skills = Skill::where('tenant_id', $employee->tenant_id)
            ->where('status', 'active')
            ->orderBy('name')
            ->get();

        return Inertia::render('Employees/Skills', [
            'employee' => $employee,
            'employeeSkills' => $employeeSkills,
            'skills' => $skills,
        ]);
    }

    public function store(Request $request, Employee $employee)
    {
        $validated = $request->validate([
            'skill_id' => [
                'required',
                'exists:skills,id',
            ],
            'level' => 'required|string|max:50',
            'years_experience' => 'required|numeric|min:0',
        ]);

        $employee->skills()->create($validated);

        return redirect()
            ->route('employees.skills.create', $employee)
            ->with('success', 'Skill added successfully.');
    }

    public function destroy(Employee $employee, $employeeSkill)
    {
        $employee->skills()
            ->where('id', $employeeSkill)
            ->delete();

        return redirect()
            ->route('employees.skills.create', $employee)
            ->with('success', 'Skill deleted successfully.');
    }
}