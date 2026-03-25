import Link from "next/link";

export default function LinkCard({
  href,
  title,
  description,
}: {
  href: string;
  title: string;
  description: string;
}) {
  return (
    <Link
      href={href}
      className="block rounded-xl border border-white/10 bg-black/30 p-4 transition hover:border-white/20 hover:bg-black/40"
    >
      <div className="text-base font-semibold text-white">{title}</div>
      <p className="mt-2 text-sm leading-6 text-neutral-300">{description}</p>
    </Link>
  );
}
