<?php

namespace App\Http\Controllers;

use App\Models\Certification;
use App\Models\Employee;
use Illuminate\Http\Request;
use Inertia\Inertia;

class EmployeeCertificationController extends Controller
{
    public function create(Employee $employee)
    {
        $employeeCertifications = $employee->certifications()
            ->with('certification')
            ->latest()
            ->get();

        $certifications = Certification::where('tenant_id', $employee->tenant_id)
            ->orderBy('name')
            ->get();

        return Inertia::render('Employees/Certifications', [
            'employee' => $employee,
            'employeeCertifications' => $employeeCertifications,
            'certifications' => $certifications,
        ]);
    }

    public function store(Request $request, Employee $employee)
    {
        $validated = $request->validate([
            'certification_id' => 'required|exists:certifications,id',
            'certificate_no' => 'nullable|string|max:100',
            'issue_date' => 'required|date',
            'expiry_date' => 'nullable|date|after_or_equal:issue_date',
            'file_path' => 'nullable|string|max:255',
        ]);

        $employee->certifications()->create($validated);

        return redirect()
            ->route('employees.certifications.create', $employee)
            ->with('success', 'Certification added successfully.');
    }

    public function destroy(Employee $employee, $employeeCertification)
    {
        $employee->certifications()
            ->where('id', $employeeCertification)
            ->delete();

        return redirect()
            ->route('employees.certifications.create', $employee)
            ->with('success', 'Certification deleted successfully.');
    }
}