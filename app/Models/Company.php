<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Company extends Model
{
    protected $fillable = [
        'tenant_id',
        'legal_entity_id',
        'name',
        'code',
        'registration_no',
        'tax_number',
        'email',
        'phone',
        'address',
        'status',
    ];

    public function tenant()
    {
        return $this->belongsTo(Tenant::class);
    }

    public function legalEntity()
    {
        return $this->belongsTo(LegalEntity::class);
    }
}