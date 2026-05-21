export async function getDashboardData() {
  const response = await fetch("http://localhost:3000/api/myfxbook/accounts", {
    cache: "no-store",
  });

  return response.json();
}