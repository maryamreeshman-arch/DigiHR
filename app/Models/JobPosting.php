<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class JobPosting extends Model
{
    protected $fillable = [
        'tenant_id',
        'job_requisition_id',
        'title',
        'description',
        'requirements',
        'location',
        'employment_type_id',
        'published_at',
        'closing_at',
        'status',
    ];

    protected $casts = [
        'published_at' => 'datetime',
        'closing_at' => 'datetime',
    ];

    public function tenant(): BelongsTo
    {
        return $this->belongsTo(Tenant::class);
    }

    public function jobRequisition(): BelongsTo
    {
        return $this->belongsTo(JobRequisition::class);
    }

    public function employmentType(): BelongsTo
    {
        return $this->belongsTo(EmploymentType::class);
    }

    public function applications(): HasMany
    {
        return $this->hasMany(Application::class);
    }
}