<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Video extends Model
{
   protected $fillable = [
        'title',
        'description',
        'video_path',
        'thumbnail_path',
    ];
    protected $appends = ['liked_by_user'];

    public function getLikedByUserAttribute()
    {
        return $this->likes()->where('user_id',3)->exists();
    }

    public function comments()
    {
        return $this->hasMany(Comment::class);
    }
    
    public function likes()
    {
        return $this->belongsToMany(User::class,'likes');
    }
}
