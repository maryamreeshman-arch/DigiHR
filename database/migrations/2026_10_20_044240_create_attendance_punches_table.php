<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('attendance_punches', function (Blueprint $table) {
            $table->id();

            $table->foreignId('tenant_id')
                ->constrained('tenants')
                ->cascadeOnDelete();

            $table->foreignId('employee_id')
                ->constrained('employees')
                ->cascadeOnDelete();

            $table->enum('punch_type', ['in', 'out']);

            $table->dateTime('punched_at');

            $table->string('source')->default('web');

            $table->timestamps();

            $table->index(
                ['tenant_id', 'employee_id', 'punched_at'],
                'attendance_punches_employee_time_index'
            );
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('attendance_punches');
    }
};
