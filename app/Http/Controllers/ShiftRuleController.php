<?php

namespace App\Http\Controllers;

use App\Models\Shift;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ShiftRuleController extends Controller
{
    /**
     * Get the authenticated user's tenant ID.
     */
    private function getTenantId(Request $request): int
    {
        $tenantId = $request->user()->tenant_id;

        abort_if(
            !$tenantId,
            403,
            'Your account is not assigned to a company.'
        );

        return (int) $tenantId;
    }

    /**
     * Display all shifts and their rules.
     */
    public function index(Request $request)
    {
        $tenantId = $this->getTenantId($request);

        $shifts = Shift::with('shiftRule')
            ->where('tenant_id', $tenantId)
            ->orderBy('name')
            ->get();

        return Inertia::render('Attendance/ShiftRules/Index', [
            'shifts' => $shifts,
        ]);
    }

    /**
     * Create or update shift rules.
     */
    public function update(Request $request, Shift $shift)
    {
        $tenantId = $this->getTenantId($request);

        // Ensure the shift belongs to the authenticated tenant.
        abort_unless(
            (int) $shift->tenant_id === $tenantId,
            404
        );

        $validated = $request->validate([
            'late_after_minutes' => [
                'required',
                'integer',
                'min:0',
                'max:1440',
            ],

            'early_leave_before_minutes' => [
                'required',
                'integer',
                'min:0',
                'max:1440',
            ],

            'overtime_after_minutes' => [
                'required',
                'integer',
                'min:0',
                'max:1440',
            ],

            'overtime_rate' => [
                'required',
                'numeric',
                'min:0',
                'max:99.99',
            ],
        ]);

        $shift->shiftRule()->updateOrCreate(
            ['shift_id' => $shift->id],
            $validated
        );

        return redirect()
            ->route('shift-rules.index')
            ->with('success', 'Shift rules saved successfully.');
    }
}
