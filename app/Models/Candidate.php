<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Candidate extends Model
{
    protected $fillable = [
        'tenant_id',
        'candidate_no',
        'first_name',
        'last_name',
        'email',
        'phone',
        'date_of_birth',
        'current_company',
        'current_position',
        'source',
        'status',
    ];

    protected $casts = [
        'date_of_birth' => 'date',
    ];

    public function tenant(): BelongsTo
    {
        return $this->belongsTo(Tenant::class);
    }

    public function contacts(): HasMany
    {
        return $this->hasMany(CandidateContact::class);
    }

    public function education(): HasMany
    {
        return $this->hasMany(CandidateEducation::class);
    }

    public function experience(): HasMany
    {
        return $this->hasMany(CandidateExperience::class);
    }

    public function skills(): HasMany
    {
        return $this->hasMany(CandidateSkill::class);
    }

    public function applications(): HasMany
    {
        return $this->hasMany(Application::class);
    }
}