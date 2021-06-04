<?php

use App\Http\Controllers\NoteController;
use Illuminate\Support\Facades\Route;

// Notas
// Vista: App/MyNotes
Route::get('app/my-notes', [NoteController::class, 'index'])
  ->middleware(['auth'])->name('app.my_notes');

// Vista: App/Note -> nueva nota
Route::get('app/note', [NoteController::class, 'create'])
  ->middleware(['auth'])->name('app.note');

// Vista: App/Note -> para editar una nota
Route::get('app/note/{id}', [NoteController::class, 'show'])
  ->middleware(['auth'])->name('app.note.edit');

// Crear nueva nota
Route::post('app/note', [NoteController::class, 'store'])
  ->middleware(['auth']);

// Actualiza una nota
Route::put('app/note', [NoteController::class, 'update'])
  ->middleware(['auth']);

// Eliminar una o varias notas
Route::delete('app/note', [NoteController::class, 'destroy'])
  ->middleware(['auth']);
