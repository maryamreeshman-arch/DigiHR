<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class JobOffer extends Model
{
    protected $fillable = [
        'application_id',
        'position_id',
        'salary',
        'joining_date',
        'offer_date',
        'expiry_date',
        'status',
        'document_path',
    ];

    protected $casts = [
        'salary' => 'decimal:2',
        'joining_date' => 'date',
        'offer_date' => 'date',
        'expiry_date' => 'date',
    ];

    public function application(): BelongsTo
    {
        return $this->belongsTo(Application::class);
    }

    public function position(): BelongsTo
    {
        return $this->belongsTo(Position::class);
    }
}