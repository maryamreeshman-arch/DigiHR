import { FormEvent, useState } from 'react';
import { Head, router } from '@inertiajs/react';

type Candidate = {
    id: number;
    candidate_no: string;
    first_name: string;
    last_name: string;
};

type CandidateSkill = {
    id: number;
    candidate_id: number;
    skill: string;
    proficiency: string | null;
    description: string | null;
    candidate?: Candidate;
};

type Props = {
    skills: CandidateSkill[];
    candidates: Candidate[];
};

export default function Index({
    skills,
    candidates,
}: Props) {
    const [editingSkill, setEditingSkill] =
        useState<CandidateSkill | null>(null);

    const [form, setForm] = useState({
        candidate_id: '',
        skill: '',
        proficiency: '',
        description: '',
    });

    const resetForm = () => {
        setForm({
            candidate_id: '',
            skill: '',
            proficiency: '',
            description: '',
        });

        setEditingSkill(null);
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        const data = {
            ...form,
            candidate_id: Number(form.candidate_id),
            proficiency: form.proficiency || null,
            description: form.description || null,
        };

        if (editingSkill) {
            router.put(
                `/candidate-skills/${editingSkill.id}`,
                data,
                {
                    onSuccess: resetForm,
                }
            );
        } else {
            router.post('/candidate-skills', data, {
                onSuccess: resetForm,
            });
        }
    };

    const handleEdit = (skill: CandidateSkill) => {
        setEditingSkill(skill);

        setForm({
            candidate_id: String(skill.candidate_id),
            skill: skill.skill,
            proficiency: skill.proficiency ?? '',
            description: skill.description ?? '',
        });

        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    const handleDelete = (id: number) => {
        if (
            !confirm(
                'Are you sure you want to delete this skill record?'
            )
        ) {
            return;
        }

        router.delete(`/candidate-skills/${id}`);
    };

    const inputClass =
        'w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-800 placeholder-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100';

    const selectClass =
        'w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-800 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100';

    const optionClass =
        'bg-white text-slate-800';

    return (
        <>
            <Head title="Candidate Skills" />

            <div className="min-h-screen bg-slate-50 p-6">
                <div className="mx-auto max-w-7xl space-y-6">

                    {/* Header */}
                    <div>
                        <h1 className="text-2xl font-bold text-slate-800">
                            Candidate Skills
                        </h1>

                        <p className="mt-1 text-sm text-slate-500">
                            Manage skills and proficiency levels of candidates.
                        </p>
                    </div>

                    {/* Form */}
                    <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-slate-200">

                        <div className="mb-5">
                            <h2 className="text-lg font-semibold text-slate-800">
                                {editingSkill
                                    ? 'Edit Skill'
                                    : 'Add Skill'}
                            </h2>

                            <p className="mt-1 text-sm text-slate-500">
                                Enter the candidate's skill information.
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

                            {/* Skill */}
                            <div>
                                <label className="mb-1 block text-sm font-medium text-slate-700">
                                    Skill
                                </label>

                                <input
                                    type="text"
                                    value={form.skill}
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            skill: e.target.value,
                                        })
                                    }
                                    required
                                    placeholder="e.g. Laravel"
                                    className={inputClass}
                                />
                            </div>

                            {/* Proficiency */}
                            <div>
                                <label className="mb-1 block text-sm font-medium text-slate-700">
                                    Proficiency
                                </label>

                                <select
                                    value={form.proficiency}
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            proficiency: e.target.value,
                                        })
                                    }
                                    className={selectClass}
                                >
                                    <option
                                        value=""
                                        className={optionClass}
                                    >
                                        Select Proficiency
                                    </option>

                                    <option
                                        value="Beginner"
                                        className={optionClass}
                                    >
                                        Beginner
                                    </option>

                                    <option
                                        value="Intermediate"
                                        className={optionClass}
                                    >
                                        Intermediate
                                    </option>

                                    <option
                                        value="Advanced"
                                        className={optionClass}
                                    >
                                        Advanced
                                    </option>

                                    <option
                                        value="Expert"
                                        className={optionClass}
                                    >
                                        Expert
                                    </option>
                                </select>
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
                                    placeholder="Describe the candidate's experience or knowledge in this skill."
                                    className={inputClass}
                                />
                            </div>

                            {/* Buttons */}
                            <div className="flex gap-3 md:col-span-2">

                                <button
                                    type="submit"
                                    className="rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700"
                                >
                                    {editingSkill
                                        ? 'Update Skill'
                                        : 'Add Skill'}
                                </button>

                                {editingSkill && (
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

                    {/* Skills List */}
                    <div className="overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-slate-200">

                        <div className="border-b border-slate-200 px-6 py-4">
                            <h2 className="text-lg font-semibold text-slate-800">
                                Skills List
                            </h2>

                            <p className="mt-1 text-sm text-slate-500">
                                View and manage candidate skills.
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
                                            Skill
                                        </th>

                                        <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                                            Proficiency
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

                                    {skills.length === 0 ? (
                                        <tr>
                                            <td
                                                colSpan={5}
                                                className="px-6 py-10 text-center text-sm text-slate-500"
                                            >
                                                No skill records found.
                                            </td>
                                        </tr>
                                    ) : (
                                        skills.map((skill) => (
                                            <tr
                                                key={skill.id}
                                                className="hover:bg-slate-50"
                                            >

                                                {/* Candidate */}
                                                <td className="px-6 py-4">
                                                    <div className="font-medium text-slate-800">
                                                        {
                                                            skill
                                                                .candidate
                                                                ?.first_name
                                                        }{' '}
                                                        {
                                                            skill
                                                                .candidate
                                                                ?.last_name
                                                        }
                                                    </div>

                                                    <div className="mt-1 text-xs text-slate-500">
                                                        {
                                                            skill
                                                                .candidate
                                                                ?.candidate_no
                                                        }
                                                    </div>
                                                </td>

                                                {/* Skill */}
                                                <td className="px-6 py-4 text-sm font-medium text-slate-700">
                                                    {skill.skill}
                                                </td>

                                                {/* Proficiency */}
                                                <td className="px-6 py-4 text-sm text-slate-600">
                                                    {skill.proficiency || '—'}
                                                </td>

                                                {/* Description */}
                                                <td className="max-w-md px-6 py-4 text-sm text-slate-600">
                                                    <div className="line-clamp-2">
                                                        {skill.description ||
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
                                                                    skill
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
                                                                    skill.id
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