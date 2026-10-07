<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class OnboardingTask extends Model
{
    protected $fillable = [
        'template_id',
        'title',
        'description',
        'assigned_role',
        'days_from_join_date',
        'required',
    ];

    protected $casts = [
        'days_from_join_date' => 'integer',
        'required' => 'boolean',
    ];

    public function template(): BelongsTo
    {
        return $this->belongsTo(
            OnboardingTemplate::class,
            'template_id'
        );
    }

    public function employeeOnboardingTasks(): HasMany
    {
        return $this->hasMany(
            EmployeeOnboardingTask::class,
            'task_id'
        );
    }
}