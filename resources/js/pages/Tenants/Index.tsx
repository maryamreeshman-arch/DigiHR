import { Head, Link } from '@inertiajs/react';

type Tenant = {
    id: number;
    name: string;
    slug: string;
    status: string;
    timezone: string;
    currency: string;
    locale: string;
};

type Props = {
    tenants: Tenant[];
};

export default function Index({ tenants }: Props) {
    return (
        <>
            <Head title="Tenants" />

            <div className="p-6">
                <div className="mb-6 flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-semibold">
                            Tenants
                        </h1>

                        <p className="text-sm text-gray-500">
                            Manage your DigiHR tenants.
                        </p>
                    </div>

                    <Link
                        href="/tenants/create"
                        className="rounded-lg bg-black px-4 py-2 text-sm font-medium text-white"
                    >
                        + Add Tenant
                    </Link>
                </div>

                <div className="overflow-hidden rounded-lg border">
                    <table className="w-full text-left text-sm">
                        <thead className="border-b bg-gray-50">
                            <tr>
                                <th className="px-4 py-3">Name</th>
                                <th className="px-4 py-3">Slug</th>
                                <th className="px-4 py-3">Status</th>
                                <th className="px-4 py-3">Currency</th>
                                <th className="px-4 py-3">Timezone</th>
                            </tr>
                        </thead>

                        <tbody>
                            {tenants.map((tenant) => (
                                <tr
                                    key={tenant.id}
                                    className="border-b last:border-0"
                                >
                                    <td className="px-4 py-3 font-medium">
                                        {tenant.name}
                                    </td>

                                    <td className="px-4 py-3">
                                        {tenant.slug}
                                    </td>

                                    <td className="px-4 py-3">
                                        {tenant.status}
                                    </td>

                                    <td className="px-4 py-3">
                                        {tenant.currency}
                                    </td>

                                    <td className="px-4 py-3">
                                        {tenant.timezone}
                                    </td>
                                </tr>
                            ))}

                            {tenants.length === 0 && (
                                <tr>
                                    <td
                                        colSpan={5}
                                        className="px-4 py-8 text-center text-gray-500"
                                    >
                                        No tenants found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}