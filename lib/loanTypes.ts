export type LoanType = "car" | "boat" | "rv";

export type LoanTheme = {
  label: string;
  routeBase: string;
  heroTitle: string;
  heroDescription: string;
  backgroundClassName: string;
  accentClassName: string;
};

export const LOAN_TYPES: Record<LoanType, LoanTheme> = {
  car: {
    label: "Car",
    routeBase: "/car-payment",
    heroTitle: "Car payment calculator",
    heroDescription:
      "Estimate monthly car payments based on loan amount, interest rate, and loan term.",
    backgroundClassName:
      "bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.22),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(147,197,253,0.14),transparent_28%),linear-gradient(to_bottom_right,#09090b,#111827,#0f172a)]",
    accentClassName: "from-blue-400/20 to-sky-300/10",
  },

  boat: {
    label: "Boat",
    routeBase: "/boat-payment",
    heroTitle: "Boat payment calculator",
    heroDescription:
      "Estimate monthly boat payments with a dark marine-inspired calculator layout.",
    backgroundClassName:
      "bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.20),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(56,189,248,0.14),transparent_28%),linear-gradient(to_bottom_right,#04131c,#082032,#0f172a)]",
    accentClassName: "from-cyan-400/20 to-sky-300/10",
  },

  rv: {
    label: "RV",
    routeBase: "/rv-payment",
    heroTitle: "RV payment calculator",
    heroDescription:
      "Estimate monthly RV payments with pricing, term, and interest rate inputs.",
    backgroundClassName:
      "bg-[radial-gradient(circle_at_top_left,rgba(245,158,11,0.18),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(251,191,36,0.12),transparent_28%),linear-gradient(to_bottom_right,#120d06,#1f2937,#111827)]",
    accentClassName: "from-amber-400/20 to-orange-300/10",
  },
};

export function getLoanTheme(type: string): LoanTheme | null {
  if (type === "car") return LOAN_TYPES.car;
  if (type === "boat") return LOAN_TYPES.boat;
  if (type === "rv") return LOAN_TYPES.rv;
  return null;
}
