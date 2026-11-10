
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('attendance_records', function (Blueprint $table) {
            $table->foreignId('tenant_id')
                ->constrained('tenants')
                ->cascadeOnDelete();

            $table->foreignId('employee_id')
                ->constrained('employees')
                ->cascadeOnDelete();

            $table->date('attendance_date');

            $table->dateTime('check_in')->nullable();
            $table->dateTime('check_out')->nullable();

            $table->string('status')->default('present');
            $table->text('remarks')->nullable();

            $table->unique(
                ['tenant_id', 'employee_id', 'attendance_date'],
                'attendance_employee_date_unique'
            );
        });
    }

    public function down(): void
    {
        Schema::table('attendance_records', function (Blueprint $table) {
            $table->dropUnique('attendance_employee_date_unique');

            $table->dropConstrainedForeignId('tenant_id');
            $table->dropConstrainedForeignId('employee_id');

            $table->dropColumn([
                'attendance_date',
                'check_in',
                'check_out',
                'status',
                'remarks',
            ]);
        });
    }
};
