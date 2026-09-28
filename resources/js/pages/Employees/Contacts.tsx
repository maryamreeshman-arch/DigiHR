import { Head, Link, useForm } from '@inertiajs/react';

type Employee = {
    id: number;
    employee_no: string;
};

type Contact = {
    id: number;
    contact_type: string;
    contact_value: string;
    is_primary: boolean;
    verified_at: string | null;
};

type Props = {
    employee: Employee;
    contacts: Contact[];
};

export default function Contacts({
    employee,
    contacts,
}: Props) {
    const { data, setData, post, processing, errors, reset } = useForm({
        contact_type: 'mobile',
        contact_value: '',
        is_primary: false,
        verified_at: '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();

        post(`/employees/${employee.id}/contacts`, {
            onSuccess: () => {
                reset();
                setData('contact_type', 'mobile');
                setData('is_primary', false);
            },
        });
    };

    return (
        <>
            <Head title="Employee Contacts" />

            <div className="p-6">
                <div className="mb-6">
                    <Link
                        href="/employees"
                        className="text-sm text-blue-600"
                    >
                        ← Back to Employees
                    </Link>

                    <h1 className="mt-2 text-2xl font-bold">
                        Employee Contacts
                    </h1>

                    <p className="text-muted-foreground">
                        Employee: {employee.employee_no}
                    </p>
                </div>

                <div className="grid gap-6 lg:grid-cols-2">
                    {/* Add Contact */}
                    <form
                        onSubmit={submit}
                        className="space-y-5 rounded-lg border p-6"
                    >
                        <h2 className="text-lg font-semibold">
                            Add Contact
                        </h2>

                        {/* Contact Type */}
                        <div>
                            <label className="mb-1 block font-medium">
                                Contact Type
                            </label>

                            <select
                                value={data.contact_type}
                                onChange={(e) =>
                                    setData(
                                        'contact_type',
                                        e.target.value,
                                    )
                                }
                                className="w-full rounded border p-2"
                            >
                                <option value="mobile">
                                    Mobile
                                </option>
                                <option value="personal_email">
                                    Personal Email
                                </option>
                                <option value="work_email">
                                    Work Email
                                </option>
                            </select>

                            {errors.contact_type && (
                                <p className="text-sm text-red-600">
                                    {errors.contact_type}
                                </p>
                            )}
                        </div>

                        {/* Contact Value */}
                        <div>
                            <label className="mb-1 block font-medium">
                                Contact Value
                            </label>

                            <input
                                type="text"
                                value={data.contact_value}
                                onChange={(e) =>
                                    setData(
                                        'contact_value',
                                        e.target.value,
                                    )
                                }
                                placeholder="Enter mobile number or email"
                                className="w-full rounded border p-2"
                            />

                            {errors.contact_value && (
                                <p className="text-sm text-red-600">
                                    {errors.contact_value}
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
                                Primary Contact
                            </label>
                        </div>

                        {/* Verified At */}
                        <div>
                            <label className="mb-1 block font-medium">
                                Verified At
                            </label>

                            <input
                                type="datetime-local"
                                value={data.verified_at}
                                onChange={(e) =>
                                    setData(
                                        'verified_at',
                                        e.target.value,
                                    )
                                }
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
                                : 'Add Contact'}
                        </button>
                    </form>

                    {/* Existing Contacts */}
                    <div className="rounded-lg border p-6">
                        <h2 className="mb-4 text-lg font-semibold">
                            Existing Contacts
                        </h2>

                        {contacts.length > 0 ? (
                            <div className="space-y-3">
                                {contacts.map((contact) => (
                                    <div
                                        key={contact.id}
                                        className="rounded border p-4"
                                    >
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="font-medium">
                                                    {contact.contact_type}
                                                </p>

                                                <p className="text-sm text-muted-foreground">
                                                    {
                                                        contact.contact_value
                                                    }
                                                </p>
                                            </div>

                                            {contact.is_primary && (
                                                <span className="rounded bg-green-100 px-2 py-1 text-xs font-medium text-green-700">
                                                    Primary
                                                </span>
                                            )}
                                        </div>

                                        <p className="mt-2 text-xs text-muted-foreground">
                                            {contact.verified_at
                                                ? `Verified: ${contact.verified_at}`
                                                : 'Not verified'}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-muted-foreground">
                                No contacts added yet.
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}