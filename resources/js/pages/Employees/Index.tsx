import { Head, Link } from '@inertiajs/react';

type Employee = {
    id: number;
    employee_no: string;
    status: string;
    join_date: string | null;

    tenant?: {
        name: string;
    } | null;

    company?: {
        name: string;
    } | null;

    branch?: {
        name: string;
    } | null;

    department?: {
        name: string;
    } | null;

    division?: {
        name: string;
    } | null;

    position?: {
        title: string;
    } | null;

    employmentType?: {
        name: string;
    } | null;

    employmentStatus?: {
        name: string;
    } | null;
};

type Props = {
    employees: Employee[];
};

export default function Index({ employees }: Props) {
    return (
        <>
            <Head title="Employee Profile" />

            <div className="p-6">
                {/* Header */}
                <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                        <h1 className="text-3xl font-bold">
                            Employee Profile
                        </h1>

                        <p className="text-muted-foreground">
                            View and manage employee profiles.
                        </p>
                    </div>

                    <Link
                        href="/employees/create"
                        className="rounded bg-black px-5 py-2 text-white"
                    >
                        + Add Employee
                    </Link>
                </div>

                {/* Employee List */}
                <div className="rounded-lg border">
                    <div className="border-b p-4">
                        <h2 className="text-lg font-semibold">
                            Employees
                        </h2>

                        <p className="text-sm text-muted-foreground">
                            {employees.length} employee
                            {employees.length !== 1 ? 's' : ''}
                        </p>
                    </div>

                    {employees.length > 0 ? (
                        <div className="divide-y">
                            {employees.map((employee) => (
                                <div
                                    key={employee.id}
                                    className="p-5"
                                >
                                    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                                        {/* Employee Info */}
                                        <div>
                                            <div className="flex items-center gap-3">
                                                <h3 className="text-lg font-semibold">
                                                    {employee.employee_no}
                                                </h3>

                                                <span
                                                    className={`rounded-full px-3 py-1 text-xs font-medium ${
                                                        employee.status ===
                                                        'active'
                                                            ? 'bg-green-100 text-green-700'
                                                            : 'bg-gray-100 text-gray-700'
                                                    }`}
                                                >
                                                    {employee.status}
                                                </span>
                                            </div>

                                            <div className="mt-3 grid gap-2 text-sm md:grid-cols-2 lg:grid-cols-4">
                                                <Info
                                                    label="Company"
                                                    value={
                                                        employee.company
                                                            ?.name
                                                    }
                                                />

                                                <Info
                                                    label="Branch"
                                                    value={
                                                        employee.branch
                                                            ?.name
                                                    }
                                                />

                                                <Info
                                                    label="Department"
                                                    value={
                                                        employee.department
                                                            ?.name
                                                    }
                                                />

                                                <Info
                                                    label="Division"
                                                    value={
                                                        employee.division
                                                            ?.name
                                                    }
                                                />

                                                <Info
                                                    label="Position"
                                                    value={
                                                        employee.position
                                                            ?.title
                                                    }
                                                />

                                                <Info
                                                    label="Employment Type"
                                                    value={
                                                        employee
                                                            .employmentType
                                                            ?.name
                                                    }
                                                />

                                                <Info
                                                    label="Employment Status"
                                                    value={
                                                        employee
                                                            .employmentStatus
                                                            ?.name
                                                    }
                                                />

                                                <Info
                                                    label="Join Date"
                                                    value={formatDate(
                                                        employee.join_date,
                                                    )}
                                                />
                                            </div>
                                        </div>

                                        {/* Actions */}
                                        <div className="flex gap-2">
                                            <Link
                                                href={`/employees/${employee.id}`}
                                                className="rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white"
                                            >
                                                View Profile
                                            </Link>

                                            <Link
                                                href={`/employees/${employee.id}/personal-details`}
                                                className="rounded border px-4 py-2 text-sm font-medium"
                                            >
                                                Manage
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="p-10 text-center">
                            <p className="text-muted-foreground">
                                No employees found.
                            </p>

                            <Link
                                href="/employees/create"
                                className="mt-4 inline-block rounded bg-black px-5 py-2 text-white"
                            >
                                Add First Employee
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

function Info({
    label,
    value,
}: {
    label: string;
    value?: string | null;
}) {
    return (
        <div>
            <p className="text-xs font-medium uppercase text-muted-foreground">
                {label}
            </p>

            <p className="mt-1">
                {value ?? '-'}
            </p>
        </div>
    );
}

function formatDate(date: string | null) {
    if (!date) {
        return '-';
    }

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
        return date;
    }

    return parsedDate.toISOString().split('T')[0];
}