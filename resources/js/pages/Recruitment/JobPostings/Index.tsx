import { FormEvent, useState } from 'react';
import { Head, router } from '@inertiajs/react';

type Tenant = {
    id: number;
    name: string;
};

type JobRequisition = {
    id: number;
    title?: string;
    number_of_positions: number;
    reason: string;
};

type EmploymentType = {
    id: number;
    name: string;
};

type JobPosting = {
    id: number;
    tenant_id: number;
    job_requisition_id: number;
    title: string;
    description: string;
    requirements: string;
    location: string;
    employment_type_id: number;
    published_at: string | null;
    closing_at: string | null;
    status: string;
    tenant?: Tenant;
    job_requisition?: JobRequisition;
    employment_type?: EmploymentType;
};

type Props = {
    postings: JobPosting[];
    tenants: Tenant[];
    jobRequisitions: JobRequisition[];
    employmentTypes: EmploymentType[];
};

export default function Index({
    postings,
    tenants,
    jobRequisitions,
    employmentTypes,
}: Props) {
    const [editingPosting, setEditingPosting] =
        useState<JobPosting | null>(null);

    const [form, setForm] = useState({
        tenant_id: '',
        job_requisition_id: '',
        title: '',
        description: '',
        requirements: '',
        location: '',
        employment_type_id: '',
        published_at: '',
        closing_at: '',
        status: 'Draft',
    });

    const resetForm = () => {
        setForm({
            tenant_id: '',
            job_requisition_id: '',
            title: '',
            description: '',
            requirements: '',
            location: '',
            employment_type_id: '',
            published_at: '',
            closing_at: '',
            status: 'Draft',
        });

        setEditingPosting(null);
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        const data = {
            ...form,
            tenant_id: Number(form.tenant_id),
            job_requisition_id: Number(form.job_requisition_id),
            employment_type_id: Number(form.employment_type_id),
            published_at: form.published_at || null,
            closing_at: form.closing_at || null,
        };

        if (editingPosting) {
            router.put(
                `/job-postings/${editingPosting.id}`,
                data,
                {
                    onSuccess: resetForm,
                }
            );
        } else {
            router.post('/job-postings', data, {
                onSuccess: resetForm,
            });
        }
    };

    const handleEdit = (posting: JobPosting) => {
        setEditingPosting(posting);

        setForm({
            tenant_id: String(posting.tenant_id),
            job_requisition_id: String(posting.job_requisition_id),
            title: posting.title,
            description: posting.description,
            requirements: posting.requirements,
            location: posting.location,
            employment_type_id: String(posting.employment_type_id),
            published_at: posting.published_at
                ? posting.published_at.slice(0, 16)
                : '',
            closing_at: posting.closing_at
                ? posting.closing_at.slice(0, 16)
                : '',
            status: posting.status,
        });

        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    const handleDelete = (id: number) => {
        if (!confirm('Are you sure you want to delete this job posting?')) {
            return;
        }

        router.delete(`/job-postings/${id}`);
    };

    const selectClass =
        'w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-800 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100';

    const optionClass =
        'bg-white text-slate-800';

    const inputClass =
        'w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-800 placeholder-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100';

    return (
        <>
            <Head title="Job Postings" />

            <div className="min-h-screen bg-slate-50 p-6">
                <div className="mx-auto max-w-7xl space-y-6">

                    {/* Header */}
                    <div>
                        <h1 className="text-2xl font-bold text-slate-800">
                            Job Postings
                        </h1>

                        <p className="mt-1 text-sm text-slate-500">
                            Create and manage recruitment job postings.
                        </p>
                    </div>

                    {/* Form */}
                    <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-slate-200">

                        <div className="mb-5">
                            <h2 className="text-lg font-semibold text-slate-800">
                                {editingPosting
                                    ? 'Edit Job Posting'
                                    : 'Create Job Posting'}
                            </h2>

                            <p className="mt-1 text-sm text-slate-500">
                                Enter the details of the job vacancy.
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

                            {/* Job Requisition */}
                            <div>
                                <label className="mb-1 block text-sm font-medium text-slate-700">
                                    Job Requisition
                                </label>

                                <select
                                    value={form.job_requisition_id}
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            job_requisition_id:
                                                e.target.value,
                                        })
                                    }
                                    required
                                    className={selectClass}
                                >
                                    <option
                                        value=""
                                        className={optionClass}
                                    >
                                        Select Requisition
                                    </option>

                                    {jobRequisitions.map((requisition) => (
                                        <option
                                            key={requisition.id}
                                            value={requisition.id}
                                            className={optionClass}
                                        >
                                            Requisition #{requisition.id}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Job Title */}
                            <div>
                                <label className="mb-1 block text-sm font-medium text-slate-700">
                                    Job Title
                                </label>

                                <input
                                    type="text"
                                    value={form.title}
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            title: e.target.value,
                                        })
                                    }
                                    required
                                    placeholder="e.g. Junior Software Engineer"
                                    className={inputClass}
                                />
                            </div>

                            {/* Location */}
                            <div>
                                <label className="mb-1 block text-sm font-medium text-slate-700">
                                    Location
                                </label>

                                <input
                                    type="text"
                                    value={form.location}
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            location: e.target.value,
                                        })
                                    }
                                    required
                                    placeholder="e.g. Colombo"
                                    className={inputClass}
                                />
                            </div>

                            {/* Employment Type */}
                            <div>
                                <label className="mb-1 block text-sm font-medium text-slate-700">
                                    Employment Type
                                </label>

                                <select
                                    value={form.employment_type_id}
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            employment_type_id:
                                                e.target.value,
                                        })
                                    }
                                    required
                                    className={selectClass}
                                >
                                    <option
                                        value=""
                                        className={optionClass}
                                    >
                                        Select Employment Type
                                    </option>

                                    {employmentTypes.map((type) => (
                                        <option
                                            key={type.id}
                                            value={type.id}
                                            className={optionClass}
                                        >
                                            {type.name}
                                        </option>
                                    ))}
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
                                        value="Draft"
                                        className={optionClass}
                                    >
                                        Draft
                                    </option>

                                    <option
                                        value="Published"
                                        className={optionClass}
                                    >
                                        Published
                                    </option>

                                    <option
                                        value="Closed"
                                        className={optionClass}
                                    >
                                        Closed
                                    </option>
                                </select>
                            </div>

                            {/* Published At */}
                            <div>
                                <label className="mb-1 block text-sm font-medium text-slate-700">
                                    Published At
                                </label>

                                <input
                                    type="datetime-local"
                                    value={form.published_at}
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            published_at: e.target.value,
                                        })
                                    }
                                    className={inputClass}
                                />
                            </div>

                            {/* Closing At */}
                            <div>
                                <label className="mb-1 block text-sm font-medium text-slate-700">
                                    Closing At
                                </label>

                                <input
                                    type="datetime-local"
                                    value={form.closing_at}
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            closing_at: e.target.value,
                                        })
                                    }
                                    className={inputClass}
                                />
                            </div>

                            {/* Description */}
                            <div className="md:col-span-2">
                                <label className="mb-1 block text-sm font-medium text-slate-700">
                                    Description
                                </label>

                                <textarea
                                    value={form.description}
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            description: e.target.value,
                                        })
                                    }
                                    required
                                    rows={4}
                                    placeholder="Describe the job role..."
                                    className={inputClass}
                                />
                            </div>

                            {/* Requirements */}
                            <div className="md:col-span-2">
                                <label className="mb-1 block text-sm font-medium text-slate-700">
                                    Requirements
                                </label>

                                <textarea
                                    value={form.requirements}
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            requirements: e.target.value,
                                        })
                                    }
                                    required
                                    rows={4}
                                    placeholder="Enter required skills, qualifications and experience..."
                                    className={inputClass}
                                />
                            </div>

                            {/* Buttons */}
                            <div className="flex gap-3 md:col-span-2">
                                <button
                                    type="submit"
                                    className="rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700"
                                >
                                    {editingPosting
                                        ? 'Update Job Posting'
                                        : 'Create Job Posting'}
                                </button>

                                {editingPosting && (
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

                    {/* Existing Job Postings */}
                    <div className="overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-slate-200">

                        <div className="border-b border-slate-200 px-6 py-4">
                            <h2 className="text-lg font-semibold text-slate-800">
                                Existing Job Postings
                            </h2>

                            <p className="mt-1 text-sm text-slate-500">
                                Manage created job postings.
                            </p>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-slate-200">

                                <thead className="bg-slate-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                                            Title
                                        </th>

                                        <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                                            Requisition
                                        </th>

                                        <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                                            Location
                                        </th>

                                        <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                                            Employment Type
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

                                    {postings.length === 0 ? (
                                        <tr>
                                            <td
                                                colSpan={6}
                                                className="px-6 py-10 text-center text-sm text-slate-500"
                                            >
                                                No job postings found.
                                            </td>
                                        </tr>
                                    ) : (
                                        postings.map((posting) => (
                                            <tr
                                                key={posting.id}
                                                className="hover:bg-slate-50"
                                            >

                                                {/* Title */}
                                                <td className="px-6 py-4">
                                                    <div className="font-medium text-slate-800">
                                                        {posting.title}
                                                    </div>
                                                </td>

                                                {/* Requisition */}
                                                <td className="px-6 py-4 text-sm text-slate-600">
                                                    #
                                                    {
                                                        posting.job_requisition_id
                                                    }
                                                </td>

                                                {/* Location */}
                                                <td className="px-6 py-4 text-sm text-slate-600">
                                                    {posting.location}
                                                </td>

                                                {/* Employment Type */}
                                                <td className="px-6 py-4 text-sm text-slate-600">
                                                    {
                                                        posting
                                                            .employment_type
                                                            ?.name
                                                    }
                                                </td>

                                                {/* Status */}
                                                <td className="px-6 py-4">
                                                    <span
                                                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                                                            posting.status ===
                                                            'Published'
                                                                ? 'bg-green-100 text-green-700'
                                                                : posting.status ===
                                                                    'Closed'
                                                                  ? 'bg-red-100 text-red-700'
                                                                  : 'bg-indigo-100 text-indigo-700'
                                                        }`}
                                                    >
                                                        {posting.status}
                                                    </span>
                                                </td>

                                                {/* Actions */}
                                                <td className="px-6 py-4 text-right">
                                                    <div className="flex justify-end gap-2">

                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                handleEdit(
                                                                    posting
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
                                                                    posting.id
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