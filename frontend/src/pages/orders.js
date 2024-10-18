import CustomerLayout from '../components/CustomerLayout';
import { useSelector, useDispatch } from 'react-redux';
import { fetchOrders } from '../store/orderSlice';
import { useEffect } from 'react';

export default function Orders() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const orders = useSelector((state) => state.order.orders);
  const error = useSelector((state) => state.order.error);

  useEffect(() => {
    if (token) {
      dispatch(fetchOrders(token));
    }
  }, [dispatch, token]);

  return (
    <CustomerLayout>
      <h1 className="text-3xl font-bold text-center mb-8">Order History</h1>
      <div className="grid grid-cols-1 gap-6">
        {error && <p className="text-red-500">{error}</p>}
        {!orders.length ? (
          <p className="text-center">No orders found</p>
        ) : (
          orders.map((order) => (
            <div key={order?.id} className="bg-white p-4 shadow-md rounded-lg">
              <h2 className="text-lg font-bold">Order #{order?.id}</h2>
              <p>Status: {order?.status}</p>
              <p>Total Amount: ${order?.total_amount}</p>
              <ul className="mt-4">
                {order?.order_items?.map((item) => (
                  <li key={item?.id}>
                    {item?.product?.name}: {item?.quantity} pcs
                  </li>
                ))}
              </ul>
            </div>
          ))
        )}
      </div>
    </CustomerLayout>
  );
}
