<?php

namespace App\Http\Controllers;

use App\Models\Employee;
use Illuminate\Http\Request;
use Inertia\Inertia;

class EmployeeFamilyMemberController extends Controller
{
    public function create(Employee $employee)
    {
        $familyMembers = $employee->familyMembers()
            ->latest()
            ->get();

        return Inertia::render('Employees/FamilyMembers', [
            'employee' => $employee,
            'familyMembers' => $familyMembers,
        ]);
    }

    public function store(Request $request, Employee $employee)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:150',
            'relationship' => 'required|string|max:100',
            'date_of_birth' => 'nullable|date',
            'gender' => 'nullable|string|max:30',
            'occupation' => 'nullable|string|max:150',
            'phone' => 'nullable|string|max:50',
            'is_dependent' => 'required|boolean',
        ]);

        $employee->familyMembers()->create($validated);

        return redirect()
            ->route('employees.family-members.create', $employee)
            ->with('success', 'Family member added successfully.');
    }

    public function destroy(Employee $employee, $familyMember)
    {
        $employee->familyMembers()
            ->where('id', $familyMember)
            ->delete();

        return redirect()
            ->route('employees.family-members.create', $employee)
            ->with('success', 'Family member deleted successfully.');
    }
}