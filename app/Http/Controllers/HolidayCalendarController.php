<?php

namespace App\Http\Controllers;

use App\Models\HolidayCalendar;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class HolidayCalendarController extends Controller
{
    private function getTenantId(): int
    {
        $tenantId = auth()->user()->tenant_id;

        abort_unless($tenantId, 403, 'Tenant not found.');

        return (int) $tenantId;
    }

    public function index()
    {
        $tenantId = $this->getTenantId();

        $calendars = HolidayCalendar::where('tenant_id', $tenantId)
            ->with('holidays')
            ->orderByDesc('year')
            ->get();

        return Inertia::render('Attendance/Holidays/Index', [
            'calendars' => $calendars,
        ]);
    }

    public function store(Request $request)
    {
        $tenantId = $this->getTenantId();

        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'country' => ['required', 'string', 'max:100'],
            'year' => ['required', 'integer', 'min:2000', 'max:2100',
                Rule::unique('holiday_calendars')->where(
                    fn ($query) => $query
                        ->where('tenant_id', $tenantId)
                        ->where('country', $request->country)
                ),
            ],
        ]);

        HolidayCalendar::create([
            ...$validated,
            'tenant_id' => $tenantId,
        ]);

        return redirect()->route('holiday-calendars.index')
            ->with('success', 'Holiday calendar created successfully.');
    }

    public function update(Request $request, HolidayCalendar $holidayCalendar)
    {
        $tenantId = $this->getTenantId();

        abort_unless($holidayCalendar->tenant_id === $tenantId, 404);

        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'country' => ['required', 'string', 'max:100'],
            'year' => [
                'required',
                'integer',
                'min:2000',
                'max:2100',
                Rule::unique('holiday_calendars')
                    ->where(fn ($query) => $query
                        ->where('tenant_id', $tenantId)
                        ->where('country', $request->country))
                    ->ignore($holidayCalendar->id),
            ],
        ]);

        $holidayCalendar->update($validated);

        return redirect()->route('holiday-calendars.index')
            ->with('success', 'Holiday calendar updated successfully.');
    }

    public function destroy(HolidayCalendar $holidayCalendar)
    {
        $tenantId = $this->getTenantId();

        abort_unless($holidayCalendar->tenant_id === $tenantId, 404);

        $holidayCalendar->delete();

        return redirect()->route('holiday-calendars.index')
            ->with('success', 'Holiday calendar deleted successfully.');
    }
}
