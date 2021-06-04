<?php

use App\Http\Controllers\LinkController;
use Illuminate\Support\Facades\Route;

// Notas
// Vista: App/MyLinks
Route::get('app/my-links', [LinkController::class, 'index'])
  ->middleware(['auth', 'verified'])->name('app.my_links');

// Vista: App/Link -> nuevo link
Route::get('app/link', [LinkController::class, 'create'])
  ->middleware(['auth', 'verified'])->name('app.link');

// Vista: App/Link -> para editar un link
Route::get('app/link/{id}', [LinkController::class, 'show'])
  ->middleware(['auth', 'verified'])->name('app.link.edit');

// Crear nuevo link
Route::post('app/link', [LinkController::class, 'store'])
  ->middleware(['auth', 'verified']);

// Actualiza una nota
Route::put('app/link', [LinkController::class, 'update'])
  ->middleware(['auth', 'verified']);

// Eliminar uno o varios links
Route::delete('app/link', [LinkController::class, 'destroy'])
  ->middleware(['auth', 'verified']);
