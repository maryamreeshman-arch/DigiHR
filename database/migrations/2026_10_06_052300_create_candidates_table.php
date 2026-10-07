<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('candidates', function (Blueprint $table) {
            $table->id();

            $table->foreignId('tenant_id')
                ->constrained('tenants')
                ->cascadeOnDelete();

            $table->string('candidate_no')->unique();

            $table->string('first_name');

            $table->string('last_name');

            $table->string('email');

            $table->string('phone');

            $table->date('date_of_birth')->nullable();

            $table->string('current_company')->nullable();

            $table->string('current_position')->nullable();

            $table->string('source');

            $table->string('status');

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('candidates');
    }
};