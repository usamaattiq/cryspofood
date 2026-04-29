"use client";

import { useEffect, useState } from "react";
import { useCart } from "@/app/components/CartProvider";

const DELIVERY_FEE = 2.99;
const TAX_RATE = 0.07;

export function CartSheet() {
  const { lines, subtotal, count, isOpen, setOpen, add, decrement, remove, clear } =
    useCart();
  const [placed, setPlaced] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [isOpen, setOpen]);

  const tax = subtotal * TAX_RATE;
  const total = subtotal + (count > 0 ? DELIVERY_FEE : 0) + tax;
  const list = Object.values(lines);

  const handleCheckout = () => {
    if (count === 0) return;
    setPlaced(true);
    setTimeout(() => {
      clear();
      setPlaced(false);
      setOpen(false);
    }, 1800);
  };

  return (
    <div
      className={`fixed inset-0 z-50 ${isOpen ? "" : "pointer-events-none"}`}
      role="dialog"
      aria-modal="true"
      aria-hidden={!isOpen}
      aria-labelledby="cart-title"
    >
      <button
        type="button"
        aria-label="Close cart"
        onClick={() => setOpen(false)}
        className={`absolute inset-0 bg-stone-900/50 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      <div
        className={`absolute inset-x-0 bottom-0 mx-auto flex max-h-[92vh] w-full max-w-3xl flex-col overflow-hidden rounded-t-[28px] bg-white shadow-[0_-20px_50px_-12px_rgba(0,0,0,0.35)] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          isOpen ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-full opacity-0"
        }`}
      >
        <div className="relative flex items-center justify-between gap-4 border-b border-stone-100 bg-linear-to-r from-orange-50 via-white to-rose-50 px-6 pt-4 pb-5">
          <span
            aria-hidden
            className="absolute left-1/2 top-2 h-1.5 w-12 -translate-x-1/2 rounded-full bg-stone-300"
          />
          <div>
            <h2
              id="cart-title"
              className="text-2xl font-black tracking-tight text-stone-900"
            >
              Your bag 🛍️
            </h2>
            <p className="text-sm text-stone-500">
              {count === 0
                ? "Empty for now — let's fix that."
                : `${count} item${count === 1 ? "" : "s"} ready to ship`}
            </p>
          </div>
          <div className="flex items-center gap-2">
            {count > 0 && !placed && (
              <button
                type="button"
                onClick={clear}
                className="rounded-full px-3 py-1.5 text-xs font-semibold text-stone-500 transition hover:bg-stone-100 hover:text-stone-800"
              >
                Clear all
              </button>
            )}
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close"
              className="grid h-10 w-10 place-items-center rounded-full bg-white text-stone-600 shadow-sm ring-1 ring-stone-200 transition hover:rotate-90 hover:text-stone-900"
            >
              ✕
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-5">
          {placed ? (
            <div className="grid place-items-center py-16 text-center animate-bounce-in">
              <div className="text-7xl">🎉</div>
              <h3 className="mt-4 text-2xl font-black text-stone-900">
                Order placed!
              </h3>
              <p className="mt-2 max-w-sm text-sm text-stone-500">
                Our chefs are firing up the grill. You&apos;ll get a notification
                once your food is on its way.
              </p>
            </div>
          ) : list.length === 0 ? (
            <div className="grid place-items-center py-16 text-center">
              <div className="animate-float text-7xl">🥡</div>
              <h3 className="mt-4 text-xl font-bold text-stone-900">
                Your bag is empty
              </h3>
              <p className="mt-2 max-w-sm text-sm text-stone-500">
                Browse the menu and tap <span className="font-semibold">Add</span>{" "}
                to drop something delicious in here.
              </p>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-stone-900 px-5 py-2.5 text-sm font-semibold text-white shadow-md transition hover:scale-105 hover:bg-orange-600"
              >
                Browse menu →
              </button>
            </div>
          ) : (
            <ul className="flex flex-col gap-3">
              {list.map((line, idx) => (
                <li
                  key={line.item.id}
                  className="animate-rise flex items-center gap-4 rounded-2xl border border-stone-100 bg-stone-50/60 p-3 transition hover:border-stone-200 hover:bg-white"
                  style={{ animationDelay: `${idx * 40}ms` }}
                >
                  <div
                    className={`grid h-16 w-16 shrink-0 place-items-center rounded-2xl bg-linear-to-br ${line.item.tint} text-3xl shadow-inner`}
                  >
                    <span className="animate-float-slow">{line.item.emoji}</span>
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-bold text-stone-900">
                      {line.item.name}
                    </p>
                    <p className="text-xs text-stone-500">
                      ${line.item.price.toFixed(2)} each
                    </p>
                    <p className="mt-1 text-sm font-semibold text-orange-600">
                      ${(line.item.price * line.qty).toFixed(2)}
                    </p>
                  </div>

                  <div className="flex flex-col items-end gap-2">
                    <div className="inline-flex items-center gap-1 rounded-full border border-stone-200 bg-white p-0.5 shadow-sm">
                      <button
                        type="button"
                        onClick={() => decrement(line.item.id)}
                        aria-label={`Remove one ${line.item.name}`}
                        className="grid h-8 w-8 place-items-center rounded-full text-base font-bold text-stone-600 transition hover:bg-stone-100 hover:text-stone-900 active:scale-90"
                      >
                        −
                      </button>
                      <span
                        key={line.qty}
                        className="min-w-6 text-center text-sm font-bold text-stone-900 animate-pop"
                      >
                        {line.qty}
                      </span>
                      <button
                        type="button"
                        onClick={() => add(line.item)}
                        aria-label={`Add another ${line.item.name}`}
                        className="grid h-8 w-8 place-items-center rounded-full bg-linear-to-br from-orange-500 to-rose-500 text-base font-bold text-white shadow-sm transition hover:scale-110 active:scale-90"
                      >
                        +
                      </button>
                    </div>
                    <button
                      type="button"
                      onClick={() => remove(line.item.id)}
                      className="text-[11px] font-medium text-stone-400 transition hover:text-rose-600"
                    >
                      Remove
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {!placed && list.length > 0 && (
          <div className="border-t border-stone-100 bg-white px-6 py-5">
            <dl className="space-y-1.5 text-sm">
              <div className="flex justify-between text-stone-600">
                <dt>Subtotal</dt>
                <dd className="font-medium text-stone-800">
                  ${subtotal.toFixed(2)}
                </dd>
              </div>
              <div className="flex justify-between text-stone-600">
                <dt>Delivery</dt>
                <dd className="font-medium text-stone-800">
                  ${DELIVERY_FEE.toFixed(2)}
                </dd>
              </div>
              <div className="flex justify-between text-stone-600">
                <dt>Tax (7%)</dt>
                <dd className="font-medium text-stone-800">${tax.toFixed(2)}</dd>
              </div>
              <div className="my-2 h-px bg-stone-100" />
              <div className="flex items-baseline justify-between">
                <dt className="text-base font-bold text-stone-900">Total</dt>
                <dd className="text-2xl font-extrabold tracking-tight text-stone-900">
                  ${total.toFixed(2)}
                </dd>
              </div>
            </dl>

            <button
              type="button"
              onClick={handleCheckout}
              className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-linear-to-r from-orange-500 via-rose-500 to-rose-600 px-6 py-4 text-base font-bold text-white shadow-lg shadow-orange-500/30 transition-all duration-300 hover:scale-[1.02] hover:shadow-orange-500/50 active:scale-[0.98]"
            >
              <span>Checkout</span>
              <span aria-hidden>→</span>
            </button>
            <p className="mt-2 text-center text-[11px] text-stone-400">
              Free delivery on orders over $25 · Avg arrival 28–35 min
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
