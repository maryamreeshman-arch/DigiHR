import { FormEvent, useState } from 'react';
import { Head, router } from '@inertiajs/react';

type Employee = {
    id: number;
    first_name?: string;
    last_name?: string;
    employee_no?: string;
};

type Template = {
    id: number;
    name: string;
    status: string;
};

type EmployeeOnboarding = {
    id: number;
    employee_id: number;
    template_id: number;
    start_date: string;
    completion_date: string | null;
    status: string;
    employee?: Employee;
    template?: Template;
};

type Props = {
    onboardings: EmployeeOnboarding[];
    employees: Employee[];
    templates: Template[];
};

export default function Index({
    onboardings,
    employees,
    templates,
}: Props) {
    const [editingId, setEditingId] = useState<number | null>(null);

    const [form, setForm] = useState({
        employee_id: '',
        template_id: '',
        start_date: '',
        completion_date: '',
        status: 'In Progress',
    });

    const resetForm = () => {
        setEditingId(null);

        setForm({
            employee_id: '',
            template_id: '',
            start_date: '',
            completion_date: '',
            status: 'In Progress',
        });
    };

    const submit = (e: FormEvent) => {
        e.preventDefault();

        if (editingId) {
            router.put(
                `/employee-onboardings/${editingId}`,
                form,
                {
                    onSuccess: resetForm,
                }
            );
        } else {
            router.post(
                '/employee-onboardings',
                form,
                {
                    onSuccess: resetForm,
                }
            );
        }
    };

    const editOnboarding = (
        onboarding: EmployeeOnboarding
    ) => {
        setEditingId(onboarding.id);

        setForm({
            employee_id: String(onboarding.employee_id),
            template_id: String(onboarding.template_id),
            start_date: onboarding.start_date
                ? onboarding.start_date.substring(0, 10)
                : '',
            completion_date: onboarding.completion_date
                ? onboarding.completion_date.substring(0, 10)
                : '',
            status: onboarding.status,
        });

        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    const deleteOnboarding = (id: number) => {
        if (
            confirm(
                'Are you sure you want to delete this employee onboarding?'
            )
        ) {
            router.delete(
                `/employee-onboardings/${id}`
            );
        }
    };

    const employeeName = (employee?: Employee) => {
        if (!employee) {
            return 'Unknown Employee';
        }

        const name = [
            employee.first_name,
            employee.last_name,
        ]
            .filter(Boolean)
            .join(' ');

        return name || employee.employee_no || `Employee #${employee.id}`;
    };

    return (
        <>
            <Head title="Employee Onboarding" />

            <div className="min-h-screen bg-slate-100 p-6">
                <div className="mx-auto max-w-7xl space-y-6">

                    {/* Header */}
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900">
                            Employee Onboarding
                        </h1>

                        <p className="mt-1 text-sm text-slate-600">
                            Assign onboarding templates to employees and track
                            their onboarding progress.
                        </p>
                    </div>

                    {/* Form Card */}
                    <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
                        <div className="mb-5">
                            <h2 className="text-lg font-semibold text-slate-900">
                                {editingId
                                    ? 'Edit Employee Onboarding'
                                    : 'Create Employee Onboarding'}
                            </h2>

                            <p className="mt-1 text-sm text-slate-500">
                                Select an employee and onboarding template.
                            </p>
                        </div>

                        <form
                            onSubmit={submit}
                            className="grid grid-cols-1 gap-5 md:grid-cols-2"
                        >
                            {/* Employee */}
                            <div>
                                <label className="mb-2 block text-sm font-medium text-slate-700">
                                    Employee
                                </label>

                                <select
                                    value={form.employee_id}
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            employee_id: e.target.value,
                                        })
                                    }
                                    required
                                    className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                >
                                    <option value="">
                                        Select Employee
                                    </option>

                                    {employees.map((employee) => (
                                        <option
                                            key={employee.id}
                                            value={employee.id}
                                        >
                                            {employee.employee_no
                                                ? `${employee.employee_no} - `
                                                : ''}
                                            {employeeName(employee)}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Template */}
                            <div>
                                <label className="mb-2 block text-sm font-medium text-slate-700">
                                    Onboarding Template
                                </label>

                                <select
                                    value={form.template_id}
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            template_id: e.target.value,
                                        })
                                    }
                                    required
                                    className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                >
                                    <option value="">
                                        Select Template
                                    </option>

                                    {templates.map((template) => (
                                        <option
                                            key={template.id}
                                            value={template.id}
                                        >
                                            {template.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Start Date */}
                            <div>
                                <label className="mb-2 block text-sm font-medium text-slate-700">
                                    Start Date
                                </label>

                                <input
                                    type="date"
                                    value={form.start_date}
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            start_date: e.target.value,
                                        })
                                    }
                                    required
                                    className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                />
                            </div>

                            {/* Completion Date */}
                            <div>
                                <label className="mb-2 block text-sm font-medium text-slate-700">
                                    Completion Date
                                </label>

                                <input
                                    type="date"
                                    value={form.completion_date}
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            completion_date: e.target.value,
                                        })
                                    }
                                    className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                />
                            </div>

                            {/* Status */}
                            <div>
                                <label className="mb-2 block text-sm font-medium text-slate-700">
                                    Status
                                </label>

                                <select
                                    value={form.status}
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            status: e.target.value,
                                        })
                                    }
                                    required
                                    className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                >
                                    <option value="Not Started">
                                        Not Started
                                    </option>

                                    <option value="In Progress">
                                        In Progress
                                    </option>

                                    <option value="Completed">
                                        Completed
                                    </option>

                                    <option value="Cancelled">
                                        Cancelled
                                    </option>
                                </select>
                            </div>

                            {/* Buttons */}
                            <div className="flex items-end gap-3">
                                <button
                                    type="submit"
                                    className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
                                >
                                    {editingId
                                        ? 'Update Onboarding'
                                        : 'Create Onboarding'}
                                </button>

                                {editingId && (
                                    <button
                                        type="button"
                                        onClick={resetForm}
                                        className="rounded-lg border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                                    >
                                        Cancel
                                    </button>
                                )}
                            </div>
                        </form>
                    </div>

                    {/* Table */}
                    <div className="overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-slate-200">
                        <div className="border-b border-slate-200 px-6 py-4">
                            <h2 className="text-lg font-semibold text-slate-900">
                                Employee Onboarding Records
                            </h2>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-slate-200">
                                <thead className="bg-slate-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-600">
                                            Employee
                                        </th>

                                        <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-600">
                                            Template
                                        </th>

                                        <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-600">
                                            Start Date
                                        </th>

                                        <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-600">
                                            Completion Date
                                        </th>

                                        <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-600">
                                            Status
                                        </th>

                                        <th className="px-6 py-3 text-right text-xs font-semibold uppercase tracking-wide text-slate-600">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>

                                <tbody className="divide-y divide-slate-200 bg-white">
                                    {onboardings.length === 0 ? (
                                        <tr>
                                            <td
                                                colSpan={6}
                                                className="px-6 py-8 text-center text-sm text-slate-500"
                                            >
                                                No employee onboarding records
                                                found.
                                            </td>
                                        </tr>
                                    ) : (
                                        onboardings.map((onboarding) => (
                                            <tr
                                                key={onboarding.id}
                                                className="hover:bg-slate-50"
                                            >
                                                <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-slate-900">
                                                    {employeeName(
                                                        onboarding.employee
                                                    )}
                                                </td>

                                                <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-700">
                                                    {onboarding.template?.name ||
                                                        '—'}
                                                </td>

                                                <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-700">
                                                    {onboarding.start_date
                                                        ? onboarding.start_date.substring(
                                                              0,
                                                              10
                                                          )
                                                        : '—'}
                                                </td>

                                                <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-700">
                                                    {onboarding.completion_date
                                                        ? onboarding.completion_date.substring(
                                                              0,
                                                              10
                                                          )
                                                        : '—'}
                                                </td>

                                                <td className="whitespace-nowrap px-6 py-4">
                                                    <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
                                                        {onboarding.status}
                                                    </span>
                                                </td>

                                                <td className="whitespace-nowrap px-6 py-4 text-right">
                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            editOnboarding(
                                                                onboarding
                                                            )
                                                        }
                                                        className="mr-3 text-sm font-semibold text-blue-600 hover:text-blue-800"
                                                    >
                                                        Edit
                                                    </button>

                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            deleteOnboarding(
                                                                onboarding.id
                                                            )
                                                        }
                                                        className="text-sm font-semibold text-red-600 hover:text-red-800"
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
                    </div>
                </div>
            </div>
        </>
    );
}