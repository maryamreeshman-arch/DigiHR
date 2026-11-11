import { FormEvent, useState } from 'react';
import { Head, router, useForm } from '@inertiajs/react';

interface Employee {
    id: number;
    employee_no: string;
    first_name: string;
    last_name: string;
}

interface Shift {
    id: number;
    name: string;
    code: string;
}

interface RosterAssignment {
    id: number;
    employee_id: number;
    shift_id: number | null;
    date: string;
    status: string;
    employee: Employee;
    shift: Shift | null;
}

interface Roster {
    id: number;
    name: string;
    period_start: string;
    period_end: string;
    status: string;
    assignments: RosterAssignment[];
}

interface Props {
    rosters: Roster[];
    employees: Employee[];
    shifts: Shift[];
}

export default function Index({ rosters, employees, shifts }: Props) {
    const [editingRoster, setEditingRoster] = useState<Roster | null>(null);
    const [selectedRoster, setSelectedRoster] = useState<number | null>(null);
    const [editingAssignment, setEditingAssignment] =
        useState<RosterAssignment | null>(null);

    const rosterForm = useForm({
        name: '',
        period_start: '',
        period_end: '',
        status: 'draft',
    });

    const assignmentForm = useForm({
        roster_id: '',
        employee_id: '',
        date: '',
        shift_id: '',
        status: 'scheduled',
    });

    const startRosterEdit = (roster: Roster) => {
        setEditingRoster(roster);

        rosterForm.setData({
            name: roster.name,
            period_start: roster.period_start.slice(0, 10),
            period_end: roster.period_end.slice(0, 10),
            status: roster.status,
        });
    };

    const submitRoster = (e: FormEvent) => {
        e.preventDefault();

        if (editingRoster) {
            rosterForm.put(`/rosters/${editingRoster.id}`, {
                onSuccess: () => {
                    rosterForm.reset();
                    setEditingRoster(null);
                },
            });
        } else {
            rosterForm.post('/rosters', {
                onSuccess: () => rosterForm.reset(),
            });
        }
    };

    const deleteRoster = (id: number) => {
        if (confirm('Are you sure you want to delete this roster?')) {
            router.delete(`/rosters/${id}`);
        }
    };

    const startAssignmentEdit = (
        assignment: RosterAssignment,
        rosterId: number
    ) => {
        setEditingAssignment(assignment);
        setSelectedRoster(rosterId);

        assignmentForm.setData({
            roster_id: String(rosterId),
            employee_id: String(assignment.employee_id),
            date: assignment.date.slice(0, 10),
            shift_id: assignment.shift_id
                ? String(assignment.shift_id)
                : '',
            status: assignment.status,
        });
    };

    const submitAssignment = (e: FormEvent) => {
        e.preventDefault();

        const data = {
            employee_id: assignmentForm.data.employee_id,
            date: assignmentForm.data.date,
            shift_id: assignmentForm.data.shift_id || null,
            status: assignmentForm.data.status,
        };

        if (editingAssignment) {
            assignmentForm.put(
                `/roster-assignments/${editingAssignment.id}`,
                {
                    onSuccess: () => {
                        assignmentForm.reset();
                        setEditingAssignment(null);
                    },
                }
            );
        } else {
            assignmentForm.post('/roster-assignments', {
                onSuccess: () => assignmentForm.reset(),
            });
        }
    };

    const deleteAssignment = (id: number) => {
        if (confirm('Delete this roster assignment?')) {
            router.delete(`/roster-assignments/${id}`);
        }
    };

    const activeRoster = rosters.find(
        (roster) => roster.id === Number(assignmentForm.data.roster_id)
    );

    return (
        <>
            <Head title="Shift Roster" />

            <div className="space-y-6 bg-white p-6 text-gray-900">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">
                        Shift Roster
                    </h1>
                    <p className="mt-1 text-sm text-gray-500">
                        Plan daily, weekly and monthly employee shifts.
                    </p>
                </div>

                {/* Create / Edit Roster */}
                <div className="rounded-xl border bg-white p-6 shadow-sm">
                    <h2 className="mb-4 text-lg font-semibold">
                        {editingRoster ? 'Edit Roster' : 'Create New Roster'}
                    </h2>

                    <form onSubmit={submitRoster} className="space-y-4">
                        <div>
                            <label className="mb-1 block text-sm font-medium">
                                Roster Name
                            </label>
                            <input
                                type="text"
                                value={rosterForm.data.name}
                                onChange={(e) =>
                                    rosterForm.setData('name', e.target.value)
                                }
                                placeholder="e.g. November Weekly Roster"
                                className="w-full rounded-lg border px-3 py-2"
                                required
                            />
                            {rosterForm.errors.name && (
                                <p className="text-sm text-red-600">
                                    {rosterForm.errors.name}
                                </p>
                            )}
                        </div>

                        <div className="grid gap-4 md:grid-cols-3">
                            <div>
                                <label className="mb-1 block text-sm font-medium">
                                    Period Start
                                </label>
                                <input
                                    type="date"
                                    value={rosterForm.data.period_start}
                                    onChange={(e) =>
                                        rosterForm.setData(
                                            'period_start',
                                            e.target.value
                                        )
                                    }
                                    className="w-full rounded-lg border px-3 py-2"
                                    required
                                />
                            </div>

                            <div>
                                <label className="mb-1 block text-sm font-medium">
                                    Period End
                                </label>
                                <input
                                    type="date"
                                    min={rosterForm.data.period_start}
                                    value={rosterForm.data.period_end}
                                    onChange={(e) =>
                                        rosterForm.setData(
                                            'period_end',
                                            e.target.value
                                        )
                                    }
                                    className="w-full rounded-lg border px-3 py-2"
                                    required
                                />
                            </div>

                            <div>
                                <label className="mb-1 block text-sm font-medium">
                                    Status
                                </label>
                                <select
                                    value={rosterForm.data.status}
                                    onChange={(e) =>
                                        rosterForm.setData(
                                            'status',
                                            e.target.value
                                        )
                                    }
                                    className="w-full rounded-lg border px-3 py-2"
                                >
                                    <option value="draft">Draft</option>
                                    <option value="published">Published</option>
                                    <option value="completed">Completed</option>
                                </select>
                            </div>
                        </div>

                        <div className="flex gap-2">
                            <button
                                type="submit"
                                disabled={rosterForm.processing}
                                className="rounded-lg bg-blue-600 px-5 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
                            >
                                {rosterForm.processing
                                    ? 'Saving...'
                                    : editingRoster
                                      ? 'Update Roster'
                                      : 'Create Roster'}
                            </button>

                            {editingRoster && (
                                <button
                                    type="button"
                                    onClick={() => {
                                        rosterForm.reset();
                                        setEditingRoster(null);
                                    }}
                                    className="rounded-lg border px-5 py-2"
                                >
                                    Cancel
                                </button>
                            )}
                        </div>
                    </form>
                </div>

                {/* Roster List */}
                <div className="rounded-xl border bg-white p-6 shadow-sm">
                    <h2 className="mb-4 text-lg font-semibold">
                        All Rosters
                    </h2>

                    {rosters.length === 0 ? (
                        <p className="text-sm text-gray-500">
                            No rosters created yet.
                        </p>
                    ) : (
                        <div className="space-y-3">
                            {rosters.map((roster) => (
                                <div
                                    key={roster.id}
                                    className="rounded-lg border p-4"
                                >
                                    <div className="flex flex-wrap items-center justify-between gap-3">
                                        <div>
                                            <h3 className="font-semibold">
                                                {roster.name}
                                            </h3>
                                            <p className="text-sm text-gray-500">
                                                {roster.period_start.slice(0, 10)}
                                                {' — '}
                                                {roster.period_end.slice(0, 10)}
                                            </p>
                                            <p className="mt-1 text-xs text-gray-500">
                                                {roster.assignments.length} assignments
                                                {' · '}
                                                {roster.status.toUpperCase()}
                                            </p>
                                        </div>

                                        <div className="flex flex-wrap gap-2">
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setSelectedRoster(roster.id);
                                                    assignmentForm.setData({
                                                        roster_id: String(roster.id),
                                                        employee_id: '',
                                                        date: '',
                                                        shift_id: '',
                                                        status: 'scheduled',
                                                    });
                                                    setEditingAssignment(null);
                                                }}
                                                className="rounded-lg bg-blue-600 px-3 py-2 text-sm text-white"
                                            >
                                                Manage Assignments
                                            </button>

                                            <button
                                                type="button"
                                                onClick={() => startRosterEdit(roster)}
                                                className="rounded-lg border px-3 py-2 text-sm"
                                            >
                                                Edit
                                            </button>

                                            <button
                                                type="button"
                                                onClick={() => deleteRoster(roster.id)}
                                                className="rounded-lg border border-red-300 px-3 py-2 text-sm text-red-600"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Assignment Form */}
                {selectedRoster && (
                    <div className="rounded-xl border bg-white p-6 shadow-sm">
                        <h2 className="mb-4 text-lg font-semibold">
                            {editingAssignment
                                ? 'Edit Assignment'
                                : 'Assign Employee to Roster'}
                        </h2>

                        <form
                            onSubmit={submitAssignment}
                            className="space-y-4"
                        >
                            <div>
                                <label className="mb-1 block text-sm font-medium">
                                    Roster
                                </label>
                                <select
                                    value={assignmentForm.data.roster_id}
                                    onChange={(e) => {
                                        setSelectedRoster(Number(e.target.value));
                                        assignmentForm.setData(
                                            'roster_id',
                                            e.target.value
                                        );
                                    }}
                                    className="w-full rounded-lg border px-3 py-2"
                                    required
                                >
                                    <option value="">Select Roster</option>
                                    {rosters.map((roster) => (
                                        <option
                                            key={roster.id}
                                            value={roster.id}
                                        >
                                            {roster.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="grid gap-4 md:grid-cols-3">
                                <div>
                                    <label className="mb-1 block text-sm font-medium">
                                        Employee
                                    </label>
                                    <select
                                        value={assignmentForm.data.employee_id}
                                        onChange={(e) =>
                                            assignmentForm.setData(
                                                'employee_id',
                                                e.target.value
                                            )
                                        }
                                        className="w-full rounded-lg border px-3 py-2"
                                        required
                                    >
                                        <option value="">Select Employee</option>
                                        {employees.map((employee) => (
                                            <option
                                                key={employee.id}
                                                value={employee.id}
                                            >
                                                {employee.employee_no} -{' '}
                                                {employee.first_name}{' '}
                                                {employee.last_name}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="mb-1 block text-sm font-medium">
                                        Date
                                    </label>
                                    <input
                                        type="date"
                                        min={activeRoster?.period_start.slice(0, 10)}
                                        max={activeRoster?.period_end.slice(0, 10)}
                                        value={assignmentForm.data.date}
                                        onChange={(e) =>
                                            assignmentForm.setData(
                                                'date',
                                                e.target.value
                                            )
                                        }
                                        className="w-full rounded-lg border px-3 py-2"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="mb-1 block text-sm font-medium">
                                        Day Status
                                    </label>
                                    <select
                                        value={assignmentForm.data.status}
                                        onChange={(e) => {
                                            assignmentForm.setData(
                                                (previous) => ({
                                                    ...previous,
                                                    status: e.target.value,
                                                    shift_id:
                                                        e.target.value === 'off'
                                                            ? ''
                                                            : previous.shift_id,
                                                })
                                            );
                                        }}
                                        className="w-full rounded-lg border px-3 py-2"
                                    >
                                        <option value="scheduled">
                                            Scheduled
                                        </option>
                                        <option value="off">OFF Day</option>
                                    </select>
                                </div>
                            </div>

                            {assignmentForm.data.status === 'scheduled' && (
                                <div>
                                    <label className="mb-1 block text-sm font-medium">
                                        Shift
                                    </label>
                                    <select
                                        value={assignmentForm.data.shift_id}
                                        onChange={(e) =>
                                            assignmentForm.setData(
                                                'shift_id',
                                                e.target.value
                                            )
                                        }
                                        className="w-full rounded-lg border px-3 py-2"
                                        required
                                    >
                                        <option value="">Select Shift</option>
                                        {shifts.map((shift) => (
                                            <option
                                                key={shift.id}
                                                value={shift.id}
                                            >
                                                {shift.name} ({shift.code})
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            )}

                            <div className="flex gap-2">
                                <button
                                    type="submit"
                                    disabled={assignmentForm.processing}
                                    className="rounded-lg bg-blue-600 px-5 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
                                >
                                    {assignmentForm.processing
                                        ? 'Saving...'
                                        : editingAssignment
                                          ? 'Update Assignment'
                                          : 'Save Assignment'}
                                </button>

                                <button
                                    type="button"
                                    onClick={() => {
                                        assignmentForm.reset();
                                        setEditingAssignment(null);
                                    }}
                                    className="rounded-lg border px-5 py-2"
                                >
                                    Clear
                                </button>
                            </div>
                        </form>

                        {/* Existing Assignments */}
                        <div className="mt-8">
                            <h3 className="mb-3 font-semibold">
                                Employee Schedule
                            </h3>

                            <div className="overflow-x-auto">
                                <table className="w-full text-left text-sm">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="p-3">Employee</th>
                                            <th className="p-3">Date</th>
                                            <th className="p-3">Shift</th>
                                            <th className="p-3">Status</th>
                                            <th className="p-3">Actions</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {rosters
                                            .find((r) => r.id === selectedRoster)
                                            ?.assignments.map((assignment) => (
                                                <tr
                                                    key={assignment.id}
                                                    className="border-t"
                                                >
                                                    <td className="p-3">
                                                        {assignment.employee?.employee_no}
                                                        {' - '}
                                                        {assignment.employee?.first_name}
                                                        {' '}
                                                        {assignment.employee?.last_name}
                                                    </td>
                                                    <td className="p-3">
                                                        {assignment.date.slice(0, 10)}
                                                    </td>
                                                    <td className="p-3">
                                                        {assignment.shift?.name ?? '—'}
                                                    </td>
                                                    <td className="p-3">
                                                        <span className="rounded-full bg-gray-100 px-2 py-1 text-xs">
                                                            {assignment.status.toUpperCase()}
                                                        </span>
                                                    </td>
                                                    <td className="p-3">
                                                        <div className="flex gap-2">
                                                            <button
                                                                type="button"
                                                                onClick={() =>
                                                                    startAssignmentEdit(
                                                                        assignment,
                                                                        selectedRoster
                                                                    )
                                                                }
                                                                className="text-blue-600"
                                                            >
                                                                Edit
                                                            </button>
                                                            <button
                                                                type="button"
                                                                onClick={() =>
                                                                    deleteAssignment(
                                                                        assignment.id
                                                                    )
                                                                }
                                                                className="text-red-600"
                                                            >
                                                                Delete
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}
