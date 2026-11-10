import { Head, router } from '@inertiajs/react';
import { useState } from 'react';

type Permission = {
    id: number;
    module: string;
    name: string;
    code: string;
    action: string;
};

type RolePermission = {
    id: number;
    module: string;
    name: string;
    code: string;
    action: string;
};

type Role = {
    id: number;
    name: string;
    code: string;
    permissions: RolePermission[];
};

type Props = {
    roles: Role[];
    permissions: Permission[];
};

export default function Index({ roles, permissions }: Props) {
    const [selectedRoleId, setSelectedRoleId] = useState<number | null>(
        roles.length > 0 ? roles[0].id : null,
    );

    const [selectedPermissionIds, setSelectedPermissionIds] = useState<
        number[]
    >(
        roles.length > 0
            ? roles[0].permissions.map((permission) => permission.id)
            : [],
    );

    const [saving, setSaving] = useState(false);

    const selectedRole = roles.find(
        (role) => role.id === selectedRoleId,
    );

    const selectRole = (role: Role) => {
        setSelectedRoleId(role.id);

        setSelectedPermissionIds(
            role.permissions.map((permission) => permission.id),
        );
    };

    const togglePermission = (permissionId: number) => {
        setSelectedPermissionIds((current) =>
            current.includes(permissionId)
                ? current.filter((id) => id !== permissionId)
                : [...current, permissionId],
        );
    };

    const savePermissions = () => {
        if (!selectedRoleId) {
            return;
        }

        setSaving(true);

        router.put(
            `/role-permissions/${selectedRoleId}`,
            {
                permission_ids: selectedPermissionIds,
            },
            {
                onFinish: () => {
                    setSaving(false);
                },
            },
        );
    };

    return (
        <>
            <Head title="Role Permissions" />

            <div className="p-6">
                <div className="mb-6">
                    <h1 className="text-2xl font-semibold">
                        Role Permissions
                    </h1>

                    <p className="mt-1 text-sm text-muted-foreground">
                        Assign permissions to system roles.
                    </p>
                </div>

                <div className="grid gap-6 lg:grid-cols-3">
                    {/* Roles */}
                    <div className="rounded-lg border bg-card">
                        <div className="border-b p-4">
                            <h2 className="text-lg font-semibold">
                                Roles
                            </h2>
                        </div>

                        {roles.length === 0 ? (
                            <div className="p-6 text-sm text-muted-foreground">
                                No roles found.
                            </div>
                        ) : (
                            <div className="p-2">
                                {roles.map((role) => (
                                    <button
                                        key={role.id}
                                        type="button"
                                        onClick={() => selectRole(role)}
                                        className={`mb-1 w-full rounded-md px-4 py-3 text-left ${
                                            selectedRoleId === role.id
                                                ? 'bg-primary text-primary-foreground'
                                                : 'hover:bg-muted'
                                        }`}
                                    >
                                        <div className="font-medium">
                                            {role.name}
                                        </div>

                                        <div className="mt-1 text-xs opacity-70">
                                            {role.code}
                                        </div>
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Permissions */}
                    <div className="rounded-lg border bg-card lg:col-span-2">
                        <div className="flex items-center justify-between border-b p-4">
                            <div>
                                <h2 className="text-lg font-semibold">
                                    Permissions
                                </h2>

                                {selectedRole && (
                                    <p className="mt-1 text-sm text-muted-foreground">
                                        Assign permissions to{' '}
                                        <span className="font-medium">
                                            {selectedRole.name}
                                        </span>
                                    </p>
                                )}
                            </div>

                            <button
                                type="button"
                                onClick={savePermissions}
                                disabled={!selectedRoleId || saving}
                                className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90 disabled:opacity-50"
                            >
                                {saving
                                    ? 'Saving...'
                                    : 'Save Permissions'}
                            </button>
                        </div>

                        {permissions.length === 0 ? (
                            <div className="p-6 text-center text-sm text-muted-foreground">
                                No permissions found.
                            </div>
                        ) : (
                            <div className="divide-y">
                                {permissions.map((permission) => (
                                    <label
                                        key={permission.id}
                                        className="flex cursor-pointer items-center gap-3 px-4 py-4 hover:bg-muted/50"
                                    >
                                        <input
                                            type="checkbox"
                                            checked={selectedPermissionIds.includes(
                                                permission.id,
                                            )}
                                            onChange={() =>
                                                togglePermission(
                                                    permission.id,
                                                )
                                            }
                                            className="h-4 w-4"
                                        />

                                        <div className="flex-1">
                                            <div className="font-medium">
                                                {permission.name}
                                            </div>

                                            <div className="mt-1 text-xs text-muted-foreground">
                                                {permission.module} ·{' '}
                                                {permission.action} ·{' '}
                                                {permission.code}
                                            </div>
                                        </div>
                                    </label>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}