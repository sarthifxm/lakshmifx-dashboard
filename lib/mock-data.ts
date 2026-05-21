export type TradingAccount = {
  id: string;
  broker: string;
  accountNumber: string;
  platform: "MT5" | "Myfxbook";
  status: "Active" | "Paused" | "Review";
  currency: string;
  balance: number;
  equity: number;
  gainPct: number;
  drawdownPct: number;
  openTrades: number;
  lastSync: string;
};

export type TradeRow = {
  id: string;
  symbol: string;
  side: "Buy" | "Sell";
  lot: number;
  openPrice: number;
  currentPrice: number;
  profit: number;
  status: "Open" | "Closed";
  openedAt: string;
  account: string;
};

export type EquityPoint = {
  day: string;
  equity: number;
  balance: number;
};

export const accounts: TradingAccount[] = [
  {
    id: "acc_1",
    broker: "IC Markets",
    accountNumber: "8842101",
    platform: "MT5",
    status: "Active",
    currency: "USD",
    balance: 24850,
    equity: 25540,
    gainPct: 12.8,
    drawdownPct: 4.2,
    openTrades: 6,
    lastSync: "2026-05-19 18:40",
  },
  {
    id: "acc_2",
    broker: "Pepperstone",
    accountNumber: "1048229",
    platform: "Myfxbook",
    status: "Active",
    currency: "USD",
    balance: 15200,
    equity: 14910,
    gainPct: 7.6,
    drawdownPct: 5.1,
    openTrades: 3,
    lastSync: "2026-05-19 18:39",
  },
  {
    id: "acc_3",
    broker: "XM Global",
    accountNumber: "7743209",
    platform: "MT5",
    status: "Review",
    currency: "USD",
    balance: 9800,
    equity: 9565,
    gainPct: 3.1,
    drawdownPct: 6.8,
    openTrades: 2,
    lastSync: "2026-05-19 18:31",
  },
];

export const trades: TradeRow[] = [
  {
    id: "tr_1",
    symbol: "XAUUSD",
    side: "Buy",
    lot: 0.8,
    openPrice: 2361.2,
    currentPrice: 2368.4,
    profit: 576,
    status: "Open",
    openedAt: "2026-05-19 12:30",
    account: "8842101",
  },
  {
    id: "tr_2",
    symbol: "EURUSD",
    side: "Sell",
    lot: 1.2,
    openPrice: 1.0862,
    currentPrice: 1.0841,
    profit: 252,
    status: "Open",
    openedAt: "2026-05-19 09:10",
    account: "1048229",
  },
  {
    id: "tr_3",
    symbol: "GBPJPY",
    side: "Buy",
    lot: 0.5,
    openPrice: 201.44,
    currentPrice: 200.98,
    profit: -230,
    status: "Open",
    openedAt: "2026-05-19 14:05",
    account: "7743209",
  },
  {
    id: "tr_4",
    symbol: "BTCUSD",
    side: "Buy",
    lot: 0.15,
    openPrice: 62120,
    currentPrice: 62880,
    profit: 114,
    status: "Closed",
    openedAt: "2026-05-18 16:20",
    account: "8842101",
  },
];

export const equitySeries: EquityPoint[] = [
  { day: "Mon", equity: 22850, balance: 22400 },
  { day: "Tue", equity: 23100, balance: 22680 },
  { day: "Wed", equity: 23620, balance: 23150 },
  { day: "Thu", equity: 24110, balance: 23740 },
  { day: "Fri", equity: 24680, balance: 24120 },
  { day: "Sat", equity: 24920, balance: 24540 },
  { day: "Sun", equity: 25540, balance: 24850 },
];
