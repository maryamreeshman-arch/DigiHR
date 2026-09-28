import { Head, useForm } from '@inertiajs/react';
import { useState } from 'react';

type Company = {
    id: number;
    name: string;
};

type Department = {
    id: number;
    name: string;
};

type JobGrade = {
    id: number;
    name: string;
    code: string;
};

type JobLevel = {
    id: number;
    name: string;
    code: string;
    rank: number;
};

type Position = {
    id: number;
    tenant_id: number;
    company_id: number;
    department_id: number;
    job_grade_id: number;
    job_level_id: number;
    title: string;
    code: string;
    description: string | null;
    headcount: number;
    status: string;
    company?: Company;
    department?: Department;
    job_grade?: JobGrade;
    job_level?: JobLevel;
};

type Props = {
    positions: Position[];
    companies: Company[];
    departments: Department[];
    jobGrades: JobGrade[];
    jobLevels: JobLevel[];
};

export default function Positions({
    positions,
    companies,
    departments,
    jobGrades,
    jobLevels,
}: Props) {
    const [editingId, setEditingId] = useState<number | null>(null);

    const form = useForm({
        tenant_id: 1,
        company_id: '',
        department_id: '',
        job_grade_id: '',
        job_level_id: '',
        title: '',
        code: '',
        description: '',
        headcount: '1',
        status: 'active',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();

        if (editingId !== null) {
            form.put(`/employment-structure/positions/${editingId}`, {
                onSuccess: () => {
                    form.reset();
                    form.setData('tenant_id', 1);
                    form.setData('status', 'active');
                    form.setData('headcount', '1');
                    setEditingId(null);
                },
            });

            return;
        }

        form.post('/employment-structure/positions', {
            onSuccess: () => {
                form.reset();
                form.setData('tenant_id', 1);
                form.setData('status', 'active');
                form.setData('headcount', '1');
            },
        });
    };

    const editPosition = (item: Position) => {
        setEditingId(item.id);

        form.setData({
            tenant_id: item.tenant_id,
            company_id: String(item.company_id),
            department_id: String(item.department_id),
            job_grade_id: String(item.job_grade_id),
            job_level_id: String(item.job_level_id),
            title: item.title,
            code: item.code,
            description: item.description ?? '',
            headcount: String(item.headcount),
            status: item.status,
        });
    };

    const cancelEdit = () => {
        setEditingId(null);

        form.reset();
        form.setData('tenant_id', 1);
        form.setData('status', 'active');
        form.setData('headcount', '1');
    };

    const deletePosition = (id: number) => {
        if (!confirm('Are you sure you want to delete this position?')) {
            return;
        }

        form.delete(`/employment-structure/positions/${id}`);
    };

    return (
        <>
            <Head title="Positions" />

            <div className="p-6">
                <div className="mb-6">
                    <h1 className="text-3xl font-bold">
                        Positions
                    </h1>

                    <p className="mt-1 text-sm text-gray-500">
                        Manage job positions under Employee Core.
                    </p>
                </div>

                <div className="grid gap-6 lg:grid-cols-2">
                    {/* FORM */}
                    <div className="rounded-lg border p-6">
                        <h2 className="mb-5 text-xl font-semibold">
                            {editingId !== null
                                ? 'Edit Position'
                                : 'Add Position'}
                        </h2>

                        <form
                            onSubmit={submit}
                            className="space-y-5"
                        >
                            {/* Tenant ID */}
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

                            {/* Company */}
                            <div>
                                <label className="mb-1 block font-medium">
                                    Company
                                </label>

                                <select
                                    value={form.data.company_id}
                                    onChange={(e) =>
                                        form.setData(
                                            'company_id',
                                            e.target.value,
                                        )
                                    }
                                    className="w-full rounded border p-2"
                                >
                                    <option value="">
                                        Select Company
                                    </option>

                                    {companies.map((company) => (
                                        <option
                                            key={company.id}
                                            value={company.id}
                                        >
                                            {company.name}
                                        </option>
                                    ))}
                                </select>

                                {form.errors.company_id && (
                                    <p className="mt-1 text-sm text-red-600">
                                        {form.errors.company_id}
                                    </p>
                                )}
                            </div>

                            {/* Department */}
                            <div>
                                <label className="mb-1 block font-medium">
                                    Department
                                </label>

                                <select
                                    value={form.data.department_id}
                                    onChange={(e) =>
                                        form.setData(
                                            'department_id',
                                            e.target.value,
                                        )
                                    }
                                    className="w-full rounded border p-2"
                                >
                                    <option value="">
                                        Select Department
                                    </option>

                                    {departments.map((department) => (
                                        <option
                                            key={department.id}
                                            value={department.id}
                                        >
                                            {department.name}
                                        </option>
                                    ))}
                                </select>

                                {form.errors.department_id && (
                                    <p className="mt-1 text-sm text-red-600">
                                        {form.errors.department_id}
                                    </p>
                                )}
                            </div>

                            {/* Job Grade */}
                            <div>
                                <label className="mb-1 block font-medium">
                                    Job Grade
                                </label>

                                <select
                                    value={form.data.job_grade_id}
                                    onChange={(e) =>
                                        form.setData(
                                            'job_grade_id',
                                            e.target.value,
                                        )
                                    }
                                    className="w-full rounded border p-2"
                                >
                                    <option value="">
                                        Select Job Grade
                                    </option>

                                    {jobGrades.map((grade) => (
                                        <option
                                            key={grade.id}
                                            value={grade.id}
                                        >
                                            {grade.name} ({grade.code})
                                        </option>
                                    ))}
                                </select>

                                {form.errors.job_grade_id && (
                                    <p className="mt-1 text-sm text-red-600">
                                        {form.errors.job_grade_id}
                                    </p>
                                )}
                            </div>

                            {/* Job Level */}
                            <div>
                                <label className="mb-1 block font-medium">
                                    Job Level
                                </label>

                                <select
                                    value={form.data.job_level_id}
                                    onChange={(e) =>
                                        form.setData(
                                            'job_level_id',
                                            e.target.value,
                                        )
                                    }
                                    className="w-full rounded border p-2"
                                >
                                    <option value="">
                                        Select Job Level
                                    </option>

                                    {jobLevels.map((level) => (
                                        <option
                                            key={level.id}
                                            value={level.id}
                                        >
                                            {level.name} ({level.code})
                                        </option>
                                    ))}
                                </select>

                                {form.errors.job_level_id && (
                                    <p className="mt-1 text-sm text-red-600">
                                        {form.errors.job_level_id}
                                    </p>
                                )}
                            </div>

                            {/* Title */}
                            <div>
                                <label className="mb-1 block font-medium">
                                    Position Title
                                </label>

                                <input
                                    type="text"
                                    value={form.data.title}
                                    onChange={(e) =>
                                        form.setData(
                                            'title',
                                            e.target.value,
                                        )
                                    }
                                    placeholder="e.g. Senior Software Engineer"
                                    className="w-full rounded border p-2"
                                />

                                {form.errors.title && (
                                    <p className="mt-1 text-sm text-red-600">
                                        {form.errors.title}
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
                                    placeholder="e.g. SSE"
                                    className="w-full rounded border p-2"
                                />

                                {form.errors.code && (
                                    <p className="mt-1 text-sm text-red-600">
                                        {form.errors.code}
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
                                    placeholder="Enter position description"
                                    rows={3}
                                    className="w-full rounded border p-2"
                                />

                                {form.errors.description && (
                                    <p className="mt-1 text-sm text-red-600">
                                        {form.errors.description}
                                    </p>
                                )}
                            </div>

                            {/* Headcount */}
                            <div>
                                <label className="mb-1 block font-medium">
                                    Headcount
                                </label>

                                <input
                                    type="number"
                                    min="1"
                                    value={form.data.headcount}
                                    onChange={(e) =>
                                        form.setData(
                                            'headcount',
                                            e.target.value,
                                        )
                                    }
                                    className="w-full rounded border p-2"
                                />

                                {form.errors.headcount && (
                                    <p className="mt-1 text-sm text-red-600">
                                        {form.errors.headcount}
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
                                          ? 'Update Position'
                                          : 'Add Position'}
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
                            Positions
                        </h2>

                        {positions.length > 0 ? (
                            <div className="space-y-3">
                                {positions.map((item) => (
                                    <div
                                        key={item.id}
                                        className="rounded border p-4"
                                    >
                                        <div className="flex items-start justify-between gap-4">
                                            <div>
                                                <p className="font-semibold">
                                                    {item.title}
                                                </p>

                                                <p className="text-sm text-gray-500">
                                                    Code: {item.code}
                                                </p>

                                                <p className="text-sm text-gray-500">
                                                    Company:{' '}
                                                    {item.company?.name ??
                                                        item.company_id}
                                                </p>

                                                <p className="text-sm text-gray-500">
                                                    Department:{' '}
                                                    {item.department?.name ??
                                                        item.department_id}
                                                </p>

                                                <p className="text-sm text-gray-500">
                                                    Job Grade:{' '}
                                                    {item.job_grade?.name ??
                                                        item.job_grade_id}
                                                </p>

                                                <p className="text-sm text-gray-500">
                                                    Job Level:{' '}
                                                    {item.job_level?.name ??
                                                        item.job_level_id}
                                                </p>

                                                <p className="text-sm text-gray-500">
                                                    Headcount:{' '}
                                                    {item.headcount}
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
                                                        {item.description}
                                                    </p>
                                                )}
                                            </div>

                                            <div className="flex gap-2">
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        editPosition(item)
                                                    }
                                                    className="rounded border px-3 py-1 text-sm"
                                                >
                                                    Edit
                                                </button>

                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        deletePosition(
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
                                    No positions added yet.
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}