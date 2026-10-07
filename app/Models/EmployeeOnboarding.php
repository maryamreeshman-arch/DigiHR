<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class EmployeeOnboarding extends Model
{
    protected $fillable = [
        'employee_id',
        'template_id',
        'start_date',
        'completion_date',
        'status',
    ];

    protected $casts = [
        'start_date' => 'date',
        'completion_date' => 'date',
    ];

    public function employee(): BelongsTo
    {
        return $this->belongsTo(
            Employee::class,
            'employee_id'
        );
    }

    public function template(): BelongsTo
    {
        return $this->belongsTo(
            OnboardingTemplate::class,
            'template_id'
        );
    }

    public function tasks(): HasMany
    {
        return $this->hasMany(
            EmployeeOnboardingTask::class,
            'employee_onboarding_id'
        );
    }
}