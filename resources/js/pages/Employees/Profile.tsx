import { Head, Link } from '@inertiajs/react';

type Tenant = {
    id: number;
    name: string;
};

type Company = {
    id: number;
    name: string;
};

type Branch = {
    id: number;
    name: string;
};

type Department = {
    id: number;
    name: string;
};

type Division = {
    id: number;
    name: string;
};

type Location = {
    id: number;
    name: string;
};

type CostCenter = {
    id: number;
    name: string;
    code: string;
};

type Position = {
    id: number;
    title: string;
    code: string;
};

type EmploymentType = {
    id: number;
    name: string;
};

type EmploymentStatus = {
    id: number;
    name: string;
};

type Manager = {
    id: number;
    employee_no: string;
};

type PersonalDetail = {
    first_name: string;
    middle_name: string | null;
    last_name: string;
    preferred_name: string | null;
    date_of_birth: string | null;
    gender: string | null;
    marital_status: string | null;
    nationality: string | null;
    nic_number: string | null;
    passport_number: string | null;
    blood_group: string | null;
    photo_path: string | null;
};

type Contact = {
    id: number;
    contact_type: string;
    contact_value: string;
    is_primary: boolean;
    verified_at: string | null;
};

type Address = {
    id: number;
    address_type: string;
    address_line_1: string;
    address_line_2: string | null;
    city: string;
    district: string | null;
    province: string | null;
    postal_code: string | null;
    country: string;
    is_primary: boolean;
};

type EmergencyContact = {
    id: number;
    name: string;
    relationship: string;
    phone: string;
    email: string | null;
    address: string | null;
    is_primary: boolean;
};

type FamilyMember = {
    id: number;
    name: string;
    relationship: string;
    date_of_birth: string | null;
    gender: string | null;
    occupation: string | null;
    phone: string | null;
    is_dependent: boolean;
};

type Education = {
    id: number;
    institution: string;
    qualification: string;
    field_of_study: string | null;
    start_date: string | null;
    end_date: string | null;
    grade: string | null;
    certificate_path: string | null;
    education_level?: {
        name: string;
        code: string;
    } | null;
};

type Experience = {
    id: number;
    company_name: string;
    position: string;
    start_date: string;
    end_date: string | null;
    description: string | null;
};

type EmployeeSkill = {
    id: number;
    level: string;
    years_experience: number;
    skill?: {
        name: string;
        category: string | null;
    } | null;
};

type EmployeeCertification = {
    id: number;
    certificate_no: string | null;
    issue_date: string;
    expiry_date: string | null;
    file_path: string | null;
    certification?: {
        name: string;
        issuing_authority: string | null;
    } | null;
};

type Employee = {
    id: number;
    tenant_id: number;
    employee_no: string;
    join_date: string | null;
    confirmation_date: string | null;
    termination_date: string | null;
    status: string;

    tenant?: Tenant | null;
    company?: Company | null;
    branch?: Branch | null;
    department?: Department | null;
    division?: Division | null;
    location?: Location | null;
    cost_center?: CostCenter | null;
    position?: Position | null;
    employment_type?: EmploymentType | null;
    employment_status?: EmploymentStatus | null;
    manager?: Manager | null;

    personal_detail?: PersonalDetail | null;
    contacts?: Contact[];
    addresses?: Address[];
    emergency_contacts?: EmergencyContact[];
    family_members?: FamilyMember[];
    education?: Education[];
    experiences?: Experience[];
    skills?: EmployeeSkill[];
    certifications?: EmployeeCertification[];
};

type Props = {
    employee: Employee;
};

