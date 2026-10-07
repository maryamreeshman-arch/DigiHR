import { Head, router } from '@inertiajs/react';
import { FormEvent, useState } from 'react';

type Interview = {
    id: number;
    application?: {
        candidate?: {
            first_name: string;
            last_name: string;
            candidate_no: string;
        };
        job_posting?: {
            title: string;
        };
    };
    interview_type: string;
    scheduled_at: string;
    location?: string | null;
    status: string;
};

type User = {
    id: number;
    name: string;
};

type Interviewer = {
    id: number;
    interview_id: number;
    user_id: number;
    interview?: Interview;
    user?: User;
};

type Props = {
    interviewers: Interviewer[];
    interviews: Interview[];
    users: User[];
};

export default function Index({
    interviewers,
    interviews,
    users,
}: Props) {
    const [editingId, setEditingId] = useState<number | null>(null);

    const [form, setForm] = useState({
        interview_id: '',
        user_id: '',
    });

    const resetForm = () => {
        setEditingId(null);

        setForm({
            interview_id: '',
            user_id: '',
        });
    };

    const submit = (e: FormEvent) => {
        e.preventDefault();

        if (editingId) {
            router.put(
                `/interviewers/${editingId}`,
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
            '/interviewers',
            form,
            {
                onSuccess: () => {
                    resetForm();
                },
            }
        );
    };

    const editInterviewer = (interviewer: Interviewer) => {
        setEditingId(interviewer.id);

        setForm({
            interview_id: String(interviewer.interview_id),
            user_id: String(interviewer.user_id),
        });

        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    const deleteInterviewer = (id: number) => {
        if (
            confirm(
                'Are you sure you want to remove this interviewer?'
            )
        ) {
            router.delete(`/interviewers/${id}`);
        }
    };

    const getInterviewLabel = (interview: Interview) => {
        const candidate = interview.application?.candidate;
        const jobPosting =
            interview.application?.job_posting;

        const candidateName = candidate
            ? `${candidate.first_name} ${candidate.last_name}`
            : 'Unknown Candidate';

        const jobTitle =
            jobPosting?.title ?? 'Unknown Job';

        return `Interview #${interview.id} - ${candidateName} - ${jobTitle}`;
    };

    return (
        <>
            <Head title="Interviewers" />

            <div className="min-h-screen bg-gray-50 p-6">
                <div className="mx-auto max-w-7xl">
                    {/* Header */}
                    <div className="mb-6">
                        <h1 className="text-3xl font-bold text-gray-900">
                            Interviewers
                        </h1>

                        <p className="mt-1 text-sm text-gray-600">
                            Assign users to recruitment interviews.
                        </p>
                    </div>

                    {/* Form */}
                    <div className="mb-8 rounded-xl bg-white p-6 shadow">
                        <h2 className="mb-5 text-xl font-semibold text-gray-900">
                            {editingId
                                ? 'Edit Interviewer'
                                : 'Assign Interviewer'}
                        </h2>

                        <form
                            onSubmit={submit}
                            className="grid gap-5 md:grid-cols-2"
                        >
                            {/* Interview */}
                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-700">
                                    Interview
                                </label>

                                <select
                                    value={form.interview_id}
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            interview_id:
                                                e.target.value,
                                        })
                                    }
                                    required
                                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-900 focus:border-blue-500 focus:outline-none"
                                >
                                    <option value="">
                                        Select Interview
                                    </option>

                                    {interviews.map(
                                        (interview) => (
                                            <option
                                                key={
                                                    interview.id
                                                }
                                                value={
                                                    interview.id
                                                }
                                            >
                                                {getInterviewLabel(
                                                    interview
                                                )}
                                            </option>
                                        )
                                    )}
                                </select>
                            </div>

                            {/* User */}
                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-700">
                                    Interviewer
                                </label>

                                <select
                                    value={form.user_id}
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            user_id:
                                                e.target.value,
                                        })
                                    }
                                    required
                                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-900 focus:border-blue-500 focus:outline-none"
                                >
                                    <option value="">
                                        Select Interviewer
                                    </option>

                                    {users.map((user) => (
                                        <option
                                            key={user.id}
                                            value={user.id}
                                        >
                                            {user.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Buttons */}
                            <div className="flex gap-3 md:col-span-2">
                                <button
                                    type="submit"
                                    className="rounded-lg bg-blue-600 px-5 py-2.5 font-medium text-white hover:bg-blue-700"
                                >
                                    {editingId
                                        ? 'Update Interviewer'
                                        : 'Assign Interviewer'}
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
                                Assigned Interviewers
                            </h2>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-100">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-semibold uppercase text-gray-600">
                                            Interview
                                        </th>

                                        <th className="px-6 py-3 text-left text-xs font-semibold uppercase text-gray-600">
                                            Candidate
                                        </th>

                                        <th className="px-6 py-3 text-left text-xs font-semibold uppercase text-gray-600">
                                            Interview Type
                                        </th>

                                        <th className="px-6 py-3 text-left text-xs font-semibold uppercase text-gray-600">
                                            Scheduled At
                                        </th>

                                        <th className="px-6 py-3 text-left text-xs font-semibold uppercase text-gray-600">
                                            Interviewer
                                        </th>

                                        <th className="px-6 py-3 text-left text-xs font-semibold uppercase text-gray-600">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>

                                <tbody className="divide-y divide-gray-200 bg-white">
                                    {interviewers.length > 0 ? (
                                        interviewers.map(
                                            (interviewer) => {
                                                const interview =
                                                    interviewer.interview;

                                                const candidate =
                                                    interview
                                                        ?.application
                                                        ?.candidate;

                                                return (
                                                    <tr
                                                        key={
                                                            interviewer.id
                                                        }
                                                        className="hover:bg-gray-50"
                                                    >
                                                        <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">
                                                            #
                                                            {
                                                                interviewer.interview_id
                                                            }
                                                        </td>

                                                        <td className="px-6 py-4 text-sm text-gray-700">
                                                            {candidate
                                                                ? `${candidate.first_name} ${candidate.last_name}`
                                                                : 'Unknown'}
                                                        </td>

                                                        <td className="px-6 py-4 text-sm text-gray-700">
                                                            {
                                                                interview?.interview_type
                                                            }
                                                        </td>

                                                        <td className="px-6 py-4 text-sm text-gray-700">
                                                            {interview
                                                                ? new Date(
                                                                      interview.scheduled_at
                                                                  ).toLocaleString()
                                                                : '-'}
                                                        </td>

                                                        <td className="px-6 py-4 text-sm font-medium text-gray-900">
                                                            {
                                                                interviewer
                                                                    .user
                                                                    ?.name
                                                            }
                                                        </td>

                                                        <td className="whitespace-nowrap px-6 py-4">
                                                            <button
                                                                type="button"
                                                                onClick={() =>
                                                                    editInterviewer(
                                                                        interviewer
                                                                    )
                                                                }
                                                                className="mr-3 rounded-lg bg-yellow-500 px-3 py-2 text-sm font-medium text-white hover:bg-yellow-600"
                                                            >
                                                                Edit
                                                            </button>

                                                            <button
                                                                type="button"
                                                                onClick={() =>
                                                                    deleteInterviewer(
                                                                        interviewer.id
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
                                                colSpan={6}
                                                className="px-6 py-10 text-center text-gray-500"
                                            >
                                                No interviewers
                                                assigned yet.
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