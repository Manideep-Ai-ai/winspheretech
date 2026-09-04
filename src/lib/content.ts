export interface NavLink {
  label: string;
  href: string;
}

export const navLinks: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "#why-us" },
  { label: "Services", href: "#services" },
  { label: "Industries", href: "#industries" },
  { label: "Careers", href: "#careers" },
  { label: "Contact", href: "#contact" },
];

// PLACEHOLDER — explicitly authorized as temporary stand-ins by the client
// until real figures are supplied. Swap `value` for verified numbers before
// this site is treated as launch-ready; nothing else about this block needs
// to change when that data lands.
export interface Stat {
  label: string;
  value: number;
  suffix: string;
}

export const stats: Stat[] = [
  { label: "Happy Clients", value: 50, suffix: "+" },
  { label: "Experts On Team", value: 25, suffix: "+" },
  { label: "Projects Delivered", value: 100, suffix: "+" },
  { label: "Years of Excellence", value: 5, suffix: "+" },
  { label: "Countries Served", value: 8, suffix: "+" },
];

export interface Service {
  index: string;
  title: string;
  description: string;
  icon: "ai" | "cloud" | "data" | "code" | "staffing" | "growth";
}

export const services: Service[] = [
  {
    index: "01",
    title: "Artificial Intelligence",
    description: "AI/ML, generative AI, and intelligent automation built into real business workflows.",
    icon: "ai",
  },
  {
    index: "02",
    title: "Cloud & DevOps",
    description: "Cloud modernization, infrastructure, and deployment pipelines built to scale.",
    icon: "cloud",
  },
  {
    index: "03",
    title: "Data & Analytics",
    description: "Data engineering, analytics, and BI that turn raw data into decisions.",
    icon: "data",
  },
  {
    index: "04",
    title: "Software Development",
    description: "Web, mobile, and enterprise applications built on modern, maintainable stacks.",
    icon: "code",
  },
  {
    index: "05",
    title: "IT Staffing",
    description: "Vetted technology talent for temporary, contract, or permanent engagements.",
    icon: "staffing",
  },
  {
    index: "06",
    title: "Digital Growth",
    description: "SEO, content, social, and paid strategy engineered around measurable results.",
    icon: "growth",
  },
];

export interface WhyPoint {
  title: string;
  description: string;
}

export const whyPoints: WhyPoint[] = [
  {
    title: "Expert technology professionals",
    description: "Every engagement is staffed and reviewed by senior practitioners.",
  },
  {
    title: "Flexible engagement models",
    description: "Project-based, staff-augmentation, or fully managed delivery.",
  },
  {
    title: "End-to-end service delivery",
    description: "From discovery through production support, under one accountable team.",
  },
  {
    title: "Quality & on-time commitment",
    description: "Scoped, tested, and shipped against the timeline we agree to.",
  },
  {
    title: "Scalable & cost-effective solutions",
    description: "Architecture that grows with the business instead of being rebuilt for it.",
  },
  {
    title: "Global delivery, local accountability",
    description: "Teams operating across time zones with a single point of ownership.",
  },
];

export interface Industry {
  name: string;
  description: string;
  capabilities: string[];
}

export const industries: Industry[] = [
  {
    name: "E-Commerce",
    description: "Scalable storefronts, recommendation engines, and checkout systems built for peak traffic.",
    capabilities: ["Storefront & catalog engineering", "Checkout & payments integration", "Search & recommendations"],
  },
  {
    name: "Information Technology",
    description: "Platform modernization, DevOps, and managed infrastructure for technology-first organizations.",
    capabilities: ["Legacy platform modernization", "DevOps & CI/CD pipelines", "Managed infrastructure"],
  },
  {
    name: "Hospitality",
    description: "Booking systems, guest experience platforms, and operational analytics for hospitality brands.",
    capabilities: ["Booking & reservation systems", "Guest experience platforms", "Operational analytics"],
  },
  {
    name: "Entertainment",
    description: "Streaming, content delivery, and audience analytics built to handle scale and latency demands.",
    capabilities: ["Streaming & content delivery", "Audience analytics", "Scale-ready infrastructure"],
  },
  {
    name: "Healthcare",
    description: "Compliance-aware data platforms and patient-facing systems built for reliability and privacy.",
    capabilities: ["Compliance-aware architecture", "Patient-facing systems", "Data privacy & security"],
  },
  {
    name: "Finance",
    description: "Secure, compliant systems for payments, risk analytics, and financial reporting.",
    capabilities: ["Payments infrastructure", "Risk & fraud analytics", "Regulatory reporting"],
  },
];