export default function Profile({ employee }: Props) {
    const personal = employee.personal_detail;

    return (
        <>
            <Head title={`Employee Profile - ${employee.employee_no}`} />

            <div className="min-h-screen p-6">
                {/* Header */}
                <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                        <Link
                            href="/employees"
                            className="text-sm text-blue-600"
                        >
                            ← Back to Employees
                        </Link>

                        <h1 className="mt-2 text-3xl font-bold">
                            Employee Profile
                        </h1>

                        <p className="text-muted-foreground">
                            {employee.employee_no}
                        </p>
                    </div>

                    <div>
                        <span
                            className={`rounded-full px-3 py-1 text-sm font-medium ${
                                employee.status === 'active'
                                    ? 'bg-green-100 text-green-700'
                                    : 'bg-gray-100 text-gray-700'
                            }`}
                        >
                            {employee.status}
                        </span>
                    </div>
                </div>

                {/* Basic Information */}
                <section className="mb-6 rounded-lg border p-6">
                    <div className="mb-4 flex items-center justify-between">
                        <div>
                            <h2 className="text-xl font-semibold">
                                Basic Information
                            </h2>

                            <p className="text-sm text-muted-foreground">
                                Current employee organizational details
                            </p>
                        </div>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        <Info
                            label="Employee No"
                            value={employee.employee_no}
                        />

                        <Info
                            label="Tenant"
                            value={employee.tenant?.name}
                        />

                        <Info
                            label="Company"
                            value={employee.company?.name}
                        />

                        <Info
                            label="Branch"
                            value={employee.branch?.name}
                        />

                        <Info
                            label="Department"
                            value={employee.department?.name}
                        />

                        <Info
                            label="Division"
                            value={employee.division?.name}
                        />

                        <Info
                            label="Location"
                            value={employee.location?.name}
                        />

                        <Info
                            label="Cost Center"
                            value={
                                employee.cost_center
                                    ? `${employee.cost_center.code} - ${employee.cost_center.name}`
                                    : undefined
                            }
                        />

                        <Info
                            label="Position"
                            value={
                                employee.position
                                    ? `${employee.position.title} (${employee.position.code})`
                                    : undefined
                            }
                        />

                        <Info
                            label="Employment Type"
                            value={employee.employment_type?.name}
                        />

                        <Info
                            label="Employment Status"
                            value={employee.employment_status?.name}
                        />

                        <Info
                            label="Manager"
                            value={employee.manager?.employee_no}
                        />

                        <Info
                            label="Join Date"
                            value={formatDate(employee.join_date)}
                        />

                        <Info
                            label="Confirmation Date"
                            value={formatDate(employee.confirmation_date)}
                        />

                        <Info
                            label="Termination Date"
                            value={formatDate(employee.termination_date)}
                        />
                    </div>
                </section>

                {/* Personal Details */}
                <section className="mb-6 rounded-lg border p-6">
                    <SectionHeader
                        title="Personal Details"
                        href={`/employees/${employee.id}/personal-details`}
                    />

                    {personal ? (
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                            <Info
                                label="First Name"
                                value={personal.first_name}
                            />

                            <Info
                                label="Middle Name"
                                value={personal.middle_name}
                            />

                            <Info
                                label="Last Name"
                                value={personal.last_name}
                            />

                            <Info
                                label="Preferred Name"
                                value={personal.preferred_name}
                            />

                            <Info
                                label="Date of Birth"
                                value={formatDate(personal.date_of_birth)}
                            />

                            <Info
                                label="Gender"
                                value={personal.gender}
                            />

                            <Info
                                label="Marital Status"
                                value={personal.marital_status}
                            />

                            <Info
                                label="Nationality"
                                value={personal.nationality}
                            />

                            <Info
                                label="NIC"
                                value={personal.nic_number}
                            />

                            <Info
                                label="Passport"
                                value={personal.passport_number}
                            />

                            <Info
                                label="Blood Group"
                                value={personal.blood_group}
                            />

                            <Info
                                label="Photo"
                                value={personal.photo_path}
                            />
                        </div>
                    ) : (
                        <EmptyState
                            text="Personal details have not been added yet."
                            href={`/employees/${employee.id}/personal-details`}
                        />
                    )}
                </section>

                {/* Contacts */}
                <section className="mb-6 rounded-lg border p-6">
                    <SectionHeader
                        title={`Contacts (${employee.contacts?.length ?? 0})`}
                        href={`/employees/${employee.id}/contacts`}
                    />

                    {employee.contacts && employee.contacts.length > 0 ? (
                        <div className="grid gap-4 md:grid-cols-2">
                            {employee.contacts.map((contact) => (
                                <div
                                    key={contact.id}
                                    className="rounded border p-4"
                                >
                                    <div className="flex items-center justify-between">
                                        <p className="font-medium capitalize">
                                            {contact.contact_type.replace(
                                                '_',
                                                ' ',
                                            )}
                                        </p>

                                        {contact.is_primary && (
                                            <span className="text-xs font-medium text-green-600">
                                                Primary
                                            </span>
                                        )}
                                    </div>

                                    <p className="mt-2">
                                        {contact.contact_value}
                                    </p>

                                    <p className="mt-1 text-xs text-muted-foreground">
                                        {contact.verified_at
                                            ? 'Verified'
                                            : 'Not verified'}
                                    </p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <EmptyState
                            text="No contacts added yet."
                            href={`/employees/${employee.id}/contacts`}
                        />
                    )}
                </section>

                {/* Addresses */}
                <section className="mb-6 rounded-lg border p-6">
                    <SectionHeader
                        title={`Addresses (${employee.addresses?.length ?? 0})`}
                        href={`/employees/${employee.id}/addresses`}
                    />

                    {employee.addresses &&
                    employee.addresses.length > 0 ? (
                        <div className="grid gap-4 md:grid-cols-2">
                            {employee.addresses.map((address) => (
                                <div
                                    key={address.id}
                                    className="rounded border p-4"
                                >
                                    <div className="flex items-center justify-between">
                                        <p className="font-medium capitalize">
                                            {address.address_type}
                                        </p>

                                        {address.is_primary && (
                                            <span className="text-xs font-medium text-green-600">
                                                Primary
                                            </span>
                                        )}
                                    </div>

                                    <p className="mt-2">
                                        {address.address_line_1}
                                    </p>

                                    {address.address_line_2 && (
                                        <p>{address.address_line_2}</p>
                                    )}

                                    <p>
                                        {address.city}
                                        {address.district
                                            ? `, ${address.district}`
                                            : ''}
                                    </p>

                                    <p>
                                        {address.province
                                            ? `${address.province}, `
                                            : ''}
                                        {address.country}
                                    </p>

                                    {address.postal_code && (
                                        <p>{address.postal_code}</p>
                                    )}
                                </div>
                            ))}
                        </div>
                    ) : (
                        <EmptyState
                            text="No addresses added yet."
                            href={`/employees/${employee.id}/addresses`}
                        />
                    )}
                </section>

                {/* Emergency Contacts */}
                <section className="mb-6 rounded-lg border p-6">
                    <SectionHeader
                        title={`Emergency Contacts (${employee.emergency_contacts?.length ?? 0})`}
                        href={`/employees/${employee.id}/emergency-contacts`}
                    />

                    {employee.emergency_contacts &&
                    employee.emergency_contacts.length > 0 ? (
                        <div className="grid gap-4 md:grid-cols-2">
                            {employee.emergency_contacts.map((contact) => (
                                <div
                                    key={contact.id}
                                    className="rounded border p-4"
                                >
                                    <div className="flex items-start justify-between">
                                        <div>
                                            <p className="font-semibold">
                                                {contact.name}
                                            </p>

                                            <p className="text-sm capitalize text-muted-foreground">
                                                {contact.relationship}
                                            </p>
                                        </div>

                                        {contact.is_primary && (
                                            <span className="text-xs font-medium text-green-600">
                                                Primary
                                            </span>
                                        )}
                                    </div>

                                    <div className="mt-3 space-y-1 text-sm">
                                        <p>
                                            <strong>Phone:</strong>{' '}
                                            {contact.phone}
                                        </p>

                                        <p>
                                            <strong>Email:</strong>{' '}
                                            {contact.email ?? '-'}
                                        </p>

                                        <p>
                                            <strong>Address:</strong>{' '}
                                            {contact.address ?? '-'}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <EmptyState
                            text="No emergency contacts added yet."
                            href={`/employees/${employee.id}/emergency-contacts`}
                        />
                    )}
                </section>

                {/* Family Members */}
                <section className="mb-6 rounded-lg border p-6">
                    <SectionHeader
                        title={`Family Members (${employee.family_members?.length ?? 0})`}
                        href={`/employees/${employee.id}/family-members`}
                    />

                    {employee.family_members &&
                    employee.family_members.length > 0 ? (
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                            {employee.family_members.map((member) => (
                                <div
                                    key={member.id}
                                    className="rounded border p-4"
                                >
                                    <div className="flex items-start justify-between">
                                        <div>
                                            <p className="font-semibold">
                                                {member.name}
                                            </p>

                                            <p className="text-sm capitalize text-muted-foreground">
                                                {member.relationship}
                                            </p>
                                        </div>

                                        {member.is_dependent && (
                                            <span className="text-xs font-medium text-green-600">
                                                Dependent
                                            </span>
                                        )}
                                    </div>

                                    <div className="mt-3 space-y-1 text-sm">
                                        <p>
                                            <strong>DOB:</strong>{' '}
                                            {formatDate(member.date_of_birth)}
                                        </p>

                                        <p>
                                            <strong>Gender:</strong>{' '}
                                            {member.gender ?? '-'}
                                        </p>

                                        <p>
                                            <strong>Occupation:</strong>{' '}
                                            {member.occupation ?? '-'}
                                        </p>

                                        <p>
                                            <strong>Phone:</strong>{' '}
                                            {member.phone ?? '-'}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <EmptyState
                            text="No family members added yet."
                            href={`/employees/${employee.id}/family-members`}
                        />
                    )}
                </section>

                {/* Education */}
                <section className="mb-6 rounded-lg border p-6">
                    <SectionHeader
                        title={`Education (${employee.education?.length ?? 0})`}
                        href={`/employees/${employee.id}/education`}
                    />

                    {employee.education && employee.education.length > 0 ? (
                        <div className="space-y-4">
                            {employee.education.map((item) => (
                                <div
                                    key={item.id}
                                    className="rounded border p-4"
                                >
                                    <p className="font-semibold">
                                        {item.qualification}
                                    </p>

                                    <p className="text-sm text-muted-foreground">
                                        {item.institution}
                                    </p>

                                    <div className="mt-3 grid gap-2 md:grid-cols-2">
                                        <Info
                                            label="Education Level"
                                            value={
                                                item.education_level?.name
                                            }
                                        />

                                        <Info
                                            label="Field of Study"
                                            value={item.field_of_study}
                                        />

                                        <Info
                                            label="Start Date"
                                            value={formatDate(
                                                item.start_date,
                                            )}
                                        />

                                        <Info
                                            label="End Date"
                                            value={formatDate(item.end_date)}
                                        />

                                        <Info
                                            label="Grade"
                                            value={item.grade}
                                        />

                                        <Info
                                            label="Certificate"
                                            value={item.certificate_path}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <EmptyState
                            text="No education records added yet."
                            href={`/employees/${employee.id}/education`}
                        />
                    )}
                </section>

                {/* Experience */}
                <section className="mb-6 rounded-lg border p-6">
                    <SectionHeader
                        title={`Experience (${employee.experiences?.length ?? 0})`}
                        href={`/employees/${employee.id}/experience`}
                    />

                    {employee.experiences &&
                    employee.experiences.length > 0 ? (
                        <div className="space-y-4">
                            {employee.experiences.map((experience) => (
                                <div
                                    key={experience.id}
                                    className="rounded border p-4"
                                >
                                    <p className="font-semibold">
                                        {experience.position}
                                    </p>

                                    <p className="text-sm text-muted-foreground">
                                        {experience.company_name}
                                    </p>

                                    <div className="mt-2 flex flex-wrap gap-4 text-sm">
                                        <span>
                                            <strong>Start:</strong>{' '}
                                            {formatDate(
                                                experience.start_date,
                                            )}
                                        </span>

                                        <span>
                                            <strong>End:</strong>{' '}
                                            {formatDate(
                                                experience.end_date,
                                            ) ?? 'Present'}
                                        </span>
                                    </div>

                                    {experience.description && (
                                        <p className="mt-3 text-sm">
                                            {experience.description}
                                        </p>
                                    )}
                                </div>
                            ))}
                        </div>
                    ) : (
                        <EmptyState
                            text="No experience records added yet."
                            href={`/employees/${employee.id}/experience`}
                        />
                    )}
                </section>

                {/* Skills */}
                <section className="mb-6 rounded-lg border p-6">
                    <SectionHeader
                        title={`Skills (${employee.skills?.length ?? 0})`}
                        href={`/employees/${employee.id}/skills`}
                    />

                    {employee.skills && employee.skills.length > 0 ? (
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                            {employee.skills.map((employeeSkill) => (
                                <div
                                    key={employeeSkill.id}
                                    className="rounded border p-4"
                                >
                                    <p className="font-semibold">
                                        {employeeSkill.skill?.name ??
                                            'Unknown Skill'}
                                    </p>

                                    {employeeSkill.skill?.category && (
                                        <p className="text-sm text-muted-foreground">
                                            {employeeSkill.skill.category}
                                        </p>
                                    )}

                                    <div className="mt-3 space-y-1 text-sm">
                                        <p>
                                            <strong>Level:</strong>{' '}
                                            {employeeSkill.level}
                                        </p>

                                        <p>
                                            <strong>
                                                Years Experience:
                                            </strong>{' '}
                                            {employeeSkill.years_experience}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <EmptyState
                            text="No skills added yet."
                            href={`/employees/${employee.id}/skills`}
                        />
                    )}
                </section>

                {/* Certifications */}
                <section className="mb-6 rounded-lg border p-6">
                    <SectionHeader
                        title={`Certifications (${employee.certifications?.length ?? 0})`}
                        href={`/employees/${employee.id}/certifications`}
                    />

                    {employee.certifications &&
                    employee.certifications.length > 0 ? (
                        <div className="space-y-4">
                            {employee.certifications.map((item) => (
                                <div
                                    key={item.id}
                                    className="rounded border p-4"
                                >
                                    <p className="font-semibold">
                                        {item.certification?.name ??
                                            'Unknown Certification'}
                                    </p>

                                    <p className="text-sm text-muted-foreground">
                                        {item.certification
                                            ?.issuing_authority ??
                                            '-'}
                                    </p>

                                    <div className="mt-3 grid gap-2 md:grid-cols-2">
                                        <Info
                                            label="Certificate No"
                                            value={item.certificate_no}
                                        />

                                        <Info
                                            label="Issue Date"
                                            value={formatDate(
                                                item.issue_date,
                                            )}
                                        />

                                        <Info
                                            label="Expiry Date"
                                            value={
                                                formatDate(item.expiry_date) ??
                                                'No expiry'
                                            }
                                        />

                                        <Info
                                            label="File"
                                            value={item.file_path}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <EmptyState
                            text="No certifications added yet."
                            href={`/employees/${employee.id}/certifications`}
                        />
                    )}
                </section>
            </div>
        </>
    );
}

function Info({
    label,
    value,
}: {
    label: string;
    value?: string | number | null;
}) {
    return (
        <div>
            <p className="text-xs font-medium uppercase text-muted-foreground">
                {label}
            </p>

            <p className="mt-1 text-sm">
                {value !== null && value !== undefined && value !== ''
                    ? value
                    : '-'}
            </p>
        </div>
    );
}

function SectionHeader({
    title,
    href,
}: {
    title: string;
    href: string;
}) {
    return (
        <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-semibold">{title}</h2>

            <Link
                href={href}
                className="text-sm font-medium text-blue-600"
            >
                Manage
            </Link>
        </div>
    );
}

function EmptyState({
    text,
    href,
}: {
    text: string;
    href: string;
}) {
    return (
        <div className="rounded border border-dashed p-6 text-center">
            <p className="text-sm text-muted-foreground">
                {text}
            </p>

            <Link
                href={href}
                className="mt-2 inline-block text-sm font-medium text-blue-600"
            >
                Add Details
            </Link>
        </div>
    );
}

function formatDate(date: string | null | undefined) {
    if (!date) {
        return null;
    }

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
        return date;
    }

    return parsedDate.toISOString().split('T')[0];
}