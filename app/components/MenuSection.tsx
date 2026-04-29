"use client";

import { useMemo, useState } from "react";
import { CATEGORIES, MENU, type Category } from "@/app/data/menu";
import { FoodCard } from "@/app/components/FoodCard";

export function MenuSection() {
  const [active, setActive] = useState<Category>("all");
  const [query, setQuery] = useState("");

  const items = useMemo(() => {
    const q = query.trim().toLowerCase();
    return MENU.filter((m) => {
      if (active !== "all" && m.category !== active) return false;
      if (!q) return true;
      return (
        m.name.toLowerCase().includes(q) ||
        m.description.toLowerCase().includes(q)
      );
    });
  }, [active, query]);

  return (
    <section
      id="menu"
      className="relative mx-auto w-full max-w-7xl px-5 py-20 sm:px-8"
    >
      <div className="mb-10 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div className="max-w-2xl">
          <span className="inline-flex items-center gap-2 rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-orange-700">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-orange-500" />
            Today&apos;s menu
          </span>
          <h2 className="mt-3 text-balance text-4xl font-black tracking-tight text-stone-900 sm:text-5xl">
            Pick your{" "}
            <span className="bg-linear-to-r from-orange-500 to-rose-500 bg-clip-text text-transparent">
              cravings
            </span>
          </h2>
          <p className="mt-3 text-base leading-relaxed text-stone-600 sm:text-lg">
            Hand-crafted by our chefs every morning. Tap{" "}
            <span className="font-semibold text-stone-800">+</span> to start
            your order — your cart is always one tap away.
          </p>
        </div>

        <label className="group relative flex w-full items-center sm:w-72">
          <span
            aria-hidden
            className="pointer-events-none absolute left-4 text-stone-400 transition group-focus-within:text-orange-500"
          >
            🔎
          </span>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search dishes..."
            className="h-12 w-full rounded-full border border-stone-200 bg-white/90 pl-11 pr-4 text-sm text-stone-800 shadow-sm outline-none ring-orange-500/30 transition focus:border-orange-400 focus:ring-4"
          />
        </label>
      </div>

      <div className="no-scrollbar -mx-5 mb-10 flex gap-2 overflow-x-auto px-5 sm:mx-0 sm:px-0">
        {CATEGORIES.map((c, i) => {
          const isActive = active === c.id;
          return (
            <button
              key={c.id}
              type="button"
              onClick={() => setActive(c.id)}
              className={`animate-rise inline-flex shrink-0 items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-semibold transition-all duration-300 ${
                isActive
                  ? "border-transparent bg-stone-900 text-white shadow-lg scale-105"
                  : "border-stone-200 bg-white/80 text-stone-700 hover:-translate-y-0.5 hover:border-stone-300 hover:bg-white"
              }`}
              style={{ animationDelay: `${i * 40}ms` }}
            >
              <span aria-hidden className="text-base leading-none">
                {c.emoji}
              </span>
              {c.label}
            </button>
          );
        })}
      </div>

      {items.length === 0 ? (
        <div className="animate-rise grid place-items-center rounded-3xl border border-dashed border-stone-300 bg-white/60 py-20 text-center">
          <div className="text-5xl">🍽️</div>
          <p className="mt-4 text-lg font-semibold text-stone-800">
            No dishes match your search.
          </p>
          <p className="mt-1 text-sm text-stone-500">
            Try a different keyword or category.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {items.map((item, idx) => (
            <FoodCard key={item.id} item={item} index={idx} />
          ))}
        </div>
      )}
    </section>
  );
}
