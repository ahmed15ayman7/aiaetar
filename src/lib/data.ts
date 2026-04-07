export type Locale = "en" | "ar";
export type ProgramCategory = "management" | "hospitality" | "quality" | "training";

/* ─── Programs ─────────────────────────────────────────────────────────── */
export type Program = {
  id: string;
  category: ProgramCategory;
  duration: string;
  mode: "onsite" | "online";
  image: string;
  en: { title: string; description: string };
  ar: { title: string; description: string };
};

export const programs: Program[] = [
  {
    id: "1",
    category: "management",
    duration: "12",
    mode: "online",
    image: "https://picsum.photos/seed/tourism-exec/800/600",
    en: {
      title: "Executive Tourism Management",
      description: "Strategic leadership for destination marketing, operations, and sustainable tourism development.",
    },
    ar: {
      title: "إدارة السياحة التنفيذية",
      description: "قيادة استراتيجية لتسويق الوجهات والعمليات السياحية وتطوير السياحة المستدامة.",
    },
  },
  {
    id: "2",
    category: "hospitality",
    duration: "10",
    mode: "onsite",
    image: "https://picsum.photos/seed/hotel-ops/800/600",
    en: {
      title: "Hospitality Operations Excellence",
      description: "Front-office, service design, and quality systems for premium hospitality brands worldwide.",
    },
    ar: {
      title: "التميز في عمليات الضيافة",
      description: "الاستقبال وتصميم الخدمة وأنظمة الجودة لعلامات الضيافة الراقية على مستوى العالم.",
    },
  },
  {
    id: "3",
    category: "quality",
    duration: "8",
    mode: "online",
    image: "https://picsum.photos/seed/iso-quality/800/600",
    en: {
      title: "ISO Quality Systems in Practice",
      description: "Implement, document, and audit management systems aligned with ISO 9001 international standards.",
    },
    ar: {
      title: "أنظمة الجودة ISO تطبيقياً",
      description: "تطبيق وتوثيق ومراجعة أنظمة الإدارة وفقاً لمعايير الأيزو 9001 الدولية.",
    },
  },
  {
    id: "4",
    category: "training",
    duration: "6",
    mode: "onsite",
    image: "https://picsum.photos/seed/training-design/800/600",
    en: {
      title: "Applied Training Design",
      description: "Instructional design, competency assessment, and facilitation skills for corporate academies.",
    },
    ar: {
      title: "تصميم التدريب التطبيقي",
      description: "تصميم المناهج وتقييم الكفاءات ومهارات التيسير لأكاديميات الشركات.",
    },
  },
  {
    id: "5",
    category: "management",
    duration: "8",
    mode: "online",
    image: "https://picsum.photos/seed/admin-research/800/600",
    en: {
      title: "Administrative Research Methods",
      description: "Applied research toolkit covering survey design, qualitative analysis, and evidence-based reporting.",
    },
    ar: {
      title: "مناهج البحث الإداري",
      description: "أدوات البحث التطبيقي: تصميم الاستبانات والتحليل النوعي وإعداد التقارير المبنية على الأدلة.",
    },
  },
  {
    id: "6",
    category: "hospitality",
    duration: "6",
    mode: "onsite",
    image: "https://picsum.photos/seed/digital-tourism/800/600",
    en: {
      title: "Digital Tourism & Revenue Management",
      description: "OTA strategy, digital marketing, and data-driven revenue management for the modern hospitality era.",
    },
    ar: {
      title: "السياحة الرقمية وإدارة الإيرادات",
      description: "استراتيجيات التوزيع الإلكتروني والتسويق الرقمي وإدارة الإيرادات المبنية على البيانات.",
    },
  },
];

