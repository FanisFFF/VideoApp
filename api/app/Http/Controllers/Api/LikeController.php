<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Like;
use App\Models\Video;
use Illuminate\Http\Request;

class LikeController extends Controller
{

    public function toggle(Request $request,Video $video)
    {
        $user = $request->user();

        $liked =$video->likes()->where('user_id', $user->id)->exists();
        if($liked){
            $video->likes()->detach($user->id);
        } else{
            $video->likes()->attach($user->id);
        }
        return response()->json([
            'liked'=>!$liked,
            'likes_count'=>$video->likes()->count()
        ]);
    }
}
