import { Head, Link } from '@inertiajs/react';

type BusinessUnit = {
    id: number;
    tenant_id: number;
    name: string;
    code: string;
    description: string | null;
    status: string;

    tenant?: {
        name: string;
    };

    company?: {
        name: string;
    };
};

type Props = {
    businessUnits: BusinessUnit[];
};

export default function BusinessUnits({
    businessUnits,
}: Props) {
    return (
        <>
            <Head title="Business Units" />

            <div className="p-6">
                <div className="mb-6 flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold">
                            Business Units
                        </h1>

                        <p className="text-muted-foreground">
                            Manage business units under each tenant.
                        </p>
                    </div>

                    <Link
                        href="/business-units/create"
                        className="rounded bg-black px-4 py-2 text-white"
                    >
                        + Add Business Unit
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
                                    Name
                                </th>

                                <th className="px-4 py-3 text-left text-foreground">
                                    Code
                                </th>

                                <th className="px-4 py-3 text-left text-foreground">
                                    Description
                                </th>

                                <th className="px-4 py-3 text-left text-foreground">
                                    Status
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {businessUnits.length > 0 ? (
                                businessUnits.map((businessUnit) => (
                                    <tr
                                        key={businessUnit.id}
                                        className="border-t"
                                    >
                                        <td className="px-4 py-3">
                                            {businessUnit.tenant?.name ?? '-'}
                                        </td>

                                        <td className="px-4 py-3">
                                            {businessUnit.company?.name ?? '-'}
                                        </td>

                                        <td className="px-4 py-3">
                                            {businessUnit.name}
                                        </td>

                                        <td className="px-4 py-3">
                                            {businessUnit.code}
                                        </td>

                                        <td className="px-4 py-3">
                                            {businessUnit.description ?? '-'}
                                        </td>

                                        <td className="px-4 py-3">
                                            {businessUnit.status}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan={6}
                                        className="px-4 py-6 text-center text-muted-foreground"
                                    >
                                        No business units found.
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