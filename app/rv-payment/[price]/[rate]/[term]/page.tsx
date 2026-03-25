import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import JsonLd from "@/components/JsonLd";
import { calculateLoanPayment, formatCurrency, toNumber } from "@/lib/loan";
import { LOAN_TYPES } from "@/lib/loanTypes";

type PageProps = {
  params: Promise<{
    price: string;
    rate: string;
    term: string;
  }>;
};

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://payment-calculator.co";

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { price, rate, term } = await params;

  const loanAmount = toNumber(price);
  const apr = toNumber(rate);
  const months = toNumber(term);

  if (!loanAmount || !apr || !months) {
    return {
      title: "RV Payment Calculator",
    };
  }

  return {
    title: `${formatMoney(loanAmount)} RV Payment at ${apr}% for ${months} Months`,
    description: `Estimate the monthly RV payment for ${formatMoney(
      loanAmount
    )} financed at ${apr}% APR for ${months} months.`,
    alternates: {
      canonical: `${SITE_URL}/rv-payment/${loanAmount}/${apr}/${months}`,
    },
  };
}

export default async function RvPaymentPage({ params }: PageProps) {
  const { price, rate, term } = await params;

  const loanAmount = toNumber(price);
  const apr = toNumber(rate);
  const months = toNumber(term);

  if (!loanAmount || !apr || !months) {
    notFound();
  }

  const theme = LOAN_TYPES.rv;
  const result = calculateLoanPayment(loanAmount, apr, months);

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `What is the payment on ${formatMoney(
          loanAmount
        )} at ${apr}% for ${months} months?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `The estimated monthly RV payment is ${formatMoney(
            result.monthlyPayment
          )}.`,
        },
      },
    ],
  };

  return (
    <>
      <JsonLd data={faqJsonLd} />

      <main className={`min-h-screen text-white ${theme.backgroundClassName}`}>
        <div className="border-b border-white/10 bg-black/20">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-5 md:px-6">
            <Link href="/" className="text-sm font-semibold tracking-tight">
              Payment Calculator
            </Link>

            <div className="flex items-center gap-5 text-sm text-neutral-300">
              <Link href="/" className="hover:text-white">
                Home
              </Link>
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
          <div className="mb-8 text-sm text-neutral-300">
            <Link href="/" className="hover:text-white">
              Home
            </Link>
            <span className="mx-2">/</span>
            <span>RV Payment</span>
          </div>

          <section className="rounded-2xl border border-white/10 bg-black/30 p-8 shadow-sm backdrop-blur-sm">
            <h1 className="text-3xl font-bold tracking-tight md:text-5xl">
              {formatMoney(loanAmount)} RV Payment at {apr}% for {months} Months
            </h1>

            <p className="mt-4 max-w-3xl text-lg text-neutral-200">
              Estimate your monthly RV payment, total paid over the life of the
              loan, and total interest cost.
            </p>
          </section>

          <section className="mt-8 grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-black/30 p-6 backdrop-blur-sm">
              <p className="text-sm text-neutral-300">Monthly payment</p>
              <p className="mt-2 text-3xl font-semibold">
                {formatMoney(result.monthlyPayment)}
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-black/30 p-6 backdrop-blur-sm">
              <p className="text-sm text-neutral-300">Total paid</p>
              <p className="mt-2 text-3xl font-semibold">
                {formatMoney(result.totalPaid)}
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-black/30 p-6 backdrop-blur-sm">
              <p className="text-sm text-neutral-300">Total interest</p>
              <p className="mt-2 text-3xl font-semibold">
                {formatMoney(result.totalInterest)}
              </p>
            </div>
          </section>

          <section className="mt-8 grid gap-6 lg:grid-cols-[1.3fr_0.9fr]">
            <div className="rounded-2xl border border-white/10 bg-black/30 p-6 backdrop-blur-sm">
              <h2 className="text-2xl font-semibold">RV loan breakdown</h2>

              <div className="mt-6 overflow-hidden rounded-xl border border-white/10">
                <div className="grid grid-cols-2 border-b border-white/10 bg-black/30">
                  <div className="px-4 py-3 text-sm font-medium text-neutral-200">
                    Category
                  </div>
                  <div className="px-4 py-3 text-sm font-medium text-neutral-200">
                    Amount
                  </div>
                </div>

                <div className="grid grid-cols-2 border-b border-white/10">
                  <div className="px-4 py-3 text-sm text-neutral-300">
                    Loan amount
                  </div>
                  <div className="px-4 py-3 text-sm font-medium">
                    {formatMoney(loanAmount)}
                  </div>
                </div>

                <div className="grid grid-cols-2 border-b border-white/10">
                  <div className="px-4 py-3 text-sm text-neutral-300">APR</div>
                  <div className="px-4 py-3 text-sm font-medium">{apr}%</div>
                </div>

                <div className="grid grid-cols-2 border-b border-white/10">
                  <div className="px-4 py-3 text-sm text-neutral-300">
                    Loan term
                  </div>
                  <div className="px-4 py-3 text-sm font-medium">
                    {months} months
                  </div>
                </div>

                <div className="grid grid-cols-2 border-b border-white/10">
                  <div className="px-4 py-3 text-sm text-neutral-300">
                    Monthly payment
                  </div>
                  <div className="px-4 py-3 text-sm font-medium">
                    {formatMoney(result.monthlyPayment)}
                  </div>
                </div>

                <div className="grid grid-cols-2 border-b border-white/10">
                  <div className="px-4 py-3 text-sm text-neutral-300">
                    Total paid
                  </div>
                  <div className="px-4 py-3 text-sm font-medium">
                    {formatMoney(result.totalPaid)}
                  </div>
                </div>

                <div className="grid grid-cols-2">
                  <div className="px-4 py-3 text-sm text-neutral-300">
                    Total interest
                  </div>
                  <div className="px-4 py-3 text-sm font-medium">
                    {formatMoney(result.totalInterest)}
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-black/30 p-6 backdrop-blur-sm">
              <h2 className="text-2xl font-semibold">Explore more calculators</h2>

              <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
                <Link
                  href="/car-payment/50000/6/72"
                  className="rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-neutral-200 transition hover:bg-black/40"
                >
                  Car payment example
                </Link>
                <Link
                  href="/boat-payment/70000/7/120"
                  className="rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-neutral-200 transition hover:bg-black/40"
                >
                  Boat payment example
                </Link>
                <Link
                  href="/rv-payment/90000/7/180"
                  className="rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-neutral-200 transition hover:bg-black/40"
                >
                  RV payment example
                </Link>
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
