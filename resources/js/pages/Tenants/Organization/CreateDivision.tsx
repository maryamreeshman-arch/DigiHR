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
    departments: Department[];
};

export default function CreateDivision({
    tenants,
    companies,
    departments,
}: Props) {
    const { data, setData, post, processing, errors } = useForm({
        tenant_id: '',
        company_id: '',
        department_id: '',
        name: '',
        code: '',
        status: 'active',
    });

    const filteredCompanies = companies.filter(
        (company) => String(company.tenant_id) === data.tenant_id,
    );

    const filteredDepartments = departments.filter(
        (department) =>
            String(department.tenant_id) === data.tenant_id &&
            String(department.company_id) === data.company_id,
    );

    const submit = (e: React.FormEvent) => {
        e.preventDefault();

        post('/divisions');
    };

    return (
        <>
            <Head title="Add Division" />

            <div className="p-6">
                <div className="mb-6">
                    <Link
                        href="/divisions"
                        className="text-sm text-blue-600"
                    >
                        ← Back to Divisions
                    </Link>

                    <h1 className="mt-2 text-2xl font-bold">
                        Add Division
                    </h1>

                    <p className="text-muted-foreground">
                        Create a division under a tenant, company and
                        department.
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
                                setData('department_id', '');
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
                                setData('department_id', '');
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

                    {/* Department */}
                    <div>
                        <label className="mb-1 block font-medium">
                            Department
                        </label>

                        <select
                            value={data.department_id}
                            onChange={(e) =>
                                setData('department_id', e.target.value)
                            }
                            className="w-full rounded border p-2"
                            disabled={!data.company_id}
                        >
                            <option value="">
                                {data.company_id
                                    ? 'Select Department'
                                    : 'Select Company First'}
                            </option>

                            {filteredDepartments.map((department) => (
                                <option
                                    key={department.id}
                                    value={department.id}
                                >
                                    {department.name}
                                </option>
                            ))}
                        </select>

                        {errors.department_id && (
                            <p className="text-sm text-red-600">
                                {errors.department_id}
                            </p>
                        )}
                    </div>

                    {/* Division Name */}
                    <div>
                        <label className="mb-1 block font-medium">
                            Division Name
                        </label>

                        <input
                            type="text"
                            value={data.name}
                            onChange={(e) =>
                                setData('name', e.target.value)
                            }
                            placeholder="e.g. Finance Division"
                            className="w-full rounded border p-2"
                        />

                        {errors.name && (
                            <p className="text-sm text-red-600">
                                {errors.name}
                            </p>
                        )}
                    </div>

                    {/* Division Code */}
                    <div>
                        <label className="mb-1 block font-medium">
                            Division Code
                        </label>

                        <input
                            type="text"
                            value={data.code}
                            onChange={(e) =>
                                setData('code', e.target.value)
                            }
                            placeholder="e.g. FIN-DIV"
                            className="w-full rounded border p-2"
                        />

                        {errors.code && (
                            <p className="text-sm text-red-600">
                                {errors.code}
                            </p>
                        )}
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
                        {processing ? 'Saving...' : 'Save Division'}
                    </button>
                </form>
            </div>
        </>
    );
}