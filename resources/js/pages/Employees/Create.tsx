import { Head, Link, useForm } from '@inertiajs/react';

type Tenant = {
    id: number;
    name: string;
};

type Company = {
    id: number;
    tenant_id: number;
    name: string;
};

type Branch = {
    id: number;
    tenant_id: number;
    company_id: number;
    name: string;
};

type Department = {
    id: number;
    tenant_id: number;
    company_id: number;
    name: string;
};

type Division = {
    id: number;
    tenant_id: number;
    company_id: number;
    department_id: number;
    name: string;
};

type Location = {
    id: number;
    tenant_id: number;
    company_id: number;
    branch_id: number;
    name: string;
};

type CostCenter = {
    id: number;
    tenant_id: number;
    company_id: number;
    code: string;
    name: string;
};

type Position = {
    id: number;
    tenant_id: number;
    name: string;
};

type EmploymentType = {
    id: number;
    tenant_id: number;
    name: string;
};

type EmploymentStatus = {
    id: number;
    tenant_id: number;
    name: string;
};

type Manager = {
    id: number;
    tenant_id: number;
    employee_no: string;
};

type Props = {
    tenants: Tenant[];
    companies: Company[];
    branches: Branch[];
    departments: Department[];
    divisions: Division[];
    locations: Location[];
    costCenters: CostCenter[];
    positions: Position[];
    employmentTypes: EmploymentType[];
    employmentStatuses: EmploymentStatus[];
    managers: Manager[];
};