/* ─── Accreditations ──────────────────────────────────────────────────── */
export const accreditations = [
  {
    id: "iso",
    abbr: "ISO",
    en: { name: "ISO 9001", full: "International Organization for Standardization" },
    ar: { name: "أيزو 9001", full: "المنظمة الدولية للتوحيد القياسي" },
  },
  {
    id: "eos",
    abbr: "EOS",
    en: { name: "EOS", full: "Egyptian Organization for Standardization" },
    ar: { name: "الهيئة المصرية", full: "الهيئة المصرية للمواصفات والجودة" },
  },
  {
    id: "nqi",
    abbr: "NQI",
    en: { name: "NQI", full: "National Quality Institute" },
    ar: { name: "معهد الجودة", full: "المعهد الوطني للجودة" },
  },
] as const;

/* ─── Testimonials ────────────────────────────────────────────────────── */
export type Testimonial = {
  id: string;
  avatar: string;
  en: { quote: string; name: string; role: string };
  ar: { quote: string; name: string; role: string };
};

export const testimonials: Testimonial[] = [
  {
    id: "t1",
    avatar: "https://picsum.photos/seed/sara-face/120/120",
    en: {
      quote: "The program bridged theory and practice — our team adopted new service standards within weeks of completing the course.",
      name: "Sara El-Masry",
      role: "Operations Director, Nile Hotels Group",
    },
    ar: {
      quote: "ردم البرنامج الفجوة بين النظرية والتطبيق — اعتمد فريقنا معايير خدمة جديدة في غضون أسابيع من إتمام الدورة.",
      name: "سارة المصري",
      role: "مديرة العمليات، مجموعة فنادق النيل",
    },
  },
  {
    id: "t2",
    avatar: "https://picsum.photos/seed/omar-face/120/120",
    en: {
      quote: "Faculty expertise and international case studies fundamentally elevated how we approach destination marketing strategy.",
      name: "Omar Hamed",
      role: "Senior Tourism Consultant, MENA Region",
    },
    ar: {
      quote: "رفعت خبرة أعضاء هيئة التدريس ودراسات الحالة الدولية من مستوى نهجنا في تسويق الوجهات السياحية.",
      name: "عمر حامد",
      role: "مستشار سياحة أول، منطقة الشرق الأوسط وأفريقيا",
    },
  },
  {
    id: "t3",
    avatar: "https://picsum.photos/seed/layla-face/120/120",
    en: {
      quote: "The accredited curriculum and continuous alumni support made this the single best investment our institute has made in training.",
      name: "Layla Farouk",
      role: "Head of Training, Alexandria Tourism Authority",
    },
    ar: {
      quote: "جعل المنهج المعتمد والدعم المستمر للخريجين هذا البرنامج أفضل استثمار في التدريب قامت به مؤسستنا.",
      name: "ليلى فاروق",
      role: "رئيسة قسم التدريب، هيئة السياحة بالإسكندرية",
    },
  },
];

/* ─── News ────────────────────────────────────────────────────────────── */
export type NewsItem = {
  id: string;
  date: string;
  image: string;
  en: { title: string; excerpt: string; tag: string };
  ar: { title: string; excerpt: string; tag: string };
};

export const newsItems: NewsItem[] = [
  {
    id: "n1",
    date: "2026-03-15",
    image: "https://picsum.photos/seed/news-hospitality/600/400",
    en: {
      title: "New Hospitality Cohort Opens This Fall",
      excerpt: "Limited seats available for the Applied Hospitality Operations track — applications close 30 April.",
      tag: "Enrolment",
    },
    ar: {
      title: "فتح باب القبول لمجموعة الضيافة الجديدة هذا الخريف",
      excerpt: "مقاعد محدودة في مسار عمليات الضيافة التطبيقية — ينتهي التقديم في 30 أبريل.",
      tag: "تسجيل",
    },
  },
  {
    id: "n2",
    date: "2026-03-02",
    image: "https://picsum.photos/seed/news-research/600/400",
    en: {
      title: "Research Brief: Sustainable Tourism Indicators 2026",
      excerpt: "Key findings and policy recommendations from our latest applied research publication on MENA tourism trends.",
      tag: "Research",
    },
    ar: {
      title: "ملخص بحثي: مؤشرات السياحة المستدامة 2026",
      excerpt: "أبرز النتائج والتوصيات من أحدث منشوراتنا البحثية التطبيقية حول اتجاهات السياحة في المنطقة.",
      tag: "بحث",
    },
  },
  {
    id: "n3",
    date: "2026-02-20",
    image: "https://picsum.photos/seed/news-partnership/600/400",
    en: {
      title: "Strategic Partnership with National Quality Institute",
      excerpt: "Expanded certification pathways and joint research initiatives now available for enrolled professionals.",
      tag: "Partnership",
    },
    ar: {
      title: "شراكة استراتيجية مع المعهد الوطني للجودة",
      excerpt: "مسارات شهادات موسعة ومبادرات بحثية مشتركة متاحة الآن للمهنيين المسجلين.",
      tag: "شراكة",
    },
  },
];

