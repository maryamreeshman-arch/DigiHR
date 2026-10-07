import { FormEvent, useState } from 'react';
import { Head, router } from '@inertiajs/react';

type Employee = {
    id: number;
    first_name?: string;
    last_name?: string;
    employee_no?: string;
};

type EmployeeOnboarding = {
    id: number;
    employee_id: number;
    template_id: number;
    employee?: Employee;
};

type OnboardingTask = {
    id: number;
    template_id: number;
    title: string;
    template?: {
        id: number;
        name: string;
    };
};

type User = {
    id: number;
    name: string;
};

type EmployeeOnboardingTask = {
    id: number;
    employee_onboarding_id: number;
    task_id: number;
    assigned_to: number | null;
    due_date: string | null;
    completed_at: string | null;
    status: string;
    employeeOnboarding?: EmployeeOnboarding;
    task?: OnboardingTask;
    assignedUser?: User;
};

type Props = {
    onboardingTasks: EmployeeOnboardingTask[];
    employeeOnboardings: EmployeeOnboarding[];
    tasks: OnboardingTask[];
    users: User[];
};

export default function Index({
    onboardingTasks,
    employeeOnboardings,
    tasks,
    users,
}: Props) {
    const [editingId, setEditingId] = useState<number | null>(null);

    const [form, setForm] = useState({
        employee_onboarding_id: '',
        task_id: '',
        assigned_to: '',
        due_date: '',
        completed_at: '',
        status: 'Pending',
    });

    const resetForm = () => {
        setEditingId(null);

        setForm({
            employee_onboarding_id: '',
            task_id: '',
            assigned_to: '',
            due_date: '',
            completed_at: '',
            status: 'Pending',
        });
    };

    const submit = (e: FormEvent) => {
        e.preventDefault();

        if (editingId) {
            router.put(
                `/employee-onboarding-tasks/${editingId}`,
                form,
                {
                    onSuccess: resetForm,
                }
            );
        } else {
            router.post(
                '/employee-onboarding-tasks',
                form,
                {
                    onSuccess: resetForm,
                }
            );
        }
    };

    const editTask = (
        item: EmployeeOnboardingTask
    ) => {
        setEditingId(item.id);

        setForm({
            employee_onboarding_id: String(
                item.employee_onboarding_id
            ),
            task_id: String(item.task_id),
            assigned_to: item.assigned_to
                ? String(item.assigned_to)
                : '',
            due_date: item.due_date
                ? item.due_date.substring(0, 10)
                : '',
            completed_at: item.completed_at
                ? item.completed_at.substring(0, 10)
                : '',
            status: item.status,
        });

        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    const deleteTask = (id: number) => {
        if (
            confirm(
                'Are you sure you want to delete this onboarding task assignment?'
            )
        ) {
            router.delete(
                `/employee-onboarding-tasks/${id}`
            );
        }
    };

    const employeeName = (
        employee?: Employee
    ) => {
        if (!employee) {
            return 'Unknown Employee';
        }

        const name = [
            employee.first_name,
            employee.last_name,
        ]
            .filter(Boolean)
            .join(' ');

        return (
            name ||
            employee.employee_no ||
            `Employee #${employee.id}`
        );
    };

    return (
        <>
            <Head title="Employee Onboarding Tasks" />

            <div className="min-h-screen bg-slate-100 p-6">
                <div className="mx-auto max-w-7xl space-y-6">

                    {/* Header */}
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900">
                            Employee Onboarding Tasks
                        </h1>

                        <p className="mt-1 text-sm text-slate-600">
                            Assign onboarding tasks to employees and track
                            their completion.
                        </p>
                    </div>

                    {/* Form */}
                    <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
                        <div className="mb-5">
                            <h2 className="text-lg font-semibold text-slate-900">
                                {editingId
                                    ? 'Edit Employee Onboarding Task'
                                    : 'Assign Onboarding Task'}
                            </h2>
                        </div>

                        <form
                            onSubmit={submit}
                            className="grid grid-cols-1 gap-5 md:grid-cols-2"
                        >
                            {/* Employee Onboarding */}
                            <div>
                                <label className="mb-2 block text-sm font-medium text-slate-700">
                                    Employee Onboarding
                                </label>

                                <select
                                    value={
                                        form.employee_onboarding_id
                                    }
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            employee_onboarding_id:
                                                e.target.value,
                                        })
                                    }
                                    required
                                    className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                >
                                    <option value="">
                                        Select Employee
                                    </option>

                                    {employeeOnboardings.map(
                                        (onboarding) => (
                                            <option
                                                key={onboarding.id}
                                                value={onboarding.id}
                                            >
                                                {employeeName(
                                                    onboarding.employee
                                                )}
                                            </option>
                                        )
                                    )}
                                </select>
                            </div>

                            {/* Task */}
                            <div>
                                <label className="mb-2 block text-sm font-medium text-slate-700">
                                    Onboarding Task
                                </label>

                                <select
                                    value={form.task_id}
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            task_id: e.target.value,
                                        })
                                    }
                                    required
                                    className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                >
                                    <option value="">
                                        Select Task
                                    </option>

                                    {tasks.map((task) => (
                                        <option
                                            key={task.id}
                                            value={task.id}
                                        >
                                            {task.title}
                                            {task.template
                                                ? ` - ${task.template.name}`
                                                : ''}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Assigned To */}
                            <div>
                                <label className="mb-2 block text-sm font-medium text-slate-700">
                                    Assigned To
                                </label>

                                <select
                                    value={form.assigned_to}
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            assigned_to:
                                                e.target.value,
                                        })
                                    }
                                    className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                >
                                    <option value="">
                                        Select User
                                    </option>

                                    {users.map((user) => (
                                        <option
                                            key={user.id}
                                            value={user.id}
                                        >
                                            {user.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Due Date */}
                            <div>
                                <label className="mb-2 block text-sm font-medium text-slate-700">
                                    Due Date
                                </label>

                                <input
                                    type="date"
                                    value={form.due_date}
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            due_date:
                                                e.target.value,
                                        })
                                    }
                                    className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                />
                            </div>

                            {/* Completed At */}
                            <div>
                                <label className="mb-2 block text-sm font-medium text-slate-700">
                                    Completed Date
                                </label>

                                <input
                                    type="date"
                                    value={form.completed_at}
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            completed_at:
                                                e.target.value,
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
                                            status:
                                                e.target.value,
                                        })
                                    }
                                    required
                                    className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                >
                                    <option value="Pending">
                                        Pending
                                    </option>

                                    <option value="In Progress">
                                        In Progress
                                    </option>

                                    <option value="Completed">
                                        Completed
                                    </option>

                                    <option value="Skipped">
                                        Skipped
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
                                        ? 'Update Task'
                                        : 'Assign Task'}
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
                                Assigned Onboarding Tasks
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
                                            Task
                                        </th>

                                        <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-600">
                                            Assigned To
                                        </th>

                                        <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-600">
                                            Due Date
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
                                    {onboardingTasks.length === 0 ? (
                                        <tr>
                                            <td
                                                colSpan={6}
                                                className="px-6 py-8 text-center text-sm text-slate-500"
                                            >
                                                No onboarding tasks assigned
                                                yet.
                                            </td>
                                        </tr>
                                    ) : (
                                        onboardingTasks.map(
                                            (item) => (
                                                <tr
                                                    key={item.id}
                                                    className="hover:bg-slate-50"
                                                >
                                                    <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-slate-900">
                                                        {employeeName(
                                                            item
                                                                .employeeOnboarding
                                                                ?.employee
                                                        )}
                                                    </td>

                                                    <td className="px-6 py-4 text-sm text-slate-700">
                                                        {item.task?.title ||
                                                            '—'}
                                                    </td>

                                                    <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-700">
                                                        {item.assignedUser
                                                            ?.name ||
                                                            '—'}
                                                    </td>

                                                    <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-700">
                                                        {item.due_date
                                                            ? item.due_date.substring(
                                                                  0,
                                                                  10
                                                              )
                                                            : '—'}
                                                    </td>

                                                    <td className="whitespace-nowrap px-6 py-4">
                                                        <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
                                                            {item.status}
                                                        </span>
                                                    </td>

                                                    <td className="whitespace-nowrap px-6 py-4 text-right">
                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                editTask(
                                                                    item
                                                                )
                                                            }
                                                            className="mr-3 text-sm font-semibold text-blue-600 hover:text-blue-800"
                                                        >
                                                            Edit
                                                        </button>

                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                deleteTask(
                                                                    item.id
                                                                )
                                                            }
                                                            className="text-sm font-semibold text-red-600 hover:text-red-800"
                                                        >
                                                            Delete
                                                        </button>
                                                    </td>
                                                </tr>
                                            )
                                        )
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