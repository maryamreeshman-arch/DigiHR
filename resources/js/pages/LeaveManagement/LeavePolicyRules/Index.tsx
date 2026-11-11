import { Head, router, useForm } from '@inertiajs/react';
import { FormEvent, useState } from 'react';

interface LeaveType {
    id: number;
    name: string;
    code: string;
}

interface PolicyRule {
    id: number;
    leave_policy_id: number;
    leave_type_id: number;
    entitlement_days: string;
    carry_forward: boolean;
    max_carry_forward: string;
    encashment_allowed: boolean;
    probation_allowed: boolean;
    leave_type?: LeaveType;
}

interface Policy {
    id: number;
    name: string;
    year: number;
    rules: PolicyRule[];
}

interface Props {
    policies: Policy[];
    leaveTypes: LeaveType[];
}

export default function Index({ policies, leaveTypes }: Props) {
    const [editing, setEditing] = useState<PolicyRule | null>(null);

    const { data, setData, post, put, processing, reset, errors } = useForm({
        leave_policy_id: '',
        leave_type_id: '',
        entitlement_days: '14',
        carry_forward: false,
        max_carry_forward: '0',
        encashment_allowed: false,
        probation_allowed: false,
    });

    const submit = (e: FormEvent) => {
        e.preventDefault();

        if (editing) {
            put(`/leave-policy-rules/${editing.id}`, {
                onSuccess: () => {
                    reset();
                    setEditing(null);
                },
            });
        } else {
            post('/leave-policy-rules', {
                onSuccess: () => reset(),
            });
        }
    };

    const editRule = (rule: PolicyRule) => {
        setEditing(rule);
        setData({
            leave_policy_id: String(rule.leave_policy_id),
            leave_type_id: String(rule.leave_type_id),
            entitlement_days: String(rule.entitlement_days),
            carry_forward: rule.carry_forward,
            max_carry_forward: String(rule.max_carry_forward),
            encashment_allowed: rule.encashment_allowed,
            probation_allowed: rule.probation_allowed,
        });
    };

    const deleteRule = (id: number) => {
        if (confirm('Are you sure you want to delete this policy rule?')) {
            router.delete(`/leave-policy-rules/${id}`);
        }
    };

    return (
        <>
            <Head title="Leave Policy Rules" />

            <div className="space-y-6 p-6">
                <div>
                    <h1 className="text-2xl font-bold">Leave Policy Rules</h1>
                    <p className="text-sm text-muted-foreground">
                        Configure leave entitlement and carry-forward rules.
                    </p>
                </div>

                <form onSubmit={submit} className="space-y-4 rounded-xl border p-5">
                    <h2 className="text-lg font-semibold">
                        {editing ? 'Edit Policy Rule' : 'Add Policy Rule'}
                    </h2>

                    <div className="grid gap-4 md:grid-cols-2">
                        <div>
                            <label className="mb-1 block text-sm font-medium">Leave Policy</label>
                            <select
                                className="w-full rounded-md border p-2"
                                value={data.leave_policy_id}
                                onChange={(e) => setData('leave_policy_id', e.target.value)}
                                required
                            >
                                <option value="">Select Policy</option>
                                {policies.map((policy) => (
                                    <option key={policy.id} value={policy.id}>
                                        {policy.name} ({policy.year})
                                    </option>
                                ))}
                            </select>
                            {errors.leave_policy_id && <p className="text-sm text-red-500">{errors.leave_policy_id}</p>}
                        </div>

                        <div>
                            <label className="mb-1 block text-sm font-medium">Leave Type</label>
                            <select
                                className="w-full rounded-md border p-2"
                                value={data.leave_type_id}
                                onChange={(e) => setData('leave_type_id', e.target.value)}
                                required
                            >
                                <option value="">Select Leave Type</option>
                                {leaveTypes.map((type) => (
                                    <option key={type.id} value={type.id}>
                                        {type.name} ({type.code})
                                    </option>
                                ))}
                            </select>
                            {errors.leave_type_id && <p className="text-sm text-red-500">{errors.leave_type_id}</p>}
                        </div>

                        <div>
                            <label className="mb-1 block text-sm font-medium">Entitlement Days</label>
                            <input
                                type="number"
                                min="0"
                                step="0.5"
                                className="w-full rounded-md border p-2"
                                value={data.entitlement_days}
                                onChange={(e) => setData('entitlement_days', e.target.value)}
                                required
                            />
                        </div>

                        <div>
                            <label className="mb-1 block text-sm font-medium">Maximum Carry Forward</label>
                            <input
                                type="number"
                                min="0"
                                step="0.5"
                                className="w-full rounded-md border p-2"
                                value={data.max_carry_forward}
                                onChange={(e) => setData('max_carry_forward', e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div className="grid gap-3 sm:grid-cols-2">
                        {([
                            ['carry_forward', 'Allow Carry Forward'],
                            ['encashment_allowed', 'Allow Encashment'],
                            ['probation_allowed', 'Allow During Probation'],
                        ] as const).map(([key, label]) => (
                            <label key={key} className="flex items-center gap-2 text-sm">
                                <input
                                    type="checkbox"
                                    checked={data[key]}
                                    onChange={(e) => setData(key, e.target.checked)}
                                />
                                {label}
                            </label>
                        ))}
                    </div>

                    <div className="flex gap-2">
                        <button
                            type="submit"
                            disabled={processing}
                            className="rounded-md bg-primary px-4 py-2 text-primary-foreground disabled:opacity-50"
                        >
                            {processing ? 'Saving...' : editing ? 'Update Rule' : 'Save Rule'}
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

                <div className="space-y-4">
                    {policies.map((policy) => (
                        <div key={policy.id} className="overflow-x-auto rounded-xl border">
                            <div className="border-b bg-muted p-4 font-semibold">
                                {policy.name} — {policy.year}
                            </div>

                            <table className="w-full text-sm">
                                <thead>
                                    <tr>
                                        <th className="p-3 text-left">Leave Type</th>
                                        <th className="p-3 text-left">Entitlement</th>
                                        <th className="p-3 text-left">Carry Forward</th>
                                        <th className="p-3 text-left">Max Carry</th>
                                        <th className="p-3 text-left">Encashment</th>
                                        <th className="p-3 text-left">Probation</th>
                                        <th className="p-3 text-left">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {policy.rules.map((rule) => (
                                        <tr key={rule.id} className="border-t">
                                            <td className="p-3">{rule.leave_type?.name ?? 'Unknown'}</td>
                                            <td className="p-3">{rule.entitlement_days}</td>
                                            <td className="p-3">{rule.carry_forward ? 'Yes' : 'No'}</td>
                                            <td className="p-3">{rule.max_carry_forward}</td>
                                            <td className="p-3">{rule.encashment_allowed ? 'Yes' : 'No'}</td>
                                            <td className="p-3">{rule.probation_allowed ? 'Yes' : 'No'}</td>
                                            <td className="space-x-2 p-3">
                                                <button onClick={() => editRule(rule)} className="text-blue-600 hover:underline">
                                                    Edit
                                                </button>
                                                <button onClick={() => deleteRule(rule.id)} className="text-red-600 hover:underline">
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                    {policy.rules.length === 0 && (
                                        <tr>
                                            <td colSpan={7} className="p-4 text-center text-muted-foreground">
                                                No rules added to this policy.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}
