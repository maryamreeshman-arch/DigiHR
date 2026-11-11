<?php

namespace App\Http\Controllers;

use App\Models\LeaveRequest;
use App\Models\LeaveRequestDay;
use Illuminate\Http\Request;

class LeaveRequestDayController extends Controller
{
    public function update(Request $request, LeaveRequestDay $leaveRequestDay)
    {
        $tenantId = auth()->user()->tenant_id;

        abort_unless(
            $leaveRequestDay->leaveRequest()
                ->where('tenant_id', $tenantId)
                ->exists(),
            404
        );

        abort_unless(
            $leaveRequestDay->leaveRequest->status === 'pending',
            403
        );

        $validated = $request->validate([
            'duration' => ['required', 'in:full_day,half_day'],
            'day_type' => ['required', 'in:full_day,morning,evening'],
        ]);

        $leaveRequestDay->update($validated);

        return back()->with('success', 'Leave request day updated successfully.');
    }

    public function destroy(LeaveRequestDay $leaveRequestDay)
    {
        $tenantId = auth()->user()->tenant_id;

        abort_unless(
            $leaveRequestDay->leaveRequest()
                ->where('tenant_id', $tenantId)
                ->exists(),
            404
        );

        abort_unless(
            $leaveRequestDay->leaveRequest->status === 'pending',
            403
        );

        $leaveRequestDay->delete();

        return back()->with('success', 'Leave request day deleted successfully.');
    }
}