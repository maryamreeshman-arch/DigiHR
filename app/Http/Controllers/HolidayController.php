<?php

namespace App\Http\Controllers;

use App\Models\Holiday;
use App\Models\HolidayCalendar;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class HolidayController extends Controller
{
    private function getTenantId(): int
    {
        $tenantId = auth()->user()->tenant_id;

        abort_unless($tenantId, 403, 'Tenant not found.');

        return (int) $tenantId;
    }

    public function store(Request $request)
    {
        $tenantId = $this->getTenantId();

        $validated = $request->validate([
            'holiday_calendar_id' => [
                'required',
                'integer',
                Rule::exists('holiday_calendars', 'id')
                    ->where('tenant_id', $tenantId),
            ],
            'date' => ['required', 'date'],
            'name' => ['required', 'string', 'max:255'],
            'holiday_type' => [
                'required',
                'string',
                'in:public,company,religious,other',
            ],
        ]);

        Holiday::create($validated);

        return back()->with('success', 'Holiday created successfully.');
    }

    public function update(Request $request, Holiday $holiday)
    {
        $tenantId = $this->getTenantId();

        abort_unless(
            $holiday->holidayCalendar()->where('tenant_id', $tenantId)->exists(),
            404
        );

        $validated = $request->validate([
            'date' => ['required', 'date'],
            'name' => ['required', 'string', 'max:255'],
            'holiday_type' => [
                'required',
                'string',
                'in:public,company,religious,other',
            ],
        ]);

        $holiday->update($validated);

        return back()->with('success', 'Holiday updated successfully.');
    }

    public function destroy(Holiday $holiday)
    {
        $tenantId = $this->getTenantId();

        abort_unless(
            $holiday->holidayCalendar()->where('tenant_id', $tenantId)->exists(),
            404
        );

        $holiday->delete();

        return back()->with('success', 'Holiday deleted successfully.');
    }
}
