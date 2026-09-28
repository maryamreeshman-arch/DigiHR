import { Head, useForm } from '@inertiajs/react';
import { useState } from 'react';

type EmploymentType = {
    id: number;
    tenant_id: number;
    name: string;
    code: string;
};

type Props = {
    employmentTypes: EmploymentType[];
};

export default function EmploymentTypes({
    employmentTypes,
}: Props) {
    const [editingId, setEditingId] = useState<number | null>(null);

    const form = useForm({
        tenant_id: 1,
        name: '',
        code: '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();

        if (editingId !== null) {
            form.put(
                `/employment-structure/employment-types/${editingId}`,
                {
                    onSuccess: () => {
                        form.reset();
                        form.setData('tenant_id', 1);
                        setEditingId(null);
                    },
                },
            );

            return;
        }

        form.post('/employment-structure/employment-types', {
            onSuccess: () => {
                form.reset();
                form.setData('tenant_id', 1);
            },
        });
    };

    const editEmploymentType = (item: EmploymentType) => {
        setEditingId(item.id);

        form.setData({
            tenant_id: item.tenant_id,
            name: item.name,
            code: item.code,
        });
    };

    const cancelEdit = () => {
        setEditingId(null);

        form.reset();
        form.setData('tenant_id', 1);
    };

    const deleteEmploymentType = (id: number) => {
        if (
            !confirm(
                'Are you sure you want to delete this employment type?',
            )
        ) {
            return;
        }

        form.delete(
            `/employment-structure/employment-types/${id}`,
        );
    };

    return (
        <>
            <Head title="Employment Types" />

            <div className="p-6">
                {/* Header */}
                <div className="mb-6">
                    <h1 className="text-3xl font-bold">
                        Employment Types
                    </h1>

                    <p className="mt-1 text-sm text-gray-500">
                        Manage employment types under Employee Core.
                    </p>
                </div>

                <div className="grid gap-6 lg:grid-cols-2">
                    {/* Add / Edit Form */}
                    <div className="rounded-lg border p-6">
                        <h2 className="mb-5 text-xl font-semibold">
                            {editingId !== null
                                ? 'Edit Employment Type'
                                : 'Add Employment Type'}
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
                                    placeholder="e.g. Permanent"
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
                                    placeholder="e.g. PERM"
                                    className="w-full rounded border p-2"
                                />

                                {form.errors.code && (
                                    <p className="mt-1 text-sm text-red-600">
                                        {form.errors.code}
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
                                          ? 'Update Employment Type'
                                          : 'Add Employment Type'}
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

                    {/* Employment Type List */}
                    <div className="rounded-lg border p-6">
                        <h2 className="mb-5 text-xl font-semibold">
                            Employment Types
                        </h2>

                        {employmentTypes.length > 0 ? (
                            <div className="space-y-3">
                                {employmentTypes.map((item) => (
                                    <div
                                        key={item.id}
                                        className="flex items-center justify-between rounded border p-4"
                                    >
                                        <div>
                                            <p className="font-semibold">
                                                {item.name}
                                            </p>

                                            <p className="text-sm text-gray-500">
                                                Code: {item.code}
                                            </p>

                                            <p className="text-xs text-gray-400">
                                                Tenant ID: {item.tenant_id}
                                            </p>
                                        </div>

                                        <div className="flex gap-2">
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    editEmploymentType(
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
                                                    deleteEmploymentType(
                                                        item.id,
                                                    )
                                                }
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
                                    No employment types added yet.
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}