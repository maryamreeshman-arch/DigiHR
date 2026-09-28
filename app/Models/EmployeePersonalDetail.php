<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class EmployeePersonalDetail extends Model
{
    protected $fillable = [
        'employee_id',
        'first_name',
        'middle_name',
        'last_name',
        'preferred_name',
        'date_of_birth',
        'gender',
        'marital_status',
        'nationality',
        'nic_number',
        'passport_number',
        'blood_group',
        'photo_path',
    ];

    protected $casts = [
        'date_of_birth' => 'date',
    ];

    public function employee()
    {
        return $this->belongsTo(Employee::class);
    }
}