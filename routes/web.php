<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserTasksController;
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

Route::get('/', function () {
    return view('welcome');
});



Route::post('/tasks/priority', [UserTasksController::class,'priority'])->name('tasks_priority');
Route::get('/tasks', [UserTasksController::class,'index'])->name('tasks');
Route::get('/tasks/all', [UserTasksController::class,'all'])->name('tasks_all');
Route::delete('/tasks/{task}', [UserTasksController::class,'destroy'])->name('tasks_destroy');
Route::post('/tasks', [UserTasksController::class,'store'])->name('tasks_store');
Route::put('/tasks/{task}', [UserTasksController::class,'update'])->name('tasks_update');



Auth::routes();

Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');
