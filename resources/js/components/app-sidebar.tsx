import { Link, usePage } from '@inertiajs/react';
import {
    BriefcaseBusiness,
    Building2,
    ChevronDown,
    LayoutGrid,
    UserRoundCheck,
    Users,
} from 'lucide-react';
import { useEffect, useState } from 'react';

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { type SharedData } from '@/types';
import { NavUser } from '@/components/nav-user';

export function AppSidebar() {
    const { url } = usePage<SharedData>();

    const [employeesOpen, setEmployeesOpen] = useState(false);
    const [employmentStructureOpen, setEmploymentStructureOpen] = useState(false);
    const [organizationOpen, setOrganizationOpen] = useState(false);
    const [atsOpen, setAtsOpen] = useState(false);
    const [onboardingOpen, setOnboardingOpen] = useState(false);

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
    }, [url]);

    const isActive = (path: string) => {
        return url.startsWith(path);
    };

    return (
        <Sidebar collapsible="icon">

            {/* DigiHR Name */}
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

                                {/* Employee Profile */}
                                <Link
                                    href="/employees"
                                    className={`block rounded-md px-3 py-2 text-sm ${
                                        isActive('/employees')
                                            ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                                            : 'hover:bg-sidebar-accent'
                                    }`}
                                >
                                    Employee Profile
                                </Link>

                                {/* Employment Structure */}
                                <button
                                    onClick={() =>
                                        setEmploymentStructureOpen(
                                            !employmentStructureOpen,
                                        )
                                    }
                                    className="flex w-full items-center rounded-md px-3 py-2 text-left text-sm hover:bg-sidebar-accent"
                                >
                                    <span>Employment Structure</span>

                                    <ChevronDown
                                        className={`ml-auto h-4 w-4 transition-transform ${
                                            employmentStructureOpen
                                                ? 'rotate-180'
                                                : ''
                                        }`}
                                    />
                                </button>

                                {employmentStructureOpen && (
                                    <div className="ml-4 space-y-1">

                                        {/* Employment Types */}
                                        <Link
                                            href="/employment-structure/types"
                                            className="block rounded-md px-3 py-2 text-sm hover:bg-sidebar-accent"
                                        >
                                            Employment Types
                                        </Link>

                                        {/* Employment Statuses */}
                                        <Link
                                            href="/employment-structure/statuses"
                                            className="block rounded-md px-3 py-2 text-sm hover:bg-sidebar-accent"
                                        >
                                            Employment Statuses
                                        </Link>

                                        {/* Job Grades */}
                                        <Link
                                            href="/employment-structure/job-grades"
                                            className="block rounded-md px-3 py-2 text-sm hover:bg-sidebar-accent"
                                        >
                                            Job Grades
                                        </Link>

                                        {/* Job Levels */}
                                        <Link
                                            href="/employment-structure/job-levels"
                                            className="block rounded-md px-3 py-2 text-sm hover:bg-sidebar-accent"
                                        >
                                            Job Levels
                                        </Link>

                                        {/* Positions */}
                                        <Link
                                            href="/employment-structure/positions"
                                            className="block rounded-md px-3 py-2 text-sm hover:bg-sidebar-accent"
                                        >
                                            Positions
                                        </Link>

                                    </div>
                                )}

                                {/* Employment History */}
                                <Link
                                    href="/employment-history"
                                    className={`block rounded-md px-3 py-2 text-sm ${
                                        isActive('/employment-history')
                                            ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                                            : 'hover:bg-sidebar-accent'
                                    }`}
                                >
                                    Employment History
                                </Link>

                            </div>
                        )}
                    </SidebarMenuItem>

                    {/* Organization */}
                    <SidebarMenuItem>
                        <SidebarMenuButton
                            onClick={() =>
                                setOrganizationOpen(!organizationOpen)
                            }
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

                                <Link
                                    href="/legal-entities"
                                    className="block rounded-md px-3 py-2 text-sm hover:bg-sidebar-accent"
                                >
                                    Legal Entities
                                </Link>

                                <Link
                                    href="/companies"
                                    className="block rounded-md px-3 py-2 text-sm hover:bg-sidebar-accent"
                                >
                                    Companies
                                </Link>

                                <Link
                                    href="/business-units"
                                    className="block rounded-md px-3 py-2 text-sm hover:bg-sidebar-accent"
                                >
                                    Business Units
                                </Link>

                                <Link
                                    href="/branches"
                                    className="block rounded-md px-3 py-2 text-sm hover:bg-sidebar-accent"
                                >
                                    Branches
                                </Link>

                                <Link
                                    href="/departments"
                                    className="block rounded-md px-3 py-2 text-sm hover:bg-sidebar-accent"
                                >
                                    Departments
                                </Link>

                                <Link
                                    href="/divisions"
                                    className="block rounded-md px-3 py-2 text-sm hover:bg-sidebar-accent"
                                >
                                    Divisions
                                </Link>

                                <Link
                                    href="/locations"
                                    className="block rounded-md px-3 py-2 text-sm hover:bg-sidebar-accent"
                                >
                                    Locations
                                </Link>

                                <Link
                                    href="/cost-centers"
                                    className="block rounded-md px-3 py-2 text-sm hover:bg-sidebar-accent"
                                >
                                    Cost Centers
                                </Link>

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

                                {/* Job Requisitions */}
                                <Link
                                    href="/job-requisitions"
                                    className="block rounded-md px-3 py-2 text-sm hover:bg-sidebar-accent"
                                >
                                    Job Requisitions
                                </Link>

                                {/* Job Postings */}
                                <Link
                                    href="/job-postings"
                                    className="block rounded-md px-3 py-2 text-sm hover:bg-sidebar-accent"
                                >
                                    Job Postings
                                </Link>

                                {/* Candidates */}
                                <Link
                                    href="/candidates"
                                    className="block rounded-md px-3 py-2 text-sm hover:bg-sidebar-accent"
                                >
                                    Candidates
                                </Link>

                                {/* Candidate Contacts */}
                                <Link
                                    href="/candidate-contacts"
                                    className="block rounded-md px-3 py-2 text-sm hover:bg-sidebar-accent"
                                >
                                    Candidate Contacts
                                </Link>

                                {/* Candidate Education */}
                                <Link
                                    href="/candidate-education"
                                    className="block rounded-md px-3 py-2 text-sm hover:bg-sidebar-accent"
                                >
                                    Candidate Education
                                </Link>

                                {/* Candidate Experience */}
                                <Link
                                    href="/candidate-experience"
                                    className="block rounded-md px-3 py-2 text-sm hover:bg-sidebar-accent"
                                >
                                    Candidate Experience
                                </Link>

                                {/* Candidate Skills */}
                                <Link
                                    href="/candidate-skills"
                                    className="block rounded-md px-3 py-2 text-sm hover:bg-sidebar-accent"
                                >
                                    Candidate Skills
                                </Link>

                                {/* Applications */}
                                <Link
                                    href="/applications"
                                    className="block rounded-md px-3 py-2 text-sm hover:bg-sidebar-accent"
                                >
                                    Applications
                                </Link>

                                {/* Application Status Histories */}
                                <Link
                                    href="/application-status-histories"
                                    className="block rounded-md px-3 py-2 text-sm hover:bg-sidebar-accent"
                                >
                                    Application Status Histories
                                </Link>

                                {/* Interviews */}
                                <Link
                                    href="/interviews"
                                    className="block rounded-md px-3 py-2 text-sm hover:bg-sidebar-accent"
                                >
                                    Interviews
                                </Link>

                                {/* Interviewers */}
                                <Link
                                    href="/interviewers"
                                    className="block rounded-md px-3 py-2 text-sm hover:bg-sidebar-accent"
                                >
                                    Interviewers
                                </Link>

                                {/* Job Offers */}
                                <Link
                                    href="/job-offers"
                                    className="block rounded-md px-3 py-2 text-sm hover:bg-sidebar-accent"
                                >
                                    Job Offers
                                </Link>

                                {/* Assessments */}
                                <Link
                                    href="/assessments"
                                    className={`block rounded-md px-3 py-2 text-sm ${
                                        isActive('/assessments')
                                            ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                                            : 'hover:bg-sidebar-accent'
                                    }`}
                                >
                                    Assessments
                                </Link>

                            </div>
                        )}
                    </SidebarMenuItem>

                    {/* Onboarding */}
                    <SidebarMenuItem>
                        <SidebarMenuButton
                            onClick={() =>
                                setOnboardingOpen(!onboardingOpen)
                            }
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

                                {/* Onboarding Templates */}
                                <Link
                                    href="/onboarding-templates"
                                    className="block rounded-md px-3 py-2 text-sm hover:bg-sidebar-accent"
                                >
                                    Onboarding Templates
                                </Link>

                                {/* Onboarding Tasks */}
                                <Link
                                    href="/onboarding-tasks"
                                    className="block rounded-md px-3 py-2 text-sm hover:bg-sidebar-accent"
                                >
                                    Onboarding Tasks
                                </Link>

                                {/* Employee Onboarding */}
                                <Link
                                    href="/employee-onboardings"
                                    className="block rounded-md px-3 py-2 text-sm hover:bg-sidebar-accent"
                                >
                                    Employee Onboarding
                                </Link>

                                {/* Employee Onboarding Tasks */}
                                <Link
                                    href="/employee-onboarding-tasks"
                                    className="block rounded-md px-3 py-2 text-sm hover:bg-sidebar-accent"
                                >
                                    Employee Onboarding Tasks
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