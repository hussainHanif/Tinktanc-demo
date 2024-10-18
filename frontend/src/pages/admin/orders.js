import AdminLayout from '../../components/AdminLayout';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAllCustomersOrder, updateOrderStatus } from '../../store/orderSlice'; // Import updateOrderStatus action
import { useEffect, useState } from 'react';

export default function AdminOrders() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const orders = useSelector((state) => state.order.orders);
  const error = useSelector((state) => state.order.error);
  const [selectedStatus, setSelectedStatus] = useState({});

  useEffect(() => {
    if (token) {
      dispatch(fetchAllCustomersOrder(token)); // Fetch all orders for the admin
    }
  }, [dispatch, token]);

  // Handle status change
  const handleStatusChange = (orderId, newStatus) => {
    setSelectedStatus((prevState) => ({
      ...prevState,
      [orderId]: newStatus,
    }));
  };

  // Submit updated status to the backend
  const handleUpdateStatus = (orderId) => {
    const newStatus = selectedStatus[orderId];
    if (newStatus) {
      dispatch(updateOrderStatus(orderId, newStatus, token)); // Dispatch update order status action
    }
  };

  return (
    <AdminLayout>
      <h1 className="text-3xl font-bold mb-8">Processed Orders</h1>

      {error && <p className="text-red-500">{error}</p>}

      <div className="grid grid-cols-1 gap-6">
        {!orders.length ? (
          <p className="text-center">No orders found</p>
        ) : (
          orders.map((order) => (
            <div key={order.id} className="bg-white p-4 shadow-md rounded-lg">
              <h2 className="text-lg font-bold">Order #{order.id}</h2>
              <p>Customer: {order?.user?.name}</p>
              <p>Total Amount: ${order?.total_amount}</p>
              <ul className="mt-4">
                {order?.orderItems?.map((item) => (
                  <li key={item.id}>
                    {item?.product?.name} - {item?.quantity} pcs
                  </li>
                ))}
              </ul>

              <div className="mt-4">
                <label htmlFor={`status-${order.id}`} className="block font-medium">
                  Update Status:
                </label>
                <select
                  id={`status-${order.id}`}
                  value={selectedStatus[order.id] || order?.status}
                  onChange={(e) => handleStatusChange(order.id, e.target.value)}
                  className="mt-2 px-4 py-2 border rounded-lg"
                >
                  <option value="pending">Pending</option>
                  <option value="completed">Completed</option>
                  <option value="shipped">Shipped</option>
                  <option value="canceled">Canceled</option>
                </select>
                <button
                  onClick={() => handleUpdateStatus(order.id)}
                  className="ml-4 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-500"
                >
                  Update
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </AdminLayout>
  );
}