/* ─── Team ────────────────────────────────────────────────────────────── */
export type TeamMember = {
  id: string;
  image: string;
  en: { name: string; role: string; bio: string };
  ar: { name: string; role: string; bio: string };
};

export const teamMembers: TeamMember[] = [
  {
    id: "1",
    image: "https://picsum.photos/seed/amira-team/400/600",
    en: {
      name: "Dr. Amira Hassan",
      role: "Academic Director",
      bio: "PhD from Lausanne; 18 years in applied hospitality research and former advisor to the Egyptian Ministry of Tourism.",
    },
    ar: {
      name: "د. أميرة حسن",
      role: "المديرة الأكاديمية",
      bio: "دكتوراه من لوزان؛ 18 عاماً في البحث التطبيقي للضيافة ومستشارة سابقة لوزارة السياحة المصرية.",
    },
  },
  {
    id: "2",
    image: "https://picsum.photos/seed/karim-team/400/600",
    en: {
      name: "Prof. Karim Nabil",
      role: "Research Lead",
      bio: "ISO-certified lead auditor published in 3 international journals; pioneered QMS curricula for MENA hospitality groups.",
    },
    ar: {
      name: "أ.د. كريم نبيل",
      role: "رئيس قسم البحث العلمي",
      bio: "مدقق رئيسي معتمد ISO؛ نشر في 3 مجلات دولية؛ رائد مناهج QMS لمجموعات الضيافة في منطقة MENA.",
    },
  },
  {
    id: "3",
    image: "https://picsum.photos/seed/dina-team/400/600",
    en: {
      name: "Ms. Dina Soliman",
      role: "Programs Lead",
      bio: "Former General Manager; designed F&B and front-office excellence programmes adopted by 12 hotel brands.",
    },
    ar: {
      name: "م. دينا سليمان",
      role: "رئيسة البرامج",
      bio: "مديرة عامة سابقة؛ صممت برامج التميز في الأغذية والمشروبات والاستقبال المعتمدة من 12 علامة فندقية.",
    },
  },
  {
    id: "4",
    image: "https://picsum.photos/seed/hany-team/400/600",
    en: {
      name: "Mr. Hany Farid",
      role: "Industry Partnerships",
      bio: "MBA from AUC; 20 years in corporate training and executive coaching across tourism and public sectors.",
    },
    ar: {
      name: "م. هاني فريد",
      role: "الشراكات الصناعية",
      bio: "ماجستير إدارة أعمال من الجامعة الأمريكية بالقاهرة؛ 20 عاماً في التدريب المؤسسي والتوجيه التنفيذي.",
    },
  },
];

/* ─── Trainers ────────────────────────────────────────────────────────── */
export type Trainer = {
  id: string;
  image: string;
  rating: number;
  courses: number;
  countries: number;
  specialties: string[];
  en: { name: string; role: string; bio: string };
  ar: { name: string; role: string; bio: string };
};

