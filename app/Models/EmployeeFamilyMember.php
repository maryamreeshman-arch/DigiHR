<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class EmployeeFamilyMember extends Model
{
    protected $fillable = [
        'employee_id',
        'name',
        'relationship',
        'date_of_birth',
        'gender',
        'occupation',
        'phone',
        'is_dependent',
    ];

    protected $casts = [
        'date_of_birth' => 'date',
        'is_dependent' => 'boolean',
    ];

    public function employee()
    {
        return $this->belongsTo(Employee::class);
    }
}