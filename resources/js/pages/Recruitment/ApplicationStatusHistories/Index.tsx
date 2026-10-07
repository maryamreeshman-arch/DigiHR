import { Head, router } from '@inertiajs/react';
import { FormEvent, useState } from 'react';

type Application = {
    id: number;
    candidate?: {
        first_name: string;
        last_name: string;
    };
    job_posting?: {
        title: string;
    };
};

type User = {
    id: number;
    name: string;
};

type History = {
    id: number;
    application_id: number;
    status: string;
    remarks: string | null;
    changed_by: number | null;
    changed_at: string;
    application?: Application;
    changedBy?: User;
};

type Props = {
    histories: History[];
    applications: Application[];
    users: User[];
};

export default function Index({
    histories,
    applications,
    users,
}: Props) {
    const [editingHistory, setEditingHistory] =
        useState<History | null>(null);

    const [form, setForm] = useState({
        application_id: '',
        status: '',
        remarks: '',
        changed_by: '',
        changed_at: '',
    });

    const resetForm = () => {
        setForm({
            application_id: '',
            status: '',
            remarks: '',
            changed_by: '',
            changed_at: '',
        });

        setEditingHistory(null);
    };

    const submit = (e: FormEvent) => {
        e.preventDefault();

        if (editingHistory) {
            router.put(
                `/application-status-histories/${editingHistory.id}`,
                form,
                {
                    onSuccess: resetForm,
                }
            );
        } else {
            router.post(
                '/application-status-histories',
                form,
                {
                    onSuccess: resetForm,
                }
            );
        }
    };

    const editHistory = (history: History) => {
        setEditingHistory(history);

        setForm({
            application_id: String(history.application_id),
            status: history.status,
            remarks: history.remarks ?? '',
            changed_by: history.changed_by
                ? String(history.changed_by)
                : '',
            changed_at: history.changed_at
                ? history.changed_at.slice(0, 16)
                : '',
        });

        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    const deleteHistory = (id: number) => {
        if (
            confirm(
                'Are you sure you want to delete this status history?'
            )
        ) {
            router.delete(
                `/application-status-histories/${id}`
            );
        }
    };

    return (
        <>
            <Head title="Application Status Histories" />

            <div className="min-h-screen bg-gray-50 p-6">
                <div className="mx-auto max-w-7xl">

                    {/* Header */}
                    <div className="mb-6">
                        <h1 className="text-3xl font-bold text-gray-800">
                            Application Status History
                        </h1>

                        <p className="mt-1 text-sm text-gray-500">
                            Track status changes made to job applications.
                        </p>
                    </div>

                    {/* Form Card */}
                    <div className="mb-8 rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-200">

                        <h2 className="mb-5 text-xl font-semibold text-gray-800">
                            {editingHistory
                                ? 'Edit Status History'
                                : 'Add Status History'}
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
                                                    key={application.id}
                                                    value={application.id}
                                                >
                                                    Application #
                                                    {application.id} -{' '}
                                                    {application.candidate
                                                        ? `${application.candidate.first_name} ${application.candidate.last_name}`
                                                        : 'Candidate'}{' '}
                                                    -{' '}
                                                    {application.job_posting
                                                        ?.title ??
                                                        'Job Posting'}
                                                </option>
                                            )
                                        )}
                                    </select>
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

                                        <option value="Applied">
                                            Applied
                                        </option>

                                        <option value="Shortlisted">
                                            Shortlisted
                                        </option>

                                        <option value="Interview">
                                            Interview
                                        </option>

                                        <option value="Assessment">
                                            Assessment
                                        </option>

                                        <option value="Selected">
                                            Selected
                                        </option>

                                        <option value="Rejected">
                                            Rejected
                                        </option>

                                        <option value="Withdrawn">
                                            Withdrawn
                                        </option>

                                        <option value="Hired">
                                            Hired
                                        </option>
                                    </select>
                                </div>

                                {/* Changed By */}
                                <div>
                                    <label className="mb-2 block text-sm font-medium text-gray-700">
                                        Changed By
                                    </label>

                                    <select
                                        value={form.changed_by}
                                        onChange={(e) =>
                                            setForm({
                                                ...form,
                                                changed_by:
                                                    e.target.value,
                                            })
                                        }
                                        className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
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

                                {/* Changed At */}
                                <div>
                                    <label className="mb-2 block text-sm font-medium text-gray-700">
                                        Changed At
                                    </label>

                                    <input
                                        type="datetime-local"
                                        value={form.changed_at}
                                        onChange={(e) =>
                                            setForm({
                                                ...form,
                                                changed_at:
                                                    e.target.value,
                                            })
                                        }
                                        required
                                        className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                                    />
                                </div>

                                {/* Remarks */}
                                <div className="md:col-span-2">
                                    <label className="mb-2 block text-sm font-medium text-gray-700">
                                        Remarks
                                    </label>

                                    <textarea
                                        value={form.remarks}
                                        onChange={(e) =>
                                            setForm({
                                                ...form,
                                                remarks:
                                                    e.target.value,
                                            })
                                        }
                                        rows={3}
                                        placeholder="Enter remarks..."
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
                                    {editingHistory
                                        ? 'Update History'
                                        : 'Save History'}
                                </button>

                                {editingHistory && (
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
                                Status History Records
                            </h2>

                            <p className="text-sm text-gray-500">
                                Total records: {histories.length}
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
                                            Application
                                        </th>

                                        <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                                            Status
                                        </th>

                                        <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                                            Changed By
                                        </th>

                                        <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                                            Changed At
                                        </th>

                                        <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                                            Remarks
                                        </th>

                                        <th className="px-6 py-3 text-right text-xs font-semibold uppercase tracking-wider text-gray-500">
                                            Actions
                                        </th>
                                    </tr>

                                </thead>

                                <tbody className="divide-y divide-gray-200 bg-white">

                                    {histories.length === 0 ? (
                                        <tr>
                                            <td
                                                colSpan={7}
                                                className="px-6 py-10 text-center text-sm text-gray-500"
                                            >
                                                No application status history
                                                records found.
                                            </td>
                                        </tr>
                                    ) : (
                                        histories.map(
                                            (history) => (
                                                <tr
                                                    key={history.id}
                                                    className="hover:bg-gray-50"
                                                >

                                                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-600">
                                                        {history.id}
                                                    </td>

                                                    <td className="px-6 py-4 text-sm text-gray-700">
                                                        <div className="font-medium">
                                                            Application #
                                                            {history.application_id}
                                                        </div>

                                                        <div className="text-xs text-gray-500">
                                                            {history
                                                                .application
                                                                ?.candidate
                                                                ? `${history.application.candidate.first_name} ${history.application.candidate.last_name}`
                                                                : 'Candidate'}
                                                        </div>

                                                        <div className="text-xs text-gray-400">
                                                            {history
                                                                .application
                                                                ?.job_posting
                                                                ?.title ??
                                                                'Job Posting'}
                                                        </div>
                                                    </td>

                                                    <td className="whitespace-nowrap px-6 py-4">

                                                        <span
                                                            className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                                                                history.status ===
                                                                    'Selected' ||
                                                                history.status ===
                                                                    'Hired'
                                                                    ? 'bg-green-100 text-green-700'
                                                                    : history.status ===
                                                                        'Rejected'
                                                                      ? 'bg-red-100 text-red-700'
                                                                      : history.status ===
                                                                          'Interview'
                                                                        ? 'bg-purple-100 text-purple-700'
                                                                        : 'bg-blue-100 text-blue-700'
                                                            }`}
                                                        >
                                                            {history.status}
                                                        </span>

                                                    </td>

                                                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-700">
                                                        {history
                                                            .changedBy
                                                            ?.name ?? '—'}
                                                    </td>

                                                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-600">
                                                        {new Date(
                                                            history.changed_at
                                                        ).toLocaleString()}
                                                    </td>

                                                    <td className="max-w-xs px-6 py-4 text-sm text-gray-600">
                                                        {history.remarks ??
                                                            '—'}
                                                    </td>

                                                    <td className="whitespace-nowrap px-6 py-4 text-right">

                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                editHistory(
                                                                    history
                                                                )
                                                            }
                                                            className="mr-3 text-sm font-medium text-blue-600 hover:text-blue-800"
                                                        >
                                                            Edit
                                                        </button>

                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                deleteHistory(
                                                                    history.id
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
