"use client";

import { useEffect, useRef, useState } from "react";
import { useCart } from "@/app/components/CartProvider";

export function CartFab() {
  const { count, subtotal, toggleOpen, isOpen } = useCart();
  const [bump, setBump] = useState(false);
  const lastCount = useRef(count);

  useEffect(() => {
    if (count !== lastCount.current) {
      setBump(true);
      const t = setTimeout(() => setBump(false), 400);
      lastCount.current = count;
      return () => clearTimeout(t);
    }
  }, [count]);

  if (isOpen) return null;

  return (
    <button
      type="button"
      onClick={toggleOpen}
      aria-label={`Open cart, ${count} items, $${subtotal.toFixed(2)}`}
      className={`fixed bottom-5 left-1/2 z-40 -translate-x-1/2 transition-all duration-500 ${
        count === 0
          ? "translate-y-24 opacity-0 pointer-events-none"
          : "translate-y-0 opacity-100 animate-bounce-in"
      }`}
    >
      <span
        className={`group relative inline-flex items-center gap-3 rounded-full bg-stone-900 pl-5 pr-2 py-2 text-white shadow-2xl shadow-stone-900/40 transition-transform duration-300 hover:scale-105 active:scale-95 ${
          bump ? "scale-110" : ""
        } animate-pulse-soft`}
      >
        <span className="relative grid h-9 w-9 place-items-center text-xl">
          🛒
          <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-linear-to-br from-orange-400 to-rose-500 px-1 text-[10px] font-bold text-white shadow ring-2 ring-stone-900">
            {count}
          </span>
        </span>
        <span className="flex flex-col items-start leading-tight">
          <span className="text-[10px] font-medium uppercase tracking-[0.16em] text-white/60">
            View cart
          </span>
          <span className="text-sm font-bold">
            ${subtotal.toFixed(2)}
          </span>
        </span>
        <span className="grid h-10 w-10 place-items-center rounded-full bg-linear-to-br from-orange-500 to-rose-500 text-base font-bold transition-transform group-hover:translate-x-0.5">
          →
        </span>
      </span>
    </button>
  );
}
