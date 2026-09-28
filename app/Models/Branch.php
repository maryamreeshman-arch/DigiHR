<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Branch extends Model
{
    protected $fillable = [
        'tenant_id',
        'company_id',
        'business_unit_id',
        'name',
        'code',
        'address',
        'city',
        'phone',
        'email',
        'latitude',
        'longitude',
        'status',
    ];

    public function tenant()
    {
        return $this->belongsTo(Tenant::class);
    }

    public function company()
    {
        return $this->belongsTo(Company::class);
    }

    public function businessUnit()
    {
        return $this->belongsTo(BusinessUnit::class);
    }
}