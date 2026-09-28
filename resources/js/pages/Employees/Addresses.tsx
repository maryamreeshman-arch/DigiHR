import { Head, Link, useForm } from '@inertiajs/react';

type Employee = {
    id: number;
    employee_no: string;
};

type Address = {
    id: number;
    address_type: string;
    address_line_1: string;
    address_line_2: string | null;
    city: string;
    district: string | null;
    province: string | null;
    postal_code: string | null;
    country: string;
    is_primary: boolean;
};

type Props = {
    employee: Employee;
    addresses: Address[];
};

export default function Addresses({
    employee,
    addresses,
}: Props) {
    const { data, setData, post, processing, errors, reset } = useForm({
        address_type: 'home',
        address_line_1: '',
        address_line_2: '',
        city: '',
        district: '',
        province: '',
        postal_code: '',
        country: 'Sri Lanka',
        is_primary: false,
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();

        post(`/employees/${employee.id}/addresses`, {
            onSuccess: () => {
                reset();
                setData('address_type', 'home');
                setData('country', 'Sri Lanka');
                setData('is_primary', false);
            },
        });
    };

    const deleteAddress = (addressId: number) => {
        if (!confirm('Are you sure you want to delete this address?')) {
            return;
        }

        const deleteForm = {
            _method: 'delete',
        };

        // Use a regular Inertia form request for DELETE.
        fetch(`/employees/${employee.id}/addresses/${addressId}`, {
            method: 'DELETE',
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
                'X-CSRF-TOKEN':
                    document
                        .querySelector('meta[name="csrf-token"]')
                        ?.getAttribute('content') ?? '',
            },
        }).then(() => {
            window.location.reload();
        });
    };

    return (
        <>
            <Head title="Employee Addresses" />

            <div className="p-6">
                <div className="mb-6">
                    <Link
                        href="/employees"
                        className="text-sm text-blue-600"
                    >
                        ← Back to Employees
                    </Link>

                    <h1 className="mt-2 text-2xl font-bold">
                        Employee Addresses
                    </h1>

                    <p className="text-muted-foreground">
                        Employee: {employee.employee_no}
                    </p>
                </div>

                <div className="grid gap-6 lg:grid-cols-2">
                    {/* Add Address */}
                    <form
                        onSubmit={submit}
                        className="space-y-5 rounded-lg border p-6"
                    >
                        <h2 className="text-lg font-semibold">
                            Add Address
                        </h2>

                        {/* Address Type */}
                        <div>
                            <label className="mb-1 block font-medium">
                                Address Type
                            </label>

                            <select
                                value={data.address_type}
                                onChange={(e) =>
                                    setData(
                                        'address_type',
                                        e.target.value,
                                    )
                                }
                                className="w-full rounded border p-2"
                            >
                                <option value="home">Home</option>
                                <option value="current">Current</option>
                                <option value="permanent">Permanent</option>
                                <option value="other">Other</option>
                            </select>

                            {errors.address_type && (
                                <p className="text-sm text-red-600">
                                    {errors.address_type}
                                </p>
                            )}
                        </div>

                        {/* Address Line 1 */}
                        <div>
                            <label className="mb-1 block font-medium">
                                Address Line 1
                            </label>

                            <input
                                type="text"
                                value={data.address_line_1}
                                onChange={(e) =>
                                    setData(
                                        'address_line_1',
                                        e.target.value,
                                    )
                                }
                                placeholder="House / Street"
                                className="w-full rounded border p-2"
                            />

                            {errors.address_line_1 && (
                                <p className="text-sm text-red-600">
                                    {errors.address_line_1}
                                </p>
                            )}
                        </div>

                        {/* Address Line 2 */}
                        <div>
                            <label className="mb-1 block font-medium">
                                Address Line 2
                            </label>

                            <input
                                type="text"
                                value={data.address_line_2}
                                onChange={(e) =>
                                    setData(
                                        'address_line_2',
                                        e.target.value,
                                    )
                                }
                                placeholder="Apartment / Area"
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

                            {errors.city && (
                                <p className="text-sm text-red-600">
                                    {errors.city}
                                </p>
                            )}
                        </div>

                        {/* District */}
                        <div>
                            <label className="mb-1 block font-medium">
                                District
                            </label>

                            <input
                                type="text"
                                value={data.district}
                                onChange={(e) =>
                                    setData(
                                        'district',
                                        e.target.value,
                                    )
                                }
                                placeholder="e.g. Colombo"
                                className="w-full rounded border p-2"
                            />
                        </div>

                        {/* Province */}
                        <div>
                            <label className="mb-1 block font-medium">
                                Province
                            </label>

                            <input
                                type="text"
                                value={data.province}
                                onChange={(e) =>
                                    setData(
                                        'province',
                                        e.target.value,
                                    )
                                }
                                placeholder="e.g. Western Province"
                                className="w-full rounded border p-2"
                            />
                        </div>

                        {/* Postal Code */}
                        <div>
                            <label className="mb-1 block font-medium">
                                Postal Code
                            </label>

                            <input
                                type="text"
                                value={data.postal_code}
                                onChange={(e) =>
                                    setData(
                                        'postal_code',
                                        e.target.value,
                                    )
                                }
                                placeholder="e.g. 00100"
                                className="w-full rounded border p-2"
                            />
                        </div>

                        {/* Country */}
                        <div>
                            <label className="mb-1 block font-medium">
                                Country
                            </label>

                            <input
                                type="text"
                                value={data.country}
                                onChange={(e) =>
                                    setData(
                                        'country',
                                        e.target.value,
                                    )
                                }
                                className="w-full rounded border p-2"
                            />

                            {errors.country && (
                                <p className="text-sm text-red-600">
                                    {errors.country}
                                </p>
                            )}
                        </div>

                        {/* Primary */}
                        <div className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                checked={data.is_primary}
                                onChange={(e) =>
                                    setData(
                                        'is_primary',
                                        e.target.checked,
                                    )
                                }
                            />

                            <label className="font-medium">
                                Primary Address
                            </label>
                        </div>

                        <button
                            type="submit"
                            disabled={processing}
                            className="rounded bg-black px-5 py-2 text-white"
                        >
                            {processing
                                ? 'Saving...'
                                : 'Add Address'}
                        </button>
                    </form>

                    {/* Existing Addresses */}
                    <div className="rounded-lg border p-6">
                        <h2 className="mb-4 text-lg font-semibold">
                            Existing Addresses
                        </h2>

                        {addresses.length > 0 ? (
                            <div className="space-y-4">
                                {addresses.map((address) => (
                                    <div
                                        key={address.id}
                                        className="rounded border p-4"
                                    >
                                        <div className="mb-2 flex items-center justify-between">
                                            <div>
                                                <p className="font-medium capitalize">
                                                    {address.address_type}
                                                </p>

                                                {address.is_primary && (
                                                    <span className="text-xs font-medium text-green-600">
                                                        Primary
                                                    </span>
                                                )}
                                            </div>

                                            <button
                                                type="button"
                                                onClick={() =>
                                                    deleteAddress(
                                                        address.id,
                                                    )
                                                }
                                                className="text-sm text-red-600"
                                            >
                                                Delete
                                            </button>
                                        </div>

                                        <p>
                                            {address.address_line_1}
                                        </p>

                                        {address.address_line_2 && (
                                            <p>
                                                {address.address_line_2}
                                            </p>
                                        )}

                                        <p>
                                            {address.city}
                                            {address.district
                                                ? `, ${address.district}`
                                                : ''}
                                        </p>

                                        {address.province && (
                                            <p>
                                                {address.province}
                                            </p>
                                        )}

                                        <p>
                                            {address.postal_code
                                                ? `${address.postal_code}, `
                                                : ''}
                                            {address.country}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-muted-foreground">
                                No addresses added yet.
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}