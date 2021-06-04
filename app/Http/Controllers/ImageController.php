<?php

namespace App\Http\Controllers;

use App\Models\Image;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use Illuminate\Support\Facades\Storage;

class ImageController extends Controller
{

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request->validate([
            'image' => 'required|image|max:1024',
            'note_id' => 'required|numeric',
        ]);

        $user = User::find(Auth::id());

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('images');
            $user->images()->create([
                'name' => $path
            ]);
        }

        return redirect('/app/note/'.$request->note_id);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Image  $image
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request)
    {
        $request->validate([
            'image_id' => 'required|numeric',
            'note_id' => 'required|numeric',
        ]);

        $image = Image::find($request->image_id);
        $notes = $image->notes;

        if ($notes->isNotEmpty()) {
            $error = \Illuminate\Validation\ValidationException::withMessages([
                'image_id' => ['La imagen esta en uso']
             ]);
             throw $error;
        } else {
            // Eliminando del storage y la información de la base de datos
            if (Storage::delete($image->name)) {
                $image->delete();
                return redirect('/app/note/'.$request->note_id);
            } else {
                $error = \Illuminate\Validation\ValidationException::withMessages([
                    'image_id' => ['No se pudo eliminar la imagen']
                 ]);
                 throw $error;
            }
        }
    }
}
