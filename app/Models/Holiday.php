<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Holiday extends Model
{
    protected $fillable = [
        'holiday_calendar_id',
        'date',
        'name',
        'holiday_type',
    ];

    protected $casts = [
        'date' => 'date',
    ];

    public function holidayCalendar(): BelongsTo
    {
        return $this->belongsTo(HolidayCalendar::class);
    }
}
