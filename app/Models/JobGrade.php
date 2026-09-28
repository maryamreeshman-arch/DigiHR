<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class JobGrade extends Model
{
    protected $fillable = [
        'tenant_id',
        'name',
        'code',
        'min_salary',
        'max_salary',
        'description',
        'status',
    ];

    protected $casts = [
        'min_salary' => 'decimal:2',
        'max_salary' => 'decimal:2',
    ];

    public function tenant()
    {
        return $this->belongsTo(Tenant::class);
    }

    public function positions()
    {
        return $this->hasMany(Position::class);
    }
}