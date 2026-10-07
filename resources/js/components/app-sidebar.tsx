import {
    BriefcaseBusiness,
    Building2,
    ChevronDown,
    LayoutGrid,
    UserRoundCheck,
    Users,
} from 'lucide-react';

import { useEffect, useState } from 'react';
import { Link, usePage } from '@inertiajs/react';

import {
    Sidebar,
    SidebarContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
    SidebarRail,
} from '@/components/ui/sidebar';

export function AppSidebar() {
    const page = usePage();

    // =====================================================
    // ACTIVE SECTIONS
    // =====================================================

    const isEmployeesActive =
        page.url.startsWith('/employees') ||
        page.url.startsWith('/employment-structure') ||
        page.url.startsWith('/employment-history');

    const isEmploymentStructureActive =
        page.url.startsWith('/employment-structure');

    const isOrganizationActive =
        page.url.startsWith('/legal-entities') ||
        page.url.startsWith('/companies') ||
        page.url.startsWith('/business-units') ||
        page.url.startsWith('/branches') ||
        page.url.startsWith('/departments') ||
        page.url.startsWith('/divisions') ||
        page.url.startsWith('/locations') ||
        page.url.startsWith('/cost-centers');

    const isATSActive =
        page.url.startsWith('/job-requisitions') ||
        page.url.startsWith('/job-postings') ||
        page.url.startsWith('/candidates') ||
        page.url.startsWith('/candidate-contacts') ||
        page.url.startsWith('/candidate-education') ||
        page.url.startsWith('/candidate-experience') ||
        page.url.startsWith('/candidate-skills') ||
        page.url.startsWith('/applications') ||
        page.url.startsWith('/application-status-histories') ||
        page.url.startsWith('/interviews') ||
        page.url.startsWith('/interviewers') ||
        page.url.startsWith('/job-offers');

    const isOnboardingActive =
        page.url.startsWith('/onboarding-templates') ||
        page.url.startsWith('/onboarding-tasks') ||
        page.url.startsWith('/employee-onboardings') ||
        page.url.startsWith('/employee-onboarding-tasks');

    // =====================================================
    // DROPDOWN STATES
    // =====================================================

    const [employeesOpen, setEmployeesOpen] =
        useState(isEmployeesActive);

    const [employmentStructureOpen, setEmploymentStructureOpen] =
        useState(isEmploymentStructureActive);

    const [organizationOpen, setOrganizationOpen] =
        useState(isOrganizationActive);

    const [atsOpen, setAtsOpen] =
        useState(isATSActive);

    const [onboardingOpen, setOnboardingOpen] =
        useState(isOnboardingActive);

    // =====================================================
    // KEEP DROPDOWNS OPEN ON ACTIVE PAGE
    // =====================================================

    useEffect(() => {
        if (isEmployeesActive) {
            setEmployeesOpen(true);
        }
    }, [isEmployeesActive]);

    useEffect(() => {
        if (isEmploymentStructureActive) {
            setEmploymentStructureOpen(true);
        }
    }, [isEmploymentStructureActive]);

    useEffect(() => {
        if (isOrganizationActive) {
            setOrganizationOpen(true);
        }
    }, [isOrganizationActive]);

    useEffect(() => {
        if (isATSActive) {
            setAtsOpen(true);
        }
    }, [isATSActive]);

    useEffect(() => {
        if (isOnboardingActive) {
            setOnboardingOpen(true);
        }
    }, [isOnboardingActive]);

    return (
        <Sidebar collapsible="icon">

            {/* =====================================================
                SIDEBAR HEADER
            ===================================================== */}

            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton
                            asChild
                            size="lg"
                        >
                            <Link href="/dashboard">
                                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                                    <LayoutGrid className="size-4" />
                                </div>

                                <div className="grid flex-1 text-left text-sm leading-tight">
                                    <span className="truncate font-semibold">
                                        DigiHR
                                    </span>

                                    <span className="truncate text-xs">
                                        Human Resource Management
                                    </span>
                                </div>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            {/* =====================================================
                SIDEBAR CONTENT
            ===================================================== */}

            <SidebarContent>
                <SidebarMenu>

                    {/* =================================================
                        DASHBOARD
                    ================================================= */}

                    <SidebarMenuItem>
                        <SidebarMenuButton
                            asChild
                            isActive={page.url === '/dashboard'}
                        >
                            <Link href="/dashboard">
                                <LayoutGrid />
                                <span>Dashboard</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>

                    {/* =================================================
                        TENANTS
                    ================================================= */}

                    <SidebarMenuItem>
                        <SidebarMenuButton
                            asChild
                            isActive={page.url.startsWith('/tenants')}
                        >
                            <Link href="/tenants">
                                <Building2 />
                                <span>Tenants</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>

                    {/* =================================================
                        EMPLOYEES
                    ================================================= */}

                    <SidebarMenuItem>

                        <SidebarMenuButton
                            onClick={() =>
                                setEmployeesOpen(!employeesOpen)
                            }
                            isActive={isEmployeesActive}
                        >
                            <Users />

                            <span>
                                Employees
                            </span>

                            <ChevronDown
                                className={`ml-auto transition-transform ${
                                    employeesOpen
                                        ? 'rotate-180'
                                        : ''
                                }`}
                            />
                        </SidebarMenuButton>

                        {employeesOpen && (
                            <SidebarMenuSub>

                                {/* Employee Profile */}

                                <SidebarMenuSubItem>
                                    <SidebarMenuSubButton
                                        asChild
                                        isActive={page.url.startsWith(
                                            '/employees'
                                        )}
                                    >
                                        <Link href="/employees">
                                            <span>
                                                Employee Profile
                                            </span>
                                        </Link>
                                    </SidebarMenuSubButton>
                                </SidebarMenuSubItem>

                                {/* Employment Structure */}

                                <SidebarMenuSubItem>

                                    <SidebarMenuSubButton
                                        onClick={() =>
                                            setEmploymentStructureOpen(
                                                !employmentStructureOpen
                                            )
                                        }
                                        isActive={
                                            isEmploymentStructureActive
                                        }
                                    >
                                        <span>
                                            Employment Structure
                                        </span>

                                        <ChevronDown
                                            className={`ml-auto transition-transform ${
                                                employmentStructureOpen
                                                    ? 'rotate-180'
                                                    : ''
                                            }`}
                                        />
                                    </SidebarMenuSubButton>

                                    {employmentStructureOpen && (
                                        <SidebarMenuSub>

                                            {/* Employment Types */}

                                            <SidebarMenuSubItem>
                                                <SidebarMenuSubButton
                                                    asChild
                                                    isActive={page.url.startsWith(
                                                        '/employment-structure/employment-types'
                                                    )}
                                                >
                                                    <Link href="/employment-structure/employment-types">
                                                        <span>
                                                            Employment Types
                                                        </span>
                                                    </Link>
                                                </SidebarMenuSubButton>
                                            </SidebarMenuSubItem>

                                            {/* Employment Statuses */}

                                            <SidebarMenuSubItem>
                                                <SidebarMenuSubButton
                                                    asChild
                                                    isActive={page.url.startsWith(
                                                        '/employment-structure/employment-statuses'
                                                    )}
                                                >
                                                    <Link href="/employment-structure/employment-statuses">
                                                        <span>
                                                            Employment Statuses
                                                        </span>
                                                    </Link>
                                                </SidebarMenuSubButton>
                                            </SidebarMenuSubItem>

                                            {/* Job Grades */}

                                            <SidebarMenuSubItem>
                                                <SidebarMenuSubButton
                                                    asChild
                                                    isActive={page.url.startsWith(
                                                        '/employment-structure/job-grades'
                                                    )}
                                                >
                                                    <Link href="/employment-structure/job-grades">
                                                        <span>
                                                            Job Grades
                                                        </span>
                                                    </Link>
                                                </SidebarMenuSubButton>
                                            </SidebarMenuSubItem>

                                            {/* Job Levels */}

                                            <SidebarMenuSubItem>
                                                <SidebarMenuSubButton
                                                    asChild
                                                    isActive={page.url.startsWith(
                                                        '/employment-structure/job-levels'
                                                    )}
                                                >
                                                    <Link href="/employment-structure/job-levels">
                                                        <span>
                                                            Job Levels
                                                        </span>
                                                    </Link>
                                                </SidebarMenuSubButton>
                                            </SidebarMenuSubItem>

                                            {/* Positions */}

                                            <SidebarMenuSubItem>
                                                <SidebarMenuSubButton
                                                    asChild
                                                    isActive={page.url.startsWith(
                                                        '/employment-structure/positions'
                                                    )}
                                                >
                                                    <Link href="/employment-structure/positions">
                                                        <span>
                                                            Positions
                                                        </span>
                                                    </Link>
                                                </SidebarMenuSubButton>
                                            </SidebarMenuSubItem>

                                        </SidebarMenuSub>
                                    )}

                                </SidebarMenuSubItem>

                                {/* Employment History */}

                                <SidebarMenuSubItem>
                                    <SidebarMenuSubButton
                                        asChild
                                        isActive={page.url.startsWith(
                                            '/employment-history'
                                        )}
                                    >
                                        <Link href="/employment-history">
                                            <span>
                                                Employment History
                                            </span>
                                        </Link>
                                    </SidebarMenuSubButton>
                                </SidebarMenuSubItem>

                            </SidebarMenuSub>
                        )}

                    </SidebarMenuItem>

                    {/* =================================================
                        ORGANIZATION
                    ================================================= */}

                    <SidebarMenuItem>

                        <SidebarMenuButton
                            onClick={() =>
                                setOrganizationOpen(
                                    !organizationOpen
                                )
                            }
                            isActive={isOrganizationActive}
                        >
                            <Building2 />

                            <span>
                                Organization
                            </span>

                            <ChevronDown
                                className={`ml-auto transition-transform ${
                                    organizationOpen
                                        ? 'rotate-180'
                                        : ''
                                }`}
                            />
                        </SidebarMenuButton>

                        {organizationOpen && (
                            <SidebarMenuSub>

                                {/* Legal Entities */}

                                <SidebarMenuSubItem>
                                    <SidebarMenuSubButton
                                        asChild
                                        isActive={page.url.startsWith(
                                            '/legal-entities'
                                        )}
                                    >
                                        <Link href="/legal-entities">
                                            <span>
                                                Legal Entities
                                            </span>
                                        </Link>
                                    </SidebarMenuSubButton>
                                </SidebarMenuSubItem>

                                {/* Companies */}

                                <SidebarMenuSubItem>
                                    <SidebarMenuSubButton
                                        asChild
                                        isActive={page.url.startsWith(
                                            '/companies'
                                        )}
                                    >
                                        <Link href="/companies">
                                            <span>
                                                Companies
                                            </span>
                                        </Link>
                                    </SidebarMenuSubButton>
                                </SidebarMenuSubItem>

                                {/* Business Units */}

                                <SidebarMenuSubItem>
                                    <SidebarMenuSubButton
                                        asChild
                                        isActive={page.url.startsWith(
                                            '/business-units'
                                        )}
                                    >
                                        <Link href="/business-units">
                                            <span>
                                                Business Units
                                            </span>
                                        </Link>
                                    </SidebarMenuSubButton>
                                </SidebarMenuSubItem>

                                {/* Branches */}

                                <SidebarMenuSubItem>
                                    <SidebarMenuSubButton
                                        asChild
                                        isActive={page.url.startsWith(
                                            '/branches'
                                        )}
                                    >
                                        <Link href="/branches">
                                            <span>
                                                Branches
                                            </span>
                                        </Link>
                                    </SidebarMenuSubButton>
                                </SidebarMenuSubItem>

                                {/* Departments */}

                                <SidebarMenuSubItem>
                                    <SidebarMenuSubButton
                                        asChild
                                        isActive={page.url.startsWith(
                                            '/departments'
                                        )}
                                    >
                                        <Link href="/departments">
                                            <span>
                                                Departments
                                            </span>
                                        </Link>
                                    </SidebarMenuSubButton>
                                </SidebarMenuSubItem>

                                {/* Divisions */}

                                <SidebarMenuSubItem>
                                    <SidebarMenuSubButton
                                        asChild
                                        isActive={page.url.startsWith(
                                            '/divisions'
                                        )}
                                    >
                                        <Link href="/divisions">
                                            <span>
                                                Divisions
                                            </span>
                                        </Link>
                                    </SidebarMenuSubButton>
                                </SidebarMenuSubItem>

                                {/* Locations */}

                                <SidebarMenuSubItem>
                                    <SidebarMenuSubButton
                                        asChild
                                        isActive={page.url.startsWith(
                                            '/locations'
                                        )}
                                    >
                                        <Link href="/locations">
                                            <span>
                                                Locations
                                            </span>
                                        </Link>
                                    </SidebarMenuSubButton>
                                </SidebarMenuSubItem>

                                {/* Cost Centers */}

                                <SidebarMenuSubItem>
                                    <SidebarMenuSubButton
                                        asChild
                                        isActive={page.url.startsWith(
                                            '/cost-centers'
                                        )}
                                    >
                                        <Link href="/cost-centers">
                                            <span>
                                                Cost Centers
                                            </span>
                                        </Link>
                                    </SidebarMenuSubButton>
                                </SidebarMenuSubItem>

                            </SidebarMenuSub>
                        )}

                    </SidebarMenuItem>

                    {/* =================================================
                        ATS
                    ================================================= */}

                    <SidebarMenuItem>

                        <SidebarMenuButton
                            onClick={() =>
                                setAtsOpen(!atsOpen)
                            }
                            isActive={isATSActive}
                        >
                            <BriefcaseBusiness />

                            <span>
                                ATS
                            </span>

                            <ChevronDown
                                className={`ml-auto transition-transform ${
                                    atsOpen
                                        ? 'rotate-180'
                                        : ''
                                }`}
                            />
                        </SidebarMenuButton>

                        {atsOpen && (
                            <SidebarMenuSub>

                                {/* Job Requisitions */}

                                <SidebarMenuSubItem>
                                    <SidebarMenuSubButton
                                        asChild
                                        isActive={page.url.startsWith(
                                            '/job-requisitions'
                                        )}
                                    >
                                        <Link href="/job-requisitions">
                                            <span>
                                                Job Requisitions
                                            </span>
                                        </Link>
                                    </SidebarMenuSubButton>
                                </SidebarMenuSubItem>

                                {/* Job Postings */}

                                <SidebarMenuSubItem>
                                    <SidebarMenuSubButton
                                        asChild
                                        isActive={page.url.startsWith(
                                            '/job-postings'
                                        )}
                                    >
                                        <Link href="/job-postings">
                                            <span>
                                                Job Postings
                                            </span>
                                        </Link>
                                    </SidebarMenuSubButton>
                                </SidebarMenuSubItem>

                                {/* Candidates */}

                                <SidebarMenuSubItem>
                                    <SidebarMenuSubButton
                                        asChild
                                        isActive={page.url.startsWith(
                                            '/candidates'
                                        )}
                                    >
                                        <Link href="/candidates">
                                            <span>
                                                Candidates
                                            </span>
                                        </Link>
                                    </SidebarMenuSubButton>
                                </SidebarMenuSubItem>

                                {/* Candidate Contacts */}

                                <SidebarMenuSubItem>
                                    <SidebarMenuSubButton
                                        asChild
                                        isActive={page.url.startsWith(
                                            '/candidate-contacts'
                                        )}
                                    >
                                        <Link href="/candidate-contacts">
                                            <span>
                                                Candidate Contacts
                                            </span>
                                        </Link>
                                    </SidebarMenuSubButton>
                                </SidebarMenuSubItem>

                                {/* Candidate Education */}

                                <SidebarMenuSubItem>
                                    <SidebarMenuSubButton
                                        asChild
                                        isActive={page.url.startsWith(
                                            '/candidate-education'
                                        )}
                                    >
                                        <Link href="/candidate-education">
                                            <span>
                                                Candidate Education
                                            </span>
                                        </Link>
                                    </SidebarMenuSubButton>
                                </SidebarMenuSubItem>

                                {/* Candidate Experience */}

                                <SidebarMenuSubItem>
                                    <SidebarMenuSubButton
                                        asChild
                                        isActive={page.url.startsWith(
                                            '/candidate-experience'
                                        )}
                                    >
                                        <Link href="/candidate-experience">
                                            <span>
                                                Candidate Experience
                                            </span>
                                        </Link>
                                    </SidebarMenuSubButton>
                                </SidebarMenuSubItem>

                                {/* Candidate Skills */}

                                <SidebarMenuSubItem>
                                    <SidebarMenuSubButton
                                        asChild
                                        isActive={page.url.startsWith(
                                            '/candidate-skills'
                                        )}
                                    >
                                        <Link href="/candidate-skills">
                                            <span>
                                                Candidate Skills
                                            </span>
                                        </Link>
                                    </SidebarMenuSubButton>
                                </SidebarMenuSubItem>

                                {/* Applications */}

                                <SidebarMenuSubItem>
                                    <SidebarMenuSubButton
                                        asChild
                                        isActive={page.url.startsWith(
                                            '/applications'
                                        )}
                                    >
                                        <Link href="/applications">
                                            <span>
                                                Applications
                                            </span>
                                        </Link>
                                    </SidebarMenuSubButton>
                                </SidebarMenuSubItem>

                                {/* Application Status Histories */}

                                <SidebarMenuSubItem>
                                    <SidebarMenuSubButton
                                        asChild
                                        isActive={page.url.startsWith(
                                            '/application-status-histories'
                                        )}
                                    >
                                        <Link href="/application-status-histories">
                                            <span>
                                                Application Status Histories
                                            </span>
                                        </Link>
                                    </SidebarMenuSubButton>
                                </SidebarMenuSubItem>

                                {/* Interviews */}

                                <SidebarMenuSubItem>
                                    <SidebarMenuSubButton
                                        asChild
                                        isActive={page.url.startsWith(
                                            '/interviews'
                                        )}
                                    >
                                        <Link href="/interviews">
                                            <span>
                                                Interviews
                                            </span>
                                        </Link>
                                    </SidebarMenuSubButton>
                                </SidebarMenuSubItem>

                                {/* Interviewers */}

                                <SidebarMenuSubItem>
                                    <SidebarMenuSubButton
                                        asChild
                                        isActive={page.url.startsWith(
                                            '/interviewers'
                                        )}
                                    >
                                        <Link href="/interviewers">
                                            <span>
                                                Interviewers
                                            </span>
                                        </Link>
                                    </SidebarMenuSubButton>
                                </SidebarMenuSubItem>

                                {/* Job Offers */}

                                <SidebarMenuSubItem>
                                    <SidebarMenuSubButton
                                        asChild
                                        isActive={page.url.startsWith(
                                            '/job-offers'
                                        )}
                                    >
                                        <Link href="/job-offers">
                                            <span>
                                                Job Offers
                                            </span>
                                        </Link>
                                    </SidebarMenuSubButton>
                                </SidebarMenuSubItem>

                            </SidebarMenuSub>
                        )}

                    </SidebarMenuItem>

                    {/* =================================================
                        ONBOARDING
                    ================================================= */}

                    <SidebarMenuItem>

                        <SidebarMenuButton
                            onClick={() =>
                                setOnboardingOpen(
                                    !onboardingOpen
                                )
                            }
                            isActive={isOnboardingActive}
                        >
                            <UserRoundCheck />

                            <span>
                                Onboarding
                            </span>

                            <ChevronDown
                                className={`ml-auto transition-transform ${
                                    onboardingOpen
                                        ? 'rotate-180'
                                        : ''
                                }`}
                            />
                        </SidebarMenuButton>

                        {onboardingOpen && (
                            <SidebarMenuSub>

                                {/* Onboarding Templates */}

                                <SidebarMenuSubItem>
                                    <SidebarMenuSubButton
                                        asChild
                                        isActive={page.url.startsWith(
                                            '/onboarding-templates'
                                        )}
                                    >
                                        <Link href="/onboarding-templates">
                                            <span>
                                                Onboarding Templates
                                            </span>
                                        </Link>
                                    </SidebarMenuSubButton>
                                </SidebarMenuSubItem>

                                {/* Onboarding Tasks */}

                                <SidebarMenuSubItem>
                                    <SidebarMenuSubButton
                                        asChild
                                        isActive={page.url.startsWith(
                                            '/onboarding-tasks'
                                        )}
                                    >
                                        <Link href="/onboarding-tasks">
                                            <span>
                                                Onboarding Tasks
                                            </span>
                                        </Link>
                                    </SidebarMenuSubButton>
                                </SidebarMenuSubItem>

                                {/* Employee Onboarding */}

                                <SidebarMenuSubItem>
                                    <SidebarMenuSubButton
                                        asChild
                                        isActive={page.url.startsWith(
                                            '/employee-onboardings'
                                        )}
                                    >
                                        <Link href="/employee-onboardings">
                                            <span>
                                                Employee Onboarding
                                            </span>
                                        </Link>
                                    </SidebarMenuSubButton>
                                </SidebarMenuSubItem>

                                {/* Employee Onboarding Tasks */}

                                <SidebarMenuSubItem>
                                    <SidebarMenuSubButton
                                        asChild
                                        isActive={page.url.startsWith(
                                            '/employee-onboarding-tasks'
                                        )}
                                    >
                                        <Link href="/employee-onboarding-tasks">
                                            <span>
                                                Employee Onboarding Tasks
                                            </span>
                                        </Link>
                                    </SidebarMenuSubButton>
                                </SidebarMenuSubItem>

                            </SidebarMenuSub>
                        )}

                    </SidebarMenuItem>

                </SidebarMenu>
            </SidebarContent>

            <SidebarRail />

        </Sidebar>
    );
}