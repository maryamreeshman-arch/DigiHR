import { Head, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { FormEvent } from 'react';

interface Tenant {
    id: number;
    name: string;
}

interface UserRecord {
    id: number;
    tenant_id: number | null;
    name: string;
    email: string;
    phone: string | null;
    status: string;
    last_login_at: string | null;
    email_verified_at: string | null;
}

interface Props {
    users: UserRecord[];
    tenants: Tenant[];
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Users',
        href: '/users',
    },
];

export default function Index({ users, tenants }: Props) {
    const { data, setData, post, processing, errors, reset } = useForm({
        tenant_id: '',
        name: '',
        email: '',
        phone: '',
        password: '',
        password_confirmation: '',
        status: 'active',
    });

    function submit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        post('/users', {
            onSuccess: () => reset(),
        });
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Users Management" />

            <div className="space-y-6 p-6">
                <div>
                    <h1 className="text-2xl font-semibold">
                        Users Management
                    </h1>
                    <p className="text-sm text-muted-foreground">
                        Create and manage system login users.
                    </p>
                </div>

                <section className="rounded-xl border p-5">
                    <h2 className="mb-4 text-lg font-semibold">
                        Create New User
                    </h2>

                    <form onSubmit={submit} className="grid gap-4 md:grid-cols-2">
                        <div>
                            <label className="mb-1 block text-sm font-medium">
                                Tenant
                            </label>
                            <select
                                value={data.tenant_id}
                                onChange={(e) => setData('tenant_id', e.target.value)}
                                className="w-full rounded-md border bg-background p-2"
                                required
                            >
                                <option value="">Select tenant</option>
                                {tenants.map((tenant) => (
                                    <option key={tenant.id} value={tenant.id}>
                                        {tenant.name}
                                    </option>
                                ))}
                            </select>
                            {errors.tenant_id && (
                                <p className="mt-1 text-sm text-red-600">
                                    {errors.tenant_id}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="mb-1 block text-sm font-medium">
                                Full Name
                            </label>
                            <input
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                className="w-full rounded-md border bg-background p-2"
                                required
                            />
                            {errors.name && (
                                <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                            )}
                        </div>

                        <div>
                            <label className="mb-1 block text-sm font-medium">
                                Email
                            </label>
                            <input
                                type="email"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                className="w-full rounded-md border bg-background p-2"
                                required
                            />
                            {errors.email && (
                                <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                            )}
                        </div>

                        <div>
                            <label className="mb-1 block text-sm font-medium">
                                Phone
                            </label>
                            <input
                                value={data.phone}
                                onChange={(e) => setData('phone', e.target.value)}
                                className="w-full rounded-md border bg-background p-2"
                            />
                            {errors.phone && (
                                <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
                            )}
                        </div>

                        <div>
                            <label className="mb-1 block text-sm font-medium">
                                Password
                            </label>
                            <input
                                type="password"
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)}
                                className="w-full rounded-md border bg-background p-2"
                                minLength={8}
                                required
                            />
                            {errors.password && (
                                <p className="mt-1 text-sm text-red-600">
                                    {errors.password}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="mb-1 block text-sm font-medium">
                                Confirm Password
                            </label>
                            <input
                                type="password"
                                value={data.password_confirmation}
                                onChange={(e) =>
                                    setData('password_confirmation', e.target.value)
                                }
                                className="w-full rounded-md border bg-background p-2"
                                minLength={8}
                                required
                            />
                        </div>

                        <div>
                            <label className="mb-1 block text-sm font-medium">
                                Status
                            </label>
                            <select
                                value={data.status}
                                onChange={(e) => setData('status', e.target.value)}
                                className="w-full rounded-md border bg-background p-2"
                                required
                            >
                                <option value="active">Active</option>
                                <option value="inactive">Inactive</option>
                                <option value="suspended">Suspended</option>
                            </select>
                        </div>

                        <div className="flex items-end">
                            <button
                                type="submit"
                                disabled={processing}
                                className="rounded-md bg-primary px-5 py-2 text-primary-foreground disabled:opacity-50"
                            >
                                {processing ? 'Saving...' : 'Create User'}
                            </button>
                        </div>
                    </form>
                </section>

                <section className="overflow-x-auto rounded-xl border p-5">
                    <h2 className="mb-4 text-lg font-semibold">
                        Existing Users ({users.length})
                    </h2>

                    <table className="w-full text-left text-sm">
                        <thead>
                            <tr className="border-b">
                                <th className="p-3">Name</th>
                                <th className="p-3">Email</th>
                                <th className="p-3">Phone</th>
                                <th className="p-3">Tenant</th>
                                <th className="p-3">Status</th>
                            </tr>
                        </thead>

                        <tbody>
                            {users.map((user) => (
                                <tr key={user.id} className="border-b">
                                    <td className="p-3">{user.name}</td>
                                    <td className="p-3">{user.email}</td>
                                    <td className="p-3">{user.phone || '-'}</td>
                                    <td className="p-3">
                                        {tenants.find(
                                            (tenant) => tenant.id === user.tenant_id,
                                        )?.name ?? '-'}
                                    </td>
                                    <td className="p-3">{user.status}</td>
                                </tr>
                            ))}

                            {users.length === 0 && (
                                <tr>
                                    <td colSpan={5} className="p-4 text-center">
                                        No users found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </section>
            </div>
        </AppLayout>
    );
}
