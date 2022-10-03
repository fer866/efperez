<?php

use App\Http\Controllers\API\ProfileController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::prefix('profile')->group(function() {
    Route::get('/getHistory', [ProfileController::class, 'getHistory']);
    Route::get('/getExperience', [ProfileController::class, 'getExperience']);
    Route::get('/getGithubRepos', [ProfileController::class, 'getGithubRepos']);
    Route::post('/sendComments', [ProfileController::class, 'sendComments']);
    Route::get('/{id}', [ProfileController::class, 'getCollectionById']);
    Route::post('/', [ProfileController::class, 'likeToCollection']);
});