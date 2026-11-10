import { Head, useForm } from '@inertiajs/react';
import { useState } from 'react';

type ShiftRule = {
    late_after_minutes: number;
    early_leave_before_minutes: number;
    overtime_after_minutes: number;
    overtime_rate: string;
};

type Shift = {
    id: number;
    tenant_id: number;
    name: string;
    code: string;
    start_time: string;
    end_time: string;
    break_minutes: number;
    grace_minutes: number;
    crosses_midnight: boolean;
    status: string;
    shift_rule?: ShiftRule | null;
};

type Props = {
    shifts: Shift[];
};

export default function Index({ shifts }: Props) {
    const [editingId, setEditingId] = useState<number | null>(null);

    const form = useForm({
        tenant_id: 1,
        name: '',
        code: '',
        start_time: '09:00',
        end_time: '17:00',
        break_minutes: 60,
        grace_minutes: 10,
        crosses_midnight: false,
        status: 'active',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();

        const options = {
            onSuccess: () => {
                form.reset();
                form.setData({
                    tenant_id: 1,
                    name: '',
                    code: '',
                    start_time: '09:00',
                    end_time: '17:00',
                    break_minutes: 60,
                    grace_minutes: 10,
                    crosses_midnight: false,
                    status: 'active',
                });
                setEditingId(null);
            },
        };

        if (editingId !== null) {
            form.put(`/shifts/${editingId}`, options);
        } else {
            form.post('/shifts', options);
        }
    };

    const editShift = (shift: Shift) => {
        setEditingId(shift.id);

        form.setData({
            tenant_id: shift.tenant_id,
            name: shift.name,
            code: shift.code,
            start_time: shift.start_time.substring(0, 5),
            end_time: shift.end_time.substring(0, 5),
            break_minutes: shift.break_minutes,
            grace_minutes: shift.grace_minutes,
            crosses_midnight: shift.crosses_midnight,
            status: shift.status,
        });
    };

    const cancelEdit = () => {
        setEditingId(null);
        form.reset();
        form.setData({
            tenant_id: 1,
            name: '',
            code: '',
            start_time: '09:00',
            end_time: '17:00',
            break_minutes: 60,
            grace_minutes: 10,
            crosses_midnight: false,
            status: 'active',
        });
    };

    const deleteShift = (id: number) => {
        if (!confirm('Are you sure you want to delete this shift?')) {
            return;
        }

        form.delete(`/shifts/${id}`);
    };

    return (
        <>
            <Head title="Shift Management" />

            <div className="p-6">
                <div className="mb-6">
                    <h1 className="text-3xl font-bold">
                        Shift Management
                    </h1>

                    <p className="mt-1 text-sm text-gray-500">
                        Create and manage employee work shifts.
                    </p>
                </div>

                <div className="grid gap-6 lg:grid-cols-2">
                    <div className="rounded-lg border p-6">
                        <h2 className="mb-5 text-xl font-semibold">
                            {editingId !== null ? 'Edit Shift' : 'Add Shift'}
                        </h2>

                        <form onSubmit={submit} className="space-y-4">
                            <div>
                                <label className="mb-1 block font-medium">
                                    Tenant ID
                                </label>
                                <input
                                    type="number"
                                    min="1"
                                    value={form.data.tenant_id}
                                    onChange={(e) =>
                                        form.setData('tenant_id', Number(e.target.value))
                                    }
                                    className="w-full rounded border p-2"
                                />
                                {form.errors.tenant_id && (
                                    <p className="text-sm text-red-600">
                                        {form.errors.tenant_id}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="mb-1 block font-medium">
                                    Shift Name
                                </label>
                                <input
                                    value={form.data.name}
                                    onChange={(e) => form.setData('name', e.target.value)}
                                    placeholder="e.g. Day Shift"
                                    className="w-full rounded border p-2"
                                />
                                {form.errors.name && (
                                    <p className="text-sm text-red-600">{form.errors.name}</p>
                                )}
                            </div>

                            <div>
                                <label className="mb-1 block font-medium">
                                    Shift Code
                                </label>
                                <input
                                    value={form.data.code}
                                    onChange={(e) =>
                                        form.setData('code', e.target.value.toUpperCase())
                                    }
                                    placeholder="e.g. DAY"
                                    className="w-full rounded border p-2"
                                />
                                {form.errors.code && (
                                    <p className="text-sm text-red-600">{form.errors.code}</p>
                                )}
                            </div>

                            <div className="grid gap-4 sm:grid-cols-2">
                                <div>
                                    <label className="mb-1 block font-medium">
                                        Start Time
                                    </label>
                                    <input
                                        type="time"
                                        value={form.data.start_time}
                                        onChange={(e) =>
                                            form.setData('start_time', e.target.value)
                                        }
                                        className="w-full rounded border p-2"
                                    />
                                    {form.errors.start_time && (
                                        <p className="text-sm text-red-600">
                                            {form.errors.start_time}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label className="mb-1 block font-medium">
                                        End Time
                                    </label>
                                    <input
                                        type="time"
                                        value={form.data.end_time}
                                        onChange={(e) =>
                                            form.setData('end_time', e.target.value)
                                        }
                                        className="w-full rounded border p-2"
                                    />
                                    {form.errors.end_time && (
                                        <p className="text-sm text-red-600">
                                            {form.errors.end_time}
                                        </p>
                                    )}
                                </div>
                            </div>

                            <div className="grid gap-4 sm:grid-cols-2">
                                <div>
                                    <label className="mb-1 block font-medium">
                                        Break (minutes)
                                    </label>
                                    <input
                                        type="number"
                                        min="0"
                                        value={form.data.break_minutes}
                                        onChange={(e) =>
                                            form.setData('break_minutes', Number(e.target.value))
                                        }
                                        className="w-full rounded border p-2"
                                    />
                                    {form.errors.break_minutes && (
                                        <p className="text-sm text-red-600">
                                            {form.errors.break_minutes}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label className="mb-1 block font-medium">
                                        Grace Period (minutes)
                                    </label>
                                    <input
                                        type="number"
                                        min="0"
                                        value={form.data.grace_minutes}
                                        onChange={(e) =>
                                            form.setData('grace_minutes', Number(e.target.value))
                                        }
                                        className="w-full rounded border p-2"
                                    />
                                    {form.errors.grace_minutes && (
                                        <p className="text-sm text-red-600">
                                            {form.errors.grace_minutes}
                                        </p>
                                    )}
                                </div>
                            </div>

                            <div>
                                <label className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        checked={form.data.crosses_midnight}
                                        onChange={(e) =>
                                            form.setData('crosses_midnight', e.target.checked)
                                        }
                                    />
                                    Shift crosses midnight
                                </label>
                                {form.errors.crosses_midnight && (
                                    <p className="text-sm text-red-600">
                                        {form.errors.crosses_midnight}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="mb-1 block font-medium">Status</label>
                                <select
                                    value={form.data.status}
                                    onChange={(e) => form.setData('status', e.target.value)}
                                    className="w-full rounded border p-2"
                                >
                                    <option value="active">Active</option>
                                    <option value="inactive">Inactive</option>
                                </select>
                                {form.errors.status && (
                                    <p className="text-sm text-red-600">{form.errors.status}</p>
                                )}
                            </div>

                            <div className="flex gap-3">
                                <button
                                    type="submit"
                                    disabled={form.processing}
                                    className="rounded bg-black px-5 py-2 text-white disabled:opacity-50"
                                >
                                    {form.processing
                                        ? 'Saving...'
                                        : editingId !== null
                                          ? 'Update Shift'
                                          : 'Add Shift'}
                                </button>

                                {editingId !== null && (
                                    <button
                                        type="button"
                                        onClick={cancelEdit}
                                        className="rounded border px-5 py-2"
                                    >
                                        Cancel
                                    </button>
                                )}
                            </div>
                        </form>
                    </div>

                    <div className="rounded-lg border p-6">
                        <h2 className="mb-5 text-xl font-semibold">
                            Shifts ({shifts.length})
                        </h2>

                        {shifts.length > 0 ? (
                            <div className="space-y-3">
                                {shifts.map((shift) => (
                                    <div
                                        key={shift.id}
                                        className="rounded border p-4"
                                    >
                                        <div className="flex flex-wrap items-start justify-between gap-3">
                                            <div>
                                                <p className="font-semibold">{shift.name}</p>
                                                <p className="text-sm text-gray-500">
                                                    Code: {shift.code}
                                                </p>
                                                <p className="mt-2 text-sm">
                                                    {shift.start_time.substring(0, 5)} –{' '}
                                                    {shift.end_time.substring(0, 5)}
                                                </p>
                                                <p className="text-sm text-gray-500">
                                                    Break: {shift.break_minutes} min · Grace:{' '}
                                                    {shift.grace_minutes} min
                                                </p>
                                                {shift.crosses_midnight && (
                                                    <p className="text-sm text-amber-600">
                                                        Crosses midnight
                                                    </p>
                                                )}
                                                <p className="mt-1 text-xs text-gray-400">
                                                    Tenant ID: {shift.tenant_id}
                                                </p>
                                                <span
                                                    className={`mt-2 inline-block rounded px-2 py-1 text-xs ${
                                                        shift.status === 'active'
                                                            ? 'bg-green-100 text-green-700'
                                                            : 'bg-gray-100 text-gray-600'
                                                    }`}
                                                >
                                                    {shift.status}
                                                </span>
                                            </div>

                                            <div className="flex gap-2">
                                                <button
                                                    type="button"
                                                    onClick={() => editShift(shift)}
                                                    className="rounded border px-3 py-1 text-sm"
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => deleteShift(shift.id)}
                                                    className="rounded bg-red-600 px-3 py-1 text-sm text-white"
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="rounded border border-dashed p-8 text-center">
                                <p className="text-gray-500">No shifts added yet.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
