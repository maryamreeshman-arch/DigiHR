import { Head, router } from '@inertiajs/react';
import { useState } from 'react';

type Role = {
    id: number;
    name: string;
    code: string;
};

type UserRole = {
    id: number;
    name: string;
    email: string;
    roles: Role[];
};

type Props = {
    users: UserRole[];
    roles: Role[];
};

export default function Index({ users, roles }: Props) {
    const [selectedUserId, setSelectedUserId] = useState<number | null>(
        users.length > 0 ? users[0].id : null,
    );

    const [selectedRoleIds, setSelectedRoleIds] = useState<number[]>(
        users.length > 0
            ? users[0].roles.map((role) => role.id)
            : [],
    );

    const [saving, setSaving] = useState(false);

    const selectedUser = users.find(
        (user) => user.id === selectedUserId,
    );

    const selectUser = (user: UserRole) => {
        setSelectedUserId(user.id);
        setSelectedRoleIds(user.roles.map((role) => role.id));
    };

    const toggleRole = (roleId: number) => {
        setSelectedRoleIds((current) =>
            current.includes(roleId)
                ? current.filter((id) => id !== roleId)
                : [...current, roleId],
        );
    };

    const saveRoles = () => {
        if (selectedUserId === null) {
            return;
        }

        setSaving(true);

        router.put(
            `/user-roles/${selectedUserId}`,
            { role_ids: selectedRoleIds },
            {
                onFinish: () => setSaving(false),
            },
        );
    };

    return (
        <>
            <Head title="User Roles" />

            <div className="p-6">
                <div className="mb-6">
                    <h1 className="text-2xl font-semibold">User Roles</h1>
                    <p className="mt-1 text-sm text-muted-foreground">
                        Assign system roles to users.
                    </p>
                </div>

                <div className="grid gap-6 lg:grid-cols-3">
                    <div className="rounded-lg border bg-card">
                        <div className="border-b p-4">
                            <h2 className="text-lg font-semibold">Users</h2>
                        </div>

                        {users.length === 0 ? (
                            <p className="p-4 text-sm text-muted-foreground">
                                No users found.
                            </p>
                        ) : (
                            <div className="p-2">
                                {users.map((user) => (
                                    <button
                                        key={user.id}
                                        type="button"
                                        onClick={() => selectUser(user)}
                                        className={`mb-1 w-full rounded-md px-4 py-3 text-left ${
                                            selectedUserId === user.id
                                                ? 'bg-primary text-primary-foreground'
                                                : 'hover:bg-muted'
                                        }`}
                                    >
                                        <div className="font-medium">
                                            {user.name}
                                        </div>
                                        <div className="mt-1 text-xs opacity-70">
                                            {user.email}
                                        </div>
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="rounded-lg border bg-card lg:col-span-2">
                        <div className="flex items-center justify-between border-b p-4">
                            <div>
                                <h2 className="text-lg font-semibold">
                                    Assign Roles
                                </h2>
                                {selectedUser && (
                                    <p className="mt-1 text-sm text-muted-foreground">
                                        Select roles for {selectedUser.name}.
                                    </p>
                                )}
                            </div>

                            <button
                                type="button"
                                onClick={saveRoles}
                                disabled={selectedUserId === null || saving}
                                className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground disabled:opacity-50"
                            >
                                {saving ? 'Saving...' : 'Save Roles'}
                            </button>
                        </div>

                        {roles.length === 0 ? (
                            <p className="p-4 text-sm text-muted-foreground">
                                No roles found. Create a role first.
                            </p>
                        ) : (
                            <div className="divide-y">
                                {roles.map((role) => (
                                    <label
                                        key={role.id}
                                        className="flex cursor-pointer items-center gap-3 px-4 py-4 hover:bg-muted/50"
                                    >
                                        <input
                                            type="checkbox"
                                            checked={selectedRoleIds.includes(
                                                role.id,
                                            )}
                                            onChange={() => toggleRole(role.id)}
                                            className="h-4 w-4"
                                        />

                                        <div>
                                            <div className="font-medium">
                                                {role.name}
                                            </div>
                                            <div className="mt-1 text-xs text-muted-foreground">
                                                {role.code}
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
