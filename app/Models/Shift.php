<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Shift extends Model
{
    protected $fillable = [
        'tenant_id',
        'name',
        'code',
        'start_time',
        'end_time',
        'break_minutes',
        'grace_minutes',
        'crosses_midnight',
        'status',
    ];

    protected function casts(): array
    {
        return [
            'break_minutes' => 'integer',
            'grace_minutes' => 'integer',
            'crosses_midnight' => 'boolean',
        ];
    }

    public function tenant(): BelongsTo
    {
        return $this->belongsTo(Tenant::class);
    }

    public function shiftRule(): HasOne
    {
        return $this->hasOne(ShiftRule::class);
    }
}
