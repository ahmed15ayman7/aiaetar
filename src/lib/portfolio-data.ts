/**
 * Full institute portfolio — bilingual source of truth for /portfolio
 */

export type PortfolioLocale = "en" | "ar";

export type PortfolioBlock = {
  id: string;
  title: { en: string; ar: string };
  items: { en: string; ar: string }[];
};

export const portfolioIntro = {
  en: "The American Institute of Applied Education for Tourism and Administrative Research is a licensed educational and training entity that aims to develop and qualify human resources in all areas of applied education and training by offering locally and internationally accredited programs that meet labor market needs and support sustainable development.",
  ar: "المعهد الأمريكي للتعليم التطبيقي للبحوث السياحية والإدارية هو جهة تعليمية وتدريبية مرخصة، تهدف إلى تطوير وتأهيل الكوادر البشرية في جميع مجالات التعليم والتدريب التطبيقي، من خلال تقديم برامج تدريبية معتمدة محليًا ودوليًا تلبي احتياجات سوق العمل وتدعم التنمية المستدامة.",
};

export const portfolioSections: PortfolioBlock[] = [
  {
    id: "diplomas",
    title: {
      en: "Applied Diplomas",
      ar: "الدبلومات التطبيقية",
    },
    items: [
      { en: "Hotel & Hospitality Management", ar: "إدارة الفنادق والضيافة" },
      { en: "Food & Beverage Management", ar: "إدارة الأغذية والمشروبات" },
      { en: "Tourism & Hotel Human Resources Management", ar: "إدارة الموارد البشرية السياحية والفندقية" },
      { en: "Internal Audit & Quality Management", ar: "الإشراف الداخلي وإدارة الجودة" },
      { en: "Tourism & Hotel Marketing", ar: "التسويق السياحي والفندقي" },
      { en: "Public Relations & Tourism Protocol", ar: "العلاقات العامة والبروتوكول السياحي" },
      { en: "Events & Convention Management", ar: "إدارة الفعاليات والمؤتمرات" },
      { en: "Tourist Guidance", ar: "الإرشاد السياحي" },
      { en: "Tourism Security & Safety", ar: "الأمن والسلامة السياحية" },
      { en: "Customer Service in Tourism & Hotels", ar: "خدمة العملاء في السياحة والفنادق" },
      { en: "Maintenance Management in Tourism & Hotel Facilities", ar: "إدارة الصيانة في المنشآت السياحية والفندقية" },
      { en: "Mechanical & Technical Engineering for Tourism & Hotels", ar: "الهندسة الميكانيكية والفنية للسياحة والفنادق" },
      { en: "Low Current Systems Management (Alarm, CCTV, Networks)", ar: "إدارة أنظمة التيار الخفيف (الإنذار، الكاميرات، الشبكات)" },
      { en: "Tourism & Hotel Quality & Reliability", ar: "الجودة والاعتمادية السياحية والفندقية" },
      { en: "Advanced Maintenance for Hotels & Facilities", ar: "الصيانة المتقدمة للفنادق والمنشآت" },
      { en: "Energy Management Systems for Hotels & Facilities", ar: "إدارة نظم الطاقة للفنادق والمنشآت" },
      { en: "Electrical & Mechanical Engineering for Hotels & Tourist Facilities", ar: "الهندسة الكهربائية والميكانيكية للفنادق والمنشآت السياحية" },
      { en: "Occupational Safety & Tourism Risk Management", ar: "السلامة المهنية وإدارة المخاطر السياحية" },
    ],
  },
  {
    id: "shortCourses",
    title: {
      en: "Short Training Courses",
      ar: "الدورات التدريبية القصيرة",
    },
    items: [
      { en: "Customer Service Skills", ar: "مهارات خدمة العملاء" },
      { en: "Time Management & Personal Effectiveness", ar: "إدارة الوقت والفعالية الشخصية" },
      { en: "Tourism Sales & Marketing Skills", ar: "مهارات البيع والتسويق السياحي" },
      { en: "Tourism & Hotel Report Writing", ar: "كتابة التقارير السياحية والفندقية" },
      { en: "Computer Applications", ar: "تطبيقات الحاسب الآلي" },
      { en: "Tourism Risk Management", ar: "إدارة المخاطر السياحية" },
      { en: "First Aid & Occupational Safety", ar: "الإسعافات الأولية والسلامة المهنية" },
      { en: "Preventive Maintenance for Hotels & Facilities", ar: "الصيانة الوقائية للفنادق والمنشآت" },
      { en: "Low Current Systems Management", ar: "إدارة أنظمة التيار الخفيف" },
      { en: "Principles of Electrical Engineering for Hotels", ar: "مبادئ الهندسة الكهربائية للفنادق" },
      { en: "Foundations of Quality & Reliability", ar: "أساسيات الجودة والاعتمادية" },
      { en: "Security & Safety Management", ar: "إدارة الأمن والسلامة" },
      { en: "Communication & Negotiation Skills", ar: "مهارات الاتصال والتفاوض" },
      { en: "Operations & Maintenance Basics", ar: "مبادئ التشغيل والصيانة" },
      { en: "Advanced Alarm & CCTV Systems", ar: "دورات متقدمة في أنظمة الإنذار وكاميرات المراقبة" },
      { en: "Electrical & Mechanical Troubleshooting Skills", ar: "مهارات حل الأعطال الكهربائية والميكانيكية" },
    ],
  },
  {
    id: "elearning",
    title: {
      en: "E-Learning Programs",
      ar: "برامج التدريب الإلكتروني",
    },
    items: [
      { en: "Tourism & Hotel Management (Online)", ar: "إدارة السياحة والفنادق (أونلاين)" },
      { en: "Security & Safety (Online)", ar: "الأمن والسلامة (أونلاين)" },
      { en: "Customer Service (Online)", ar: "خدمة العملاء (أونلاين)" },
      { en: "Leadership in Tourism & Hotels (Online)", ar: "القيادة في السياحة والفنادق (أونلاين)" },
      { en: "Innovation & Quality (Online)", ar: "الابتكار والجودة (أونلاين)" },
      { en: "Maintenance Fundamentals & Fault Management (Online)", ar: "مبادئ الصيانة وإدارة الأعطال (أونلاين)" },
      { en: "Low Current Systems Management (Online)", ar: "إدارة أنظمة التيار الخفيف (أونلاين)" },
      { en: "Quality & Reliability (Online)", ar: "الجودة والاعتمادية (أونلاين)" },
    ],
  },
  {
    id: "leadership",
    title: {
      en: "Leadership Programs",
      ar: "البرامج القيادية",
    },
    items: [
      { en: "Professional Tourism Leader Program", ar: "برنامج القائد السياحي المحترف" },
      { en: "Executive Leadership Program for the Hotel Sector", ar: "برنامج المدير التنفيذي للقطاع الفندقي" },
      { en: "Strategic Leadership for Hotels & Resorts", ar: "برنامج القيادة الاستراتيجية للفنادق والمنتجعات" },
      { en: "Change Management in Tourism Institutions", ar: "برنامج إدارة التغيير في المؤسسات السياحية" },
      { en: "Women's Leadership in Tourism & Hotels", ar: "برنامج القيادة النسائية في السياحة والفنادق" },
      { en: "Engineering Leadership for Tourist Facilities", ar: "برنامج القيادة الهندسية للمنشآت السياحية" },
      { en: "Quality & Reliability Leadership Program", ar: "برنامج قيادة الجودة والاعتمادية" },
    ],
  },
  {
    id: "engineering",
    title: {
      en: "Engineering, Maintenance, Low Current, Quality & Reliability",
      ar: "برامج الصيانة والهندسة والتيار الخفيف والجودة والاعتمادية",
    },
    items: [
      { en: "Advanced Mechanical & Electrical Maintenance Programs", ar: "برامج الصيانة الميكانيكية والكهربائية المتقدمة" },
      { en: "Hotel & Tourist Facility Maintenance Programs", ar: "برامج صيانة الفنادق والمنشآت السياحية" },
      { en: "Low Current Systems (Fire Alarm, CCTV, Network)", ar: "برامج إدارة أنظمة التيار الخفيف (Fire Alarm, CCTV, Network)" },
      { en: "Refrigeration, Air Conditioning & Control Systems", ar: "برامج التبريد والتكييف وأنظمة التحكم" },
      { en: "Energy Management & Electrical Consumption Control", ar: "برامج إدارة الطاقة والتحكم في استهلاك الكهرباء" },
      { en: "Technical Quality & Reliability Assurance", ar: "برامج ضبط الجودة والاعتمادية الفنية" },
      { en: "Integrated Engineering Systems for Hotels & Facilities", ar: "برامج الأنظمة الهندسية المتكاملة للفنادق والمنشآت" },
      { en: "Industrial Security & Occupational Safety", ar: "برامج الأمن الصناعي والسلامة المهنية" },
      { en: "Engineering & Industrial Risk Management", ar: "برامج إدارة المخاطر الهندسية والصناعية" },
    ],
  },
];

