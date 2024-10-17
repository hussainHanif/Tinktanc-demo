<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Traits\ApiResponseTrait;
use Exception;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    use ApiResponseTrait;
    public function index() {
        try {
            $products = Product::all();
            return $this->successResponse($products, 'Products fetched successfully');
        } catch (Exception $e) {
            return $this->errorResponse($e->getMessage(), 500);
        }
    }
    
    public function store(Request $request) {
        try {
            $request->validate([
                'name' => 'required|string|max:255',
                'price' => 'required|numeric|min:0',
                'stock' => 'required|integer',
                'category_id' => 'required|exists:categories,id'
            ]);
        
            $product = Product::create($request->all());
            return $this->successResponse($product, 'Product created successfully');
        } catch (Exception $e) {
            return $this->errorResponse($e->getMessage(), 500);
        }
    }
    
    public function update(Request $request, Product $product) {
        try {
            $product->update($request->all());
            return $this->successResponse($product, 'Product updated successfully');
        } catch (Exception $e) {
            return $this->errorResponse($e->getMessage(), 500);
        }
    }
    
    public function destroy(Product $product) {
        try {
            $product->delete();
            return $this->successResponse($product, 'Product deleted successfully');
        } catch (Exception $e) {
            return $this->errorResponse($e->getMessage(), 500);
        }
    }
    
}
