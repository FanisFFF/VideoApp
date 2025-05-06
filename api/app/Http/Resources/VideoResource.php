<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Auth;

class VideoResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request)
    {
        $user = Auth::user(); // get current user
        // dd($this->likes()->pluck('user_id'), Auth::id());
        return [
            'id'             => $this->id,
            'title'          => $this->title,
            'description'    => $this->description,
            'video_path'     => $this->video_path,
            'thumbnail_path' => $this->thumbnail_path,
            'created_at'     => $this->created_at,
            'updated_at'     => $this->updated_at,
            'likes'          => $this->likes,
            'likes_count'    => $this->likes()->count(),
            'comments' => $this->comments()
                ->with('user')
                ->latest()
                ->get()
                ->map(function ($comment) {
                    return [
                        'id' => $comment->id,
                        'text' => $comment->text,
                        'created_at' => $comment->created_at,
                        'user' => [
                            'id' => $comment->user->id,
                            'name' => $comment->user->name,
                        ],
                    ];
                }),

            'liked_by_user' => $user ? $this->likes()->where('user_id', $user->id)->exists() : false,
        ];
    }
}
