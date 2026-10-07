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

type User = {
    id: number;
    name: string;
};

type Assessment = {
    id: number;
    application_id: number;
    assessment_type: string;
    score: string | number | null;
    result: string;
    feedback: string | null;
    assessed_by: number | null;
    application?: Application;
    assessedBy?: User | null;
};

type Props = {
    assessments: Assessment[];
    applications: Application[];
    users: User[];
};

export default function Index({
    assessments,
    applications,
    users,
}: Props) {
    const [editingId, setEditingId] = useState<number | null>(null);

    const [form, setForm] = useState({
        application_id: '',
        assessment_type: '',
        score: '',
        result: '',
        feedback: '',
        assessed_by: '',
    });

    const resetForm = () => {
        setEditingId(null);

        setForm({
            application_id: '',
            assessment_type: '',
            score: '',
            result: '',
            feedback: '',
            assessed_by: '',
        });
    };

    const submit = (e: FormEvent) => {
        e.preventDefault();

        if (editingId) {
            router.put(
                `/assessments/${editingId}`,
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
            '/assessments',
            form,
            {
                onSuccess: () => {
                    resetForm();
                },
            }
        );
    };

    const editAssessment = (
        assessment: Assessment
    ) => {
        setEditingId(assessment.id);

        setForm({
            application_id: String(
                assessment.application_id
            ),
            assessment_type:
                assessment.assessment_type,
            score:
                assessment.score !== null
                    ? String(assessment.score)
                    : '',
            result: assessment.result,
            feedback:
                assessment.feedback ?? '',
            assessed_by:
                assessment.assessed_by !== null
                    ? String(assessment.assessed_by)
                    : '',
        });

        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    const deleteAssessment = (id: number) => {
        if (
            confirm(
                'Are you sure you want to delete this assessment?'
            )
        ) {
            router.delete(`/assessments/${id}`);
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
            <Head title="Assessments" />

            <div className="min-h-screen bg-gray-50 p-6">
                <div className="mx-auto max-w-7xl">

                    {/* Header */}
                    <div className="mb-6">
                        <h1 className="text-3xl font-bold text-gray-900">
                            Assessments
                        </h1>

                        <p className="mt-1 text-sm text-gray-600">
                            Manage candidate assessments and
                            evaluation results.
                        </p>
                    </div>

                    {/* Form */}
                    <div className="mb-8 rounded-xl bg-white p-6 shadow">
                        <h2 className="mb-5 text-xl font-semibold text-gray-900">
                            {editingId
                                ? 'Edit Assessment'
                                : 'Create Assessment'}
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

                            {/* Assessment Type */}
                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-700">
                                    Assessment Type
                                </label>

                                <select
                                    value={
                                        form.assessment_type
                                    }
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            assessment_type:
                                                e.target.value,
                                        })
                                    }
                                    required
                                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-900 focus:border-blue-500 focus:outline-none"
                                >
                                    <option value="">
                                        Select Assessment Type
                                    </option>

                                    <option value="Technical Test">
                                        Technical Test
                                    </option>

                                    <option value="Coding Test">
                                        Coding Test
                                    </option>

                                    <option value="Aptitude Test">
                                        Aptitude Test
                                    </option>

                                    <option value="English Test">
                                        English Test
                                    </option>

                                    <option value="HR Assessment">
                                        HR Assessment
                                    </option>

                                    <option value="Final Assessment">
                                        Final Assessment
                                    </option>
                                </select>
                            </div>

                            {/* Score */}
                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-700">
                                    Score
                                </label>

                                <input
                                    type="number"
                                    min="0"
                                    max="100"
                                    step="0.01"
                                    value={form.score}
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            score: e.target.value,
                                        })
                                    }
                                    placeholder="Enter score (0-100)"
                                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none"
                                />
                            </div>

                            {/* Result */}
                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-700">
                                    Result
                                </label>

                                <select
                                    value={form.result}
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            result: e.target.value,
                                        })
                                    }
                                    required
                                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-900 focus:border-blue-500 focus:outline-none"
                                >
                                    <option value="">
                                        Select Result
                                    </option>

                                    <option value="Passed">
                                        Passed
                                    </option>

                                    <option value="Failed">
                                        Failed
                                    </option>

                                    <option value="Pending">
                                        Pending
                                    </option>

                                    <option value="Not Attended">
                                        Not Attended
                                    </option>
                                </select>
                            </div>

                            {/* Assessed By */}
                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-700">
                                    Assessed By
                                </label>

                                <select
                                    value={
                                        form.assessed_by
                                    }
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            assessed_by:
                                                e.target.value,
                                        })
                                    }
                                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-900 focus:border-blue-500 focus:outline-none"
                                >
                                    <option value="">
                                        Select User
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

                            {/* Feedback */}
                            <div>
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
                                    rows={4}
                                    placeholder="Enter assessment feedback"
                                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none"
                                />
                            </div>

                            {/* Buttons */}
                            <div className="flex items-end gap-3">
                                <button
                                    type="submit"
                                    className="rounded-lg bg-blue-600 px-5 py-2.5 font-medium text-white hover:bg-blue-700"
                                >
                                    {editingId
                                        ? 'Update Assessment'
                                        : 'Create Assessment'}
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
                                Assessment Records
                            </h2>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">

                                <thead className="bg-gray-100">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-semibold uppercase text-gray-600">
                                            Application
                                        </th>

                                        <th className="px-6 py-3 text-left text-xs font-semibold uppercase text-gray-600">
                                            Candidate
                                        </th>

                                        <th className="px-6 py-3 text-left text-xs font-semibold uppercase text-gray-600">
                                            Assessment
                                        </th>

                                        <th className="px-6 py-3 text-left text-xs font-semibold uppercase text-gray-600">
                                            Score
                                        </th>

                                        <th className="px-6 py-3 text-left text-xs font-semibold uppercase text-gray-600">
                                            Result
                                        </th>

                                        <th className="px-6 py-3 text-left text-xs font-semibold uppercase text-gray-600">
                                            Assessed By
                                        </th>

                                        <th className="px-6 py-3 text-left text-xs font-semibold uppercase text-gray-600">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>

                                <tbody className="divide-y divide-gray-200 bg-white">

                                    {assessments.length > 0 ? (
                                        assessments.map(
                                            (assessment) => {
                                                const candidate =
                                                    assessment
                                                        .application
                                                        ?.candidate;

                                                return (
                                                    <tr
                                                        key={
                                                            assessment.id
                                                        }
                                                        className="hover:bg-gray-50"
                                                    >

                                                        <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">
                                                            #
                                                            {
                                                                assessment.application_id
                                                            }
                                                        </td>

                                                        <td className="px-6 py-4 text-sm text-gray-700">
                                                            {candidate
                                                                ? `${candidate.first_name} ${candidate.last_name}`
                                                                : 'Unknown'}
                                                        </td>

                                                        <td className="px-6 py-4 text-sm text-gray-700">
                                                            {
                                                                assessment.assessment_type
                                                            }
                                                        </td>

                                                        <td className="px-6 py-4 text-sm font-medium text-gray-900">
                                                            {assessment.score !==
                                                            null
                                                                ? `${assessment.score}%`
                                                                : '-'}
                                                        </td>

                                                        <td className="px-6 py-4">
                                                            <span
                                                                className={`rounded-full px-3 py-1 text-xs font-semibold ${
                                                                    assessment.result ===
                                                                    'Passed'
                                                                        ? 'bg-green-100 text-green-700'
                                                                        : assessment.result ===
                                                                          'Failed'
                                                                        ? 'bg-red-100 text-red-700'
                                                                        : 'bg-yellow-100 text-yellow-700'
                                                                }`}
                                                            >
                                                                {
                                                                    assessment.result
                                                                }
                                                            </span>
                                                        </td>

                                                        <td className="px-6 py-4 text-sm text-gray-700">
                                                            {assessment
                                                                .assessedBy
                                                                ?.name ??
                                                                '-'}
                                                        </td>

                                                        <td className="whitespace-nowrap px-6 py-4">

                                                            <button
                                                                type="button"
                                                                onClick={() =>
                                                                    editAssessment(
                                                                        assessment
                                                                    )
                                                                }
                                                                className="mr-3 rounded-lg bg-yellow-500 px-3 py-2 text-sm font-medium text-white hover:bg-yellow-600"
                                                            >
                                                                Edit
                                                            </button>

                                                            <button
                                                                type="button"
                                                                onClick={() =>
                                                                    deleteAssessment(
                                                                        assessment.id
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
                                                No assessment
                                                records found.
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