export default function CreateEmployee({
    tenants,
    companies,
    branches,
    departments,
    divisions,
    locations,
    costCenters,
    positions,
    employmentTypes,
    employmentStatuses,
    managers,
}: Props) {
    const { data, setData, post, processing, errors } = useForm({
        tenant_id: '',
        employee_no: '',
        company_id: '',
        branch_id: '',
        department_id: '',
        division_id: '',
        location_id: '',
        cost_center_id: '',
        position_id: '',
        employment_type_id: '',
        employment_status_id: '',
        manager_id: '',
        join_date: '',
        confirmation_date: '',
        termination_date: '',
        status: 'active',
    });

    const filteredCompanies = companies.filter(
        (company) => String(company.tenant_id) === data.tenant_id,
    );

    const filteredBranches = branches.filter(
        (branch) =>
            String(branch.tenant_id) === data.tenant_id &&
            String(branch.company_id) === data.company_id,
    );

    const filteredDepartments = departments.filter(
        (department) =>
            String(department.tenant_id) === data.tenant_id &&
            String(department.company_id) === data.company_id,
    );

    const filteredDivisions = divisions.filter(
        (division) =>
            String(division.tenant_id) === data.tenant_id &&
            String(division.company_id) === data.company_id &&
            String(division.department_id) === data.department_id,
    );

    const filteredLocations = locations.filter(
        (location) =>
            String(location.tenant_id) === data.tenant_id &&
            String(location.company_id) === data.company_id &&
            String(location.branch_id) === data.branch_id,
    );

    const filteredCostCenters = costCenters.filter(
        (costCenter) =>
            String(costCenter.tenant_id) === data.tenant_id &&
            String(costCenter.company_id) === data.company_id,
    );

    const filteredPositions = positions.filter(
        (position) =>
            String(position.tenant_id) === data.tenant_id,
    );

    const filteredEmploymentTypes = employmentTypes.filter(
        (type) => String(type.tenant_id) === data.tenant_id,
    );

    const filteredEmploymentStatuses = employmentStatuses.filter(
        (status) => String(status.tenant_id) === data.tenant_id,
    );

    const filteredManagers = managers.filter(
        (manager) => String(manager.tenant_id) === data.tenant_id,
    );

    const submit = (e: React.FormEvent) => {
        e.preventDefault();

        post('/employees');
    };

    return (
        <>
            <Head title="Add Employee" />

            <div className="p-6">
                <div className="mb-6">
                    <Link
                        href="/employees"
                        className="text-sm text-blue-600"
                    >
                        ← Back to Employees
                    </Link>

                    <h1 className="mt-2 text-2xl font-bold">
                        Add Employee
                    </h1>

                    <p className="text-muted-foreground">
                        Create a new employee record.
                    </p>
                </div>

                <form
                    onSubmit={submit}
                    className="max-w-3xl space-y-5 rounded-lg border p-6"
                >
                    {/* Tenant */}
                    <div>
                        <label className="mb-1 block font-medium">
                            Tenant
                        </label>

                        <select
                            value={data.tenant_id}
                            onChange={(e) => {
                                setData('tenant_id', e.target.value);
                                setData('company_id', '');
                                setData('branch_id', '');
                                setData('department_id', '');
                                setData('division_id', '');
                                setData('location_id', '');
                                setData('cost_center_id', '');
                                setData('position_id', '');
                                setData('employment_type_id', '');
                                setData('employment_status_id', '');
                                setData('manager_id', '');
                            }}
                            className="w-full rounded border p-2"
                        >
                            <option value="">Select Tenant</option>

                            {tenants.map((tenant) => (
                                <option
                                    key={tenant.id}
                                    value={tenant.id}
                                >
                                    {tenant.name}
                                </option>
                            ))}
                        </select>

                        {errors.tenant_id && (
                            <p className="text-sm text-red-600">
                                {errors.tenant_id}
                            </p>
                        )}
                    </div>

                    {/* Employee No */}
                    <div>
                        <label className="mb-1 block font-medium">
                            Employee No
                        </label>

                        <input
                            type="text"
                            value={data.employee_no}
                            onChange={(e) =>
                                setData('employee_no', e.target.value)
                            }
                            placeholder="e.g. EMP-002"
                            className="w-full rounded border p-2"
                        />

                        {errors.employee_no && (
                            <p className="text-sm text-red-600">
                                {errors.employee_no}
                            </p>
                        )}
                    </div>

                    {/* Company */}
                    <div>
                        <label className="mb-1 block font-medium">
                            Company
                        </label>

                        <select
                            value={data.company_id}
                            onChange={(e) => {
                                setData('company_id', e.target.value);
                                setData('branch_id', '');
                                setData('department_id', '');
                                setData('division_id', '');
                                setData('location_id', '');
                                setData('cost_center_id', '');
                            }}
                            className="w-full rounded border p-2"
                            disabled={!data.tenant_id}
                        >
                            <option value="">
                                {data.tenant_id
                                    ? 'Select Company'
                                    : 'Select Tenant First'}
                            </option>

                            {filteredCompanies.map((company) => (
                                <option
                                    key={company.id}
                                    value={company.id}
                                >
                                    {company.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Branch */}
                    <div>
                        <label className="mb-1 block font-medium">
                            Branch
                        </label>

                        <select
                            value={data.branch_id}
                            onChange={(e) => {
                                setData('branch_id', e.target.value);
                                setData('location_id', '');
                            }}
                            className="w-full rounded border p-2"
                            disabled={!data.company_id}
                        >
                            <option value="">
                                {data.company_id
                                    ? 'Select Branch'
                                    : 'Select Company First'}
                            </option>

                            {filteredBranches.map((branch) => (
                                <option
                                    key={branch.id}
                                    value={branch.id}
                                >
                                    {branch.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Department */}
                    <div>
                        <label className="mb-1 block font-medium">
                            Department
                        </label>

                        <select
                            value={data.department_id}
                            onChange={(e) => {
                                setData('department_id', e.target.value);
                                setData('division_id', '');
                            }}
                            className="w-full rounded border p-2"
                            disabled={!data.company_id}
                        >
                            <option value="">
                                {data.company_id
                                    ? 'Select Department'
                                    : 'Select Company First'}
                            </option>

                            {filteredDepartments.map((department) => (
                                <option
                                    key={department.id}
                                    value={department.id}
                                >
                                    {department.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Division */}
                    <div>
                        <label className="mb-1 block font-medium">
                            Division
                        </label>

                        <select
                            value={data.division_id}
                            onChange={(e) =>
                                setData('division_id', e.target.value)
                            }
                            className="w-full rounded border p-2"
                            disabled={!data.department_id}
                        >
                            <option value="">
                                {data.department_id
                                    ? 'Select Division'
                                    : 'Select Department First'}
                            </option>

                            {filteredDivisions.map((division) => (
                                <option
                                    key={division.id}
                                    value={division.id}
                                >
                                    {division.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Location */}
                    <div>
                        <label className="mb-1 block font-medium">
                            Location
                        </label>

                        <select
                            value={data.location_id}
                            onChange={(e) =>
                                setData('location_id', e.target.value)
                            }
                            className="w-full rounded border p-2"
                            disabled={!data.branch_id}
                        >
                            <option value="">
                                {data.branch_id
                                    ? 'Select Location'
                                    : 'Select Branch First'}
                            </option>

                            {filteredLocations.map((location) => (
                                <option
                                    key={location.id}
                                    value={location.id}
                                >
                                    {location.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Cost Center */}
                    <div>
                        <label className="mb-1 block font-medium">
                            Cost Center
                        </label>

                        <select
                            value={data.cost_center_id}
                            onChange={(e) =>
                                setData('cost_center_id', e.target.value)
                            }
                            className="w-full rounded border p-2"
                            disabled={!data.company_id}
                        >
                            <option value="">
                                {data.company_id
                                    ? 'Select Cost Center'
                                    : 'Select Company First'}
                            </option>

                            {filteredCostCenters.map((costCenter) => (
                                <option
                                    key={costCenter.id}
                                    value={costCenter.id}
                                >
                                    {costCenter.code} - {costCenter.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Position */}
                    <div>
                        <label className="mb-1 block font-medium">
                            Position
                        </label>

                        <select
                            value={data.position_id}
                            onChange={(e) =>
                                setData('position_id', e.target.value)
                            }
                            className="w-full rounded border p-2"
                            disabled={!data.tenant_id}
                        >
                            <option value="">Select Position</option>

                            {filteredPositions.map((position) => (
                                <option
                                    key={position.id}
                                    value={position.id}
                                >
                                    {position.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Employment Type */}
                    <div>
                        <label className="mb-1 block font-medium">
                            Employment Type
                        </label>

                        <select
                            value={data.employment_type_id}
                            onChange={(e) =>
                                setData(
                                    'employment_type_id',
                                    e.target.value,
                                )
                            }
                            className="w-full rounded border p-2"
                            disabled={!data.tenant_id}
                        >
                            <option value="">
                                Select Employment Type
                            </option>

                            {filteredEmploymentTypes.map((type) => (
                                <option key={type.id} value={type.id}>
                                    {type.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Employment Status */}
                    <div>
                        <label className="mb-1 block font-medium">
                            Employment Status
                        </label>

                        <select
                            value={data.employment_status_id}
                            onChange={(e) =>
                                setData(
                                    'employment_status_id',
                                    e.target.value,
                                )
                            }
                            className="w-full rounded border p-2"
                            disabled={!data.tenant_id}
                        >
                            <option value="">
                                Select Employment Status
                            </option>

                            {filteredEmploymentStatuses.map((status) => (
                                <option key={status.id} value={status.id}>
                                    {status.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Manager */}
                    <div>
                        <label className="mb-1 block font-medium">
                            Manager
                        </label>

                        <select
                            value={data.manager_id}
                            onChange={(e) =>
                                setData('manager_id', e.target.value)
                            }
                            className="w-full rounded border p-2"
                            disabled={!data.tenant_id}
                        >
                            <option value="">No Manager</option>

                            {filteredManagers.map((manager) => (
                                <option
                                    key={manager.id}
                                    value={manager.id}
                                >
                                    {manager.employee_no}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Join Date */}
                    <div>
                        <label className="mb-1 block font-medium">
                            Join Date
                        </label>

                        <input
                            type="date"
                            value={data.join_date}
                            onChange={(e) =>
                                setData('join_date', e.target.value)
                            }
                            className="w-full rounded border p-2"
                        />
                    </div>

                    {/* Confirmation Date */}
                    <div>
                        <label className="mb-1 block font-medium">
                            Confirmation Date
                        </label>

                        <input
                            type="date"
                            value={data.confirmation_date}
                            onChange={(e) =>
                                setData('confirmation_date', e.target.value)
                            }
                            className="w-full rounded border p-2"
                        />
                    </div>

                    {/* Termination Date */}
                    <div>
                        <label className="mb-1 block font-medium">
                            Termination Date
                        </label>

                        <input
                            type="date"
                            value={data.termination_date}
                            onChange={(e) =>
                                setData('termination_date', e.target.value)
                            }
                            className="w-full rounded border p-2"
                        />
                    </div>

                    {/* Status */}
                    <div>
                        <label className="mb-1 block font-medium">
                            Record Status
                        </label>

                        <select
                            value={data.status}
                            onChange={(e) =>
                                setData('status', e.target.value)
                            }
                            className="w-full rounded border p-2"
                        >
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                        </select>
                    </div>

                    <button
                        type="submit"
                        disabled={processing}
                        className="rounded bg-black px-5 py-2 text-white"
                    >
                        {processing ? 'Saving...' : 'Save Employee'}
                    </button>
                </form>
            </div>
        </>
    );
}