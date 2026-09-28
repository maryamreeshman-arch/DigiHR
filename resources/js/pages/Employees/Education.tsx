import { Head, Link, useForm } from '@inertiajs/react';

type Employee = {
    id: number;
    employee_no: string;
};

type EducationLevel = {
    id: number;
    name: string;
    code: string;
};

type Education = {
    id: number;
    institution: string;
    qualification: string;
    field_of_study: string | null;
    start_date: string | null;
    end_date: string | null;
    grade: string | null;
    certificate_path: string | null;
    education_level?: {
        name: string;
        code: string;
    };
};

type Props = {
    employee: Employee;
    education: Education[];
    educationLevels: EducationLevel[];
};

export default function Education({
    employee,
    education,
    educationLevels,
}: Props) {
    const { data, setData, post, processing, errors, reset } = useForm({
        education_level_id: '',
        institution: '',
        qualification: '',
        field_of_study: '',
        start_date: '',
        end_date: '',
        grade: '',
        certificate_path: '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();

        post(`/employees/${employee.id}/education`, {
            onSuccess: () => {
                reset();
            },
        });
    };

    const deleteEducation = (educationId: number) => {
        if (!confirm('Are you sure you want to delete this education record?')) {
            return;
        }

        const form = document.createElement('form');

        form.method = 'POST';
        form.action = `/employees/${employee.id}/education/${educationId}`;

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
            <Head title="Employee Education" />

            <div className="p-6">
                <div className="mb-6">
                    <Link
                        href="/employees"
                        className="text-sm text-blue-600"
                    >
                        ← Back to Employees
                    </Link>

                    <h1 className="mt-2 text-2xl font-bold">
                        Education
                    </h1>

                    <p className="text-muted-foreground">
                        Employee: {employee.employee_no}
                    </p>
                </div>

                <div className="grid gap-6 lg:grid-cols-2">
                    {/* Add Education */}
                    <form
                        onSubmit={submit}
                        className="space-y-5 rounded-lg border p-6"
                    >
                        <h2 className="text-lg font-semibold">
                            Add Education
                        </h2>

                        {/* Education Level */}
                        <div>
                            <label className="mb-1 block font-medium">
                                Education Level
                            </label>

                            <select
                                value={data.education_level_id}
                                onChange={(e) =>
                                    setData(
                                        'education_level_id',
                                        e.target.value,
                                    )
                                }
                                className="w-full rounded border p-2"
                            >
                                <option value="">
                                    Select Education Level
                                </option>

                                {educationLevels.map((level) => (
                                    <option
                                        key={level.id}
                                        value={level.id}
                                    >
                                        {level.name}
                                    </option>
                                ))}
                            </select>

                            {errors.education_level_id && (
                                <p className="text-sm text-red-600">
                                    {errors.education_level_id}
                                </p>
                            )}
                        </div>

                        {/* Institution */}
                        <div>
                            <label className="mb-1 block font-medium">
                                Institution
                            </label>

                            <input
                                type="text"
                                value={data.institution}
                                onChange={(e) =>
                                    setData(
                                        'institution',
                                        e.target.value,
                                    )
                                }
                                placeholder="e.g. South Eastern University"
                                className="w-full rounded border p-2"
                            />

                            {errors.institution && (
                                <p className="text-sm text-red-600">
                                    {errors.institution}
                                </p>
                            )}
                        </div>

                        {/* Qualification */}
                        <div>
                            <label className="mb-1 block font-medium">
                                Qualification
                            </label>

                            <input
                                type="text"
                                value={data.qualification}
                                onChange={(e) =>
                                    setData(
                                        'qualification',
                                        e.target.value,
                                    )
                                }
                                placeholder="e.g. BSc in ICT"
                                className="w-full rounded border p-2"
                            />

                            {errors.qualification && (
                                <p className="text-sm text-red-600">
                                    {errors.qualification}
                                </p>
                            )}
                        </div>

                        {/* Field of Study */}
                        <div>
                            <label className="mb-1 block font-medium">
                                Field of Study
                            </label>

                            <input
                                type="text"
                                value={data.field_of_study}
                                onChange={(e) =>
                                    setData(
                                        'field_of_study',
                                        e.target.value,
                                    )
                                }
                                placeholder="e.g. Information Technology"
                                className="w-full rounded border p-2"
                            />
                        </div>

                        {/* Start Date */}
                        <div>
                            <label className="mb-1 block font-medium">
                                Start Date
                            </label>

                            <input
                                type="date"
                                value={data.start_date}
                                onChange={(e) =>
                                    setData(
                                        'start_date',
                                        e.target.value,
                                    )
                                }
                                className="w-full rounded border p-2"
                            />
                        </div>

                        {/* End Date */}
                        <div>
                            <label className="mb-1 block font-medium">
                                End Date
                            </label>

                            <input
                                type="date"
                                value={data.end_date}
                                onChange={(e) =>
                                    setData(
                                        'end_date',
                                        e.target.value,
                                    )
                                }
                                className="w-full rounded border p-2"
                            />

                            {errors.end_date && (
                                <p className="text-sm text-red-600">
                                    {errors.end_date}
                                </p>
                            )}
                        </div>

                        {/* Grade */}
                        <div>
                            <label className="mb-1 block font-medium">
                                Grade
                            </label>

                            <input
                                type="text"
                                value={data.grade}
                                onChange={(e) =>
                                    setData('grade', e.target.value)
                                }
                                placeholder="e.g. First Class / 4.0 GPA"
                                className="w-full rounded border p-2"
                            />
                        </div>

                        {/* Certificate Path */}
                        <div>
                            <label className="mb-1 block font-medium">
                                Certificate Path
                            </label>

                            <input
                                type="text"
                                value={data.certificate_path}
                                onChange={(e) =>
                                    setData(
                                        'certificate_path',
                                        e.target.value,
                                    )
                                }
                                placeholder="e.g. certificates/degree.pdf"
                                className="w-full rounded border p-2"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={processing}
                            className="rounded bg-black px-5 py-2 text-white"
                        >
                            {processing
                                ? 'Saving...'
                                : 'Add Education'}
                        </button>
                    </form>

                    {/* Existing Education */}
                    <div className="rounded-lg border p-6">
                        <h2 className="mb-4 text-lg font-semibold">
                            Education History
                        </h2>

                        {education.length > 0 ? (
                            <div className="space-y-4">
                                {education.map((item) => (
                                    <div
                                        key={item.id}
                                        className="rounded border p-4"
                                    >
                                        <div className="flex items-start justify-between gap-4">
                                            <div>
                                                <p className="font-semibold">
                                                    {item.qualification}
                                                </p>

                                                <p className="text-sm text-muted-foreground">
                                                    {item.institution}
                                                </p>

                                                <p className="mt-1 text-sm">
                                                    <strong>
                                                        Education Level:
                                                    </strong>{' '}
                                                    {item.education_level
                                                        ?.name ?? '-'}
                                                </p>
                                            </div>

                                            <button
                                                type="button"
                                                onClick={() =>
                                                    deleteEducation(item.id)
                                                }
                                                className="text-sm text-red-600"
                                            >
                                                Delete
                                            </button>
                                        </div>

                                        <div className="mt-3 space-y-1 text-sm">
                                            <p>
                                                <strong>Field:</strong>{' '}
                                                {item.field_of_study ?? '-'}
                                            </p>

                                            <p>
                                                <strong>Start:</strong>{' '}
                                                {item.start_date ?? '-'}
                                            </p>

                                            <p>
                                                <strong>End:</strong>{' '}
                                                {item.end_date ?? '-'}
                                            </p>

                                            <p>
                                                <strong>Grade:</strong>{' '}
                                                {item.grade ?? '-'}
                                            </p>

                                            <p>
                                                <strong>Certificate:</strong>{' '}
                                                {item.certificate_path ?? '-'}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-muted-foreground">
                                No education records added yet.
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}