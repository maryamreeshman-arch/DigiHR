import { Head, Link } from '@inertiajs/react';

type Company = {
    id: number;
    tenant_id: number;
    name: string;
    code: string;
    registration_no: string | null;
    tax_number: string | null;
    email: string | null;
    phone: string | null;
    address: string | null;
    status: string;

    tenant?: {
        name: string;
    };

    legalEntity?: {
        name: string;
    };
};

type Props = {
    companies: Company[];
};

export default function Companies({ companies }: Props) {
    return (
        <>
            <Head title="Companies" />

            <div className="p-6">
                <div className="mb-6 flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold">
                            Companies
                        </h1>

                        <p className="text-muted-foreground">
                            Manage companies under each tenant.
                        </p>
                    </div>

                    <Link
                        href="/companies/create"
                        className="rounded bg-black px-4 py-2 text-white"
                    >
                        + Add Company
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
                                    Legal Entity
                                </th>

                                <th className="px-4 py-3 text-left text-foreground">
                                    Company
                                </th>

                                <th className="px-4 py-3 text-left text-foreground">
                                    Code
                                </th>

                                <th className="px-4 py-3 text-left text-foreground">
                                    Email
                                </th>

                                <th className="px-4 py-3 text-left text-foreground">
                                    Status
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {companies.length > 0 ? (
                                companies.map((company) => (
                                    <tr
                                        key={company.id}
                                        className="border-t"
                                    >
                                        <td className="px-4 py-3">
                                            {company.tenant?.name ?? '-'}
                                        </td>

                                        <td className="px-4 py-3">
                                            {company.legalEntity?.name ?? '-'}
                                        </td>

                                        <td className="px-4 py-3">
                                            {company.name}
                                        </td>

                                        <td className="px-4 py-3">
                                            {company.code}
                                        </td>

                                        <td className="px-4 py-3">
                                            {company.email ?? '-'}
                                        </td>

                                        <td className="px-4 py-3">
                                            {company.status}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan={6}
                                        className="px-4 py-6 text-center text-muted-foreground"
                                    >
                                        No companies found.
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
