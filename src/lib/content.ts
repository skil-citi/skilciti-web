import {
  AppWindow,
  Banknote,
  Compass,
  Gem,
  GraduationCap,
  Globe,
  Handshake,
  HeartPulse,
  Landmark,
  Lightbulb,
  type LucideIcon,
  Palette,
  Rocket,
  ShieldCheck,
  ShoppingCart,
  Smartphone,
  Terminal,
  Truck,
  Wrench,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/* Company                                                             */
/* ------------------------------------------------------------------ */
export const site = {
  name: "Skilciti",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://skilciti.com",
  tagline: "Software & systems, engineered to scale.",
  description:
    "Skilciti is a Nairobi-based software company building mobile apps, web apps, custom software, digital registries and management systems for startups, businesses and public institutions — from consultation to launch and beyond.",
  email: "info@skilciti.com",
  phone: "+254 722 743354",
  phoneHref: "+254722743354",
  location: "Nairobi, Kenya",
} as const;

export const nav = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Contact", href: "/contact" },
] as const;

/* ------------------------------------------------------------------ */
/* Services                                                            */
/* ------------------------------------------------------------------ */
export type ServiceId =
  | "custom-software"
  | "mobile-apps"
  | "web-apps"
  | "websites"
  | "ui-ux"
  | "consulting"
  | "support";

export type Service = {
  id: ServiceId;
  title: string;
  short: string;
  description: string;
  features: string[];
  icon: LucideIcon;
};

export const services: Service[] = [
  {
    id: "custom-software",
    title: "Custom Software Development",
    short: "Custom Software",
    description:
      "Bespoke platforms, management systems, digital registries and integrations shaped around how your organization actually works — built to solve your specific goals, not someone else's template.",
    features: [
      "Management systems & digital registries",
      "Business process automation",
      "APIs & third-party integrations",
      "Admin dashboards & internal tools",
    ],
    icon: Terminal,
  },
  {
    id: "mobile-apps",
    title: "Mobile App Development",
    short: "Mobile Apps",
    description:
      "Engaging, feature-rich Android and iOS apps — taking you from the first idea all the way to a polished market launch.",
    features: [
      "Native & cross-platform builds",
      "Offline-first experiences",
      "Push notifications & payments",
      "App Store & Play Store release",
    ],
    icon: Smartphone,
  },
  {
    id: "web-apps",
    title: "Web App Development",
    short: "Web Apps",
    description:
      "Dynamic, responsive and secure web applications tailored to your business — with refined interfaces and the capability to back them up.",
    features: [
      "SaaS platforms & client portals",
      "Progressive web apps",
      "Secure auth & role-based access",
      "Real-time dashboards",
    ],
    icon: AppWindow,
  },
  {
    id: "websites",
    title: "Website Design & Development",
    short: "Websites",
    description:
      "Visually stunning, highly functional websites engineered for speed, search visibility and conversions — on every screen size.",
    features: [
      "Marketing & brand websites",
      "E-commerce storefronts",
      "CMS integration",
      "SEO & Core Web Vitals tuning",
    ],
    icon: Globe,
  },
  {
    id: "ui-ux",
    title: "UI/UX Design",
    short: "UI/UX Design",
    description:
      "Intuitive, visually appealing design that captivates audiences and simplifies every interaction — grounded in how real people use your product.",
    features: [
      "User research & journey mapping",
      "Wireframes & clickable prototypes",
      "Design systems",
      "Usability testing",
    ],
    icon: Palette,
  },
  {
    id: "consulting",
    title: "Systems Build & Consultation",
    short: "Systems Consulting",
    description:
      "Architecture reviews, technology roadmaps and hands-on system builds — so you pick the right foundations before a single line of code is written.",
    features: [
      "Architecture & tech-stack advisory",
      "System audits & modernization",
      "E-government & digital registry design",
      "Digital transformation roadmaps",
    ],
    icon: Compass,
  },
  {
    id: "support",
    title: "Maintenance & Support",
    short: "Maintenance & Support",
    description:
      "Ongoing support, optimization and troubleshooting that keeps your apps and websites fast, secure and continuously improving after launch.",
    features: [
      "Monitoring & incident response",
      "Security patches & updates",
      "Performance optimization",
      "Continuous feature iteration",
    ],
    icon: Wrench,
  },
];

