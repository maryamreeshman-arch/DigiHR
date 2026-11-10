import { Head, router, useForm } from '@inertiajs/react';
import { FormEvent } from 'react';

type User = {
    id: number;
    name: string;
    email: string;
};

type UserScope = {
    id: number;
    user_id: number;
    scope_type: string;
    scope_id: number;
    user?: User;
};

type Props = {
    users: User[];
    userScopes: UserScope[];
};

export default function Index({ users, userScopes }: Props) {
    const { data, setData, post, processing, errors, reset } = useForm({
        user_id: '',
        scope_type: 'department',
        scope_id: '',
    });

    const submit = (e: FormEvent) => {
        e.preventDefault();

        post('/user-scopes', {
            onSuccess: () => reset('scope_id'),
        });
    };

    const deleteScope = (id: number) => {
        if (confirm('Remove this scope assignment?')) {
            router.delete(`/user-scopes/${id}`);
        }
    };

    return (
        <>
            <Head title="User Scopes" />

            <div className="p-6">
                <div className="mb-6">
                    <h1 className="text-2xl font-semibold">User Scopes</h1>
                    <p className="mt-1 text-sm text-muted-foreground">
                        Assign organization-level access to users.
                    </p>
                </div>

                <div className="mb-8 rounded-lg border bg-card p-6">
                    <h2 className="mb-4 text-lg font-semibold">
                        Assign Scope
                    </h2>

                    {users.length === 0 ? (
                        <p className="text-sm text-muted-foreground">
                            No users found. Create a user first.
                        </p>
                    ) : (
                        <form onSubmit={submit} className="space-y-4">
                            <div>
                                <label className="mb-1 block text-sm font-medium">
                                    User
                                </label>
                                <select
                                    value={data.user_id}
                                    onChange={(e) =>
                                        setData('user_id', e.target.value)
                                    }
                                    required
                                    className="w-full rounded-md border px-3 py-2 text-sm"
                                >
                                    <option value="">Select user</option>
                                    {users.map((user) => (
                                        <option
                                            key={user.id}
                                            value={user.id}
                                        >
                                            {user.name} ({user.email})
                                        </option>
                                    ))}
                                </select>
                                {errors.user_id && (
                                    <p className="mt-1 text-sm text-red-600">
                                        {errors.user_id}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="mb-1 block text-sm font-medium">
                                    Scope Type
                                </label>
                                <select
                                    value={data.scope_type}
                                    onChange={(e) =>
                                        setData('scope_type', e.target.value)
                                    }
                                    required
                                    className="w-full rounded-md border px-3 py-2 text-sm"
                                >
                                    <option value="company">Company</option>
                                    <option value="business_unit">
                                        Business Unit
                                    </option>
                                    <option value="branch">Branch</option>
                                    <option value="department">Department</option>
                                    <option value="division">Division</option>
                                    <option value="location">Location</option>
                                    <option value="cost_center">Cost Center</option>
                                </select>
                            </div>

                            <div>
                                <label className="mb-1 block text-sm font-medium">
                                    Scope ID
                                </label>
                                <input
                                    type="number"
                                    min="1"
                                    value={data.scope_id}
                                    onChange={(e) =>
                                        setData('scope_id', e.target.value)
                                    }
                                    required
                                    placeholder="Enter organization record ID"
                                    className="w-full rounded-md border px-3 py-2 text-sm"
                                />
                                {errors.scope_id && (
                                    <p className="mt-1 text-sm text-red-600">
                                        {errors.scope_id}
                                    </p>
                                )}
                            </div>

                            <button
                                type="submit"
                                disabled={processing}
                                className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground disabled:opacity-50"
                            >
                                {processing ? 'Saving...' : 'Assign Scope'}
                            </button>
                        </form>
                    )}
                </div>

                <div className="rounded-lg border bg-card">
                    <div className="border-b p-4">
                        <h2 className="text-lg font-semibold">
                            Existing Scope Assignments
                        </h2>
                    </div>

                    {userScopes.length === 0 ? (
                        <p className="p-6 text-sm text-muted-foreground">
                            No scope assignments found.
                        </p>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="border-b bg-muted/50">
                                        <th className="px-4 py-3 text-left">
                                            User
                                        </th>
                                        <th className="px-4 py-3 text-left">
                                            Scope Type
                                        </th>
                                        <th className="px-4 py-3 text-left">
                                            Scope ID
                                        </th>
                                        <th className="px-4 py-3 text-right">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {userScopes.map((scope) => (
                                        <tr
                                            key={scope.id}
                                            className="border-b last:border-b-0"
                                        >
                                            <td className="px-4 py-3">
                                                {scope.user?.name ??
                                                    `User #${scope.user_id}`}
                                            </td>
                                            <td className="px-4 py-3">
                                                {scope.scope_type}
                                            </td>
                                            <td className="px-4 py-3">
                                                {scope.scope_id}
                                            </td>
                                            <td className="px-4 py-3 text-right">
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        deleteScope(scope.id)
                                                    }
                                                    className="rounded-md bg-red-600 px-3 py-1.5 text-white hover:bg-red-700"
                                                >
                                                    Remove
                                                </button>
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
