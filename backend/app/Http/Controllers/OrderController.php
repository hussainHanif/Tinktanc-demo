<?php

namespace App\Http\Controllers;

use App\Traits\ApiResponseTrait;
use Illuminate\Http\Request;
use App\Models\Order;
use App\Models\Cart;
use App\Models\OrderItem;
use Exception;
use Illuminate\Support\Facades\DB;

class OrderController extends Controller
{
    use ApiResponseTrait;
    // Display all orders for the authenticated customer in descending order
    public function index()
    {
        try {
            $user = auth()->user();
            $orders = Order::where('user_id', $user->id)->with(['orderItems', 'orderItems.product', 'user'])->orderBy('created_at', 'desc')->get();
            return $this->successResponse($orders, 'Orders fetched successfully');
        } catch (Exception $e) {
            return $this->errorResponse($e->getMessage(), 500);
        }
    }

    // Place an order based on the user's cart items
    public function store(Request $request)
    {
        try {
            $user = auth()->user();
            $cartItems = Cart::where('user_id', $user->id)->get();

            if ($cartItems->isEmpty()) {
                return $this->errorResponse('Cart is empty', 400);
            }

            DB::beginTransaction();
            $totalAmount = $cartItems->sum('total_price');

            $order = Order::create([
                'user_id' => $user->id,
                'total_amount' => $totalAmount,
                'status' => 'pending'
            ]);

            foreach ($cartItems as $cartItem) {
                OrderItem::create([
                    'order_id' => $order->id,
                    'product_id' => $cartItem->product_id,
                    'quantity' => $cartItem->quantity,
                    'price' => $cartItem->total_price
                ]);
            }

            Cart::where('user_id', $user->id)->delete();

            DB::commit();
            return $this->successResponse(['message' => 'Order placed successfully', 'order' => $order], 201);
        } catch (Exception $e) {
            DB::rollBack();
            return $this->errorResponse('Order failed', 500, $e->getMessage());
        }
    }

    // Update the status of an order (Admin only)
    public function update(Request $request, Order $order)
    {
        try {
            $request->validate([
                'status' => 'required|string|in:pending,completed,shipped,canceled'
            ]);

            $order->status = $request->status;
            $order->save();

            return $this->successResponse(['message' => 'Order status updated successfully', 'order' => $order], 200);
        } catch (Exception $e) {
            return $this->errorResponse($e->getMessage(), 500);
        }
    }

    // Delete an order (optional, depending on your requirements)
    public function destroy(Order $order)
    {
        try {
            $order->delete();
            return $this->successResponse(['message' => 'Order deleted successfully'], 200);
        } catch (Exception $e) {
            return $this->errorResponse($e->getMessage(), 500);
        }
    }

    public function getAllCustomersOrder() {
        try {
            $orders = Order::with(['orderItems', 'orderItems.product', 'user'])->orderBy('created_at', 'desc')->get();
            return $this->successResponse($orders, 'Orders fetched successfully');
        } catch (Exception $e) {
            return $this->errorResponse($e->getMessage(), 500);
        }
    }
}
