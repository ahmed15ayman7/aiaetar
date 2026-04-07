export type ProgramCategory =
  | "management"
  | "hospitality"
  | "quality"
  | "training";

export type Program = {
  id: string;
  title: string;
  description: string;
  duration: string;
  mode: "onsite" | "online";
  category: ProgramCategory;
  image: string;
};

export const programs: Program[] = [
  {
    id: "1",
    title: "Executive Tourism Management",
    description:
      "Strategic leadership for destination marketing, operations, and sustainable tourism.",
    duration: "12 weeks",
    mode: "online",
    category: "management",
    image:
      "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&q=80",
  },
  {
    id: "2",
    title: "Hospitality Operations Excellence",
    description:
      "Front-office, service design, and quality systems for premium hospitality brands.",
    duration: "10 weeks",
    mode: "onsite",
    category: "hospitality",
    image:
      "https://images.unsplash.com/photo-1566073771259-6dcc850ed65c?w=800&q=80",
  },
  {
    id: "3",
    title: "ISO Quality Systems in Practice",
    description:
      "Implement and audit management systems aligned with international standards.",
    duration: "8 weeks",
    mode: "online",
    category: "quality",
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80",
  },
  {
    id: "4",
    title: "Applied Training Design",
    description:
      "Instructional design, assessment, and facilitation for corporate academies.",
    duration: "6 weeks",
    mode: "onsite",
    category: "training",
    image:
      "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&q=80",
  },
];

export const accreditations = [
  { id: "iso", name: "ISO", abbr: "ISO" },
  { id: "eos", name: "Egyptian Organization for Standardization", abbr: "EOS" },
  { id: "nqi", name: "National Quality Institute", abbr: "NQI" },
] as const;

export const testimonials = [
  {
    id: "t1",
    quote:
      "The program bridged theory and practice—our team adopted new service standards within weeks.",
    name: "Sara El-Masry",
    role: "Operations Director",
  },
  {
    id: "t2",
    quote:
      "Faculty expertise and international case studies elevated how we approach destination marketing.",
    name: "Omar Hamed",
    role: "Tourism Consultant",
  },
  {
    id: "t3",
    quote:
      "Accredited curriculum and continuous support made this the right investment for our institute.",
    name: "Layla Farouk",
    role: "Training Manager",
  },
];

export const newsItems = [
  {
    id: "n1",
    title: "New Hospitality Cohort Opens This Fall",
    excerpt: "Limited seats for the applied hospitality operations track.",
    date: "2026-03-15",
  },
  {
    id: "n2",
    title: "Research Brief: Sustainable Tourism Indicators",
    excerpt: "Highlights from our latest applied research publication.",
    date: "2026-03-02",
  },
  {
    id: "n3",
    title: "Partnership with National Quality Institute",
    excerpt: "Expanded pathways for ISO-aligned professional certificates.",
    date: "2026-02-20",
  },
];
