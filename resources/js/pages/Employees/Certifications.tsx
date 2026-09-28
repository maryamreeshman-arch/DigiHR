import { Head, Link, useForm } from '@inertiajs/react';

type Employee = {
    id: number;
    employee_no: string;
};

type Certification = {
    id: number;
    name: string;
    issuing_authority: string | null;
};

type EmployeeCertification = {
    id: number;
    certificate_no: string | null;
    issue_date: string;
    expiry_date: string | null;
    file_path: string | null;
    certification?: {
        name: string;
        issuing_authority: string | null;
    };
};

type Props = {
    employee: Employee;
    employeeCertifications: EmployeeCertification[];
    certifications: Certification[];
};

export default function Certifications({
    employee,
    employeeCertifications,
    certifications,
}: Props) {
    const { data, setData, post, processing, errors, reset } = useForm({
        certification_id: '',
        certificate_no: '',
        issue_date: '',
        expiry_date: '',
        file_path: '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();

        post(`/employees/${employee.id}/certifications`, {
            onSuccess: () => {
                reset();
            },
        });
    };

    const deleteCertification = (employeeCertificationId: number) => {
        if (
            !confirm(
                'Are you sure you want to delete this certification?',
            )
        ) {
            return;
        }

        const form = document.createElement('form');

        form.method = 'POST';
        form.action = `/employees/${employee.id}/certifications/${employeeCertificationId}`;

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
            <Head title="Employee Certifications" />

            <div className="p-6">
                <div className="mb-6">
                    <Link
                        href="/employees"
                        className="text-sm text-blue-600"
                    >
                        ← Back to Employees
                    </Link>

                    <h1 className="mt-2 text-2xl font-bold">
                        Certifications
                    </h1>

                    <p className="text-muted-foreground">
                        Employee: {employee.employee_no}
                    </p>
                </div>

                <div className="grid gap-6 lg:grid-cols-2">
                    {/* Add Certification */}
                    <form
                        onSubmit={submit}
                        className="space-y-5 rounded-lg border p-6"
                    >
                        <h2 className="text-lg font-semibold">
                            Add Certification
                        </h2>

                        {/* Certification */}
                        <div>
                            <label className="mb-1 block font-medium">
                                Certification
                            </label>

                            <select
                                value={data.certification_id}
                                onChange={(e) =>
                                    setData(
                                        'certification_id',
                                        e.target.value,
                                    )
                                }
                                className="w-full rounded border p-2"
                                disabled={certifications.length === 0}
                            >
                                <option value="">
                                    Select Certification
                                </option>

                                {certifications.map((certification) => (
                                    <option
                                        key={certification.id}
                                        value={certification.id}
                                    >
                                        {certification.name}
                                        {certification.issuing_authority
                                            ? ` - ${certification.issuing_authority}`
                                            : ''}
                                    </option>
                                ))}
                            </select>

                            {errors.certification_id && (
                                <p className="text-sm text-red-600">
                                    {errors.certification_id}
                                </p>
                            )}

                            {certifications.length === 0 && (
                                <p className="mt-1 text-sm text-amber-600">
                                    No certifications are available for this
                                    tenant. Add certifications to the
                                    Certifications master first.
                                </p>
                            )}
                        </div>

                        {/* Certificate Number */}
                        <div>
                            <label className="mb-1 block font-medium">
                                Certificate No
                            </label>

                            <input
                                type="text"
                                value={data.certificate_no}
                                onChange={(e) =>
                                    setData(
                                        'certificate_no',
                                        e.target.value,
                                    )
                                }
                                placeholder="e.g. CERT-001"
                                className="w-full rounded border p-2"
                            />

                            {errors.certificate_no && (
                                <p className="text-sm text-red-600">
                                    {errors.certificate_no}
                                </p>
                            )}
                        </div>

                        {/* Issue Date */}
                        <div>
                            <label className="mb-1 block font-medium">
                                Issue Date
                            </label>

                            <input
                                type="date"
                                value={data.issue_date}
                                onChange={(e) =>
                                    setData(
                                        'issue_date',
                                        e.target.value,
                                    )
                                }
                                className="w-full rounded border p-2"
                            />

                            {errors.issue_date && (
                                <p className="text-sm text-red-600">
                                    {errors.issue_date}
                                </p>
                            )}
                        </div>

                        {/* Expiry Date */}
                        <div>
                            <label className="mb-1 block font-medium">
                                Expiry Date
                            </label>

                            <input
                                type="date"
                                value={data.expiry_date}
                                onChange={(e) =>
                                    setData(
                                        'expiry_date',
                                        e.target.value,
                                    )
                                }
                                className="w-full rounded border p-2"
                            />

                            {errors.expiry_date && (
                                <p className="text-sm text-red-600">
                                    {errors.expiry_date}
                                </p>
                            )}
                        </div>

                        {/* File Path */}
                        <div>
                            <label className="mb-1 block font-medium">
                                File Path
                            </label>

                            <input
                                type="text"
                                value={data.file_path}
                                onChange={(e) =>
                                    setData(
                                        'file_path',
                                        e.target.value,
                                    )
                                }
                                placeholder="e.g. certifications/aws-cert.pdf"
                                className="w-full rounded border p-2"
                            />

                            <p className="mt-1 text-xs text-muted-foreground">
                                For now, store the certificate file path.
                            </p>
                        </div>

                        <button
                            type="submit"
                            disabled={
                                processing || certifications.length === 0
                            }
                            className="rounded bg-black px-5 py-2 text-white disabled:opacity-50"
                        >
                            {processing
                                ? 'Saving...'
                                : 'Add Certification'}
                        </button>
                    </form>

                    {/* Existing Certifications */}
                    <div className="rounded-lg border p-6">
                        <h2 className="mb-4 text-lg font-semibold">
                            Employee Certifications
                        </h2>

                        {employeeCertifications.length > 0 ? (
                            <div className="space-y-4">
                                {employeeCertifications.map((item) => (
                                    <div
                                        key={item.id}
                                        className="rounded border p-4"
                                    >
                                        <div className="flex items-start justify-between gap-4">
                                            <div>
                                                <p className="font-semibold">
                                                    {item.certification?.name ??
                                                        'Unknown Certification'}
                                                </p>

                                                <p className="text-sm text-muted-foreground">
                                                    {item.certification
                                                        ?.issuing_authority ??
                                                        'Issuing authority not available'}
                                                </p>
                                            </div>

                                            <button
                                                type="button"
                                                onClick={() =>
                                                    deleteCertification(
                                                        item.id,
                                                    )
                                                }
                                                className="text-sm text-red-600"
                                            >
                                                Delete
                                            </button>
                                        </div>

                                        <div className="mt-3 space-y-1 text-sm">
                                            <p>
                                                <strong>
                                                    Certificate No:
                                                </strong>{' '}
                                                {item.certificate_no ?? '-'}
                                            </p>

                                            <p>
                                                <strong>Issue Date:</strong>{' '}
                                                {item.issue_date}
                                            </p>

                                            <p>
                                                <strong>Expiry Date:</strong>{' '}
                                                {item.expiry_date ??
                                                    'No expiry'}
                                            </p>

                                            <p>
                                                <strong>File:</strong>{' '}
                                                {item.file_path ?? '-'}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-muted-foreground">
                                No certifications added yet.
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}