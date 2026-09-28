<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('positions', function (Blueprint $table) {
        $table->id();

        $table->foreignId('tenant_id')
            ->constrained('tenants')
            ->cascadeOnDelete();

        $table->foreignId('company_id')
            ->constrained('companies')
            ->cascadeOnDelete();

        $table->foreignId('department_id')
            ->nullable()
            ->constrained('departments')
            ->nullOnDelete();

        $table->foreignId('job_grade_id')
            ->nullable()
            ->constrained('job_grades')
            ->nullOnDelete();

        $table->foreignId('job_level_id')
            ->nullable()
            ->constrained('job_levels')
            ->nullOnDelete();

        $table->string('title');
        $table->string('code');
        $table->text('description')->nullable();
        $table->unsignedInteger('headcount')->default(1);
        $table->string('status')->default('active');

        $table->timestamps();

        $table->unique(['tenant_id', 'code']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('positions');
    }
};
