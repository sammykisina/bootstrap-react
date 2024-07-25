<?php

use App\Http\Controllers\Books;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::prefix('books')->as('books:')->group(function (): void {
    Route::get('/', Books\IndexController::class)->name('index');

    Route::controller(Books\BooksController::class)->group(function (): void {
        Route::post('/', 'createBook')->name('create');
        Route::patch('{book}', 'updateBook')->name('update');
        Route::delete('{book}', 'destroyBook')->name('destroy');
    });
})->middleware(['auth', 'verified']);

Route::middleware('auth')->group(function (): void {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