/* ------------------------------------------------------------------ */
/* Process                                                             */
/* ------------------------------------------------------------------ */
export const processSteps = [
  {
    title: "Discover",
    body: "We learn your business, your users and your constraints — then define what success actually looks like before anything is built.",
  },
  {
    title: "Design",
    body: "System architecture, UX flows and interface prototypes, validated with you early so the build starts on solid ground.",
  },
  {
    title: "Build",
    body: "Iterative sprints, clean tested code and regular demos — you see real progress, not status reports.",
  },
  {
    title: "Launch",
    body: "Secure, monitored releases to the cloud and app stores, with a smooth handover and documentation.",
  },
  {
    title: "Evolve",
    body: "We stay alongside you to support, optimize and grow the product as your business changes.",
  },
] as const;

/* ------------------------------------------------------------------ */
/* Industries & values (from the existing site)                        */
/* ------------------------------------------------------------------ */
export const industries: { name: string; blurb: string; icon: LucideIcon }[] = [
  {
    name: "E-commerce",
    blurb: "Storefronts, checkouts and inventory systems that turn browsers into buyers.",
    icon: ShoppingCart,
  },
  {
    name: "Healthcare",
    blurb: "Secure patient, booking and records platforms that put care first.",
    icon: HeartPulse,
  },
  {
    name: "Education",
    blurb: "Learning platforms and school systems that make teaching scale.",
    icon: GraduationCap,
  },
  {
    name: "Finance",
    blurb: "Reliable, auditable fintech and back-office software you can trust.",
    icon: Banknote,
  },
  {
    name: "Logistics",
    blurb: "Tracking, dispatch and fleet tools that keep goods and data moving.",
    icon: Truck,
  },
  {
    name: "Government",
    blurb: "Digital registries and management systems that make public services faster and more transparent.",
    icon: Landmark,
  },
  {
    name: "Startups",
    blurb: "MVPs and products built fast — and architected to grow with you.",
    icon: Rocket,
  },
];

export const values: { title: string; body: string; icon: LucideIcon }[] = [
  {
    title: "Innovation",
    body: "We embrace creativity and forward-thinking methods to find smarter ways of solving problems.",
    icon: Lightbulb,
  },
  {
    title: "Excellence",
    body: "High standards in every line of code, every pixel and every deliverable — no exceptions.",
    icon: Gem,
  },
  {
    title: "Collaboration",
    body: "We work as partners, in the open, side by side with you to achieve your goals.",
    icon: Handshake,
  },
  {
    title: "Integrity",
    body: "Relationships built on transparency and trust, from the first call to long after launch.",
    icon: ShieldCheck,
  },
];

/* ------------------------------------------------------------------ */
/* Toolkit — edit freely to match the real stack                       */
/* ------------------------------------------------------------------ */
export const toolkit: { group: string; items: string[] }[] = [
  { group: "Frontend", items: ["Next.js", "React", "TypeScript", "Tailwind CSS"] },
  { group: "Mobile", items: ["Flutter", "React Native", "Swift", "Kotlin"] },
  { group: "Backend", items: ["Node.js", "Python", "PostgreSQL", "REST & GraphQL"] },
  { group: "Cloud & DevOps", items: ["AWS", "Docker", "CI/CD", "Vercel"] },
  { group: "Design", items: ["Figma", "Design Systems", "Prototyping", "User Testing"] },
];

export const marqueeItems = [
  "Web Apps",
  "Mobile Apps",
  "Custom Software",
  "Digital Registries",
  "UI/UX Design",
  "Systems Architecture",
  "Management Systems",
  "Cloud & DevOps",
  "E-commerce",
  "APIs & Integrations",
  "Maintenance & Support",
];
