<?php

namespace App\Http\Controllers;

use App\Models\Employee;
use Illuminate\Http\Request;
use Inertia\Inertia;

class EmployeeEmergencyContactController extends Controller
{
    public function create(Employee $employee)
    {
        $emergencyContacts = $employee->emergencyContacts()
            ->latest()
            ->get();

        return Inertia::render('Employees/EmergencyContacts', [
            'employee' => $employee,
            'emergencyContacts' => $emergencyContacts,
        ]);
    }

    public function store(Request $request, Employee $employee)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:150',
            'relationship' => 'required|string|max:100',
            'phone' => 'required|string|max:50',
            'email' => 'nullable|email|max:150',
            'address' => 'nullable|string',
            'is_primary' => 'required|boolean',
        ]);

        $employee->emergencyContacts()->create($validated);

        return redirect()
            ->route('employees.emergency-contacts.create', $employee)
            ->with('success', 'Emergency contact added successfully.');
    }

    public function destroy(Employee $employee, $emergencyContact)
    {
        $employee->emergencyContacts()
            ->where('id', $emergencyContact)
            ->delete();

        return redirect()
            ->route('employees.emergency-contacts.create', $employee)
            ->with('success', 'Emergency contact deleted successfully.');
    }
}