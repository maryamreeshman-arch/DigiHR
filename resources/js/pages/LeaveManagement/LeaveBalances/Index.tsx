import { Head, router, useForm } from '@inertiajs/react';
import { FormEvent, useState } from 'react';

interface Employee {
    id: number;
    employee_no: string;
    first_name: string;
    last_name: string;
}

interface LeaveType {
    id: number;
    name: string;
    code: string;
}

interface LeaveBalance {
    id: number;
    employee_id: number;
    leave_type_id: number;
    year: number;
    opening_balance: number;
    accrued: number;
    used: number;
    adjusted: number;
    carried_forward: number;
    closing_balance: number;
    employee: Employee;
    leave_type: LeaveType;
}

interface Props {
    balances: LeaveBalance[];
    employees: Employee[];
    leaveTypes: LeaveType[];
}

const inputClass =
    'w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100 disabled:bg-gray-100';

const labelClass = 'mb-1.5 block text-sm font-medium text-gray-800';

export default function Index({ balances, employees, leaveTypes }: Props) {
    const [editingId, setEditingId] = useState<number | null>(null);

    const { data, setData, post, put, processing, errors, reset } = useForm({
        employee_id: '',
        leave_type_id: '',
        year: new Date().getFullYear().toString(),
        opening_balance: '0',
        accrued: '0',
        used: '0',
        adjusted: '0',
        carried_forward: '0',
    });

    const closingBalance =
        Number(data.opening_balance || 0) +
        Number(data.accrued || 0) +
        Number(data.adjusted || 0) +
        Number(data.carried_forward || 0) -
        Number(data.used || 0);

    const submit = (e: FormEvent) => {
        e.preventDefault();

        if (editingId !== null) {
            put(`/leave-balances/${editingId}`, {
                onSuccess: () => {
                    reset();
                    setEditingId(null);
                },
            });
        } else {
            post('/leave-balances', {
                onSuccess: () => reset(),
            });
        }
    };

    const editBalance = (balance: LeaveBalance) => {
        setEditingId(balance.id);

        setData({
            employee_id: String(balance.employee_id),
            leave_type_id: String(balance.leave_type_id),
            year: String(balance.year),
            opening_balance: String(balance.opening_balance),
            accrued: String(balance.accrued),
            used: String(balance.used),
            adjusted: String(balance.adjusted),
            carried_forward: String(balance.carried_forward),
        });

        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const cancelEdit = () => {
        reset();
        setEditingId(null);
    };

    const deleteBalance = (id: number) => {
        if (confirm('Are you sure you want to delete this leave balance?')) {
            router.delete(`/leave-balances/${id}`);
        }
    };

    const fields = [
        ['opening_balance', 'Opening Balance'],
        ['accrued', 'Accrued Days'],
        ['used', 'Used Days'],
        ['adjusted', 'Adjusted Days'],
        ['carried_forward', 'Carried Forward'],
    ] as const;

    return (
        <>
            <Head title="Leave Balances" />

            <main className="min-h-screen space-y-6 bg-gray-50 p-6 text-gray-900">
                {/* Page Heading */}
                <header className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                    <h1 className="text-2xl font-bold text-gray-900">
                        Leave Balances
                    </h1>
                    <p className="mt-1 text-sm text-gray-600">
                        Manage employee leave entitlements and balances.
                    </p>
                </header>

                {/* Add / Edit Form */}
                <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                    <h2 className="mb-5 text-lg font-semibold text-gray-900">
                        {editingId !== null
                            ? 'Edit Leave Balance'
                            : 'Add Leave Balance'}
                    </h2>

                    <form onSubmit={submit} className="space-y-5">
                        <div className="grid gap-5 md:grid-cols-2">
                            <div>
                                <label className={labelClass}>Employee</label>
                                <select
                                    value={data.employee_id}
                                    onChange={(e) =>
                                        setData('employee_id', e.target.value)
                                    }
                                    className={inputClass}
                                    required
                                    disabled={editingId !== null}
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
                                {errors.employee_id && (
                                    <p className="mt-1 text-sm text-red-600">
                                        {errors.employee_id}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className={labelClass}>Leave Type</label>
                                <select
                                    value={data.leave_type_id}
                                    onChange={(e) =>
                                        setData('leave_type_id', e.target.value)
                                    }
                                    className={inputClass}
                                    required
                                    disabled={editingId !== null}
                                >
                                    <option value="">Select Leave Type</option>
                                    {leaveTypes.map((type) => (
                                        <option key={type.id} value={type.id}>
                                            {type.name} ({type.code})
                                        </option>
                                    ))}
                                </select>
                                {errors.leave_type_id && (
                                    <p className="mt-1 text-sm text-red-600">
                                        {errors.leave_type_id}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className={labelClass}>Year</label>
                                <input
                                    type="number"
                                    value={data.year}
                                    onChange={(e) =>
                                        setData('year', e.target.value)
                                    }
                                    className={inputClass}
                                    required
                                    disabled={editingId !== null}
                                />
                                {errors.year && (
                                    <p className="mt-1 text-sm text-red-600">
                                        {errors.year}
                                    </p>
                                )}
                            </div>

                            {fields.map(([field, label]) => (
                                <div key={field}>
                                    <label className={labelClass}>
                                        {label}
                                    </label>
                                    <input
                                        type="number"
                                        step="0.5"
                                        min="0"
                                        value={data[field]}
                                        onChange={(e) =>
                                            setData(field, e.target.value)
                                        }
                                        className={inputClass}
                                    />
                                    {errors[field] && (
                                        <p className="mt-1 text-sm text-red-600">
                                            {errors[field]}
                                        </p>
                                    )}
                                </div>
                            ))}
                        </div>

                        {/* Closing Balance */}
                        <div className="rounded-lg border border-blue-100 bg-blue-50 p-4">
                            <p className="text-sm font-medium text-blue-800">
                                Calculated Closing Balance
                            </p>
                            <p className="mt-1 text-2xl font-bold text-blue-900">
                                {closingBalance.toFixed(2)} days
                            </p>
                        </div>

                        {/* Form Actions */}
                        <div className="flex flex-wrap gap-3">
                            <button
                                type="submit"
                                disabled={processing}
                                className="rounded-md bg-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                {processing
                                    ? 'Saving...'
                                    : editingId !== null
                                      ? 'Update Balance'
                                      : 'Create Balance'}
                            </button>

                            {editingId !== null && (
                                <button
                                    type="button"
                                    onClick={cancelEdit}
                                    className="rounded-md border border-gray-300 bg-white px-5 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-100"
                                >
                                    Cancel
                                </button>
                            )}
                        </div>
                    </form>
                </section>

                {/* Leave Balance Table */}
                <section className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
                    <div className="border-b border-gray-200 p-5">
                        <h2 className="text-lg font-semibold text-gray-900">
                            Employee Leave Balances
                        </h2>
                        <p className="mt-1 text-sm text-gray-600">
                            View and manage recorded leave balances.
                        </p>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                            <thead className="bg-gray-100 text-gray-800">
                                <tr>
                                    <th className="whitespace-nowrap p-3 font-semibold">Employee</th>
                                    <th className="whitespace-nowrap p-3 font-semibold">Leave Type</th>
                                    <th className="p-3 font-semibold">Year</th>
                                    <th className="p-3 font-semibold">Opening</th>
                                    <th className="p-3 font-semibold">Accrued</th>
                                    <th className="p-3 font-semibold">Used</th>
                                    <th className="p-3 font-semibold">Adjusted</th>
                                    <th className="whitespace-nowrap p-3 font-semibold">Carried Forward</th>
                                    <th className="p-3 font-semibold">Closing</th>
                                    <th className="p-3 font-semibold">Actions</th>
                                </tr>
                            </thead>

                            <tbody>
                                {balances.length > 0 ? (
                                    balances.map((balance) => (
                                        <tr
                                            key={balance.id}
                                            className="border-t border-gray-200 text-gray-800 hover:bg-gray-50"
                                        >
                                            <td className="whitespace-nowrap p-3">
                                                <span className="font-medium text-gray-900">
                                                    {balance.employee?.first_name}{' '}
                                                    {balance.employee?.last_name}
                                                </span>
                                                <p className="mt-1 text-xs text-gray-500">
                                                    {balance.employee?.employee_no}
                                                </p>
                                            </td>

                                            <td className="p-3">
                                                {balance.leave_type?.name}
                                            </td>
                                            <td className="p-3">{balance.year}</td>
                                            <td className="p-3">{balance.opening_balance}</td>
                                            <td className="p-3">{balance.accrued}</td>
                                            <td className="p-3">{balance.used}</td>
                                            <td className="p-3">{balance.adjusted}</td>
                                            <td className="p-3">{balance.carried_forward}</td>
                                            <td className="p-3 font-semibold text-gray-900">
                                                {balance.closing_balance}
                                            </td>

                                            <td className="whitespace-nowrap p-3">
                                                <button
                                                    type="button"
                                                    onClick={() => editBalance(balance)}
                                                    className="mr-3 font-medium text-blue-600 hover:text-blue-800"
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        deleteBalance(balance.id)
                                                    }
                                                    className="font-medium text-red-600 hover:text-red-800"
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td
                                            colSpan={10}
                                            className="p-8 text-center text-gray-600"
                                        >
                                            No leave balances found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </section>
            </main>
        </>
    );
}
