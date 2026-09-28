import { Head, Link, useForm } from '@inertiajs/react';

type Employee = {
    id: number;
    employee_no: string;
};

type Experience = {
    id: number;
    company_name: string;
    position: string;
    start_date: string;
    end_date: string | null;
    description: string | null;
};

type Props = {
    employee: Employee;
    experiences: Experience[];
};

export default function Experience({
    employee,
    experiences,
}: Props) {
    const { data, setData, post, processing, errors, reset } = useForm({
        company_name: '',
        position: '',
        start_date: '',
        end_date: '',
        description: '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();

        post(`/employees/${employee.id}/experience`, {
            onSuccess: () => {
                reset();
            },
        });
    };

    const deleteExperience = (experienceId: number) => {
        if (
            !confirm(
                'Are you sure you want to delete this experience record?',
            )
        ) {
            return;
        }

        const form = document.createElement('form');

        form.method = 'POST';
        form.action = `/employees/${employee.id}/experience/${experienceId}`;

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
            <Head title="Employee Experience" />

            <div className="p-6">
                <div className="mb-6">
                    <Link
                        href="/employees"
                        className="text-sm text-blue-600"
                    >
                        ← Back to Employees
                    </Link>

                    <h1 className="mt-2 text-2xl font-bold">
                        Experience
                    </h1>

                    <p className="text-muted-foreground">
                        Employee: {employee.employee_no}
                    </p>
                </div>

                <div className="grid gap-6 lg:grid-cols-2">
                    {/* Add Experience */}
                    <form
                        onSubmit={submit}
                        className="space-y-5 rounded-lg border p-6"
                    >
                        <h2 className="text-lg font-semibold">
                            Add Experience
                        </h2>

                        {/* Company Name */}
                        <div>
                            <label className="mb-1 block font-medium">
                                Company Name
                            </label>

                            <input
                                type="text"
                                value={data.company_name}
                                onChange={(e) =>
                                    setData(
                                        'company_name',
                                        e.target.value,
                                    )
                                }
                                placeholder="e.g. ABC Technologies"
                                className="w-full rounded border p-2"
                            />

                            {errors.company_name && (
                                <p className="text-sm text-red-600">
                                    {errors.company_name}
                                </p>
                            )}
                        </div>

                        {/* Position */}
                        <div>
                            <label className="mb-1 block font-medium">
                                Position
                            </label>

                            <input
                                type="text"
                                value={data.position}
                                onChange={(e) =>
                                    setData('position', e.target.value)
                                }
                                placeholder="e.g. Software Engineer"
                                className="w-full rounded border p-2"
                            />

                            {errors.position && (
                                <p className="text-sm text-red-600">
                                    {errors.position}
                                </p>
                            )}
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
                                    setData('start_date', e.target.value)
                                }
                                className="w-full rounded border p-2"
                            />

                            {errors.start_date && (
                                <p className="text-sm text-red-600">
                                    {errors.start_date}
                                </p>
                            )}
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
                                    setData('end_date', e.target.value)
                                }
                                className="w-full rounded border p-2"
                            />

                            {errors.end_date && (
                                <p className="text-sm text-red-600">
                                    {errors.end_date}
                                </p>
                            )}

                            <p className="mt-1 text-xs text-muted-foreground">
                                Leave blank if this is the current job.
                            </p>
                        </div>

                        {/* Description */}
                        <div>
                            <label className="mb-1 block font-medium">
                                Description
                            </label>

                            <textarea
                                value={data.description}
                                onChange={(e) =>
                                    setData(
                                        'description',
                                        e.target.value,
                                    )
                                }
                                rows={4}
                                placeholder="Describe responsibilities, projects, achievements..."
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
                                : 'Add Experience'}
                        </button>
                    </form>

                    {/* Existing Experience */}
                    <div className="rounded-lg border p-6">
                        <h2 className="mb-4 text-lg font-semibold">
                            Experience History
                        </h2>

                        {experiences.length > 0 ? (
                            <div className="space-y-4">
                                {experiences.map((experience) => (
                                    <div
                                        key={experience.id}
                                        className="rounded border p-4"
                                    >
                                        <div className="flex items-start justify-between gap-4">
                                            <div>
                                                <p className="font-semibold">
                                                    {experience.position}
                                                </p>

                                                <p className="text-sm text-muted-foreground">
                                                    {experience.company_name}
                                                </p>
                                            </div>

                                            <button
                                                type="button"
                                                onClick={() =>
                                                    deleteExperience(
                                                        experience.id,
                                                    )
                                                }
                                                className="text-sm text-red-600"
                                            >
                                                Delete
                                            </button>
                                        </div>

                                        <div className="mt-3 space-y-1 text-sm">
                                            <p>
                                                <strong>Start:</strong>{' '}
                                                {experience.start_date}
                                            </p>

                                            <p>
                                                <strong>End:</strong>{' '}
                                                {experience.end_date ??
                                                    'Present'}
                                            </p>

                                            <p>
                                                <strong>Description:</strong>{' '}
                                                {experience.description ??
                                                    '-'}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-muted-foreground">
                                No experience records added yet.
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}