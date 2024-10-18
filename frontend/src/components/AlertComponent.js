// components/AlertComponent.js
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clearMessages } from '../store/alertSlice';

export default function AlertComponent() {
  const dispatch = useDispatch();
  const successMessage = useSelector((state) => state.alert.successMessage);
  const errorMessage = useSelector((state) => state.alert.errorMessage);

  // Automatically clear alerts after 2 seconds
  useEffect(() => {
    if (successMessage || errorMessage) {
      const timer = setTimeout(() => {
        dispatch(clearMessages());
      }, 2000);
      return () => clearTimeout(timer); // Cleanup timeout on component unmount
    }
  }, [successMessage, errorMessage, dispatch]);

  if (!successMessage && !errorMessage) return null;

  return (
    <div className="fixed top-4 right-4 z-50">
      {errorMessage && (
        <div className="bg-red-500 text-white px-4 py-2 mb-2 rounded-lg shadow-lg">
          <p>{errorMessage}</p>
        </div>
      )}
      {successMessage && (
        <div className="bg-green-500 text-white px-4 py-2 mb-2 rounded-lg shadow-lg">
          <p>{successMessage}</p>
        </div>
      )}
    </div>
  );
}
