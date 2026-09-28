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

type Department = {
    id: number;
    tenant_id: number;
    company_id: number;
    name: string;
};

type Props = {
    tenants: Tenant[];
    companies: Company[];
    parentDepartments: Department[];
};

export default function CreateDepartment({
    tenants,
    companies,
    parentDepartments,
}: Props) {
    const { data, setData, post, processing, errors } = useForm({
        tenant_id: '',
        company_id: '',
        parent_id: '',
        name: '',
        code: '',
        description: '',
        status: 'active',
    });

    const filteredCompanies = companies.filter(
        (company) => String(company.tenant_id) === data.tenant_id,
    );

    const filteredParentDepartments = parentDepartments.filter(
        (department) =>
            String(department.tenant_id) === data.tenant_id &&
            String(department.company_id) === data.company_id,
    );

    const submit = (e: React.FormEvent) => {
        e.preventDefault();

        post('/departments');
    };

    return (
        <>
            <Head title="Add Department" />

            <div className="p-6">
                <div className="mb-6">
                    <Link
                        href="/departments"
                        className="text-sm text-blue-600"
                    >
                        ← Back to Departments
                    </Link>

                    <h1 className="mt-2 text-2xl font-bold">
                        Add Department
                    </h1>

                    <p className="text-muted-foreground">
                        Create a department under a tenant and company.
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

                    {/* Parent Department */}
                    <div>
                        <label className="mb-1 block font-medium">
                            Parent Department
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
                                    ? 'No Parent Department'
                                    : 'Select Company First'}
                            </option>

                            {filteredParentDepartments.map(
                                (department) => (
                                    <option
                                        key={department.id}
                                        value={department.id}
                                    >
                                        {department.name}
                                    </option>
                                ),
                            )}
                        </select>
                    </div>

                    {/* Department Name */}
                    <div>
                        <label className="mb-1 block font-medium">
                            Department Name
                        </label>

                        <input
                            type="text"
                            value={data.name}
                            onChange={(e) =>
                                setData('name', e.target.value)
                            }
                            placeholder="e.g. Finance"
                            className="w-full rounded border p-2"
                        />

                        {errors.name && (
                            <p className="text-sm text-red-600">
                                {errors.name}
                            </p>
                        )}
                    </div>

                    {/* Department Code */}
                    <div>
                        <label className="mb-1 block font-medium">
                            Department Code
                        </label>

                        <input
                            type="text"
                            value={data.code}
                            onChange={(e) =>
                                setData('code', e.target.value)
                            }
                            placeholder="e.g. FIN"
                            className="w-full rounded border p-2"
                        />

                        {errors.code && (
                            <p className="text-sm text-red-600">
                                {errors.code}
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
                            placeholder="Department description"
                            rows={3}
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
                        {processing
                            ? 'Saving...'
                            : 'Save Department'}
                    </button>
                </form>
            </div>
        </>
    );
}