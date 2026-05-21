export default function OpenTradesTable({ rows }: { rows: any[] }) {
  return (
    <div className="rounded-2xl border overflow-auto">
      <table className="w-full text-sm">
        <thead className="bg-gray-50">
          <tr>
            <th className="p-3 text-left">Ticket</th>
            <th className="p-3 text-left">Symbol</th>
            <th className="p-3 text-left">Side</th>
            <th className="p-3 text-left">Lots</th>
            <th className="p-3 text-left">Profit</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.ticket} className="border-t">
              <td className="p-3">{row.ticket}</td>
              <td className="p-3">{row.symbol}</td>
              <td className="p-3">{row.side}</td>
              <td className="p-3">{row.lots}</td>
              <td className="p-3">{row.profit}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
