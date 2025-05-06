<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\VideoResource;
use App\Models\Video;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use ProtoneMedia\LaravelFFMpeg\Support\FFMpeg;

class VideoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
       $videos =  Video::all();
       return VideoResource::collection($videos);
    }

    public function store(Request $request)
    {
    
        try {
            $validated = $request->validate([
                'title' => 'required|string|max:255',
                'description' => 'nullable|string',
                'video' => 'required|file|mimes:mp4,mov,avi|max:204800',
                'thumbnail' => 'nullable|image|mimes:jpg,jpeg,png|max:5120',
            ]);
        } catch (\Illuminate\Validation\ValidationException $e) {
        
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $e->errors(),
            ], 422);
        }
        
        
        // Check and store video
        if (!$request->hasFile('video')) {
            Log::warning('❌ No video file uploaded.');
            return response()->json(['error' => 'Video file is required.'], 422);
        }
    
        $videoFile = $request->file('video');
        $videoPath = $videoFile->store('videos', 'public');
    
        // Store thumbnail if exists
        $thumbnailPath = null;
        if ($request->hasFile('thumbnail')) {
            $thumbnailFile = $request->file('thumbnail');
            $thumbnailPath = $thumbnailFile->store('thumbnails', 'public');
            Log::info('🖼 Thumbnail uploaded: ' . $thumbnailPath);
        } else {
            $thumbnailFilename = Str::random(20) . '.jpg';
            $thumbnailPath = 'thumbnails/' . $thumbnailFilename;
            
            // Получаем длительность видео
            $ffmpegVideo = FFMpeg::fromDisk('public')->open($videoPath);
            $duration = $ffmpegVideo->getFFProbe()
                ->format(Storage::disk('public')->path($videoPath))
                ->get('duration'); // в секундах (float)
            
            // Выбираем случайную секунду между 10% и 20%
            $start = $duration * 0.10;
            $end = $duration * 0.20;
            $randomSecond = mt_rand((int) $start, (int) $end);
            
            $ffmpegVideo
                ->getFrameFromSeconds($randomSecond)
                ->export()
                ->toDisk('public')
                ->save($thumbnailPath);
            
            Log::info("🎬 Сгенерирован thumbnail на {$randomSecond} сек.");
            
        }
    
        // Save to database
        $video = Video::create([
            'user_id' => auth()->id(),
            'title' => $validated['title'],
            'description' => $validated['description'] ?? null,
            'video_path' => $videoPath,
            'thumbnail_path' => $thumbnailPath,
        ]);
    
        return response()->json([
            'message' => '✅ Video uploaded successfully.',
            'video' => [
                'id' => $video->id,
                'title' => $video->title,
                'description' => $video->description,
                'video_url' => Storage::url($videoPath),
                'thumbnail_url' => $thumbnailPath ? asset('storage/' . $thumbnailPath) : null,
            ],
        ], 201);
    }
    
    
    


    /**
     * Display the specified resource.
     */
    public function show(string $id, Request $request)
    {
        $video = Video::with(['likes', 'comments.user'])->findOrFail($id);
        Auth::shouldUse('sanctum'); // <- ensures correct guard
        return new VideoResource($video);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
    public function search(Request $request)
    {
        $query = $request->input('q');
        $videos = Video::where('title','LIKE',"%{$query}")
            ->orWhere('description','LIKE',"%{$query}")
            ->get();
        return VideoResource::collection($videos);
    }
    public function liked()
    {
        $user = auth()->user();
        $videos =  $user->likedVideos()->latest()->get();
        return VideoResource::collection($videos);
    }
}