export interface TechCategory {
  category: string;
  items: string[];
}

export const techCategories: TechCategory[] = [
  { category: "AI & Data", items: ["Python", "OpenAI", "PostgreSQL"] },
  { category: "Cloud", items: ["AWS", "Azure", "Docker", "Kubernetes"] },
  { category: "Frontend", items: ["React", "TypeScript"] },
  { category: "Backend", items: ["Node.js"] },
];

export const techStack: string[] = techCategories.flatMap((c) => c.items);

export interface CaseStudy {
  industry: string;
  title: string;
}

// No case studies have been published yet. Per the brief this section was
// scoped against, fabricating client names/results is off the table — this
// is the section's architecture, ready for real projects to slot into.
export const caseStudies: CaseStudy[] = [
  { industry: "AI", title: "Case study coming soon" },
  { industry: "Cloud", title: "Case study coming soon" },
  { industry: "Data", title: "Case study coming soon" },
];

export interface ProcessStep {
  step: string;
  title: string;
  description: string;
}

export const processSteps: ProcessStep[] = [
  { step: "01", title: "Discovery", description: "Understand business goals, users, and technical requirements." },
  { step: "02", title: "Planning", description: "Define architecture, roadmap, and delivery strategy." },
  { step: "03", title: "Design", description: "Experience and system design validated with stakeholders." },
  { step: "04", title: "Development", description: "Iterative build with continuous review and testing." },
  { step: "05", title: "Deployment", description: "Production rollout with monitoring from day one." },
  { step: "06", title: "Support", description: "Ongoing optimization, SLAs, and dedicated support." },
];

export interface Testimonial {
  name: string;
  role: string;
  quote: string;
}

// Verbatim from the live site's testimonials — not invented.
export const testimonials: Testimonial[] = [
  {
    name: "Sumanth",
    role: "Client",
    quote: "Their digital marketing expertise drove remarkable growth in our online visibility within months.",
  },
  {
    name: "Leema",
    role: "Client",
    quote: "WinSphere transformed our IT infrastructure and meaningfully improved system performance.",
  },
];

export interface Partner {
  name: string;
  logo: string;
  /** True when the logo mark itself is white/light — it needs a dark chip
   *  behind it or it disappears on a white card. */
  onDark?: boolean;
}

// Logo files expected at public/partners/<file>. Swap `name` for the real
// company name once confirmed — it's currently a best-guess label from the
// logo mark alone.
export const partners: Partner[] = [
  { name: "24 Seven", logo: "/partners/24seven.png", onDark: true },
  { name: "Business Firm", logo: "/partners/businessfirm.png" },
  { name: "Lotus", logo: "/partners/lotus.png" },
];

export interface SocialLink {
  name: "LinkedIn" | "Instagram" | "Facebook";
  url: string;
}

export const contactInfo = {
  email: "Madhusudan.Adepu@winspheretech.com",
  phone: "+91-9494409785",
  location: "Begumpet, Hyderabad, Telangana",
  social: [
    { name: "LinkedIn", url: "https://www.linkedin.com/company/winspheretech/" },
    { name: "Instagram", url: "https://www.instagram.com/winspheretech/" },
    { name: "Facebook", url: "https://www.facebook.com/winspheretech/" },
  ] satisfies SocialLink[],
};
