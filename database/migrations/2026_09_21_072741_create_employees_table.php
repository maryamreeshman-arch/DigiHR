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
       Schema::create('employees', function (Blueprint $table) {
        $table->id();

        $table->foreignId('tenant_id')
            ->constrained('tenants')
            ->cascadeOnDelete();

        $table->foreignId('user_id')
            ->nullable()
            ->constrained('users')
            ->nullOnDelete();

        $table->string('employee_no');

        $table->foreignId('company_id')
            ->constrained('companies')
            ->cascadeOnDelete();

        $table->foreignId('branch_id')
            ->nullable()
            ->constrained('branches')
            ->nullOnDelete();

        $table->foreignId('department_id')
            ->nullable()
            ->constrained('departments')
            ->nullOnDelete();

        $table->foreignId('division_id')
            ->nullable()
            ->constrained('divisions')
            ->nullOnDelete();

        $table->foreignId('location_id')
            ->nullable()
            ->constrained('locations')
            ->nullOnDelete();

        $table->foreignId('cost_center_id')
            ->nullable()
            ->constrained('cost_centers')
            ->nullOnDelete();

        $table->foreignId('position_id')
            ->nullable()
            ->constrained('positions')
            ->nullOnDelete();

        $table->foreignId('employment_type_id')
            ->nullable()
            ->constrained('employment_types')
            ->nullOnDelete();

        $table->foreignId('employment_status_id')
            ->nullable()
            ->constrained('employment_statuses')
            ->nullOnDelete();

        $table->foreignId('manager_id')
            ->nullable()
            ->constrained('employees')
            ->nullOnDelete();

        $table->date('join_date')->nullable();
        $table->date('confirmation_date')->nullable();
        $table->date('termination_date')->nullable();

        $table->string('status')->default('active');

        $table->timestamps();

        $table->unique(['tenant_id', 'employee_no']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('employees');
    }
};
