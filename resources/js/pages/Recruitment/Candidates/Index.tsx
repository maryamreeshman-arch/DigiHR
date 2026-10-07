import { FormEvent, useState } from 'react';
import { Head, router } from '@inertiajs/react';

type Tenant = {
    id: number;
    name: string;
};

type Candidate = {
    id: number;
    tenant_id: number;
    candidate_no: string;
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    date_of_birth: string | null;
    current_company: string | null;
    current_position: string | null;
    source: string;
    status: string;
    tenant?: Tenant;
};

type Props = {
    candidates: Candidate[];
    tenants: Tenant[];
};

export default function Index({
    candidates,
    tenants,
}: Props) {
    const [editingCandidate, setEditingCandidate] =
        useState<Candidate | null>(null);

    const [form, setForm] = useState({
        tenant_id: '',
        candidate_no: '',
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        date_of_birth: '',
        current_company: '',
        current_position: '',
        source: 'Website',
        status: 'New',
    });

    const resetForm = () => {
        setForm({
            tenant_id: '',
            candidate_no: '',
            first_name: '',
            last_name: '',
            email: '',
            phone: '',
            date_of_birth: '',
            current_company: '',
            current_position: '',
            source: 'Website',
            status: 'New',
        });

        setEditingCandidate(null);
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        const data = {
            ...form,
            tenant_id: Number(form.tenant_id),
            date_of_birth: form.date_of_birth || null,
            current_company: form.current_company || null,
            current_position: form.current_position || null,
        };

        if (editingCandidate) {
            router.put(
                `/candidates/${editingCandidate.id}`,
                data,
                {
                    onSuccess: resetForm,
                }
            );
        } else {
            router.post('/candidates', data, {
                onSuccess: resetForm,
            });
        }
    };

    const handleEdit = (candidate: Candidate) => {
        setEditingCandidate(candidate);

        setForm({
            tenant_id: String(candidate.tenant_id),
            candidate_no: candidate.candidate_no,
            first_name: candidate.first_name,
            last_name: candidate.last_name,
            email: candidate.email,
            phone: candidate.phone,
            date_of_birth: candidate.date_of_birth
                ? candidate.date_of_birth.slice(0, 10)
                : '',
            current_company:
                candidate.current_company ?? '',
            current_position:
                candidate.current_position ?? '',
            source: candidate.source,
            status: candidate.status,
        });

        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    const handleDelete = (id: number) => {
        if (!confirm('Are you sure you want to delete this candidate?')) {
            return;
        }

        router.delete(`/candidates/${id}`);
    };

    const inputClass =
        'w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-800 placeholder-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100';

    const selectClass =
        'w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-800 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100';

    const optionClass =
        'bg-white text-slate-800';

    return (
        <>
            <Head title="Candidates" />

            <div className="min-h-screen bg-slate-50 p-6">
                <div className="mx-auto max-w-7xl space-y-6">

                    {/* Header */}
                    <div>
                        <h1 className="text-2xl font-bold text-slate-800">
                            Candidates
                        </h1>

                        <p className="mt-1 text-sm text-slate-500">
                            Manage candidates in the recruitment pipeline.
                        </p>
                    </div>

                    {/* Form */}
                    <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-slate-200">

                        <div className="mb-5">
                            <h2 className="text-lg font-semibold text-slate-800">
                                {editingCandidate
                                    ? 'Edit Candidate'
                                    : 'Add Candidate'}
                            </h2>

                            <p className="mt-1 text-sm text-slate-500">
                                Enter the candidate's basic information.
                            </p>
                        </div>

                        <form
                            onSubmit={handleSubmit}
                            className="grid grid-cols-1 gap-5 md:grid-cols-2"
                        >

                            {/* Tenant */}
                            <div>
                                <label className="mb-1 block text-sm font-medium text-slate-700">
                                    Tenant
                                </label>

                                <select
                                    value={form.tenant_id}
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            tenant_id: e.target.value,
                                        })
                                    }
                                    required
                                    className={selectClass}
                                >
                                    <option
                                        value=""
                                        className={optionClass}
                                    >
                                        Select Tenant
                                    </option>

                                    {tenants.map((tenant) => (
                                        <option
                                            key={tenant.id}
                                            value={tenant.id}
                                            className={optionClass}
                                        >
                                            {tenant.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Candidate Number */}
                            <div>
                                <label className="mb-1 block text-sm font-medium text-slate-700">
                                    Candidate No
                                </label>

                                <input
                                    type="text"
                                    value={form.candidate_no}
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            candidate_no: e.target.value,
                                        })
                                    }
                                    required
                                    placeholder="e.g. CAN-001"
                                    className={inputClass}
                                />
                            </div>

                            {/* First Name */}
                            <div>
                                <label className="mb-1 block text-sm font-medium text-slate-700">
                                    First Name
                                </label>

                                <input
                                    type="text"
                                    value={form.first_name}
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            first_name: e.target.value,
                                        })
                                    }
                                    required
                                    placeholder="Enter first name"
                                    className={inputClass}
                                />
                            </div>

                            {/* Last Name */}
                            <div>
                                <label className="mb-1 block text-sm font-medium text-slate-700">
                                    Last Name
                                </label>

                                <input
                                    type="text"
                                    value={form.last_name}
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            last_name: e.target.value,
                                        })
                                    }
                                    required
                                    placeholder="Enter last name"
                                    className={inputClass}
                                />
                            </div>

                            {/* Email */}
                            <div>
                                <label className="mb-1 block text-sm font-medium text-slate-700">
                                    Email
                                </label>

                                <input
                                    type="email"
                                    value={form.email}
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            email: e.target.value,
                                        })
                                    }
                                    required
                                    placeholder="candidate@example.com"
                                    className={inputClass}
                                />
                            </div>

                            {/* Phone */}
                            <div>
                                <label className="mb-1 block text-sm font-medium text-slate-700">
                                    Phone
                                </label>

                                <input
                                    type="text"
                                    value={form.phone}
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            phone: e.target.value,
                                        })
                                    }
                                    required
                                    placeholder="07XXXXXXXX"
                                    className={inputClass}
                                />
                            </div>

                            {/* Date of Birth */}
                            <div>
                                <label className="mb-1 block text-sm font-medium text-slate-700">
                                    Date of Birth
                                </label>

                                <input
                                    type="date"
                                    value={form.date_of_birth}
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            date_of_birth: e.target.value,
                                        })
                                    }
                                    className={inputClass}
                                />
                            </div>

                            {/* Current Company */}
                            <div>
                                <label className="mb-1 block text-sm font-medium text-slate-700">
                                    Current Company
                                </label>

                                <input
                                    type="text"
                                    value={form.current_company}
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            current_company:
                                                e.target.value,
                                        })
                                    }
                                    placeholder="e.g. ABC Technologies"
                                    className={inputClass}
                                />
                            </div>

                            {/* Current Position */}
                            <div>
                                <label className="mb-1 block text-sm font-medium text-slate-700">
                                    Current Position
                                </label>

                                <input
                                    type="text"
                                    value={form.current_position}
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            current_position:
                                                e.target.value,
                                        })
                                    }
                                    placeholder="e.g. Software Developer"
                                    className={inputClass}
                                />
                            </div>

                            {/* Source */}
                            <div>
                                <label className="mb-1 block text-sm font-medium text-slate-700">
                                    Source
                                </label>

                                <select
                                    value={form.source}
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            source: e.target.value,
                                        })
                                    }
                                    required
                                    className={selectClass}
                                >
                                    <option
                                        value="Website"
                                        className={optionClass}
                                    >
                                        Website
                                    </option>

                                    <option
                                        value="LinkedIn"
                                        className={optionClass}
                                    >
                                        LinkedIn
                                    </option>

                                    <option
                                        value="Referral"
                                        className={optionClass}
                                    >
                                        Referral
                                    </option>

                                    <option
                                        value="Job Portal"
                                        className={optionClass}
                                    >
                                        Job Portal
                                    </option>

                                    <option
                                        value="Agency"
                                        className={optionClass}
                                    >
                                        Recruitment Agency
                                    </option>

                                    <option
                                        value="Other"
                                        className={optionClass}
                                    >
                                        Other
                                    </option>
                                </select>
                            </div>

                            {/* Status */}
                            <div>
                                <label className="mb-1 block text-sm font-medium text-slate-700">
                                    Status
                                </label>

                                <select
                                    value={form.status}
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            status: e.target.value,
                                        })
                                    }
                                    required
                                    className={selectClass}
                                >
                                    <option
                                        value="New"
                                        className={optionClass}
                                    >
                                        New
                                    </option>

                                    <option
                                        value="Screening"
                                        className={optionClass}
                                    >
                                        Screening
                                    </option>

                                    <option
                                        value="Shortlisted"
                                        className={optionClass}
                                    >
                                        Shortlisted
                                    </option>

                                    <option
                                        value="Rejected"
                                        className={optionClass}
                                    >
                                        Rejected
                                    </option>

                                    <option
                                        value="Hired"
                                        className={optionClass}
                                    >
                                        Hired
                                    </option>
                                </select>
                            </div>

                            {/* Buttons */}
                            <div className="flex gap-3 md:col-span-2">

                                <button
                                    type="submit"
                                    className="rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700"
                                >
                                    {editingCandidate
                                        ? 'Update Candidate'
                                        : 'Add Candidate'}
                                </button>

                                {editingCandidate && (
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

                    {/* Candidates Table */}
                    <div className="overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-slate-200">

                        <div className="border-b border-slate-200 px-6 py-4">
                            <h2 className="text-lg font-semibold text-slate-800">
                                Candidate List
                            </h2>

                            <p className="mt-1 text-sm text-slate-500">
                                View and manage registered candidates.
                            </p>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-slate-200">

                                <thead className="bg-slate-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                                            Candidate No
                                        </th>

                                        <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                                            Name
                                        </th>

                                        <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                                            Email
                                        </th>

                                        <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                                            Phone
                                        </th>

                                        <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                                            Source
                                        </th>

                                        <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                                            Status
                                        </th>

                                        <th className="px-6 py-3 text-right text-xs font-semibold uppercase tracking-wider text-slate-500">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>

                                <tbody className="divide-y divide-slate-200 bg-white">

                                    {candidates.length === 0 ? (
                                        <tr>
                                            <td
                                                colSpan={7}
                                                className="px-6 py-10 text-center text-sm text-slate-500"
                                            >
                                                No candidates found.
                                            </td>
                                        </tr>
                                    ) : (
                                        candidates.map((candidate) => (
                                            <tr
                                                key={candidate.id}
                                                className="hover:bg-slate-50"
                                            >

                                                {/* Candidate No */}
                                                <td className="px-6 py-4">
                                                    <span className="font-medium text-slate-800">
                                                        {
                                                            candidate.candidate_no
                                                        }
                                                    </span>
                                                </td>

                                                {/* Name */}
                                                <td className="px-6 py-4">
                                                    <div className="font-medium text-slate-800">
                                                        {
                                                            candidate.first_name
                                                        }{' '}
                                                        {
                                                            candidate.last_name
                                                        }
                                                    </div>

                                                    {candidate.current_position && (
                                                        <div className="mt-1 text-xs text-slate-500">
                                                            {
                                                                candidate.current_position
                                                            }
                                                        </div>
                                                    )}
                                                </td>

                                                {/* Email */}
                                                <td className="px-6 py-4 text-sm text-slate-600">
                                                    {candidate.email}
                                                </td>

                                                {/* Phone */}
                                                <td className="px-6 py-4 text-sm text-slate-600">
                                                    {candidate.phone}
                                                </td>

                                                {/* Source */}
                                                <td className="px-6 py-4 text-sm text-slate-600">
                                                    {candidate.source}
                                                </td>

                                                {/* Status */}
                                                <td className="px-6 py-4">
                                                    <span
                                                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                                                            candidate.status ===
                                                            'Hired'
                                                                ? 'bg-green-100 text-green-700'
                                                                : candidate.status ===
                                                                    'Rejected'
                                                                  ? 'bg-red-100 text-red-700'
                                                                  : candidate.status ===
                                                                      'Shortlisted'
                                                                    ? 'bg-purple-100 text-purple-700'
                                                                    : 'bg-indigo-100 text-indigo-700'
                                                        }`}
                                                    >
                                                        {candidate.status}
                                                    </span>
                                                </td>

                                                {/* Actions */}
                                                <td className="px-6 py-4 text-right">
                                                    <div className="flex justify-end gap-2">

                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                handleEdit(
                                                                    candidate
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
                                                                    candidate.id
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