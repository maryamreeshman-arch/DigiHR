import { Head, router } from '@inertiajs/react';
import { useState } from 'react';

type AttendanceRecord = {
    id?: number;
    attendance_date: string;
    check_in: string | null;
    check_out: string | null;
    status: string;
};

type Props = {
    record: AttendanceRecord | null;
    records: AttendanceRecord[];
};

function formatDate(value: string | null) {
    if (!value) return '--';

    const date = new Date(value);

    return date.toLocaleDateString('en-GB', {
        timeZone: 'Asia/Colombo',
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    });
}

function formatTime(value: string | null) {
    if (!value) return '--:--';

    const date = new Date(value);

    return date.toLocaleTimeString('en-US', {
        timeZone: 'Asia/Colombo',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
    });
}

export default function Index({ record, records = [] }: Props) {
    const [processing, setProcessing] = useState(false);

    const submitAttendance = (action: 'check-in' | 'check-out') => {
        setProcessing(true);

        router.post(`/attendance/${action}`, {}, {
            onFinish: () => setProcessing(false),
        });
    };

    const hasCheckedIn = Boolean(record?.check_in);
    const hasCheckedOut = Boolean(record?.check_out);

    return (
        <>
            <Head title="My Attendance" />

            <div className="min-h-screen bg-gray-50 p-6 text-gray-900 md:p-10">
                <div className="mx-auto max-w-6xl">
                    <div className="mb-8">
                        <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
                            Employee Self Service
                        </p>

                        <h1 className="mt-2 text-3xl font-bold">
                            My Attendance
                        </h1>

                        <p className="mt-2 text-sm text-gray-600">
                            Record and review your daily working hours.
                        </p>
                    </div>

                    <div className="mb-6 grid gap-5 sm:grid-cols-2">
                        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
                            <p className="text-sm font-medium text-gray-600">
                                Check In
                            </p>

                            <p className="mt-3 text-2xl font-bold">
                                {formatTime(record?.check_in ?? null)}
                            </p>

                            <p className="mt-2 text-sm text-gray-500">
                                {hasCheckedIn
                                    ? 'Successfully checked in'
                                    : 'Not checked in yet'}
                            </p>
                        </div>

                        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
                            <p className="text-sm font-medium text-gray-600">
                                Check Out
                            </p>

                            <p className="mt-3 text-2xl font-bold">
                                {formatTime(record?.check_out ?? null)}
                            </p>

                            <p className="mt-2 text-sm text-gray-500">
                                {hasCheckedOut
                                    ? 'Workday completed'
                                    : 'Not checked out yet'}
                            </p>
                        </div>
                    </div>

                    <div className="mb-8 rounded-xl border border-gray-200 bg-white p-6 shadow-sm md:p-8">
                        <div className="flex flex-wrap items-start justify-between gap-4">
                            <div>
                                <h2 className="text-xl font-bold">
                                    Today's Attendance
                                </h2>

                                <p className="mt-2 text-sm text-gray-600">
                                    Date: {record
                                        ? formatDate(record.attendance_date)
                                        : new Date().toLocaleDateString('en-GB', {
                                            timeZone: 'Asia/Colombo',
                                            day: '2-digit',
                                            month: '2-digit',
                                            year: 'numeric',
                                        })}
                                </p>
                            </div>

                            <span className={`inline-flex rounded-full px-3 py-1 text-sm font-semibold ${
                                hasCheckedOut
                                    ? 'bg-blue-100 text-blue-800'
                                    : hasCheckedIn
                                      ? 'bg-green-100 text-green-800'
                                      : 'bg-gray-100 text-gray-700'
                            }`}>
                                {hasCheckedOut
                                    ? 'Completed'
                                    : hasCheckedIn
                                      ? 'Present'
                                      : 'Not Started'}
                            </span>
                        </div>

                        <div className="my-6 border-t border-gray-200" />

                        <div className="grid gap-6 sm:grid-cols-3">
                            <div>
                                <p className="text-sm font-medium text-gray-500">
                                    Check-in time
                                </p>
                                <p className="mt-2 font-semibold">
                                    {formatTime(record?.check_in ?? null)}
                                </p>
                            </div>

                            <div>
                                <p className="text-sm font-medium text-gray-500">
                                    Check-out time
                                </p>
                                <p className="mt-2 font-semibold">
                                    {formatTime(record?.check_out ?? null)}
                                </p>
                            </div>

                            <div>
                                <p className="text-sm font-medium text-gray-500">
                                    Attendance status
                                </p>
                                <p className="mt-2 font-semibold capitalize">
                                    {record?.status ?? 'Not started'}
                                </p>
                            </div>
                        </div>

                        <div className="mt-8 flex flex-wrap gap-3">
                            <button
                                type="button"
                                disabled={processing || hasCheckedIn}
                                onClick={() => submitAttendance('check-in')}
                                className="rounded-lg bg-green-600 px-6 py-3 font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-600"
                            >
                                {processing && !hasCheckedIn
                                    ? 'Processing...'
                                    : 'Check In'}
                            </button>

                            <button
                                type="button"
                                disabled={processing || !hasCheckedIn || hasCheckedOut}
                                onClick={() => submitAttendance('check-out')}
                                className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-600"
                            >
                                {processing && hasCheckedIn && !hasCheckedOut
                                    ? 'Processing...'
                                    : 'Check Out'}
                            </button>
                        </div>

                        <p className="mt-4 text-sm text-gray-500">
                            Please check in when you start work and check out when you finish.
                        </p>
                    </div>

                    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
                        <div className="border-b border-gray-200 p-6">
                            <h2 className="text-xl font-bold">
                                Attendance History
                            </h2>

                            <p className="mt-1 text-sm text-gray-600">
                                Your latest 30 attendance records.
                            </p>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-sm">
                                <thead className="bg-gray-50 text-gray-600">
                                    <tr>
                                        <th className="px-6 py-4 font-semibold">Date</th>
                                        <th className="px-6 py-4 font-semibold">Check In</th>
                                        <th className="px-6 py-4 font-semibold">Check Out</th>
                                        <th className="px-6 py-4 font-semibold">Status</th>
                                    </tr>
                                </thead>

                                <tbody className="divide-y divide-gray-100">
                                    {records.length > 0 ? (
                                        records.map((item, index) => (
                                            <tr
                                                key={item.id ?? `${item.attendance_date}-${index}`}
                                                className="hover:bg-gray-50"
                                            >
                                                <td className="whitespace-nowrap px-6 py-4 font-medium">
                                                    {formatDate(item.attendance_date)}
                                                </td>

                                                <td className="whitespace-nowrap px-6 py-4">
                                                    {formatTime(item.check_in)}
                                                </td>

                                                <td className="whitespace-nowrap px-6 py-4">
                                                    {formatTime(item.check_out)}
                                                </td>

                                                <td className="px-6 py-4">
                                                    <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                                                        item.check_out
                                                            ? 'bg-blue-100 text-blue-800'
                                                            : item.check_in
                                                              ? 'bg-green-100 text-green-800'
                                                              : 'bg-gray-100 text-gray-700'
                                                    }`}>
                                                        {item.check_out
                                                            ? 'Completed'
                                                            : item.check_in
                                                              ? 'Present'
                                                              : item.status}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td
                                                colSpan={4}
                                                className="px-6 py-10 text-center text-gray-500"
                                            >
                                                No attendance records found.
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
