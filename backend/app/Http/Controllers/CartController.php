<?php

namespace App\Http\Controllers;

use App\Traits\ApiResponseTrait;
use Illuminate\Http\Request;
use App\Models\Cart;
use App\Models\Product;
use Exception;

class CartController extends Controller
{
    use ApiResponseTrait;
    // Display all cart items for the authenticated user
    public function index()
    {
        try {
            $user = auth()->user();
            $cartItems = Cart::where('user_id', $user->id)->get();
            return $this->successResponse($cartItems, 'Cart items fetched successfully');
        } catch (Exception $e) {
            return $this->errorResponse($e->getMessage(), 500);
        }
    }

    // Add a product to the cart
    public function store(Request $request)
    {
        try {
            $request->validate([
                'product_id' => 'required|exists:products,id',
                'quantity' => 'required|integer|min:1'
            ]);

            $product = Product::find($request->product_id);
            $totalPrice = $product->price * $request->quantity;

            $cartItem = Cart::create([
                'user_id' => auth()->id(),
                'product_id' => $request->product_id,
                'quantity' => $request->quantity,
                'total_price' => $totalPrice
            ]);

            return $this->successResponse(['message' => 'Product added to cart', 'cartItem' => $cartItem], 201);
        } catch (Exception $e) {
            return $this->errorResponse($e->getMessage(), 500);
        }
    }

    // Update the quantity of a cart item
    public function update(Request $request, Cart $cart)
    {
        try {
            $request->validate([
                'quantity' => 'required|integer|min:1'
            ]);

            if ($cart->user_id != auth()->id()) {
                return $this->errorResponse('Unauthorized', 403);
            }

            $product = Product::find($cart->product_id);
            $cart->quantity = $request->quantity;
            $cart->total_price = $product->price * $request->quantity;
            $cart->save();

            return $this->successResponse(['message' => 'Cart updated successfully', 'cart' => $cart], 200);
        } catch (Exception $e) {
            return $this->errorResponse($e->getMessage(), 500);
        }
    }

    // Remove a product from the cart
    public function destroy(Cart $cart)
    {
        try {
            if ($cart->user_id != auth()->id()) {
                return $this->errorResponse('Unauthorized', 403);
            }

            $cart->delete();

            return $this->successResponse(['message' => 'Product removed from cart'], 200);
        } catch (Exception $e) {
            return $this->errorResponse($e->getMessage(), 500);
        }
    }
}
