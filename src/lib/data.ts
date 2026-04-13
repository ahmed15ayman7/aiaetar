export type Locale = "en" | "ar";
export type ProgramCategory =
  | "diploma"
  | "short"
  | "elearning"
  | "leadership"
  | "engineering";

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
  /* ── Applied Diplomas ────────────────────────────────────────────────── */
  {
    id: "d1",
    category: "diploma",
    duration: "14",
    mode: "onsite",
    image: "https://picsum.photos/seed/hotel-hospitality/800/600",
    en: { title: "Hotel & Hospitality Management", description: "Comprehensive diploma covering hotel operations, guest experience design, front-office systems, and hospitality leadership for tourism professionals." },
    ar: { title: "إدارة الفنادق والضيافة", description: "دبلوم شامل يغطي عمليات الفنادق وتصميم تجربة الضيف وأنظمة الاستقبال والقيادة الفندقية للمهنيين السياحيين." },
  },
  {
    id: "d2",
    category: "diploma",
    duration: "12",
    mode: "onsite",
    image: "https://picsum.photos/seed/food-beverage/800/600",
    en: { title: "Food & Beverage Management", description: "Applied diploma in F&B operations, menu engineering, cost control, kitchen management, and guest satisfaction in tourism facilities." },
    ar: { title: "إدارة الأغذية والمشروبات", description: "دبلوم تطبيقي في عمليات الأغذية والمشروبات وهندسة القوائم ومراقبة التكاليف وإدارة المطابخ في المنشآت السياحية." },
  },
  {
    id: "d3",
    category: "diploma",
    duration: "12",
    mode: "onsite",
    image: "https://picsum.photos/seed/tourism-hr/800/600",
    en: { title: "Tourism & Hotel Human Resources Management", description: "Strategic HR diploma addressing talent acquisition, performance management, workforce planning, and training in the hospitality sector." },
    ar: { title: "إدارة الموارد البشرية السياحية والفندقية", description: "دبلوم موارد بشرية استراتيجي يتناول استقطاب المواهب وإدارة الأداء وتخطيط القوى العاملة والتدريب في قطاع الضيافة." },
  },
  {
    id: "d4",
    category: "diploma",
    duration: "10",
    mode: "onsite",
    image: "https://picsum.photos/seed/quality-supervision/800/600",
    en: { title: "Internal Supervision & Quality Management", description: "Applied diploma covering internal audit techniques, quality assurance frameworks, ISO alignment, and performance indicators in tourism organisations." },
    ar: { title: "الإشراف الداخلي وإدارة الجودة", description: "دبلوم تطبيقي في تقنيات التدقيق الداخلي وأُطر ضمان الجودة ومعايير الأيزو ومؤشرات الأداء في المنظمات السياحية." },
  },
  {
    id: "d5",
    category: "diploma",
    duration: "10",
    mode: "online",
    image: "https://picsum.photos/seed/tourism-marketing/800/600",
    en: { title: "Tourism & Hotel Marketing", description: "Digital and traditional marketing strategies for tourism destinations, hotels, and travel brands — from campaign design to revenue-driven analytics." },
    ar: { title: "التسويق السياحي والفندقي", description: "استراتيجيات التسويق الرقمي والتقليدي للوجهات السياحية والفنادق والعلامات السياحية — من تصميم الحملات إلى التحليلات المبنية على الإيرادات." },
  },
  {
    id: "d6",
    category: "diploma",
    duration: "10",
    mode: "onsite",
    image: "https://picsum.photos/seed/public-relations/800/600",
    en: { title: "Public Relations & Tourism Protocol", description: "Diploma in institutional communication, protocol procedures, media relations, and reputation management for tourism and government bodies." },
    ar: { title: "العلاقات العامة والبروتوكول السياحي", description: "دبلوم في الاتصال المؤسسي وإجراءات البروتوكول والعلاقات الإعلامية وإدارة السمعة للهيئات السياحية والحكومية." },
  },
  {
    id: "d7",
    category: "diploma",
    duration: "10",
    mode: "onsite",
    image: "https://picsum.photos/seed/events-management/800/600",
    en: { title: "Events & Conference Management", description: "End-to-end event planning, venue management, MICE operations, and stakeholder coordination for tourism and hospitality events." },
    ar: { title: "إدارة الفعاليات والمؤتمرات", description: "التخطيط الشامل للفعاليات وإدارة المواقع وعمليات MICE وتنسيق أصحاب المصلحة للفعاليات السياحية والضيافة." },
  },
  {
    id: "d8",
    category: "diploma",
    duration: "12",
    mode: "onsite",
    image: "https://picsum.photos/seed/tour-guiding/800/600",
    en: { title: "Tourist Guidance", description: "Comprehensive diploma in site interpretation, cultural heritage presentation, tour design, and professional guiding skills for licensed tour guides." },
    ar: { title: "الإرشاد السياحي", description: "دبلوم شامل في تفسير المواقع وعرض التراث الثقافي وتصميم الجولات ومهارات الإرشاد المهنية للمرشدين السياحيين المرخصين." },
  },
  {
    id: "d9",
    category: "diploma",
    duration: "10",
    mode: "onsite",
    image: "https://picsum.photos/seed/tourism-security/800/600",
    en: { title: "Tourism Security & Safety", description: "Applied diploma in risk assessment, emergency response, tourism safety protocols, and security systems management for hospitality facilities." },
    ar: { title: "الأمن والسلامة السياحية", description: "دبلوم تطبيقي في تقييم المخاطر والاستجابة للطوارئ وبروتوكولات السلامة السياحية وإدارة أنظمة الأمن في المنشآت الفندقية." },
  },
  {
    id: "d10",
    category: "diploma",
    duration: "8",
    mode: "onsite",
    image: "https://picsum.photos/seed/customer-service-tourism/800/600",
    en: { title: "Customer Service in Tourism & Hotels", description: "Service excellence standards, complaint handling, guest relations, and cross-cultural communication in tourism and hotel environments." },
    ar: { title: "خدمة العملاء في السياحة والفنادق", description: "معايير التميز في الخدمة ومعالجة الشكاوى وعلاقات الضيوف والتواصل بين الثقافات في بيئات السياحة والفنادق." },
  },
  {
    id: "d11",
    category: "diploma",
    duration: "12",
    mode: "onsite",
    image: "https://picsum.photos/seed/maintenance-management/800/600",
    en: { title: "Maintenance Management in Tourism Facilities", description: "Systematic approach to planning, scheduling, and overseeing maintenance operations in hotels and tourism establishments." },
    ar: { title: "إدارة الصيانة في المنشآت السياحية والفندقية", description: "نهج منهجي لتخطيط عمليات الصيانة وجدولتها والإشراف عليها في الفنادق والمنشآت السياحية." },
  },
  {
    id: "d12",
    category: "diploma",
    duration: "14",
    mode: "onsite",
    image: "https://picsum.photos/seed/mechanical-engineering/800/600",
    en: { title: "Mechanical & Technical Engineering for Tourism & Hotels", description: "Applied diploma in mechanical systems, HVAC, plumbing, and technical infrastructure management for tourism and hotel facilities." },
    ar: { title: "الهندسة الميكانيكية والفنية للسياحة والفنادق", description: "دبلوم تطبيقي في الأنظمة الميكانيكية وتكييف الهواء والسباكة وإدارة البنية التحتية التقنية للمنشآت السياحية والفندقية." },
  },
  {
    id: "d13",
    category: "diploma",
    duration: "12",
    mode: "onsite",
    image: "https://picsum.photos/seed/low-current-systems/800/600",
    en: { title: "Low Current Systems Management (Alarm, CCTV, Networks)", description: "Design, installation, and management of fire alarm systems, CCTV networks, and structured cabling in hospitality facilities." },
    ar: { title: "إدارة أنظمة التيار الخفيف (الإنذار والكاميرات والشبكات)", description: "تصميم وتركيب وإدارة أنظمة الإنذار من الحريق وشبكات المراقبة والكابلات المهيكلة في المنشآت الفندقية." },
  },
  {
    id: "d14",
    category: "diploma",
    duration: "10",
    mode: "online",
    image: "https://picsum.photos/seed/quality-accreditation/800/600",
    en: { title: "Tourism & Hotel Quality & Accreditation", description: "International accreditation frameworks, quality benchmarking, documentation systems, and compliance auditing for tourism institutions." },
    ar: { title: "الجودة والاعتمادية السياحية والفندقية", description: "أُطر الاعتماد الدولية وقياس الجودة وأنظمة التوثيق والتدقيق في الامتثال للمؤسسات السياحية." },
  },
  {
    id: "d15",
    category: "diploma",
    duration: "14",
    mode: "onsite",
    image: "https://picsum.photos/seed/advanced-maintenance/800/600",
    en: { title: "Advanced Hotel & Facilities Maintenance", description: "Advanced techniques in preventive and corrective maintenance, asset lifecycle management, and technical team supervision for large facilities." },
    ar: { title: "الصيانة المتقدمة للفنادق والمنشآت", description: "تقنيات متقدمة في الصيانة الوقائية والتصحيحية وإدارة دورة حياة الأصول والإشراف على الفرق الفنية للمنشآت الكبيرة." },
  },
  {
    id: "d16",
    category: "diploma",
    duration: "12",
    mode: "onsite",
    image: "https://picsum.photos/seed/energy-management/800/600",
    en: { title: "Energy Systems Management for Hotels & Facilities", description: "Energy auditing, consumption monitoring, renewable integration, and power systems management for sustainable tourism facilities." },
    ar: { title: "إدارة نظم الطاقة للفنادق والمنشآت", description: "تدقيق الطاقة ورصد الاستهلاك وتكامل الطاقة المتجددة وإدارة أنظمة الطاقة للمنشآت السياحية المستدامة." },
  },
  {
    id: "d17",
    category: "diploma",
    duration: "14",
    mode: "onsite",
    image: "https://picsum.photos/seed/electrical-mechanical/800/600",
    en: { title: "Electrical & Mechanical Engineering for Tourism Facilities", description: "Integrated diploma covering electrical distribution systems, mechanical equipment, BMS, and engineering operations for tourism buildings." },
    ar: { title: "الهندسة الكهربائية والميكانيكية للمنشآت السياحية", description: "دبلوم متكامل يشمل أنظمة توزيع الكهرباء والمعدات الميكانيكية وBMS والعمليات الهندسية للمباني السياحية." },
  },
  {
    id: "d18",
    category: "diploma",
    duration: "10",
    mode: "onsite",
    image: "https://picsum.photos/seed/ohs-tourism/800/600",
    en: { title: "Occupational Safety & Tourism Risk Management", description: "Workplace safety regulations, risk assessment methodologies, incident investigation, and occupational health systems in tourism contexts." },
    ar: { title: "السلامة المهنية وإدارة المخاطر السياحية", description: "لوائح السلامة في مكان العمل ومنهجيات تقييم المخاطر والتحقيق في الحوادث وأنظمة الصحة المهنية في السياقات السياحية." },
  },

  /* ── Short Courses ────────────────────────────────────────────────────── */
  {
    id: "s1",
    category: "short",
    duration: "2",
    mode: "onsite",
    image: "https://picsum.photos/seed/customer-skills/800/600",
    en: { title: "Customer Service Skills", description: "Practical workshop on service standards, handling difficult customers, effective communication, and building loyalty in tourism contexts." },
    ar: { title: "مهارات خدمة العملاء", description: "ورشة عملية في معايير الخدمة والتعامل مع العملاء الصعبين والتواصل الفعّال وبناء الولاء في السياقات السياحية." },
  },
  {
    id: "s2",
    category: "short",
    duration: "2",
    mode: "onsite",
    image: "https://picsum.photos/seed/time-management/800/600",
    en: { title: "Time Management & Personal Effectiveness", description: "Productivity tools, prioritisation frameworks, and self-management techniques for tourism and hospitality professionals." },
    ar: { title: "إدارة الوقت والفعالية الشخصية", description: "أدوات الإنتاجية وأُطر تحديد الأولويات وتقنيات الإدارة الذاتية للمهنيين في قطاعي السياحة والضيافة." },
  },
  {
    id: "s3",
    category: "short",
    duration: "3",
    mode: "online",
    image: "https://picsum.photos/seed/sales-marketing/800/600",
    en: { title: "Tourism Sales & Marketing Skills", description: "Practical sales techniques, customer journey mapping, and digital promotion strategies specific to the travel and tourism industry." },
    ar: { title: "مهارات البيع والتسويق السياحي", description: "تقنيات البيع العملية ورسم خريطة رحلة العميل واستراتيجيات الترويج الرقمي الخاصة بصناعة السفر والسياحة." },
  },
  {
    id: "s4",
    category: "short",
    duration: "2",
    mode: "onsite",
    image: "https://picsum.photos/seed/report-writing/800/600",
    en: { title: "Tourism & Hotel Report Writing", description: "Professional writing skills for operational reports, incident documentation, and executive summaries in tourism organisations." },
    ar: { title: "كتابة التقارير السياحية والفندقية", description: "مهارات الكتابة المهنية للتقارير التشغيلية وتوثيق الحوادث والملخصات التنفيذية في المنظمات السياحية." },
  },
  {
    id: "s5",
    category: "short",
    duration: "2",
    mode: "onsite",
    image: "https://picsum.photos/seed/computer-applications/800/600",
    en: { title: "Computer Applications", description: "Essential digital skills including MS Office, tourism management software, and online booking platforms for hospitality staff." },
    ar: { title: "تطبيقات الحاسب الآلي", description: "المهارات الرقمية الأساسية بما فيها MS Office وبرامج إدارة السياحة ومنصات الحجز الإلكتروني لموظفي الضيافة." },
  },
  {
    id: "s6",
    category: "short",
    duration: "3",
    mode: "onsite",
    image: "https://picsum.photos/seed/risk-management-short/800/600",
    en: { title: "Tourism Risk Management", description: "Risk identification, assessment, and mitigation strategies tailored to tourism operations, natural disasters, and crisis scenarios." },
    ar: { title: "إدارة المخاطر السياحية", description: "استراتيجيات تحديد المخاطر وتقييمها والتخفيف منها المصممة لعمليات السياحة والكوارث الطبيعية وسيناريوهات الأزمات." },
  },
  {
    id: "s7",
    category: "short",
    duration: "2",
    mode: "onsite",
    image: "https://picsum.photos/seed/first-aid/800/600",
    en: { title: "First Aid & Occupational Safety", description: "Practical first aid certification, emergency response procedures, and occupational safety regulations for hospitality staff." },
    ar: { title: "الإسعافات الأولية والسلامة المهنية", description: "شهادة الإسعافات الأولية العملية وإجراءات الاستجابة للطوارئ ولوائح السلامة المهنية لموظفي الضيافة." },
  },
  {
    id: "s8",
    category: "short",
    duration: "3",
    mode: "onsite",
    image: "https://picsum.photos/seed/preventive-maintenance/800/600",
    en: { title: "Preventive Maintenance for Hotels & Facilities", description: "Planned maintenance scheduling, equipment inspection checklists, and predictive maintenance fundamentals for hospitality facilities." },
    ar: { title: "الصيانة الوقائية للفنادق والمنشآت", description: "جدولة الصيانة المخططة وقوائم فحص المعدات وأساسيات الصيانة التنبؤية للمنشآت الفندقية." },
  },
  {
    id: "s9",
    category: "short",
    duration: "3",
    mode: "onsite",
    image: "https://picsum.photos/seed/low-current-short/800/600",
    en: { title: "Low Current Systems Management", description: "Fundamentals of fire alarm, CCTV, access control, and network infrastructure for technical staff in hotels and tourism buildings." },
    ar: { title: "إدارة أنظمة التيار الخفيف", description: "أساسيات أنظمة الإنذار من الحريق والمراقبة والتحكم في الوصول والبنية التحتية للشبكات للموظفين التقنيين في الفنادق." },
  },
  {
    id: "s10",
    category: "short",
    duration: "3",
    mode: "onsite",
    image: "https://picsum.photos/seed/electrical-principles/800/600",
    en: { title: "Electrical Engineering Principles for Hotels", description: "Basic electrical theory, power distribution, switchgear operation, and safety standards for hotel engineering teams." },
    ar: { title: "مبادئ الهندسة الكهربائية للفنادق", description: "نظرية الكهرباء الأساسية وتوزيع الطاقة وتشغيل لوحات التحكم ومعايير السلامة لفرق الهندسة الفندقية." },
  },
  {
    id: "s11",
    category: "short",
    duration: "2",
    mode: "online",
    image: "https://picsum.photos/seed/quality-fundamentals/800/600",
    en: { title: "Quality & Accreditation Fundamentals", description: "Introduction to ISO quality principles, internal audit basics, documentation requirements, and continuous improvement culture." },
    ar: { title: "أساسيات الجودة والاعتمادية", description: "مقدمة لمبادئ الجودة ISO وأساسيات التدقيق الداخلي ومتطلبات التوثيق وثقافة التحسين المستمر." },
  },
  {
    id: "s12",
    category: "short",
    duration: "2",
    mode: "onsite",
    image: "https://picsum.photos/seed/security-management/800/600",
    en: { title: "Security & Safety Management", description: "Security protocols, access control procedures, emergency planning, and safety culture building for hotel and resort staff." },
    ar: { title: "إدارة الأمن والسلامة", description: "بروتوكولات الأمن وإجراءات التحكم في الوصول والتخطيط للطوارئ وبناء ثقافة السلامة لموظفي الفنادق والمنتجعات." },
  },
  {
    id: "s13",
    category: "short",
    duration: "2",
    mode: "online",
    image: "https://picsum.photos/seed/communication-negotiation/800/600",
    en: { title: "Communication & Negotiation Skills", description: "Professional communication techniques, negotiation strategies, and conflict resolution skills for tourism managers and front-line staff." },
    ar: { title: "مهارات الاتصال والتفاوض", description: "تقنيات التواصل المهني واستراتيجيات التفاوض ومهارات حل النزاعات لمديري السياحة والموظفين الأماميين." },
  },
  {
    id: "s14",
    category: "short",
    duration: "3",
    mode: "onsite",
    image: "https://picsum.photos/seed/operations-principles/800/600",
    en: { title: "Operations & Maintenance Principles", description: "Core operational procedures, maintenance management basics, and workflow optimisation for hotel and tourism facility staff." },
    ar: { title: "مبادئ التشغيل والصيانة", description: "الإجراءات التشغيلية الأساسية وأساسيات إدارة الصيانة وتحسين سير العمل لموظفي الفنادق والمنشآت السياحية." },
  },
  {
    id: "s15",
    category: "short",
    duration: "4",
    mode: "onsite",
    image: "https://picsum.photos/seed/fire-alarm-cctv/800/600",
    en: { title: "Advanced Fire Alarm & CCTV Systems", description: "Advanced configuration, troubleshooting, and maintenance of fire alarm panels, CCTV cameras, and monitoring systems in large facilities." },
    ar: { title: "دورة متقدمة في أنظمة الإنذار وكاميرات المراقبة", description: "التهيئة المتقدمة واستكشاف الأعطال وصيانة لوحات الإنذار من الحريق وكاميرات المراقبة في المنشآت الكبيرة." },
  },
  {
    id: "s16",
    category: "short",
    duration: "3",
    mode: "onsite",
    image: "https://picsum.photos/seed/fault-resolution/800/600",
    en: { title: "Electrical & Mechanical Fault Resolution", description: "Practical fault diagnosis, troubleshooting methodologies, and repair procedures for electrical and mechanical systems in hotels." },
    ar: { title: "مهارات حل الأعطال الكهربائية والميكانيكية", description: "تشخيص الأعطال العملي ومنهجيات استكشاف الأخطاء وإجراءات الإصلاح للأنظمة الكهربائية والميكانيكية في الفنادق." },
  },

  /* ── E-Learning Programs ─────────────────────────────────────────────── */
  {
    id: "e1",
    category: "elearning",
    duration: "6",
    mode: "online",
    image: "https://picsum.photos/seed/elearn-hotel-mgmt/800/600",
    en: { title: "Tourism & Hotel Management (Online)", description: "Flexible online programme covering hotel operations, tourism management fundamentals, and hospitality strategy — learn at your own pace." },
    ar: { title: "إدارة السياحة والفنادق (أونلاين)", description: "برنامج مرن عبر الإنترنت يغطي عمليات الفنادق وأساسيات إدارة السياحة واستراتيجية الضيافة — تعلّم بالوتيرة التي تناسبك." },
  },
  {
    id: "e2",
    category: "elearning",
    duration: "4",
    mode: "online",
    image: "https://picsum.photos/seed/elearn-security/800/600",
    en: { title: "Security & Safety (Online)", description: "Online certification programme in security management, safety protocols, and emergency response for tourism and hospitality professionals." },
    ar: { title: "الأمن والسلامة (أونلاين)", description: "برنامج شهادة إلكتروني في إدارة الأمن وبروتوكولات السلامة والاستجابة للطوارئ للمهنيين في السياحة والضيافة." },
  },
  {
    id: "e3",
    category: "elearning",
    duration: "4",
    mode: "online",
    image: "https://picsum.photos/seed/elearn-customer/800/600",
    en: { title: "Customer Service (Online)", description: "Self-paced online course in service excellence, guest relations, and complaint handling for tourism and hotel professionals." },
    ar: { title: "خدمة العملاء (أونلاين)", description: "دورة إلكترونية ذاتية في التميز في الخدمة وعلاقات الضيوف ومعالجة الشكاوى لمهنيي السياحة والفنادق." },
  },
  {
    id: "e4",
    category: "elearning",
    duration: "6",
    mode: "online",
    image: "https://picsum.photos/seed/elearn-leadership/800/600",
    en: { title: "Leadership in Tourism & Hotels (Online)", description: "Online leadership development programme covering management styles, team motivation, and decision-making in hospitality contexts." },
    ar: { title: "القيادة في السياحة والفنادق (أونلاين)", description: "برنامج تطوير قيادة إلكتروني يشمل أساليب الإدارة وتحفيز الفريق وصنع القرار في سياقات الضيافة." },
  },
  {
    id: "e5",
    category: "elearning",
    duration: "5",
    mode: "online",
    image: "https://picsum.photos/seed/elearn-innovation/800/600",
    en: { title: "Innovation & Quality (Online)", description: "Online programme on design thinking, innovation methodologies, and quality improvement systems for tourism organisations." },
    ar: { title: "الابتكار والجودة (أونلاين)", description: "برنامج إلكتروني في التفكير التصميمي ومنهجيات الابتكار وأنظمة تحسين الجودة للمنظمات السياحية." },
  },
  {
    id: "e6",
    category: "elearning",
    duration: "5",
    mode: "online",
    image: "https://picsum.photos/seed/elearn-maintenance/800/600",
    en: { title: "Maintenance Principles & Fault Management (Online)", description: "Online course covering preventive maintenance, fault diagnosis, and technical management for engineering staff in tourism facilities." },
    ar: { title: "مبادئ الصيانة وإدارة الأعطال (أونلاين)", description: "دورة إلكترونية تشمل الصيانة الوقائية وتشخيص الأعطال والإدارة التقنية للموظفين الهندسيين في المنشآت السياحية." },
  },
  {
    id: "e7",
    category: "elearning",
    duration: "4",
    mode: "online",
    image: "https://picsum.photos/seed/elearn-lowcurrent/800/600",
    en: { title: "Low Current Systems Management (Online)", description: "Online certification in fire alarm, CCTV, access control, and network systems — designed for technical staff and facility engineers." },
    ar: { title: "إدارة أنظمة التيار الخفيف (أونلاين)", description: "شهادة إلكترونية في أنظمة الإنذار من الحريق والمراقبة والتحكم في الوصول والشبكات — مصممة للموظفين التقنيين." },
  },
  {
    id: "e8",
    category: "elearning",
    duration: "4",
    mode: "online",
    image: "https://picsum.photos/seed/elearn-quality/800/600",
    en: { title: "Quality & Accreditation (Online)", description: "Self-paced online programme in ISO standards, quality auditing, and accreditation processes for tourism and hospitality organisations." },
    ar: { title: "الجودة والاعتمادية (أونلاين)", description: "برنامج إلكتروني ذاتي في معايير الأيزو والتدقيق في الجودة وعمليات الاعتماد للمنظمات السياحية والفندقية." },
  },

  /* ── Leadership Programs ─────────────────────────────────────────────── */
  {
    id: "l1",
    category: "leadership",
    duration: "10",
    mode: "onsite",
    image: "https://picsum.photos/seed/professional-leader/800/600",
    en: { title: "Professional Tourism Leader Program", description: "Intensive leadership development for emerging tourism leaders — strategic thinking, team building, and stakeholder management." },
    ar: { title: "برنامج القائد السياحي المحترف", description: "تطوير قيادي مكثف للقادة السياحيين الناشئين — التفكير الاستراتيجي وبناء الفريق وإدارة أصحاب المصلحة." },
  },
  {
    id: "l2",
    category: "leadership",
    duration: "12",
    mode: "onsite",
    image: "https://picsum.photos/seed/executive-director/800/600",
    en: { title: "Executive Director for the Hospitality Sector", description: "Advanced executive programme for hotel GMs and directors — financial acumen, brand strategy, and organisational leadership." },
    ar: { title: "برنامج المدير التنفيذي للقطاع الفندقي", description: "برنامج تنفيذي متقدم للمديرين العامين للفنادق والمديرين — الذكاء المالي واستراتيجية العلامة التجارية والقيادة التنظيمية." },
  },
  {
    id: "l3",
    category: "leadership",
    duration: "10",
    mode: "onsite",
    image: "https://picsum.photos/seed/strategic-leadership/800/600",
    en: { title: "Strategic Leadership for Hotels & Resorts", description: "Cutting-edge strategies for resort and hotel leaders — competitive positioning, revenue optimisation, and guest experience vision." },
    ar: { title: "برنامج القيادة الاستراتيجية للفنادق والمنتجعات", description: "استراتيجيات متطورة لقادة المنتجعات والفنادق — التموضع التنافسي وتحسين الإيرادات ورؤية تجربة الضيف." },
  },
  {
    id: "l4",
    category: "leadership",
    duration: "8",
    mode: "onsite",
    image: "https://picsum.photos/seed/change-management/800/600",
    en: { title: "Change Management in Tourism Organisations", description: "Leading transformation, managing resistance, and building adaptive cultures in tourism and hospitality organisations." },
    ar: { title: "برنامج إدارة التغيير في المؤسسات السياحية", description: "قيادة التحول وإدارة المقاومة وبناء ثقافات متكيفة في المنظمات السياحية والضيافة." },
  },
  {
    id: "l5",
    category: "leadership",
    duration: "8",
    mode: "onsite",
    image: "https://picsum.photos/seed/womens-leadership/800/600",
    en: { title: "Women's Leadership in Tourism & Hotels", description: "Empowering women professionals with leadership skills, confidence building, networking strategies, and career advancement tools." },
    ar: { title: "برنامج القيادة النسائية في السياحة والفنادق", description: "تمكين المهنيات من مهارات القيادة وبناء الثقة واستراتيجيات التواصل وأدوات التقدم الوظيفي." },
  },
  {
    id: "l6",
    category: "leadership",
    duration: "8",
    mode: "onsite",
    image: "https://picsum.photos/seed/engineering-leadership/800/600",
    en: { title: "Engineering Leadership for Tourism Facilities", description: "Technical leadership programme for chief engineers and maintenance managers — project management, team development, and budget control." },
    ar: { title: "برنامج القيادة الهندسية للمنشآت السياحية", description: "برنامج قيادة تقنية للمهندسين الرئيسيين ومديري الصيانة — إدارة المشاريع وتطوير الفريق والتحكم في الميزانية." },
  },
  {
    id: "l7",
    category: "leadership",
    duration: "8",
    mode: "online",
    image: "https://picsum.photos/seed/quality-leadership/800/600",
    en: { title: "Quality & Accreditation Leadership", description: "Leadership programme for quality managers and accreditation officers — audit leadership, continuous improvement culture, and stakeholder engagement." },
    ar: { title: "برنامج قيادة الجودة والاعتمادية", description: "برنامج قيادة لمديري الجودة ومسؤولي الاعتماد — قيادة التدقيق وثقافة التحسين المستمر وإشراك أصحاب المصلحة." },
  },

  /* ── Engineering, Maintenance & Low Current ─────────────────────────── */
  {
    id: "eng1",
    category: "engineering",
    duration: "12",
    mode: "onsite",
    image: "https://picsum.photos/seed/mech-electrical-adv/800/600",
    en: { title: "Advanced Mechanical & Electrical Maintenance", description: "Advanced techniques for diagnosing, repairing, and maintaining mechanical and electrical systems in large tourism and hospitality facilities." },
    ar: { title: "برنامج الصيانة الميكانيكية والكهربائية المتقدمة", description: "تقنيات متقدمة لتشخيص وإصلاح وصيانة الأنظمة الميكانيكية والكهربائية في المنشآت السياحية والضيافة الكبيرة." },
  },
  {
    id: "eng2",
    category: "engineering",
    duration: "10",
    mode: "onsite",
    image: "https://picsum.photos/seed/hotel-facility-maint/800/600",
    en: { title: "Hotel & Tourism Facility Maintenance Programs", description: "Comprehensive maintenance management for hotel engineering teams — planned maintenance, asset management, and performance KPIs." },
    ar: { title: "برامج صيانة الفنادق والمنشآت السياحية", description: "إدارة صيانة شاملة لفرق هندسة الفنادق — الصيانة المخططة وإدارة الأصول ومؤشرات الأداء." },
  },
  {
    id: "eng3",
    category: "engineering",
    duration: "12",
    mode: "onsite",
    image: "https://picsum.photos/seed/fire-cctv-network/800/600",
    en: { title: "Low Current Systems: Fire Alarm, CCTV & Network", description: "Comprehensive engineering programme in fire detection, suppression, video surveillance, access control, and IT network infrastructure." },
    ar: { title: "برامج أنظمة التيار الخفيف: الإنذار والمراقبة والشبكات", description: "برنامج هندسي شامل في كشف الحريق والإخماد والمراقبة بالفيديو والتحكم في الوصول والبنية التحتية لشبكات تكنولوجيا المعلومات." },
  },
  {
    id: "eng4",
    category: "engineering",
    duration: "10",
    mode: "onsite",
    image: "https://picsum.photos/seed/refrigeration-hvac/800/600",
    en: { title: "Refrigeration, HVAC & Control Systems", description: "Installation, commissioning, and maintenance of HVAC, chiller, and BMS control systems in hotels and tourism facilities." },
    ar: { title: "برامج التبريد والتكييف وأنظمة التحكم", description: "تركيب وتشغيل وصيانة أنظمة تكييف الهواء والتبريد وأنظمة التحكم BMS في الفنادق والمنشآت السياحية." },
  },
  {
    id: "eng5",
    category: "engineering",
    duration: "8",
    mode: "onsite",
    image: "https://picsum.photos/seed/energy-control/800/600",
    en: { title: "Energy Management & Electricity Consumption Control", description: "Energy efficiency audits, smart metering, demand management, and power factor correction for sustainable hotel operations." },
    ar: { title: "برامج إدارة الطاقة والتحكم في استهلاك الكهرباء", description: "تدقيق كفاءة الطاقة والقياس الذكي وإدارة الطلب وتصحيح معامل القدرة للعمليات الفندقية المستدامة." },
  },
  {
    id: "eng6",
    category: "engineering",
    duration: "8",
    mode: "online",
    image: "https://picsum.photos/seed/quality-reliability/800/600",
    en: { title: "Quality & Technical Reliability Control", description: "Statistical quality control, reliability engineering, failure mode analysis (FMEA), and continuous improvement tools for engineering teams." },
    ar: { title: "برامج ضبط الجودة والاعتمادية الفنية", description: "ضبط الجودة الإحصائي وهندسة الموثوقية وتحليل أنماط الفشل (FMEA) وأدوات التحسين المستمر لفرق الهندسة." },
  },
  {
    id: "eng7",
    category: "engineering",
    duration: "12",
    mode: "onsite",
    image: "https://picsum.photos/seed/integrated-engineering/800/600",
    en: { title: "Integrated Engineering Systems for Hotels & Facilities", description: "Unified approach to managing all engineering disciplines — MEP, BMS, low current, and energy — as an integrated building ecosystem." },
    ar: { title: "برامج الأنظمة الهندسية المتكاملة للفنادق والمنشآت", description: "نهج موحد لإدارة جميع التخصصات الهندسية — MEP وBMS والتيار الخفيف والطاقة — كنظام بيئي متكامل للمبنى." },
  },
  {
    id: "eng8",
    category: "engineering",
    duration: "6",
    mode: "onsite",
    image: "https://picsum.photos/seed/industrial-security/800/600",
    en: { title: "Industrial Security & Occupational Safety", description: "Industrial safety management, hazardous area classification, PPE standards, and OSHA-aligned safety systems for engineering environments." },
    ar: { title: "برامج الأمن الصناعي والسلامة المهنية", description: "إدارة السلامة الصناعية وتصنيف المناطق الخطرة ومعايير معدات الحماية الشخصية وأنظمة السلامة المتوافقة مع OSHA." },
  },
  {
    id: "eng9",
    category: "engineering",
    duration: "6",
    mode: "onsite",
    image: "https://picsum.photos/seed/engineering-risk/800/600",
    en: { title: "Engineering & Industrial Risk Management", description: "Risk assessment frameworks, hazard identification, incident investigation, and engineering controls for industrial and tourism facility environments." },
    ar: { title: "برامج إدارة المخاطر الهندسية والصناعية", description: "أُطر تقييم المخاطر وتحديد المخاطر والتحقيق في الحوادث وضوابط الهندسة لبيئات المنشآت الصناعية والسياحية." },
  },
];

