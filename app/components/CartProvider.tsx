"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import type { FoodItem } from "@/app/data/menu";

export type CartLine = {
  item: FoodItem;
  qty: number;
};

type CartState = {
  lines: Record<string, CartLine>;
  count: number;
  subtotal: number;
  add: (item: FoodItem) => void;
  remove: (id: string) => void;
  decrement: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  clear: () => void;
  isOpen: boolean;
  setOpen: (open: boolean) => void;
  toggleOpen: () => void;
  lastAddedId: string | null;
};

const CartCtx = createContext<CartState | null>(null);

const STORAGE_KEY = "cryspo:cart:v1";

function readStored(): Record<string, CartLine> {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Record<string, CartLine>) : {};
  } catch {
    return {};
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [lines, setLines] = useState<Record<string, CartLine>>({});
  const [isOpen, setOpen] = useState(false);
  const [lastAddedId, setLastAddedId] = useState<string | null>(null);
  const hydrated = useRef(false);

  useEffect(() => {
    if (hydrated.current) {
      try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
      } catch {}
      return;
    }
    hydrated.current = true;
    const stored = readStored();
    if (Object.keys(stored).length > 0) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time hydration from localStorage on mount
      setLines(stored);
    }
  }, [lines]);

  const add = useCallback((item: FoodItem) => {
    setLines((prev) => {
      const cur = prev[item.id];
      return {
        ...prev,
        [item.id]: { item, qty: cur ? cur.qty + 1 : 1 },
      };
    });
    setLastAddedId(item.id);
    window.setTimeout(() => setLastAddedId(null), 700);
  }, []);

  const decrement = useCallback((id: string) => {
    setLines((prev) => {
      const cur = prev[id];
      if (!cur) return prev;
      if (cur.qty <= 1) {
        const next = { ...prev };
        delete next[id];
        return next;
      }
      return { ...prev, [id]: { ...cur, qty: cur.qty - 1 } };
    });
  }, []);

  const remove = useCallback((id: string) => {
    setLines((prev) => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
  }, []);

  const setQty = useCallback((id: string, qty: number) => {
    setLines((prev) => {
      const cur = prev[id];
      if (!cur) return prev;
      if (qty <= 0) {
        const next = { ...prev };
        delete next[id];
        return next;
      }
      return { ...prev, [id]: { ...cur, qty } };
    });
  }, []);

  const clear = useCallback(() => setLines({}), []);
  const toggleOpen = useCallback(() => setOpen((o) => !o), []);

  const { count, subtotal } = useMemo(() => {
    let count = 0;
    let subtotal = 0;
    for (const id in lines) {
      const l = lines[id];
      count += l.qty;
      subtotal += l.qty * l.item.price;
    }
    return { count, subtotal };
  }, [lines]);

  const value: CartState = {
    lines,
    count,
    subtotal,
    add,
    remove,
    decrement,
    setQty,
    clear,
    isOpen,
    setOpen,
    toggleOpen,
    lastAddedId,
  };

  return <CartCtx.Provider value={value}>{children}</CartCtx.Provider>;
}

export function useCart() {
  const ctx = useContext(CartCtx);
  if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
  return ctx;
}
