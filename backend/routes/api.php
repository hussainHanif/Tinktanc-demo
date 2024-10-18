<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\ProductController;
use Illuminate\Support\Facades\Route;

// Authentication Routes
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login'])->name('login');
Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');


// Customer Routes (Accessible by authenticated users)
Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('/products', [ProductController::class, 'index']);
    Route::resource('carts', CartController::class);
    Route::resource('orders', OrderController::class);
});


// Admin Routes (Only accessible by admins)
Route::middleware(['auth:sanctum', 'admin'])->group(function () {
    Route::get('/getAllCustomersOrder', [OrderController::class, 'getAllCustomersOrder']);
    Route::post('/products', [ProductController::class, 'store']);
    Route::put('/products/{product}', [ProductController::class, 'update']);
    Route::delete('/products/{product}', [ProductController::class, 'destroy']);
    Route::resource('categories', CategoryController::class);
});
