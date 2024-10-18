import Link from 'next/link';

export default function CustomerHeader() {
  return (
    <header className="bg-green-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">Customer Dashboard</h1>
        <nav className="flex space-x-4">
        <Link href="/products">
            Shop
          </Link>
        <Link href="/cart">
            Cart
          </Link>
          <Link href="/orders">
            My Orders
          </Link>
          <Link href="/logout">
            Logout
          </Link>
        </nav>
      </div>
    </header>
  );
}
