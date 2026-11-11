<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class LeavePolicy extends Model
{
    protected $fillable = [
        'tenant_id',
        'name',
        'year',
    ];

    protected function casts(): array
    {
        return [
            'year' => 'integer',
        ];
    }

    public function tenant(): BelongsTo
    {
        return $this->belongsTo(Tenant::class);
    }

    public function rules(): HasMany
    {
        return $this->hasMany(LeavePolicyRule::class);
    }
}