import { Head, Link, useForm } from '@inertiajs/react';

type Tenant = {
    id: number;
    name: string;
};

type Props = {
    tenants: Tenant[];
};

export default function CreateLegalEntity({ tenants }: Props) {
    const { data, setData, post, processing, errors } = useForm({
        tenant_id: '',
        name: '',
        registration_no: '',
        tax_no: '',
        address: '',
        phone: '',
        email: '',
        status: 'active',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();

        post('/legal-entities');
    };

    return (
        <>
            <Head title="Add Legal Entity" />

            <div className="p-6">
                <div className="mb-6">
                    <Link
                        href="/legal-entities"
                        className="text-sm text-blue-600"
                    >
                        ← Back to Legal Entities
                    </Link>

                    <h1 className="mt-2 text-2xl font-bold">
                        Add Legal Entity
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
                            onChange={(e) =>
                                setData('tenant_id', e.target.value)
                            }
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

                    {/* Name */}
                    <div>
                        <label className="mb-1 block font-medium">
                            Legal Entity Name
                        </label>

                        <input
                            type="text"
                            value={data.name}
                            onChange={(e) =>
                                setData('name', e.target.value)
                            }
                            className="w-full rounded border p-2"
                            placeholder="e.g. ABC Holdings"
                        />

                        {errors.name && (
                            <p className="text-sm text-red-600">
                                {errors.name}
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
                                setData('registration_no', e.target.value)
                            }
                            className="w-full rounded border p-2"
                            placeholder="e.g. REG001"
                        />
                    </div>

                    {/* Tax No */}
                    <div>
                        <label className="mb-1 block font-medium">
                            Tax No
                        </label>

                        <input
                            type="text"
                            value={data.tax_no}
                            onChange={(e) =>
                                setData('tax_no', e.target.value)
                            }
                            className="w-full rounded border p-2"
                            placeholder="e.g. TAX001"
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
                            : 'Save Legal Entity'}
                    </button>
                </form>
            </div>
        </>
    );
}