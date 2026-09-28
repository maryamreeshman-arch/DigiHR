<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Position extends Model
{
    protected $fillable = [
        'tenant_id',
        'company_id',
        'department_id',
        'job_grade_id',
        'job_level_id',
        'title',
        'code',
        'description',
        'headcount',
        'status',
    ];

    protected $casts = [
        'headcount' => 'integer',
    ];

    public function tenant()
    {
        return $this->belongsTo(Tenant::class);
    }

    public function company()
    {
        return $this->belongsTo(Company::class);
    }

    public function department()
    {
        return $this->belongsTo(Department::class);
    }

    public function jobGrade()
    {
        return $this->belongsTo(JobGrade::class);
    }

    public function jobLevel()
    {
        return $this->belongsTo(JobLevel::class);
    }
}