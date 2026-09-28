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

type CostCenter = {
    id: number;
    tenant_id: number;
    company_id: number;
    code: string;
    name: string;
};

type Props = {
    tenants: Tenant[];
    companies: Company[];
    parentCostCenters: CostCenter[];
};

export default function CreateCostCenter({
    tenants,
    companies,
    parentCostCenters,
}: Props) {
    const { data, setData, post, processing, errors } = useForm({
        tenant_id: '',
        company_id: '',
        parent_id: '',
        code: '',
        name: '',
        description: '',
    });

    const filteredCompanies = companies.filter(
        (company) => String(company.tenant_id) === data.tenant_id,
    );

    const filteredParentCostCenters = parentCostCenters.filter(
        (costCenter) =>
            String(costCenter.tenant_id) === data.tenant_id &&
            String(costCenter.company_id) === data.company_id,
    );

    const submit = (e: React.FormEvent) => {
        e.preventDefault();

        post('/cost-centers');
    };

    return (
        <>
            <Head title="Add Cost Center" />

            <div className="p-6">
                <div className="mb-6">
                    <Link
                        href="/cost-centers"
                        className="text-sm text-blue-600"
                    >
                        ← Back to Cost Centers
                    </Link>

                    <h1 className="mt-2 text-2xl font-bold">
                        Add Cost Center
                    </h1>

                    <p className="text-muted-foreground">
                        Create a cost center under a tenant and company.
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
                                setData('parent_id', '');
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
                                setData('parent_id', '');
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

                    {/* Parent Cost Center */}
                    <div>
                        <label className="mb-1 block font-medium">
                            Parent Cost Center
                        </label>

                        <select
                            value={data.parent_id}
                            onChange={(e) =>
                                setData('parent_id', e.target.value)
                            }
                            className="w-full rounded border p-2"
                            disabled={!data.company_id}
                        >
                            <option value="">
                                {data.company_id
                                    ? 'No Parent Cost Center'
                                    : 'Select Company First'}
                            </option>

                            {filteredParentCostCenters.map((costCenter) => (
                                <option
                                    key={costCenter.id}
                                    value={costCenter.id}
                                >
                                    {costCenter.code} - {costCenter.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Code */}
                    <div>
                        <label className="mb-1 block font-medium">
                            Cost Center Code
                        </label>

                        <input
                            type="text"
                            value={data.code}
                            onChange={(e) =>
                                setData('code', e.target.value)
                            }
                            placeholder="e.g. CC-002"
                            className="w-full rounded border p-2"
                        />

                        {errors.code && (
                            <p className="text-sm text-red-600">
                                {errors.code}
                            </p>
                        )}
                    </div>

                    {/* Name */}
                    <div>
                        <label className="mb-1 block font-medium">
                            Cost Center Name
                        </label>

                        <input
                            type="text"
                            value={data.name}
                            onChange={(e) =>
                                setData('name', e.target.value)
                            }
                            placeholder="e.g. HR Cost Center"
                            className="w-full rounded border p-2"
                        />

                        {errors.name && (
                            <p className="text-sm text-red-600">
                                {errors.name}
                            </p>
                        )}
                    </div>

                    {/* Description */}
                    <div>
                        <label className="mb-1 block font-medium">
                            Description
                        </label>

                        <textarea
                            value={data.description}
                            onChange={(e) =>
                                setData('description', e.target.value)
                            }
                            placeholder="Cost center description"
                            rows={3}
                            className="w-full rounded border p-2"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={processing}
                        className="rounded bg-black px-5 py-2 text-white"
                    >
                        {processing
                            ? 'Saving...'
                            : 'Save Cost Center'}
                    </button>
                </form>
            </div>
        </>
    );
}