<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class LeaveType extends Model
{
    protected $fillable = [
        'tenant_id',
        'name',
        'code',
        'paid',
        'requires_document',
        'allow_half_day',
        'allow_hourly',
        'status',
    ];

    protected function casts(): array
    {
        return [
            'paid' => 'boolean',
            'requires_document' => 'boolean',
            'allow_half_day' => 'boolean',
            'allow_hourly' => 'boolean',
            'status' => 'boolean',
        ];
    }

    public function tenant(): BelongsTo
    {
        return $this->belongsTo(Tenant::class);
    }

    public function policyRules(): HasMany
    {
        return $this->hasMany(LeavePolicyRule::class);
    }

    public function balances(): HasMany
    {
        return $this->hasMany(LeaveBalance::class);
    }

    public function requests(): HasMany
    {
        return $this->hasMany(LeaveRequest::class);
    }
}