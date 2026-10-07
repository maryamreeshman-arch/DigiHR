<?php

namespace App\Http\Controllers;

use App\Models\EmployeeOnboarding;
use App\Models\EmployeeOnboardingTask;
use App\Models\OnboardingTask;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class EmployeeOnboardingTaskController extends Controller
{
    public function index()
    {
        $onboardingTasks = EmployeeOnboardingTask::with([
            'employeeOnboarding.employee',
            'employeeOnboarding.template',
            'task',
            'assignedUser',
        ])
            ->latest()
            ->get();

        return Inertia::render(
            'Onboarding/EmployeeOnboardingTasks/Index',
            [
                'onboardingTasks' => $onboardingTasks,
                'employeeOnboardings' => EmployeeOnboarding::with('employee')
                    ->latest()
                    ->get(),
                'tasks' => OnboardingTask::with('template')
                    ->orderBy('title')
                    ->get(),
                'users' => User::orderBy('name')->get(),
            ]
        );
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'employee_onboarding_id' =>
                'required|exists:employee_onboardings,id',

            'task_id' =>
                'required|exists:onboarding_tasks,id',

            'assigned_to' =>
                'nullable|exists:users,id',

            'due_date' =>
                'nullable|date',

            'completed_at' =>
                'nullable|date',

            'status' =>
                'required|string|max:50',
        ]);

        EmployeeOnboardingTask::create($validated);

        return redirect()
            ->route('employee-onboarding-tasks.index')
            ->with(
                'success',
                'Employee onboarding task created successfully.'
            );
    }

    public function update(
        Request $request,
        EmployeeOnboardingTask $employeeOnboardingTask
    ) {
        $validated = $request->validate([
            'employee_onboarding_id' =>
                'required|exists:employee_onboardings,id',

            'task_id' =>
                'required|exists:onboarding_tasks,id',

            'assigned_to' =>
                'nullable|exists:users,id',

            'due_date' =>
                'nullable|date',

            'completed_at' =>
                'nullable|date',

            'status' =>
                'required|string|max:50',
        ]);

        $employeeOnboardingTask->update($validated);

        return redirect()
            ->route('employee-onboarding-tasks.index')
            ->with(
                'success',
                'Employee onboarding task updated successfully.'
            );
    }

    public function destroy(
        EmployeeOnboardingTask $employeeOnboardingTask
    ) {
        $employeeOnboardingTask->delete();

        return redirect()
            ->route('employee-onboarding-tasks.index')
            ->with(
                'success',
                'Employee onboarding task deleted successfully.'
            );
    }
}