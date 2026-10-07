<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class OnboardingTemplate extends Model
{
    protected $fillable = [
        'tenant_id',
        'name',
        'description',
        'status',
    ];

    public function tenant(): BelongsTo
    {
        return $this->belongsTo(Tenant::class);
    }

    public function tasks(): HasMany
    {
        return $this->hasMany(
            OnboardingTask::class,
            'template_id'
        );
    }

    public function employeeOnboardings(): HasMany
    {
        return $this->hasMany(
            EmployeeOnboarding::class,
            'template_id'
        );
    }
}