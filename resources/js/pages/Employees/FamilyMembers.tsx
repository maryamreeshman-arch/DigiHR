import { Head, Link, useForm } from '@inertiajs/react';

type Employee = {
    id: number;
    employee_no: string;
};

type FamilyMember = {
    id: number;
    name: string;
    relationship: string;
    date_of_birth: string | null;
    gender: string | null;
    occupation: string | null;
    phone: string | null;
    is_dependent: boolean;
};

type Props = {
    employee: Employee;
    familyMembers: FamilyMember[];
};

export default function FamilyMembers({
    employee,
    familyMembers,
}: Props) {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        relationship: '',
        date_of_birth: '',
        gender: '',
        occupation: '',
        phone: '',
        is_dependent: false,
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();

        post(`/employees/${employee.id}/family-members`, {
            onSuccess: () => {
                reset();
                setData('is_dependent', false);
            },
        });
    };

    const deleteMember = (memberId: number) => {
        if (!confirm('Are you sure you want to delete this family member?')) {
            return;
        }

        const form = document.createElement('form');

        form.method = 'POST';
        form.action = `/employees/${employee.id}/family-members/${memberId}`;

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
            <Head title="Family Members" />

            <div className="p-6">
                <div className="mb-6">
                    <Link
                        href="/employees"
                        className="text-sm text-blue-600"
                    >
                        ← Back to Employees
                    </Link>

                    <h1 className="mt-2 text-2xl font-bold">
                        Family Members
                    </h1>

                    <p className="text-muted-foreground">
                        Employee: {employee.employee_no}
                    </p>
                </div>

                <div className="grid gap-6 lg:grid-cols-2">
                    {/* Add Family Member */}
                    <form
                        onSubmit={submit}
                        className="space-y-5 rounded-lg border p-6"
                    >
                        <h2 className="text-lg font-semibold">
                            Add Family Member
                        </h2>

                        {/* Name */}
                        <div>
                            <label className="mb-1 block font-medium">
                                Name
                            </label>

                            <input
                                type="text"
                                value={data.name}
                                onChange={(e) =>
                                    setData('name', e.target.value)
                                }
                                placeholder="e.g. Ahmed Perera"
                                className="w-full rounded border p-2"
                            />

                            {errors.name && (
                                <p className="text-sm text-red-600">
                                    {errors.name}
                                </p>
                            )}
                        </div>

                        {/* Relationship */}
                        <div>
                            <label className="mb-1 block font-medium">
                                Relationship
                            </label>

                            <select
                                value={data.relationship}
                                onChange={(e) =>
                                    setData(
                                        'relationship',
                                        e.target.value,
                                    )
                                }
                                className="w-full rounded border p-2"
                            >
                                <option value="">
                                    Select Relationship
                                </option>
                                <option value="father">Father</option>
                                <option value="mother">Mother</option>
                                <option value="spouse">Spouse</option>
                                <option value="son">Son</option>
                                <option value="daughter">Daughter</option>
                                <option value="brother">Brother</option>
                                <option value="sister">Sister</option>
                                <option value="other">Other</option>
                            </select>

                            {errors.relationship && (
                                <p className="text-sm text-red-600">
                                    {errors.relationship}
                                </p>
                            )}
                        </div>

                        {/* Date of Birth */}
                        <div>
                            <label className="mb-1 block font-medium">
                                Date of Birth
                            </label>

                            <input
                                type="date"
                                value={data.date_of_birth}
                                onChange={(e) =>
                                    setData(
                                        'date_of_birth',
                                        e.target.value,
                                    )
                                }
                                className="w-full rounded border p-2"
                            />
                        </div>

                        {/* Gender */}
                        <div>
                            <label className="mb-1 block font-medium">
                                Gender
                            </label>

                            <select
                                value={data.gender}
                                onChange={(e) =>
                                    setData('gender', e.target.value)
                                }
                                className="w-full rounded border p-2"
                            >
                                <option value="">Select Gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>
                        </div>

                        {/* Occupation */}
                        <div>
                            <label className="mb-1 block font-medium">
                                Occupation
                            </label>

                            <input
                                type="text"
                                value={data.occupation}
                                onChange={(e) =>
                                    setData(
                                        'occupation',
                                        e.target.value,
                                    )
                                }
                                placeholder="e.g. Teacher"
                                className="w-full rounded border p-2"
                            />
                        </div>

                        {/* Phone */}
                        <div>
                            <label className="mb-1 block font-medium">
                                Phone
                            </label>

                            <input
                                type="text"
                                value={data.phone}
                                onChange={(e) =>
                                    setData('phone', e.target.value)
                                }
                                placeholder="e.g. 0771234567"
                                className="w-full rounded border p-2"
                            />
                        </div>

                        {/* Dependent */}
                        <div className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                checked={data.is_dependent}
                                onChange={(e) =>
                                    setData(
                                        'is_dependent',
                                        e.target.checked,
                                    )
                                }
                            />

                            <label className="font-medium">
                                Is Dependent
                            </label>
                        </div>

                        <button
                            type="submit"
                            disabled={processing}
                            className="rounded bg-black px-5 py-2 text-white"
                        >
                            {processing
                                ? 'Saving...'
                                : 'Add Family Member'}
                        </button>
                    </form>

                    {/* Existing Family Members */}
                    <div className="rounded-lg border p-6">
                        <h2 className="mb-4 text-lg font-semibold">
                            Existing Family Members
                        </h2>

                        {familyMembers.length > 0 ? (
                            <div className="space-y-4">
                                {familyMembers.map((member) => (
                                    <div
                                        key={member.id}
                                        className="rounded border p-4"
                                    >
                                        <div className="flex items-start justify-between">
                                            <div>
                                                <p className="font-semibold">
                                                    {member.name}
                                                </p>

                                                <p className="text-sm capitalize text-muted-foreground">
                                                    {member.relationship}
                                                </p>
                                            </div>

                                            {member.is_dependent && (
                                                <span className="rounded bg-green-100 px-2 py-1 text-xs font-medium text-green-700">
                                                    Dependent
                                                </span>
                                            )}
                                        </div>

                                        <div className="mt-3 space-y-1 text-sm">
                                            <p>
                                                <strong>DOB:</strong>{' '}
                                                {member.date_of_birth ?? '-'}
                                            </p>

                                            <p>
                                                <strong>Gender:</strong>{' '}
                                                {member.gender ?? '-'}
                                            </p>

                                            <p>
                                                <strong>Occupation:</strong>{' '}
                                                {member.occupation ?? '-'}
                                            </p>

                                            <p>
                                                <strong>Phone:</strong>{' '}
                                                {member.phone ?? '-'}
                                            </p>
                                        </div>

                                        <button
                                            type="button"
                                            onClick={() =>
                                                deleteMember(member.id)
                                            }
                                            className="mt-3 text-sm text-red-600"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-muted-foreground">
                                No family members added yet.
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}