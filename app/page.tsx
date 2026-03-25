import LinkCard from "@/app/components/LinkCard";
import SiteShell from "@/app/components/SiteShell";

export default function HomePage() {
  return (
    <SiteShell>
      <section className="rounded-2xl border border-white/10 bg-black/30 p-8 shadow-sm">
        <h1 className="text-4xl font-bold tracking-tight text-white md:text-6xl">
          Payment calculators that answer the question fast
        </h1>
        <p className="mt-4 max-w-3xl text-lg leading-8 text-neutral-300">
          Estimate car and boat loan payments with clean monthly payment, total cost,
          and interest breakdowns.
        </p>

        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <LinkCard
            href="/car-payment/50000/6/72"
            title="Car payment calculator"
            description="Estimate monthly car loan payments for price, APR, and term combinations."
          />
          <LinkCard
            href="/boat-payment/50000/7/120"
            title="Boat payment calculator"
            description="Estimate monthly boat loan payments with longer terms and higher loan amounts."
          />
        </div>
      </section>

      <section className="mt-8 grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl border border-white/10 bg-black/30 p-6 shadow-sm">
          <h2 className="text-2xl font-semibold text-white">Popular car payment pages</h2>
          <div className="mt-4 space-y-3">
            <LinkCard href="/car-payment/30000/6/60" title="$30,000 car payment" description="Common mid-range car payment example with a 60 month term." />
            <LinkCard href="/car-payment/50000/7/72" title="$50,000 car payment" description="Estimate the monthly payment on a larger car loan." />
            <LinkCard href="/car-payment/75000/8/84" title="$75,000 car payment" description="See what a high-dollar car loan costs monthly." />
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-black/30 p-6 shadow-sm">
          <h2 className="text-2xl font-semibold text-white">Popular boat payment pages</h2>
          <div className="mt-4 space-y-3">
            <LinkCard href="/boat-payment/30000/6/84" title="$30,000 boat payment" description="Entry-level boat loan estimate with a shorter term." />
            <LinkCard href="/boat-payment/70000/7/120" title="$70,000 boat payment" description="Estimate monthly payment for a popular boat loan size." />
            <LinkCard href="/boat-payment/110000/8/180" title="$110,000 boat payment" description="Long-term payment example for a larger financed boat." />
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
