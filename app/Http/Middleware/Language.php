<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;

class Language
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {
        $lang = substr($request->header('Content-Language', 'en-US'), 0, 2);
        $lang = in_array($lang, ['es', 'en']) ? $lang : 'en';
        App::setLocale($lang);
        return $next($request);
    }
}
