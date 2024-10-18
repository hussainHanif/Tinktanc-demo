// components/AdminLayout.js
import React, { useEffect } from 'react';
import AdminHeader from './AdminHeader';
import AlertComponent from './AlertComponent';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';

export default function AdminLayout({ children }) {
  const router = useRouter();
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (user && user.role === 'customer') {
      // If the user is a customer, redirect them to the products page
      router.push('/products');
    }
  }, [user, router]);
  return (
    <div className="min-h-screen bg-gray-100">
    <AdminHeader/>
      <main className="container mx-auto py-8">
        {children}
      </main>
      <AlertComponent /> {/* Display error */}
    </div>
  );
}
