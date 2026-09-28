import { Head, router } from '@inertiajs/react';
import { FormEvent, useState } from 'react';

type Item = {
    id: number;
    name?: string;
    title?: string;
    code?: string;
    rank?: number;
};

type History = {
    id: number;
    tenant_id: number;
    employee_id: number;
    company_id: number;

    branch_id?: number | null;
    department_id?: number | null;
    division_id?: number | null;
    position_id?: number | null;
    manager_id?: number | null;
    employment_type_id?: number | null;
    job_grade_id?: number | null;
    job_level_id?: number | null;

    start_date: string;
    end_date?: string | null;
    reason?: string | null;
    notes?: string | null;

    tenant?: Item;
    employee?: Item;
    company?: Item;
    branch?: Item;
    department?: Item;
    division?: Item;
    position?: Item;
    manager?: Item;
    employmentType?: Item;
    jobGrade?: Item;
    jobLevel?: Item;
};

type Props = {
    histories: History[];
    tenants: Item[];
    employees: Item[];
    companies: Item[];
    branches: Item[];
    departments: Item[];
    divisions: Item[];
    positions: Item[];
    employmentTypes: Item[];
    jobGrades: Item[];
    jobLevels: Item[];
};

export default function EmployeeEmploymentHistory({
    histories,
    tenants,
    employees,
    companies,
    branches,
    departments,
    divisions,
    positions,
    employmentTypes,
    jobGrades,
    jobLevels,
}: Props) {
    const emptyForm = {
        tenant_id: '',
        employee_id: '',
        company_id: '',
        branch_id: '',
        department_id: '',
        division_id: '',
        position_id: '',
        manager_id: '',
        employment_type_id: '',
        job_grade_id: '',
        job_level_id: '',
        start_date: '',
        end_date: '',
        reason: '',
        notes: '',
    };

    const [form, setForm] = useState(emptyForm);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [showForm, setShowForm] = useState(false);

    const handleChange = (
        field: keyof typeof form,
        value: string,
    ) => {
        setForm((previous) => ({
            ...previous,
            [field]: value,
        }));
    };

    const resetForm = () => {
        setForm(emptyForm);
        setEditingId(null);
        setShowForm(false);
    };

    const submit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (editingId !== null) {
            router.put(
                `/employment-history/${editingId}`,
                form,
                {
                    onSuccess: () => {
                        resetForm();
                    },
                },
            );
        } else {
            router.post(
                '/employment-history',
                form,
                {
                    onSuccess: () => {
                        resetForm();
                    },
                },
            );
        }
    };

    const editHistory = (history: History) => {
        setEditingId(history.id);

        setForm({
            tenant_id: String(history.tenant_id),
            employee_id: String(history.employee_id),
            company_id: String(history.company_id),

            branch_id:
                history.branch_id !== null &&
                history.branch_id !== undefined
                    ? String(history.branch_id)
                    : '',

            department_id:
                history.department_id !== null &&
                history.department_id !== undefined
                    ? String(history.department_id)
                    : '',

            division_id:
                history.division_id !== null &&
                history.division_id !== undefined
                    ? String(history.division_id)
                    : '',

            position_id:
                history.position_id !== null &&
                history.position_id !== undefined
                    ? String(history.position_id)
                    : '',

            manager_id:
                history.manager_id !== null &&
                history.manager_id !== undefined
                    ? String(history.manager_id)
                    : '',

            employment_type_id:
                history.employment_type_id !== null &&
                history.employment_type_id !== undefined
                    ? String(history.employment_type_id)
                    : '',

            job_grade_id:
                history.job_grade_id !== null &&
                history.job_grade_id !== undefined
                    ? String(history.job_grade_id)
                    : '',

            job_level_id:
                history.job_level_id !== null &&
                history.job_level_id !== undefined
                    ? String(history.job_level_id)
                    : '',

            start_date: history.start_date
                ? history.start_date.substring(0, 10)
                : '',

            end_date: history.end_date
                ? history.end_date.substring(0, 10)
                : '',

            reason: history.reason ?? '',
            notes: history.notes ?? '',
        });

        setShowForm(true);
    };

    const deleteHistory = (id: number) => {
        if (
            confirm(
                'Are you sure you want to delete this employment history?',
            )
        ) {
            router.delete(`/employment-history/${id}`);
        }
    };

    const displayName = (item?: Item) => {
        if (!item) {
            return '-';
        }

        return (
            item.name ??
            item.title ??
            item.code ??
            '-'
        );
    };

    return (
        <>
            <Head title="Employment History" />

            <div className="space-y-6 p-6">

                {/* PAGE HEADER */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-semibold">
                            Employment History
                        </h1>

                        <p className="text-sm text-muted-foreground">
                            Manage employee employment history and job changes.
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={() => {
                            setForm(emptyForm);
                            setEditingId(null);
                            setShowForm(true);
                        }}
                        className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
                    >
                        + Add Employment History
                    </button>
                </div>

                {/* FORM */}
                {showForm && (
                    <div className="rounded-lg border bg-card p-6 shadow-sm">

                        <h2 className="mb-6 text-lg font-semibold">
                            {editingId !== null
                                ? 'Edit Employment History'
                                : 'Add Employment History'}
                        </h2>

                        <form
                            onSubmit={submit}
                            className="grid grid-cols-1 gap-5 md:grid-cols-2"
                        >

                            {/* TENANT */}
                            <SelectField
                                label="Tenant"
                                value={form.tenant_id}
                                onChange={(value) =>
                                    handleChange(
                                        'tenant_id',
                                        value,
                                    )
                                }
                                items={tenants}
                                required
                            />

                            {/* EMPLOYEE */}
                            <SelectField
                                label="Employee"
                                value={form.employee_id}
                                onChange={(value) =>
                                    handleChange(
                                        'employee_id',
                                        value,
                                    )
                                }
                                items={employees}
                                required
                            />

                            {/* COMPANY */}
                            <SelectField
                                label="Company"
                                value={form.company_id}
                                onChange={(value) =>
                                    handleChange(
                                        'company_id',
                                        value,
                                    )
                                }
                                items={companies}
                                required
                            />

                            {/* BRANCH */}
                            <SelectField
                                label="Branch"
                                value={form.branch_id}
                                onChange={(value) =>
                                    handleChange(
                                        'branch_id',
                                        value,
                                    )
                                }
                                items={branches}
                            />

                            {/* DEPARTMENT */}
                            <SelectField
                                label="Department"
                                value={form.department_id}
                                onChange={(value) =>
                                    handleChange(
                                        'department_id',
                                        value,
                                    )
                                }
                                items={departments}
                            />

                            {/* DIVISION */}
                            <SelectField
                                label="Division"
                                value={form.division_id}
                                onChange={(value) =>
                                    handleChange(
                                        'division_id',
                                        value,
                                    )
                                }
                                items={divisions}
                            />

                            {/* POSITION */}
                            <SelectField
                                label="Position"
                                value={form.position_id}
                                onChange={(value) =>
                                    handleChange(
                                        'position_id',
                                        value,
                                    )
                                }
                                items={positions}
                                titleField
                            />

                            {/* MANAGER */}
                            <SelectField
                                label="Manager"
                                value={form.manager_id}
                                onChange={(value) =>
                                    handleChange(
                                        'manager_id',
                                        value,
                                    )
                                }
                                items={employees}
                            />

                            {/* EMPLOYMENT TYPE */}
                            <SelectField
                                label="Employment Type"
                                value={form.employment_type_id}
                                onChange={(value) =>
                                    handleChange(
                                        'employment_type_id',
                                        value,
                                    )
                                }
                                items={employmentTypes}
                            />

                            {/* JOB GRADE */}
                            <SelectField
                                label="Job Grade"
                                value={form.job_grade_id}
                                onChange={(value) =>
                                    handleChange(
                                        'job_grade_id',
                                        value,
                                    )
                                }
                                items={jobGrades}
                            />

                            {/* JOB LEVEL */}
                            <SelectField
                                label="Job Level"
                                value={form.job_level_id}
                                onChange={(value) =>
                                    handleChange(
                                        'job_level_id',
                                        value,
                                    )
                                }
                                items={jobLevels}
                            />

                            {/* START DATE */}
                            <div>
                                <label className="mb-1 block text-sm font-medium">
                                    Start Date
                                </label>

                                <input
                                    type="date"
                                    value={form.start_date}
                                    onChange={(e) =>
                                        handleChange(
                                            'start_date',
                                            e.target.value,
                                        )
                                    }
                                    required
                                    className="w-full rounded-md border px-3 py-2"
                                />
                            </div>

                            {/* END DATE */}
                            <div>
                                <label className="mb-1 block text-sm font-medium">
                                    End Date
                                </label>

                                <input
                                    type="date"
                                    value={form.end_date}
                                    onChange={(e) =>
                                        handleChange(
                                            'end_date',
                                            e.target.value,
                                        )
                                    }
                                    className="w-full rounded-md border px-3 py-2"
                                />
                            </div>

                            {/* REASON */}
                            <div>
                                <label className="mb-1 block text-sm font-medium">
                                    Reason
                                </label>

                                <input
                                    type="text"
                                    value={form.reason}
                                    onChange={(e) =>
                                        handleChange(
                                            'reason',
                                            e.target.value,
                                        )
                                    }
                                    placeholder="Promotion, Transfer, New Join..."
                                    className="w-full rounded-md border px-3 py-2"
                                />
                            </div>

                            {/* NOTES */}
                            <div className="md:col-span-2">
                                <label className="mb-1 block text-sm font-medium">
                                    Notes
                                </label>

                                <textarea
                                    value={form.notes}
                                    onChange={(e) =>
                                        handleChange(
                                            'notes',
                                            e.target.value,
                                        )
                                    }
                                    rows={4}
                                    placeholder="Additional notes..."
                                    className="w-full rounded-md border px-3 py-2"
                                />
                            </div>

                            {/* BUTTONS */}
                            <div className="flex gap-3 md:col-span-2">
                                <button
                                    type="submit"
                                    className="rounded-md bg-primary px-5 py-2 text-sm font-medium text-primary-foreground"
                                >
                                    {editingId !== null
                                        ? 'Update'
                                        : 'Save'}
                                </button>

                                <button
                                    type="button"
                                    onClick={resetForm}
                                    className="rounded-md border px-5 py-2 text-sm font-medium"
                                >
                                    Cancel
                                </button>
                            </div>

                        </form>
                    </div>
                )}

                {/* HISTORY TABLE */}
                <div className="overflow-hidden rounded-lg border bg-card shadow-sm">

                    <div className="overflow-x-auto">

                        <table className="w-full text-sm">

                            <thead className="border-b bg-muted/50">
                                <tr>
                                    <th className="px-4 py-3 text-left">
                                        Employee
                                    </th>

                                    <th className="px-4 py-3 text-left">
                                        Company
                                    </th>

                                    <th className="px-4 py-3 text-left">
                                        Position
                                    </th>

                                    <th className="px-4 py-3 text-left">
                                        Department
                                    </th>

                                    <th className="px-4 py-3 text-left">
                                        Job Grade
                                    </th>

                                    <th className="px-4 py-3 text-left">
                                        Job Level
                                    </th>

                                    <th className="px-4 py-3 text-left">
                                        Start Date
                                    </th>

                                    <th className="px-4 py-3 text-left">
                                        End Date
                                    </th>

                                    <th className="px-4 py-3 text-left">
                                        Actions
                                    </th>
                                </tr>
                            </thead>

                            <tbody>

                                {histories.length === 0 ? (
                                    <tr>
                                        <td
                                            colSpan={9}
                                            className="px-4 py-10 text-center text-muted-foreground"
                                        >
                                            No employment history found.
                                        </td>
                                    </tr>
                                ) : (
                                    histories.map((history) => (
                                        <tr
                                            key={history.id}
                                            className="border-b last:border-0"
                                        >

                                            <td className="px-4 py-3">
                                                {displayName(
                                                    history.employee,
                                                )}
                                            </td>

                                            <td className="px-4 py-3">
                                                {displayName(
                                                    history.company,
                                                )}
                                            </td>

                                            <td className="px-4 py-3">
                                                {displayName(
                                                    history.position,
                                                )}
                                            </td>

                                            <td className="px-4 py-3">
                                                {displayName(
                                                    history.department,
                                                )}
                                            </td>

                                            <td className="px-4 py-3">
                                                {displayName(
                                                    history.jobGrade,
                                                )}
                                            </td>

                                            <td className="px-4 py-3">
                                                {displayName(
                                                    history.jobLevel,
                                                )}
                                            </td>

                                            <td className="px-4 py-3">
                                                {history.start_date}
                                            </td>

                                            <td className="px-4 py-3">
                                                {history.end_date ??
                                                    'Current'}
                                            </td>

                                            <td className="px-4 py-3">
                                                <div className="flex gap-2">

                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            editHistory(
                                                                history,
                                                            )
                                                        }
                                                        className="rounded-md border px-3 py-1.5 text-xs"
                                                    >
                                                        Edit
                                                    </button>

                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            deleteHistory(
                                                                history.id,
                                                            )
                                                        }
                                                        className="rounded-md border px-3 py-1.5 text-xs text-red-600"
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
        </>
    );
}


/* =========================================================
   SELECT FIELD COMPONENT
   ========================================================= */

function SelectField({
    label,
    value,
    onChange,
    items,
    titleField = false,
    required = false,
}: {
    label: string;
    value: string;
    onChange: (value: string) => void;
    items: Item[];
    titleField?: boolean;
    required?: boolean;
}) {
    return (
        <div>
            <label className="mb-1 block text-sm font-medium">
                {label}
            </label>

            <select
                value={value}
                onChange={(e) =>
                    onChange(e.target.value)
                }
                required={required}
                className="w-full rounded-md border px-3 py-2"
            >
                <option value="">
                    Select {label}
                </option>

                {items.map((item) => (
                    <option
                        key={item.id}
                        value={item.id}
                    >
                        {titleField
                            ? item.title ??
                              item.name ??
                              item.code ??
                              `Item ${item.id}`
                            : item.name ??
                              item.title ??
                              item.code ??
                              `Item ${item.id}`}
                    </option>
                ))}
            </select>
        </div>
    );
}