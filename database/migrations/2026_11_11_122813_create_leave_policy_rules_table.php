<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('leave_policy_rules', function (Blueprint $table) {
            $table->id();

            $table->foreignId('leave_policy_id')
                ->constrained('leave_policies')
                ->cascadeOnDelete();

            $table->foreignId('leave_type_id')
                ->constrained('leave_types')
                ->cascadeOnDelete();

            $table->decimal('entitlement_days', 8, 2)->default(0);
            $table->boolean('carry_forward')->default(false);
            $table->decimal('max_carry_forward', 8, 2)->default(0);
            $table->boolean('encashment_allowed')->default(false);
            $table->boolean('probation_allowed')->default(false);

            $table->timestamps();

            $table->unique(['leave_policy_id', 'leave_type_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('leave_policy_rules');
    }
};
