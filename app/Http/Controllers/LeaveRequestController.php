<?php

namespace App\Http\Controllers;

use App\Models\Employee;
use App\Models\LeaveRequest;
use App\Models\LeaveType;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class LeaveRequestController extends Controller
{
    public function index()
    {
        $tenantId = auth()->user()->tenant_id;

        $requests = LeaveRequest::where('tenant_id', $tenantId)
            ->with(['employee', 'leaveType', 'days'])
            ->latest()
            ->get();

        $employees = Employee::where('tenant_id', $tenantId)->get();

        $leaveTypes = LeaveType::where('tenant_id', $tenantId)
            ->where('status', true)
            ->get();

        return Inertia::render('LeaveManagement/LeaveRequests/Index', [
            'requests' => $requests,
            'employees' => $employees,
            'leaveTypes' => $leaveTypes,
        ]);
    }

    public function store(Request $request)
    {
        $tenantId = auth()->user()->tenant_id;

        $validated = $request->validate([
            'employee_id' => [
                'required',
                'integer',
                Rule::exists('employees', 'id')
                    ->where('tenant_id', $tenantId),
            ],
            'leave_type_id' => [
                'required',
                'integer',
                Rule::exists('leave_types', 'id')
                    ->where('tenant_id', $tenantId)
                    ->where('status', true),
            ],
            'start_date' => ['required', 'date'],
            'end_date' => ['required', 'date', 'after_or_equal:start_date'],
            'total_days' => ['required', 'numeric', 'gt:0'],
            'reason' => ['nullable', 'string', 'max:2000'],
            'attachment' => ['nullable', 'file', 'mimes:pdf,jpg,jpeg,png', 'max:5120'],
            'days' => ['required', 'array', 'min:1'],
            'days.*.date' => ['required', 'date', 'distinct'],
            'days.*.duration' => ['required', Rule::in(['full_day', 'half_day'])],
            'days.*.day_type' => ['required', Rule::in(['full_day', 'morning', 'evening'])],
        ]);

        $leaveType = LeaveType::where('tenant_id', $tenantId)
            ->findOrFail($validated['leave_type_id']);

        if (!$leaveType->allow_half_day) {
            foreach ($validated['days'] as $day) {
                if ($day['duration'] === 'half_day') {
                    return back()->withErrors([
                        'days' => 'Half-day leave is not allowed for this leave type.',
                    ]);
                }
            }
        }

        $attachmentPath = $request->hasFile('attachment')
            ? $request->file('attachment')->store('leave-attachments', 'public')
            : null;

        DB::transaction(function () use ($validated, $tenantId, $attachmentPath) {
            $leaveRequest = LeaveRequest::create([
                'tenant_id' => $tenantId,
                'employee_id' => $validated['employee_id'],
                'leave_type_id' => $validated['leave_type_id'],
                'start_date' => $validated['start_date'],
                'end_date' => $validated['end_date'],
                'total_days' => $validated['total_days'],
                'reason' => $validated['reason'] ?? null,
                'attachment_path' => $attachmentPath,
                'status' => 'pending',
            ]);

            foreach ($validated['days'] as $day) {
                $leaveRequest->days()->create([
                    'date' => $day['date'],
                    'duration' => $day['duration'],
                    'day_type' => $day['day_type'],
                ]);
            }
        });

        return redirect()->route('leave-requests.index')
            ->with('success', 'Leave request submitted successfully.');
    }

    public function update(Request $request, LeaveRequest $leaveRequest)
    {
        $tenantId = auth()->user()->tenant_id;

        abort_unless($leaveRequest->tenant_id === $tenantId, 404);

        if ($leaveRequest->status !== 'pending') {
            return back()->withErrors([
                'status' => 'Only pending leave requests can be edited.',
            ]);
        }

        $validated = $request->validate([
            'leave_type_id' => [
                'required',
                'integer',
                Rule::exists('leave_types', 'id')
                    ->where('tenant_id', $tenantId)
                    ->where('status', true),
            ],
            'start_date' => ['required', 'date'],
            'end_date' => ['required', 'date', 'after_or_equal:start_date'],
            'total_days' => ['required', 'numeric', 'gt:0'],
            'reason' => ['nullable', 'string', 'max:2000'],
            'attachment' => ['nullable', 'file', 'mimes:pdf,jpg,jpeg,png', 'max:5120'],
            'days' => ['required', 'array', 'min:1'],
            'days.*.date' => ['required', 'date', 'distinct'],
            'days.*.duration' => ['required', Rule::in(['full_day', 'half_day'])],
            'days.*.day_type' => ['required', Rule::in(['full_day', 'morning', 'evening'])],
        ]);

        $leaveType = LeaveType::where('tenant_id', $tenantId)
            ->findOrFail($validated['leave_type_id']);

        if (!$leaveType->allow_half_day) {
            foreach ($validated['days'] as $day) {
                if ($day['duration'] === 'half_day') {
                    return back()->withErrors([
                        'days' => 'Half-day leave is not allowed for this leave type.',
                    ]);
                }
            }
        }

        DB::transaction(function () use ($request, $validated, $leaveRequest) {
            $attachmentPath = $leaveRequest->attachment_path;

            if ($request->hasFile('attachment')) {
                if ($attachmentPath) {
                    Storage::disk('public')->delete($attachmentPath);
                }

                $attachmentPath = $request->file('attachment')
                    ->store('leave-attachments', 'public');
            }

            $leaveRequest->update([
                'leave_type_id' => $validated['leave_type_id'],
                'start_date' => $validated['start_date'],
                'end_date' => $validated['end_date'],
                'total_days' => $validated['total_days'],
                'reason' => $validated['reason'] ?? null,
                'attachment_path' => $attachmentPath,
            ]);

            $leaveRequest->days()->delete();

            foreach ($validated['days'] as $day) {
                $leaveRequest->days()->create([
                    'date' => $day['date'],
                    'duration' => $day['duration'],
                    'day_type' => $day['day_type'],
                ]);
            }
        });

        return redirect()->route('leave-requests.index')
            ->with('success', 'Leave request updated successfully.');
    }

    public function approve(LeaveRequest $leaveRequest)
    {
        $tenantId = auth()->user()->tenant_id;

        abort_unless($leaveRequest->tenant_id === $tenantId, 404);

        if ($leaveRequest->status !== 'pending') {
            return back()->withErrors([
                'status' => 'This leave request has already been processed.',
            ]);
        }

        $leaveRequest->update(['status' => 'approved']);

        return back()->with('success', 'Leave request approved successfully.');
    }

    public function reject(LeaveRequest $leaveRequest)
    {
        $tenantId = auth()->user()->tenant_id;

        abort_unless($leaveRequest->tenant_id === $tenantId, 404);

        if ($leaveRequest->status !== 'pending') {
            return back()->withErrors([
                'status' => 'This leave request has already been processed.',
            ]);
        }

        $leaveRequest->update(['status' => 'rejected']);

        return back()->with('success', 'Leave request rejected successfully.');
    }

    public function destroy(LeaveRequest $leaveRequest)
    {
        $tenantId = auth()->user()->tenant_id;

        abort_unless($leaveRequest->tenant_id === $tenantId, 404);

        if ($leaveRequest->status !== 'pending') {
            return back()->withErrors([
                'status' => 'Only pending leave requests can be cancelled.',
            ]);
        }

        if ($leaveRequest->attachment_path) {
            Storage::disk('public')->delete($leaveRequest->attachment_path);
        }

        $leaveRequest->delete();

        return redirect()->route('leave-requests.index')
            ->with('success', 'Leave request cancelled successfully.');
    }
}