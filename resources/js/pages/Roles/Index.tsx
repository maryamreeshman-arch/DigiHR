import { Head, router, useForm } from '@inertiajs/react';
import { FormEvent, useState } from 'react';

type Role = {
    id: number;
    tenant_id: number;
    name: string;
    code: string;
    description: string | null;
    created_at: string;
    updated_at: string;
};

type Props = {
    roles: Role[];
};

export default function Index({ roles }: Props) {
    const [editingRole, setEditingRole] = useState<Role | null>(null);

    const {
        data,
        setData,
        post,
        put,
        processing,
        errors,
        reset,
    } = useForm({
        name: '',
        code: '',
        description: '',
    });

    const submit = (e: FormEvent) => {
        e.preventDefault();

        if (editingRole) {
            put(`/roles/${editingRole.id}`, {
                onSuccess: () => {
                    reset();
                    setEditingRole(null);
                },
            });

            return;
        }

        post('/roles', {
            onSuccess: () => {
                reset();
            },
        });
    };

    const editRole = (role: Role) => {
        setEditingRole(role);

        setData({
            name: role.name,
            code: role.code,
            description: role.description ?? '',
        });
    };

    const cancelEdit = () => {
        setEditingRole(null);

        reset();
    };

    const deleteRole = (id: number) => {
        if (confirm('Are you sure you want to delete this role?')) {
            router.delete(`/roles/${id}`);
        }
    };

    return (
        <>
            <Head title="Roles" />

            <div className="p-6">

                {/* Page Header */}
                <div className="mb-6">
                    <h1 className="text-2xl font-semibold">
                        Roles
                    </h1>

                    <p className="mt-1 text-sm text-muted-foreground">
                        Manage system roles and access levels.
                    </p>
                </div>

                {/* Role Form */}
                <div className="mb-8 rounded-lg border bg-card p-6">

                    <h2 className="mb-4 text-lg font-semibold">
                        {editingRole ? 'Edit Role' : 'Create Role'}
                    </h2>

                    <form onSubmit={submit} className="space-y-4">

                        {/* Name */}
                        <div>
                            <label className="mb-1 block text-sm font-medium">
                                Role Name
                            </label>

                            <input
                                type="text"
                                value={data.name}
                                onChange={(e) =>
                                    setData('name', e.target.value)
                                }
                                placeholder="HR Manager"
                                className="w-full rounded-md border px-3 py-2 text-sm"
                            />

                            {errors.name && (
                                <p className="mt-1 text-sm text-red-600">
                                    {errors.name}
                                </p>
                            )}
                        </div>

                        {/* Code */}
                        <div>
                            <label className="mb-1 block text-sm font-medium">
                                Role Code
                            </label>

                            <input
                                type="text"
                                value={data.code}
                                onChange={(e) =>
                                    setData('code', e.target.value)
                                }
                                placeholder="hr_manager"
                                className="w-full rounded-md border px-3 py-2 text-sm"
                            />

                            {errors.code && (
                                <p className="mt-1 text-sm text-red-600">
                                    {errors.code}
                                </p>
                            )}
                        </div>

                        {/* Description */}
                        <div>
                            <label className="mb-1 block text-sm font-medium">
                                Description
                            </label>

                            <textarea
                                value={data.description}
                                onChange={(e) =>
                                    setData(
                                        'description',
                                        e.target.value,
                                    )
                                }
                                placeholder="Manage HR related activities"
                                rows={3}
                                className="w-full rounded-md border px-3 py-2 text-sm"
                            />

                            {errors.description && (
                                <p className="mt-1 text-sm text-red-600">
                                    {errors.description}
                                </p>
                            )}
                        </div>

                        {/* Buttons */}
                        <div className="flex gap-2">

                            <button
                                type="submit"
                                disabled={processing}
                                className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90 disabled:opacity-50"
                            >
                                {processing
                                    ? 'Saving...'
                                    : editingRole
                                      ? 'Update Role'
                                      : 'Create Role'}
                            </button>

                            {editingRole && (
                                <button
                                    type="button"
                                    onClick={cancelEdit}
                                    className="rounded-md border px-4 py-2 text-sm font-medium hover:bg-muted"
                                >
                                    Cancel
                                </button>
                            )}

                        </div>

                    </form>
                </div>

                {/* Roles List */}
                <div className="rounded-lg border bg-card">

                    <div className="border-b p-4">
                        <h2 className="text-lg font-semibold">
                            Existing Roles
                        </h2>
                    </div>

                    {roles.length === 0 ? (
                        <div className="p-6 text-center text-sm text-muted-foreground">
                            No roles found.
                        </div>
                    ) : (
                        <div className="overflow-x-auto">

                            <table className="w-full text-sm">

                                <thead>
                                    <tr className="border-b bg-muted/50">

                                        <th className="px-4 py-3 text-left font-medium">
                                            Name
                                        </th>

                                        <th className="px-4 py-3 text-left font-medium">
                                            Code
                                        </th>

                                        <th className="px-4 py-3 text-left font-medium">
                                            Description
                                        </th>

                                        <th className="px-4 py-3 text-right font-medium">
                                            Actions
                                        </th>

                                    </tr>
                                </thead>

                                <tbody>

                                    {roles.map((role) => (
                                        <tr
                                            key={role.id}
                                            className="border-b last:border-b-0"
                                        >

                                            <td className="px-4 py-3 font-medium">
                                                {role.name}
                                            </td>

                                            <td className="px-4 py-3">
                                                {role.code}
                                            </td>

                                            <td className="px-4 py-3 text-muted-foreground">
                                                {role.description || '-'}
                                            </td>

                                            <td className="px-4 py-3 text-right">

                                                <div className="flex justify-end gap-2">

                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            editRole(role)
                                                        }
                                                        className="rounded-md border px-3 py-1.5 text-sm hover:bg-muted"
                                                    >
                                                        Edit
                                                    </button>

                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            deleteRole(role.id)
                                                        }
                                                        className="rounded-md bg-red-600 px-3 py-1.5 text-sm text-white hover:bg-red-700"
                                                    >
                                                        Delete
                                                    </button>

                                                </div>

                                            </td>

                                        </tr>
                                    ))}

                                </tbody>

                            </table>

                        </div>
                    )}

                </div>

            </div>
        </>
    );
}