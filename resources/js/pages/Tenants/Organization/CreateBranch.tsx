import { Head, Link, useForm } from '@inertiajs/react';

type Tenant = {
    id: number;
    name: string;
};

type Company = {
    id: number;
    tenant_id: number;
    name: string;
};

type BusinessUnit = {
    id: number;
    tenant_id: number;
    company_id: number;
    name: string;
};

type Props = {
    tenants: Tenant[];
    companies: Company[];
    businessUnits: BusinessUnit[];
};

export default function CreateBranch({
    tenants,
    companies,
    businessUnits,
}: Props) {
    const { data, setData, post, processing, errors } = useForm({
        tenant_id: '',
        company_id: '',
        business_unit_id: '',
        name: '',
        code: '',
        address: '',
        city: '',
        phone: '',
        email: '',
        latitude: '',
        longitude: '',
        status: 'active',
    });

    const filteredCompanies = companies.filter(
        (company) => String(company.tenant_id) === data.tenant_id,
    );

    const filteredBusinessUnits = businessUnits.filter(
        (businessUnit) =>
            String(businessUnit.tenant_id) === data.tenant_id &&
            String(businessUnit.company_id) === data.company_id,
    );

    const submit = (e: React.FormEvent) => {
        e.preventDefault();

        post('/branches');
    };

    return (
        <>
            <Head title="Add Branch" />

            <div className="p-6">
                <div className="mb-6">
                    <Link
                        href="/branches"
                        className="text-sm text-blue-600"
                    >
                        ← Back to Branches
                    </Link>

                    <h1 className="mt-2 text-2xl font-bold">
                        Add Branch
                    </h1>

                    <p className="text-muted-foreground">
                        Create a branch under a tenant and company.
                    </p>
                </div>

                <form
                    onSubmit={submit}
                    className="max-w-2xl space-y-5 rounded-lg border p-6"
                >
                    {/* Tenant */}
                    <div>
                        <label className="mb-1 block font-medium">
                            Tenant
                        </label>

                        <select
                            value={data.tenant_id}
                            onChange={(e) => {
                                setData('tenant_id', e.target.value);
                                setData('company_id', '');
                                setData('business_unit_id', '');
                            }}
                            className="w-full rounded border p-2"
                        >
                            <option value="">Select Tenant</option>

                            {tenants.map((tenant) => (
                                <option key={tenant.id} value={tenant.id}>
                                    {tenant.name}
                                </option>
                            ))}
                        </select>

                        {errors.tenant_id && (
                            <p className="text-sm text-red-600">
                                {errors.tenant_id}
                            </p>
                        )}
                    </div>

                    {/* Company */}
                    <div>
                        <label className="mb-1 block font-medium">
                            Company
                        </label>

                        <select
                            value={data.company_id}
                            onChange={(e) => {
                                setData('company_id', e.target.value);
                                setData('business_unit_id', '');
                            }}
                            className="w-full rounded border p-2"
                            disabled={!data.tenant_id}
                        >
                            <option value="">
                                {data.tenant_id
                                    ? 'Select Company'
                                    : 'Select Tenant First'}
                            </option>

                            {filteredCompanies.map((company) => (
                                <option key={company.id} value={company.id}>
                                    {company.name}
                                </option>
                            ))}
                        </select>

                        {errors.company_id && (
                            <p className="text-sm text-red-600">
                                {errors.company_id}
                            </p>
                        )}
                    </div>

                    {/* Business Unit */}
                    <div>
                        <label className="mb-1 block font-medium">
                            Business Unit
                        </label>

                        <select
                            value={data.business_unit_id}
                            onChange={(e) =>
                                setData(
                                    'business_unit_id',
                                    e.target.value,
                                )
                            }
                            className="w-full rounded border p-2"
                            disabled={!data.company_id}
                        >
                            <option value="">
                                {data.company_id
                                    ? 'Select Business Unit'
                                    : 'Select Company First'}
                            </option>

                            {filteredBusinessUnits.map((businessUnit) => (
                                <option
                                    key={businessUnit.id}
                                    value={businessUnit.id}
                                >
                                    {businessUnit.name}
                                </option>
                            ))}
                        </select>

                        {errors.business_unit_id && (
                            <p className="text-sm text-red-600">
                                {errors.business_unit_id}
                            </p>
                        )}
                    </div>

                    {/* Name */}
                    <div>
                        <label className="mb-1 block font-medium">
                            Branch Name
                        </label>

                        <input
                            type="text"
                            value={data.name}
                            onChange={(e) =>
                                setData('name', e.target.value)
                            }
                            placeholder="e.g. Colombo Branch"
                            className="w-full rounded border p-2"
                        />

                        {errors.name && (
                            <p className="text-sm text-red-600">
                                {errors.name}
                            </p>
                        )}
                    </div>

                    {/* Code */}
                    <div>
                        <label className="mb-1 block font-medium">
                            Branch Code
                        </label>

                        <input
                            type="text"
                            value={data.code}
                            onChange={(e) =>
                                setData('code', e.target.value)
                            }
                            placeholder="e.g. COL-01"
                            className="w-full rounded border p-2"
                        />

                        {errors.code && (
                            <p className="text-sm text-red-600">
                                {errors.code}
                            </p>
                        )}
                    </div>

                    {/* Address */}
                    <div>
                        <label className="mb-1 block font-medium">
                            Address
                        </label>

                        <textarea
                            value={data.address}
                            onChange={(e) =>
                                setData('address', e.target.value)
                            }
                            rows={3}
                            className="w-full rounded border p-2"
                        />
                    </div>

                    {/* City */}
                    <div>
                        <label className="mb-1 block font-medium">
                            City
                        </label>

                        <input
                            type="text"
                            value={data.city}
                            onChange={(e) =>
                                setData('city', e.target.value)
                            }
                            placeholder="e.g. Colombo"
                            className="w-full rounded border p-2"
                        />
                    </div>

                    {/* Phone */}
                    <div>
                        <label className="mb-1 block font-medium">
                            Phone
                        </label>

                        <input
                            type="text"
                            value={data.phone}
                            onChange={(e) =>
                                setData('phone', e.target.value)
                            }
                            className="w-full rounded border p-2"
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label className="mb-1 block font-medium">
                            Email
                        </label>

                        <input
                            type="email"
                            value={data.email}
                            onChange={(e) =>
                                setData('email', e.target.value)
                            }
                            className="w-full rounded border p-2"
                        />
                    </div>

                    {/* Latitude */}
                    <div>
                        <label className="mb-1 block font-medium">
                            Latitude
                        </label>

                        <input
                            type="number"
                            step="any"
                            value={data.latitude}
                            onChange={(e) =>
                                setData('latitude', e.target.value)
                            }
                            placeholder="e.g. 6.9271"
                            className="w-full rounded border p-2"
                        />
                    </div>

                    {/* Longitude */}
                    <div>
                        <label className="mb-1 block font-medium">
                            Longitude
                        </label>

                        <input
                            type="number"
                            step="any"
                            value={data.longitude}
                            onChange={(e) =>
                                setData('longitude', e.target.value)
                            }
                            placeholder="e.g. 79.8612"
                            className="w-full rounded border p-2"
                        />
                    </div>

                    {/* Status */}
                    <div>
                        <label className="mb-1 block font-medium">
                            Status
                        </label>

                        <select
                            value={data.status}
                            onChange={(e) =>
                                setData('status', e.target.value)
                            }
                            className="w-full rounded border p-2"
                        >
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                        </select>
                    </div>

                    <button
                        type="submit"
                        disabled={processing}
                        className="rounded bg-black px-5 py-2 text-white"
                    >
                        {processing ? 'Saving...' : 'Save Branch'}
                    </button>
                </form>
            </div>
        </>
    );
}