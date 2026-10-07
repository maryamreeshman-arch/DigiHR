import { Head, router } from '@inertiajs/react';
import { FormEvent, useState } from 'react';

type Candidate = {
    id: number;
    first_name: string;
    last_name: string;
    candidate_no: string;
};

type JobPosting = {
    id: number;
    title: string;
};

type Application = {
    id: number;
    candidate?: Candidate;
    jobPosting?: JobPosting;
};

type Position = {
    id: number;
    title: string;
    code?: string;
};

type JobOffer = {
    id: number;
    application_id: number;
    position_id: number;
    salary: string | number;
    joining_date: string;
    offer_date: string;
    expiry_date: string | null;
    status: string;
    document_path: string | null;
    application?: Application;
    position?: Position;
};

type Props = {
    offers: JobOffer[];
    applications: Application[];
    positions: Position[];
};

export default function Index({
    offers,
    applications,
    positions,
}: Props) {
    const [editingId, setEditingId] = useState<number | null>(null);

    const [form, setForm] = useState({
        application_id: '',
        position_id: '',
        salary: '',
        joining_date: '',
        offer_date: '',
        expiry_date: '',
        status: '',
        document_path: '',
    });

    const resetForm = () => {
        setEditingId(null);

        setForm({
            application_id: '',
            position_id: '',
            salary: '',
            joining_date: '',
            offer_date: '',
            expiry_date: '',
            status: '',
            document_path: '',
        });
    };

    const submit = (e: FormEvent) => {
        e.preventDefault();

        if (editingId) {
            router.put(
                `/job-offers/${editingId}`,
                form,
                {
                    onSuccess: () => {
                        resetForm();
                    },
                }
            );

            return;
        }

        router.post(
            '/job-offers',
            form,
            {
                onSuccess: () => {
                    resetForm();
                },
            }
        );
    };

    const editOffer = (offer: JobOffer) => {
        setEditingId(offer.id);

        setForm({
            application_id: String(
                offer.application_id
            ),
            position_id: String(
                offer.position_id
            ),
            salary: String(offer.salary),
            joining_date: offer.joining_date,
            offer_date: offer.offer_date,
            expiry_date:
                offer.expiry_date ?? '',
            status: offer.status,
            document_path:
                offer.document_path ?? '',
        });

        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    const deleteOffer = (id: number) => {
        if (
            confirm(
                'Are you sure you want to delete this job offer?'
            )
        ) {
            router.delete(`/job-offers/${id}`);
        }
    };

    const getApplicationLabel = (
        application: Application
    ) => {
        const candidate =
            application.candidate;

        const jobPosting =
            application.jobPosting;

        const candidateName = candidate
            ? `${candidate.first_name} ${candidate.last_name}`
            : 'Unknown Candidate';

        const jobTitle =
            jobPosting?.title ?? 'Unknown Job';

        return `Application #${application.id} - ${candidateName} - ${jobTitle}`;
    };

    return (
        <>
            <Head title="Job Offers" />

            <div className="min-h-screen bg-gray-50 p-6">
                <div className="mx-auto max-w-7xl">

                    {/* Header */}
                    <div className="mb-6">
                        <h1 className="text-3xl font-bold text-gray-900">
                            Job Offers
                        </h1>

                        <p className="mt-1 text-sm text-gray-600">
                            Manage job offers for selected candidates.
                        </p>
                    </div>

                    {/* Form */}
                    <div className="mb-8 rounded-xl bg-white p-6 shadow">
                        <h2 className="mb-5 text-xl font-semibold text-gray-900">
                            {editingId
                                ? 'Edit Job Offer'
                                : 'Create Job Offer'}
                        </h2>

                        <form
                            onSubmit={submit}
                            className="grid gap-5 md:grid-cols-2"
                        >

                            {/* Application */}
                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-700">
                                    Application
                                </label>

                                <select
                                    value={
                                        form.application_id
                                    }
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            application_id:
                                                e.target.value,
                                        })
                                    }
                                    required
                                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-900 focus:border-blue-500 focus:outline-none"
                                >
                                    <option value="">
                                        Select Application
                                    </option>

                                    {applications.map(
                                        (application) => (
                                            <option
                                                key={
                                                    application.id
                                                }
                                                value={
                                                    application.id
                                                }
                                            >
                                                {getApplicationLabel(
                                                    application
                                                )}
                                            </option>
                                        )
                                    )}
                                </select>
                            </div>

                            {/* Position */}
                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-700">
                                    Position
                                </label>

                                <select
                                    value={
                                        form.position_id
                                    }
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            position_id:
                                                e.target.value,
                                        })
                                    }
                                    required
                                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-900 focus:border-blue-500 focus:outline-none"
                                >
                                    <option value="">
                                        Select Position
                                    </option>

                                    {positions.map(
                                        (position) => (
                                            <option
                                                key={
                                                    position.id
                                                }
                                                value={
                                                    position.id
                                                }
                                            >
                                                {position.title}
                                                {position.code
                                                    ? ` (${position.code})`
                                                    : ''}
                                            </option>
                                        )
                                    )}
                                </select>
                            </div>

                            {/* Salary */}
                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-700">
                                    Salary
                                </label>

                                <input
                                    type="number"
                                    min="0"
                                    step="0.01"
                                    value={form.salary}
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            salary: e.target.value,
                                        })
                                    }
                                    placeholder="Enter salary"
                                    required
                                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none"
                                />
                            </div>

                            {/* Joining Date */}
                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-700">
                                    Joining Date
                                </label>

                                <input
                                    type="date"
                                    value={
                                        form.joining_date
                                    }
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            joining_date:
                                                e.target.value,
                                        })
                                    }
                                    required
                                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-900 focus:border-blue-500 focus:outline-none"
                                />
                            </div>

                            {/* Offer Date */}
                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-700">
                                    Offer Date
                                </label>

                                <input
                                    type="date"
                                    value={
                                        form.offer_date
                                    }
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            offer_date:
                                                e.target.value,
                                        })
                                    }
                                    required
                                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-900 focus:border-blue-500 focus:outline-none"
                                />
                            </div>

                            {/* Expiry Date */}
                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-700">
                                    Expiry Date
                                </label>

                                <input
                                    type="date"
                                    value={
                                        form.expiry_date
                                    }
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            expiry_date:
                                                e.target.value,
                                        })
                                    }
                                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-900 focus:border-blue-500 focus:outline-none"
                                />
                            </div>

                            {/* Status */}
                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-700">
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
                                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-900 focus:border-blue-500 focus:outline-none"
                                >
                                    <option value="">
                                        Select Status
                                    </option>

                                    <option value="Draft">
                                        Draft
                                    </option>

                                    <option value="Sent">
                                        Sent
                                    </option>

                                    <option value="Accepted">
                                        Accepted
                                    </option>

                                    <option value="Rejected">
                                        Rejected
                                    </option>

                                    <option value="Expired">
                                        Expired
                                    </option>
                                </select>
                            </div>

                            {/* Document Path */}
                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-700">
                                    Document Path
                                </label>

                                <input
                                    type="text"
                                    value={
                                        form.document_path
                                    }
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            document_path:
                                                e.target.value,
                                        })
                                    }
                                    placeholder="Optional offer letter path"
                                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none"
                                />
                            </div>

                            {/* Buttons */}
                            <div className="flex items-end gap-3 md:col-span-2">
                                <button
                                    type="submit"
                                    className="rounded-lg bg-blue-600 px-5 py-2.5 font-medium text-white hover:bg-blue-700"
                                >
                                    {editingId
                                        ? 'Update Job Offer'
                                        : 'Create Job Offer'}
                                </button>

                                {editingId && (
                                    <button
                                        type="button"
                                        onClick={resetForm}
                                        className="rounded-lg bg-gray-200 px-5 py-2.5 font-medium text-gray-700 hover:bg-gray-300"
                                    >
                                        Cancel
                                    </button>
                                )}
                            </div>
                        </form>
                    </div>

                    {/* Table */}
                    <div className="overflow-hidden rounded-xl bg-white shadow">

                        <div className="border-b border-gray-200 px-6 py-4">
                            <h2 className="text-xl font-semibold text-gray-900">
                                Job Offer Records
                            </h2>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">

                                <thead className="bg-gray-100">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-semibold uppercase text-gray-600">
                                            Candidate
                                        </th>

                                        <th className="px-6 py-3 text-left text-xs font-semibold uppercase text-gray-600">
                                            Position
                                        </th>

                                        <th className="px-6 py-3 text-left text-xs font-semibold uppercase text-gray-600">
                                            Salary
                                        </th>

                                        <th className="px-6 py-3 text-left text-xs font-semibold uppercase text-gray-600">
                                            Joining Date
                                        </th>

                                        <th className="px-6 py-3 text-left text-xs font-semibold uppercase text-gray-600">
                                            Offer Date
                                        </th>

                                        <th className="px-6 py-3 text-left text-xs font-semibold uppercase text-gray-600">
                                            Status
                                        </th>

                                        <th className="px-6 py-3 text-left text-xs font-semibold uppercase text-gray-600">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>

                                <tbody className="divide-y divide-gray-200 bg-white">

                                    {offers.length > 0 ? (
                                        offers.map(
                                            (offer) => {
                                                const candidate =
                                                    offer
                                                        .application
                                                        ?.candidate;

                                                return (
                                                    <tr
                                                        key={
                                                            offer.id
                                                        }
                                                        className="hover:bg-gray-50"
                                                    >

                                                        <td className="px-6 py-4 text-sm font-medium text-gray-900">
                                                            {candidate
                                                                ? `${candidate.first_name} ${candidate.last_name}`
                                                                : 'Unknown'}
                                                        </td>

                                                        <td className="px-6 py-4 text-sm text-gray-700">
                                                            {
                                                                offer
                                                                    .position
                                                                    ?.title
                                                            }
                                                        </td>

                                                        <td className="px-6 py-4 text-sm font-medium text-gray-900">
                                                            {Number(
                                                                offer.salary
                                                            ).toLocaleString(
                                                                'en-LK',
                                                                {
                                                                    minimumFractionDigits: 2,
                                                                    maximumFractionDigits: 2,
                                                                }
                                                            )}
                                                        </td>

                                                        <td className="px-6 py-4 text-sm text-gray-700">
                                                            {
                                                                offer.joining_date
                                                            }
                                                        </td>

                                                        <td className="px-6 py-4 text-sm text-gray-700">
                                                            {
                                                                offer.offer_date
                                                            }
                                                        </td>

                                                        <td className="px-6 py-4">
                                                            <span
                                                                className={`rounded-full px-3 py-1 text-xs font-semibold ${
                                                                    offer.status ===
                                                                    'Accepted'
                                                                        ? 'bg-green-100 text-green-700'
                                                                        : offer.status ===
                                                                          'Rejected'
                                                                        ? 'bg-red-100 text-red-700'
                                                                        : offer.status ===
                                                                          'Expired'
                                                                        ? 'bg-gray-200 text-gray-700'
                                                                        : 'bg-yellow-100 text-yellow-700'
                                                                }`}
                                                            >
                                                                {
                                                                    offer.status
                                                                }
                                                            </span>
                                                        </td>

                                                        <td className="whitespace-nowrap px-6 py-4">

                                                            <button
                                                                type="button"
                                                                onClick={() =>
                                                                    editOffer(
                                                                        offer
                                                                    )
                                                                }
                                                                className="mr-3 rounded-lg bg-yellow-500 px-3 py-2 text-sm font-medium text-white hover:bg-yellow-600"
                                                            >
                                                                Edit
                                                            </button>

                                                            <button
                                                                type="button"
                                                                onClick={() =>
                                                                    deleteOffer(
                                                                        offer.id
                                                                    )
                                                                }
                                                                className="rounded-lg bg-red-600 px-3 py-2 text-sm font-medium text-white hover:bg-red-700"
                                                            >
                                                                Delete
                                                            </button>

                                                        </td>
                                                    </tr>
                                                );
                                            }
                                        )
                                    ) : (
                                        <tr>
                                            <td
                                                colSpan={7}
                                                className="px-6 py-10 text-center text-gray-500"
                                            >
                                                No job offers
                                                found.
                                            </td>
                                        </tr>
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