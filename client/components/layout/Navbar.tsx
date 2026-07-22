export default function Navbar() {
  return (
    <header className="bg-white shadow-md">
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        <h1 className="text-2xl font-bold text-blue-700">
          ICU Learning Portal
        </h1>

        <ul className="flex gap-8 text-gray-700 font-medium">
          <li>Home</li>
          <li>Courses</li>
          <li>Notes</li>
          <li>Blog</li>
          <li>Contact</li>
        </ul>

        <button className="bg-blue-700 text-white px-5 py-2 rounded-lg">
          Login
        </button>
      </nav>
    </header>
  );
}