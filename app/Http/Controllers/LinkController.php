<?php

namespace App\Http\Controllers;

use App\Models\Link;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class LinkController extends Controller
{
        /**
     * Muestra la vista de todas las notas
     * Vista: App/MyLinks
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $idUser = Auth::id();
        $links = User::find($idUser)->links;
        
        return Inertia::render('App/MyLinks', [
            'links' => $links
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
        return Inertia::render('App/Link');
    }

    /**
     * Muestra una nota para editar
     */
    public function show($id)
    {
        $user = User::find(Auth::id());
        $link = $user->links()
            ->where('id', $id)->first();
        
        if ($link) {
            return Inertia::render('App/Link', [
                'link' => $link
            ]);
        } else {
            return redirect('/app/my-links');
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
            'link' => 'required|max:255',
            'page' => 'required|max:255',
            'autor' => 'required|max:255',
            'year' => 'required|digits:4'
        ]);
        
        $user = User::find(Auth::id());
        $link = $user->links()->create([
            'link' => $request->link,
            'page' => $request->page,
            'autor' => $request->autor,
            'year' => $request->year
        ]);

        return redirect('/app/link/'.$link->id);
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
            'link' => 'required|max:255',
            'page' => 'required|max:255',
            'autor' => 'required|max:255',
            'year' => 'required|digits:4'
        ]);

        $idUser = Auth::id();
        $link = Link::where('id', $request->id)
            ->where('user_id', $idUser)
            ->update([
                'link' => $request->link,
                'page' => $request->page,
                'autor' => $request->autor,
                'year' => $request->year
            ]);
        
        if ($link) {
            return redirect('/app/link/'.$request->id);
        } else {
            return redirect('app/my-links');
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
        
        foreach ($request->idsLinks as $id) {
            Link::where('user_id', $idUser)
            ->where('id', $id)->delete();
        }
        
        return redirect('app/my-links');
    }
}
