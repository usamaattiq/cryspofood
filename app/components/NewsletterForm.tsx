"use client";

import { useState } from "react";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  return (
    <form
      className="mt-6 flex max-w-md gap-2"
      onSubmit={(e) => {
        e.preventDefault();
        if (!email) return;
        setDone(true);
        setEmail("");
        setTimeout(() => setDone(false), 2400);
      }}
    >
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@hungry.com"
        className="h-11 flex-1 rounded-full bg-white/10 px-4 text-sm text-white placeholder:text-stone-500 outline-none ring-orange-400/30 transition focus:bg-white/15 focus:ring-2"
      />
      <button
        type="submit"
        className="rounded-full bg-linear-to-r from-orange-500 to-rose-500 px-5 text-sm font-bold text-white shadow-lg transition hover:scale-105 active:scale-95"
      >
        {done ? "✓ Joined!" : "Subscribe"}
      </button>
    </form>
  );
}
