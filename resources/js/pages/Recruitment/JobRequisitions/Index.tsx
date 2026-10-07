import { FormEvent, useState } from 'react';
import { Head, router } from '@inertiajs/react';

interface Tenant {
    id: number;
    name: string;
}

interface Company {
    id: number;
    name: string;
}

interface Department {
    id: number;
    name: string;
}

interface Position {
    id: number;
    title: string;
}

interface User {
    id: number;
    name: string;
}

interface JobRequisition {
    id: number;
    tenant_id: number;
    company_id: number;
    department_id: number;
    position_id: number;
    requested_by: number;
    number_of_positions: number;
    reason: string;
    budget: string;
    status: string;
    approved_at: string | null;
    tenant?: Tenant;
    company?: Company;
    department?: Department;
    position?: Position;
    requester?: User;
}

interface Props {
    requisitions: JobRequisition[];
    tenants: Tenant[];
    companies: Company[];
    departments: Department[];
    positions: Position[];
    users: User[];
}

export default function Index({
    requisitions,
    tenants,
    companies,
    departments,
    positions,
    users,
}: Props) {
    const [editingId, setEditingId] = useState<number | null>(null);

    const [form, setForm] = useState({
        tenant_id: '',
        company_id: '',
        department_id: '',
        position_id: '',
        requested_by: '',
        number_of_positions: '1',
        reason: '',
        budget: '',
        status: 'Draft',
        approved_at: '',
    });

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        if (editingId) {
            router.put(`/job-requisitions/${editingId}`, form, {
                onSuccess: resetForm,
            });
        } else {
            router.post('/job-requisitions', form, {
                onSuccess: resetForm,
            });
        }
    };

    const resetForm = () => {
        setEditingId(null);

        setForm({
            tenant_id: '',
            company_id: '',
            department_id: '',
            position_id: '',
            requested_by: '',
            number_of_positions: '1',
            reason: '',
            budget: '',
            status: 'Draft',
            approved_at: '',
        });
    };

    const handleEdit = (requisition: JobRequisition) => {
        setEditingId(requisition.id);

        setForm({
            tenant_id: String(requisition.tenant_id),
            company_id: String(requisition.company_id),
            department_id: String(requisition.department_id),
            position_id: String(requisition.position_id),
            requested_by: String(requisition.requested_by),
            number_of_positions: String(requisition.number_of_positions),
            reason: requisition.reason,
            budget: requisition.budget,
            status: requisition.status,
            approved_at: requisition.approved_at
                ? requisition.approved_at.substring(0, 16)
                : '',
        });
    };

    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this job requisition?')) {
            router.delete(`/job-requisitions/${id}`);
        }
    };

    return (
        <>
            <Head title="Job Requisitions" />

            <div className="min-h-screen bg-slate-50 p-6 text-slate-900">
                {/* Page Header */}
                <div className="mb-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-bold tracking-tight text-slate-900">
                                Job Requisitions
                            </h1>

                            <p className="mt-1 text-sm text-slate-500">
                                Create and manage recruitment requests.
                            </p>
                        </div>

                        <div className="rounded-lg bg-indigo-50 px-4 py-2 text-sm font-medium text-indigo-700">
                            Recruitment / ATS
                        </div>
                    </div>
                </div>

                {/* Form Card */}
                <div className="mb-6 rounded-xl border border-slate-200 bg-white shadow-sm">
                    <div className="border-b border-slate-200 px-6 py-4">
                        <h2 className="text-lg font-semibold text-slate-900">
                            {editingId
                                ? 'Edit Job Requisition'
                                : 'Create Job Requisition'}
                        </h2>

                        <p className="mt-1 text-sm text-slate-500">
                            Submit a request for a new employee position.
                        </p>
                    </div>

                    <form
                        onSubmit={handleSubmit}
                        className="grid grid-cols-1 gap-5 p-6 md:grid-cols-2"
                    >
                        {/* Tenant */}
                        <div>
                            <label className="mb-2 block text-sm font-medium text-slate-700">
                                Tenant
                            </label>

                            <select
                                value={form.tenant_id}
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        tenant_id: e.target.value,
                                    })
                                }
                                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                                required
                            >
                                <option value="">Select Tenant</option>

                                {tenants.map((tenant) => (
                                    <option key={tenant.id} value={tenant.id}>
                                        {tenant.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Company */}
                        <div>
                            <label className="mb-2 block text-sm font-medium text-slate-700">
                                Company
                            </label>

                            <select
                                value={form.company_id}
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        company_id: e.target.value,
                                    })
                                }
                                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                                required
                            >
                                <option value="">Select Company</option>

                                {companies.map((company) => (
                                    <option key={company.id} value={company.id}>
                                        {company.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Department */}
                        <div>
                            <label className="mb-2 block text-sm font-medium text-slate-700">
                                Department
                            </label>

                            <select
                                value={form.department_id}
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        department_id: e.target.value,
                                    })
                                }
                                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                                required
                            >
                                <option value="">Select Department</option>

                                {departments.map((department) => (
                                    <option
                                        key={department.id}
                                        value={department.id}
                                    >
                                        {department.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Position */}
                        <div>
                            <label className="mb-2 block text-sm font-medium text-slate-700">
                                Position
                            </label>

                            <select
                                value={form.position_id}
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        position_id: e.target.value,
                                    })
                                }
                                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                                required
                            >
                                <option value="">Select Position</option>

                                {positions.map((position) => (
                                    <option
                                        key={position.id}
                                        value={position.id}
                                    >
                                        {position.title}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Requested By */}
                        <div>
                            <label className="mb-2 block text-sm font-medium text-slate-700">
                                Requested By
                            </label>

                            <select
                                value={form.requested_by}
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        requested_by: e.target.value,
                                    })
                                }
                                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                                required
                            >
                                <option value="">Select User</option>

                                {users.map((user) => (
                                    <option key={user.id} value={user.id}>
                                        {user.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Number of Positions */}
                        <div>
                            <label className="mb-2 block text-sm font-medium text-slate-700">
                                Number of Positions
                            </label>

                            <input
                                type="number"
                                min="1"
                                value={form.number_of_positions}
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        number_of_positions: e.target.value,
                                    })
                                }
                                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                                required
                            />
                        </div>

                        {/* Budget */}
                        <div>
                            <label className="mb-2 block text-sm font-medium text-slate-700">
                                Budget
                            </label>

                            <input
                                type="number"
                                min="0"
                                step="0.01"
                                value={form.budget}
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        budget: e.target.value,
                                    })
                                }
                                placeholder="Enter budget"
                                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                                required
                            />
                        </div>

                        {/* Status */}
                        <div>
                            <label className="mb-2 block text-sm font-medium text-slate-700">
                                Status
                            </label>

                            <select
                                value={form.status}
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        status: e.target.value,
                                    })
                                }
                                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                                required
                            >
                                <option value="Draft">Draft</option>
                                <option value="Pending">Pending</option>
                                <option value="Approved">Approved</option>
                                <option value="Rejected">Rejected</option>
                                <option value="Closed">Closed</option>
                            </select>
                        </div>

                        {/* Reason */}
                        <div className="md:col-span-2">
                            <label className="mb-2 block text-sm font-medium text-slate-700">
                                Reason
                            </label>

                            <textarea
                                value={form.reason}
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        reason: e.target.value,
                                    })
                                }
                                rows={3}
                                placeholder="Why is this position required?"
                                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                                required
                            />
                        </div>

                        {/* Approved At */}
                        <div>
                            <label className="mb-2 block text-sm font-medium text-slate-700">
                                Approved At
                            </label>

                            <input
                                type="datetime-local"
                                value={form.approved_at}
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        approved_at: e.target.value,
                                    })
                                }
                                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                            />
                        </div>

                        {/* Buttons */}
                        <div className="flex items-end gap-3">
                            <button
                                type="submit"
                                className="rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            >
                                {editingId
                                    ? 'Update Requisition'
                                    : 'Create Requisition'}
                            </button>

                            {editingId && (
                                <button
                                    type="button"
                                    onClick={resetForm}
                                    className="rounded-lg border border-slate-300 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                                >
                                    Cancel
                                </button>
                            )}
                        </div>
                    </form>
                </div>

                {/* Table Card */}
                <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
                    <div className="border-b border-slate-200 px-6 py-4">
                        <h2 className="text-lg font-semibold text-slate-900">
                            Requisition List
                        </h2>

                        <p className="mt-1 text-sm text-slate-500">
                            All submitted job requisitions.
                        </p>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead className="bg-slate-50">
                                <tr>
                                    <th className="px-6 py-3 text-left font-semibold text-slate-600">
                                        ID
                                    </th>

                                    <th className="px-6 py-3 text-left font-semibold text-slate-600">
                                        Company
                                    </th>

                                    <th className="px-6 py-3 text-left font-semibold text-slate-600">
                                        Department
                                    </th>

                                    <th className="px-6 py-3 text-left font-semibold text-slate-600">
                                        Position
                                    </th>

                                    <th className="px-6 py-3 text-left font-semibold text-slate-600">
                                        Positions
                                    </th>

                                    <th className="px-6 py-3 text-left font-semibold text-slate-600">
                                        Budget
                                    </th>

                                    <th className="px-6 py-3 text-left font-semibold text-slate-600">
                                        Status
                                    </th>

                                    <th className="px-6 py-3 text-left font-semibold text-slate-600">
                                        Actions
                                    </th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-slate-100">
                                {requisitions.length === 0 ? (
                                    <tr>
                                        <td
                                            colSpan={8}
                                            className="px-6 py-10 text-center text-slate-400"
                                        >
                                            No job requisitions found.
                                        </td>
                                    </tr>
                                ) : (
                                    requisitions.map((requisition) => (
                                        <tr
                                            key={requisition.id}
                                            className="transition hover:bg-slate-50"
                                        >
                                            <td className="px-6 py-4 font-medium text-slate-700">
                                                #{requisition.id}
                                            </td>

                                            <td className="px-6 py-4 text-slate-700">
                                                {requisition.company?.name ??
                                                    '-'}
                                            </td>

                                            <td className="px-6 py-4 text-slate-700">
                                                {requisition.department
                                                    ?.name ?? '-'}
                                            </td>

                                            <td className="px-6 py-4 font-medium text-slate-800">
                                                {requisition.position?.title ??
                                                    '-'}
                                            </td>

                                            <td className="px-6 py-4 text-slate-700">
                                                {
                                                    requisition.number_of_positions
                                                }
                                            </td>

                                            <td className="px-6 py-4 text-slate-700">
                                                {requisition.budget}
                                            </td>

                                            <td className="px-6 py-4">
                                                <span className="inline-flex rounded-full bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-700">
                                                    {requisition.status}
                                                </span>
                                            </td>

                                            <td className="px-6 py-4">
                                                <div className="flex gap-2">
                                                    <button
                                                        onClick={() =>
                                                            handleEdit(
                                                                requisition
                                                            )
                                                        }
                                                        className="rounded-lg border border-slate-300 px-3 py-1.5 text-xs font-medium text-slate-700 transition hover:bg-slate-100"
                                                    >
                                                        Edit
                                                    </button>

                                                    <button
                                                        onClick={() =>
                                                            handleDelete(
                                                                requisition.id
                                                            )
                                                        }
                                                        className="rounded-lg bg-red-50 px-3 py-1.5 text-xs font-medium text-red-600 transition hover:bg-red-100"
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