export const trainers: Trainer[] = [
  {
    id: "1",
    image: "https://picsum.photos/seed/trainer-amira/400/300",
    rating: 4.9,
    courses: 7,
    countries: 5,
    specialties: ["Destination Marketing", "Sustainable Tourism", "Research Methods"],
    en: { name: "Dr. Amira Hassan", role: "Lead Trainer, Tourism Strategy", bio: "Former advisor to the Egyptian Ministry of Tourism. PhD from Lausanne, 18 years in applied hospitality research." },
    ar: { name: "د. أميرة حسن", role: "المدربة الرئيسية، استراتيجية السياحة", bio: "مستشارة سابقة لوزارة السياحة المصرية. دكتوراه من لوزان، 18 عاماً في البحث التطبيقي للضيافة." },
  },
  {
    id: "2",
    image: "https://picsum.photos/seed/trainer-karim/400/300",
    rating: 4.8,
    courses: 5,
    countries: 8,
    specialties: ["ISO 9001", "Quality Auditing", "Process Design"],
    en: { name: "Prof. Karim Nabil", role: "Lead Trainer, Quality Systems", bio: "ISO certified lead auditor, published in 3 international journals. Pioneered QMS curricula for MENA hospitality groups." },
    ar: { name: "أ.د. كريم نبيل", role: "المدرب الرئيسي، أنظمة الجودة", bio: "مدقق رئيسي معتمد ISO، نشر في 3 مجلات دولية. رائد مناهج QMS في مجموعات الضيافة بمنطقة MENA." },
  },
  {
    id: "3",
    image: "https://picsum.photos/seed/trainer-dina/400/300",
    rating: 4.9,
    courses: 6,
    countries: 4,
    specialties: ["Front Office", "Service Design", "F&B Operations"],
    en: { name: "Ms. Dina Soliman", role: "Lead Trainer, Hospitality Operations", bio: "Ex-General Manager at a leading Cairo property. Designed F&B and front-office excellence programmes for 12 brands." },
    ar: { name: "م. دينا سليمان", role: "المدربة الرئيسية، عمليات الضيافة", bio: "مديرة عامة سابقة لفندق رائد في القاهرة. صممت برامج تميز في F&B والاستقبال لـ 12 علامة تجارية." },
  },
  {
    id: "4",
    image: "https://picsum.photos/seed/trainer-hany/400/300",
    rating: 4.7,
    courses: 9,
    countries: 6,
    specialties: ["Leadership", "HR Development", "Corporate Training"],
    en: { name: "Mr. Hany Farid", role: "Lead Trainer, Administrative Leadership", bio: "MBA from AUC. 20 years in corporate training and executive coaching across the tourism and public sectors." },
    ar: { name: "م. هاني فريد", role: "المدرب الرئيسي، القيادة الإدارية", bio: "ماجستير إدارة أعمال من AUC. 20 عاماً في التدريب المؤسسي والتوجيه التنفيذي في قطاعي السياحة والقطاع العام." },
  },
  {
    id: "5",
    image: "https://picsum.photos/seed/trainer-layla/400/300",
    rating: 4.8,
    courses: 4,
    countries: 7,
    specialties: ["Data Analysis", "Survey Design", "Academic Writing"],
    en: { name: "Dr. Layla Kamal", role: "Lead Trainer, Research & Analytics", bio: "Statistician and researcher with a focus on data-driven decisions in hospitality. Oxford DPhil." },
    ar: { name: "د. ليلى كمال", role: "المدربة الرئيسية، البحث والتحليلات", bio: "إحصائية وباحثة متخصصة في القرارات المبنية على البيانات في قطاع الضيافة. دكتوراه من أكسفورد." },
  },
  {
    id: "6",
    image: "https://picsum.photos/seed/trainer-tarek/400/300",
    rating: 4.6,
    courses: 5,
    countries: 3,
    specialties: ["Revenue Management", "OTA Strategy", "Digital Marketing"],
    en: { name: "Mr. Tarek Mansour", role: "Lead Trainer, Digital Tourism", bio: "Digital marketing expert specialised in OTA strategy, revenue management, and travel tech platforms." },
    ar: { name: "م. طارق منصور", role: "المدرب الرئيسي، السياحة الرقمية", bio: "خبير تسويق رقمي متخصص في استراتيجية OTA وإدارة الإيرادات ومنصات تكنولوجيا السفر." },
  },
];
