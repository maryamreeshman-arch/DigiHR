<?php

namespace App\Http\Controllers;

use App\Models\Employee;
use App\Models\EmployeePersonalDetail;
use Illuminate\Http\Request;
use Inertia\Inertia;

class EmployeePersonalDetailController extends Controller
{
    public function create(Employee $employee)
    {
        $personalDetail = $employee->personalDetail;

        return Inertia::render('Employees/PersonalDetails', [
            'employee' => $employee,
            'personalDetail' => $personalDetail,
        ]);
    }

    public function store(Request $request, Employee $employee)
    {
        $validated = $request->validate([
            'first_name' => 'required|string|max:100',
            'middle_name' => 'nullable|string|max:100',
            'last_name' => 'required|string|max:100',
            'preferred_name' => 'nullable|string|max:100',
            'date_of_birth' => 'nullable|date',
            'gender' => 'nullable|string|max:30',
            'marital_status' => 'nullable|string|max:30',
            'nationality' => 'nullable|string|max:100',
            'nic_number' => 'nullable|string|max:50',
            'passport_number' => 'nullable|string|max:50',
            'blood_group' => 'nullable|string|max:10',
            'photo_path' => 'nullable|string|max:255',
        ]);

        $employee->personalDetail()->updateOrCreate(
            ['employee_id' => $employee->id],
            $validated
        );

        return redirect()
            ->route('employees.personal-details.create', $employee)
            ->with('success', 'Personal details saved successfully.');
    }
}