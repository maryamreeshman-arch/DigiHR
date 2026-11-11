<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class LeaveBalance extends Model
{
    protected $fillable = [
        'employee_id',
        'leave_type_id',
        'year',
        'opening_balance',
        'accrued',
        'used',
        'adjusted',
        'carried_forward',
        'closing_balance',
    ];

    protected function casts(): array
    {
        return [
            'year' => 'integer',
            'opening_balance' => 'decimal:2',
            'accrued' => 'decimal:2',
            'used' => 'decimal:2',
            'adjusted' => 'decimal:2',
            'carried_forward' => 'decimal:2',
            'closing_balance' => 'decimal:2',
        ];
    }

    public function employee(): BelongsTo
    {
        return $this->belongsTo(Employee::class);
    }

    public function leaveType(): BelongsTo
    {
        return $this->belongsTo(LeaveType::class);
    }
}