<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('employee_checkins', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('employee_id')->references('id')->on('employees')->onDelete('cascade');
            $table->dateTime('check_in');
            $table->dateTime('check_out')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('employee_checkins');
    }
};
