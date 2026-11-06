
"use client";

import { useState } from "react";
import {
  Coffee,
  ShoppingBag,
  Bell,
  Utensils,
  Receipt,
  Menu,
  Plus,
  Minus,
  Leaf,
} from "lucide-react";

const products = [
  { id: 1, name: "Cappuccino", category: "Coffee", price: 4000, emoji: "☕" },
  { id: 2, name: "Latte", category: "Coffee", price: 4500, emoji: "🥛" },
  { id: 3, name: "Espresso", category: "Coffee", price: 3000, emoji: "☕" },
  { id: 4, name: "Iced Coffee", category: "Cold Drinks", price: 5000, emoji: "🧋" },
  { id: 5, name: "Fresh Lemon", category: "Cold Drinks", price: 3500, emoji: "🍋" },
  { id: 6, name: "Chocolate Cake", category: "Desserts", price: 5000, emoji: "🍰" },
];

const categories = ["All", "Coffee", "Cold Drinks", "Desserts"];

export default function Home() {
  const [category, setCategory] = useState("All");
  const [cart, setCart] = useState<Record<number, number>>({});
  const [showCart, setShowCart] = useState(false);
  const [message, setMessage] = useState("");

  const filtered = products.filter(
    (p) => category === "All" || p.category === category
  );

  const count = Object.values(cart).reduce((a, b) => a + b, 0);

  const total = products.reduce(
    (sum, p) => sum + p.price * (cart[p.id] || 0),
    0
  );

  function updateCart(id: number, amount: number) {
    setCart((old) => ({
      ...old,
      [id]: Math.max(0, (old[id] || 0) + amount),
    }));
  }

  return (
    <main className="min-h-screen bg-[#faf8f3] text-[#29251f]" dir="ltr">
      <header className="sticky top-0 z-20 border-b border-[#e9e2d5] bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-[#e8f0d8] p-3 text-[#66813b]">
              <Leaf size={25} />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-wide">LEMON CAFE</h1>
              <p className="text-xs text-gray-500">Fresh moments, better coffee</p>
            </div>
          </div>
          <button
            onClick={() => setShowCart(!showCart)}
            className="relative rounded-xl bg-[#283321] p-3 text-white"
          >
            <ShoppingBag size={22} />
            {count > 0 && (
              <span className="absolute -right-2 -top-2 rounded-full bg-yellow-400 px-2 text-xs font-bold text-black">
                {count}
              </span>
            )}
          </button>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-5 py-7">
        <div className="relative overflow-hidden rounded-3xl bg-[#283321] p-7 text-white md:p-12">
          <div className="relative z-10 max-w-lg">
            <p className="mb-3 text-sm font-medium tracking-widest text-[#d5e6ae]">
              WELCOME TO LEMON CAFE
            </p>
            <h2 className="text-4xl font-bold leading-tight md:text-5xl">
              Your perfect coffee moment.
            </h2>
            <p className="mt-4 text-sm leading-7 text-gray-300">
              Discover our drinks and delicious treats. Order directly from
              your table and enjoy your time.
            </p>
            <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#e1edc5] px-5 py-3 font-semibold text-[#283321]">
              <Coffee size={19} />
              Explore Our Menu
            </div>
          </div>
          <div className="absolute -right-5 -top-8 text-[170px] opacity-20">
            🍋
          </div>
        </div>

        <div className="my-8 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-2xl font-bold">Our Menu</h2>
            <p className="mt-1 text-sm text-gray-500">
              Choose your favorite items
            </p>
          </div>
          <span className="rounded-full bg-[#e8f0d8] px-4 py-2 text-sm font-semibold text-[#587239]">
            Table No. 01
          </span>
        </div>

        <div className="mb-7 flex gap-2 overflow-x-auto pb-2">
          {categories.map((item) => (
            <button
              key={item}
              onClick={() => setCategory(item)}
              className={`whitespace-nowrap rounded-full px-5 py-3 text-sm font-semibold transition ${
                category === item
                  ? "bg-[#283321] text-white"
                  : "bg-white text-gray-600"
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {filtered.map((p) => (
            <article
              key={p.id}
              className="overflow-hidden rounded-2xl border border-[#eee8dd] bg-white p-4 shadow-sm"
            >
              <div className="flex aspect-square items-center justify-center rounded-xl bg-[#f4f0e7] text-7xl">
                {p.emoji}
              </div>
              <div className="mt-4">
                <h3 className="font-bold">{p.name}</h3>
                <p className="mt-1 text-xs text-gray-500">{p.category}</p>
                <div className="mt-4 flex items-center justify-between gap-2">
                  <span className="text-sm font-bold">
                    {p.price.toLocaleString("en-US")} IQD
                  </span>
                  <button
                    onClick={() => updateCart(p.id, 1)}
                    className="rounded-lg bg-[#283321] p-2 text-white"
                    aria-label={`Add ${p.name}`}
                  >
                    <Plus size={18} />
                  </button>
                </div>
                {(cart[p.id] || 0) > 0 && (
                  <div className="mt-3 flex items-center justify-between">
                    <button onClick={() => updateCart(p.id, -1)}>
                      <Minus size={17} />
                    </button>
                    <span className="font-bold">{cart[p.id]}</span>
                    <button onClick={() => updateCart(p.id, 1)}>
                      <Plus size={17} />
                    </button>
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>

        <section className="my-9 grid gap-3 md:grid-cols-2">
          <button
            onClick={() => setMessage("Your waiter call has been requested.")}
            className="flex items-center justify-center gap-3 rounded-2xl bg-[#e9e4d8] p-5 font-bold text-[#343c2b]"
          >
            <Bell size={23} />
            Call The Waiter
          </button>
          <button
            onClick={() => setMessage("Your current bill: " + total.toLocaleString("en-US") + " IQD")}
            className="flex items-center justify-center gap-3 rounded-2xl bg-[#283321] p-5 font-bold text-white"
          >
            <Receipt size={23} />
            View My Bill
          </button>
        </section>

        {message && (
          <div className="mb-5 rounded-xl bg-[#e8f0d8] p-4 text-center text-sm font-semibold">
            {message}
          </div>
        )}

        {showCart && (
          <section className="mb-8 rounded-2xl border bg-white p-5">
            <h2 className="mb-4 text-xl font-bold">Your Cart</h2>
            {products.filter((p) => cart[p.id] > 0).map((p) => (
              <div key={p.id} className="flex justify-between border-b py-3 text-sm">
                <span>{p.name} × {cart[p.id]}</span>
                <span className="font-bold">
                  {(p.price * cart[p.id]).toLocaleString("en-US")} IQD
                </span>
              </div>
            ))}
            <div className="mt-5 flex justify-between font-bold">
              <span>Total</span>
              <span>{total.toLocaleString("en-US")} IQD</span>
            </div>
            <button
              onClick={() => setMessage("Demo only: online ordering will be connected in the next stage.")}
              className="mt-5 w-full rounded-xl bg-[#283321] p-4 font-bold text-white"
            >
              Place Order
            </button>
          </section>
        )}
      </section>

      <footer className="bg-[#283321] px-5 py-8 text-center text-sm text-gray-300">
        <p className="font-bold tracking-widest text-white">LEMON CAFE</p>
        <p className="mt-2">Made for coffee lovers 🍋</p>
      </footer>
    </main>
  );
}

