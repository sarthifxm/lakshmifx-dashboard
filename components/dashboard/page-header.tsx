import Link from "next/link";

const tabs = [
  {
    href: "/dashboard",
    label: "Overview",
  },
  {
    href: "/dashboard/daily-summary",
    label: "Daily Summary",
  },
  {
    href: "/dashboard/myfxbook-test",
    label: "Myfxbook Test",
  },
];

export function PageHeader() {
  return (
    <div className="mb-8">
      <h1 className="text-3xl font-bold mb-4">
        LAKSHMIFX Dashboard
      </h1>

      <div className="flex gap-4 flex-wrap">
        {tabs.map((tab) => (
          <Link
            key={tab.href}
            href={tab.href as any}
            className="rounded-full border border-slate-300 px-4 py-2 text-sm font-medium hover:bg-slate-100"
          >
            {tab.label}
          </Link>
        ))}
      </div>
    </div>
  );
}