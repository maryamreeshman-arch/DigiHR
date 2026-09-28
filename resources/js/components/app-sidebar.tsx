import {
    Building2,
    ChevronDown,
    LayoutGrid,
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

    // =========================
    // Active Sections
    // =========================

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

    // =========================
    // Dropdown States
    // =========================

    const [employeesOpen, setEmployeesOpen] = useState(
        isEmployeesActive,
    );

    const [employmentStructureOpen, setEmploymentStructureOpen] =
        useState(isEmploymentStructureActive);

    const [organizationOpen, setOrganizationOpen] = useState(
        isOrganizationActive,
    );

    // =========================
    // Keep Active Section Open
    // =========================

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

    return (
        <Sidebar collapsible="icon" variant="inset">

            {/* =========================
                HEADER
            ========================== */}

            <SidebarHeader>
                <div className="flex h-12 items-center px-3 font-semibold">
                    DigiHR
                </div>
            </SidebarHeader>

            <SidebarContent>
                <SidebarMenu>

                    {/* =========================
                        DASHBOARD
                    ========================== */}

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

                    {/* =========================
                        TENANTS
                    ========================== */}

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

                    {/* =========================
                        EMPLOYEES
                    ========================== */}

                    <SidebarMenuItem>

                        {/* Employees Header */}
                        <SidebarMenuButton
                            isActive={isEmployeesActive}
                            onClick={() =>
                                setEmployeesOpen(
                                    (value) => !value,
                                )
                            }
                            className="w-full"
                        >
                            <Users />

                            <span className="flex-1 text-left">
                                Employees
                            </span>

                            <ChevronDown
                                className={`h-4 w-4 shrink-0 transition-transform duration-200 ${
                                    employeesOpen
                                        ? 'rotate-180'
                                        : ''
                                }`}
                            />
                        </SidebarMenuButton>

                        {/* Employees Children */}
                        {employeesOpen && (
                            <SidebarMenuSub>

                                {/* -------------------------
                                    Employee Profile
                                -------------------------- */}

                                <SidebarMenuSubItem>
                                    <SidebarMenuSubButton
                                        asChild
                                        isActive={
                                            page.url ===
                                                '/employees' ||
                                            page.url.startsWith(
                                                '/employees/',
                                            )
                                        }
                                    >
                                        <Link href="/employees">
                                            <span>
                                                Employee Profile
                                            </span>
                                        </Link>
                                    </SidebarMenuSubButton>
                                </SidebarMenuSubItem>

                                {/* -------------------------
                                    Employment Structure
                                -------------------------- */}

                                <SidebarMenuSubItem>

                                    <SidebarMenuSubButton
                                        isActive={
                                            isEmploymentStructureActive
                                        }
                                        onClick={() =>
                                            setEmploymentStructureOpen(
                                                (value) =>
                                                    !value,
                                            )
                                        }
                                        className="w-full"
                                    >
                                        <span className="flex-1 truncate text-left">
                                            Employment Structure
                                        </span>

                                        <ChevronDown
                                            className={`ml-2 h-4 w-4 shrink-0 transition-transform duration-200 ${
                                                employmentStructureOpen
                                                    ? 'rotate-180'
                                                    : ''
                                            }`}
                                        />
                                    </SidebarMenuSubButton>

                                    {/* Employment Structure Children */}
                                    {employmentStructureOpen && (
                                        <SidebarMenuSub className="ml-2">

                                            {/* Employment Types */}
                                            <SidebarMenuSubItem>
                                                <SidebarMenuSubButton
                                                    asChild
                                                    isActive={
                                                        page.url ===
                                                        '/employment-structure/employment-types'
                                                    }
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
                                                    isActive={
                                                        page.url ===
                                                        '/employment-structure/employment-statuses'
                                                    }
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
                                                    isActive={
                                                        page.url ===
                                                        '/employment-structure/job-grades'
                                                    }
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
                                                    isActive={
                                                        page.url ===
                                                        '/employment-structure/job-levels'
                                                    }
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
                                                    isActive={
                                                        page.url ===
                                                        '/employment-structure/positions'
                                                    }
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

                                {/* -------------------------
                                    Employment History
                                -------------------------- */}

                                <SidebarMenuSubItem>
                                    <SidebarMenuSubButton
                                        asChild
                                        isActive={
                                            page.url ===
                                                '/employment-history' ||
                                            page.url.startsWith(
                                                '/employment-history/',
                                            )
                                        }
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

                    {/* =========================
                        ORGANIZATION
                    ========================== */}

                    <SidebarMenuItem>

                        {/* Organization Header */}
                        <SidebarMenuButton
                            isActive={isOrganizationActive}
                            onClick={() =>
                                setOrganizationOpen(
                                    (value) => !value,
                                )
                            }
                            className="w-full"
                        >
                            <Building2 />

                            <span className="flex-1 text-left">
                                Organization
                            </span>

                            <ChevronDown
                                className={`h-4 w-4 shrink-0 transition-transform duration-200 ${
                                    organizationOpen
                                        ? 'rotate-180'
                                        : ''
                                }`}
                            />
                        </SidebarMenuButton>

                        {/* Organization Children */}
                        {organizationOpen && (
                            <SidebarMenuSub>

                                {/* Legal Entities */}
                                <SidebarMenuSubItem>
                                    <SidebarMenuSubButton
                                        asChild
                                        isActive={page.url.startsWith(
                                            '/legal-entities',
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
                                            '/companies',
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
                                            '/business-units',
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
                                            '/branches',
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
                                            '/departments',
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
                                            '/divisions',
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
                                            '/locations',
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
                                            '/cost-centers',
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

                </SidebarMenu>
            </SidebarContent>

            <SidebarRail />
        </Sidebar>
    );
}

