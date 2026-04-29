import { MenuSection } from "@/app/components/MenuSection";
import { NewsletterForm } from "@/app/components/NewsletterForm";

export default function Home() {
  return (
    <div id="top" className="flex flex-col">
      <Hero />
      <Marquee />
      <MenuSection />
      <Features />
      <Footer />
    </div>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-orange-300/40 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute top-20 -right-24 h-80 w-80 rounded-full bg-rose-300/40 blur-3xl"
      />

      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-5 py-16 sm:px-8 lg:grid-cols-2 lg:py-24">
        <div className="relative z-10 flex flex-col gap-6 animate-rise">
          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-orange-200 bg-white/80 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-orange-700 shadow-sm backdrop-blur">
            <span className="grid h-4 w-4 place-items-center rounded-full bg-linear-to-br from-orange-500 to-rose-500 text-[8px] text-white">
              ★
            </span>
            Rated 4.9 · 12k+ happy diners
          </span>

          <h1 className="text-balance text-5xl font-black leading-[1.05] tracking-tight text-stone-900 sm:text-6xl lg:text-7xl">
            Crispy.{" "}
            <span className="bg-linear-to-r from-orange-500 via-rose-500 to-rose-600 bg-clip-text text-transparent">
              Fresh.
            </span>{" "}
            Fast.
          </h1>

          <p className="max-w-xl text-base leading-relaxed text-stone-600 sm:text-lg">
            Hand-crafted dishes from the city&apos;s best kitchens, delivered
            piping hot to your door in under 35 minutes — or it&apos;s on us.
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href="#menu"
              className="group inline-flex items-center gap-2 rounded-full bg-stone-900 px-6 py-3.5 text-sm font-bold text-white shadow-xl shadow-stone-900/20 transition-all duration-300 hover:scale-105 hover:bg-orange-600 hover:shadow-orange-500/40"
            >
              Order now
              <span aria-hidden className="transition-transform group-hover:translate-x-1">
                →
              </span>
            </a>
            <a
              href="#about"
              className="inline-flex items-center gap-2 rounded-full border border-stone-300 bg-white/70 px-6 py-3.5 text-sm font-semibold text-stone-800 shadow-sm backdrop-blur transition hover:-translate-y-0.5 hover:bg-white hover:shadow-md"
            >
              How it works
            </a>
          </div>

          <dl className="mt-4 grid max-w-md grid-cols-3 gap-4 border-t border-stone-200 pt-6">
            <Stat value="35min" label="Avg delivery" />
            <Stat value="120+" label="Dishes" />
            <Stat value="24/7" label="Open kitchen" />
          </dl>
        </div>

        <div className="relative h-[420px] sm:h-[520px]">
          <div
            aria-hidden
            className="absolute inset-0 grid place-items-center"
          >
            <div className="relative h-72 w-72 sm:h-96 sm:w-96">
              <span className="absolute inset-0 animate-spin-slow rounded-full bg-linear-to-br from-orange-300 via-rose-300 to-amber-300 blur-2xl opacity-60" />
              <span className="absolute inset-4 rounded-full bg-white shadow-2xl" />
              <span className="absolute inset-0 grid place-items-center text-[12rem] sm:text-[16rem] animate-float drop-shadow-[0_30px_40px_rgba(234,88,12,0.35)]">
                🍔
              </span>
            </div>
          </div>

          <FloatingChip
            className="left-2 top-6 sm:left-6"
            emoji="🍕"
            label="Truffle pizza"
            sub="$16.00"
            delay="0.2s"
          />
          <FloatingChip
            className="right-2 top-20 sm:right-8"
            emoji="🍣"
            label="Dragon roll"
            sub="$18.00"
            delay="0.5s"
          />
          <FloatingChip
            className="bottom-10 left-6 sm:left-12"
            emoji="🥗"
            label="Caesar bowl"
            sub="$9.50"
            delay="0.8s"
          />
          <FloatingChip
            className="bottom-2 right-2 sm:right-10"
            emoji="🍰"
            label="Lava cake"
            sub="$7.50"
            delay="1.1s"
          />
        </div>
      </div>
    </section>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <dt className="text-2xl font-extrabold tracking-tight text-stone-900">
        {value}
      </dt>
      <dd className="text-xs font-medium uppercase tracking-wider text-stone-500">
        {label}
      </dd>
    </div>
  );
}

function FloatingChip({
  emoji,
  label,
  sub,
  className,
  delay,
}: {
  emoji: string;
  label: string;
  sub: string;
  className?: string;
  delay?: string;
}) {
  return (
    <div
      className={`absolute inline-flex items-center gap-2.5 rounded-2xl border border-white/70 bg-white/90 px-3 py-2 shadow-xl shadow-stone-900/10 backdrop-blur animate-float ${className ?? ""}`}
      style={{ animationDelay: delay }}
    >
      <span className="grid h-9 w-9 place-items-center rounded-xl bg-linear-to-br from-orange-100 to-rose-100 text-xl">
        {emoji}
      </span>
      <span className="flex flex-col leading-tight">
        <span className="text-xs font-bold text-stone-900">{label}</span>
        <span className="text-[11px] font-medium text-orange-600">{sub}</span>
      </span>
    </div>
  );
}

