<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class LegalEntity extends Model
{
    protected $fillable = [
        'tenant_id',
        'name',
        'registration_no',
        'tax_no',
        'address',
        'phone',
        'email',
        'status',
    ];

    public function companies()
    {
        return $this->hasMany(Company::class);
    }
}