<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class JobLevel extends Model
{
    protected $fillable = [
        'tenant_id',
        'name',
        'code',
        'rank',
    ];

    protected $casts = [
        'rank' => 'integer',
    ];

    public function tenant()
    {
        return $this->belongsTo(Tenant::class);
    }

    public function positions()
    {
        return $this->hasMany(Position::class);
    }
}
