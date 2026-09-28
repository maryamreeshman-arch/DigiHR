<?php

namespace App\Http\Controllers;

use App\Models\Employee;
use Illuminate\Http\Request;
use Inertia\Inertia;

class EmployeeContactController extends Controller
{
    public function create(Employee $employee)
    {
        $contacts = $employee->contacts()
            ->latest()
            ->get();

        return Inertia::render('Employees/Contacts', [
            'employee' => $employee,
            'contacts' => $contacts,
        ]);
    }

    public function store(Request $request, Employee $employee)
    {
        $validated = $request->validate([
            'contact_type' => 'required|in:mobile,personal_email,work_email',
            'contact_value' => 'required|string|max:255',
            'is_primary' => 'required|boolean',
            'verified_at' => 'nullable|date',
        ]);

        $employee->contacts()->create($validated);

        return redirect()
            ->route('employees.contacts.create', $employee)
            ->with('success', 'Contact added successfully.');
    }

    public function destroy(Employee $employee, $contact)
    {
        $employee->contacts()
            ->where('id', $contact)
            ->delete();

        return redirect()
            ->route('employees.contacts.create', $employee)
            ->with('success', 'Contact deleted successfully.');
    }
}