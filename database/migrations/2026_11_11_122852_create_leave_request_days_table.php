<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('leave_request_days', function (Blueprint $table) {
            $table->id();

            $table->foreignId('leave_request_id')
                ->constrained('leave_requests')
                ->cascadeOnDelete();

            $table->date('date');

            $table->string('duration')->default('full_day');
            $table->string('day_type')->default('full_day');

            $table->timestamps();

            $table->unique(['leave_request_id', 'date']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('leave_request_days');
    }
};
