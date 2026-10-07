import { FormEvent, useState } from 'react';
import { Head, router } from '@inertiajs/react';

type Candidate = {
    id: number;
    candidate_no: string;
    first_name: string;
    last_name: string;
};

type JobPosting = {
    id: number;
    title: string;
    location: string;
    status: string;
};

type Application = {
    id: number;
    candidate_id: number;
    job_posting_id: number;
    applied_at: string;
    status: string;
    rating: string | number | null;
    notes: string | null;
    candidate?: Candidate;
    jobPosting?: JobPosting;
};

type Props = {
    applications: Application[];
    candidates: Candidate[];
    jobPostings: JobPosting[];
};

export default function Index({
    applications,
    candidates,
    jobPostings,
}: Props) {
    const [editingApplication, setEditingApplication] =
        useState<Application | null>(null);

    const [form, setForm] = useState({
        candidate_id: '',
        job_posting_id: '',
        applied_at: '',
        status: 'Applied',
        rating: '',
        notes: '',
    });

    const resetForm = () => {
        setForm({
            candidate_id: '',
            job_posting_id: '',
            applied_at: '',
            status: 'Applied',
            rating: '',
            notes: '',
        });

        setEditingApplication(null);
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        const data = {
            ...form,
            candidate_id: Number(form.candidate_id),
            job_posting_id: Number(form.job_posting_id),
            rating: form.rating === ''
                ? null
                : Number(form.rating),
            notes: form.notes || null,
        };

        if (editingApplication) {
            router.put(
                `/applications/${editingApplication.id}`,
                data,
                {
                    onSuccess: resetForm,
                }
            );
        } else {
            router.post('/applications', data, {
                onSuccess: resetForm,
            });
        }
    };

    const handleEdit = (application: Application) => {
        setEditingApplication(application);

        setForm({
            candidate_id: String(application.candidate_id),
            job_posting_id: String(application.job_posting_id),
            applied_at: application.applied_at
                ? application.applied_at.slice(0, 16)
                : '',
            status: application.status,
            rating:
                application.rating !== null
                    ? String(application.rating)
                    : '',
            notes: application.notes ?? '',
        });

        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    const handleDelete = (id: number) => {
        if (
            !confirm(
                'Are you sure you want to delete this application?'
            )
        ) {
            return;
        }

        router.delete(`/applications/${id}`);
    };

    const inputClass =
        'w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-800 placeholder-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100';

    const selectClass =
        'w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-800 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100';

    const optionClass =
        'bg-white text-slate-800';

    return (
        <>
            <Head title="Applications" />

            <div className="min-h-screen bg-slate-50 p-6">
                <div className="mx-auto max-w-7xl space-y-6">

                    {/* Header */}
                    <div>
                        <h1 className="text-2xl font-bold text-slate-800">
                            Applications
                        </h1>

                        <p className="mt-1 text-sm text-slate-500">
                            Manage candidate applications for job postings.
                        </p>
                    </div>

                    {/* Form */}
                    <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-slate-200">

                        <div className="mb-5">
                            <h2 className="text-lg font-semibold text-slate-800">
                                {editingApplication
                                    ? 'Edit Application'
                                    : 'Add Application'}
                            </h2>

                            <p className="mt-1 text-sm text-slate-500">
                                Connect a candidate with a job posting.
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

                            {/* Job Posting */}
                            <div>
                                <label className="mb-1 block text-sm font-medium text-slate-700">
                                    Job Posting
                                </label>

                                <select
                                    value={form.job_posting_id}
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            job_posting_id: e.target.value,
                                        })
                                    }
                                    required
                                    className={selectClass}
                                >
                                    <option
                                        value=""
                                        className={optionClass}
                                    >
                                        Select Job Posting
                                    </option>

                                    {jobPostings.map((posting) => (
                                        <option
                                            key={posting.id}
                                            value={posting.id}
                                            className={optionClass}
                                        >
                                            {posting.title} -{' '}
                                            {posting.location}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Applied At */}
                            <div>
                                <label className="mb-1 block text-sm font-medium text-slate-700">
                                    Applied At
                                </label>

                                <input
                                    type="datetime-local"
                                    value={form.applied_at}
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            applied_at: e.target.value,
                                        })
                                    }
                                    required
                                    className={inputClass}
                                />
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
                                        value="Applied"
                                        className={optionClass}
                                    >
                                        Applied
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
                                        value="Interview"
                                        className={optionClass}
                                    >
                                        Interview
                                    </option>

                                    <option
                                        value="Selected"
                                        className={optionClass}
                                    >
                                        Selected
                                    </option>

                                    <option
                                        value="Rejected"
                                        className={optionClass}
                                    >
                                        Rejected
                                    </option>

                                    <option
                                        value="Withdrawn"
                                        className={optionClass}
                                    >
                                        Withdrawn
                                    </option>
                                </select>
                            </div>

                            {/* Rating */}
                            <div>
                                <label className="mb-1 block text-sm font-medium text-slate-700">
                                    Rating
                                </label>

                                <input
                                    type="number"
                                    min="0"
                                    max="100"
                                    step="0.01"
                                    value={form.rating}
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            rating: e.target.value,
                                        })
                                    }
                                    placeholder="0 - 100"
                                    className={inputClass}
                                />
                            </div>

                            {/* Notes */}
                            <div>
                                <label className="mb-1 block text-sm font-medium text-slate-700">
                                    Notes
                                </label>

                                <input
                                    type="text"
                                    value={form.notes}
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            notes: e.target.value,
                                        })
                                    }
                                    placeholder="Application notes"
                                    className={inputClass}
                                />
                            </div>

                            {/* Buttons */}
                            <div className="flex gap-3 md:col-span-2">

                                <button
                                    type="submit"
                                    className="rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700"
                                >
                                    {editingApplication
                                        ? 'Update Application'
                                        : 'Add Application'}
                                </button>

                                {editingApplication && (
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

                    {/* Applications List */}
                    <div className="overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-slate-200">

                        <div className="border-b border-slate-200 px-6 py-4">
                            <h2 className="text-lg font-semibold text-slate-800">
                                Application List
                            </h2>

                            <p className="mt-1 text-sm text-slate-500">
                                View and manage candidate applications.
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
                                            Job Posting
                                        </th>

                                        <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                                            Applied At
                                        </th>

                                        <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                                            Status
                                        </th>

                                        <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                                            Rating
                                        </th>

                                        <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                                            Notes
                                        </th>

                                        <th className="px-6 py-3 text-right text-xs font-semibold uppercase tracking-wider text-slate-500">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>

                                <tbody className="divide-y divide-slate-200 bg-white">

                                    {applications.length === 0 ? (
                                        <tr>
                                            <td
                                                colSpan={7}
                                                className="px-6 py-10 text-center text-sm text-slate-500"
                                            >
                                                No applications found.
                                            </td>
                                        </tr>
                                    ) : (
                                        applications.map((application) => (
                                            <tr
                                                key={application.id}
                                                className="hover:bg-slate-50"
                                            >

                                                {/* Candidate */}
                                                <td className="px-6 py-4">
                                                    <div className="font-medium text-slate-800">
                                                        {
                                                            application
                                                                .candidate
                                                                ?.first_name
                                                        }{' '}
                                                        {
                                                            application
                                                                .candidate
                                                                ?.last_name
                                                        }
                                                    </div>

                                                    <div className="mt-1 text-xs text-slate-500">
                                                        {
                                                            application
                                                                .candidate
                                                                ?.candidate_no
                                                        }
                                                    </div>
                                                </td>

                                                {/* Job Posting */}
                                                <td className="px-6 py-4">
                                                    <div className="text-sm font-medium text-slate-700">
                                                        {
                                                            application
                                                                .jobPosting
                                                                ?.title
                                                        }
                                                    </div>

                                                    <div className="mt-1 text-xs text-slate-500">
                                                        {
                                                            application
                                                                .jobPosting
                                                                ?.location
                                                        }
                                                    </div>
                                                </td>

                                                {/* Applied At */}
                                                <td className="px-6 py-4 text-sm text-slate-600">
                                                    {application.applied_at
                                                        ? application.applied_at.replace(
                                                              'T',
                                                              ' '
                                                          ).slice(0, 16)
                                                        : '—'}
                                                </td>

                                                {/* Status */}
                                                <td className="px-6 py-4">
                                                    <span className="rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold text-indigo-700">
                                                        {application.status}
                                                    </span>
                                                </td>

                                                {/* Rating */}
                                                <td className="px-6 py-4 text-sm text-slate-600">
                                                    {application.rating !==
                                                    null
                                                        ? application.rating
                                                        : '—'}
                                                </td>

                                                {/* Notes */}
                                                <td className="max-w-xs px-6 py-4 text-sm text-slate-600">
                                                    <div className="line-clamp-2">
                                                        {application.notes ||
                                                            '—'}
                                                    </div>
                                                </td>

                                                {/* Actions */}
                                                <td className="px-6 py-4 text-right">
                                                    <div className="flex justify-end gap-2">

                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                handleEdit(
                                                                    application
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
                                                                    application.id
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