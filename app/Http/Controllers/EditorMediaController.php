<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Str;
use App\Models\Post;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;

class EditorMediaController extends Controller
{
    /**
     * Handle file upload from the editor and store it using Spatie Media Library
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function upload(Request $request)
    {
        try {
            // Validate the uploaded file
            $request->validate([
                'file' => 'required|file|mimes:jpeg,png,jpg,gif,webp,svg|max:5120',
                'post_id' => 'nullable|integer|exists:posts,id',
            ]);

            // Create temporary model or get existing post if post_id is provided
            if ($request->has('post_id') && $request->post_id) {
                $model = Post::findOrFail($request->post_id);
            } else {
                // Create a temporary model to associate the media with
                // We'll use a generic Post model to store editor uploads
                $model = new Post();
                $model->title = 'Editor Upload - ' . now()->format('Y-m-d H:i:s');
                $model->content = 'Temporary post for editor uploads';
                $model->description = 'Auto-generated for editor uploads';
                $model->slug = 'editor-upload-' . Str::random(10);
                $model->user_id = Auth::id();
                $model->is_published = false;
                $model->save();
            }

            // Add the uploaded file to the media collection
            $media = $model->addMediaFromRequest('file')
                ->sanitizingFileName(function($fileName) {
                    // Create a unique filename to prevent overwriting
                    return Str::slug(pathinfo($fileName, PATHINFO_FILENAME)) 
                        . '-' . Str::random(5) 
                        . '.' . pathinfo($fileName, PATHINFO_EXTENSION);
                })
                ->withResponsiveImages() // Generate responsive versions
                ->toMediaCollection('editor_images');

            // Return the URL and additional info for the editor
            return response()->json([
                'success' => true,
                'url' => $media->getFullUrl(), // Full URL to use in editor
                'name' => $media->name,
                'size' => $media->size,
                'mime' => $media->mime_type,
                'media_id' => $media->id,
            ]);

        } catch (\Exception $e) {
            Log::error('Editor image upload failed: ' . $e->getMessage());
            
            return response()->json([
                'success' => false,
                'message' => 'Upload failed: ' . $e->getMessage(),
            ], 422);
        }
    }
}