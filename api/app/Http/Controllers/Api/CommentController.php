<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Comment;
use App\Models\Video;
use Illuminate\Http\Request;

class CommentController extends Controller
{
    public function index(Video $video)
    {
        if(!$video){
            return response()->json(['error'=>'Video not found'],404);
        }
        return $video->comments()->with('user')->latest()->get();
    }

    public function store(Request $request,Video $video)
    {
        // dd($request);
        $request->validate([
            'text'=>'required|string|max:1000',
        ]);
        $comment = Comment::create([
            'user_id'=>auth()->id(),
            'text'=>$request->text,
            'video_id'=>$video->id
        ]);
        return $comment->load('user');
    }
}
