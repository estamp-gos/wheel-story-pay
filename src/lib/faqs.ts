export type FaqItem = {
  id: string;
  question: string;
  answer: string;
  category: "reports" | "pricing" | "service";
};

export const FAQ_CATEGORIES = [
  { id: "reports" as const, label: "About Reports" },
  { id: "pricing" as const, label: "Pricing & Payments" },
  { id: "service" as const, label: "Using the Service" },
];

export const FAQS: FaqItem[] = [
  {
    id: "what-is-report",
    category: "reports",
    question: "What is included in a Vehicle Check report?",
    answer:
      "Each report covers ownership history, title brands, odometer readings, accident and damage records, theft checks, open recalls, and available listing or photo history. Technical specifications help you confirm the vehicle matches what the seller claims.",
  },
  {
    id: "vin-vs-plate",
    category: "reports",
    question: "Can I search by license plate instead of VIN?",
    answer:
      "Yes. Enter a plate number and select the issuing region when prompted. Plate lookups resolve to a VIN when records allow, then run the same multi-database scan as a direct VIN search.",
  },
  {
    id: "how-accurate",
    category: "reports",
    question: "How accurate is the vehicle history data?",
    answer:
      "We aggregate records from title, insurance, auction, and recall sources. No report can guarantee every event was reported, but Vehicle Check is designed to surface the most common risk signals buyers miss — salvage brands, mileage gaps, and prior accidents.",
  },
  {
    id: "how-long",
    category: "reports",
    question: "How long does it take to get my report?",
    answer:
      "Most reports are ready within a few minutes after payment. Complex or international lookups can take slightly longer. You will receive access on-screen and by email.",
  },
  {
    id: "price",
    category: "pricing",
    question: "How much does a report cost?",
    answer:
      "A standard vehicle history report starts at our base USD price and is shown in your local currency when available. The price you see on the site is the amount charged for a single report — no subscription required.",
  },
  {
    id: "currency",
    category: "pricing",
    question: "Why is the price shown in a different currency?",
    answer:
      "We detect your location and convert the base USD price using live exchange rates so you see a familiar currency. A short note near the price explains which currency is displayed.",
  },
  {
    id: "refund",
    category: "pricing",
    question: "What is your refund policy?",
    answer:
      "If we cannot generate a report for a valid VIN due to a system error, contact support within 7 days for a full refund. Reports that return limited data because records are sparse are still considered delivered.",
  },
  {
    id: "payment",
    category: "pricing",
    question: "Which payment methods do you accept?",
    answer:
      "We accept major credit and debit cards. Payment is processed securely at checkout. You will not be enrolled in a recurring plan unless you explicitly choose a multi-report package.",
  },
  {
    id: "find-vin",
    category: "service",
    question: "Where do I find the VIN on a vehicle?",
    answer:
      "Look at the lower corner of the windshield on the driver’s side, the driver’s door jamb sticker, or the vehicle title and registration. The VIN is a 17-character code with no letter I, O, or Q.",
  },
  {
    id: "share-report",
    category: "service",
    question: "Can I share the report with a mechanic or seller?",
    answer:
      "Yes. After purchase you can download a PDF or share a secure link so a mechanic, inspector, or seller can review the same findings.",
  },
  {
    id: "international",
    category: "service",
    question: "Do you cover vehicles outside the United States?",
    answer:
      "Coverage is strongest for North American VINs. Select international markets are supported with varying depth depending on local data availability. The report will indicate which sections returned data.",
  },
  {
    id: "support",
    category: "service",
    question: "How do I contact support?",
    answer:
      "Email support@vehiclecheck.com or use the contact form. Typical first response is under two minutes during peak hours, with 24/7 access to purchased reports in your account email.",
  },
];

export const FAQ_PREVIEW_IDS = ["what-is-report", "how-long", "find-vin", "refund"];
