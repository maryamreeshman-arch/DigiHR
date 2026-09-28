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
        Schema::create('employee_certifications', function (Blueprint $table) {
        $table->id();

        $table->foreignId('employee_id')
            ->constrained('employees')
            ->cascadeOnDelete();

        $table->foreignId('certification_id')
            ->constrained('certifications')
            ->cascadeOnDelete();

        $table->string('certificate_no')->nullable();
        $table->date('issue_date')->nullable();
        $table->date('expiry_date')->nullable();
        $table->string('file_path')->nullable();

        $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('employee_certifications');
    }
};
