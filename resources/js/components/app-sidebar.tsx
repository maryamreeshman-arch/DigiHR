import { Link, usePage } from '@inertiajs/react';
import {
    BriefcaseBusiness,
    Building2,
    CalendarDays,
    ChevronDown,
    Clock,
    LayoutGrid,
    UserRoundCheck,
    Users,
} from 'lucide-react';
import { useEffect, useState } from 'react';

import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';

export function AppSidebar() {
    const { url } = usePage();

    const [employeesOpen, setEmployeesOpen] = useState(false);
    const [employmentStructureOpen, setEmploymentStructureOpen] = useState(false);
    const [organizationOpen, setOrganizationOpen] = useState(false);
    const [atsOpen, setAtsOpen] = useState(false);
    const [onboardingOpen, setOnboardingOpen] = useState(false);
    const [attendanceOpen, setAttendanceOpen] = useState(false);

    useEffect(() => {
        if (
            url.startsWith('/employees') ||
            url.startsWith('/employment-structure') ||
            url.startsWith('/employment-history')
        ) {
            setEmployeesOpen(true);
        }

        if (url.startsWith('/employment-structure')) {
            setEmploymentStructureOpen(true);
        }

        if (
            url.startsWith('/legal-entities') ||
            url.startsWith('/companies') ||
            url.startsWith('/business-units') ||
            url.startsWith('/branches') ||
            url.startsWith('/departments') ||
            url.startsWith('/divisions') ||
            url.startsWith('/locations') ||
            url.startsWith('/cost-centers')
        ) {
            setOrganizationOpen(true);
        }

        if (
            url.startsWith('/job-requisitions') ||
            url.startsWith('/job-postings') ||
            url.startsWith('/candidates') ||
            url.startsWith('/candidate-contacts') ||
            url.startsWith('/candidate-education') ||
            url.startsWith('/candidate-experience') ||
            url.startsWith('/candidate-skills') ||
            url.startsWith('/applications') ||
            url.startsWith('/application-status-histories') ||
            url.startsWith('/interviews') ||
            url.startsWith('/interviewers') ||
            url.startsWith('/job-offers') ||
            url.startsWith('/assessments')
        ) {
            setAtsOpen(true);
        }

        if (
            url.startsWith('/onboarding-templates') ||
            url.startsWith('/onboarding-tasks') ||
            url.startsWith('/employee-onboardings') ||
            url.startsWith('/employee-onboarding-tasks')
        ) {
            setOnboardingOpen(true);
        }

        if (
            url.startsWith('/attendance') ||
            url.startsWith('/shifts') ||
            url.startsWith('/shift-assignments') ||
            url.startsWith('/shift-rules') ||
            url.startsWith('/rosters') ||
            url.startsWith('/roster-assignments') ||
            url.startsWith('/holiday-calendars') ||
            url.startsWith('/holidays')
        ) {
            setAttendanceOpen(true);
        }
    }, [url]);

    const isActive = (path: string) => url.startsWith(path);

    const subLinkClass = (path: string) =>
        `block rounded-md px-3 py-2 text-sm transition-colors ${
            isActive(path)
                ? 'bg-blue-100 text-blue-900 font-medium dark:bg-blue-900 dark:text-white'
                : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white'
        }`;

    const dropdownButtonClass =
        'flex w-full items-center rounded-md px-3 py-2 text-left text-sm text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground';

    return (
        <Sidebar collapsible="icon">
            <SidebarHeader>
                <div className="flex h-12 items-center px-4">
                    <span className="text-lg font-bold tracking-tight">
                        DigiHR
                    </span>
                </div>
            </SidebarHeader>

            <SidebarContent>
                <SidebarMenu>
                    {/* Dashboard */}
                    <SidebarMenuItem>
                        <SidebarMenuButton
                            asChild
                            isActive={isActive('/dashboard')}
                            tooltip="Dashboard"
                        >
                            <Link href="/dashboard">
                                <LayoutGrid />
                                <span>Dashboard</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>

                    {/* Tenants */}
                    <SidebarMenuItem>
                        <SidebarMenuButton
                            asChild
                            isActive={isActive('/tenants')}
                            tooltip="Tenants"
                        >
                            <Link href="/tenants">
                                <Building2 />
                                <span>Tenants</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>

                    {/* Employees */}
                    <SidebarMenuItem>
                        <SidebarMenuButton
                            onClick={() => setEmployeesOpen(!employeesOpen)}
                            tooltip="Employees"
                        >
                            <Users />
                            <span>Employees</span>
                            <ChevronDown
                                className={`ml-auto transition-transform ${
                                    employeesOpen ? 'rotate-180' : ''
                                }`}
                            />
                        </SidebarMenuButton>

                        {employeesOpen && (
                            <div className="ml-6 mt-1 space-y-1">
                                <Link
                                    href="/employees"
                                    className={subLinkClass('/employees')}
                                >
                                    Employee Profile
                                </Link>

                                <button
                                    type="button"
                                    onClick={() =>
                                        setEmploymentStructureOpen(!employmentStructureOpen)
                                    }
                                    className={dropdownButtonClass}
                                >
                                    <span>Employment Structure</span>
                                    <ChevronDown
                                        className={`ml-auto h-4 w-4 transition-transform ${
                                            employmentStructureOpen ? 'rotate-180' : ''
                                        }`}
                                    />
                                </button>

                                {employmentStructureOpen && (
                                    <div className="ml-4 space-y-1">
                                        <Link href="/employment-structure/types" className={subLinkClass('/employment-structure/types')}>
                                            Employment Types
                                        </Link>
                                        <Link href="/employment-structure/statuses" className={subLinkClass('/employment-structure/statuses')}>
                                            Employment Statuses
                                        </Link>
                                        <Link href="/employment-structure/job-grades" className={subLinkClass('/employment-structure/job-grades')}>
                                            Job Grades
                                        </Link>
                                        <Link href="/employment-structure/job-levels" className={subLinkClass('/employment-structure/job-levels')}>
                                            Job Levels
                                        </Link>
                                        <Link href="/employment-structure/positions" className={subLinkClass('/employment-structure/positions')}>
                                            Positions
                                        </Link>
                                    </div>
                                )}

                                <Link
                                    href="/employment-history"
                                    className={subLinkClass('/employment-history')}
                                >
                                    Employment History
                                </Link>
                            </div>
                        )}
                    </SidebarMenuItem>

                    {/* Organization */}
                    <SidebarMenuItem>
                        <SidebarMenuButton
                            onClick={() => setOrganizationOpen(!organizationOpen)}
                            tooltip="Organization"
                        >
                            <Building2 />
                            <span>Organization</span>
                            <ChevronDown
                                className={`ml-auto transition-transform ${
                                    organizationOpen ? 'rotate-180' : ''
                                }`}
                            />
                        </SidebarMenuButton>

                        {organizationOpen && (
                            <div className="ml-6 mt-1 space-y-1">
                                <Link href="/legal-entities" className={subLinkClass('/legal-entities')}>Legal Entities</Link>
                                <Link href="/companies" className={subLinkClass('/companies')}>Companies</Link>
                                <Link href="/business-units" className={subLinkClass('/business-units')}>Business Units</Link>
                                <Link href="/branches" className={subLinkClass('/branches')}>Branches</Link>
                                <Link href="/departments" className={subLinkClass('/departments')}>Departments</Link>
                                <Link href="/divisions" className={subLinkClass('/divisions')}>Divisions</Link>
                                <Link href="/locations" className={subLinkClass('/locations')}>Locations</Link>
                                <Link href="/cost-centers" className={subLinkClass('/cost-centers')}>Cost Centers</Link>
                            </div>
                        )}
                    </SidebarMenuItem>

                    {/* ATS */}
                    <SidebarMenuItem>
                        <SidebarMenuButton
                            onClick={() => setAtsOpen(!atsOpen)}
                            tooltip="ATS"
                        >
                            <BriefcaseBusiness />
                            <span>ATS</span>
                            <ChevronDown
                                className={`ml-auto transition-transform ${
                                    atsOpen ? 'rotate-180' : ''
                                }`}
                            />
                        </SidebarMenuButton>

                        {atsOpen && (
                            <div className="ml-6 mt-1 space-y-1">
                                <Link href="/job-requisitions" className={subLinkClass('/job-requisitions')}>Job Requisitions</Link>
                                <Link href="/job-postings" className={subLinkClass('/job-postings')}>Job Postings</Link>
                                <Link href="/candidates" className={subLinkClass('/candidates')}>Candidates</Link>
                                <Link href="/candidate-contacts" className={subLinkClass('/candidate-contacts')}>Candidate Contacts</Link>
                                <Link href="/candidate-education" className={subLinkClass('/candidate-education')}>Candidate Education</Link>
                                <Link href="/candidate-experience" className={subLinkClass('/candidate-experience')}>Candidate Experience</Link>
                                <Link href="/candidate-skills" className={subLinkClass('/candidate-skills')}>Candidate Skills</Link>
                                <Link href="/applications" className={subLinkClass('/applications')}>Applications</Link>
                                <Link href="/application-status-histories" className={subLinkClass('/application-status-histories')}>Application Status Histories</Link>
                                <Link href="/interviews" className={subLinkClass('/interviews')}>Interviews</Link>
                                <Link href="/interviewers" className={subLinkClass('/interviewers')}>Interviewers</Link>
                                <Link href="/job-offers" className={subLinkClass('/job-offers')}>Job Offers</Link>
                                <Link href="/assessments" className={subLinkClass('/assessments')}>Assessments</Link>
                            </div>
                        )}
                    </SidebarMenuItem>

                    {/* Onboarding */}
                    <SidebarMenuItem>
                        <SidebarMenuButton
                            onClick={() => setOnboardingOpen(!onboardingOpen)}
                            tooltip="Onboarding"
                        >
                            <UserRoundCheck />
                            <span>Onboarding</span>
                            <ChevronDown
                                className={`ml-auto transition-transform ${
                                    onboardingOpen ? 'rotate-180' : ''
                                }`}
                            />
                        </SidebarMenuButton>

                        {onboardingOpen && (
                            <div className="ml-6 mt-1 space-y-1">
                                <Link href="/onboarding-templates" className={subLinkClass('/onboarding-templates')}>Onboarding Templates</Link>
                                <Link href="/onboarding-tasks" className={subLinkClass('/onboarding-tasks')}>Onboarding Tasks</Link>
                                <Link href="/employee-onboardings" className={subLinkClass('/employee-onboardings')}>Employee Onboarding</Link>
                                <Link href="/employee-onboarding-tasks" className={subLinkClass('/employee-onboarding-tasks')}>Employee Onboarding Tasks</Link>
                            </div>
                        )}
                    </SidebarMenuItem>

                    {/* Attendance & Shifts */}
                    <SidebarMenuItem>
                        <SidebarMenuButton
                            onClick={() => setAttendanceOpen(!attendanceOpen)}
                            tooltip="Attendance"
                        >
                            <Clock />
                            <span>Attendance</span>
                            <ChevronDown
                                className={`ml-auto transition-transform ${
                                    attendanceOpen ? 'rotate-180' : ''
                                }`}
                            />
                        </SidebarMenuButton>

                        {attendanceOpen && (
                            <div className="ml-6 mt-1 space-y-1">
                                <Link href="/attendance" className={subLinkClass('/attendance')}>
                                    Attendance
                                </Link>
                                <Link href="/shifts" className={subLinkClass('/shifts')}>
                                    Shift Management
                                </Link>
                                <Link href="/shift-assignments" className={subLinkClass('/shift-assignments')}>
                                    Employee Shift Assignment
                                </Link>
                                <Link href="/shift-rules" className={subLinkClass('/shift-rules')}>
                                    Shift Rules
                                </Link>
                                <Link href="/rosters" className={subLinkClass('/rosters')}>
                                    Shift Roster
                                </Link>
                                <Link href="/holiday-calendars" className={subLinkClass('/holiday-calendars')}>
                                    <CalendarDays className="mr-2 inline h-4 w-4" />
                                    Holiday Management
                                </Link>
                            </div>
                        )}
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarContent>

            <SidebarFooter>
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
