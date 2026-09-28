import { Head, Link, useForm } from '@inertiajs/react';

type Employee = {
    id: number;
    employee_no: string;
};

type PersonalDetail = {
    first_name: string;
    middle_name: string | null;
    last_name: string;
    preferred_name: string | null;
    date_of_birth: string | null;
    gender: string | null;
    marital_status: string | null;
    nationality: string | null;
    nic_number: string | null;
    passport_number: string | null;
    blood_group: string | null;
    photo_path: string | null;
};

type Props = {
    employee: Employee;
    personalDetail: PersonalDetail | null;
};

export default function PersonalDetails({
    employee,
    personalDetail,
}: Props) {
    const { data, setData, post, processing, errors } = useForm({
        first_name: personalDetail?.first_name ?? '',
        middle_name: personalDetail?.middle_name ?? '',
        last_name: personalDetail?.last_name ?? '',
        preferred_name: personalDetail?.preferred_name ?? '',
        date_of_birth: personalDetail?.date_of_birth ?? '',
        gender: personalDetail?.gender ?? '',
        marital_status: personalDetail?.marital_status ?? '',
        nationality: personalDetail?.nationality ?? '',
        nic_number: personalDetail?.nic_number ?? '',
        passport_number: personalDetail?.passport_number ?? '',
        blood_group: personalDetail?.blood_group ?? '',
        photo_path: personalDetail?.photo_path ?? '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();

        post(`/employees/${employee.id}/personal-details`);
    };

    return (
        <>
            <Head title="Personal Details" />

            <div className="p-6">
                <div className="mb-6">
                    <Link
                        href="/employees"
                        className="text-sm text-blue-600"
                    >
                        ← Back to Employees
                    </Link>

                    <h1 className="mt-2 text-2xl font-bold">
                        Personal Details
                    </h1>

                    <p className="text-muted-foreground">
                        Employee: {employee.employee_no}
                    </p>
                </div>

                <form
                    onSubmit={submit}
                    className="max-w-3xl space-y-5 rounded-lg border p-6"
                >
                    {/* First Name */}
                    <div>
                        <label className="mb-1 block font-medium">
                            First Name
                        </label>

                        <input
                            type="text"
                            value={data.first_name}
                            onChange={(e) =>
                                setData('first_name', e.target.value)
                            }
                            className="w-full rounded border p-2"
                        />

                        {errors.first_name && (
                            <p className="text-sm text-red-600">
                                {errors.first_name}
                            </p>
                        )}
                    </div>

                    {/* Middle Name */}
                    <div>
                        <label className="mb-1 block font-medium">
                            Middle Name
                        </label>

                        <input
                            type="text"
                            value={data.middle_name}
                            onChange={(e) =>
                                setData('middle_name', e.target.value)
                            }
                            className="w-full rounded border p-2"
                        />
                    </div>

                    {/* Last Name */}
                    <div>
                        <label className="mb-1 block font-medium">
                            Last Name
                        </label>

                        <input
                            type="text"
                            value={data.last_name}
                            onChange={(e) =>
                                setData('last_name', e.target.value)
                            }
                            className="w-full rounded border p-2"
                        />

                        {errors.last_name && (
                            <p className="text-sm text-red-600">
                                {errors.last_name}
                            </p>
                        )}
                    </div>

                    {/* Preferred Name */}
                    <div>
                        <label className="mb-1 block font-medium">
                            Preferred Name
                        </label>

                        <input
                            type="text"
                            value={data.preferred_name}
                            onChange={(e) =>
                                setData('preferred_name', e.target.value)
                            }
                            className="w-full rounded border p-2"
                        />
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
                                setData('date_of_birth', e.target.value)
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

                    {/* Marital Status */}
                    <div>
                        <label className="mb-1 block font-medium">
                            Marital Status
                        </label>

                        <select
                            value={data.marital_status}
                            onChange={(e) =>
                                setData('marital_status', e.target.value)
                            }
                            className="w-full rounded border p-2"
                        >
                            <option value="">Select Marital Status</option>
                            <option value="single">Single</option>
                            <option value="married">Married</option>
                            <option value="divorced">Divorced</option>
                            <option value="widowed">Widowed</option>
                        </select>
                    </div>

                    {/* Nationality */}
                    <div>
                        <label className="mb-1 block font-medium">
                            Nationality
                        </label>

                        <input
                            type="text"
                            value={data.nationality}
                            onChange={(e) =>
                                setData('nationality', e.target.value)
                            }
                            className="w-full rounded border p-2"
                        />
                    </div>

                    {/* NIC */}
                    <div>
                        <label className="mb-1 block font-medium">
                            NIC Number
                        </label>

                        <input
                            type="text"
                            value={data.nic_number}
                            onChange={(e) =>
                                setData('nic_number', e.target.value)
                            }
                            className="w-full rounded border p-2"
                        />
                    </div>

                    {/* Passport */}
                    <div>
                        <label className="mb-1 block font-medium">
                            Passport Number
                        </label>

                        <input
                            type="text"
                            value={data.passport_number}
                            onChange={(e) =>
                                setData('passport_number', e.target.value)
                            }
                            className="w-full rounded border p-2"
                        />
                    </div>

                    {/* Blood Group */}
                    <div>
                        <label className="mb-1 block font-medium">
                            Blood Group
                        </label>

                        <select
                            value={data.blood_group}
                            onChange={(e) =>
                                setData('blood_group', e.target.value)
                            }
                            className="w-full rounded border p-2"
                        >
                            <option value="">Select Blood Group</option>
                            <option value="A+">A+</option>
                            <option value="A-">A-</option>
                            <option value="B+">B+</option>
                            <option value="B-">B-</option>
                            <option value="AB+">AB+</option>
                            <option value="AB-">AB-</option>
                            <option value="O+">O+</option>
                            <option value="O-">O-</option>
                        </select>
                    </div>

                    {/* Photo Path */}
                    <div>
                        <label className="mb-1 block font-medium">
                            Photo Path
                        </label>

                        <input
                            type="text"
                            value={data.photo_path}
                            onChange={(e) =>
                                setData('photo_path', e.target.value)
                            }
                            placeholder="e.g. employees/emp-001.jpg"
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
                            : 'Save Personal Details'}
                    </button>
                </form>
            </div>
        </>
    );
}