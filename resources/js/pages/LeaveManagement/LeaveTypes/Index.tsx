import { Head, router, useForm } from '@inertiajs/react';
import { FormEvent, useState } from 'react';

interface LeaveType {
    id: number;
    name: string;
    code: string;
    paid: boolean;
    requires_document: boolean;
    allow_half_day: boolean;
    allow_hourly: boolean;
    status: boolean;
}

interface Props {
    leaveTypes: LeaveType[];
}

export default function Index({ leaveTypes }: Props) {
    const [editing, setEditing] = useState<LeaveType | null>(null);

    const { data, setData, post, put, processing, reset, errors } = useForm({
        name: '',
        code: '',
        paid: true,
        requires_document: false,
        allow_half_day: true,
        allow_hourly: false,
        status: true,
    });

    const submit = (e: FormEvent) => {
        e.preventDefault();

        if (editing) {
            put(`/leave-types/${editing.id}`, {
                onSuccess: () => {
                    reset();
                    setEditing(null);
                },
            });
        } else {
            post('/leave-types', {
                onSuccess: () => reset(),
            });
        }
    };

    const editLeaveType = (item: LeaveType) => {
        setEditing(item);
        setData({
            name: item.name,
            code: item.code,
            paid: item.paid,
            requires_document: item.requires_document,
            allow_half_day: item.allow_half_day,
            allow_hourly: item.allow_hourly,
            status: item.status,
        });
    };

    const deleteLeaveType = (id: number) => {
        if (confirm('Are you sure you want to delete this leave type?')) {
            router.delete(`/leave-types/${id}`);
        }
    };

    return (
        <>
            <Head title="Leave Types" />

            <div className="space-y-6 p-6">
                <div>
                    <h1 className="text-2xl font-bold">Leave Types</h1>
                    <p className="text-sm text-muted-foreground">
                        Manage employee leave categories.
                    </p>
                </div>

                <form onSubmit={submit} className="space-y-4 rounded-xl border p-5">
                    <h2 className="text-lg font-semibold">
                        {editing ? 'Edit Leave Type' : 'Add Leave Type'}
                    </h2>

                    <div className="grid gap-4 md:grid-cols-2">
                        <div>
                            <label className="mb-1 block text-sm font-medium">Leave Name</label>
                            <input
                                className="w-full rounded-md border p-2"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                placeholder="Annual Leave"
                                required
                            />
                            {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
                        </div>

                        <div>
                            <label className="mb-1 block text-sm font-medium">Code</label>
                            <input
                                className="w-full rounded-md border p-2"
                                value={data.code}
                                onChange={(e) => setData('code', e.target.value)}
                                placeholder="AL"
                                required
                            />
                            {errors.code && <p className="text-sm text-red-500">{errors.code}</p>}
                        </div>
                    </div>

                    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                        {([
                            ['paid', 'Paid Leave'],
                            ['requires_document', 'Requires Document'],
                            ['allow_half_day', 'Allow Half Day'],
                            ['allow_hourly', 'Allow Hourly'],
                            ['status', 'Active'],
                        ] as const).map(([key, label]) => (
                            <label key={key} className="flex items-center gap-2 text-sm">
                                <input
                                    type="checkbox"
                                    checked={data[key]}
                                    onChange={(e) => setData(key, e.target.checked)}
                                />
                                {label}
                            </label>
                        ))}
                    </div>

                    <div className="flex gap-2">
                        <button
                            type="submit"
                            disabled={processing}
                            className="rounded-md bg-primary px-4 py-2 text-primary-foreground disabled:opacity-50"
                        >
                            {processing ? 'Saving...' : editing ? 'Update Leave Type' : 'Save Leave Type'}
                        </button>

                        {editing && (
                            <button
                                type="button"
                                onClick={() => {
                                    reset();
                                    setEditing(null);
                                }}
                                className="rounded-md border px-4 py-2"
                            >
                                Cancel
                            </button>
                        )}
                    </div>
                </form>

                <div className="overflow-x-auto rounded-xl border">
                    <table className="w-full text-sm">
                        <thead className="bg-muted">
                            <tr>
                                <th className="p-3 text-left">Name</th>
                                <th className="p-3 text-left">Code</th>
                                <th className="p-3 text-left">Paid</th>
                                <th className="p-3 text-left">Half Day</th>
                                <th className="p-3 text-left">Status</th>
                                <th className="p-3 text-left">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {leaveTypes.length > 0 ? leaveTypes.map((item) => (
                                <tr key={item.id} className="border-t">
                                    <td className="p-3">{item.name}</td>
                                    <td className="p-3">{item.code}</td>
                                    <td className="p-3">{item.paid ? 'Yes' : 'No'}</td>
                                    <td className="p-3">{item.allow_half_day ? 'Yes' : 'No'}</td>
                                    <td className="p-3">{item.status ? 'Active' : 'Inactive'}</td>
                                    <td className="space-x-2 p-3">
                                        <button
                                            onClick={() => editLeaveType(item)}
                                            className="text-blue-600 hover:underline"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => deleteLeaveType(item.id)}
                                            className="text-red-600 hover:underline"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan={6} className="p-6 text-center text-muted-foreground">
                                        No leave types found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}
