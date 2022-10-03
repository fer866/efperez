<?php

use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/{any}', function () {
    // return view('welcome');
    if (App::environment('local')) {
        return File::get(public_path() . '/index.html');
    } else {
        return File::get(base_path() . '/../public_html/index.html');
    }
})->where('any', '^(?!api).*$');
