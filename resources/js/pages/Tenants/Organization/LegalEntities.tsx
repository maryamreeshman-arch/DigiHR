import { Head, Link } from '@inertiajs/react';

type LegalEntity = {
    id: number;
    name: string;
    registration_no: string | null;
    tax_no: string | null;
    phone: string | null;
    email: string | null;
    status: string;
};

type Props = {
    legalEntities: LegalEntity[];
};

export default function LegalEntities({ legalEntities }: Props) {
    return (
        <>
            <Head title="Legal Entities" />

            <div className="p-6">
                <div className="mb-6 flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-semibold">
                            Legal Entities
                        </h1>

                        <p className="text-sm text-gray-500">
                            Manage legal entities under your organization.
                        </p>
                    </div>

                    <Link
                        href="/legal-entities/create"
                        className="rounded-lg bg-black px-4 py-2 text-sm font-medium text-white"
                    >
                        + Add Legal Entity
                    </Link>
                </div>

                <div className="overflow-hidden rounded-lg border">
                    <table className="w-full text-left text-sm">
                    <thead className="bg-muted text-foreground">
                            <tr>
                                <th className="px-4 py-3 text-foreground">Name</th>
                                <th className="px-4 py-3 text-foreground">Registration No</th>
                                <th className="px-4 py-3 text-foreground">Tax No</th>
                                <th className="px-4 py-3 text-foreground">Phone</th>
                                <th className="px-4 py-3 text-foreground">Email</th>
                                <th className="px-4 py-3 text-foreground">Status</th>
                            </tr>
                        </thead>

                        <tbody>
                            {legalEntities.map((entity) => (
                                <tr key={entity.id} className="border-b">
                                    <td className="px-4 py-3 font-medium">
                                        {entity.name}
                                    </td>

                                    <td className="px-4 py-3">
                                        {entity.registration_no ?? '-'}
                                    </td>

                                    <td className="px-4 py-3">
                                        {entity.tax_no ?? '-'}
                                    </td>

                                    <td className="px-4 py-3">
                                        {entity.phone ?? '-'}
                                    </td>

                                    <td className="px-4 py-3">
                                        {entity.email ?? '-'}
                                    </td>

                                    <td className="px-4 py-3">
                                        {entity.status}
                                    </td>
                                </tr>
                            ))}

                            {legalEntities.length === 0 && (
                                <tr>
                                    <td
                                        colSpan={6}
                                        className="px-4 py-8 text-center text-gray-500"
                                    >
                                        No legal entities found.
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