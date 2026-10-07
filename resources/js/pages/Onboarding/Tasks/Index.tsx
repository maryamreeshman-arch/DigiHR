import { FormEvent, useState } from 'react';
import { Head, useForm } from '@inertiajs/react';

type Template = {
    id: number;
    name: string;
};

type OnboardingTask = {
    id: number;
    template_id: number;
    title: string;
    description: string | null;
    assigned_role: string | null;
    days_from_join_date: number;
    required: boolean;
    template?: Template;
};

type Props = {
    tasks: OnboardingTask[];
    templates: Template[];
};

export default function Index({ tasks, templates }: Props) {
    const [editingTask, setEditingTask] =
        useState<OnboardingTask | null>(null);

    const { data, setData, post, put, processing, reset } = useForm({
        template_id: '',
        title: '',
        description: '',
        assigned_role: '',
        days_from_join_date: '0',
        required: true,
    });

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        if (editingTask) {
            put(`/onboarding-tasks/${editingTask.id}`, {
                onSuccess: () => {
                    setEditingTask(null);
                    reset();
                },
            });
        } else {
            post('/onboarding-tasks', {
                onSuccess: () => reset(),
            });
        }
    };

    const handleEdit = (task: OnboardingTask) => {
        setEditingTask(task);

        setData({
            template_id: String(task.template_id),
            title: task.title,
            description: task.description ?? '',
            assigned_role: task.assigned_role ?? '',
            days_from_join_date: String(task.days_from_join_date),
            required: task.required,
        });
    };

    const handleDelete = (id: number) => {
        if (
            confirm(
                'Are you sure you want to delete this onboarding task?'
            )
        ) {
            const form = document.createElement('form');

            form.method = 'POST';
            form.action = `/onboarding-tasks/${id}`;

            const csrf = document.querySelector(
                'meta[name="csrf-token"]'
            ) as HTMLMetaElement | null;

            if (csrf) {
                const csrfInput = document.createElement('input');

                csrfInput.type = 'hidden';
                csrfInput.name = '_token';
                csrfInput.value = csrf.content;

                form.appendChild(csrfInput);
            }

            const methodInput = document.createElement('input');

            methodInput.type = 'hidden';
            methodInput.name = '_method';
            methodInput.value = 'DELETE';

            form.appendChild(methodInput);

            document.body.appendChild(form);
            form.submit();
        }
    };

    const handleCancel = () => {
        setEditingTask(null);
        reset();
    };

    return (
        <>
            <Head title="Onboarding Tasks" />

            <div className="min-h-screen bg-slate-100 p-6">
                <div className="mx-auto max-w-7xl">

                    {/* Header */}
                    <div className="mb-6">
                        <h1 className="text-3xl font-bold text-slate-800">
                            Onboarding Tasks
                        </h1>

                        <p className="mt-1 text-sm text-slate-500">
                            Create and manage tasks for onboarding templates.
                        </p>
                    </div>

                    {/* Form */}
                    <div className="mb-8 rounded-xl bg-white p-6 shadow-sm">
                        <h2 className="mb-5 text-xl font-semibold text-slate-800">
                            {editingTask
                                ? 'Edit Onboarding Task'
                                : 'Create Onboarding Task'}
                        </h2>

                        <form
                            onSubmit={handleSubmit}
                            className="grid grid-cols-1 gap-5 md:grid-cols-2"
                        >

                            {/* Template */}
                            <div>
                                <label className="mb-2 block text-sm font-medium text-slate-700">
                                    Onboarding Template
                                </label>

                                <select
                                    value={data.template_id}
                                    onChange={(e) =>
                                        setData(
                                            'template_id',
                                            e.target.value
                                        )
                                    }
                                    required
                                    className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-slate-900 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
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

                            {/* Title */}
                            <div>
                                <label className="mb-2 block text-sm font-medium text-slate-700">
                                    Task Title
                                </label>

                                <input
                                    type="text"
                                    value={data.title}
                                    onChange={(e) =>
                                        setData(
                                            'title',
                                            e.target.value
                                        )
                                    }
                                    placeholder="e.g. Submit Employee Documents"
                                    required
                                    className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-slate-900 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                                />
                            </div>

                            {/* Description */}
                            <div className="md:col-span-2">
                                <label className="mb-2 block text-sm font-medium text-slate-700">
                                    Description
                                </label>

                                <textarea
                                    value={data.description}
                                    onChange={(e) =>
                                        setData(
                                            'description',
                                            e.target.value
                                        )
                                    }
                                    rows={4}
                                    placeholder="Describe the onboarding task..."
                                    className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-slate-900 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                                />
                            </div>

                            {/* Assigned Role */}
                            <div>
                                <label className="mb-2 block text-sm font-medium text-slate-700">
                                    Assigned Role
                                </label>

                                <input
                                    type="text"
                                    value={data.assigned_role}
                                    onChange={(e) =>
                                        setData(
                                            'assigned_role',
                                            e.target.value
                                        )
                                    }
                                    placeholder="e.g. HR Manager"
                                    className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-slate-900 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                                />
                            </div>

                            {/* Days */}
                            <div>
                                <label className="mb-2 block text-sm font-medium text-slate-700">
                                    Days From Join Date
                                </label>

                                <input
                                    type="number"
                                    min="0"
                                    value={data.days_from_join_date}
                                    onChange={(e) =>
                                        setData(
                                            'days_from_join_date',
                                            e.target.value
                                        )
                                    }
                                    required
                                    className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-slate-900 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                                />
                            </div>

                            {/* Required */}
                            <div>
                                <label className="mb-2 block text-sm font-medium text-slate-700">
                                    Required
                                </label>

                                <select
                                    value={data.required ? '1' : '0'}
                                    onChange={(e) =>
                                        setData(
                                            'required',
                                            e.target.value === '1'
                                        )
                                    }
                                    className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-slate-900 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                                >
                                    <option value="1">Yes</option>
                                    <option value="0">No</option>
                                </select>
                            </div>

                            {/* Buttons */}
                            <div className="flex items-end gap-3">
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="rounded-lg bg-indigo-600 px-5 py-2.5 font-medium text-white hover:bg-indigo-700 disabled:opacity-50"
                                >
                                    {processing
                                        ? 'Saving...'
                                        : editingTask
                                          ? 'Update Task'
                                          : 'Create Task'}
                                </button>

                                {editingTask && (
                                    <button
                                        type="button"
                                        onClick={handleCancel}
                                        className="rounded-lg bg-slate-200 px-5 py-2.5 font-medium text-slate-700 hover:bg-slate-300"
                                    >
                                        Cancel
                                    </button>
                                )}
                            </div>
                        </form>
                    </div>

                    {/* Table */}
                    <div className="overflow-hidden rounded-xl bg-white shadow-sm">
                        <div className="border-b border-slate-200 px-6 py-4">
                            <h2 className="text-xl font-semibold text-slate-800">
                                Onboarding Tasks
                            </h2>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-slate-50">
                                    <tr>
                                        <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                                            #
                                        </th>

                                        <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                                            Template
                                        </th>

                                        <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                                            Task
                                        </th>

                                        <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                                            Assigned Role
                                        </th>

                                        <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                                            Days
                                        </th>

                                        <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                                            Required
                                        </th>

                                        <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>

                                <tbody className="divide-y divide-slate-200">
                                    {tasks.length > 0 ? (
                                        tasks.map((task) => (
                                            <tr
                                                key={task.id}
                                                className="hover:bg-slate-50"
                                            >
                                                <td className="px-6 py-4 text-sm text-slate-600">
                                                    {task.id}
                                                </td>

                                                <td className="px-6 py-4 text-sm font-medium text-slate-800">
                                                    {task.template?.name ??
                                                        'N/A'}
                                                </td>

                                                <td className="px-6 py-4">
                                                    <div className="text-sm font-medium text-slate-800">
                                                        {task.title}
                                                    </div>

                                                    {task.description && (
                                                        <div className="mt-1 text-xs text-slate-500">
                                                            {
                                                                task.description
                                                            }
                                                        </div>
                                                    )}
                                                </td>

                                                <td className="px-6 py-4 text-sm text-slate-600">
                                                    {task.assigned_role ||
                                                        '—'}
                                                </td>

                                                <td className="px-6 py-4 text-sm text-slate-600">
                                                    {task.days_from_join_date}{' '}
                                                    day(s)
                                                </td>

                                                <td className="px-6 py-4">
                                                    <span
                                                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                                                            task.required
                                                                ? 'bg-green-100 text-green-700'
                                                                : 'bg-slate-100 text-slate-600'
                                                        }`}
                                                    >
                                                        {task.required
                                                            ? 'Yes'
                                                            : 'No'}
                                                    </span>
                                                </td>

                                                <td className="px-6 py-4">
                                                    <div className="flex gap-2">
                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                handleEdit(
                                                                    task
                                                                )
                                                            }
                                                            className="rounded-lg bg-blue-100 px-3 py-2 text-sm font-medium text-blue-700 hover:bg-blue-200"
                                                        >
                                                            Edit
                                                        </button>

                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                handleDelete(
                                                                    task.id
                                                                )
                                                            }
                                                            className="rounded-lg bg-red-100 px-3 py-2 text-sm font-medium text-red-700 hover:bg-red-200"
                                                        >
                                                            Delete
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td
                                                colSpan={7}
                                                className="px-6 py-10 text-center text-sm text-slate-500"
                                            >
                                                No onboarding tasks found.
                                            </td>
                                        </tr>
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