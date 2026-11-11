<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('holiday_calendars', function (Blueprint $table) {
            $table->id();
            $table->foreignId('tenant_id')->constrained()->cascadeOnDelete();
            $table->string('name');
            $table->string('country');
            $table->unsignedSmallInteger('year');
            $table->timestamps();

            $table->unique(['tenant_id', 'country', 'year']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('holiday_calendars');
    }
};
