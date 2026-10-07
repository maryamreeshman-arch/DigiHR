<?php

namespace App\Http\Controllers;

use App\Models\Application;
use App\Models\ApplicationStatusHistory;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ApplicationStatusHistoryController extends Controller
{
    public function index()
    {
        $histories = ApplicationStatusHistory::with([
            'application.candidate',
            'application.jobPosting',
            'changedBy',
        ])
            ->latest('changed_at')
            ->get();

        return Inertia::render(
            'Recruitment/ApplicationStatusHistories/Index',
            [
                'histories' => $histories,
                'applications' => Application::with([
                    'candidate',
                    'jobPosting',
                ])
                    ->latest()
                    ->get(),
                'users' => User::orderBy('name')->get(),
            ]
        );
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'application_id' => 'required|exists:applications,id',
            'status' => 'required|string|max:50',
            'remarks' => 'nullable|string',
            'changed_by' => 'nullable|exists:users,id',
            'changed_at' => 'required|date',
        ]);

        ApplicationStatusHistory::create($validated);

        return redirect()
            ->route('application-status-histories.index')
            ->with(
                'success',
                'Application status history created successfully.'
            );
    }

    public function update(
        Request $request,
        ApplicationStatusHistory $applicationStatusHistory
    ) {
        $validated = $request->validate([
            'application_id' => 'required|exists:applications,id',
            'status' => 'required|string|max:50',
            'remarks' => 'nullable|string',
            'changed_by' => 'nullable|exists:users,id',
            'changed_at' => 'required|date',
        ]);

        $applicationStatusHistory->update($validated);

        return redirect()
            ->route('application-status-histories.index')
            ->with(
                'success',
                'Application status history updated successfully.'
            );
    }

    public function destroy(
        ApplicationStatusHistory $applicationStatusHistory
    ) {
        $applicationStatusHistory->delete();

        return redirect()
            ->route('application-status-histories.index')
            ->with(
                'success',
                'Application status history deleted successfully.'
            );
    }
}