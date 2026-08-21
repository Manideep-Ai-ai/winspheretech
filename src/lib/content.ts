export interface NavLink {
  label: string;
  href: string;
}

export const navLinks: NavLink[] = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "Industries", href: "#industries" },
  { label: "Careers", href: "#careers" },
  { label: "About Us", href: "#why-us" },
  { label: "Contact", href: "#contact" },
];

export interface Stat {
  label: string;
  value: number;
  suffix: string;
}

export const stats: Stat[] = [
  { label: "Happy Clients", value: 150, suffix: "+" },
  { label: "Experts On Team", value: 60, suffix: "+" },
  { label: "Projects Delivered", value: 300, suffix: "+" },
  { label: "Years of Excellence", value: 8, suffix: "+" },
  { label: "Countries Served", value: 12, suffix: "+" },
];

export interface Service {
  title: string;
  description: string;
  icon: "ai" | "cloud" | "code" | "staffing" | "data" | "growth";
}

export const services: Service[] = [
  {
    title: "Artificial Intelligence",
    description:
      "Intelligent automation and data-driven insights engineered to keep your business ahead in a digital-first world.",
    icon: "ai",
  },
  {
    title: "Business Solutions",
    description:
      "Results-driven services that streamline operations and raise efficiency, from strategy through execution.",
    icon: "cloud",
  },
  {
    title: "Web Development",
    description:
      "Responsive, user-friendly websites built on modern stacks and creative approaches, from prototype to production.",
    icon: "code",
  },
  {
    title: "IT Staffing",
    description:
      "Connecting organizations with vetted, skilled technology professionals for temporary, contract, or permanent roles.",
    icon: "staffing",
  },
  {
    title: "Big Data Solutions",
    description:
      "Advanced analytics and real-time insights that turn raw data into business opportunities.",
    icon: "data",
  },
  {
    title: "Digital Marketing",
    description:
      "Tailored SEO, social, content, and PPC strategies that grow your brand, drive traffic, and deliver measurable results.",
    icon: "growth",
  },
];

export interface WhyPoint {
  title: string;
  description: string;
}

export const whyPoints: WhyPoint[] = [
  {
    title: "Global delivery, local accountability",
    description:
      "Teams operating across time zones with a single point of ownership for every engagement.",
  },
  {
    title: "Engineering-first culture",
    description:
      "Every solution is built and reviewed by senior practitioners, not templated out by juniors.",
  },
  {
    title: "Security & compliance built in",
    description:
      "Zero-trust defaults, audited pipelines, and compliance-aware architecture from day one.",
  },
  {
    title: "Outcomes over output",
    description:
      "We measure success in business metrics moved, not hours billed or tickets closed.",
  },
];

export interface Industry {
  name: string;
  description: string;
}

export const industries: Industry[] = [
  {
    name: "E-Commerce",
    description:
      "Scalable storefronts, recommendation engines, and checkout systems built for peak traffic.",
  },
  {
    name: "Information Technology",
    description:
      "Platform modernization, DevOps, and managed infrastructure for technology-first organizations.",
  },
  {
    name: "Hospitality",
    description:
      "Booking systems, guest experience platforms, and operational analytics for hospitality brands.",
  },
  {
    name: "Entertainment",
    description:
      "Streaming, content delivery, and audience analytics built to handle scale and latency demands.",
  },
  {
    name: "Healthcare",
    description:
      "HIPAA-aware data platforms and patient-facing systems built for reliability and privacy.",
  },
  {
    name: "Finance",
    description:
      "Secure, compliant systems for payments, risk analytics, and financial reporting.",
  },
];

export const techStack: string[] = [
  "Python",
  "React",
  "Node.js",
  "AWS",
  "Azure",
  "OpenAI",
  "Docker",
  "Kubernetes",
  "TypeScript",
  "PostgreSQL",
];

export interface ProcessStep {
  step: string;
  title: string;
  description: string;
}

export const processSteps: ProcessStep[] = [
  { step: "01", title: "Discovery", description: "Understand goals, constraints, and success metrics." },
  { step: "02", title: "Planning", description: "Architecture, timeline, and resourcing locked in." },
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

export const testimonials: Testimonial[] = [
  {
    name: "Sumanth",
    role: "Client",
    quote:
      "Their digital marketing expertise drove remarkable growth in our online visibility within months.",
  },
  {
    name: "Leema",
    role: "Client",
    quote:
      "WinSphere transformed our IT infrastructure and meaningfully improved system performance.",
  },
];

export const contactInfo = {
  email: "ITsupport@winspheretech.com",
  phone: "+91-9494409785",
  location: "22nd Streets, Colorado",
  social: ["LinkedIn", "Instagram", "Facebook"],
};
