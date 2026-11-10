<?php

namespace App\Http\Controllers;

use App\Models\Shift;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class ShiftController extends Controller
{
    /**
     * Display all shifts.
     */
    public function index()
    {
        $shifts = Shift::with('shiftRule')
            ->orderBy('name')
            ->get();

        return Inertia::render(
            'Attendance/Shifts/Index',
            [
                'shifts' => $shifts,
            ]
        );
    }

    /**
     * Store a new shift.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'tenant_id' => 'required|exists:tenants,id',
            'name' => 'required|string|max:100',
            'code' => [
                'required',
                'string',
                'max:50',
                Rule::unique('shifts', 'code')
                    ->where('tenant_id', $request->tenant_id),
            ],
            'start_time' => 'required|date_format:H:i',
            'end_time' => 'required|date_format:H:i',
            'break_minutes' => 'required|integer|min:0|max:1440',
            'grace_minutes' => 'required|integer|min:0|max:1440',
            'crosses_midnight' => 'required|boolean',
            'status' => 'required|in:active,inactive',
        ]);

        Shift::create($validated);

        return redirect()
            ->route('shifts.index')
            ->with('success', 'Shift added successfully.');
    }

    /**
     * Update an existing shift.
     */
    public function update(Request $request, Shift $shift)
    {
        $validated = $request->validate([
            'tenant_id' => 'required|exists:tenants,id',
            'name' => 'required|string|max:100',
            'code' => [
                'required',
                'string',
                'max:50',
                Rule::unique('shifts', 'code')
                    ->where('tenant_id', $request->tenant_id)
                    ->ignore($shift->id),
            ],
            'start_time' => 'required|date_format:H:i',
            'end_time' => 'required|date_format:H:i',
            'break_minutes' => 'required|integer|min:0|max:1440',
            'grace_minutes' => 'required|integer|min:0|max:1440',
            'crosses_midnight' => 'required|boolean',
            'status' => 'required|in:active,inactive',
        ]);

        $shift->update($validated);

        return redirect()
            ->route('shifts.index')
            ->with('success', 'Shift updated successfully.');
    }

    /**
     * Delete a shift.
     */
    public function destroy(Shift $shift)
    {
        $shift->delete();

        return redirect()
            ->route('shifts.index')
            ->with('success', 'Shift deleted successfully.');
    }
}
