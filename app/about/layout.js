import Link from "next/link";

export default function AboutLayout({ children }) {
  return (
    <div>
      <nav className="mt-5">
        <ul className="flex gap-5">
          <li>
            <Link href="/about/mission">Mission</Link>
          </li>
          <li>
            <Link href="/about/vision">Vision</Link>
          </li>
        </ul>
      </nav>
      {children}
    </div>
  );
}
