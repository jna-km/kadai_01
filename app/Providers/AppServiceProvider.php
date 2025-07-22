<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Repositories\Contracts\ReservationRepositoryInterface;
use App\Repositories\Eloquent\ReservationRepository;
use App\Repositories\Contracts\HolidayRepositoryInterface;
use App\Repositories\Eloquent\HolidayRepository;
use App\Repositories\Contracts\NoticeRepositoryInterface;
use App\Repositories\Eloquent\NoticeRepository;
use App\Repositories\Contracts\OperatorRepositoryInterface;
use App\Repositories\Eloquent\OperatorRepository;
use App\Repositories\Contracts\ReservationTokenRepositoryInterface;
use App\Repositories\Eloquent\ReservationTokenRepository;
use App\Repositories\Contracts\ServiceRepositoryInterface;
use App\Repositories\Eloquent\ServiceRepository;
use App\Repositories\Contracts\TimeSlotRepositoryInterface;
use App\Repositories\Eloquent\TimeSlotRepository;
use App\Repositories\Contracts\UserRepositoryInterface;
use App\Repositories\Eloquent\UserRepository;
use App\Repositories\Contracts\WorkingHourRepositoryInterface;
use App\Repositories\Eloquent\WorkingHourRepository;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->bind(ReservationRepositoryInterface::class,ReservationRepository::class);
        $this->app->bind(HolidayRepositoryInterface::class, HolidayRepository::class);
        $this->app->bind(NoticeRepositoryInterface::class, NoticeRepository::class);
        $this->app->bind(OperatorRepositoryInterface::class, OperatorRepository::class);
        $this->app->bind(ReservationTokenRepositoryInterface::class, ReservationTokenRepository::class);
        $this->app->bind(ServiceRepositoryInterface::class, ServiceRepository::class);
        $this->app->bind(TimeSlotRepositoryInterface::class, TimeSlotRepository::class);
        $this->app->bind(UserRepositoryInterface::class, UserRepository::class);
        $this->app->bind(WorkingHourRepositoryInterface::class, WorkingHourRepository::class);
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
    }
}
