import { FormEvent, useState } from 'react';
import { Head, router } from '@inertiajs/react';

type Candidate = {
    id: number;
    candidate_no: string;
    first_name: string;
    last_name: string;
};

type CandidateEducation = {
    id: number;
    candidate_id: number;
    qualification: string;
    institution: string;
    field_of_study: string | null;
    start_year: string | null;
    end_year: string | null;
    description: string | null;
    candidate?: Candidate;
};

type Props = {
    educations: CandidateEducation[];
    candidates: Candidate[];
};

export default function Index({
    educations,
    candidates,
}: Props) {
    const [editingEducation, setEditingEducation] =
        useState<CandidateEducation | null>(null);

    const [form, setForm] = useState({
        candidate_id: '',
        qualification: '',
        institution: '',
        field_of_study: '',
        start_year: '',
        end_year: '',
        description: '',
    });

    const resetForm = () => {
        setForm({
            candidate_id: '',
            qualification: '',
            institution: '',
            field_of_study: '',
            start_year: '',
            end_year: '',
            description: '',
        });

        setEditingEducation(null);
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        const data = {
            ...form,
            candidate_id: Number(form.candidate_id),
            field_of_study: form.field_of_study || null,
            start_year: form.start_year || null,
            end_year: form.end_year || null,
            description: form.description || null,
        };

        if (editingEducation) {
            router.put(
                `/candidate-education/${editingEducation.id}`,
                data,
                {
                    onSuccess: resetForm,
                }
            );
        } else {
            router.post('/candidate-education', data, {
                onSuccess: resetForm,
            });
        }
    };

    const handleEdit = (
        education: CandidateEducation
    ) => {
        setEditingEducation(education);

        setForm({
            candidate_id: String(education.candidate_id),
            qualification: education.qualification,
            institution: education.institution,
            field_of_study:
                education.field_of_study ?? '',
            start_year:
                education.start_year ?? '',
            end_year:
                education.end_year ?? '',
            description:
                education.description ?? '',
        });

        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    const handleDelete = (id: number) => {
        if (
            !confirm(
                'Are you sure you want to delete this education record?'
            )
        ) {
            return;
        }

        router.delete(`/candidate-education/${id}`);
    };

    const inputClass =
        'w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-800 placeholder-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100';

    const selectClass =
        'w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-800 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100';

    const optionClass =
        'bg-white text-slate-800';

    return (
        <>
            <Head title="Candidate Education" />

            <div className="min-h-screen bg-slate-50 p-6">
                <div className="mx-auto max-w-7xl space-y-6">

                    {/* Header */}
                    <div>
                        <h1 className="text-2xl font-bold text-slate-800">
                            Candidate Education
                        </h1>

                        <p className="mt-1 text-sm text-slate-500">
                            Manage educational qualifications of candidates.
                        </p>
                    </div>

                    {/* Form */}
                    <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-slate-200">

                        <div className="mb-5">
                            <h2 className="text-lg font-semibold text-slate-800">
                                {editingEducation
                                    ? 'Edit Education'
                                    : 'Add Education'}
                            </h2>

                            <p className="mt-1 text-sm text-slate-500">
                                Enter the candidate's educational background.
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

                            {/* Qualification */}
                            <div>
                                <label className="mb-1 block text-sm font-medium text-slate-700">
                                    Qualification
                                </label>

                                <input
                                    type="text"
                                    value={form.qualification}
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            qualification:
                                                e.target.value,
                                        })
                                    }
                                    required
                                    placeholder="e.g. BSc in Information Technology"
                                    className={inputClass}
                                />
                            </div>

                            {/* Institution */}
                            <div>
                                <label className="mb-1 block text-sm font-medium text-slate-700">
                                    Institution
                                </label>

                                <input
                                    type="text"
                                    value={form.institution}
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            institution:
                                                e.target.value,
                                        })
                                    }
                                    required
                                    placeholder="e.g. South Eastern University"
                                    className={inputClass}
                                />
                            </div>

                            {/* Field of Study */}
                            <div>
                                <label className="mb-1 block text-sm font-medium text-slate-700">
                                    Field of Study
                                </label>

                                <input
                                    type="text"
                                    value={form.field_of_study}
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            field_of_study:
                                                e.target.value,
                                        })
                                    }
                                    placeholder="e.g. Information Technology"
                                    className={inputClass}
                                />
                            </div>

                            {/* Start Year */}
                            <div>
                                <label className="mb-1 block text-sm font-medium text-slate-700">
                                    Start Year
                                </label>

                                <input
                                    type="text"
                                    value={form.start_year}
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            start_year:
                                                e.target.value,
                                        })
                                    }
                                    placeholder="e.g. 2022"
                                    className={inputClass}
                                />
                            </div>

                            {/* End Year */}
                            <div>
                                <label className="mb-1 block text-sm font-medium text-slate-700">
                                    End Year
                                </label>

                                <input
                                    type="text"
                                    value={form.end_year}
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            end_year:
                                                e.target.value,
                                        })
                                    }
                                    placeholder="e.g. 2026"
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
                                    placeholder="Enter additional education details..."
                                    className={inputClass}
                                />
                            </div>

                            {/* Buttons */}
                            <div className="flex gap-3 md:col-span-2">

                                <button
                                    type="submit"
                                    className="rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700"
                                >
                                    {editingEducation
                                        ? 'Update Education'
                                        : 'Add Education'}
                                </button>

                                {editingEducation && (
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

                    {/* Education List */}
                    <div className="overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-slate-200">

                        <div className="border-b border-slate-200 px-6 py-4">
                            <h2 className="text-lg font-semibold text-slate-800">
                                Education List
                            </h2>

                            <p className="mt-1 text-sm text-slate-500">
                                View and manage candidate education records.
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
                                            Qualification
                                        </th>

                                        <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                                            Institution
                                        </th>

                                        <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                                            Field
                                        </th>

                                        <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                                            Period
                                        </th>

                                        <th className="px-6 py-3 text-right text-xs font-semibold uppercase tracking-wider text-slate-500">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>

                                <tbody className="divide-y divide-slate-200 bg-white">

                                    {educations.length === 0 ? (
                                        <tr>
                                            <td
                                                colSpan={6}
                                                className="px-6 py-10 text-center text-sm text-slate-500"
                                            >
                                                No education records found.
                                            </td>
                                        </tr>
                                    ) : (
                                        educations.map((education) => (
                                            <tr
                                                key={education.id}
                                                className="hover:bg-slate-50"
                                            >

                                                {/* Candidate */}
                                                <td className="px-6 py-4">
                                                    <div className="font-medium text-slate-800">
                                                        {
                                                            education
                                                                .candidate
                                                                ?.first_name
                                                        }{' '}
                                                        {
                                                            education
                                                                .candidate
                                                                ?.last_name
                                                        }
                                                    </div>

                                                    <div className="mt-1 text-xs text-slate-500">
                                                        {
                                                            education
                                                                .candidate
                                                                ?.candidate_no
                                                        }
                                                    </div>
                                                </td>

                                                {/* Qualification */}
                                                <td className="px-6 py-4 text-sm text-slate-700">
                                                    {
                                                        education.qualification
                                                    }
                                                </td>

                                                {/* Institution */}
                                                <td className="px-6 py-4 text-sm text-slate-600">
                                                    {
                                                        education.institution
                                                    }
                                                </td>

                                                {/* Field */}
                                                <td className="px-6 py-4 text-sm text-slate-600">
                                                    {
                                                        education.field_of_study ??
                                                        '—'
                                                    }
                                                </td>

                                                {/* Period */}
                                                <td className="px-6 py-4 text-sm text-slate-600">
                                                    {education.start_year ||
                                                        '—'}{' '}
                                                    -{' '}
                                                    {education.end_year ||
                                                        '—'}
                                                </td>

                                                {/* Actions */}
                                                <td className="px-6 py-4 text-right">
                                                    <div className="flex justify-end gap-2">

                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                handleEdit(
                                                                    education
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
                                                                    education.id
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