import { Head, Link } from '@inertiajs/react';

type Department = {
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

    parent?: {
        name: string;
    };
};

type Props = {
    departments: Department[];
};

export default function Departments({ departments }: Props) {
    return (
        <>
            <Head title="Departments" />

            <div className="p-6">
                <div className="mb-6 flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold">
                            Departments
                        </h1>

                        <p className="text-muted-foreground">
                            Manage departments under each tenant and company.
                        </p>
                    </div>

                    <Link
                        href="/departments/create"
                        className="rounded bg-black px-4 py-2 text-white"
                    >
                        + Add Department
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
                                    Parent Department
                                </th>

                                <th className="px-4 py-3 text-left text-foreground">
                                    Department
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
                            {departments.length > 0 ? (
                                departments.map((department) => (
                                    <tr
                                        key={department.id}
                                        className="border-t"
                                    >
                                        <td className="px-4 py-3">
                                            {department.tenant?.name ?? '-'}
                                        </td>

                                        <td className="px-4 py-3">
                                            {department.company?.name ?? '-'}
                                        </td>

                                        <td className="px-4 py-3">
                                            {department.parent?.name ?? '-'}
                                        </td>

                                        <td className="px-4 py-3">
                                            {department.name}
                                        </td>

                                        <td className="px-4 py-3">
                                            {department.code}
                                        </td>

                                        <td className="px-4 py-3">
                                            {department.status}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan={6}
                                        className="px-4 py-6 text-center text-muted-foreground"
                                    >
                                        No departments found.
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