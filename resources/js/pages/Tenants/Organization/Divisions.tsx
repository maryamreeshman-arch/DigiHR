import { Head, Link } from '@inertiajs/react';

type Division = {
    id: number;
    tenant_id: number;
    name: string;
    code: string;
    status: string;

    tenant?: {
        name: string;
    };

    company?: {
        name: string;
    };

    department?: {
        name: string;
    };
};

type Props = {
    divisions: Division[];
};

export default function Divisions({ divisions }: Props) {
    return (
        <>
            <Head title="Divisions" />

            <div className="p-6">
                <div className="mb-6 flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold">
                            Divisions
                        </h1>

                        <p className="text-muted-foreground">
                            Manage divisions under each tenant, company and department.
                        </p>
                    </div>

                    <Link
                        href="/divisions/create"
                        className="rounded bg-black px-4 py-2 text-white"
                    >
                        + Add Division
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
                                    Department
                                </th>

                                <th className="px-4 py-3 text-left text-foreground">
                                    Division
                                </th>

                                <th className="px-4 py-3 text-left text-foreground">
                                    Code
                                </th>

                                <th className="px-4 py-3 text-left text-foreground">
                                    Status
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {divisions.length > 0 ? (
                                divisions.map((division) => (
                                    <tr
                                        key={division.id}
                                        className="border-t"
                                    >
                                        <td className="px-4 py-3">
                                            {division.tenant?.name ?? '-'}
                                        </td>

                                        <td className="px-4 py-3">
                                            {division.company?.name ?? '-'}
                                        </td>

                                        <td className="px-4 py-3">
                                            {division.department?.name ?? '-'}
                                        </td>

                                        <td className="px-4 py-3">
                                            {division.name}
                                        </td>

                                        <td className="px-4 py-3">
                                            {division.code}
                                        </td>

                                        <td className="px-4 py-3">
                                            {division.status}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan={6}
                                        className="px-4 py-6 text-center text-muted-foreground"
                                    >
                                        No divisions found.
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