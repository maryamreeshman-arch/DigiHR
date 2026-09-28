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
        Schema::create('employee_addresses', function (Blueprint $table) {
        $table->id();

        $table->foreignId('employee_id')
            ->constrained('employees')
            ->cascadeOnDelete();

        $table->string('address_type');
        $table->string('address_line_1');
        $table->string('address_line_2')->nullable();
        $table->string('city')->nullable();
        $table->string('district')->nullable();
        $table->string('province')->nullable();
        $table->string('postal_code')->nullable();
        $table->string('country')->nullable();
        $table->boolean('is_primary')->default(false);

        $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('employee_addresses');
    }
};
