import { Head, useForm } from '@inertiajs/react';
import { useState } from 'react';

type JobGrade = {
    id: number;
    tenant_id: number;
    name: string;
    code: string;
    min_salary: number;
    max_salary: number;
    description: string | null;
    status: string;
};

type Props = {
    jobGrades: JobGrade[];
};

export default function JobGrades({ jobGrades }: Props) {
    const [editingId, setEditingId] = useState<number | null>(null);

    const form = useForm({
        tenant_id: 1,
        name: '',
        code: '',
        min_salary: '',
        max_salary: '',
        description: '',
        status: 'active',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();

        if (editingId !== null) {
            form.put(`/employment-structure/job-grades/${editingId}`, {
                onSuccess: () => {
                    form.reset();
                    form.setData('tenant_id', 1);
                    form.setData('status', 'active');
                    setEditingId(null);
                },
            });

            return;
        }

        form.post('/employment-structure/job-grades', {
            onSuccess: () => {
                form.reset();
                form.setData('tenant_id', 1);
                form.setData('status', 'active');
            },
        });
    };

    const editJobGrade = (item: JobGrade) => {
        setEditingId(item.id);

        form.setData({
            tenant_id: item.tenant_id,
            name: item.name,
            code: item.code,
            min_salary: String(item.min_salary),
            max_salary: String(item.max_salary),
            description: item.description ?? '',
            status: item.status,
        });
    };

    const cancelEdit = () => {
        setEditingId(null);

        form.reset();
        form.setData('tenant_id', 1);
        form.setData('status', 'active');
    };

    const deleteJobGrade = (id: number) => {
        if (!confirm('Are you sure you want to delete this job grade?')) {
            return;
        }

        form.delete(`/employment-structure/job-grades/${id}`);
    };

    return (
        <>
            <Head title="Job Grades" />

            <div className="p-6">
                <div className="mb-6">
                    <h1 className="text-3xl font-bold">
                        Job Grades
                    </h1>

                    <p className="mt-1 text-sm text-gray-500">
                        Manage job grades and salary ranges under Employee
                        Core.
                    </p>
                </div>

                <div className="grid gap-6 lg:grid-cols-2">
                    {/* FORM */}
                    <div className="rounded-lg border p-6">
                        <h2 className="mb-5 text-xl font-semibold">
                            {editingId !== null
                                ? 'Edit Job Grade'
                                : 'Add Job Grade'}
                        </h2>

                        <form
                            onSubmit={submit}
                            className="space-y-5"
                        >
                            {/* Tenant */}
                            <div>
                                <label className="mb-1 block font-medium">
                                    Tenant ID
                                </label>

                                <input
                                    type="number"
                                    value={form.data.tenant_id}
                                    onChange={(e) =>
                                        form.setData(
                                            'tenant_id',
                                            Number(e.target.value),
                                        )
                                    }
                                    className="w-full rounded border p-2"
                                />

                                {form.errors.tenant_id && (
                                    <p className="mt-1 text-sm text-red-600">
                                        {form.errors.tenant_id}
                                    </p>
                                )}
                            </div>

                            {/* Name */}
                            <div>
                                <label className="mb-1 block font-medium">
                                    Name
                                </label>

                                <input
                                    type="text"
                                    value={form.data.name}
                                    onChange={(e) =>
                                        form.setData(
                                            'name',
                                            e.target.value,
                                        )
                                    }
                                    placeholder="e.g. Senior Grade"
                                    className="w-full rounded border p-2"
                                />

                                {form.errors.name && (
                                    <p className="mt-1 text-sm text-red-600">
                                        {form.errors.name}
                                    </p>
                                )}
                            </div>

                            {/* Code */}
                            <div>
                                <label className="mb-1 block font-medium">
                                    Code
                                </label>

                                <input
                                    type="text"
                                    value={form.data.code}
                                    onChange={(e) =>
                                        form.setData(
                                            'code',
                                            e.target.value.toUpperCase(),
                                        )
                                    }
                                    placeholder="e.g. G5"
                                    className="w-full rounded border p-2"
                                />

                                {form.errors.code && (
                                    <p className="mt-1 text-sm text-red-600">
                                        {form.errors.code}
                                    </p>
                                )}
                            </div>

                            {/* Minimum Salary */}
                            <div>
                                <label className="mb-1 block font-medium">
                                    Minimum Salary
                                </label>

                                <input
                                    type="number"
                                    min="0"
                                    step="0.01"
                                    value={form.data.min_salary}
                                    onChange={(e) =>
                                        form.setData(
                                            'min_salary',
                                            e.target.value,
                                        )
                                    }
                                    placeholder="e.g. 50000"
                                    className="w-full rounded border p-2"
                                />

                                {form.errors.min_salary && (
                                    <p className="mt-1 text-sm text-red-600">
                                        {form.errors.min_salary}
                                    </p>
                                )}
                            </div>

                            {/* Maximum Salary */}
                            <div>
                                <label className="mb-1 block font-medium">
                                    Maximum Salary
                                </label>

                                <input
                                    type="number"
                                    min="0"
                                    step="0.01"
                                    value={form.data.max_salary}
                                    onChange={(e) =>
                                        form.setData(
                                            'max_salary',
                                            e.target.value,
                                        )
                                    }
                                    placeholder="e.g. 100000"
                                    className="w-full rounded border p-2"
                                />

                                {form.errors.max_salary && (
                                    <p className="mt-1 text-sm text-red-600">
                                        {form.errors.max_salary}
                                    </p>
                                )}
                            </div>

                            {/* Description */}
                            <div>
                                <label className="mb-1 block font-medium">
                                    Description
                                </label>

                                <textarea
                                    value={form.data.description}
                                    onChange={(e) =>
                                        form.setData(
                                            'description',
                                            e.target.value,
                                        )
                                    }
                                    placeholder="Enter job grade description"
                                    rows={3}
                                    className="w-full rounded border p-2"
                                />

                                {form.errors.description && (
                                    <p className="mt-1 text-sm text-red-600">
                                        {form.errors.description}
                                    </p>
                                )}
                            </div>

                            {/* Status */}
                            <div>
                                <label className="mb-1 block font-medium">
                                    Status
                                </label>

                                <select
                                    value={form.data.status}
                                    onChange={(e) =>
                                        form.setData(
                                            'status',
                                            e.target.value,
                                        )
                                    }
                                    className="w-full rounded border p-2"
                                >
                                    <option value="active">
                                        Active
                                    </option>

                                    <option value="inactive">
                                        Inactive
                                    </option>
                                </select>

                                {form.errors.status && (
                                    <p className="mt-1 text-sm text-red-600">
                                        {form.errors.status}
                                    </p>
                                )}
                            </div>

                            {/* Buttons */}
                            <div className="flex gap-3">
                                <button
                                    type="submit"
                                    disabled={form.processing}
                                    className="rounded bg-black px-5 py-2 text-white disabled:opacity-50"
                                >
                                    {form.processing
                                        ? 'Saving...'
                                        : editingId !== null
                                          ? 'Update Job Grade'
                                          : 'Add Job Grade'}
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

                    {/* LIST */}
                    <div className="rounded-lg border p-6">
                        <h2 className="mb-5 text-xl font-semibold">
                            Job Grades
                        </h2>

                        {jobGrades.length > 0 ? (
                            <div className="space-y-3">
                                {jobGrades.map((item) => (
                                    <div
                                        key={item.id}
                                        className="rounded border p-4"
                                    >
                                        <div className="flex items-start justify-between gap-4">
                                            <div>
                                                <p className="font-semibold">
                                                    {item.name}
                                                </p>

                                                <p className="text-sm text-gray-500">
                                                    Code: {item.code}
                                                </p>

                                                <p className="text-sm text-gray-500">
                                                    Salary: LKR{' '}
                                                    {Number(
                                                        item.min_salary,
                                                    ).toLocaleString()}{' '}
                                                    - LKR{' '}
                                                    {Number(
                                                        item.max_salary,
                                                    ).toLocaleString()}
                                                </p>

                                                <p className="text-xs text-gray-400">
                                                    Tenant ID:{' '}
                                                    {item.tenant_id}
                                                </p>

                                                <p className="text-xs text-gray-400">
                                                    Status: {item.status}
                                                </p>

                                                {item.description && (
                                                    <p className="mt-2 text-sm text-gray-600">
                                                        {
                                                            item.description
                                                        }
                                                    </p>
                                                )}
                                            </div>

                                            <div className="flex gap-2">
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        editJobGrade(
                                                            item,
                                                        )
                                                    }
                                                    className="rounded border px-3 py-1 text-sm"
                                                >
                                                    Edit
                                                </button>

                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        deleteJobGrade(
                                                            item.id,
                                                        )
                                                    }
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
                                <p className="text-gray-500">
                                    No job grades added yet.
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}