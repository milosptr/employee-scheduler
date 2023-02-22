<?php

use App\Http\Controllers\EmployeeCheckinController;
use App\Http\Controllers\EmployeeController;
use App\Http\Controllers\ScheduleController;
use App\Models\EmployeeCheckin;
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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// Employees
Route::get('employees', [EmployeeController::class, 'index']);
Route::post('employees', [EmployeeController::class, 'store']);
Route::post('employees/{id}', [EmployeeController::class, 'update']);
Route::delete('employees/{id}', [EmployeeController::class, 'destroy']);

// Schedules
Route::get('schedules', [ScheduleController::class, 'index']);
Route::get('schedules/timeline', [ScheduleController::class, 'timeline']);
Route::post('schedules', [ScheduleController::class, 'store']);
Route::post('schedules/pdf', [ScheduleController::class, 'pdf']);
Route::post('schedules/reorder', [ScheduleController::class, 'reorder']);
Route::post('schedules/{id}', [ScheduleController::class, 'update']);
Route::delete('schedules/{id}', [ScheduleController::class, 'destroy']);

// Checkin
Route::get('employeesCheckin', [EmployeeController::class, 'indexWithCheckin']);
Route::post('employees/{id}/checkin', [EmployeeCheckinController::class, 'checkin']);
