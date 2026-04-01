"use client";

import { useMemo, useState } from "react";
import { BarChart3 } from "lucide-react";

export function MortgageCalculator({ compact = false }: { compact?: boolean }) {
  const [price, setPrice] = useState(12000000);
  const [deposit, setDeposit] = useState(20);
  const [rate, setRate] = useState(13);
  const [years, setYears] = useState(15);

  const summary = useMemo(() => {
    const loanAmount = price * (1 - deposit / 100);
    const monthlyRate = rate / 100 / 12;
    const months = years * 12;
    const monthlyPayment =
      monthlyRate === 0
        ? loanAmount / months
        : (loanAmount * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -months));

    return {
      loanAmount,
      monthlyPayment,
      depositAmount: price * (deposit / 100),
    };
  }, [deposit, price, rate, years]);

  const format = (value: number) =>
    new Intl.NumberFormat("en-KE", {
      style: "currency",
      currency: "KES",
      maximumFractionDigits: 0,
    }).format(Number.isFinite(value) ? value : 0);

  return (
    <div className={`rounded-[28px] border border-slate-200 bg-white shadow-sm ${compact ? "p-5" : "p-6 sm:p-8"}`}>
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">Finance tool</p>
          <h3 className="mt-2 text-2xl font-semibold text-slate-950">Mortgage calculator</h3>
        </div>
        <BarChart3 className="h-8 w-8 text-slate-400" />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="text-sm text-slate-700">
          <span className="mb-2 block font-medium">Property price (KES)</span>
          <input value={price} onChange={(e) => setPrice(Number(e.target.value || 0))} type="number" className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-slate-400" />
        </label>
        <label className="text-sm text-slate-700">
          <span className="mb-2 block font-medium">Deposit (%)</span>
          <input value={deposit} onChange={(e) => setDeposit(Number(e.target.value || 0))} type="number" className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-slate-400" />
        </label>
        <label className="text-sm text-slate-700">
          <span className="mb-2 block font-medium">Interest rate (%)</span>
          <input value={rate} onChange={(e) => setRate(Number(e.target.value || 0))} type="number" className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-slate-400" />
        </label>
        <label className="text-sm text-slate-700">
          <span className="mb-2 block font-medium">Loan term (years)</span>
          <input value={years} onChange={(e) => setYears(Number(e.target.value || 0))} type="number" className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-slate-400" />
        </label>
      </div>
      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-sm text-slate-500">Loan amount</p>
          <p className="mt-2 text-lg font-semibold text-slate-950">{format(summary.loanAmount)}</p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-sm text-slate-500">Monthly payment</p>
          <p className="mt-2 text-lg font-semibold text-slate-950">{format(summary.monthlyPayment)}</p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-sm text-slate-500">Deposit amount</p>
          <p className="mt-2 text-lg font-semibold text-slate-950">{format(summary.depositAmount)}</p>
        </div>
      </div>
      <p className="mt-4 text-sm text-slate-500">
        Planning estimate only. Final terms depend on the lender, borrower profile, and loan product.
      </p>
    </div>
  );
}
