export function StatCard({
  label,
  value,
  tone = "default",
  helper,
}: {
  label: string;
  value: string;
  tone?: "default" | "success" | "danger";
  helper?: string;
}) {
  const toneMap = {
    default: "text-slate-900",
    success: "text-emerald-600",
    danger: "text-rose-600",
  };

  return (
    <article className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      <p className="text-sm text-slate-500">{label}</p>
      <p className={`mt-3 text-3xl font-semibold tracking-tight ${toneMap[tone]}`}>
        {value}
      </p>
      {helper ? <p className="mt-2 text-xs text-slate-500">{helper}</p> : null}
    </article>
  );
}
