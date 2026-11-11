<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('leave_requests', function (Blueprint $table) {
            $table->id();

            $table->foreignId('tenant_id')
                ->constrained()
                ->cascadeOnDelete();

            $table->foreignId('employee_id')
                ->constrained('employees')
                ->cascadeOnDelete();

            $table->foreignId('leave_type_id')
                ->constrained('leave_types')
                ->cascadeOnDelete();

            $table->date('start_date');
            $table->date('end_date');
            $table->decimal('total_days', 8, 2);
            $table->text('reason')->nullable();
            $table->string('attachment_path')->nullable();

            $table->string('status')->default('pending');

            $table->timestamps();

            $table->index(['tenant_id', 'status']);
            $table->index(['employee_id', 'start_date', 'end_date']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('leave_requests');
    }
};
