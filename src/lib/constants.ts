export const SITE_NAME = "Vehicle Check";
export const SITE_TAGLINE = "Know the car before you buy it";
export const BASE_PRICE_USD = 49.99;
export const SUPPORT_EMAIL = "support@vehiclecheck.com";
export const SUPPORT_PHONE = "+1 (888) 555-0142";
export const OFFICE_ADDRESS = "1200 Market Street, Suite 400, San Francisco, CA 94102";

export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/faqs", label: "FAQs" },
] as const;

export const TRUST_STATS = [
  { value: 70, suffix: "+", label: "Databases checked" },
  { value: 45000, suffix: "+", label: "Daily searches" },
  { value: 98, suffix: "%", label: "Customer satisfaction" },
] as const;

export const EDUCATION_STATS = [
  { value: 1, suffix: " in 5", label: "used cars has an undisclosed accident history" },
  { value: 23, suffix: "%", label: "of listings show odometer inconsistencies" },
  { value: 2, suffix: "M+", label: "vehicles recalled in the last 12 months" },
] as const;

export const FEATURES = [
  {
    title: "Odometer Check",
    description: "Flag rollbacks and mileage gaps against title and service records.",
    icon: "Gauge",
    image: "/images/feature-odometer.svg",
  },
  {
    title: "Ownership History",
    description: "See how many owners, title brands, and registration states appear.",
    icon: "Users",
    image: "/images/feature-ownership.svg",
  },
  {
    title: "Listing & Photo History",
    description: "Review past sale listings and photo evidence when available.",
    icon: "Images",
    image: "/images/feature-photos.svg",
  },
  {
    title: "Damage & Accident Check",
    description: "Surface reported collisions, airbag deployments, and salvage events.",
    icon: "CarFront",
    image: "/images/feature-damage.svg",
  },
  {
    title: "Technical Specifications",
    description: "Confirm trim, engine, drivetrain, and factory equipment details.",
    icon: "Settings2",
    image: "/images/feature-specs.svg",
  },
  {
    title: "Theft & Stolen Records",
    description: "Cross-check theft reports and recovery status before you commit.",
    icon: "ShieldAlert",
    image: "/images/feature-theft.svg",
  },
] as const;

export const HOW_IT_WORKS = [
  {
    step: "01",
    title: "Enter a VIN or plate",
    description: "Type the 17-character VIN or license plate into the search form.",
  },
  {
    step: "02",
    title: "We scan multiple databases",
    description: "Our system queries title, insurance, auction, and recall sources in parallel.",
  },
  {
    step: "03",
    title: "Review a clear report",
    description: "Get a structured history report in minutes — ready to share or download.",
  },
  {
    step: "04",
    title: "Buy with confidence",
    description: "Use the findings to negotiate price, walk away, or move forward safely.",
  },
] as const;

export const TESTIMONIALS = [
  {
    name: "Marcus Chen",
    role: "First-time buyer, Austin TX",
    quote:
      "The report caught a prior flood title the seller never mentioned. Saved me from a $18k mistake.",
    rating: 5,
    avatar: "/images/avatar-marcus.svg",
  },
  {
    name: "Priya Nair",
    role: "Private seller, Chicago IL",
    quote:
      "I run Vehicle Check before every listing. Buyers trust the transparency and close faster.",
    rating: 5,
    avatar: "/images/avatar-priya.svg",
  },
  {
    name: "James Okafor",
    role: "Fleet manager, Atlanta GA",
    quote:
      "We check every acquisition. The ownership and odometer sections alone pay for themselves.",
    rating: 5,
    avatar: "/images/avatar-james.svg",
  },
] as const;

export const VEHICLE_MAKES = [
  "Acura", "Alfa Romeo", "Audi", "BMW", "Buick", "Cadillac", "Chevrolet", "Chrysler",
  "Dodge", "Fiat", "Ford", "GMC", "Honda", "Hyundai", "Infiniti", "Jaguar",
  "Jeep", "Kia", "Land Rover", "Lexus", "Lincoln", "Mazda", "Mercedes-Benz", "Mini",
  "Mitsubishi", "Nissan", "Porsche", "Ram", "Subaru", "Tesla", "Toyota", "Volkswagen",
  "Volvo",
] as const;

export const SUPPORT_METRICS = [
  { value: "98%", label: "Satisfaction rate" },
  { value: "< 2 min", label: "Avg. response time" },
  { value: "24/7", label: "Report availability" },
] as const;
