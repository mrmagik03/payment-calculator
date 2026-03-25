import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/app/components/JsonLd";
import PaymentBreakdown from "@/app/components/PaymentBreakdown";
import PaymentLinks from "@/app/components/PaymentLinks";
import PaymentSummary from "@/app/components/PaymentSummary";
import SiteShell from "@/app/components/SiteShell";
import {
  calculateLoanPayment,
  clamp,
  formatCurrency,
  toNumber,
} from "@/lib/loan";
import { SITE_URL } from "@/lib/seo";

export const dynamic = "force-dynamic";

type PageProps = {
  params: Promise<{ price: string; rate: string; term: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { price, rate, term } = await params;
  const loanAmount = clamp(toNumber(price), 10000, 500000);
  const apr = clamp(toNumber(rate), 0, 25);
  const months = clamp(toNumber(term), 12, 240);

  return {
    title: `${formatCurrency(loanAmount, 0)} Boat Payment at ${apr}% for ${months} Months`,
    description: `Estimate the monthly payment, total cost, and interest on a ${formatCurrency(
      loanAmount,
      0
    )} boat loan at ${apr}% for ${months} months.`,
    alternates: {
      canonical: `${SITE_URL}/boat-payment/${loanAmount}/${apr}/${months}`,
    },
  };
}

export default async function BoatPaymentPage({ params }: PageProps) {
  const { price, rate, term } = await params;
  const loanAmount = clamp(toNumber(price), 10000, 500000);
  const apr = clamp(toNumber(rate), 0, 25);
  const months = clamp(toNumber(term), 12, 240);

  const { monthlyPayment, totalPaid, totalInterest } = calculateLoanPayment(
    loanAmount,
    apr,
    months
  );

  const priceLabel = formatCurrency(loanAmount, 0);
  const monthlyLabel = formatCurrency(monthlyPayment);
  const totalPaidLabel = formatCurrency(totalPaid);
  const interestLabel = formatCurrency(totalInterest);

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Boat Payment", item: `${SITE_URL}/boat-payment/${loanAmount}/${apr}/${months}` },
    ],
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `What is the payment on ${priceLabel} at ${apr}% for ${months} months?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `The estimated monthly payment is ${monthlyLabel}. Total paid over the full term is ${totalPaidLabel}, including ${interestLabel} in interest.`,
        },
      },
    ],
  };

  return (
    <>
      <JsonLd data={breadcrumbJsonLd} />
      <JsonLd data={faqJsonLd} />

      <SiteShell>
        <div className="mb-8 text-sm text-neutral-400">
          <Link href="/" className="hover:text-white">Home</Link>
          <span className="mx-2">/</span>
          <span>Boat Payment</span>
        </div>

        <section className="rounded-2xl border border-white/10 bg-black/30 p-8 shadow-sm">
          <h1 className="text-3xl font-bold tracking-tight text-white md:text-5xl">
            {priceLabel} Boat Payment at {apr}% for {months} Months
          </h1>
          <p className="mt-4 max-w-3xl text-lg text-neutral-300">
            The estimated monthly payment on a <strong>{priceLabel}</strong> boat loan at <strong>{apr}% APR</strong> for <strong>{months} months</strong> is about <strong>{monthlyLabel}</strong>.
          </p>
        </section>

        <PaymentSummary
          items={[
            { label: "Monthly payment", value: monthlyLabel },
            { label: "Loan amount", value: priceLabel },
            { label: "Total paid", value: totalPaidLabel },
            { label: "Interest paid", value: interestLabel },
          ]}
        />

        <section className="mt-8 grid gap-6 lg:grid-cols-[1.4fr_0.9fr]">
          <PaymentBreakdown
            title="Boat loan breakdown"
            rows={[
              { label: "Loan amount", value: priceLabel },
              { label: "APR", value: `${apr}%` },
              { label: "Term", value: `${months} months` },
              { label: "Monthly payment", value: monthlyLabel },
              { label: "Total paid", value: totalPaidLabel },
              { label: "Total interest", value: interestLabel },
            ]}
          />

          <PaymentLinks type="boat" amount={loanAmount} rate={apr} term={months} />
        </section>
      </SiteShell>
    </>
  );
}
