import CustomerLayout from '../components/CustomerLayout';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCartItems, updateCartItem, deleteCartItem, placeOrder } from '../store/cartSlice';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Cart() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const cartItems = useSelector((state) => state.cart.items);

  useEffect(() => {
    if (token) {
      dispatch(fetchCartItems(token));
    }
  }, [dispatch, token]);

  const handleIncrement = (item) => {
    dispatch(updateCartItem(item.id, item.quantity + 1,token));
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateCartItem(item.id, item.quantity - 1,token));
    }
  };

  const handleDelete = (id) => {
    dispatch(deleteCartItem( id,token));
  };
  const router = useRouter();
  const handlePlaceOrder = () => {
    dispatch(placeOrder(token)).then(() => {
      router.push('/orders');
    });
  };

  return (
    <CustomerLayout>
      <h1 className="text-3xl font-bold text-center mb-8">Shopping Cart</h1>
      <div className="bg-white shadow-md rounded-lg p-4">
        {!cartItems.length ? (
          <p className="text-center">Your cart is empty</p>
        ) : (
          cartItems.map((item) => (
            <div key={item.id} className="flex justify-between items-center mb-4">
              <div>
                <h2 className="text-lg font-semibold">{item?.product?.name}</h2>
                <p className="text-gray-700">Quantity: {item?.quantity}</p>
                <div className="flex space-x-2 mt-2">
                  <button
                    onClick={() => handleIncrement(item)}
                    className="bg-green-500 text-white px-2 py-1 rounded"
                  >
                    +
                  </button>
                  <button
                    disabled={item.quantity < 2}
                    onClick={() => handleDecrement(item)}
                    className={`bg-red-500 text-white px-2 py-1 rounded ${item.quantity < 2 ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    -
                  </button>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <p className="text-indigo-600 font-bold">${item?.total_price}</p>
                <button
                  onClick={() => handleDelete(item?.id)}
                  className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-500"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}

        {cartItems.length > 0 && (
          <div className="mt-8 text-center">
            <button
              onClick={handlePlaceOrder}
              className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-500"
            >
              Place Order
            </button>
          </div>
        )}
      </div>
    </CustomerLayout>
  );
}
