import { Head, Link } from '@inertiajs/react';

type CostCenter = {
    id: number;
    tenant_id: number;
    code: string;
    name: string;
    description: string | null;

    tenant?: {
        name: string;
    };

    company?: {
        name: string;
    };

    parent?: {
        name: string;
    };
};

type Props = {
    costCenters: CostCenter[];
};

export default function CostCenters({ costCenters }: Props) {
    return (
        <>
            <Head title="Cost Centers" />

            <div className="p-6">
                <div className="mb-6 flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold">
                            Cost Centers
                        </h1>

                        <p className="text-muted-foreground">
                            Manage cost centers under each tenant and company.
                        </p>
                    </div>

                    <Link
                        href="/cost-centers/create"
                        className="rounded bg-black px-4 py-2 text-white"
                    >
                        + Add Cost Center
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
                                    Parent
                                </th>

                                <th className="px-4 py-3 text-left text-foreground">
                                    Code
                                </th>

                                <th className="px-4 py-3 text-left text-foreground">
                                    Name
                                </th>

                                <th className="px-4 py-3 text-left text-foreground">
                                    Description
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {costCenters.length > 0 ? (
                                costCenters.map((costCenter) => (
                                    <tr
                                        key={costCenter.id}
                                        className="border-t"
                                    >
                                        <td className="px-4 py-3">
                                            {costCenter.tenant?.name ?? '-'}
                                        </td>

                                        <td className="px-4 py-3">
                                            {costCenter.company?.name ?? '-'}
                                        </td>

                                        <td className="px-4 py-3">
                                            {costCenter.parent?.name ?? '-'}
                                        </td>

                                        <td className="px-4 py-3">
                                            {costCenter.code}
                                        </td>

                                        <td className="px-4 py-3">
                                            {costCenter.name}
                                        </td>

                                        <td className="px-4 py-3">
                                            {costCenter.description ?? '-'}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan={6}
                                        className="px-4 py-6 text-center text-muted-foreground"
                                    >
                                        No cost centers found.
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