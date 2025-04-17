<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Post;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class MediaController extends Controller
{
    /**
     * Upload an image for the editor.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function uploadImage(Request $request)
    {
        $request->validate([
            'image' => 'required|image|max:10240', // Max 10MB
        ]);

        // Create a temporary model to attach media to
        // You can modify this to use an existing model if needed
        $model = new Post();
        $mediaItem = $model
            ->addMediaFromRequest('image')
            ->usingFileName(Str::random(40) . '.' . $request->file('image')->getClientOriginalExtension())
            ->toMediaCollection('editor-images');

        return response()->json([
            'url' => $mediaItem->getUrl(),
            'media_id' => $mediaItem->id,
        ]);
    }
}