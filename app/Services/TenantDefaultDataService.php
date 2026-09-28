<?php

namespace App\Services;

use App\Models\EmploymentStatus;
use App\Models\EmploymentType;
use App\Models\Tenant;

class TenantDefaultDataService
{
    public function createFor(Tenant $tenant): void
    {
        // Default Employment Types
        $employmentTypes = [
            ['name' => 'Permanent', 'code' => 'PERM'],
            ['name' => 'Contract', 'code' => 'CONT'],
            ['name' => 'Part-Time', 'code' => 'PART'],
            ['name' => 'Intern', 'code' => 'INTERN'],
            ['name' => 'Trainee', 'code' => 'TRAINEE'],
            ['name' => 'Temporary', 'code' => 'TEMP'],
            ['name' => 'Freelance', 'code' => 'FREELANCE'],
        ];

        foreach ($employmentTypes as $employmentType) {
            EmploymentType::firstOrCreate(
                [
                    'tenant_id' => $tenant->id,
                    'code' => $employmentType['code'],
                ],
                [
                    'name' => $employmentType['name'],
                ]
            );
        }

        // Default Employment Statuses
        $employmentStatuses = [
            ['name' => 'Active', 'code' => 'ACTIVE'],
            ['name' => 'Probation', 'code' => 'PROBATION'],
            ['name' => 'Suspended', 'code' => 'SUSPENDED'],
            ['name' => 'Resigned', 'code' => 'RESIGNED'],
            ['name' => 'Terminated', 'code' => 'TERMINATED'],
            ['name' => 'Retired', 'code' => 'RETIRED'],
        ];

        foreach ($employmentStatuses as $employmentStatus) {
            EmploymentStatus::firstOrCreate(
                [
                    'tenant_id' => $tenant->id,
                    'code' => $employmentStatus['code'],
                ],
                [
                    'name' => $employmentStatus['name'],
                ]
            );
        }
        // Default Job Levels
$jobLevels = [
    ['name' => 'Junior', 'code' => 'L1', 'rank' => 1],
    ['name' => 'Associate', 'code' => 'L2', 'rank' => 2],
    ['name' => 'Engineer', 'code' => 'L3', 'rank' => 3],
    ['name' => 'Senior', 'code' => 'L4', 'rank' => 4],
    ['name' => 'Lead', 'code' => 'L5', 'rank' => 5],
    ['name' => 'Manager', 'code' => 'L6', 'rank' => 6],
];

foreach ($jobLevels as $jobLevel) {
    \App\Models\JobLevel::firstOrCreate(
        [
            'tenant_id' => $tenant->id,
            'code' => $jobLevel['code'],
        ],
        [
            'name' => $jobLevel['name'],
            'rank' => $jobLevel['rank'],
        ]
    );
}
    }
}