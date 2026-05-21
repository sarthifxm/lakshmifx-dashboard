"use client";

import { useEffect, useState } from "react";

export default function Logs() {
  const [logs, setLogs] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/logs")
      .then((res) => res.json())
      .then((data) => setLogs(data.data || []));
  }, []);

  return (
    <div>
      <h2>Sync Logs</h2>

      {logs.length === 0 ? (
        <p>No logs found</p>
      ) : (
        logs.map((log, i) => (
          <div key={i}>
            {log.message} - {log.time}
          </div>
        ))
      )}
    </div>
  );
}