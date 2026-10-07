import { FormEvent, useState } from 'react';
import { Head, router } from '@inertiajs/react';

type Candidate = {
    id: number;
    candidate_no: string;
    first_name: string;
    last_name: string;
};

type CandidateContact = {
    id: number;
    candidate_id: number;
    contact_type: string;
    contact_value: string;
    is_primary: boolean;
    candidate?: Candidate;
};

type Props = {
    contacts: CandidateContact[];
    candidates: Candidate[];
};

export default function Index({
    contacts,
    candidates,
}: Props) {
    const [editingContact, setEditingContact] =
        useState<CandidateContact | null>(null);

    const [form, setForm] = useState({
        candidate_id: '',
        contact_type: 'Personal Email',
        contact_value: '',
        is_primary: false,
    });

    const resetForm = () => {
        setForm({
            candidate_id: '',
            contact_type: 'Personal Email',
            contact_value: '',
            is_primary: false,
        });

        setEditingContact(null);
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        const data = {
            ...form,
            candidate_id: Number(form.candidate_id),
        };

        if (editingContact) {
            router.put(
                `/candidate-contacts/${editingContact.id}`,
                data,
                {
                    onSuccess: resetForm,
                }
            );
        } else {
            router.post('/candidate-contacts', data, {
                onSuccess: resetForm,
            });
        }
    };

    const handleEdit = (contact: CandidateContact) => {
        setEditingContact(contact);

        setForm({
            candidate_id: String(contact.candidate_id),
            contact_type: contact.contact_type,
            contact_value: contact.contact_value,
            is_primary: contact.is_primary,
        });

        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    const handleDelete = (id: number) => {
        if (
            !confirm(
                'Are you sure you want to delete this contact?'
            )
        ) {
            return;
        }

        router.delete(`/candidate-contacts/${id}`);
    };

    const inputClass =
        'w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-800 placeholder-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100';

    const selectClass =
        'w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-800 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100';

    const optionClass =
        'bg-white text-slate-800';

    return (
        <>
            <Head title="Candidate Contacts" />

            <div className="min-h-screen bg-slate-50 p-6">
                <div className="mx-auto max-w-7xl space-y-6">

                    {/* Header */}
                    <div>
                        <h1 className="text-2xl font-bold text-slate-800">
                            Candidate Contacts
                        </h1>

                        <p className="mt-1 text-sm text-slate-500">
                            Manage additional contact information for candidates.
                        </p>
                    </div>

                    {/* Form */}
                    <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-slate-200">

                        <div className="mb-5">
                            <h2 className="text-lg font-semibold text-slate-800">
                                {editingContact
                                    ? 'Edit Candidate Contact'
                                    : 'Add Candidate Contact'}
                            </h2>

                            <p className="mt-1 text-sm text-slate-500">
                                Add email, phone, WhatsApp, LinkedIn or other contact details.
                            </p>
                        </div>

                        <form
                            onSubmit={handleSubmit}
                            className="grid grid-cols-1 gap-5 md:grid-cols-2"
                        >

                            {/* Candidate */}
                            <div>
                                <label className="mb-1 block text-sm font-medium text-slate-700">
                                    Candidate
                                </label>

                                <select
                                    value={form.candidate_id}
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            candidate_id: e.target.value,
                                        })
                                    }
                                    required
                                    className={selectClass}
                                >
                                    <option
                                        value=""
                                        className={optionClass}
                                    >
                                        Select Candidate
                                    </option>

                                    {candidates.map((candidate) => (
                                        <option
                                            key={candidate.id}
                                            value={candidate.id}
                                            className={optionClass}
                                        >
                                            {candidate.candidate_no} -{' '}
                                            {candidate.first_name}{' '}
                                            {candidate.last_name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Contact Type */}
                            <div>
                                <label className="mb-1 block text-sm font-medium text-slate-700">
                                    Contact Type
                                </label>

                                <select
                                    value={form.contact_type}
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            contact_type: e.target.value,
                                        })
                                    }
                                    required
                                    className={selectClass}
                                >
                                    <option
                                        value="Personal Email"
                                        className={optionClass}
                                    >
                                        Personal Email
                                    </option>

                                    <option
                                        value="Work Email"
                                        className={optionClass}
                                    >
                                        Work Email
                                    </option>

                                    <option
                                        value="Phone"
                                        className={optionClass}
                                    >
                                        Phone
                                    </option>

                                    <option
                                        value="WhatsApp"
                                        className={optionClass}
                                    >
                                        WhatsApp
                                    </option>

                                    <option
                                        value="LinkedIn"
                                        className={optionClass}
                                    >
                                        LinkedIn
                                    </option>

                                    <option
                                        value="Other"
                                        className={optionClass}
                                    >
                                        Other
                                    </option>
                                </select>
                            </div>

                            {/* Contact Value */}
                            <div className="md:col-span-2">
                                <label className="mb-1 block text-sm font-medium text-slate-700">
                                    Contact Value
                                </label>

                                <input
                                    type="text"
                                    value={form.contact_value}
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            contact_value: e.target.value,
                                        })
                                    }
                                    required
                                    placeholder="Enter email, phone number, URL, etc."
                                    className={inputClass}
                                />
                            </div>

                            {/* Primary */}
                            <div className="md:col-span-2">
                                <label className="flex cursor-pointer items-center gap-3">
                                    <input
                                        type="checkbox"
                                        checked={form.is_primary}
                                        onChange={(e) =>
                                            setForm({
                                                ...form,
                                                is_primary: e.target.checked,
                                            })
                                        }
                                        className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                                    />

                                    <span className="text-sm font-medium text-slate-700">
                                        Mark as Primary Contact
                                    </span>
                                </label>
                            </div>

                            {/* Buttons */}
                            <div className="flex gap-3 md:col-span-2">

                                <button
                                    type="submit"
                                    className="rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700"
                                >
                                    {editingContact
                                        ? 'Update Contact'
                                        : 'Add Contact'}
                                </button>

                                {editingContact && (
                                    <button
                                        type="button"
                                        onClick={resetForm}
                                        className="rounded-lg border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                                    >
                                        Cancel
                                    </button>
                                )}

                            </div>
                        </form>
                    </div>

                    {/* Contact List */}
                    <div className="overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-slate-200">

                        <div className="border-b border-slate-200 px-6 py-4">
                            <h2 className="text-lg font-semibold text-slate-800">
                                Contact List
                            </h2>

                            <p className="mt-1 text-sm text-slate-500">
                                View and manage candidate contact information.
                            </p>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-slate-200">

                                <thead className="bg-slate-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                                            Candidate
                                        </th>

                                        <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                                            Contact Type
                                        </th>

                                        <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                                            Contact
                                        </th>

                                        <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                                            Primary
                                        </th>

                                        <th className="px-6 py-3 text-right text-xs font-semibold uppercase tracking-wider text-slate-500">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>

                                <tbody className="divide-y divide-slate-200 bg-white">

                                    {contacts.length === 0 ? (
                                        <tr>
                                            <td
                                                colSpan={5}
                                                className="px-6 py-10 text-center text-sm text-slate-500"
                                            >
                                                No candidate contacts found.
                                            </td>
                                        </tr>
                                    ) : (
                                        contacts.map((contact) => (
                                            <tr
                                                key={contact.id}
                                                className="hover:bg-slate-50"
                                            >

                                                {/* Candidate */}
                                                <td className="px-6 py-4">
                                                    <div className="font-medium text-slate-800">
                                                        {contact.candidate
                                                            ?.first_name}{' '}
                                                        {contact.candidate
                                                            ?.last_name}
                                                    </div>

                                                    <div className="mt-1 text-xs text-slate-500">
                                                        {
                                                            contact.candidate
                                                                ?.candidate_no
                                                        }
                                                    </div>
                                                </td>

                                                {/* Contact Type */}
                                                <td className="px-6 py-4 text-sm text-slate-600">
                                                    {contact.contact_type}
                                                </td>

                                                {/* Contact Value */}
                                                <td className="px-6 py-4 text-sm text-slate-600">
                                                    {contact.contact_value}
                                                </td>

                                                {/* Primary */}
                                                <td className="px-6 py-4">
                                                    {contact.is_primary ? (
                                                        <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                                                            Primary
                                                        </span>
                                                    ) : (
                                                        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                                                            No
                                                        </span>
                                                    )}
                                                </td>

                                                {/* Actions */}
                                                <td className="px-6 py-4 text-right">
                                                    <div className="flex justify-end gap-2">

                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                handleEdit(
                                                                    contact
                                                                )
                                                            }
                                                            className="rounded-lg bg-amber-100 px-3 py-1.5 text-xs font-semibold text-amber-700 transition hover:bg-amber-200"
                                                        >
                                                            Edit
                                                        </button>

                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                handleDelete(
                                                                    contact.id
                                                                )
                                                            }
                                                            className="rounded-lg bg-red-100 px-3 py-1.5 text-xs font-semibold text-red-700 transition hover:bg-red-200"
                                                        >
                                                            Delete
                                                        </button>

                                                    </div>
                                                </td>

                                            </tr>
                                        ))
                                    )}

                                </tbody>
                            </table>
                        </div>
                    </div>

                </div>
            </div>
        </>
    );
}