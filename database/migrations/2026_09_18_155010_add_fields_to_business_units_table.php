<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('business_units', function (Blueprint $table) {
            $table->foreignId('tenant_id')
                  ->constrained('tenants')
                  ->cascadeOnDelete();

            $table->foreignId('company_id')
                  ->constrained('companies')
                  ->cascadeOnDelete();

            $table->string('name');
            $table->string('code')->unique();
            $table->text('description')->nullable();
            $table->string('status')->default('active');
        });
    }

    public function down(): void
    {
        Schema::table('business_units', function (Blueprint $table) {
            $table->dropForeign(['tenant_id']);
            $table->dropForeign(['company_id']);

            $table->dropColumn([
                'tenant_id',
                'company_id',
                'name',
                'code',
                'description',
                'status',
            ]);
        });
    }
};