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
        Schema::table('reservations', function (Blueprint $table) {
            // service_idカラムをoperator_idの後に追加
            $table->foreignId('service_id')
                  ->nullable()
                  ->after('operator_id')
                  ->constrained('services')
                  ->onDelete('set null');

            // service_nameカラムを削除
            $table->dropColumn('service_name');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('reservations', function (Blueprint $table) {
            // 外部キー制約を先に削除
            $table->dropForeign(['service_id']);
            
            // service_idカラムを削除
            $table->dropColumn('service_id');
            
            // service_nameカラムを再追加
            $table->string('service_name')->after('operator_id');
        });
    }
};
