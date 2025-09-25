<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SkillController;
use App\Http\Controllers\InstituteController;
use App\Http\Controllers\EventController;
use App\Http\Controllers\EventCategoryController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\EventSlotController;
use App\Models\Event;
use App\Models\Institute;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'auth' => [
            'user' => auth()->user(),
        ],
        'events' => Event::where('status', 'published')
                            ->with('institute')
                            ->latest()
                            ->take(6)
                            ->get(),
        'institutes' => Institute::latest()->take(5)->get(),
    ]);
});

Route::get('/dashboard', function () {
    $user = Auth::user();
    $stats = [
        'total' => $user->applications()->count(),
        'approved' => $user->applications()->where('status', 'approved')->count(),
        'pending' => $user->applications()->where('status', 'pending')->count(),
    ];
    $recentApplications = $user->applications()
                               ->with(['eventSlot.event'])
                               ->latest()
                               ->take(3)
                               ->get();
    return Inertia::render('Dashboard', [
        'stats' => $stats,
        'recentApplications' => $recentApplications,
    ]);
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::resource('skills', SkillController::class);
    Route::resource('institutes', InstituteController::class);
    Route::resource('events', EventController::class);
    Route::resource('event-categories', EventCategoryController::class);
    Route::resource('roles', RoleController::class);
    Route::resource('events.slots', EventSlotController::class);

    Route::get('/my-applications', [ApplicationController::class, 'myApplications'])
        ->name('applications.my');
    Route::post('/event-slots/{eventSlot}/apply', [ApplicationController::class, 'apply'])
        ->name('applications.apply');
    Route::delete('/applications/{application}', [ApplicationController::class, 'withdraw'])
        ->name('applications.withdraw');
    Route::get('/events/{event}/applications', [ApplicationController::class, 'eventApplications'])
        ->name('events.applications');
    Route::patch('/applications/{application}/approve', [ApplicationController::class, 'approve'])
        ->name('applications.approve');
    Route::patch('/applications/{application}/reject', [ApplicationController::class, 'reject'])
        ->name('applications.reject');
});

require __DIR__.'/auth.php';
