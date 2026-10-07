<?php

namespace App\Http\Controllers;

use App\Models\OnboardingTask;
use App\Models\OnboardingTemplate;
use Illuminate\Http\Request;
use Inertia\Inertia;

class OnboardingTaskController extends Controller
{
    public function index()
    {
        $tasks = OnboardingTask::with('template')
            ->latest()
            ->get();

        return Inertia::render(
            'Onboarding/Tasks/Index',
            [
                'tasks' => $tasks,

                'templates' => OnboardingTemplate::orderBy('name')
                    ->get(),
            ]
        );
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'template_id' => 'required|exists:onboarding_templates,id',
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'assigned_role' => 'nullable|string|max:255',
            'days_from_join_date' => 'required|integer|min:0',
            'required' => 'required|boolean',
        ]);

        OnboardingTask::create($validated);

        return redirect()
            ->route('onboarding-tasks.index')
            ->with(
                'success',
                'Onboarding task created successfully.'
            );
    }

    public function update(
        Request $request,
        OnboardingTask $onboardingTask
    ) {
        $validated = $request->validate([
            'template_id' => 'required|exists:onboarding_templates,id',
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'assigned_role' => 'nullable|string|max:255',
            'days_from_join_date' => 'required|integer|min:0',
            'required' => 'required|boolean',
        ]);

        $onboardingTask->update($validated);

        return redirect()
            ->route('onboarding-tasks.index')
            ->with(
                'success',
                'Onboarding task updated successfully.'
            );
    }

    public function destroy(OnboardingTask $onboardingTask)
    {
        $onboardingTask->delete();

        return redirect()
            ->route('onboarding-tasks.index')
            ->with(
                'success',
                'Onboarding task deleted successfully.'
            );
    }
}