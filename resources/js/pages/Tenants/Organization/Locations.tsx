import { Head, Link } from '@inertiajs/react';

type Location = {
    id: number;
    tenant_id: number;
    name: string;
    code: string;
    address: string | null;
    latitude: number | null;
    longitude: number | null;
    geofence_radius: number | null;
    status: string;

    tenant?: {
        name: string;
    };

    company?: {
        name: string;
    };

    branch?: {
        name: string;
    };
};

type Props = {
    locations: Location[];
};

export default function Locations({ locations }: Props) {
    return (
        <>
            <Head title="Locations" />

            <div className="p-6">
                <div className="mb-6 flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold">
                            Locations
                        </h1>

                        <p className="text-muted-foreground">
                            Manage locations under each tenant, company and branch.
                        </p>
                    </div>

                    <Link
                        href="/locations/create"
                        className="rounded bg-black px-4 py-2 text-white"
                    >
                        + Add Location
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
                                    Branch
                                </th>

                                <th className="px-4 py-3 text-left text-foreground">
                                    Location
                                </th>

                                <th className="px-4 py-3 text-left text-foreground">
                                    Code
                                </th>

                                <th className="px-4 py-3 text-left text-foreground">
                                    Geofence
                                </th>

                                <th className="px-4 py-3 text-left text-foreground">
                                    Status
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {locations.length > 0 ? (
                                locations.map((location) => (
                                    <tr
                                        key={location.id}
                                        className="border-t"
                                    >
                                        <td className="px-4 py-3">
                                            {location.tenant?.name ?? '-'}
                                        </td>

                                        <td className="px-4 py-3">
                                            {location.company?.name ?? '-'}
                                        </td>

                                        <td className="px-4 py-3">
                                            {location.branch?.name ?? '-'}
                                        </td>

                                        <td className="px-4 py-3">
                                            {location.name}
                                        </td>

                                        <td className="px-4 py-3">
                                            {location.code}
                                        </td>

                                        <td className="px-4 py-3">
                                            {location.geofence_radius !== null
                                                ? `${location.geofence_radius} m`
                                                : '-'}
                                        </td>

                                        <td className="px-4 py-3">
                                            {location.status}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan={7}
                                        className="px-4 py-6 text-center text-muted-foreground"
                                    >
                                        No locations found.
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