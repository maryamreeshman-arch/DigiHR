import { Head, Link, useForm } from '@inertiajs/react';

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        slug: '',
        status: 'active',
        timezone: 'Asia/Colombo',
        currency: 'LKR',
        locale: 'en',
    });

    function submit(e: React.FormEvent) {
        e.preventDefault();
        post('/tenants');
    }

    return (
        <>
            <Head title="Add Tenant" />

            <div className="p-6">
                <div className="mb-6">
                    <h1 className="text-2xl font-semibold">Add Tenant</h1>
                    <p className="text-sm text-gray-500">
                        Create a new DigiHR tenant.
                    </p>
                </div>

                <form
                    onSubmit={submit}
                    className="max-w-2xl space-y-5 rounded-lg border p-6"
                >
                    <div>
                        <label className="mb-1 block text-sm font-medium">
                            Company Name
                        </label>

                        <input
                            type="text"
                            value={data.name}
                            onChange={(e) =>
                                setData('name', e.target.value)
                            }
                            className="w-full rounded-lg border px-3 py-2"
                            placeholder="ABC Company"
                        />

                        {errors.name && (
                            <p className="mt-1 text-sm text-red-500">
                                {errors.name}
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="mb-1 block text-sm font-medium">
                            Slug
                        </label>

                        <input
                            type="text"
                            value={data.slug}
                            onChange={(e) =>
                                setData('slug', e.target.value)
                            }
                            className="w-full rounded-lg border px-3 py-2"
                            placeholder="abc-company"
                        />

                        {errors.slug && (
                            <p className="mt-1 text-sm text-red-500">
                                {errors.slug}
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="mb-1 block text-sm font-medium">
                            Status
                        </label>

                        <select
                            value={data.status}
                            onChange={(e) =>
                                setData('status', e.target.value)
                            }
                            className="w-full rounded-lg border px-3 py-2"
                        >
                            <option value="active">Active</option>
                            <option value="suspended">Suspended</option>
                        </select>
                    </div>

                    <div>
                        <label className="mb-1 block text-sm font-medium">
                            Timezone
                        </label>

                        <input
                            type="text"
                            value={data.timezone}
                            onChange={(e) =>
                                setData('timezone', e.target.value)
                            }
                            className="w-full rounded-lg border px-3 py-2"
                        />
                    </div>

                    <div>
                        <label className="mb-1 block text-sm font-medium">
                            Currency
                        </label>

                        <input
                            type="text"
                            value={data.currency}
                            onChange={(e) =>
                                setData('currency', e.target.value)
                            }
                            className="w-full rounded-lg border px-3 py-2"
                            maxLength={3}
                        />
                    </div>

                    <div>
                        <label className="mb-1 block text-sm font-medium">
                            Locale
                        </label>

                        <input
                            type="text"
                            value={data.locale}
                            onChange={(e) =>
                                setData('locale', e.target.value)
                            }
                            className="w-full rounded-lg border px-3 py-2"
                        />
                    </div>

                    <div className="flex gap-3">
                        <button
                            type="submit"
                            disabled={processing}
                            className="rounded-lg bg-black px-4 py-2 text-sm font-medium text-white"
                        >
                            {processing ? 'Saving...' : 'Save Tenant'}
                        </button>

                        <Link
                            href="/tenants"
                            className="rounded-lg border px-4 py-2 text-sm font-medium"
                        >
                            Cancel
                        </Link>
                    </div>
                </form>
            </div>
        </>
    );
}