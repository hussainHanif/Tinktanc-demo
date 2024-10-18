import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../store/authSlice';
import { useRouter } from 'next/router';

export default function Logout() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const router = useRouter();

  useEffect(() => {
    if (token) {
      // Dispatch logout and handle the redirection after it completes
      dispatch(logoutUser(token)).then(() => {
        router.push('/login');
      });
    } else {
      router.push('/login'); // In case token is already null, just redirect
    }
  }, [token, dispatch, router]);

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <h1 className="text-3xl font-bold">Logging out...</h1>
    </div>
  );
}
