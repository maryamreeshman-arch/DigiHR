<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Certification extends Model
{
    protected $fillable = [
        'tenant_id',
        'name',
        'issuing_authority',
    ];

    public function tenant()
    {
        return $this->belongsTo(Tenant::class);
    }

    public function employeeCertifications()
    {
        return $this->hasMany(EmployeeCertification::class);
    }
}