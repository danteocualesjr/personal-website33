/**
 * -----------------------------------------------------------------------------
 * Personal site configuration
 * -----------------------------------------------------------------------------
 * This file is the single source of truth for your personal information.
 * Replace every value marked with a placeholder (e.g. "Your Name") to make the
 * site yours. Every page on the site reads from this object.
 */

export type SocialLink = {
  label: string;
  href: string;
};

export type Project = {
  title: string;
  description: string;
  tags: string[];
  href?: string;
  repo?: string;
  featured?: boolean;
};

export type Experience = {
  role: string;
  company: string;
  period: string;
  summary: string;
};

export type SiteConfig = {
  name: string;
  role: string;
  location: string;
  shortBio: string;
  longBio: string[];
  email: string;
  resumeUrl?: string;
  socials: SocialLink[];
  skills: string[];
  projects: Project[];
  experience: Experience[];
  metadata: {
    title: string;
    description: string;
    url: string;
  };
};

export const siteConfig: SiteConfig = {
  name: "Your Name",
  role: "Software Engineer & Designer",
  location: "Earth",
  shortBio:
    "I build thoughtful software at the intersection of design and engineering.",
  longBio: [
    "Hi, I'm Your Name. I'm a software engineer and designer based in Earth. I enjoy turning complex problems into clean, intuitive products.",
    "When I'm not shipping code, you'll find me reading, hiking, or tinkering with side projects. I'm always curious about new tools, ideas, and ways of thinking.",
    "This site is a collection of my work, writing, and a bit about me. Feel free to poke around and reach out.",
  ],
  email: "hello@example.com",
  resumeUrl: "/resume.pdf",
  socials: [
    { label: "GitHub", href: "https://github.com/yourhandle" },
    { label: "Twitter / X", href: "https://x.com/yourhandle" },
    { label: "LinkedIn", href: "https://linkedin.com/in/yourhandle" },
  ],
  skills: [
    "TypeScript",
    "React",
    "Next.js",
    "Node.js",
    "Python",
    "PostgreSQL",
    "Tailwind CSS",
    "Figma",
    "System Design",
  ],
  projects: [
    {
      title: "Project One",
      description:
        "A short, punchy description of what this project does and why it matters. Keep it to one or two sentences.",
      tags: ["Next.js", "TypeScript", "Tailwind"],
      href: "https://example.com/project-one",
      repo: "https://github.com/yourhandle/project-one",
      featured: true,
    },
    {
      title: "Project Two",
      description:
        "Another great thing you built. Mention the problem it solves and the impact it had.",
      tags: ["React", "Node.js", "PostgreSQL"],
      repo: "https://github.com/yourhandle/project-two",
      featured: true,
    },
    {
      title: "Project Three",
      description:
        "A smaller experiment or side project. These matter too, they show curiosity.",
      tags: ["Python", "ML"],
      href: "https://example.com/project-three",
    },
    {
      title: "Project Four",
      description:
        "Describe something you are proud of. What did you learn? What surprised you?",
      tags: ["Figma", "Design Systems"],
    },
  ],
  experience: [
    {
      role: "Senior Software Engineer",
      company: "Acme Corp",
      period: "2024 — Present",
      summary:
        "Leading product engineering on the platform team. Focused on developer experience and performance.",
    },
    {
      role: "Software Engineer",
      company: "Startup Co",
      period: "2021 — 2024",
      summary:
        "Built core features from zero-to-one across web and API. Partnered closely with design.",
    },
    {
      role: "Junior Engineer",
      company: "First Gig Inc",
      period: "2019 — 2021",
      summary:
        "Learned the craft: shipped a lot, broke a lot, and got much better at both.",
    },
  ],
  metadata: {
    title: "Your Name — Software Engineer & Designer",
    description:
      "Personal site of Your Name. Portfolio, writing, and a bit about me.",
    url: "https://yourdomain.com",
  },
};

export const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];
