import { Head, Link } from '@inertiajs/react';

type Branch = {
    id: number;
    tenant_id: number;
    name: string;
    code: string;
    address: string | null;
    city: string | null;
    phone: string | null;
    email: string | null;
    status: string;

    tenant?: {
        name: string;
    };

    company?: {
        name: string;
    };

    businessUnit?: {
        name: string;
    };
};

type Props = {
    branches: Branch[];
};

export default function Branches({ branches }: Props) {
    return (
        <>
            <Head title="Branches" />

            <div className="p-6">
                <div className="mb-6 flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold">
                            Branches
                        </h1>

                        <p className="text-muted-foreground">
                            Manage branches under each tenant and company.
                        </p>
                    </div>

                    <Link
                        href="/branches/create"
                        className="rounded bg-black px-4 py-2 text-white"
                    >
                        + Add Branch
                    </Link>
                </div>

                <div className="overflow-hidden rounded-lg border">
                    <table className="w-full">
                        <thead className="bg-muted text-foreground">
                            <tr>
                                <th className="px-4 py-3 text-left text-foreground">
                                    Tenant
                                </th>

                                <th className="px-4 py-3 text-left text-foreground">
                                    Company
                                </th>

                                <th className="px-4 py-3 text-left text-foreground">
                                    Business Unit
                                </th>

                                <th className="px-4 py-3 text-left text-foreground">
                                    Branch
                                </th>

                                <th className="px-4 py-3 text-left text-foreground">
                                    Code
                                </th>

                                <th className="px-4 py-3 text-left text-foreground">
                                    City
                                </th>

                                <th className="px-4 py-3 text-left text-foreground">
                                    Status
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {branches.length > 0 ? (
                                branches.map((branch) => (
                                    <tr
                                        key={branch.id}
                                        className="border-t"
                                    >
                                        <td className="px-4 py-3">
                                            {branch.tenant?.name ?? '-'}
                                        </td>

                                        <td className="px-4 py-3">
                                            {branch.company?.name ?? '-'}
                                        </td>

                                        <td className="px-4 py-3">
                                            {branch.businessUnit?.name ?? '-'}
                                        </td>

                                        <td className="px-4 py-3">
                                            {branch.name}
                                        </td>

                                        <td className="px-4 py-3">
                                            {branch.code}
                                        </td>

                                        <td className="px-4 py-3">
                                            {branch.city ?? '-'}
                                        </td>

                                        <td className="px-4 py-3">
                                            {branch.status}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan={7}
                                        className="px-4 py-6 text-center text-muted-foreground"
                                    >
                                        No branches found.
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