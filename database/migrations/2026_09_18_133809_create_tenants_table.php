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
        Schema::create('tenants', function (Blueprint $table) {
    $table->id();
    $table->char('public_id', 26)->unique();
    $table->string('name', 200);
    $table->string('slug', 100)->unique();
    $table->enum('status', ['active', 'suspended'])->default('active');
    $table->string('timezone', 50)->default('Asia/Colombo');
    $table->char('currency', 3)->default('LKR');
    $table->string('locale', 10)->default('en');
    $table->timestamps();
});
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tenants');
    }
};
