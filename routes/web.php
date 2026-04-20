<?php

use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Route;

Route::get('/', function(){
    return inertia('Home/Index');
});

Route::get('/login', [AuthController::class, 'login']);