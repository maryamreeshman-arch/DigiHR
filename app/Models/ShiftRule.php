<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ShiftRule extends Model
{
    protected $fillable = [
        'shift_id',
        'late_after_minutes',
        'early_leave_before_minutes',
        'overtime_after_minutes',
        'overtime_rate',
    ];

    protected function casts(): array
    {
        return [
            'late_after_minutes' => 'integer',
            'early_leave_before_minutes' => 'integer',
            'overtime_after_minutes' => 'integer',
            'overtime_rate' => 'decimal:2',
        ];
    }

    public function shift(): BelongsTo
    {
        return $this->belongsTo(Shift::class);
    }
}
