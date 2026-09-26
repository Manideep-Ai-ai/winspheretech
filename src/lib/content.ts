export interface NavLink {
  label: string;
  href: string;
}

export const navLinks: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Industries", href: "#industries" },
  { label: "Our Approach", href: "#approach" },
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
  { label: "Projects Delivered", value: 100, suffix: "+" },
  { label: "Technology Professionals", value: 25, suffix: "+" },
  { label: "Countries Served", value: 8, suffix: "+" },
];

export interface Service {
  index: string;
  title: string;
  description: string;
  icon: "seo" | "social" | "content" | "leads" | "ppc" | "code" | "web" | "ai" | "data" | "cloud" | "staffing";
}

export const digitalMarketingServices: Service[] = [
  {
    index: "01",
    title: "SEO Services",
    description: "Improve search visibility, attract relevant organic traffic, and build sustainable online growth.",
    icon: "seo",
  },
  {
    index: "02",
    title: "Social Media Marketing",
    description: "Build a consistent brand presence, engage your audience, and turn social platforms into business growth channels.",
    icon: "social",
  },
  {
    index: "03",
    title: "Content Marketing",
    description: "Create useful, search-friendly content that builds authority, answers customer questions, and supports business growth.",
    icon: "content",
  },
  {
    index: "04",
    title: "Lead Generation",
    description: "Attract relevant prospects and turn digital traffic and campaigns into qualified business enquiries.",
    icon: "leads",
  },
  {
    index: "05",
    title: "PPC & Paid Advertising",
    description: "Reach high-intent audiences through targeted paid campaigns designed around measurable business goals.",
    icon: "ppc",
  },
];

export const itSolutionsServices: Service[] = [
  {
    index: "01",
    title: "Software Development",
    description: "Custom software solutions designed around your business requirements, workflows, and growth objectives.",
    icon: "code",
  },
  {
    index: "02",
    title: "Web Development",
    description: "Modern, scalable websites and web applications designed for performance, usability, and business growth.",
    icon: "web",
  },
  {
    index: "03",
    title: "AI & Automation",
    description: "Apply AI and automation to improve productivity, streamline processes, and create better customer experiences.",
    icon: "ai",
  },
  {
    index: "04",
    title: "Data & Analytics",
    description: "Turn business data into actionable insights that support smarter decisions and measurable performance.",
    icon: "data",
  },
  {
    index: "05",
    title: "Cloud & DevOps",
    description: "Secure and scalable cloud solutions that support modern applications, infrastructure, and continuous delivery.",
    icon: "cloud",
  },
  {
    index: "06",
    title: "IT Staffing",
    description: "Access skilled technology professionals to support projects, technology teams, and evolving business requirements.",
    icon: "staffing",
  },
];

// Flat list for the contact form's "What do you need help with?" dropdown —
// spans both service groups plus a catch-all, so an enquiry doesn't have to
// fit one category before someone can submit it.
export const enquiryOptions: string[] = [
  "Digital Marketing",
  "SEO",
  "Social Media Marketing",
  "Content Marketing",
  "Lead Generation",
  "PPC / Paid Advertising",
  "Website Development",
  "Software Development",
  "AI & Automation",
  "Data & Analytics",
  "Cloud & DevOps",
  "IT Staffing",
  "Other",
];

export interface WhyPoint {
  title: string;
  description: string;
}

export const whyPoints: WhyPoint[] = [
  {
    title: "Business-Focused Strategy",
    description: "We focus on business goals, not just deliverables.",
  },
  {
    title: "Digital Growth Expertise",
    description: "Build visibility, engagement and qualified opportunities.",
  },
  {
    title: "Technology Capabilities",
    description: "Practical solutions across software, AI, data and cloud.",
  },
  {
    title: "Flexible Engagement",
    description: "Solutions aligned with your project and business requirements.",
  },
  {
    title: "Transparent Communication",
    description: "Clear expectations, communication and progress.",
  },
  {
    title: "Long-Term Partnership",
    description: "Support your business beyond the initial implementation.",
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
    description: "Drive online growth through digital marketing, scalable technology, customer-focused experiences, and data-driven insights.",
    capabilities: ["Digital marketing & SEO", "Storefront & checkout engineering", "Customer analytics"],
  },
  {
    name: "Healthcare",
    description: "Support digital presence, customer engagement, technology modernization, and operational efficiency.",
    capabilities: ["Digital presence & engagement", "Technology modernization", "Operational efficiency"],
  },
  {
    name: "Finance",
    description: "Build secure, scalable and data-driven digital experiences and technology solutions.",
    capabilities: ["Secure application architecture", "Data-driven experiences", "Scalable technology solutions"],
  },
  {
    name: "Hospitality",
    description: "Improve digital visibility, customer engagement, and technology-enabled business operations.",
    capabilities: ["Digital visibility & SEO", "Customer engagement", "Technology-enabled operations"],
  },
  {
    name: "Education",
    description: "Support digital engagement, web experiences, automation, and technology-enabled operations.",
    capabilities: ["Digital engagement", "Web experiences", "Automation & operations"],
  },
  {
    name: "Technology",
    description: "Help technology businesses strengthen their digital presence and build scalable software and technology solutions.",
    capabilities: ["Digital presence & marketing", "Scalable software solutions", "Technology consulting"],
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

export interface Outcome {
  title: string;
  description: string;
}

// Generic, verifiable capability statements — not case-study numbers. Swap
// for real quantified results (with client sign-off) once available; never
// invent performance figures in the meantime.
export const outcomes: Outcome[] = [
  {
    title: "Increase Online Visibility",
    description: "Improve search presence and reach relevant audiences through SEO, content, and digital marketing.",
  },
  {
    title: "Generate Qualified Opportunities",
    description: "Build digital campaigns and customer journeys designed to attract relevant prospects and business enquiries.",
  },
  {
    title: "Modernize & Scale Technology",
    description: "Improve business operations and digital capabilities through software, AI, data, and cloud solutions.",
  },
];

export interface ProcessStep {
  step: string;
  title: string;
  description: string;
}

export const processSteps: ProcessStep[] = [
  { step: "01", title: "Discover", description: "Understand your business, goals, audience, and challenges." },
  { step: "02", title: "Plan", description: "Define the right strategy, solution, scope, and priorities." },
  { step: "03", title: "Build", description: "Create and implement the agreed digital or technology solution." },
  { step: "04", title: "Launch", description: "Deploy campaigns, platforms, applications, or solutions." },
  { step: "05", title: "Measure", description: "Track performance, engagement, leads, and business outcomes." },
  { step: "06", title: "Improve", description: "Optimize continuously based on data, feedback, and business goals." },
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
  { name: "Alanati Telugu Ruchulu", logo: "/partners/alanati.png" },
  { name: "Rajeswara Traders", logo: "/partners/rajeswara-traders.png" },
  { name: "GS Associates", logo: "/partners/gs-associates.png" },
  { name: "Varahi EV Motors", logo: "/partners/varahi-ev-motors.png" },
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
