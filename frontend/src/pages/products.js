import CustomerLayout from '../components/CustomerLayout';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts } from '../store/productSlice';
import { addToCart } from '../store/cartSlice'; // Import addToCart action
import { useEffect, useState } from 'react';

export default function Products() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const products = useSelector((state) => state.product.products);

  // const [alert, setAlert] = useState(null); // State for success alert

  useEffect(() => {
    if (token) {
      dispatch(fetchProducts(token));
    }
  }, [token, dispatch]);

  const handleAddToCart = (productId) => {
    dispatch(addToCart(productId, 1, token));
    // setAlert('Product added to cart!'); // Set success alert
    // setTimeout(() => setAlert(null), 2000); // Hide alert after 2 seconds
  };

  return (
    <CustomerLayout>
      <h1 className="text-3xl font-bold mb-8">Products</h1>

      {/* {alert && (
        <div className="bg-green-100 text-green-700 p-4 rounded-lg mb-4">
          {alert}
        </div>
      )} */}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products?.length ? products.map((product) => (
          <div key={product.id} className="bg-white p-4 shadow-md rounded-lg">
            <h2 className="text-lg font-bold">{product.name}</h2>
            <p>{product.description}</p>
            <p className="text-indigo-600">${product.price}</p>
            <button
              className="mt-4 bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-500"
              onClick={() => handleAddToCart(product.id)} // Add product to cart
            >
              Add to Cart
            </button>
          </div>
        )) : 'N/A'}
      </div>
    </CustomerLayout>
  );
}
