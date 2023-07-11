<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UserManagement\PermissionController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    // return view('pages.dashboard');
    return redirect('/dashboard');
});

// Route::get('/dashboard', function () {
//     return view('dashboard');
// })->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {

    Route::get('/dashboard', function () {
        return view('pages.dashboard');
    })->middleware(['verified'])->name('dashboard');
    // Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    // Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    // Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');


    // User management route group
    // Route::middleware(['first'])->group(function () {
    //     Route::get('/user-management/', function () {
    //         Route::get('permission', [PermissionController::class, 'create'])->name('permission.create');
    //     });
    // });

    Route::prefix('/user-management/')->group(function () {
        // Route::get('permission', function () {
            // Matches The "/admin/users" URL
            Route::get('permission', [PermissionController::class, 'create'])->name('permission');
            Route::post('permission-form', [PermissionController::class, 'createForm'])->name('permission.form');
            Route::post('permission-get', [PermissionController::class, 'getPermissionData'])->name('permission.get');
        // });
    });
});

// require __DIR__.'/auth.php';
require __DIR__ . '/autentification.php';
