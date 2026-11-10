import { Head, router, useForm } from '@inertiajs/react';
import { FormEvent, useState } from 'react';

type Permission = {
    id: number;
    module: string;
    name: string;
    code: string;
    action: string;
    created_at: string;
    updated_at: string;
};

type Props = {
    permissions: Permission[];
};

export default function Index({ permissions }: Props) {
    const [editingPermission, setEditingPermission] =
        useState<Permission | null>(null);

    const {
        data,
        setData,
        post,
        put,
        processing,
        errors,
        reset,
    } = useForm({
        module: '',
        name: '',
        code: '',
        action: '',
    });

    const submit = (e: FormEvent) => {
        e.preventDefault();

        if (editingPermission) {
            put(`/permissions/${editingPermission.id}`, {
                onSuccess: () => {
                    reset();
                    setEditingPermission(null);
                },
            });

            return;
        }

        post('/permissions', {
            onSuccess: () => {
                reset();
            },
        });
    };

    const editPermission = (permission: Permission) => {
        setEditingPermission(permission);

        setData({
            module: permission.module,
            name: permission.name,
            code: permission.code,
            action: permission.action,
        });
    };

    const cancelEdit = () => {
        setEditingPermission(null);
        reset();
    };

    const deletePermission = (id: number) => {
        if (confirm('Are you sure you want to delete this permission?')) {
            router.delete(`/permissions/${id}`);
        }
    };

    return (
        <>
            <Head title="Permissions" />

            <div className="p-6">
                <div className="mb-6">
                    <h1 className="text-2xl font-semibold">
                        Permissions
                    </h1>

                    <p className="mt-1 text-sm text-muted-foreground">
                        Manage system permissions and access actions.
                    </p>
                </div>

                <div className="mb-8 rounded-lg border bg-card p-6">
                    <h2 className="mb-4 text-lg font-semibold">
                        {editingPermission
                            ? 'Edit Permission'
                            : 'Create Permission'}
                    </h2>

                    <form onSubmit={submit} className="space-y-4">
                        <div>
                            <label className="mb-1 block text-sm font-medium">
                                Module
                            </label>

                            <input
                                type="text"
                                value={data.module}
                                onChange={(e) =>
                                    setData('module', e.target.value)
                                }
                                placeholder="Employee"
                                className="w-full rounded-md border px-3 py-2 text-sm"
                            />

                            {errors.module && (
                                <p className="mt-1 text-sm text-red-600">
                                    {errors.module}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="mb-1 block text-sm font-medium">
                                Permission Name
                            </label>

                            <input
                                type="text"
                                value={data.name}
                                onChange={(e) =>
                                    setData('name', e.target.value)
                                }
                                placeholder="View Employees"
                                className="w-full rounded-md border px-3 py-2 text-sm"
                            />

                            {errors.name && (
                                <p className="mt-1 text-sm text-red-600">
                                    {errors.name}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="mb-1 block text-sm font-medium">
                                Permission Code
                            </label>

                            <input
                                type="text"
                                value={data.code}
                                onChange={(e) =>
                                    setData('code', e.target.value)
                                }
                                placeholder="employee.view"
                                className="w-full rounded-md border px-3 py-2 text-sm"
                            />

                            {errors.code && (
                                <p className="mt-1 text-sm text-red-600">
                                    {errors.code}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="mb-1 block text-sm font-medium">
                                Action
                            </label>

                            <input
                                type="text"
                                value={data.action}
                                onChange={(e) =>
                                    setData('action', e.target.value)
                                }
                                placeholder="view"
                                className="w-full rounded-md border px-3 py-2 text-sm"
                            />

                            {errors.action && (
                                <p className="mt-1 text-sm text-red-600">
                                    {errors.action}
                                </p>
                            )}
                        </div>

                        <div className="flex gap-2">
                            <button
                                type="submit"
                                disabled={processing}
                                className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90 disabled:opacity-50"
                            >
                                {processing
                                    ? 'Saving...'
                                    : editingPermission
                                      ? 'Update Permission'
                                      : 'Create Permission'}
                            </button>

                            {editingPermission && (
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

                <div className="rounded-lg border bg-card">
                    <div className="border-b p-4">
                        <h2 className="text-lg font-semibold">
                            Existing Permissions
                        </h2>
                    </div>

                    {permissions.length === 0 ? (
                        <div className="p-6 text-center text-sm text-muted-foreground">
                            No permissions found.
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="border-b bg-muted/50">
                                        <th className="px-4 py-3 text-left font-medium">
                                            Module
                                        </th>

                                        <th className="px-4 py-3 text-left font-medium">
                                            Name
                                        </th>

                                        <th className="px-4 py-3 text-left font-medium">
                                            Code
                                        </th>

                                        <th className="px-4 py-3 text-left font-medium">
                                            Action
                                        </th>

                                        <th className="px-4 py-3 text-right font-medium">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {permissions.map((permission) => (
                                        <tr
                                            key={permission.id}
                                            className="border-b last:border-b-0"
                                        >
                                            <td className="px-4 py-3 font-medium">
                                                {permission.module}
                                            </td>

                                            <td className="px-4 py-3">
                                                {permission.name}
                                            </td>

                                            <td className="px-4 py-3">
                                                {permission.code}
                                            </td>

                                            <td className="px-4 py-3">
                                                {permission.action}
                                            </td>

                                            <td className="px-4 py-3 text-right">
                                                <div className="flex justify-end gap-2">
                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            editPermission(
                                                                permission,
                                                            )
                                                        }
                                                        className="rounded-md border px-3 py-1.5 text-sm hover:bg-muted"
                                                    >
                                                        Edit
                                                    </button>

                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            deletePermission(
                                                                permission.id,
                                                            )
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