import AdminLayout from '../../components/AdminLayout';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts, addProduct, updateProduct, deleteProduct } from '../../store/productSlice'; // Import deleteProduct
import { fetchCategories } from '../../store/categorySlice'; // Import category fetching action
import { useEffect, useState } from 'react';

export default function AdminProducts() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const products = useSelector((state) => state.product.products);
  const categories = useSelector((state) => state.category.categories); // Access categories from state
  const [productForm, setProductForm] = useState({ id: null, name: '', description: '', price: '', stock: '', category_id: '' });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (token) {
      dispatch(fetchProducts(token));
      dispatch(fetchCategories(token)); // Fetch categories when component mounts
    }
  }, [dispatch, token]);

  // Handle form input changes
  const handleInputChange = (e) => {
    setProductForm({
      ...productForm,
      [e.target.name]: e.target.value,
    });
  };

  // Submit form for adding or updating a product
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      dispatch(updateProduct(productForm, token));
    } else {
      dispatch(addProduct(productForm, token));
    }
    setProductForm({ id: null, name: '', description: '', price: '', stock: '', category_id: '' }); // Reset form
    setIsEditing(false); // Reset editing state
  };

  // Pre-fill form for editing a product
  const handleEdit = (product) => {
    setProductForm(product);
    setIsEditing(true);
  };

  // Handle product deletion
  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this product?')) {
      dispatch(deleteProduct(id, token));
    }
  };

  return (
    <AdminLayout>
      <h1 className="text-3xl font-bold mb-8">Manage Products</h1>

      {/* Add or Edit Product Form */}
      <form onSubmit={handleSubmit} className="bg-white p-4 shadow-md rounded-lg mb-6">
        <h2 className="text-2xl font-bold mb-4">{isEditing ? 'Edit Product' : 'Add New Product'}</h2>
        <div className="mb-4">
          <label className="block text-gray-700">Product Name</label>
          <input
            type="text"
            name="name"
            value={productForm.name}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Description</label>
          <textarea
            name="description"
            value={productForm.description}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Price</label>
          <input
            type="number"
            name="price"
            value={productForm.price}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Stock</label>
          <input
            type="number"
            name="stock"
            value={productForm.stock}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Category</label>
          <select
            name="category_id"
            value={productForm.category_id}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
            required
          >
            <option value="">Select a Category</option>
            {categories.length && categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-500 transition duration-300"
        >
          {isEditing ? 'Update Product' : 'Add Product'}
        </button>
      </form>

      {/* Product Listing with Edit and Delete Buttons */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product.id} className="bg-white p-4 shadow-md rounded-lg">
            <h2 className="text-lg font-bold">{product.name}</h2>
            <p>{product.description}</p>
            <p className="text-indigo-600">${product.price}</p>
            <p>Category: {categories.length && categories.find((cat) => cat.id === product.category_id)?.name || 'N/A'}</p>
            <div className="flex justify-between mt-4">
              <button
                onClick={() => handleEdit(product)}
                className="bg-yellow-500 text-white py-2 px-4 rounded-lg hover:bg-yellow-400"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(product.id)}
                className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-400"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </AdminLayout>
  );
}
