<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Note;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class NoteController extends Controller
{
    /**
     * Muestra la vista de todas las notas
     * Vista: App/MyNotes
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $idUser = Auth::id();
        $notes = User::find($idUser)->notes;
        
        return Inertia::render('App/MyNotes', [
            'notes' => $notes
        ]);
    }

    /**
     * Muestra una nota
     * Vista: App/Note
     *
     * @param  \App\Models\Note  $note
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return Inertia::render('App/Note');
    }

    /**
     * Muestra una nota para editar
     */
    public function show($id)
    {
        $user = User::find(Auth::id());
        $note = $user->notes()
            ->where('id', $id)->first();
        
        if ($note) {
            $images = $user->images;

            foreach ($images as $image) {
                $image->name = Storage::url($image->name);
            }

            $image = $note->image;
            if ($image)
                $image->name = Storage::url($image->name);
            
            return Inertia::render('App/Note', [
                'note' => $note,
                'image' => $image,
                'images' => $images
            ]);
        } else {
            return redirect('/app/my-notes');
        }
    }

    /**
     * Almacena una nota
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|max:255',
            'content' => 'required|max:700'
        ]);
        
        $user = User::find(Auth::id());
        $note = $user->notes()->create([
            'title' => $request->title,
            'content' => $request->content,
        ]);

        return redirect('/app/note/'.$note->id);
    }

    /**
     * Actualiza una nota
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request)
    {
        $request->validate([
            'title' => 'required|max:255',
            'content' => 'required|max:700'
        ]);

        $idUser = Auth::id();
        $note = Note::where('id', $request->id)
            ->where('user_id', $idUser)
            ->update([
                'title' => $request->title,
                'content' => $request->content,
                'image_id' => $request->image_id
            ]);
        
        if ($note) {
            return redirect('/app/note/'.$request->id);
        } else {
            return redirect('app/my-notes');
        }
    }

    /**
     * Eliminar una nota
     *
     * @param  \App\Models\Note  $note
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request)
    {
        $idUser = Auth::id();
        
        foreach ($request->idsNotes as $id) {
            Note::where('user_id', $idUser)
            ->where('id', $id)->delete();
        }
        
        return redirect('app/my-notes');
    }
}
