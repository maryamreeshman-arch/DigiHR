<?php

namespace App\Http\Controllers;

use App\Models\OnboardingTemplate;
use App\Models\Tenant;
use Illuminate\Http\Request;
use Inertia\Inertia;

class OnboardingTemplateController extends Controller
{
    public function index()
    {
        $templates = OnboardingTemplate::with('tenant')
            ->latest()
            ->get();

        return Inertia::render(
            'Onboarding/Templates/Index',
            [
                'templates' => $templates,

                'tenants' => Tenant::orderBy('name')->get(),
            ]
        );
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'tenant_id' => 'required|exists:tenants,id',
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'status' => 'required|string|max:50',
        ]);

        OnboardingTemplate::create($validated);

        return redirect()
            ->route('onboarding-templates.index')
            ->with(
                'success',
                'Onboarding template created successfully.'
            );
    }

    public function update(
        Request $request,
        OnboardingTemplate $onboardingTemplate
    ) {
        $validated = $request->validate([
            'tenant_id' => 'required|exists:tenants,id',
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'status' => 'required|string|max:50',
        ]);

        $onboardingTemplate->update($validated);

        return redirect()
            ->route('onboarding-templates.index')
            ->with(
                'success',
                'Onboarding template updated successfully.'
            );
    }

    public function destroy(OnboardingTemplate $onboardingTemplate)
    {
        $onboardingTemplate->delete();

        return redirect()
            ->route('onboarding-templates.index')
            ->with(
                'success',
                'Onboarding template deleted successfully.'
            );
    }
}