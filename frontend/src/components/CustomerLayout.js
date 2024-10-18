// components/CustomerLayout.js
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import ErrorAlert from './AlertComponent';
import CustomerHeader from './CustomerHeader';
import { useRouter } from 'next/router';
import AlertComponent from './AlertComponent';

export default function CustomerLayout({ children }) {
  const router = useRouter();
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (user && user.role === 'admin') {
      // If the user is a admin, redirect them to the products page
      router.push('/admin/products');
    }
  }, [user, router]);

  return (
    <div className="min-h-screen bg-gray-100">
      <CustomerHeader/>
      <main className="container mx-auto py-8">
        {children}
      </main>
      <AlertComponent /> {/* Display error */}
    </div>
  );
}
