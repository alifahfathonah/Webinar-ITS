<?php

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


Route::domain('webinar.'.Config::get('app.base_domain'))->group(function () {
    Route::get('/', 'UserController@checkLoggingIn');
    // Route::get('/tes', 'BookingController@tes')->name('booking.list');
    
    Route::get('login','UserController@login')->name('login');
    Route::get('logout','UserController@logout')->name('logout');

    Route::get('/booking/view/{id}', 'BookingController@viewBooking')->name('booking.view');
    Route::group(['middleware' => 'auth'], function () {
        Route::get('/home', 'HomeController@index')->name('home');


        Route::get('/booking/new', 'BookingController@viewNewBooking')->name('booking.new');
        Route::post('/booking/new', 'BookingController@saveNewBooking')->name('booking.new');
        Route::get('/booking/edit/{id}', 'BookingController@viewEditBooking')->name('booking.edit');
        Route::post('/booking/edit', 'BookingController@saveEditBooking')->name('booking.edit');
        Route::post('/booking/verify', 'BookingController@verifyBooking')->name('booking.verify');
    });
    Route::get('/booking/waitinglist', 'BookingController@waitingListBooking')->name('booking.list');
    Route::get('/booking/list', 'BookingController@listBooking')->name('booking.list');
    Route::delete('/booking/delete/{id}', 'BookingController@deleteBooking')->name('booking.delete');
    
    // Admin
    Route::get('/admin/booking/list', 'BookingController@adminListBooking')->name('admin.list');
    Route::get('/admin/booking/aprove', 'BookingController@aproveBooking')->name('admin.aprove');
    Route::get('/admin/booking/view/{id}', 'BookingController@adminViewBooking')->name('admin.view');
});

// Route::get('/booking/view/{id}', 'BookingController@viewBooking')->name('booking.view');
// Route::get('/booking/waitinglist', 'BookingController@waitingListBooking')->name('booking.list');
// Auth::routes();
/* 
    Route::get('auth/check', function () {
        $ret['test'] = session('test');
        $ret['check'] = auth()->check();
        $ret['id'] = auth()->id();
        $ret['user'] = auth()->user();
        $ret['isset'] = (null !== session('id_token'));
        $ret['id_token'] = session('id_token');
        var_dump($ret);
    });
 */