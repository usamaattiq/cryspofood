"use client";

import { useEffect, useRef, useState } from "react";
import { useCart } from "@/app/components/CartProvider";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const { count, toggleOpen } = useCart();
  const [bump, setBump] = useState(false);
  const lastCount = useRef(count);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (count !== lastCount.current) {
      setBump(true);
      const t = setTimeout(() => setBump(false), 350);
      lastCount.current = count;
      return () => clearTimeout(t);
    }
  }, [count]);

  return (
    <header
      className={[
        "sticky top-0 z-30 w-full transition-all duration-300",
        scrolled
          ? "backdrop-blur-xl bg-white/75 border-b border-black/5 shadow-sm"
          : "bg-transparent",
      ].join(" ")}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
        <a href="#top" className="group flex items-center gap-2.5">
          <span className="grid h-10 w-10 place-items-center rounded-2xl bg-linear-to-br from-orange-500 to-rose-500 text-xl shadow-lg shadow-orange-500/30 transition-transform duration-300 group-hover:rotate-[-8deg] group-hover:scale-110">
            🍽️
          </span>
          <span className="flex flex-col leading-none">
            <span className="text-lg font-black tracking-tight text-stone-900">
              Cryspo
              <span className="text-orange-600">.</span>
              Food
            </span>
            <span className="mt-0.5 text-[10px] font-medium uppercase tracking-[0.18em] text-stone-500">
              Crisp · Fresh · Fast
            </span>
          </span>
        </a>

        <nav className="hidden items-center gap-8 text-sm font-medium text-stone-700 md:flex">
          <a href="#menu" className="transition-colors hover:text-orange-600">
            Menu
          </a>
          <a href="#about" className="transition-colors hover:text-orange-600">
            About
          </a>
          <a href="#contact" className="transition-colors hover:text-orange-600">
            Contact
          </a>
        </nav>

        <div className="flex items-center gap-3">
          <button
            type="button"
            className="hidden rounded-full border border-stone-300/80 bg-white/70 px-4 py-2 text-sm font-medium text-stone-800 shadow-sm transition hover:-translate-y-0.5 hover:bg-white hover:shadow-md sm:inline-flex"
          >
            Sign in
          </button>
          <button
            type="button"
            onClick={toggleOpen}
            aria-label={`Open cart (${count} items)`}
            className={`relative inline-flex items-center gap-1.5 rounded-full bg-stone-900 px-4 py-2 text-sm font-semibold text-white shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:bg-stone-800 ${
              bump ? "scale-110" : ""
            }`}
          >
            <span aria-hidden className="text-base leading-none">
              🛒
            </span>
            <span className="hidden sm:inline">Cart</span>
            <span
              className={`grid h-5 min-w-5 place-items-center rounded-full bg-linear-to-br from-orange-400 to-rose-500 px-1 text-[10px] font-bold text-white ring-2 ring-stone-900 transition ${
                count > 0 ? "scale-100" : "scale-0"
              }`}
            >
              {count}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}
