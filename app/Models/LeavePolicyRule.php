<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class LeavePolicyRule extends Model
{
    protected $fillable = [
        'leave_policy_id',
        'leave_type_id',
        'entitlement_days',
        'carry_forward',
        'max_carry_forward',
        'encashment_allowed',
        'probation_allowed',
    ];

    protected function casts(): array
    {
        return [
            'entitlement_days' => 'decimal:2',
            'carry_forward' => 'boolean',
            'max_carry_forward' => 'decimal:2',
            'encashment_allowed' => 'boolean',
            'probation_allowed' => 'boolean',
        ];
    }

    public function leavePolicy(): BelongsTo
    {
        return $this->belongsTo(LeavePolicy::class);
    }

    public function leaveType(): BelongsTo
    {
        return $this->belongsTo(LeaveType::class);
    }
}