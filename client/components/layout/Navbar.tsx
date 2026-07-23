import Link from "next/link";
export default function Navbar() {
  return (
    <header className="bg-white shadow-md">
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        <h1 className="text-2xl font-bold text-blue-700">
          ICU Learning Portal
        </h1>

        <ul className="flex gap-8 text-gray-700 font-medium">

  <li>
    <Link href="/">Home</Link>
  </li>

  <li>
    <Link href="/courses">Courses</Link>
  </li>

  <li>
    <Link href="/">Notes</Link>
  </li>

  <li>
    <Link href="/">Blog</Link>
  </li>

  <li>
    <Link href="/">Contact</Link>
  </li>

</ul>

        <button className="bg-blue-700 text-white px-5 py-2 rounded-lg">
          Login
        </button>
      </nav>
    </header>
  );
}