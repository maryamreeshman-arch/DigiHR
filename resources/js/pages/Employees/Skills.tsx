import { Head, Link, useForm } from '@inertiajs/react';

type Employee = {
    id: number;
    employee_no: string;
};

type Skill = {
    id: number;
    name: string;
    category: string | null;
    status: string;
};

type EmployeeSkill = {
    id: number;
    level: string;
    years_experience: number;
    skill?: {
        name: string;
        category: string | null;
    };
};

type Props = {
    employee: Employee;
    employeeSkills: EmployeeSkill[];
    skills: Skill[];
};

export default function Skills({
    employee,
    employeeSkills,
    skills,
}: Props) {
    const { data, setData, post, processing, errors, reset } = useForm({
        skill_id: '',
        level: '',
        years_experience: '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();

        post(`/employees/${employee.id}/skills`, {
            onSuccess: () => {
                reset();
            },
        });
    };

    const deleteSkill = (employeeSkillId: number) => {
        if (!confirm('Are you sure you want to delete this skill?')) {
            return;
        }

        const form = document.createElement('form');

        form.method = 'POST';
        form.action = `/employees/${employee.id}/skills/${employeeSkillId}`;

        const csrfToken = document
            .querySelector('meta[name="csrf-token"]')
            ?.getAttribute('content');

        const csrfInput = document.createElement('input');
        csrfInput.type = 'hidden';
        csrfInput.name = '_token';
        csrfInput.value = csrfToken ?? '';

        const methodInput = document.createElement('input');
        methodInput.type = 'hidden';
        methodInput.name = '_method';
        methodInput.value = 'DELETE';

        form.appendChild(csrfInput);
        form.appendChild(methodInput);

        document.body.appendChild(form);
        form.submit();
    };

    return (
        <>
            <Head title="Employee Skills" />

            <div className="p-6">
                <div className="mb-6">
                    <Link
                        href="/employees"
                        className="text-sm text-blue-600"
                    >
                        ← Back to Employees
                    </Link>

                    <h1 className="mt-2 text-2xl font-bold">
                        Skills
                    </h1>

                    <p className="text-muted-foreground">
                        Employee: {employee.employee_no}
                    </p>
                </div>

                <div className="grid gap-6 lg:grid-cols-2">
                    {/* Add Skill */}
                    <form
                        onSubmit={submit}
                        className="space-y-5 rounded-lg border p-6"
                    >
                        <h2 className="text-lg font-semibold">
                            Add Skill
                        </h2>

                        {/* Skill */}
                        <div>
                            <label className="mb-1 block font-medium">
                                Skill
                            </label>

                            <select
                                value={data.skill_id}
                                onChange={(e) =>
                                    setData('skill_id', e.target.value)
                                }
                                className="w-full rounded border p-2"
                            >
                                <option value="">
                                    Select Skill
                                </option>

                                {skills.map((skill) => (
                                    <option
                                        key={skill.id}
                                        value={skill.id}
                                    >
                                        {skill.name}
                                        {skill.category
                                            ? ` (${skill.category})`
                                            : ''}
                                    </option>
                                ))}
                            </select>

                            {errors.skill_id && (
                                <p className="text-sm text-red-600">
                                    {errors.skill_id}
                                </p>
                            )}

                            {skills.length === 0 && (
                                <p className="mt-1 text-sm text-amber-600">
                                    No skills are available for this tenant.
                                    Add skills to the Skills master first.
                                </p>
                            )}
                        </div>

                        {/* Level */}
                        <div>
                            <label className="mb-1 block font-medium">
                                Skill Level
                            </label>

                            <select
                                value={data.level}
                                onChange={(e) =>
                                    setData('level', e.target.value)
                                }
                                className="w-full rounded border p-2"
                            >
                                <option value="">
                                    Select Level
                                </option>
                                <option value="beginner">
                                    Beginner
                                </option>
                                <option value="intermediate">
                                    Intermediate
                                </option>
                                <option value="advanced">
                                    Advanced
                                </option>
                                <option value="expert">
                                    Expert
                                </option>
                            </select>

                            {errors.level && (
                                <p className="text-sm text-red-600">
                                    {errors.level}
                                </p>
                            )}
                        </div>

                        {/* Years Experience */}
                        <div>
                            <label className="mb-1 block font-medium">
                                Years of Experience
                            </label>

                            <input
                                type="number"
                                min="0"
                                step="0.1"
                                value={data.years_experience}
                                onChange={(e) =>
                                    setData(
                                        'years_experience',
                                        e.target.value,
                                    )
                                }
                                placeholder="e.g. 2.5"
                                className="w-full rounded border p-2"
                            />

                            {errors.years_experience && (
                                <p className="text-sm text-red-600">
                                    {errors.years_experience}
                                </p>
                            )}
                        </div>

                        <button
                            type="submit"
                            disabled={processing || skills.length === 0}
                            className="rounded bg-black px-5 py-2 text-white disabled:opacity-50"
                        >
                            {processing ? 'Saving...' : 'Add Skill'}
                        </button>
                    </form>

                    {/* Existing Skills */}
                    <div className="rounded-lg border p-6">
                        <h2 className="mb-4 text-lg font-semibold">
                            Employee Skills
                        </h2>

                        {employeeSkills.length > 0 ? (
                            <div className="space-y-4">
                                {employeeSkills.map((employeeSkill) => (
                                    <div
                                        key={employeeSkill.id}
                                        className="rounded border p-4"
                                    >
                                        <div className="flex items-start justify-between gap-4">
                                            <div>
                                                <p className="font-semibold">
                                                    {employeeSkill.skill?.name ??
                                                        'Unknown Skill'}
                                                </p>

                                                {employeeSkill.skill?.category && (
                                                    <p className="text-sm text-muted-foreground">
                                                        {
                                                            employeeSkill.skill
                                                                .category
                                                        }
                                                    </p>
                                                )}
                                            </div>

                                            <button
                                                type="button"
                                                onClick={() =>
                                                    deleteSkill(
                                                        employeeSkill.id,
                                                    )
                                                }
                                                className="text-sm text-red-600"
                                            >
                                                Delete
                                            </button>
                                        </div>

                                        <div className="mt-3 space-y-1 text-sm">
                                            <p>
                                                <strong>Level:</strong>{' '}
                                                {employeeSkill.level}
                                            </p>

                                            <p>
                                                <strong>
                                                    Years Experience:
                                                </strong>{' '}
                                                {employeeSkill.years_experience}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-muted-foreground">
                                No skills added yet.
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}