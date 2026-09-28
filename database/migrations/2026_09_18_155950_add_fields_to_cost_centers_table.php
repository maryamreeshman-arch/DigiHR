<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('cost_centers', function (Blueprint $table) {
            $table->foreignId('tenant_id')
                  ->constrained('tenants')
                  ->cascadeOnDelete();

            $table->foreignId('company_id')
                  ->constrained('companies')
                  ->cascadeOnDelete();

            $table->foreignId('parent_id')
                  ->nullable()
                  ->constrained('cost_centers')
                  ->nullOnDelete();

            $table->string('code')->unique();
            $table->string('name');
            $table->text('description')->nullable();
        });
    }

    public function down(): void
    {
        Schema::table('cost_centers', function (Blueprint $table) {
            $table->dropForeign(['tenant_id']);
            $table->dropForeign(['company_id']);
            $table->dropForeign(['parent_id']);

            $table->dropColumn([
                'tenant_id',
                'company_id',
                'parent_id',
                'code',
                'name',
                'description',
            ]);
        });
    }
};