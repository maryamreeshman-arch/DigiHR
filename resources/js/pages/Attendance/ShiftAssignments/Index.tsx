import { Head, useForm } from '@inertiajs/react';
import { useState } from 'react';

type Employee = {
    id: number;
    employee_no: string;
};

type Shift = {
    id: number;
    name: string;
    code: string;
    start_time: string;
    end_time: string;
};

type Assignment = {
    id: number;
    employee_id: number;
    shift_id: number;
    start_date: string;
    end_date: string | null;
    employee: Employee;
    shift: Shift;
};

type Props = {
    assignments: Assignment[];
    employees: Employee[];
    shifts: Shift[];
};

export default function Index({
    assignments,
    employees,
    shifts,
}: Props) {
    const [editingId, setEditingId] = useState<number | null>(null);

    const form = useForm({
        employee_id: '',
        shift_id: '',
        start_date: '',
        end_date: '',
    });

    const resetForm = () => {
        form.reset();
        setEditingId(null);
    };

    const submit = (e: React.FormEvent) => {
        e.preventDefault();

        const options = {
            onSuccess: () => resetForm(),
        };

        if (editingId !== null) {
            form.put(`/shift-assignments/${editingId}`, options);
        } else {
            form.post('/shift-assignments', options);
        }
    };

    const editAssignment = (item: Assignment) => {
        setEditingId(item.id);

        form.setData({
            employee_id: String(item.employee_id),
            shift_id: String(item.shift_id),
            start_date: item.start_date.substring(0, 10),
            end_date: item.end_date
                ? item.end_date.substring(0, 10)
                : '',
        });
    };

    const deleteAssignment = (id: number) => {
        if (!confirm('Are you sure you want to delete this assignment?')) {
            return;
        }

        form.delete(`/shift-assignments/${id}`);
    };

    return (
        <>
            <Head title="Employee Shift Assignments" />

            <div className="p-6">
                <div className="mb-6">
                    <h1 className="text-3xl font-bold">
                        Employee Shift Assignments
                    </h1>

                    <p className="mt-1 text-sm text-gray-500">
                        Assign work shifts to employees and manage assignment dates.
                    </p>
                </div>

                <div className="grid gap-6 lg:grid-cols-2">
                    {/* Assignment Form */}
                    <div className="rounded-lg border p-6">
                        <h2 className="mb-5 text-xl font-semibold">
                            {editingId !== null
                                ? 'Edit Assignment'
                                : 'Assign Shift'}
                        </h2>

                        <form onSubmit={submit} className="space-y-5">
                            <div>
                                <label className="mb-1 block font-medium">
                                    Employee
                                </label>

                                <select
                                    value={form.data.employee_id}
                                    onChange={(e) =>
                                        form.setData('employee_id', e.target.value)
                                    }
                                    className="w-full rounded border p-2"
                                    required
                                >
                                    <option value="">Select employee</option>

                                    {employees.map((employee) => (
                                        <option
                                            key={employee.id}
                                            value={employee.id}
                                        >
                                            {employee.employee_no} (ID: {employee.id})
                                        </option>
                                    ))}
                                </select>

                                {form.errors.employee_id && (
                                    <p className="mt-1 text-sm text-red-600">
                                        {form.errors.employee_id}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="mb-1 block font-medium">
                                    Shift
                                </label>

                                <select
                                    value={form.data.shift_id}
                                    onChange={(e) =>
                                        form.setData('shift_id', e.target.value)
                                    }
                                    className="w-full rounded border p-2"
                                    required
                                >
                                    <option value="">Select shift</option>

                                    {shifts.map((shift) => (
                                        <option
                                            key={shift.id}
                                            value={shift.id}
                                        >
                                            {shift.name} ({shift.code}) —{' '}
                                            {shift.start_time.substring(0, 5)} to{' '}
                                            {shift.end_time.substring(0, 5)}
                                        </option>
                                    ))}
                                </select>

                                {form.errors.shift_id && (
                                    <p className="mt-1 text-sm text-red-600">
                                        {form.errors.shift_id}
                                    </p>
                                )}

                                {shifts.length === 0 && (
                                    <p className="mt-1 text-sm text-amber-600">
                                        No active shifts available. Create a shift first.
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="mb-1 block font-medium">
                                    Start Date
                                </label>

                                <input
                                    type="date"
                                    value={form.data.start_date}
                                    onChange={(e) =>
                                        form.setData('start_date', e.target.value)
                                    }
                                    className="w-full rounded border p-2"
                                    required
                                />

                                {form.errors.start_date && (
                                    <p className="mt-1 text-sm text-red-600">
                                        {form.errors.start_date}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="mb-1 block font-medium">
                                    End Date (Optional)
                                </label>

                                <input
                                    type="date"
                                    value={form.data.end_date}
                                    min={form.data.start_date || undefined}
                                    onChange={(e) =>
                                        form.setData('end_date', e.target.value)
                                    }
                                    className="w-full rounded border p-2"
                                />

                                <p className="mt-1 text-xs text-gray-500">
                                    Leave empty if the assignment has no planned end date.
                                </p>

                                {form.errors.end_date && (
                                    <p className="mt-1 text-sm text-red-600">
                                        {form.errors.end_date}
                                    </p>
                                )}
                            </div>

                            <div className="flex gap-3">
                                <button
                                    type="submit"
                                    disabled={form.processing || employees.length === 0 || shifts.length === 0}
                                    className="rounded bg-black px-5 py-2 text-white disabled:opacity-50"
                                >
                                    {form.processing
                                        ? 'Saving...'
                                        : editingId !== null
                                          ? 'Update Assignment'
                                          : 'Assign Shift'}
                                </button>

                                {editingId !== null && (
                                    <button
                                        type="button"
                                        onClick={resetForm}
                                        className="rounded border px-5 py-2"
                                    >
                                        Cancel
                                    </button>
                                )}
                            </div>
                        </form>
                    </div>

                    {/* Assignment List */}
                    <div className="rounded-lg border p-6">
                        <h2 className="mb-5 text-xl font-semibold">
                            Assignments ({assignments.length})
                        </h2>

                        {assignments.length > 0 ? (
                            <div className="space-y-3">
                                {assignments.map((item) => (
                                    <div
                                        key={item.id}
                                        className="rounded border p-4"
                                    >
                                        <p className="font-semibold">
                                            {item.employee?.employee_no ??
                                                `Employee #${item.employee_id}`}
                                        </p>

                                        <p className="mt-1 text-sm text-gray-600">
                                            Shift: {item.shift?.name ??
                                                `Shift #${item.shift_id}`}
                                        </p>

                                        <p className="mt-1 text-sm text-gray-500">
                                            Time:{' '}
                                            {item.shift?.start_time?.substring(0, 5) ?? '--:--'}
                                            {' – '}
                                            {item.shift?.end_time?.substring(0, 5) ?? '--:--'}
                                        </p>

                                        <p className="mt-1 text-sm text-gray-500">
                                            From: {item.start_date.substring(0, 10)}
                                        </p>

                                        <p className="text-sm text-gray-500">
                                            Until:{' '}
                                            {item.end_date
                                                ? item.end_date.substring(0, 10)
                                                : 'No end date'}
                                        </p>

                                        <div className="mt-3 flex gap-2">
                                            <button
                                                type="button"
                                                onClick={() => editAssignment(item)}
                                                className="rounded border px-3 py-1 text-sm"
                                            >
                                                Edit
                                            </button>

                                            <button
                                                type="button"
                                                onClick={() => deleteAssignment(item.id)}
                                                className="rounded bg-red-600 px-3 py-1 text-sm text-white"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="rounded border border-dashed p-8 text-center">
                                <p className="text-gray-500">
                                    No shift assignments added yet.
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
