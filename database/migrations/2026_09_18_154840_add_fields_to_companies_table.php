<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('companies', function (Blueprint $table) {
            $table->foreignId('tenant_id')
                  ->constrained('tenants')
                  ->cascadeOnDelete();

            $table->foreignId('legal_entity_id')
                  ->constrained('legal_entities')
                  ->cascadeOnDelete();

            $table->string('name');
            $table->string('code')->unique();
            $table->string('registration_no')->nullable();
            $table->string('tax_number')->nullable();
            $table->string('email')->nullable();
            $table->string('phone')->nullable();
            $table->text('address')->nullable();
            $table->string('status')->default('active');
        });
    }

    public function down(): void
    {
        Schema::table('companies', function (Blueprint $table) {
            $table->dropForeign(['tenant_id']);
            $table->dropForeign(['legal_entity_id']);

            $table->dropColumn([
                'tenant_id',
                'legal_entity_id',
                'name',
                'code',
                'registration_no',
                'tax_number',
                'email',
                'phone',
                'address',
                'status',
            ]);
        });
    }
};