import { Head, router } from '@inertiajs/react';
import { FormEvent, useState } from 'react';

type Candidate = {
    first_name: string;
    last_name: string;
};

type JobPosting = {
    title: string;
};

type Application = {
    id: number;
    candidate?: Candidate;
    jobPosting?: JobPosting;
};

type Interview = {
    id: number;
    application_id: number;
    interview_type: string;
    scheduled_at: string;
    location: string | null;
    meeting_url: string | null;
    status: string;
    feedback: string | null;
    application?: Application;
};

type Props = {
    interviews: Interview[];
    applications: Application[];
};

export default function Index({
    interviews,
    applications,
}: Props) {
    const [editingInterview, setEditingInterview] =
        useState<Interview | null>(null);

    const [form, setForm] = useState({
        application_id: '',
        interview_type: '',
        scheduled_at: '',
        location: '',
        meeting_url: '',
        status: '',
        feedback: '',
    });

    const resetForm = () => {
        setForm({
            application_id: '',
            interview_type: '',
            scheduled_at: '',
            location: '',
            meeting_url: '',
            status: '',
            feedback: '',
        });

        setEditingInterview(null);
    };

    const submit = (e: FormEvent) => {
        e.preventDefault();

        if (editingInterview) {
            router.put(
                `/interviews/${editingInterview.id}`,
                form,
                {
                    onSuccess: resetForm,
                }
            );
        } else {
            router.post('/interviews', form, {
                onSuccess: resetForm,
            });
        }
    };

    const editInterview = (interview: Interview) => {
        setEditingInterview(interview);

        setForm({
            application_id: String(
                interview.application_id
            ),
            interview_type: interview.interview_type,
            scheduled_at: interview.scheduled_at
                ? interview.scheduled_at.slice(0, 16)
                : '',
            location: interview.location ?? '',
            meeting_url: interview.meeting_url ?? '',
            status: interview.status,
            feedback: interview.feedback ?? '',
        });

        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    const deleteInterview = (id: number) => {
        if (
            confirm(
                'Are you sure you want to delete this interview?'
            )
        ) {
            router.delete(`/interviews/${id}`);
        }
    };

    return (
        <>
            <Head title="Interviews" />

            <div className="min-h-screen bg-gray-50 p-6">
                <div className="mx-auto max-w-7xl">

                    {/* Header */}
                    <div className="mb-6">
                        <h1 className="text-3xl font-bold text-gray-800">
                            Interviews
                        </h1>

                        <p className="mt-1 text-sm text-gray-500">
                            Schedule and manage candidate interviews.
                        </p>
                    </div>

                    {/* Form Card */}
                    <div className="mb-8 rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-200">

                        <h2 className="mb-5 text-xl font-semibold text-gray-800">
                            {editingInterview
                                ? 'Edit Interview'
                                : 'Schedule Interview'}
                        </h2>

                        <form onSubmit={submit}>

                            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

                                {/* Application */}
                                <div>
                                    <label className="mb-2 block text-sm font-medium text-gray-700">
                                        Application
                                    </label>

                                    <select
                                        value={form.application_id}
                                        onChange={(e) =>
                                            setForm({
                                                ...form,
                                                application_id:
                                                    e.target.value,
                                            })
                                        }
                                        required
                                        className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
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
                                                    Application #
                                                    {application.id} -{' '}
                                                    {application.candidate
                                                        ? `${application.candidate.first_name} ${application.candidate.last_name}`
                                                        : 'Candidate'}{' '}
                                                    -{' '}
                                                    {application.jobPosting
                                                        ?.title ??
                                                        'Job Posting'}
                                                </option>
                                            )
                                        )}
                                    </select>
                                </div>

                                {/* Interview Type */}
                                <div>
                                    <label className="mb-2 block text-sm font-medium text-gray-700">
                                        Interview Type
                                    </label>

                                    <select
                                        value={
                                            form.interview_type
                                        }
                                        onChange={(e) =>
                                            setForm({
                                                ...form,
                                                interview_type:
                                                    e.target.value,
                                            })
                                        }
                                        required
                                        className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                                    >
                                        <option value="">
                                            Select Interview Type
                                        </option>

                                        <option value="Phone">
                                            Phone
                                        </option>

                                        <option value="Online">
                                            Online
                                        </option>

                                        <option value="Technical">
                                            Technical
                                        </option>

                                        <option value="HR">
                                            HR
                                        </option>

                                        <option value="Panel">
                                            Panel
                                        </option>

                                        <option value="Final">
                                            Final
                                        </option>
                                    </select>
                                </div>

                                {/* Scheduled At */}
                                <div>
                                    <label className="mb-2 block text-sm font-medium text-gray-700">
                                        Scheduled At
                                    </label>

                                    <input
                                        type="datetime-local"
                                        value={
                                            form.scheduled_at
                                        }
                                        onChange={(e) =>
                                            setForm({
                                                ...form,
                                                scheduled_at:
                                                    e.target.value,
                                            })
                                        }
                                        required
                                        className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
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
                                        className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                                    >
                                        <option value="">
                                            Select Status
                                        </option>

                                        <option value="Scheduled">
                                            Scheduled
                                        </option>

                                        <option value="Completed">
                                            Completed
                                        </option>

                                        <option value="Cancelled">
                                            Cancelled
                                        </option>

                                        <option value="Rescheduled">
                                            Rescheduled
                                        </option>
                                    </select>
                                </div>

                                {/* Location */}
                                <div>
                                    <label className="mb-2 block text-sm font-medium text-gray-700">
                                        Location
                                    </label>

                                    <input
                                        type="text"
                                        value={form.location}
                                        onChange={(e) =>
                                            setForm({
                                                ...form,
                                                location:
                                                    e.target.value,
                                            })
                                        }
                                        placeholder="e.g. Colombo Office"
                                        className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                                    />
                                </div>

                                {/* Meeting URL */}
                                <div>
                                    <label className="mb-2 block text-sm font-medium text-gray-700">
                                        Meeting URL
                                    </label>

                                    <input
                                        type="url"
                                        value={
                                            form.meeting_url
                                        }
                                        onChange={(e) =>
                                            setForm({
                                                ...form,
                                                meeting_url:
                                                    e.target.value,
                                            })
                                        }
                                        placeholder="https://meet.google.com/..."
                                        className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                                    />
                                </div>

                                {/* Feedback */}
                                <div className="md:col-span-2">
                                    <label className="mb-2 block text-sm font-medium text-gray-700">
                                        Feedback
                                    </label>

                                    <textarea
                                        value={form.feedback}
                                        onChange={(e) =>
                                            setForm({
                                                ...form,
                                                feedback:
                                                    e.target.value,
                                            })
                                        }
                                        rows={3}
                                        placeholder="Enter interview feedback..."
                                        className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                                    />
                                </div>
                            </div>

                            {/* Buttons */}
                            <div className="mt-6 flex gap-3">

                                <button
                                    type="submit"
                                    className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700"
                                >
                                    {editingInterview
                                        ? 'Update Interview'
                                        : 'Schedule Interview'}
                                </button>

                                {editingInterview && (
                                    <button
                                        type="button"
                                        onClick={resetForm}
                                        className="rounded-lg bg-gray-200 px-5 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-300"
                                    >
                                        Cancel
                                    </button>
                                )}
                            </div>
                        </form>
                    </div>

                    {/* Table Card */}
                    <div className="overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-gray-200">

                        <div className="border-b border-gray-200 px-6 py-4">
                            <h2 className="text-lg font-semibold text-gray-800">
                                Interview Records
                            </h2>

                            <p className="text-sm text-gray-500">
                                Total interviews:{' '}
                                {interviews.length}
                            </p>
                        </div>

                        <div className="overflow-x-auto">

                            <table className="min-w-full divide-y divide-gray-200">

                                <thead className="bg-gray-50">

                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                                            #
                                        </th>

                                        <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                                            Candidate
                                        </th>

                                        <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                                            Interview Type
                                        </th>

                                        <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                                            Scheduled At
                                        </th>

                                        <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                                            Location
                                        </th>

                                        <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                                            Status
                                        </th>

                                        <th className="px-6 py-3 text-right text-xs font-semibold uppercase tracking-wider text-gray-500">
                                            Actions
                                        </th>
                                    </tr>

                                </thead>

                                <tbody className="divide-y divide-gray-200 bg-white">

                                    {interviews.length === 0 ? (
                                        <tr>
                                            <td
                                                colSpan={7}
                                                className="px-6 py-10 text-center text-sm text-gray-500"
                                            >
                                                No interview records
                                                found.
                                            </td>
                                        </tr>
                                    ) : (
                                        interviews.map(
                                            (interview) => (
                                                <tr
                                                    key={
                                                        interview.id
                                                    }
                                                    className="hover:bg-gray-50"
                                                >

                                                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-600">
                                                        {
                                                            interview.id
                                                        }
                                                    </td>

                                                    <td className="px-6 py-4 text-sm text-gray-700">
                                                        <div className="font-medium">
                                                            {interview
                                                                .application
                                                                ?.candidate
                                                                ? `${interview.application.candidate.first_name} ${interview.application.candidate.last_name}`
                                                                : 'Candidate'}
                                                        </div>

                                                        <div className="text-xs text-gray-500">
                                                            {interview
                                                                .application
                                                                ?.jobPosting
                                                                ?.title ??
                                                                'Job Posting'}
                                                        </div>
                                                    </td>

                                                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-700">
                                                        {
                                                            interview.interview_type
                                                        }
                                                    </td>

                                                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-600">
                                                        {new Date(
                                                            interview.scheduled_at
                                                        ).toLocaleString()}
                                                    </td>

                                                    <td className="px-6 py-4 text-sm text-gray-600">
                                                        {interview.location ??
                                                            '—'}
                                                    </td>

                                                    <td className="whitespace-nowrap px-6 py-4">

                                                        <span
                                                            className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                                                                interview.status ===
                                                                'Completed'
                                                                    ? 'bg-green-100 text-green-700'
                                                                    : interview.status ===
                                                                        'Cancelled'
                                                                      ? 'bg-red-100 text-red-700'
                                                                      : interview.status ===
                                                                          'Rescheduled'
                                                                        ? 'bg-yellow-100 text-yellow-700'
                                                                        : 'bg-blue-100 text-blue-700'
                                                            }`}
                                                        >
                                                            {
                                                                interview.status
                                                            }
                                                        </span>

                                                    </td>

                                                    <td className="whitespace-nowrap px-6 py-4 text-right">

                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                editInterview(
                                                                    interview
                                                                )
                                                            }
                                                            className="mr-3 text-sm font-medium text-blue-600 hover:text-blue-800"
                                                        >
                                                            Edit
                                                        </button>

                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                deleteInterview(
                                                                    interview.id
                                                                )
                                                            }
                                                            className="text-sm font-medium text-red-600 hover:text-red-800"
                                                        >
                                                            Delete
                                                        </button>

                                                    </td>

                                                </tr>
                                            )
                                        )
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