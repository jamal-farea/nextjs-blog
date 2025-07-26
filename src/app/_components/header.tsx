import Link from "next/link";

const Header = () => {
  return (
    <header className="mb-20 mt-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <h2 className="text-2xl md:text-4xl font-bold tracking-tight md:tracking-tighter leading-tight">
          <Link href="/" className="hover:underline">
            Blog
          </Link>
          .
        </h2>
        <nav className="mt-4 md:mt-0">
          <ul className="flex space-x-8">
            <li>
              <Link href="/" className="hover:underline text-gray-600 hover:text-black transition-colors">
                Home
              </Link>
            </li>
            <li>
              <Link href="/team" className="hover:underline text-gray-600 hover:text-black transition-colors">
                Team
              </Link>
            </li>
            <li>
              <Link href="/events" className="hover:underline text-gray-600 hover:text-black transition-colors">
                Events
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