/* ─── Accreditations ──────────────────────────────────────────────────── */
export const accreditations = [
  {
    id: "iso",
    abbr: "ISO",
    en: { name: "ISO 9001:2015", full: "International Organization for Standardization" },
    ar: { name: "أيزو 9001:2015", full: "المنظمة الدولية للتوحيد القياسي" },
  },
  {
    id: "eos",
    abbr: "EOS",
    en: { name: "EOS", full: "Egyptian Organization for Standardization & Quality" },
    ar: { name: "الهيئة المصرية", full: "الهيئة المصرية للمواصفات والجودة" },
  },
  {
    id: "ims",
    abbr: "IMS",
    en: { name: "IMS", full: "Integrated Management System Certified" },
    ar: { name: "IMS", full: "نظام الإدارة المتكامل معتمد" },
  },
  {
    id: "nqi",
    abbr: "NQI",
    en: { name: "NQI", full: "National Quality Institute Excellence Award" },
    ar: { name: "معهد الجودة", full: "جائزة التميز من المعهد الوطني للجودة" },
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
      quote: "The applied diploma in Hotel Management transformed how I lead our operations team. The practical curriculum delivered immediate impact in our 5-star property.",
      name: "Sara El-Masry",
      role: "Operations Director, Nile Hotels Group",
    },
    ar: {
      quote: "دبلوم إدارة الفنادق التطبيقي غيّر أسلوب قيادتي لفريق العمليات. المنهج التطبيقي حقق أثراً فورياً في فندقنا الخمس نجوم.",
      name: "سارة المصري",
      role: "مديرة العمليات، مجموعة فنادق النيل",
    },
  },
  {
    id: "t2",
    avatar: "https://picsum.photos/seed/omar-face/120/120",
    en: {
      quote: "The Engineering Leadership programme elevated our entire maintenance department. We reduced downtime by 40% within three months of completion.",
      name: "Eng. Omar Hamed",
      role: "Chief Engineer, Red Sea Resort Group",
    },
    ar: {
      quote: "رفع برنامج القيادة الهندسية مستوى قسم الصيانة بأكمله. قلّصنا وقت التوقف بنسبة 40% خلال ثلاثة أشهر من إتمام البرنامج.",
      name: "م. عمر حامد",
      role: "المهندس الرئيسي، مجموعة منتجعات البحر الأحمر",
    },
  },
  {
    id: "t3",
    avatar: "https://picsum.photos/seed/layla-face/120/120",
    en: {
      quote: "Our staff completed the Customer Service and Quality programmes and guest satisfaction scores jumped by 28 points in our annual survey. Exceptional ROI.",
      name: "Layla Farouk",
      role: "Head of Training, Alexandria Tourism Authority",
    },
    ar: {
      quote: "أتمّ موظفونا برامج خدمة العملاء والجودة وارتفعت درجات رضا الضيوف بمقدار 28 نقطة في مسحنا السنوي. عائد استثمار استثنائي.",
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
      title: "New Applied Diploma Cohorts Open — Spring 2026",
      excerpt: "Registration is now open for the Spring 2026 intake across all Applied Diploma tracks including Hotel Management, Low Current Systems, and Leadership programmes.",
      tag: "Enrolment",
    },
    ar: {
      title: "فتح باب التسجيل للدبلومات التطبيقية — ربيع 2026",
      excerpt: "التسجيل مفتوح الآن لدفعة ربيع 2026 في جميع مسارات الدبلومات التطبيقية بما فيها إدارة الفنادق وأنظمة التيار الخفيف وبرامج القيادة.",
      tag: "تسجيل",
    },
  },
  {
    id: "n2",
    date: "2026-03-02",
    image: "https://picsum.photos/seed/news-research/600/400",
    en: {
      title: "AI AETAR Achieves ISO 9001:2015 Renewal for 2026",
      excerpt: "Our Quality Management System has been successfully re-certified for another three-year cycle, reaffirming our commitment to internationally accredited training standards.",
      tag: "Accreditation",
    },
    ar: {
      title: "المعهد يحصل على تجديد شهادة الأيزو 9001:2015 لعام 2026",
      excerpt: "تم تجديد اعتماد نظام إدارة الجودة لدينا بنجاح لدورة ثلاث سنوات أخرى، مما يؤكد التزامنا بمعايير التدريب المعتمدة دولياً.",
      tag: "اعتماد",
    },
  },
  {
    id: "n3",
    date: "2026-02-20",
    image: "https://picsum.photos/seed/news-partnership/600/400",
    en: {
      title: "New Engineering & Maintenance Track Launched",
      excerpt: "We have expanded our programme portfolio with 9 new Engineering, Maintenance, and Low Current Systems programmes responding directly to industry demand.",
      tag: "New Programme",
    },
    ar: {
      title: "إطلاق مسار الهندسة والصيانة الجديد",
      excerpt: "وسّعنا محفظة برامجنا بـ 9 برامج جديدة في الهندسة والصيانة وأنظمة التيار الخفيف استجابةً مباشرة لمتطلبات السوق.",
      tag: "برنامج جديد",
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
      bio: "PhD in Applied Tourism; 18 years in hospitality research and programme design. Former advisor to the Egyptian Ministry of Tourism.",
    },
    ar: {
      name: "د. أميرة حسن",
      role: "المديرة الأكاديمية",
      bio: "دكتوراه في السياحة التطبيقية؛ 18 عاماً في البحث السياحي وتصميم البرامج. مستشارة سابقة لوزارة السياحة المصرية.",
    },
  },
  {
    id: "2",
    image: "https://picsum.photos/seed/karim-team/400/600",
    en: {
      name: "Eng. Karim Nabil",
      role: "Engineering & Maintenance Lead",
      bio: "ISO-certified lead auditor with 20 years in hotel engineering. Specialist in integrated building systems, HVAC, and low current infrastructure.",
    },
    ar: {
      name: "م. كريم نبيل",
      role: "رئيس قسم الهندسة والصيانة",
      bio: "مدقق رئيسي معتمد ISO بخبرة 20 عاماً في هندسة الفنادق. متخصص في أنظمة المباني المتكاملة والتكييف والبنية التحتية للتيار الخفيف.",
    },
  },
  {
    id: "3",
    image: "https://picsum.photos/seed/dina-team/400/600",
    en: {
      name: "Ms. Dina Soliman",
      role: "Hospitality Programmes Lead",
      bio: "Former General Manager; designed F&B, front-office, and guest experience programmes adopted by 12 hotel brands across Egypt and the Gulf.",
    },
    ar: {
      name: "م. دينا سليمان",
      role: "رئيسة برامج الضيافة",
      bio: "مديرة عامة سابقة؛ صممت برامج الأغذية والمشروبات والاستقبال وتجربة الضيف المعتمدة من 12 علامة فندقية في مصر والخليج.",
    },
  },
  {
    id: "4",
    image: "https://picsum.photos/seed/hany-team/400/600",
    en: {
      name: "Mr. Hany Farid",
      role: "Quality & Accreditation Director",
      bio: "Lead ISO auditor and quality systems expert with 15 years managing accreditation processes for tourism and training institutions across the MENA region.",
    },
    ar: {
      name: "م. هاني فريد",
      role: "مدير الجودة والاعتماد",
      bio: "مدقق ISO رئيسي وخبير أنظمة الجودة بخبرة 15 عاماً في إدارة عمليات الاعتماد للمؤسسات السياحية والتدريبية في منطقة MENA.",
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
    courses: 8,
    countries: 5,
    specialties: ["Hotel Management", "Tourism Strategy", "Hospitality Operations"],
    en: { name: "Dr. Amira Hassan", role: "Lead Trainer — Tourism & Hospitality Management", bio: "18 years in applied tourism research. Designed hotel management diplomas delivered to over 800 hospitality professionals across Egypt and the Gulf." },
    ar: { name: "د. أميرة حسن", role: "المدربة الرئيسية — إدارة السياحة والضيافة", bio: "18 عاماً في البحث السياحي التطبيقي. صممت دبلومات إدارة الفنادق لأكثر من 800 مهني ضيافة في مصر والخليج." },
  },
  {
    id: "2",
    image: "https://picsum.photos/seed/trainer-karim/400/300",
    rating: 4.9,
    courses: 9,
    countries: 6,
    specialties: ["HVAC Systems", "Low Current", "Maintenance Management", "BMS"],
    en: { name: "Eng. Karim Nabil", role: "Lead Trainer — Engineering & Maintenance", bio: "Chief Engineer with 20 years experience in hotel MEP, BMS, HVAC, and low current systems. ISO-certified auditor for technical facility management." },
    ar: { name: "م. كريم نبيل", role: "المدرب الرئيسي — الهندسة والصيانة", bio: "مهندس رئيسي بخبرة 20 عاماً في MEP والBMS والتكييف وأنظمة التيار الخفيف للفنادق. مدقق معتمد ISO لإدارة المرافق الفنية." },
  },
  {
    id: "3",
    image: "https://picsum.photos/seed/trainer-dina/400/300",
    rating: 4.9,
    courses: 7,
    countries: 4,
    specialties: ["F&B Management", "Service Excellence", "Guest Relations", "Front Office"],
    en: { name: "Ms. Dina Soliman", role: "Lead Trainer — Hospitality Operations", bio: "Ex-General Manager at leading Cairo hotel. Designed F&B and front-office excellence programmes adopted by 12 international hotel brands." },
    ar: { name: "م. دينا سليمان", role: "المدربة الرئيسية — عمليات الضيافة", bio: "مديرة عامة سابقة في فندق رائد بالقاهرة. صممت برامج تميز في الأغذية والمشروبات والاستقبال لـ 12 علامة فندقية دولية." },
  },
  {
    id: "4",
    image: "https://picsum.photos/seed/trainer-hany/400/300",
    rating: 4.8,
    courses: 6,
    countries: 5,
    specialties: ["ISO 9001", "Quality Auditing", "Accreditation", "Process Improvement"],
    en: { name: "Mr. Hany Farid", role: "Lead Trainer — Quality & Accreditation", bio: "15 years managing ISO 9001 and IMS accreditation for tourism institutions. Expert in quality documentation, auditing, and compliance management." },
    ar: { name: "م. هاني فريد", role: "المدرب الرئيسي — الجودة والاعتماد", bio: "15 عاماً في إدارة اعتماد ISO 9001 وIMS للمؤسسات السياحية. خبير في توثيق الجودة والتدقيق وإدارة الامتثال." },
  },
  {
    id: "5",
    image: "https://picsum.photos/seed/trainer-layla/400/300",
    rating: 4.8,
    courses: 5,
    countries: 4,
    specialties: ["Security Management", "Risk Assessment", "Occupational Safety", "Emergency Response"],
    en: { name: "Mr. Tarek Saber", role: "Lead Trainer — Security, Safety & Risk", bio: "Former hotel security director with 18 years experience. Specialist in tourism risk management, OSHA standards, and emergency preparedness for facilities." },
    ar: { name: "م. طارق صابر", role: "المدرب الرئيسي — الأمن والسلامة والمخاطر", bio: "مدير أمن فندقي سابق بخبرة 18 عاماً. متخصص في إدارة مخاطر السياحة ومعايير OSHA والاستعداد للطوارئ في المنشآت." },
  },
  {
    id: "6",
    image: "https://picsum.photos/seed/trainer-tarek/400/300",
    rating: 4.7,
    courses: 6,
    countries: 3,
    specialties: ["Leadership Development", "Strategic Management", "HR in Hospitality", "Executive Coaching"],
    en: { name: "Dr. Nadia Mansour", role: "Lead Trainer — Leadership & HR", bio: "Organisational development specialist with a PhD in management. Designed leadership programmes for senior executives in tourism, hospitality, and government sectors." },
    ar: { name: "د. نادية منصور", role: "المدربة الرئيسية — القيادة والموارد البشرية", bio: "متخصصة في التطوير التنظيمي بدكتوراه في الإدارة. صممت برامج قيادة للمسؤولين التنفيذيين في قطاعات السياحة والضيافة والحكومة." },
  },
];
