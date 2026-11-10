<?php

namespace App\Http\Controllers;

use App\Models\AttendancePunch;
use App\Models\AttendanceRecord;
use App\Models\Employee;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class AttendanceController extends Controller
{
    /**
     * Show today's attendance and recent attendance history.
     */
    public function index(Request $request)
    {
        $employee = Employee::where('user_id', $request->user()->id)
            ->first();

        if (! $employee) {
            abort(403, 'No employee profile is linked to your account.');
        }

        $today = now()->toDateString();

        // Get today's attendance record.
        $record = AttendanceRecord::where('tenant_id', $employee->tenant_id)
            ->where('employee_id', $employee->id)
            ->whereDate('attendance_date', $today)
            ->first();

        // Get the latest 30 attendance records.
        $records = AttendanceRecord::where('tenant_id', $employee->tenant_id)
            ->where('employee_id', $employee->id)
            ->orderByDesc('attendance_date')
            ->limit(30)
            ->get();

        return inertia('Attendance/Index', [
            'record' => $record,
            'records' => $records,
        ]);
    }

    /**
     * Record the employee's check-in.
     */
    public function checkIn(Request $request): RedirectResponse
    {
        $employee = Employee::where('user_id', $request->user()->id)
            ->first();

        if (! $employee) {
            abort(403, 'No employee profile is linked to your account.');
        }

        $now = now();
        $today = $now->toDateString();

        DB::transaction(function () use ($employee, $now, $today) {
            $record = AttendanceRecord::where('tenant_id', $employee->tenant_id)
                ->where('employee_id', $employee->id)
                ->whereDate('attendance_date', $today)
                ->first();

            if ($record && $record->check_in !== null) {
                abort(422, 'You have already checked in today.');
            }

            if (! $record) {
                $record = AttendanceRecord::create([
                    'tenant_id' => $employee->tenant_id,
                    'employee_id' => $employee->id,
                    'attendance_date' => $today,
                    'status' => 'present',
                ]);
            }

            $record->update([
                'check_in' => $now,
                'status' => 'present',
            ]);

            AttendancePunch::create([
                'tenant_id' => $employee->tenant_id,
                'employee_id' => $employee->id,
                'punch_type' => 'in',
                'punched_at' => $now,
                'source' => 'web',
            ]);
        });

        return back()->with('success', 'Checked in successfully.');
    }

    /**
     * Record the employee's check-out.
     */
    public function checkOut(Request $request): RedirectResponse
    {
        $employee = Employee::where('user_id', $request->user()->id)
            ->first();

        if (! $employee) {
            abort(403, 'No employee profile is linked to your account.');
        }

        $now = now();
        $today = $now->toDateString();

        DB::transaction(function () use ($employee, $now, $today) {
            $record = AttendanceRecord::where('tenant_id', $employee->tenant_id)
                ->where('employee_id', $employee->id)
                ->whereDate('attendance_date', $today)
                ->first();

            if (! $record || $record->check_in === null) {
                abort(422, 'Please check in before checking out.');
            }

            if ($record->check_out !== null) {
                abort(422, 'You have already checked out today.');
            }

            $record->update([
                'check_out' => $now,
            ]);

            AttendancePunch::create([
                'tenant_id' => $employee->tenant_id,
                'employee_id' => $employee->id,
                'punch_type' => 'out',
                'punched_at' => $now,
                'source' => 'web',
            ]);
        });

        return back()->with('success', 'Checked out successfully.');
    }
}
