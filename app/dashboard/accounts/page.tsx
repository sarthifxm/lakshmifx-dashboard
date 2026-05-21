'use client'

import { useEffect, useState } from 'react'
import KpiCard from '@/components/KpiCard'

export default function DashboardPage() {
  const [accounts, setAccounts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchAccounts()
  }, [])

  async function fetchAccounts() {
    try {
      setLoading(true)
      setError('')

      const response = await fetch(
        'http://localhost:3000/api/myfxbook/accounts',
        {
          method: 'GET',
          headers: {
            Accept: 'application/json',
          },
          cache: 'no-store',
        }
      )

      const text = await response.text()

      console.log('RAW RESPONSE:', text)

      let data: any = []

      try {
        data = JSON.parse(text)
      } catch (jsonError) {
        console.error('JSON PARSE ERROR:', jsonError)

        throw new Error(
          'API returned invalid JSON'
        )
      }

      console.log('PARSED DATA:', data)

      if (!response.ok) {
        throw new Error(
          data?.message ||
            'Unable to load accounts'
        )
      }

      if (Array.isArray(data)) {
        setAccounts(data)
      } else if (
        data &&
        Array.isArray(data.accounts)
      ) {
        setAccounts(data.accounts)
      } else {
        console.error(
          'UNKNOWN FORMAT:',
          data
        )

        setAccounts([])
      }
    } catch (err: any) {
      console.error('FETCH ERROR:', err)

      setError(
        err?.message ||
          'Unable to load accounts'
      )
    } finally {
      setLoading(false)
    }
  }

  const firstAccount = accounts[0]

  return (
    <main className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">
          Investor Dashboard
        </h1>

        <button
          onClick={fetchAccounts}
          className="bg-black text-white px-4 py-2 rounded-lg"
        >
          Refresh
        </button>
      </div>

      {loading && (
        <div className="p-4 border rounded-lg">
          Loading accounts...
        </div>
      )}

      {error && (
        <div className="p-4 border rounded-lg text-red-500">
          Status: {error}
        </div>
      )}

      {!loading &&
        !error &&
        accounts.length === 0 && (
          <div className="p-4 border rounded-lg">
            No accounts found
          </div>
        )}

      {firstAccount && (
        <>
          <section className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <KpiCard
              title="Balance"
              value={`$${Number(
                firstAccount.balance || 0
              ).toLocaleString()}`}
            />

            <KpiCard
              title="Equity"
              value={`$${Number(
                firstAccount.equity || 0
              ).toLocaleString()}`}
            />

            <KpiCard
              title="Gain"
              value={`${firstAccount.gain || 0}%`}
            />

            <KpiCard
              title="Drawdown"
              value={`${firstAccount.drawdown || 0}%`}
            />
          </section>

          <div className="space-y-4">
            {accounts.map((account) => (
              <div
                key={account.id}
                className="border rounded-xl p-4"
              >
                <h2 className="text-xl font-bold">
                  {account.name}
                </h2>

                <p>
                  Balance: $
                  {Number(
                    account.balance || 0
                  ).toLocaleString()}
                </p>

                <p>
                  Equity: $
                  {Number(
                    account.equity || 0
                  ).toLocaleString()}
                </p>

                <p>
                  Gain: {account.gain}%
                </p>

                <p>
                  Server:{' '}
                  {account.server?.name}
                </p>
              </div>
            ))}
          </div>
        </>
      )}
    </main>
  )
}