<?php

namespace App\Http\Controllers;

use App\Models\Employee;
use App\Models\EmployeeOnboarding;
use App\Models\OnboardingTemplate;
use Illuminate\Http\Request;
use Inertia\Inertia;

class EmployeeOnboardingController extends Controller
{
    public function index()
    {
        $onboardings = EmployeeOnboarding::with([
            'employee',
            'template',
        ])
            ->latest()
            ->get();

        return Inertia::render(
            'Onboarding/EmployeeOnboardings/Index',
            [
                'onboardings' => $onboardings,
                'employees' => Employee::orderBy('id')->get(),
                'templates' => OnboardingTemplate::where('status', 'Active')
                    ->orderBy('name')
                    ->get(),
            ]
        );
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'employee_id' => 'required|exists:employees,id',
            'template_id' => 'required|exists:onboarding_templates,id',
            'start_date' => 'required|date',
            'completion_date' => 'nullable|date|after_or_equal:start_date',
            'status' => 'required|string|max:50',
        ]);

        EmployeeOnboarding::create($validated);

        return redirect()
            ->route('employee-onboardings.index')
            ->with('success', 'Employee onboarding created successfully.');
    }

    public function update(
        Request $request,
        EmployeeOnboarding $employeeOnboarding
    ) {
        $validated = $request->validate([
            'employee_id' => 'required|exists:employees,id',
            'template_id' => 'required|exists:onboarding_templates,id',
            'start_date' => 'required|date',
            'completion_date' => 'nullable|date|after_or_equal:start_date',
            'status' => 'required|string|max:50',
        ]);

        $employeeOnboarding->update($validated);

        return redirect()
            ->route('employee-onboardings.index')
            ->with('success', 'Employee onboarding updated successfully.');
    }

    public function destroy(EmployeeOnboarding $employeeOnboarding)
    {
        $employeeOnboarding->delete();

        return redirect()
            ->route('employee-onboardings.index')
            ->with('success', 'Employee onboarding deleted successfully.');
    }
}