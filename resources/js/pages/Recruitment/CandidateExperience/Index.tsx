import { FormEvent, useState } from 'react';
import { Head, router } from '@inertiajs/react';

type Candidate = {
    id: number;
    candidate_no: string;
    first_name: string;
    last_name: string;
};

type CandidateExperience = {
    id: number;
    candidate_id: number;
    company: string;
    position: string;
    start_date: string | null;
    end_date: string | null;
    description: string | null;
    candidate?: Candidate;
};

type Props = {
    experiences: CandidateExperience[];
    candidates: Candidate[];
};

export default function Index({
    experiences,
    candidates,
}: Props) {
    const [editingExperience, setEditingExperience] =
        useState<CandidateExperience | null>(null);

    const [form, setForm] = useState({
        candidate_id: '',
        company: '',
        position: '',
        start_date: '',
        end_date: '',
        description: '',
    });

    const resetForm = () => {
        setForm({
            candidate_id: '',
            company: '',
            position: '',
            start_date: '',
            end_date: '',
            description: '',
        });

        setEditingExperience(null);
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        const data = {
            ...form,
            candidate_id: Number(form.candidate_id),
            start_date: form.start_date || null,
            end_date: form.end_date || null,
            description: form.description || null,
        };

        if (editingExperience) {
            router.put(
                `/candidate-experience/${editingExperience.id}`,
                data,
                {
                    onSuccess: resetForm,
                }
            );
        } else {
            router.post('/candidate-experience', data, {
                onSuccess: resetForm,
            });
        }
    };

    const handleEdit = (
        experience: CandidateExperience
    ) => {
        setEditingExperience(experience);

        setForm({
            candidate_id: String(experience.candidate_id),
            company: experience.company,
            position: experience.position,
            start_date: experience.start_date
                ? experience.start_date.slice(0, 10)
                : '',
            end_date: experience.end_date
                ? experience.end_date.slice(0, 10)
                : '',
            description:
                experience.description ?? '',
        });

        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    const handleDelete = (id: number) => {
        if (
            !confirm(
                'Are you sure you want to delete this experience record?'
            )
        ) {
            return;
        }

        router.delete(`/candidate-experience/${id}`);
    };

    const inputClass =
        'w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-800 placeholder-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100';

    const selectClass =
        'w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-800 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100';

    const optionClass =
        'bg-white text-slate-800';

    return (
        <>
            <Head title="Candidate Experience" />

            <div className="min-h-screen bg-slate-50 p-6">
                <div className="mx-auto max-w-7xl space-y-6">

                    {/* Header */}
                    <div>
                        <h1 className="text-2xl font-bold text-slate-800">
                            Candidate Experience
                        </h1>

                        <p className="mt-1 text-sm text-slate-500">
                            Manage previous work experience of candidates.
                        </p>
                    </div>

                    {/* Form */}
                    <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-slate-200">

                        <div className="mb-5">
                            <h2 className="text-lg font-semibold text-slate-800">
                                {editingExperience
                                    ? 'Edit Experience'
                                    : 'Add Experience'}
                            </h2>

                            <p className="mt-1 text-sm text-slate-500">
                                Enter the candidate's previous employment details.
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

                            {/* Company */}
                            <div>
                                <label className="mb-1 block text-sm font-medium text-slate-700">
                                    Company
                                </label>

                                <input
                                    type="text"
                                    value={form.company}
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            company: e.target.value,
                                        })
                                    }
                                    required
                                    placeholder="e.g. ABC Technologies"
                                    className={inputClass}
                                />
                            </div>

                            {/* Position */}
                            <div>
                                <label className="mb-1 block text-sm font-medium text-slate-700">
                                    Position
                                </label>

                                <input
                                    type="text"
                                    value={form.position}
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            position: e.target.value,
                                        })
                                    }
                                    required
                                    placeholder="e.g. Software Developer"
                                    className={inputClass}
                                />
                            </div>

                            {/* Start Date */}
                            <div>
                                <label className="mb-1 block text-sm font-medium text-slate-700">
                                    Start Date
                                </label>

                                <input
                                    type="date"
                                    value={form.start_date}
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            start_date: e.target.value,
                                        })
                                    }
                                    className={inputClass}
                                />
                            </div>

                            {/* End Date */}
                            <div>
                                <label className="mb-1 block text-sm font-medium text-slate-700">
                                    End Date
                                </label>

                                <input
                                    type="date"
                                    value={form.end_date}
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            end_date: e.target.value,
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
                                            description:
                                                e.target.value,
                                        })
                                    }
                                    rows={4}
                                    placeholder="Describe responsibilities, achievements, technologies used, etc."
                                    className={inputClass}
                                />
                            </div>

                            {/* Buttons */}
                            <div className="flex gap-3 md:col-span-2">

                                <button
                                    type="submit"
                                    className="rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700"
                                >
                                    {editingExperience
                                        ? 'Update Experience'
                                        : 'Add Experience'}
                                </button>

                                {editingExperience && (
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

                    {/* Experience List */}
                    <div className="overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-slate-200">

                        <div className="border-b border-slate-200 px-6 py-4">
                            <h2 className="text-lg font-semibold text-slate-800">
                                Experience List
                            </h2>

                            <p className="mt-1 text-sm text-slate-500">
                                View and manage candidate work experience.
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
                                            Company
                                        </th>

                                        <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                                            Position
                                        </th>

                                        <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                                            Period
                                        </th>

                                        <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                                            Description
                                        </th>

                                        <th className="px-6 py-3 text-right text-xs font-semibold uppercase tracking-wider text-slate-500">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>

                                <tbody className="divide-y divide-slate-200 bg-white">

                                    {experiences.length === 0 ? (
                                        <tr>
                                            <td
                                                colSpan={6}
                                                className="px-6 py-10 text-center text-sm text-slate-500"
                                            >
                                                No experience records found.
                                            </td>
                                        </tr>
                                    ) : (
                                        experiences.map((experience) => (
                                            <tr
                                                key={experience.id}
                                                className="hover:bg-slate-50"
                                            >

                                                {/* Candidate */}
                                                <td className="px-6 py-4">
                                                    <div className="font-medium text-slate-800">
                                                        {
                                                            experience
                                                                .candidate
                                                                ?.first_name
                                                        }{' '}
                                                        {
                                                            experience
                                                                .candidate
                                                                ?.last_name
                                                        }
                                                    </div>

                                                    <div className="mt-1 text-xs text-slate-500">
                                                        {
                                                            experience
                                                                .candidate
                                                                ?.candidate_no
                                                        }
                                                    </div>
                                                </td>

                                                {/* Company */}
                                                <td className="px-6 py-4 text-sm text-slate-700">
                                                    {experience.company}
                                                </td>

                                                {/* Position */}
                                                <td className="px-6 py-4 text-sm text-slate-600">
                                                    {experience.position}
                                                </td>

                                                {/* Period */}
                                                <td className="px-6 py-4 text-sm text-slate-600">
                                                    {experience.start_date
                                                        ? experience.start_date.slice(
                                                              0,
                                                              10
                                                          )
                                                        : '—'}{' '}
                                                    -{' '}
                                                    {experience.end_date
                                                        ? experience.end_date.slice(
                                                              0,
                                                              10
                                                          )
                                                        : 'Present'}
                                                </td>

                                                {/* Description */}
                                                <td className="max-w-xs px-6 py-4 text-sm text-slate-600">
                                                    <div className="line-clamp-2">
                                                        {experience.description ||
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
                                                                    experience
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
                                                                    experience.id
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