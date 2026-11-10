<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('shift_rules', function (Blueprint $table) {
            $table->id();

            $table->foreignId('shift_id')
                ->unique()
                ->constrained('shifts')
                ->cascadeOnDelete();

            $table->unsignedSmallInteger('late_after_minutes')->default(0);
            $table->unsignedSmallInteger('early_leave_before_minutes')->default(0);
            $table->unsignedSmallInteger('overtime_after_minutes')->default(0);
            $table->decimal('overtime_rate', 5, 2)->default(1.00);

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('shift_rules');
    }
};
