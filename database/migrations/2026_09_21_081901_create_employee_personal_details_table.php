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
         Schema::create('employee_personal_details', function (Blueprint $table) {
        $table->id();

        $table->foreignId('employee_id')
            ->constrained('employees')
            ->cascadeOnDelete();

        $table->string('first_name');
        $table->string('middle_name')->nullable();
        $table->string('last_name');
        $table->string('preferred_name')->nullable();
        $table->date('date_of_birth')->nullable();
        $table->string('gender')->nullable();
        $table->string('marital_status')->nullable();
        $table->string('nationality')->nullable();
        $table->string('nic_number')->nullable();
        $table->string('passport_number')->nullable();
        $table->string('blood_group')->nullable();
        $table->string('photo_path')->nullable();

        $table->timestamps();

        $table->unique('employee_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('employee_personal_details');
    }
};
