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
        Schema::create('employee_employment_history', function (Blueprint $table) {

            $table->id();

            // Tenant
            $table->foreignId('tenant_id')
                ->constrained('tenants')
                ->cascadeOnDelete();

            // Employee
            $table->foreignId('employee_id')
                ->constrained('employees')
                ->cascadeOnDelete();

            // Company
            $table->foreignId('company_id')
                ->constrained('companies')
                ->cascadeOnDelete();

            // Branch
            $table->foreignId('branch_id')
                ->nullable()
                ->constrained('branches')
                ->nullOnDelete();

            // Department
            $table->foreignId('department_id')
                ->nullable()
                ->constrained('departments')
                ->nullOnDelete();

            // Division
            $table->foreignId('division_id')
                ->nullable()
                ->constrained('divisions')
                ->nullOnDelete();

            // Position
            $table->foreignId('position_id')
                ->nullable()
                ->constrained('positions')
                ->nullOnDelete();

            // Manager
            $table->foreignId('manager_id')
                ->nullable()
                ->constrained('employees')
                ->nullOnDelete();

            // Employment Type
            $table->foreignId('employment_type_id')
                ->nullable()
                ->constrained('employment_types')
                ->nullOnDelete();

            // Job Grade
            $table->foreignId('job_grade_id')
                ->nullable()
                ->constrained('job_grades')
                ->nullOnDelete();

            // Job Level
            $table->foreignId('job_level_id')
                ->nullable()
                ->constrained('job_levels')
                ->nullOnDelete();

            // Employment Period
            $table->date('start_date');
            $table->date('end_date')->nullable();

            // Reason / Notes
            $table->string('reason')->nullable();
            $table->text('notes')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('employee_employment_history');
    }
};
