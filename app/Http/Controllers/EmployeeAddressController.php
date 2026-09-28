<?php

namespace App\Http\Controllers;

use App\Models\Employee;
use Illuminate\Http\Request;
use Inertia\Inertia;

class EmployeeAddressController extends Controller
{
    public function create(Employee $employee)
    {
        $addresses = $employee->addresses()
            ->latest()
            ->get();

        return Inertia::render('Employees/Addresses', [
            'employee' => $employee,
            'addresses' => $addresses,
        ]);
    }

    public function store(Request $request, Employee $employee)
    {
        $validated = $request->validate([
            'address_type' => 'required|string|max:50',
            'address_line_1' => 'required|string|max:255',
            'address_line_2' => 'nullable|string|max:255',
            'city' => 'required|string|max:100',
            'district' => 'nullable|string|max:100',
            'province' => 'nullable|string|max:100',
            'postal_code' => 'nullable|string|max:20',
            'country' => 'required|string|max:100',
            'is_primary' => 'required|boolean',
        ]);

        $employee->addresses()->create($validated);

        return redirect()
            ->route('employees.addresses.create', $employee)
            ->with('success', 'Address added successfully.');
    }

    public function destroy(Employee $employee, $address)
    {
        $employee->addresses()
            ->where('id', $address)
            ->delete();

        return redirect()
            ->route('employees.addresses.create', $employee)
            ->with('success', 'Address deleted successfully.');
    }
}