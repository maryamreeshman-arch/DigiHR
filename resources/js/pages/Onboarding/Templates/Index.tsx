import { FormEvent, useState } from 'react';
import { Head, useForm } from '@inertiajs/react';

type Tenant = {
    id: number;
    name: string;
};

type OnboardingTemplate = {
    id: number;
    tenant_id: number;
    name: string;
    description: string | null;
    status: string;
    tenant?: Tenant;
};

type Props = {
    templates: OnboardingTemplate[];
    tenants: Tenant[];
};

export default function Index({ templates, tenants }: Props) {
    const [editingTemplate, setEditingTemplate] =
        useState<OnboardingTemplate | null>(null);

    const { data, setData, post, put, processing, reset } = useForm({
        tenant_id: '',
        name: '',
        description: '',
        status: 'Active',
    });

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        if (editingTemplate) {
            put(`/onboarding-templates/${editingTemplate.id}`, {
                onSuccess: () => {
                    setEditingTemplate(null);
                    reset();
                },
            });
        } else {
            post('/onboarding-templates', {
                onSuccess: () => reset(),
            });
        }
    };

    const handleEdit = (template: OnboardingTemplate) => {
        setEditingTemplate(template);

        setData({
            tenant_id: String(template.tenant_id),
            name: template.name,
            description: template.description ?? '',
            status: template.status,
        });
    };

    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this onboarding template?')) {
            const form = document.createElement('form');

            form.method = 'POST';
            form.action = `/onboarding-templates/${id}`;

            const csrf = document.querySelector(
                'meta[name="csrf-token"]'
            ) as HTMLMetaElement | null;

            if (csrf) {
                const csrfInput = document.createElement('input');
                csrfInput.type = 'hidden';
                csrfInput.name = '_token';
                csrfInput.value = csrf.content;
                form.appendChild(csrfInput);
            }

            const methodInput = document.createElement('input');
            methodInput.type = 'hidden';
            methodInput.name = '_method';
            methodInput.value = 'DELETE';

            form.appendChild(methodInput);
            document.body.appendChild(form);
            form.submit();
        }
    };

    const handleCancel = () => {
        setEditingTemplate(null);
        reset();
    };

    return (
        <>
            <Head title="Onboarding Templates" />

            <div className="min-h-screen bg-slate-100 p-6">
                <div className="mx-auto max-w-7xl">
                    {/* Header */}
                    <div className="mb-6">
                        <h1 className="text-3xl font-bold text-slate-800">
                            Onboarding Templates
                        </h1>

                        <p className="mt-1 text-sm text-slate-500">
                            Create and manage employee onboarding templates.
                        </p>
                    </div>

                    {/* Form */}
                    <div className="mb-8 rounded-xl bg-white p-6 shadow-sm">
                        <h2 className="mb-5 text-xl font-semibold text-slate-800">
                            {editingTemplate
                                ? 'Edit Onboarding Template'
                                : 'Create Onboarding Template'}
                        </h2>

                        <form
                            onSubmit={handleSubmit}
                            className="grid grid-cols-1 gap-5 md:grid-cols-2"
                        >
                            {/* Tenant */}
                            <div>
                                <label className="mb-2 block text-sm font-medium text-slate-700">
                                    Tenant
                                </label>

                                <select
                                    value={data.tenant_id}
                                    onChange={(e) =>
                                        setData('tenant_id', e.target.value)
                                    }
                                    required
                                    className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-slate-900 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                                >
                                    <option value="">
                                        Select Tenant
                                    </option>

                                    {tenants.map((tenant) => (
                                        <option
                                            key={tenant.id}
                                            value={tenant.id}
                                        >
                                            {tenant.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Name */}
                            <div>
                                <label className="mb-2 block text-sm font-medium text-slate-700">
                                    Template Name
                                </label>

                                <input
                                    type="text"
                                    value={data.name}
                                    onChange={(e) =>
                                        setData('name', e.target.value)
                                    }
                                    placeholder="e.g. New Employee Onboarding"
                                    required
                                    className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-slate-900 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                                />
                            </div>

                            {/* Description */}
                            <div className="md:col-span-2">
                                <label className="mb-2 block text-sm font-medium text-slate-700">
                                    Description
                                </label>

                                <textarea
                                    value={data.description}
                                    onChange={(e) =>
                                        setData('description', e.target.value)
                                    }
                                    rows={4}
                                    placeholder="Describe this onboarding template..."
                                    className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-slate-900 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                                />
                            </div>

                            {/* Status */}
                            <div>
                                <label className="mb-2 block text-sm font-medium text-slate-700">
                                    Status
                                </label>

                                <select
                                    value={data.status}
                                    onChange={(e) =>
                                        setData('status', e.target.value)
                                    }
                                    required
                                    className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-slate-900 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                                >
                                    <option value="Active">Active</option>
                                    <option value="Inactive">Inactive</option>
                                    <option value="Draft">Draft</option>
                                </select>
                            </div>

                            {/* Buttons */}
                            <div className="flex items-end gap-3">
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="rounded-lg bg-indigo-600 px-5 py-2.5 font-medium text-white hover:bg-indigo-700 disabled:opacity-50"
                                >
                                    {processing
                                        ? 'Saving...'
                                        : editingTemplate
                                          ? 'Update Template'
                                          : 'Create Template'}
                                </button>

                                {editingTemplate && (
                                    <button
                                        type="button"
                                        onClick={handleCancel}
                                        className="rounded-lg bg-slate-200 px-5 py-2.5 font-medium text-slate-700 hover:bg-slate-300"
                                    >
                                        Cancel
                                    </button>
                                )}
                            </div>
                        </form>
                    </div>

                    {/* Table */}
                    <div className="overflow-hidden rounded-xl bg-white shadow-sm">
                        <div className="border-b border-slate-200 px-6 py-4">
                            <h2 className="text-xl font-semibold text-slate-800">
                                Onboarding Templates
                            </h2>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-slate-50">
                                    <tr>
                                        <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                                            #
                                        </th>

                                        <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                                            Tenant
                                        </th>

                                        <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                                            Template Name
                                        </th>

                                        <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                                            Description
                                        </th>

                                        <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                                            Status
                                        </th>

                                        <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>

                                <tbody className="divide-y divide-slate-200">
                                    {templates.length > 0 ? (
                                        templates.map((template) => (
                                            <tr
                                                key={template.id}
                                                className="hover:bg-slate-50"
                                            >
                                                <td className="px-6 py-4 text-sm text-slate-600">
                                                    {template.id}
                                                </td>

                                                <td className="px-6 py-4 text-sm font-medium text-slate-800">
                                                    {template.tenant?.name ??
                                                        'N/A'}
                                                </td>

                                                <td className="px-6 py-4 text-sm font-medium text-slate-800">
                                                    {template.name}
                                                </td>

                                                <td className="max-w-md px-6 py-4 text-sm text-slate-600">
                                                    {template.description ||
                                                        '—'}
                                                </td>

                                                <td className="px-6 py-4">
                                                    <span
                                                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                                                            template.status ===
                                                            'Active'
                                                                ? 'bg-green-100 text-green-700'
                                                                : template.status ===
                                                                    'Draft'
                                                                  ? 'bg-yellow-100 text-yellow-700'
                                                                  : 'bg-red-100 text-red-700'
                                                        }`}
                                                    >
                                                        {template.status}
                                                    </span>
                                                </td>

                                                <td className="px-6 py-4">
                                                    <div className="flex gap-2">
                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                handleEdit(
                                                                    template
                                                                )
                                                            }
                                                            className="rounded-lg bg-blue-100 px-3 py-2 text-sm font-medium text-blue-700 hover:bg-blue-200"
                                                        >
                                                            Edit
                                                        </button>

                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                handleDelete(
                                                                    template.id
                                                                )
                                                            }
                                                            className="rounded-lg bg-red-100 px-3 py-2 text-sm font-medium text-red-700 hover:bg-red-200"
                                                        >
                                                            Delete
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td
                                                colSpan={6}
                                                className="px-6 py-10 text-center text-sm text-slate-500"
                                            >
                                                No onboarding templates found.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}