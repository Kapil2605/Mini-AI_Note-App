// components/Header.tsx
import Link from 'next/link';

const Header = () => {
  return (
    <header className="bg-blue-600 text-white p-4 shadow-md">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">
          <Link href="/">📝AI Notes App</Link>
        </h1>
        <nav className="space-x-4">

          <Link href="/notes/create" className="hover:underline">
            Create Note
          </Link>
          <Link href="/" className="hover:underline text-red-400">
            Logout
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
