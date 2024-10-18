<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Traits\ApiResponseTrait;
use Exception;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    use ApiResponseTrait;
    // Display all orders for the authenticated customer
    public function index()
    {
        try {
            $category = Category::all();
            return $this->successResponse($category, 'Orders fetched successfully');
        } catch (Exception $e) {
            return $this->errorResponse($e->getMessage(), 500);
        }
    }
}
