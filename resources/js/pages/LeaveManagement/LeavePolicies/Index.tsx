import { Head, router, useForm } from '@inertiajs/react';
import { FormEvent, useState } from 'react';

interface Policy {
    id: number;
    name: string;
    year: number;
}

interface Props {
    policies: Policy[];
}

export default function Index({ policies }: Props) {
    const [editing, setEditing] = useState<Policy | null>(null);

    const { data, setData, post, put, processing, reset, errors } = useForm({
        name: '',
        year: new Date().getFullYear(),
    });

    const submit = (e: FormEvent) => {
        e.preventDefault();

        if (editing) {
            put(`/leave-policies/${editing.id}`, {
                onSuccess: () => {
                    reset();
                    setEditing(null);
                },
            });
        } else {
            post('/leave-policies', {
                onSuccess: () => reset(),
            });
        }
    };

    const editPolicy = (policy: Policy) => {
        setEditing(policy);
        setData({
            name: policy.name,
            year: policy.year,
        });
    };

    const deletePolicy = (id: number) => {
        if (confirm('Are you sure you want to delete this policy?')) {
            router.delete(`/leave-policies/${id}`);
        }
    };

    return (
        <>
            <Head title="Leave Policies" />

            <div className="space-y-6 p-6">
                <div>
                    <h1 className="text-2xl font-bold">Leave Policies</h1>
                    <p className="text-sm text-muted-foreground">
                        Create and manage yearly leave policies.
                    </p>
                </div>

                <form onSubmit={submit} className="space-y-4 rounded-xl border p-5">
                    <h2 className="text-lg font-semibold">
                        {editing ? 'Edit Leave Policy' : 'Add Leave Policy'}
                    </h2>

                    <div className="grid gap-4 md:grid-cols-2">
                        <div>
                            <label className="mb-1 block text-sm font-medium">Policy Name</label>
                            <input
                                className="w-full rounded-md border p-2"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                placeholder="Standard Employee Policy"
                                required
                            />
                            {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
                        </div>

                        <div>
                            <label className="mb-1 block text-sm font-medium">Year</label>
                            <input
                                type="number"
                                min="2000"
                                max="2100"
                                className="w-full rounded-md border p-2"
                                value={data.year}
                                onChange={(e) => setData('year', Number(e.target.value))}
                                required
                            />
                            {errors.year && <p className="text-sm text-red-500">{errors.year}</p>}
                        </div>
                    </div>

                    <div className="flex gap-2">
                        <button
                            type="submit"
                            disabled={processing}
                            className="rounded-md bg-primary px-4 py-2 text-primary-foreground disabled:opacity-50"
                        >
                            {processing ? 'Saving...' : editing ? 'Update Policy' : 'Save Policy'}
                        </button>

                        {editing && (
                            <button
                                type="button"
                                onClick={() => {
                                    reset();
                                    setEditing(null);
                                }}
                                className="rounded-md border px-4 py-2"
                            >
                                Cancel
                            </button>
                        )}
                    </div>
                </form>

                <div className="overflow-x-auto rounded-xl border">
                    <table className="w-full text-sm">
                        <thead className="bg-muted">
                            <tr>
                                <th className="p-3 text-left">Policy Name</th>
                                <th className="p-3 text-left">Year</th>
                                <th className="p-3 text-left">Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {policies.length > 0 ? policies.map((policy) => (
                                <tr key={policy.id} className="border-t">
                                    <td className="p-3">{policy.name}</td>
                                    <td className="p-3">{policy.year}</td>
                                    <td className="space-x-3 p-3">
                                        <button
                                            onClick={() => editPolicy(policy)}
                                            className="text-blue-600 hover:underline"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => deletePolicy(policy.id)}
                                            className="text-red-600 hover:underline"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan={3} className="p-6 text-center text-muted-foreground">
                                        No leave policies found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}
