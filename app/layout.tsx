import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://payment-calculator.example.com"),
  title: {
    default: "Payment Calculator",
    template: "%s | Payment Calculator",
  },
  description:
    "Estimate car and boat loan payments with fast, clean payment breakdowns.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}
