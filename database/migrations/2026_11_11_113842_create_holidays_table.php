<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('holidays', function (Blueprint $table) {
            $table->id();
            $table->foreignId('holiday_calendar_id')
                ->constrained('holiday_calendars')
                ->cascadeOnDelete();

            $table->date('date');
            $table->string('name');
            $table->string('holiday_type');
            $table->timestamps();

            $table->index(['holiday_calendar_id', 'date']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('holidays');
    }
};
