<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Employee extends Model
{
    protected $fillable = [
        'tenant_id',
        'user_id',
        'employee_no',
        'company_id',
        'branch_id',
        'department_id',
        'division_id',
        'location_id',
        'cost_center_id',
        'position_id',
        'employment_type_id',
        'employment_status_id',
        'manager_id',
        'join_date',
        'confirmation_date',
        'termination_date',
        'status',
    ];

    protected $casts = [
        'join_date' => 'date',
        'confirmation_date' => 'date',
        'termination_date' => 'date',
    ];

    public function tenant()
    {
        return $this->belongsTo(Tenant::class);
    }

    public function company()
    {
        return $this->belongsTo(Company::class);
    }

    public function branch()
    {
        return $this->belongsTo(Branch::class);
    }

    public function department()
    {
        return $this->belongsTo(Department::class);
    }

    public function division()
    {
        return $this->belongsTo(Division::class);
    }

    public function location()
    {
        return $this->belongsTo(Location::class);
    }

    public function costCenter()
    {
        return $this->belongsTo(CostCenter::class);
    }

    public function position()
    {
        return $this->belongsTo(Position::class);
    }

    public function employmentType()
    {
        return $this->belongsTo(EmploymentType::class);
    }

    public function employmentStatus()
    {
        return $this->belongsTo(EmploymentStatus::class);
    }

    public function manager()
    {
        return $this->belongsTo(Employee::class, 'manager_id');
    }

    public function subordinates()
    {
        return $this->hasMany(Employee::class, 'manager_id');
    }

    public function personalDetail()
    {
        return $this->hasOne(EmployeePersonalDetail::class);
    }

    public function contacts()
    {
        return $this->hasMany(EmployeeContact::class);
    }

    public function addresses()
    {
        return $this->hasMany(EmployeeAddress::class);
    }

    public function emergencyContacts()
    {
        return $this->hasMany(EmployeeEmergencyContact::class);
    }

    public function familyMembers()
    {
        return $this->hasMany(EmployeeFamilyMember::class);
    }

    public function education()
    {
        return $this->hasMany(EmployeeEducation::class);
    }

    public function experiences()
    {
        return $this->hasMany(EmployeeExperience::class);
    }

    public function skills()
    {
        return $this->hasMany(EmployeeSkill::class);
    }

    public function certifications()
    {
        return $this->hasMany(EmployeeCertification::class);
    }
}