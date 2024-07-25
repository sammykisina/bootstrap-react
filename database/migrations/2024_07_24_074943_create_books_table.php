<?php

declare(strict_types=1);

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('books', static function (Blueprint $table) {
            $table->id();

            $table->string('title');
            $table->string('description');
            $table->string('isbn')->unique();

            $table->foreignId('author_id')
                ->constrained(
                    table: 'users',
                    column: 'id',
                )->cascadeOnDelete();

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('books');
    }
};
