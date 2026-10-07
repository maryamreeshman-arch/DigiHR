<?php

namespace App\Http\Controllers;

use App\Models\Company;
use App\Models\Department;
use App\Models\JobRequisition;
use App\Models\Position;
use App\Models\Tenant;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class JobRequisitionController extends Controller
{
    public function index()
    {
        $requisitions = JobRequisition::with([
            'tenant',
            'company',
            'department',
            'position',
            'requester',
        ])
            ->latest()
            ->get();

        return Inertia::render(
            'Recruitment/JobRequisitions/Index',
            [
                'requisitions' => $requisitions,
                'tenants' => Tenant::orderBy('name')->get(),
                'companies' => Company::orderBy('name')->get(),
                'departments' => Department::orderBy('name')->get(),
                'positions' => Position::orderBy('title')->get(),
                'users' => User::orderBy('name')->get(),
            ]
        );
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'tenant_id' => 'required|exists:tenants,id',
            'company_id' => 'required|exists:companies,id',
            'department_id' => 'required|exists:departments,id',
            'position_id' => 'required|exists:positions,id',
            'requested_by' => 'required|exists:users,id',
            'number_of_positions' => 'required|integer|min:1',
            'reason' => 'required|string',
            'budget' => 'required|numeric|min:0',
            'status' => 'required|string|max:50',
            'approved_at' => 'nullable|date',
        ]);

        JobRequisition::create($validated);

        return redirect()
            ->route('job-requisitions.index')
            ->with('success', 'Job requisition created successfully.');
    }

    public function update(
        Request $request,
        JobRequisition $jobRequisition
    ) {
        $validated = $request->validate([
            'tenant_id' => 'required|exists:tenants,id',
            'company_id' => 'required|exists:companies,id',
            'department_id' => 'required|exists:departments,id',
            'position_id' => 'required|exists:positions,id',
            'requested_by' => 'required|exists:users,id',
            'number_of_positions' => 'required|integer|min:1',
            'reason' => 'required|string',
            'budget' => 'required|numeric|min:0',
            'status' => 'required|string|max:50',
            'approved_at' => 'nullable|date',
        ]);

        $jobRequisition->update($validated);

        return redirect()
            ->route('job-requisitions.index')
            ->with('success', 'Job requisition updated successfully.');
    }

    public function destroy(JobRequisition $jobRequisition)
    {
        $jobRequisition->delete();

        return redirect()
            ->route('job-requisitions.index')
            ->with('success', 'Job requisition deleted successfully.');
    }
}