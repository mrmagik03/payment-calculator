import type { MetadataRoute } from "next";
import { buildAmountExamples, buildRateExamples, buildTermExamples } from "@/lib/loan";
import { SITE_URL } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const pages: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, lastModified: now, changeFrequency: "daily", priority: 1 },
  ];

  for (const amount of buildAmountExamples("car")) {
    for (const rate of buildRateExamples()) {
      for (const term of buildTermExamples("car")) {
        pages.push({
          url: `${SITE_URL}/car-payment/${amount}/${rate}/${term}`,
          lastModified: now,
          changeFrequency: "weekly",
          priority: 0.8,
        });
      }
    }
  }

  for (const amount of buildAmountExamples("boat")) {
    for (const rate of buildRateExamples()) {
      for (const term of buildTermExamples("boat")) {
        pages.push({
          url: `${SITE_URL}/boat-payment/${amount}/${rate}/${term}`,
          lastModified: now,
          changeFrequency: "weekly",
          priority: 0.8,
        });
      }
    }
  }

  return pages;
}
