<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\CommentController;
use App\Http\Controllers\Api\LikeController;
use App\Http\Controllers\Api\VideoController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::post('/register', [AuthController::class, 'store']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');


Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');
Route::get('/videos/search', [VideoController::class, 'search']);

Route::get('/videos/liked',[VideoController::class,'liked'])->middleware('auth:sanctum');
Route::apiResource('videos', VideoController::class)->only(['index', 'show']);
Route::apiResource('videos', VideoController::class)->only(['store'])->middleware('auth:sanctum');

Route::apiResource('videos.comments', CommentController::class)
    ->only(['store', 'update', 'destroy'])
    ->middleware('auth:sanctum');

Route::post('/videos/{video}/like', [LikeController::class, 'toggle'])
    ->middleware('auth:sanctum');
