import Link from 'next/link';

export default function AdminHeader() {
  return (
    <header className="bg-indigo-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">Admin Dashboard</h1>
        <nav className="flex space-x-4">
          <Link href="/admin/products">
            Manage Products
          </Link>
          <Link href="/admin/orders">
            Manage Orders
          </Link>
          <Link href="/logout">
            Logout
          </Link>
        </nav>
      </div>
    </header>
  );
}
