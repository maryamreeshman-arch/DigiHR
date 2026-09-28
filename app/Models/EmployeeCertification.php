<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class EmployeeCertification extends Model
{
    protected $fillable = [
        'employee_id',
        'certification_id',
        'certificate_no',
        'issue_date',
        'expiry_date',
        'file_path',
    ];

    protected $casts = [
        'issue_date' => 'date',
        'expiry_date' => 'date',
    ];

    public function employee()
    {
        return $this->belongsTo(Employee::class);
    }

    public function certification()
    {
        return $this->belongsTo(Certification::class);
    }
}