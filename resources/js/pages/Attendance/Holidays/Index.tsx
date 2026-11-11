import { FormEvent, useState } from 'react';
import { Head, router, useForm } from '@inertiajs/react';

interface Holiday {
    id: number;
    holiday_calendar_id: number;
    date: string;
    name: string;
    holiday_type: string;
}

interface HolidayCalendar {
    id: number;
    name: string;
    country: string;
    year: number;
    holidays: Holiday[];
}

interface Props {
    calendars: HolidayCalendar[];
}

export default function Index({ calendars }: Props) {
    const [editingCalendar, setEditingCalendar] =
        useState<number | null>(null);

    const [selectedCalendar, setSelectedCalendar] =
        useState<number | null>(null);

    const [editingHoliday, setEditingHoliday] =
        useState<number | null>(null);

    const calendarForm = useForm({
        name: '',
        country: '',
        year: new Date().getFullYear(),
    });

    const holidayForm = useForm({
        holiday_calendar_id: '',
        date: '',
        name: '',
        holiday_type: 'public',
    });

    const activeCalendar = calendars.find(
        (calendar) => calendar.id === selectedCalendar,
    );

    const submitCalendar = (e: FormEvent) => {
        e.preventDefault();

        if (editingCalendar) {
            calendarForm.put(
                `/holiday-calendars/${editingCalendar}`,
                {
                    onSuccess: () => {
                        calendarForm.reset();
                        setEditingCalendar(null);
                    },
                },
            );
        } else {
            calendarForm.post('/holiday-calendars', {
                onSuccess: () => calendarForm.reset(),
            });
        }
    };

    const editCalendar = (calendar: HolidayCalendar) => {
        setEditingCalendar(calendar.id);
        calendarForm.setData({
            name: calendar.name,
            country: calendar.country,
            year: calendar.year,
        });
    };

    const deleteCalendar = (id: number) => {
        if (confirm('Are you sure you want to delete this calendar and all its holidays?')) {
            router.delete(`/holiday-calendars/${id}`, {
                onSuccess: () => {
                    if (selectedCalendar === id) {
                        setSelectedCalendar(null);
                    }
                },
            });
        }
    };

    
const submitHoliday = (e: FormEvent) => {
    e.preventDefault();

    const data = {
        ...holidayForm.data,
        holiday_calendar_id: String(
            editingHoliday
                ? holidayForm.data.holiday_calendar_id
                : selectedCalendar,
        ),
    };

    if (editingHoliday) {
        router.put(`/holidays/${editingHoliday}`, {
            date: data.date,
            name: data.name,
            holiday_type: data.holiday_type,
        }, {
            onSuccess: () => {
                holidayForm.reset();
                setEditingHoliday(null);
            },
        });
    } else {
        router.post('/holidays', data, {
            onSuccess: () => holidayForm.reset(),
        });
    }
};


    const editHoliday = (holiday: Holiday) => {
        setEditingHoliday(holiday.id);
        holidayForm.setData({
            holiday_calendar_id: String(holiday.holiday_calendar_id),
            date: holiday.date.substring(0, 10),
            name: holiday.name,
            holiday_type: holiday.holiday_type,
        });
    };

    const deleteHoliday = (id: number) => {
        if (confirm('Are you sure you want to delete this holiday?')) {
            router.delete(`/holidays/${id}`);
        }
    };

    const cancelCalendarEdit = () => {
        setEditingCalendar(null);
        calendarForm.reset();
    };

    const cancelHolidayEdit = () => {
        setEditingHoliday(null);
        holidayForm.reset();
    };

    return (
        <>
            <Head title="Holiday Management" />

            <div className="space-y-6 bg-white p-6 text-gray-900">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">
                        Holiday Management
                    </h1>
                    <p className="mt-1 text-sm text-gray-600">
                        Manage country-wise and company holiday calendars.
                    </p>
                </div>

                {/* Calendar Form */}
                <section className="rounded-lg border border-gray-200 p-5">
                    <h2 className="mb-4 text-lg font-semibold text-gray-900">
                        {editingCalendar
                            ? 'Edit Holiday Calendar'
                            : 'Create Holiday Calendar'}
                    </h2>

                    <form onSubmit={submitCalendar} className="space-y-4">
                        <div className="grid gap-4 md:grid-cols-3">
                            <div>
                                <label className="mb-1 block text-sm font-medium text-gray-900">
                                    Calendar Name
                                </label>
                                <input
                                    type="text"
                                    value={calendarForm.data.name}
                                    onChange={(e) =>
                                        calendarForm.setData('name', e.target.value)
                                    }
                                    placeholder="Sri Lanka Holidays"
                                    className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900"
                                    required
                                />
                                {calendarForm.errors.name && (
                                    <p className="mt-1 text-sm text-red-600">
                                        {calendarForm.errors.name}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="mb-1 block text-sm font-medium text-gray-900">
                                    Country
                                </label>
                                <input
                                    type="text"
                                    value={calendarForm.data.country}
                                    onChange={(e) =>
                                        calendarForm.setData('country', e.target.value)
                                    }
                                    placeholder="Sri Lanka"
                                    className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900"
                                    required
                                />
                                {calendarForm.errors.country && (
                                    <p className="mt-1 text-sm text-red-600">
                                        {calendarForm.errors.country}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="mb-1 block text-sm font-medium text-gray-900">
                                    Year
                                </label>
                                <input
                                    type="number"
                                    min="2000"
                                    max="2100"
                                    value={calendarForm.data.year}
                                    onChange={(e) =>
                                        calendarForm.setData(
                                            'year',
                                            Number(e.target.value),
                                        )
                                    }
                                    className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900"
                                    required
                                />
                                {calendarForm.errors.year && (
                                    <p className="mt-1 text-sm text-red-600">
                                        {calendarForm.errors.year}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div className="flex gap-2">
                            <button
                                type="submit"
                                disabled={calendarForm.processing}
                                className="rounded-lg bg-blue-600 px-5 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
                            >
                                {calendarForm.processing
                                    ? 'Saving...'
                                    : editingCalendar
                                      ? 'Update Calendar'
                                      : 'Create Calendar'}
                            </button>

                            {editingCalendar && (
                                <button
                                    type="button"
                                    onClick={cancelCalendarEdit}
                                    className="rounded-lg border border-gray-300 px-5 py-2 text-gray-700"
                                >
                                    Cancel
                                </button>
                            )}
                        </div>
                    </form>
                </section>

                {/* Calendar List */}
                <section className="rounded-lg border border-gray-200 p-5">
                    <h2 className="mb-4 text-lg font-semibold text-gray-900">
                        Holiday Calendars
                    </h2>

                    {calendars.length === 0 ? (
                        <p className="text-sm text-gray-500">
                            No holiday calendars created yet.
                        </p>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-sm text-gray-900">
                                <thead className="bg-gray-100 text-gray-900">
                                    <tr>
                                        <th className="p-3">Calendar Name</th>
                                        <th className="p-3">Country</th>
                                        <th className="p-3">Year</th>
                                        <th className="p-3">Holidays</th>
                                        <th className="p-3">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {calendars.map((calendar) => (
                                        <tr
                                            key={calendar.id}
                                            className="border-t border-gray-200"
                                        >
                                            <td className="p-3 font-medium">
                                                {calendar.name}
                                            </td>
                                            <td className="p-3">
                                                {calendar.country}
                                            </td>
                                            <td className="p-3">
                                                {calendar.year}
                                            </td>
                                            <td className="p-3">
                                                {calendar.holidays.length}
                                            </td>
                                            <td className="space-x-2 p-3">
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        setSelectedCalendar(calendar.id)
                                                    }
                                                    className="text-blue-600 hover:underline"
                                                >
                                                    Manage Holidays
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        editCalendar(calendar)
                                                    }
                                                    className="text-green-600 hover:underline"
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        deleteCalendar(calendar.id)
                                                    }
                                                    className="text-red-600 hover:underline"
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </section>

                {/* Holiday Form and List */}
                {activeCalendar && (
                    <section className="space-y-5 rounded-lg border border-gray-200 p-5">
                        <div>
                            <h2 className="text-lg font-semibold text-gray-900">
                                Holidays – {activeCalendar.name}
                            </h2>
                            <p className="text-sm text-gray-600">
                                {activeCalendar.country} · {activeCalendar.year}
                            </p>
                        </div>

                        <form onSubmit={submitHoliday} className="space-y-4">
                            <input
                                type="hidden"
                                value={holidayForm.data.holiday_calendar_id}
                            />

                            <div className="grid gap-4 md:grid-cols-3">
                                <div>
                                    <label className="mb-1 block text-sm font-medium text-gray-900">
                                        Holiday Name
                                    </label>
                                    <input
                                        type="text"
                                        value={holidayForm.data.name}
                                        onChange={(e) =>
                                            holidayForm.setData('name', e.target.value)
                                        }
                                        placeholder="Independence Day"
                                        className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900"
                                        required
                                    />
                                    {holidayForm.errors.name && (
                                        <p className="mt-1 text-sm text-red-600">
                                            {holidayForm.errors.name}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label className="mb-1 block text-sm font-medium text-gray-900">
                                        Date
                                    </label>
                                    <input
                                        type="date"
                                        value={holidayForm.data.date}
                                        onChange={(e) =>
                                            holidayForm.setData('date', e.target.value)
                                        }
                                        min={`${activeCalendar.year}-01-01`}
                                        max={`${activeCalendar.year}-12-31`}
                                        className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900"
                                        required
                                    />
                                    {holidayForm.errors.date && (
                                        <p className="mt-1 text-sm text-red-600">
                                            {holidayForm.errors.date}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label className="mb-1 block text-sm font-medium text-gray-900">
                                        Holiday Type
                                    </label>
                                    <select
                                        value={holidayForm.data.holiday_type}
                                        onChange={(e) =>
                                            holidayForm.setData(
                                                'holiday_type',
                                                e.target.value,
                                            )
                                        }
                                        className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900"
                                    >
                                        <option value="public">Public</option>
                                        <option value="company">Company</option>
                                        <option value="religious">Religious</option>
                                        <option value="other">Other</option>
                                    </select>
                                    {holidayForm.errors.holiday_type && (
                                        <p className="mt-1 text-sm text-red-600">
                                            {holidayForm.errors.holiday_type}
                                        </p>
                                    )}
                                </div>
                            </div>

                            <div className="flex gap-2">
                                <button
                                    type="submit"
                                    disabled={holidayForm.processing}
                                    onClick={() => {
                                        if (!editingHoliday) {
                                            holidayForm.setData(
                                                'holiday_calendar_id',
                                                String(activeCalendar.id),
                                            );
                                        }
                                    }}
                                    className="rounded-lg bg-blue-600 px-5 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
                                >
                                    {holidayForm.processing
                                        ? 'Saving...'
                                        : editingHoliday
                                          ? 'Update Holiday'
                                          : 'Add Holiday'}
                                </button>

                                {editingHoliday && (
                                    <button
                                        type="button"
                                        onClick={cancelHolidayEdit}
                                        className="rounded-lg border border-gray-300 px-5 py-2 text-gray-700"
                                    >
                                        Cancel
                                    </button>
                                )}
                            </div>
                        </form>

                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-sm text-gray-900">
                                <thead className="bg-gray-100 text-gray-900">
                                    <tr>
                                        <th className="p-3">Date</th>
                                        <th className="p-3">Holiday Name</th>
                                        <th className="p-3">Type</th>
                                        <th className="p-3">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {activeCalendar.holidays.length === 0 ? (
                                        <tr>
                                            <td
                                                colSpan={4}
                                                className="p-4 text-center text-gray-500"
                                            >
                                                No holidays added to this calendar.
                                            </td>
                                        </tr>
                                    ) : (
                                        activeCalendar.holidays.map((holiday) => (
                                            <tr
                                                key={holiday.id}
                                                className="border-t border-gray-200"
                                            >
                                                <td className="p-3">
                                                    {holiday.date.substring(0, 10)}
                                                </td>
                                                <td className="p-3">
                                                    {holiday.name}
                                                </td>
                                                <td className="p-3 capitalize">
                                                    {holiday.holiday_type}
                                                </td>
                                                <td className="space-x-3 p-3">
                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            editHoliday(holiday)
                                                        }
                                                        className="text-green-600 hover:underline"
                                                    >
                                                        Edit
                                                    </button>
                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            deleteHoliday(holiday.id)
                                                        }
                                                        className="text-red-600 hover:underline"
                                                    >
                                                        Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </section>
                )}
            </div>
        </>
    );
}
