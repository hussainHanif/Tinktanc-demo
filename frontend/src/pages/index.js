import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../store/productSlice';
import { fetchCartItems } from '../store/cartSlice';

export default function Home() {
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    // If no token is found, redirect to the login page
    if (!token) {
      router.push('/login');
    } else {
      // Redirect based on the user's role
      if (user && user.role === 'admin') {
        dispatch(fetchProducts(token));
        router.push('/products');
      } else if (user && user.role === 'customer') {
        dispatch(fetchCartItems(token));
        router.push('/cart');
      }
    }
  }, [user, token, router, dispatch]);

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <h1 className="text-3xl font-bold">Redirecting...</h1>
    </div>
  );
}
