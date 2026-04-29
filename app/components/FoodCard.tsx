"use client";

import { useEffect, useRef, useState } from "react";
import type { FoodItem } from "@/app/data/menu";
import { useCart } from "@/app/components/CartProvider";

const BADGE_STYLES: Record<NonNullable<FoodItem["badge"]>, string> = {
  popular: "bg-linear-to-r from-orange-500 to-rose-500 text-white",
  new: "bg-linear-to-r from-emerald-500 to-teal-500 text-white",
  spicy: "bg-linear-to-r from-red-500 to-rose-600 text-white",
  chef: "bg-linear-to-r from-amber-500 to-yellow-500 text-stone-900",
};

const BADGE_LABEL: Record<NonNullable<FoodItem["badge"]>, string> = {
  popular: "🔥 Popular",
  new: "✨ New",
  spicy: "🌶️ Spicy",
  chef: "👨‍🍳 Chef's",
};

export function FoodCard({ item, index }: { item: FoodItem; index: number }) {
  const { lines, add, decrement, lastAddedId } = useCart();
  const qty = lines[item.id]?.qty ?? 0;
  const [pulse, setPulse] = useState(false);
  const lastQty = useRef(qty);

  useEffect(() => {
    if (qty !== lastQty.current) {
      setPulse(true);
      const t = setTimeout(() => setPulse(false), 300);
      lastQty.current = qty;
      return () => clearTimeout(t);
    }
  }, [qty]);

  const justAdded = lastAddedId === item.id;

  return (
    <article
      className="group animate-rise relative flex flex-col overflow-hidden rounded-3xl border border-stone-200/70 bg-white/80 shadow-[0_8px_30px_-12px_rgba(0,0,0,0.12)] backdrop-blur-sm transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_22px_40px_-18px_rgba(234,88,12,0.45)] hover:border-orange-300/60"
      style={{ animationDelay: `${Math.min(index, 12) * 60}ms` }}
    >
      <div
        className={`relative aspect-square overflow-hidden bg-linear-to-br ${item.tint}`}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.6),transparent_60%)]" />

        <span
          aria-hidden
          className="absolute inset-0 grid place-items-center text-7xl drop-shadow-[0_8px_20px_rgba(0,0,0,0.18)] transition-all duration-700 ease-out group-hover:scale-110 group-hover:rotate-[-6deg]"
        >
          <span className="animate-float-slow">{item.emoji}</span>
        </span>

        {item.badge && (
          <span
            className={`absolute left-3 top-3 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide shadow-md ${BADGE_STYLES[item.badge]}`}
          >
            {BADGE_LABEL[item.badge]}
          </span>
        )}

        <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-white/90 px-2.5 py-1 text-xs font-semibold text-stone-800 shadow-sm backdrop-blur">
          <span className="text-amber-500">★</span>
          {item.rating.toFixed(1)}
        </span>

        <span className="absolute bottom-3 left-3 inline-flex items-center gap-1 rounded-full bg-stone-900/80 px-2.5 py-1 text-[11px] font-medium text-white shadow-sm backdrop-blur">
          <span aria-hidden>⏱️</span>
          {item.prepTime}
        </span>

        {justAdded && (
          <span
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-5xl animate-fly-up"
          >
            +1
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <div>
          <h3 className="text-lg font-bold leading-tight text-stone-900 group-hover:text-orange-700 transition-colors">
            {item.name}
          </h3>
          <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-stone-500">
            {item.description}
          </p>
        </div>

        <div className="mt-auto flex items-center justify-between gap-3 pt-1">
          <div className="flex items-baseline gap-1">
            <span className="text-[11px] font-medium text-stone-400">$</span>
            <span className="text-2xl font-extrabold tracking-tight text-stone-900">
              {item.price.toFixed(2)}
            </span>
          </div>

          {qty === 0 ? (
            <button
              type="button"
              onClick={() => add(item)}
              className="inline-flex items-center gap-1.5 rounded-full bg-stone-900 px-4 py-2 text-sm font-semibold text-white shadow-md transition-all duration-300 hover:scale-105 hover:bg-orange-600 hover:shadow-orange-500/40 active:scale-95"
            >
              <span className="text-base leading-none">+</span>
              Add
            </button>
          ) : (
            <div
              className={`inline-flex items-center gap-2 rounded-full bg-linear-to-r from-orange-500 to-rose-500 p-1 shadow-md transition-transform duration-200 ${
                pulse ? "scale-110" : "scale-100"
              }`}
            >
              <button
                type="button"
                onClick={() => decrement(item.id)}
                aria-label={`Remove one ${item.name}`}
                className="grid h-8 w-8 place-items-center rounded-full bg-white/95 text-lg font-bold text-orange-600 shadow-sm transition hover:bg-white hover:scale-110 active:scale-90"
              >
                −
              </button>
              <span
                key={qty}
                className="min-w-6 text-center text-sm font-bold text-white animate-pop"
              >
                {qty}
              </span>
              <button
                type="button"
                onClick={() => add(item)}
                aria-label={`Add another ${item.name}`}
                className="grid h-8 w-8 place-items-center rounded-full bg-white/95 text-lg font-bold text-orange-600 shadow-sm transition hover:bg-white hover:scale-110 active:scale-90"
              >
                +
              </button>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
