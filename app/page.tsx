import Link from "next/link";

const cards = [
  {
    title: "Car payment calculator",
    description:
      "Estimate monthly car loan payments for price, APR, and term combinations.",
    href: "/car-payment/50000/6/72",
    backgroundClassName:
      "bg-[linear-gradient(rgba(0,0,0,0.72),rgba(0,0,0,0.84)),url('https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=2000')] bg-cover bg-center",
  },
  {
    title: "Boat payment calculator",
    description:
      "Estimate monthly boat loan payments with longer terms and higher loan amounts.",
    href: "/boat-payment/70000/7/120",
    backgroundClassName:
      "bg-[linear-gradient(rgba(0,0,0,0.68),rgba(0,0,0,0.84)),url('https://images.unsplash.com/photo-1500375592092-40eb2168fd21?q=80&w=2000')] bg-cover bg-center",
  },
  {
    title: "RV payment calculator",
    description:
      "Estimate monthly RV loan payments for campers, motorhomes, and travel trailers.",
    href: "/rv-payment/90000/7/180",
    backgroundClassName:
      "bg-[linear-gradient(rgba(0,0,0,0.68),rgba(0,0,0,0.84)),url('https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=2000')] bg-cover bg-center",
  },
];

const popularCars = [
  {
    label: "$30,000 car payment",
    href: "/car-payment/30000/6/60",
    text: "Common mid-range car payment example with a 60 month term.",
  },
  {
    label: "$50,000 car payment",
    href: "/car-payment/50000/6/72",
    text: "Estimate the monthly payment on a larger car loan.",
  },
  {
    label: "$75,000 car payment",
    href: "/car-payment/75000/7/84",
    text: "See what a high-dollar car loan costs monthly.",
  },
];

const popularBoats = [
  {
    label: "$30,000 boat payment",
    href: "/boat-payment/30000/7/84",
    text: "Entry-level boat loan estimate with a shorter term.",
  },
  {
    label: "$70,000 boat payment",
    href: "/boat-payment/70000/7/120",
    text: "Estimate monthly payment for a popular boat loan size.",
  },
  {
    label: "$110,000 boat payment",
    href: "/boat-payment/110000/8/180",
    text: "Long-term payment example for a larger financed boat.",
  },
];

const popularRvs = [
  {
    label: "$60,000 RV payment",
    href: "/rv-payment/60000/7/120",
    text: "Estimate monthly cost for a common travel trailer or entry RV.",
  },
  {
    label: "$90,000 RV payment",
    href: "/rv-payment/90000/7/180",
    text: "See a longer-term RV loan payment example.",
  },
  {
    label: "$140,000 RV payment",
    href: "/rv-payment/140000/8/180",
    text: "Estimate payments for a larger motorhome purchase.",
  },
];

function LinkCard({
  href,
  title,
  text,
}: {
  href: string;
  title: string;
  text: string;
}) {
  return (
    <Link
      href={href}
      className="block rounded-xl border border-white/10 bg-black/25 p-5 backdrop-blur-sm transition hover:bg-black/35"
    >
      <div className="text-xl font-semibold text-white">{title}</div>
      <p className="mt-3 text-sm leading-6 text-neutral-200">{text}</p>
    </Link>
  );
}

export default function HomePage() {
  return (
    <main className="min-h-screen bg-neutral-950 text-white">
      <div className="border-b border-white/10 bg-black/20">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-5 md:px-6">
          <Link href="/" className="text-sm font-semibold tracking-tight">
            Payment Calculator
          </Link>

          <div className="flex items-center gap-5 text-sm text-neutral-300">
            <Link href="/car-payment/50000/6/72" className="hover:text-white">
              Car
            </Link>
            <Link href="/boat-payment/70000/7/120" className="hover:text-white">
              Boat
            </Link>
            <Link href="/rv-payment/90000/7/180" className="hover:text-white">
              RV
            </Link>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 py-10 md:px-6">
        <section className="rounded-2xl border border-white/10 bg-black/30 p-8 shadow-sm backdrop-blur-sm">
          <h1 className="max-w-5xl text-4xl font-bold tracking-tight md:text-7xl">
            Payment calculators that answer the question fast
          </h1>

          <p className="mt-5 max-w-3xl text-xl leading-9 text-neutral-200">
            Estimate car, boat, and RV loan payments with clean monthly payment,
            total cost, and interest breakdowns.
          </p>
        </section>

        <section className="mt-8 grid gap-6 md:grid-cols-3">
          {cards.map((card) => (
            <Link
              key={card.href}
              href={card.href}
              className={`rounded-2xl border border-white/10 p-6 shadow-sm transition hover:scale-[1.01] ${card.backgroundClassName}`}
            >
              <div className="rounded-xl bg-black/25 p-4 backdrop-blur-sm">
                <h2 className="text-2xl font-semibold">{card.title}</h2>
                <p className="mt-3 text-sm leading-6 text-neutral-200">
                  {card.description}
                </p>
              </div>
            </Link>
          ))}
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-black/30 p-6 backdrop-blur-sm">
            <h2 className="text-2xl font-semibold">Popular car payment pages</h2>
            <div className="mt-5 space-y-4">
              {popularCars.map((item) => (
                <LinkCard
                  key={item.href}
                  href={item.href}
                  title={item.label}
                  text={item.text}
                />
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-black/30 p-6 backdrop-blur-sm">
            <h2 className="text-2xl font-semibold">Popular boat payment pages</h2>
            <div className="mt-5 space-y-4">
              {popularBoats.map((item) => (
                <LinkCard
                  key={item.href}
                  href={item.href}
                  title={item.label}
                  text={item.text}
                />
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-black/30 p-6 backdrop-blur-sm">
            <h2 className="text-2xl font-semibold">Popular RV payment pages</h2>
            <div className="mt-5 space-y-4">
              {popularRvs.map((item) => (
                <LinkCard
                  key={item.href}
                  href={item.href}
                  title={item.label}
                  text={item.text}
                />
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
