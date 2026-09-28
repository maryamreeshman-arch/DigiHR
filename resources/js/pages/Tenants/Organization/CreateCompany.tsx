import { Head, Link, useForm } from '@inertiajs/react';

type Tenant = {
    id: number;
    name: string;
};

type LegalEntity = {
    id: number;
    tenant_id: number;
    name: string;
};

type Props = {
    tenants: Tenant[];
    legalEntities: LegalEntity[];
};

export default function CreateCompany({
    tenants,
    legalEntities,
}: Props) {
    const { data, setData, post, processing, errors } = useForm({
        tenant_id: '',
        legal_entity_id: '',
        name: '',
        code: '',
        registration_no: '',
        tax_number: '',
        email: '',
        phone: '',
        address: '',
        status: 'active',
    });

    const filteredLegalEntities = legalEntities.filter(
        (legalEntity) =>
            String(legalEntity.tenant_id) === data.tenant_id,
    );

    const submit = (e: React.FormEvent) => {
        e.preventDefault();

        post('/companies');
    };

    return (
        <>
            <Head title="Add Company" />

            <div className="p-6">
                <div className="mb-6">
                    <Link
                        href="/companies"
                        className="text-sm text-blue-600"
                    >
                        ← Back to Companies
                    </Link>

                    <h1 className="mt-2 text-2xl font-bold">
                        Add Company
                    </h1>
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
                                setData('legal_entity_id', '');
                            }}
                            className="w-full rounded border p-2"
                        >
                            <option value="">Select Tenant</option>

                            {tenants.map((tenant) => (
                                <option
                                    key={tenant.id}
                                    value={tenant.id}
                                >
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

                    {/* Legal Entity */}
                    <div>
                        <label className="mb-1 block font-medium">
                            Legal Entity
                        </label>

                        <select
                            value={data.legal_entity_id}
                            onChange={(e) =>
                                setData(
                                    'legal_entity_id',
                                    e.target.value,
                                )
                            }
                            className="w-full rounded border p-2"
                            disabled={!data.tenant_id}
                        >
                            <option value="">
                                {data.tenant_id
                                    ? 'Select Legal Entity'
                                    : 'Select Tenant First'}
                            </option>

                            {filteredLegalEntities.map(
                                (legalEntity) => (
                                    <option
                                        key={legalEntity.id}
                                        value={legalEntity.id}
                                    >
                                        {legalEntity.name}
                                    </option>
                                ),
                            )}
                        </select>

                        {errors.legal_entity_id && (
                            <p className="text-sm text-red-600">
                                {errors.legal_entity_id}
                            </p>
                        )}
                    </div>

                    {/* Company Name */}
                    <div>
                        <label className="mb-1 block font-medium">
                            Company Name
                        </label>

                        <input
                            type="text"
                            value={data.name}
                            onChange={(e) =>
                                setData('name', e.target.value)
                            }
                            className="w-full rounded border p-2"
                            placeholder="e.g. ABC Technologies"
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
                            Company Code
                        </label>

                        <input
                            type="text"
                            value={data.code}
                            onChange={(e) =>
                                setData('code', e.target.value)
                            }
                            className="w-full rounded border p-2"
                            placeholder="e.g. ABC-TECH"
                        />

                        {errors.code && (
                            <p className="text-sm text-red-600">
                                {errors.code}
                            </p>
                        )}
                    </div>

                    {/* Registration No */}
                    <div>
                        <label className="mb-1 block font-medium">
                            Registration No
                        </label>

                        <input
                            type="text"
                            value={data.registration_no}
                            onChange={(e) =>
                                setData(
                                    'registration_no',
                                    e.target.value,
                                )
                            }
                            className="w-full rounded border p-2"
                        />
                    </div>

                    {/* Tax Number */}
                    <div>
                        <label className="mb-1 block font-medium">
                            Tax Number
                        </label>

                        <input
                            type="text"
                            value={data.tax_number}
                            onChange={(e) =>
                                setData(
                                    'tax_number',
                                    e.target.value,
                                )
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
                            className="w-full rounded border p-2"
                            rows={3}
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
                            : 'Save Company'}
                    </button>
                </form>
            </div>
        </>
    );
}