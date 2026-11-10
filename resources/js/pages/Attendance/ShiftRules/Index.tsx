import { useForm } from '@inertiajs/react';
import { FormEvent } from 'react';

interface ShiftRule {
    late_after_minutes: number;
    early_leave_before_minutes: number;
    overtime_after_minutes: number;
    overtime_rate: number;
}

interface Shift {
    id: number;
    name: string;
    code: string;
    start_time: string;
    end_time: string;
    shift_rule: ShiftRule | null;
}

interface Props {
    shifts: Shift[];
}

function ShiftRuleCard({ shift }: { shift: Shift }) {
    const { data, setData, put, processing, errors } = useForm({
        late_after_minutes:
            shift.shift_rule?.late_after_minutes ?? 10,

        early_leave_before_minutes:
            shift.shift_rule?.early_leave_before_minutes ?? 10,

        overtime_after_minutes:
            shift.shift_rule?.overtime_after_minutes ?? 30,

        overtime_rate:
            shift.shift_rule?.overtime_rate ?? 1.5,
    });

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        put(`/shift-rules/${shift.id}`);
    };

    const fields = [
        {
            name: 'late_after_minutes' as const,
            label: 'Late After',
            description: 'Allowed late arrival time',
        },
        {
            name: 'early_leave_before_minutes' as const,
            label: 'Early Leave Before',
            description: 'Early departure threshold',
        },
        {
            name: 'overtime_after_minutes' as const,
            label: 'Overtime After',
            description: 'Minutes before overtime starts',
        },
        {
            name: 'overtime_rate' as const,
            label: 'Overtime Rate',
            description: 'Overtime multiplier',
        },
    ];

    return (
        <div className="rounded-xl border bg-white p-6 shadow-sm dark:bg-gray-900">
            <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
                <div>
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {shift.name}
                    </h2>

                    <p className="text-sm text-gray-500">
                        Code: {shift.code} | {shift.start_time} - {shift.end_time}
                    </p>
                </div>

                <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700">
                    Shift Rules
                </span>
            </div>

            <form onSubmit={handleSubmit}>
                <div className="grid gap-5 sm:grid-cols-2">
                    {fields.map((field) => (
                        <div key={field.name}>
                            <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-200">
                                {field.label}
                            </label>

                            <p className="mb-2 text-xs text-gray-500">
                                {field.description}
                            </p>

                            <input
                                type="number"
                                min="0"
                                max={field.name === 'overtime_rate' ? 99.99 : 1440}
                                step={field.name === 'overtime_rate' ? 0.01 : 1}
                                value={data[field.name]}
                                onChange={(e) =>
                                    setData(
                                        field.name,
                                        Number(e.target.value)
                                    )
                                }
                                className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                            />

                            {errors[field.name] && (
                                <p className="mt-1 text-sm text-red-600">
                                    {errors[field.name]}
                                </p>
                            )}
                        </div>
                    ))}
                </div>

                <div className="mt-6 flex justify-end">
                    <button
                        type="submit"
                        disabled={processing}
                        className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        {processing ? 'Saving...' : 'Save Rules'}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default function Index({ shifts }: Props) {
    return (
        <div className="space-y-6 p-6">
            <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Shift Rules
                </h1>

                <p className="mt-1 text-sm text-gray-500">
                    Configure late arrival, early departure and overtime rules for each shift.
                </p>
            </div>

            {shifts.length === 0 ? (
                <div className="rounded-xl border bg-white p-8 text-center dark:bg-gray-900">
                    <p className="text-gray-500">
                        No shifts available. Please create a shift first.
                    </p>
                </div>
            ) : (
                <div className="space-y-5">
                    {shifts.map((shift) => (
                        <ShiftRuleCard
                            key={shift.id}
                            shift={shift}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
