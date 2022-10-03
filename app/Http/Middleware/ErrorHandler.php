<?php

namespace App\Http\Middleware;

use App\Exceptions\CustomException;
use Closure;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Http\Exceptions\ThrottleRequestsException;
use Illuminate\Http\Request;
use InvalidArgumentException;

class ErrorHandler
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
        $response = $next($request);

        if ($response->exception instanceof CustomException) {
            $e = $response->exception;
            return response()->json([
                'message' => $e->getMessage(),
                'persist' => $e->persist,
                'requiresAction' => $e->requiresAction], 400);
        } elseif ($response->exception instanceof InvalidArgumentException) {
            return response()->json(['message' => $response->exception->getMessage()], 404);
        } elseif ($response->exception instanceof ThrottleRequestsException) {
            $code = $response->exception->getStatusCode();
            $headers = $response->exception->getHeaders();
            return response()->json(['message' => $response->exception->getMessage()], $code, $headers);
        } elseif (!empty($response->exception)) {
            return response()->json(['message' => $response->exception->getMessage()], 500);
        }
        return $response;
    }
}
