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
        Schema::create('verified_docs', function (Blueprint $table) {
            $table->id();
            $table->foreignId('institute_id')->unique()->constrained()->onDelete('cascade');
            $table->string('type');
            $table->string('link');
            $table->enum('status', ['pending', 'approved', 'rejected'])->default('pending');
            $table->timestamp('verification_date')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('verified_docs');
    }
};
