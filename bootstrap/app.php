<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Laravel\Sanctum\Http\Middleware\EnsureFrontendRequestsAreStateful;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        api: __DIR__.'/../routes/api.php',
        web: __DIR__.'/../routes/web.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware): void {
        //
        $middleware->api(prepend: [
            EnsureFrontendRequestsAreStateful::class,
        ]);

        // CSRF保護の除外設定
        $middleware->validateCsrfTokens(except: [
            'api/*', // 'api/'で始まるすべてのルートをCSRF保護から除外
            'login',  // ログイン・ログアウトも念のため除外
            'logout',
            'operator/login',
            'operator/logout'
        ]);
    })
    ->withExceptions(function (Exceptions $exceptions): void {
        //
    })->create();