export const portfolioQuality = {
  title: {
    en: "Quality & Accreditation",
    ar: "نظام الجودة والاعتماد",
  },
  items: [
    {
      en: "Applying the highest international quality standards",
      ar: "تطبيق أعلى معايير الجودة الدولية",
    },
    {
      en: "Accreditation from local and international bodies",
      ar: "اعتماد من هيئات محلية ودولية",
    },
    {
      en: "An integrated system for performance monitoring and evaluation",
      ar: "نظام متكامل لمتابعة وتقييم الأداء",
    },
    {
      en: "Documented certificates accredited locally and internationally",
      ar: "شهادات موثقة ومعتمدة محليًا ودوليًا",
    },
    {
      en: "Continuous updating of training programmes according to market needs",
      ar: "تحديث مستمر للبرامج التدريبية وفقًا لاحتياجات السوق",
    },
  ],
};

export const portfolioObjectives = {
  title: {
    en: "General Objectives",
    ar: "الأهداف العامة للمعهد",
  },
  items: [
    {
      en: "Develop human resources skills across tourism, hotel, and engineering sectors",
      ar: "تطوير مهارات الكوادر البشرية في جميع القطاعات السياحية والفندقية والهندسية",
    },
    {
      en: "Deliver specialised training programmes aligned with labour market needs",
      ar: "تقديم برامج تدريبية متخصصة ومواكبة لاحتياجات سوق العمل",
    },
    {
      en: "Support digital transformation, innovation, and quality in training",
      ar: "دعم التحول الرقمي والابتكار والجودة في التدريب",
    },
    {
      en: "Empower administrative and technical leaderships",
      ar: "تمكين القيادات الإدارية والفنية",
    },
    {
      en: "Contribute to sustainable development and service excellence",
      ar: "المساهمة في التنمية المستدامة والارتقاء بمستوى الخدمات",
    },
    {
      en: "Strengthen local and international partnerships in applied training",
      ar: "تعزيز الشراكات المحلية والدولية في التدريب التطبيقي",
    },
  ],
};