function Marquee() {
  const items = [
    "🚚 Free delivery over $25",
    "🔥 Hot from the oven, every order",
    "🌱 Plant-based options daily",
    "👨‍🍳 Crafted by award-winning chefs",
    "⏱️ 35-minute promise — or it's free",
    "💚 100% recyclable packaging",
  ];
  const loop = [...items, ...items];
  return (
    <div className="relative overflow-hidden border-y border-stone-200/70 bg-stone-900 text-white">
      <div className="flex w-max animate-marquee gap-12 py-3 px-6 text-sm font-medium">
        {loop.map((t, i) => (
          <span key={i} className="inline-flex items-center gap-2 whitespace-nowrap">
            {t}
            <span aria-hidden className="text-orange-400">·</span>
          </span>
        ))}
      </div>
    </div>
  );
}

function Features() {
  const features = [
    {
      icon: "⚡",
      title: "Lightning fast",
      copy: "Most orders arrive in 28–35 minutes from kitchen to door.",
      tint: "from-amber-100 to-orange-200",
    },
    {
      icon: "🌿",
      title: "Always fresh",
      copy: "We source produce daily from local farms — never frozen, never reheated.",
      tint: "from-emerald-100 to-lime-200",
    },
    {
      icon: "💳",
      title: "Easy checkout",
      copy: "Pay any way you want — Apple Pay, card, or cash on delivery.",
      tint: "from-rose-100 to-pink-200",
    },
    {
      icon: "🎁",
      title: "Rewards on every bite",
      copy: "Earn Cryspo points on every order, redeem for free meals.",
      tint: "from-violet-100 to-fuchsia-200",
    },
  ];

  return (
    <section
      id="about"
      className="relative mx-auto w-full max-w-7xl px-5 py-20 sm:px-8"
    >
      <div className="mx-auto max-w-2xl text-center">
        <span className="inline-flex items-center gap-2 rounded-full bg-stone-900 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white">
          Why Cryspo
        </span>
        <h2 className="mt-4 text-balance text-4xl font-black tracking-tight text-stone-900 sm:text-5xl">
          A better way to{" "}
          <span className="bg-linear-to-r from-orange-500 to-rose-500 bg-clip-text text-transparent">
            eat in
          </span>
          .
        </h2>
        <p className="mt-3 text-base leading-relaxed text-stone-600">
          We obsess over the details so every meal feels like the chef just
          handed it to you across the counter.
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {features.map((f, i) => (
          <div
            key={f.title}
            className="group animate-rise relative overflow-hidden rounded-3xl border border-stone-200/70 bg-white/80 p-6 shadow-sm backdrop-blur transition-all duration-500 hover:-translate-y-1.5 hover:shadow-xl"
            style={{ animationDelay: `${i * 80}ms` }}
          >
            <div
              className={`grid h-14 w-14 place-items-center rounded-2xl bg-linear-to-br ${f.tint} text-3xl shadow-inner transition-transform duration-500 group-hover:rotate-[-8deg] group-hover:scale-110`}
            >
              {f.icon}
            </div>
            <h3 className="mt-5 text-lg font-bold text-stone-900">{f.title}</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-stone-600">
              {f.copy}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer
      id="contact"
      className="relative mt-10 overflow-hidden bg-stone-900 text-stone-300"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -top-20 left-1/2 h-72 w-[40rem] -translate-x-1/2 rounded-full bg-orange-500/20 blur-3xl"
      />
      <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-10 px-5 py-16 sm:px-8 lg:grid-cols-4">
        <div className="lg:col-span-2">
          <a href="#top" className="inline-flex items-center gap-2.5">
            <span className="grid h-10 w-10 place-items-center rounded-2xl bg-linear-to-br from-orange-500 to-rose-500 text-xl shadow-lg">
              🍽️
            </span>
            <span className="text-xl font-black tracking-tight text-white">
              Cryspo<span className="text-orange-400">.</span>Food
            </span>
          </a>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-stone-400">
            Crisp, fresh, fast meals delivered from the city&apos;s best
            kitchens. Made with love, packed with care.
          </p>
          <NewsletterForm />
        </div>

        <FooterCol
          title="Menu"
          links={["Burgers", "Pizza", "Sushi", "Salads", "Desserts", "Drinks"]}
        />
        <FooterCol
          title="Company"
          links={["About", "Careers", "Press", "Partners", "Help center"]}
        />
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-5 py-6 text-xs text-stone-500 sm:flex-row sm:px-8">
          <p>© {new Date().getFullYear()} Cryspo Food. All rights reserved.</p>
          <div className="flex items-center gap-5">
            <a href="#" className="transition hover:text-white">Privacy</a>
            <a href="#" className="transition hover:text-white">Terms</a>
            <a href="#" className="transition hover:text-white">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: string[] }) {
  return (
    <div>
      <h4 className="text-xs font-bold uppercase tracking-[0.18em] text-white">
        {title}
      </h4>
      <ul className="mt-4 space-y-2 text-sm">
        {links.map((l) => (
          <li key={l}>
            <a
              href="#"
              className="text-stone-400 transition hover:text-orange-400"
            >
              {l}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
