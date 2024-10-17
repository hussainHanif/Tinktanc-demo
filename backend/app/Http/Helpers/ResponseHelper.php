<?php

if (!function_exists('apiResponse')) {
    /**
     * Generate a standard API response
     *
     * @param mixed $data
     * @param string $message
     * @param int $statusCode
     * @return \Illuminate\Http\JsonResponse
     */
    function apiResponse($data = null, $message = 'Success', $statusCode = 200)
    {
        return response()->json([
            'status' => $statusCode === 200 ? 'success' : 'error',
            'message' => $message,
            'data' => $data,
        ], $statusCode);
    }
}

if (!function_exists('apiErrorResponse')) {
    /**
     * Generate a standard API error response
     *
     * @param string $message
     * @param int $statusCode
     * @return \Illuminate\Http\JsonResponse
     */
    function apiErrorResponse($message = 'An error occurred', $statusCode = 500)
    {
        return response()->json([
            'status' => 'error',
            'message' => $message,
        ], $statusCode);
    }
}
