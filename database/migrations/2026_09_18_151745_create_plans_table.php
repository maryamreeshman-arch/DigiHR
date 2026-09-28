<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('plans', function (Blueprint $table) {
            $table->id();

            $table->string('name');
            $table->string('code')->unique();
            $table->text('description')->nullable();

            $table->decimal('price', 12, 2)->default(0);

            $table->string('billing_cycle');

            $table->unsignedInteger('employee_limit')->nullable();
            $table->unsignedInteger('branch_limit')->nullable();
            $table->unsignedInteger('storage_limit')->nullable();

            $table->string('status')->default('active');

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('plans');
    }
};