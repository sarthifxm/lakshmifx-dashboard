type Props = {
  title: string;
  value: string | number;
};

export default function KpiCard({ title, value }: Props) {
  return (
    <div className="bg-white rounded-xl shadow p-5 border">
      <p className="text-sm text-gray-500">{title}</p>

      <h2 className="text-2xl font-bold mt-2">
        {value}
      </h2>
    </div>
  );
}