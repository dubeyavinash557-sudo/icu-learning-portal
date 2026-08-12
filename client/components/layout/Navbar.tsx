import Link from "next/link";

export default function Navbar() {
  return (
    <header className="border-b bg-white">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        
        {/* Logo */}
        <Link
          href="/"
          className="text-2xl font-bold text-blue-700"
        >
          ICU Learning Portal
        </Link>

        {/* Navigation */}
        <ul className="flex items-center gap-8 text-gray-700 font-medium">
          <li>
            <Link
              href="/"
              className="transition hover:text-blue-700"
            >
              Home
            </Link>
          </li>

          <li>
            <Link
              href="/courses"
              className="transition hover:text-blue-700"
            >
              Courses
            </Link>
          </li>

          <li>
            <Link
              href="/notes"
              className="transition hover:text-blue-700"
            >
              Notes
            </Link>
          </li>

          <li>
            <Link
              href="/blog"
              className="transition hover:text-blue-700"
            >
              Blog
            </Link>
          </li>

          <li>
            <Link
              href="/contact"
              className="transition hover:text-blue-700"
            >
              Contact
            </Link>
          </li>

          {/* Login */}
          <li>
            <Link
              href="/login"
              className="inline-block rounded-lg bg-blue-700 px-5 py-2 font-semibold text-white transition hover:bg-blue-800"
            >
              Login
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}