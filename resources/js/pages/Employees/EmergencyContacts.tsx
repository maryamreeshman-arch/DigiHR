import { Head, Link, useForm } from '@inertiajs/react';

type Employee = {
    id: number;
    employee_no: string;
};

type EmergencyContact = {
    id: number;
    name: string;
    relationship: string;
    phone: string;
    email: string | null;
    address: string | null;
    is_primary: boolean;
};

type Props = {
    employee: Employee;
    emergencyContacts: EmergencyContact[];
};

export default function EmergencyContacts({
    employee,
    emergencyContacts,
}: Props) {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        relationship: '',
        phone: '',
        email: '',
        address: '',
        is_primary: false,
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();

        post(`/employees/${employee.id}/emergency-contacts`, {
            onSuccess: () => {
                reset();
                setData('is_primary', false);
            },
        });
    };

    const deleteContact = (contactId: number) => {
        if (!confirm('Are you sure you want to delete this contact?')) {
            return;
        }

        const form = document.createElement('form');

        form.method = 'POST';
        form.action = `/employees/${employee.id}/emergency-contacts/${contactId}`;

        const csrfToken = document
            .querySelector('meta[name="csrf-token"]')
            ?.getAttribute('content');

        const csrfInput = document.createElement('input');
        csrfInput.type = 'hidden';
        csrfInput.name = '_token';
        csrfInput.value = csrfToken ?? '';

        const methodInput = document.createElement('input');
        methodInput.type = 'hidden';
        methodInput.name = '_method';
        methodInput.value = 'DELETE';

        form.appendChild(csrfInput);
        form.appendChild(methodInput);

        document.body.appendChild(form);
        form.submit();
    };

    return (
        <>
            <Head title="Emergency Contacts" />

            <div className="p-6">
                <div className="mb-6">
                    <Link
                        href="/employees"
                        className="text-sm text-blue-600"
                    >
                        ← Back to Employees
                    </Link>

                    <h1 className="mt-2 text-2xl font-bold">
                        Emergency Contacts
                    </h1>

                    <p className="text-muted-foreground">
                        Employee: {employee.employee_no}
                    </p>
                </div>

                <div className="grid gap-6 lg:grid-cols-2">
                    {/* Add Emergency Contact */}
                    <form
                        onSubmit={submit}
                        className="space-y-5 rounded-lg border p-6"
                    >
                        <h2 className="text-lg font-semibold">
                            Add Emergency Contact
                        </h2>

                        {/* Name */}
                        <div>
                            <label className="mb-1 block font-medium">
                                Name
                            </label>

                            <input
                                type="text"
                                value={data.name}
                                onChange={(e) =>
                                    setData('name', e.target.value)
                                }
                                placeholder="e.g. Ahmed Perera"
                                className="w-full rounded border p-2"
                            />

                            {errors.name && (
                                <p className="text-sm text-red-600">
                                    {errors.name}
                                </p>
                            )}
                        </div>

                        {/* Relationship */}
                        <div>
                            <label className="mb-1 block font-medium">
                                Relationship
                            </label>

                            <input
                                type="text"
                                value={data.relationship}
                                onChange={(e) =>
                                    setData(
                                        'relationship',
                                        e.target.value,
                                    )
                                }
                                placeholder="e.g. Father, Mother, Spouse"
                                className="w-full rounded border p-2"
                            />

                            {errors.relationship && (
                                <p className="text-sm text-red-600">
                                    {errors.relationship}
                                </p>
                            )}
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
                                placeholder="e.g. 0771234567"
                                className="w-full rounded border p-2"
                            />

                            {errors.phone && (
                                <p className="text-sm text-red-600">
                                    {errors.phone}
                                </p>
                            )}
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
                                placeholder="example@email.com"
                                className="w-full rounded border p-2"
                            />

                            {errors.email && (
                                <p className="text-sm text-red-600">
                                    {errors.email}
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
                                placeholder="Emergency contact address"
                                className="w-full rounded border p-2"
                            />
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
                                Primary Emergency Contact
                            </label>
                        </div>

                        <button
                            type="submit"
                            disabled={processing}
                            className="rounded bg-black px-5 py-2 text-white"
                        >
                            {processing
                                ? 'Saving...'
                                : 'Add Emergency Contact'}
                        </button>
                    </form>

                    {/* Existing Contacts */}
                    <div className="rounded-lg border p-6">
                        <h2 className="mb-4 text-lg font-semibold">
                            Existing Emergency Contacts
                        </h2>

                        {emergencyContacts.length > 0 ? (
                            <div className="space-y-4">
                                {emergencyContacts.map((contact) => (
                                    <div
                                        key={contact.id}
                                        className="rounded border p-4"
                                    >
                                        <div className="flex items-start justify-between">
                                            <div>
                                                <p className="font-semibold">
                                                    {contact.name}
                                                </p>

                                                <p className="text-sm text-muted-foreground">
                                                    {contact.relationship}
                                                </p>
                                            </div>

                                            {contact.is_primary && (
                                                <span className="rounded bg-green-100 px-2 py-1 text-xs font-medium text-green-700">
                                                    Primary
                                                </span>
                                            )}
                                        </div>

                                        <div className="mt-3 space-y-1 text-sm">
                                            <p>
                                                <strong>Phone:</strong>{' '}
                                                {contact.phone}
                                            </p>

                                            <p>
                                                <strong>Email:</strong>{' '}
                                                {contact.email ?? '-'}
                                            </p>

                                            <p>
                                                <strong>Address:</strong>{' '}
                                                {contact.address ?? '-'}
                                            </p>
                                        </div>

                                        <button
                                            type="button"
                                            onClick={() =>
                                                deleteContact(contact.id)
                                            }
                                            className="mt-3 text-sm text-red-600"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-muted-foreground">
                                No emergency contacts added yet.
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}