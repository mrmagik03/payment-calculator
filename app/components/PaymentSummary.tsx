export default function PaymentSummary({
  items,
}: {
  items: { label: string; value: string }[];
}) {
  return (
    <section className="mt-8 grid gap-4 md:grid-cols-4">
      {items.map((item) => (
        <div
          key={item.label}
          className="rounded-2xl border border-white/10 bg-black/30 p-6 shadow-sm"
        >
          <p className="text-sm text-neutral-400">{item.label}</p>
          <p className="mt-2 text-3xl font-semibold text-white">{item.value}</p>
        </div>
      ))}
    </section>
  );
}
