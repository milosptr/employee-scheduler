<?php

use App\Http\Controllers\EmployeeCheckinController;
use App\Http\Controllers\EmployeeController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ScheduleController;

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
    if (auth()->user()) {
        return redirect('/dashboard');
    }
    return view('auth.login');
});

Route::get('/dashboard', function () {
    return view('dashboard');
})->middleware(['auth'])->name('dashboard');

Route::get('/checkin', function () {
    return view('checkin');
})->name('checkin');

Route::group(['prefix' => 'public', 'middleware' => ['cors']], function () {
    Route::get('today', [ScheduleController::class, 'today']);
    Route::get('checkinsToday', [EmployeeCheckinController::class, 'checkinsToday']);
    Route::get('arrivals', [EmployeeCheckinController::class, 'arrivals']);
    Route::get('employees', [EmployeeController::class, 'index']);
});

require __DIR__.'/auth.php';
