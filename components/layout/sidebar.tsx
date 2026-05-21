"use client";

import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-black text-white min-h-screen p-6">
      <h2 className="text-2xl font-bold mb-8">
        LAKSHMIFX
      </h2>

      <nav className="space-y-4">
        <Link
          href="/dashboard"
          className="block hover:text-gray-300"
        >
          Dashboard
        </Link>

        <Link
          href="/dashboard/accounts"
          className="block hover:text-gray-300"
        >
          Accounts
        </Link>

        <Link
          href="/dashboard/daily-summary"
          className="block hover:text-gray-300"
        >
          Daily Summary
        </Link>
      </nav>
    </aside>
  );
}