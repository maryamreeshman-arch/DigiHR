import { Head, router, useForm } from '@inertiajs/react';
import { FormEvent, useState } from 'react';

interface Employee {
    id: number;
    employee_no: string;
    first_name: string;
    last_name: string;
}

interface LeaveType {
    id: number;
    name: string;
    code: string;
    allow_half_day: boolean;
}

interface LeaveRequestDay {
    id: number;
    date: string;
    duration: string;
    day_type: string;
}

interface LeaveRequest {
    id: number;
    employee_id: number;
    leave_type_id: number;
    start_date: string;
    end_date: string;
    total_days: number;
    reason: string;
    status: string;
    attachment_path?: string | null;
    employee: Employee;
    leave_type: LeaveType;
    days: LeaveRequestDay[];
}

interface Props {
    requests: LeaveRequest[];
    employees: Employee[];
    leaveTypes: LeaveType[];
}

interface DayEntry {
    date: string;
    duration: string;
    day_type: string;
}

export default function Index({
    requests,
    employees,
    leaveTypes,
}: Props) {
    const [editingId, setEditingId] = useState<number | null>(null);
    const [days, setDays] = useState<DayEntry[]>([]);

    const {
        data,
        setData,
        processing,
        errors,
        reset,
    } = useForm({
        employee_id: '',
        leave_type_id: '',
        start_date: '',
        end_date: '',
        total_days: '0',
        reason: '',
        attachment: null as File | null,
        days: [] as DayEntry[],
    });

    const inputClass =
        'w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100';

    const labelClass =
        'mb-1.5 block text-sm font-semibold text-gray-800';

    const updateDays = (updatedDays: DayEntry[]) => {
        setDays(updatedDays);

        const total = updatedDays.reduce(
            (sum, day) =>
                sum + (day.duration === 'half_day' ? 0.5 : 1),
            0,
        );

        setData('days', updatedDays);
        setData('total_days', String(total));
    };

    const generateDays = () => {
        if (!data.start_date || !data.end_date) {
            alert('Please select start date and end date.');
            return;
        }

        const start = new Date(`${data.start_date}T00:00:00`);
        const end = new Date(`${data.end_date}T00:00:00`);

        if (end < start) {
            alert('End date cannot be before start date.');
            return;
        }

        const generated: DayEntry[] = [];
        const current = new Date(start);

        while (current <= end) {
            const year = current.getFullYear();
            const month = String(current.getMonth() + 1).padStart(2, '0');
            const day = String(current.getDate()).padStart(2, '0');

            generated.push({
                date: `${year}-${month}-${day}`,
                duration: 'full_day',
                day_type: 'full_day',
            });

            current.setDate(current.getDate() + 1);
        }

        updateDays(generated);
    };

    const updateDay = (
        index: number,
        field: keyof DayEntry,
        value: string,
    ) => {
        const updated = [...days];

        updated[index] = {
            ...updated[index],
            [field]: value,
        };

        if (field === 'duration' && value === 'full_day') {
            updated[index].day_type = 'full_day';
        }

        updateDays(updated);
    };

    const clearForm = () => {
        reset();
        setDays([]);
        setEditingId(null);
    };

    const submit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (days.length === 0) {
            alert('Please generate leave days before submitting.');
            return;
        }

        const formData = new FormData();

        formData.append('employee_id', data.employee_id);
        formData.append('leave_type_id', data.leave_type_id);
        formData.append('start_date', data.start_date);
        formData.append('end_date', data.end_date);
        formData.append('total_days', data.total_days);
        formData.append('reason', data.reason);
        formData.append('days', JSON.stringify(days));

        if (data.attachment) {
            formData.append('attachment', data.attachment);
        }

        if (editingId !== null) {
            formData.append('_method', 'put');

            router.post(`/leave-requests/${editingId}`, formData, {
                forceFormData: true,
                onSuccess: () => clearForm(),
            });
        } else {
            router.post('/leave-requests', formData, {
                forceFormData: true,
                onSuccess: () => clearForm(),
            });
        }
    };

    const editRequest = (request: LeaveRequest) => {
        if (request.status !== 'pending') {
            alert('Only pending requests can be edited.');
            return;
        }

        const requestDays: DayEntry[] = (request.days ?? []).map((day) => ({
            date: day.date,
            duration: day.duration,
            day_type: day.day_type,
        }));

        setEditingId(request.id);
        setDays(requestDays);

        setData({
            employee_id: String(request.employee_id),
            leave_type_id: String(request.leave_type_id),
            start_date: request.start_date,
            end_date: request.end_date,
            total_days: String(request.total_days),
            reason: request.reason,
            attachment: null,
            days: requestDays,
        });

        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    const deleteRequest = (id: number) => {
        if (confirm('Are you sure you want to delete this leave request?')) {
            router.delete(`/leave-requests/${id}`);
        }
    };

    const approveRequest = (id: number) => {
        if (confirm('Are you sure you want to approve this leave request?')) {
            router.post(`/leave-requests/${id}/approve`);
        }
    };

    const rejectRequest = (id: number) => {
        if (confirm('Are you sure you want to reject this leave request?')) {
            router.post(`/leave-requests/${id}/reject`);
        }
    };

    return (
        <>
            <Head title="Leave Requests" />

            <main className="min-h-screen space-y-6 bg-gray-50 p-6 text-gray-900">

                <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                    <h1 className="text-2xl font-bold text-gray-900">
                        Leave Requests
                    </h1>

                    <p className="mt-2 text-sm font-medium text-gray-600">
                        Apply for leave and manage employee leave requests.
                    </p>
                </div>

                <form
                    onSubmit={submit}
                    className="space-y-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
                >
                    <div className="border-b border-gray-200 pb-4">
                        <h2 className="text-lg font-bold text-gray-900">
                            {editingId ? 'Edit Leave Request' : 'Apply for Leave'}
                        </h2>

                        <p className="mt-1 text-sm text-gray-600">
                            Enter the employee details and leave information below.
                        </p>
                    </div>

                    <div className="grid gap-5 md:grid-cols-2">
                        <div>
                            <label className={labelClass}>Employee</label>

                            <select
                                value={data.employee_id}
                                onChange={(e) => setData('employee_id', e.target.value)}
                                className={inputClass}
                                required
                                disabled={!!editingId}
                            >
                                <option value="">Select Employee</option>

                                {employees.map((employee) => (
                                    <option key={employee.id} value={employee.id}>
                                        {employee.employee_no} - {employee.first_name}{' '}
                                        {employee.last_name}
                                    </option>
                                ))}
                            </select>

                            {errors.employee_id && (
                                <p className="mt-1 text-sm font-medium text-red-600">
                                    {errors.employee_id}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className={labelClass}>Leave Type</label>

                            <select
                                value={data.leave_type_id}
                                onChange={(e) => setData('leave_type_id', e.target.value)}
                                className={inputClass}
                                required
                            >
                                <option value="">Select Leave Type</option>

                                {leaveTypes.map((type) => (
                                    <option key={type.id} value={type.id}>
                                        {type.name} ({type.code})
                                    </option>
                                ))}
                            </select>

                            {errors.leave_type_id && (
                                <p className="mt-1 text-sm font-medium text-red-600">
                                    {errors.leave_type_id}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className={labelClass}>Start Date</label>

                            <input
                                type="date"
                                value={data.start_date}
                                onChange={(e) => setData('start_date', e.target.value)}
                                className={inputClass}
                                required
                            />

                            {errors.start_date && (
                                <p className="mt-1 text-sm font-medium text-red-600">
                                    {errors.start_date}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className={labelClass}>End Date</label>

                            <input
                                type="date"
                                value={data.end_date}
                                onChange={(e) => setData('end_date', e.target.value)}
                                className={inputClass}
                                required
                            />

                            {errors.end_date && (
                                <p className="mt-1 text-sm font-medium text-red-600">
                                    {errors.end_date}
                                </p>
                            )}
                        </div>
                    </div>

                    <div>
                        <button
                            type="button"
                            onClick={generateDays}
                            className="rounded-lg bg-gray-800 px-5 py-2.5 text-sm font-semibold text-white hover:bg-gray-900"
                        >
                            Generate Leave Days
                        </button>
                    </div>

                    {days.length > 0 && (
                        <div className="overflow-hidden rounded-lg border border-gray-200">
                            <div className="flex flex-wrap items-center justify-between gap-2 bg-gray-100 p-4">
                                <h3 className="font-bold text-gray-900">
                                    Leave Days
                                </h3>

                                <span className="text-sm font-bold text-gray-800">
                                    Total: {data.total_days} days
                                </span>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="w-full text-left text-sm">
                                    <thead className="bg-gray-50 text-gray-800">
                                        <tr>
                                            <th className="p-3 font-semibold">Date</th>
                                            <th className="p-3 font-semibold">Duration</th>
                                            <th className="p-3 font-semibold">Day Type</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {days.map((day, index) => (
                                            <tr
                                                key={day.date}
                                                className="border-t border-gray-200 bg-white"
                                            >
                                                <td className="p-3 font-medium text-gray-800">
                                                    {day.date}
                                                </td>

                                                <td className="p-3">
                                                    <select
                                                        value={day.duration}
                                                        onChange={(e) =>
                                                            updateDay(index, 'duration', e.target.value)
                                                        }
                                                        className="rounded-lg border border-gray-300 bg-white p-2 text-gray-900"
                                                    >
                                                        <option value="full_day">Full Day</option>
                                                        <option value="half_day">Half Day</option>
                                                    </select>
                                                </td>

                                                <td className="p-3">
                                                    <select
                                                        value={day.day_type}
                                                        onChange={(e) =>
                                                            updateDay(index, 'day_type', e.target.value)
                                                        }
                                                        disabled={day.duration === 'full_day'}
                                                        className="rounded-lg border border-gray-300 bg-white p-2 text-gray-900 disabled:bg-gray-100 disabled:text-gray-500"
                                                    >
                                                        <option value="full_day">Full Day</option>
                                                        <option value="morning">Morning</option>
                                                        <option value="evening">Evening</option>
                                                    </select>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    <div>
                        <label className={labelClass}>Reason</label>

                        <textarea
                            value={data.reason}
                            onChange={(e) => setData('reason', e.target.value)}
                            className={inputClass}
                            rows={3}
                            placeholder="Enter reason for leave..."
                            required
                        />

                        {errors.reason && (
                            <p className="mt-1 text-sm font-medium text-red-600">
                                {errors.reason}
                            </p>
                        )}
                    </div>

                    <div>
                        <label className={labelClass}>
                            Supporting Document (Optional)
                        </label>

                        <input
                            type="file"
                            accept=".pdf,.jpg,.jpeg,.png"
                            onChange={(e) =>
                                setData('attachment', e.target.files?.[0] ?? null)
                            }
                            className={inputClass}
                        />

                        {errors.attachment && (
                            <p className="mt-1 text-sm font-medium text-red-600">
                                {errors.attachment}
                            </p>
                        )}
                    </div>

                    <div className="flex flex-wrap gap-3 border-t border-gray-200 pt-5">
                        <button
                            type="submit"
                            disabled={processing}
                            className="rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            {processing
                                ? 'Saving...'
                                : editingId
                                  ? 'Update Request'
                                  : 'Submit Leave Request'}
                        </button>

                        {editingId && (
                            <button
                                type="button"
                                onClick={clearForm}
                                className="rounded-lg border border-gray-300 bg-white px-6 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-100"
                            >
                                Cancel
                            </button>
                        )}
                    </div>
                </form>

                <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
                    <div className="border-b border-gray-200 p-5">
                        <h2 className="text-lg font-bold text-gray-900">
                            All Leave Requests
                        </h2>

                        <p className="mt-1 text-sm font-medium text-gray-600">
                            View, approve, reject and manage submitted leave requests.
                        </p>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                            <thead className="bg-gray-100 text-gray-800">
                                <tr>
                                    <th className="p-3 font-semibold">Employee</th>
                                    <th className="p-3 font-semibold">Leave Type</th>
                                    <th className="p-3 font-semibold">Start Date</th>
                                    <th className="p-3 font-semibold">End Date</th>
                                    <th className="p-3 font-semibold">Days</th>
                                    <th className="p-3 font-semibold">Reason</th>
                                    <th className="p-3 font-semibold">Status</th>
                                    <th className="p-3 font-semibold">Actions</th>
                                </tr>
                            </thead>

                            <tbody>
                                {requests.length > 0 ? (
                                    requests.map((request) => (
                                        <tr
                                            key={request.id}
                                            className="border-t border-gray-200 bg-white hover:bg-gray-50"
                                        >
                                            <td className="p-3 font-medium text-gray-900">
                                                {request.employee?.first_name}{' '}
                                                {request.employee?.last_name}

                                                <p className="mt-1 text-xs text-gray-600">
                                                    {request.employee?.employee_no}
                                                </p>
                                            </td>

                                            <td className="p-3 text-gray-800">
                                                {request.leave_type?.name ?? '-'}
                                            </td>

                                            <td className="p-3 text-gray-800">
                                                {request.start_date}
                                            </td>

                                            <td className="p-3 text-gray-800">
                                                {request.end_date}
                                            </td>

                                            <td className="p-3 font-semibold text-gray-900">
                                                {request.total_days}
                                            </td>

                                            <td className="max-w-48 p-3 text-gray-700">
                                                {request.reason}
                                            </td>

                                            <td className="p-3">
                                                <span
                                                    className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${
                                                        request.status === 'approved'
                                                            ? 'bg-green-100 text-green-800'
                                                            : request.status === 'rejected'
                                                              ? 'bg-red-100 text-red-800'
                                                              : 'bg-yellow-100 text-yellow-800'
                                                    }`}
                                                >
                                                    {request.status}
                                                </span>
                                            </td>

                                            <td className="whitespace-nowrap p-3">
                                                <div className="flex items-center gap-3">
                                                    {request.status === 'pending' && (
                                                        <>
                                                            <button
                                                                type="button"
                                                                onClick={() => editRequest(request)}
                                                                className="font-semibold text-blue-600 hover:underline"
                                                            >
                                                                Edit
                                                            </button>

                                                            <button
                                                                type="button"
                                                                onClick={() => approveRequest(request.id)}
                                                                className="font-semibold text-green-600 hover:underline"
                                                            >
                                                                Approve
                                                            </button>

                                                            <button
                                                                type="button"
                                                                onClick={() => rejectRequest(request.id)}
                                                                className="font-semibold text-orange-600 hover:underline"
                                                            >
                                                                Reject
                                                            </button>
                                                        </>
                                                    )}

                                                    <button
                                                        type="button"
                                                        onClick={() => deleteRequest(request.id)}
                                                        className="font-semibold text-red-600 hover:underline"
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
                                            colSpan={8}
                                            className="p-8 text-center font-medium text-gray-600"
                                        >
                                            No leave requests found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        </>
    );
}
