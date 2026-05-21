"use client";

export default function SyncControls() {
  const runSync = async () => {
    await fetch("/api/sync", { method: "POST" });
    alert("Sync started");
  };

  const downloadReport = async () => {
    window.open("/api/report");
  };

  return (
    <div>
      <h2>Sync Controls</h2>

      <button onClick={runSync}>Re-run Sync</button>
      <button onClick={downloadReport}>Download Report</button>
    </div>
  );
}