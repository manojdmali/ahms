export interface Training {
  id: string;
  trainingId: string;
  title: string;
  titleOdia: string;
  category: 'technical' | 'management' | 'healthcare' | 'breeding' | 'dairy' | 'entrepreneurship';
  type: 'online' | 'offline' | 'hybrid';
  description: string;
  descriptionOdia: string;
  duration: string;
  durationOdia: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  language: string[];
  languageOdia: string[];
  instructor: string;
  instructorOdia: string;
  instructorQualification: string;
  organization: string;
  organizationOdia: string;
  venue?: string;
  venueOdia?: string;
  startDate: string;
  endDate: string;
  schedule: string;
  scheduleOdia: string;
  fees: number;
  seatsTotal: number;
  seatsAvailable: number;
  subsidy: number;
  netFees: number;
  rating: number;
  reviews: number;
  enrolled: number;
  status: 'upcoming' | 'ongoing' | 'completed' | 'registration-open';
  objectives: string[];
  objectivesOdia: string[];
  syllabus: { module: string; topics: string[]; moduleOdia: string; topicsOdia: string[] }[];
  prerequisites: string[];
  prerequisitesOdia: string[];
  benefits: string[];
  benefitsOdia: string[];
  certification: boolean;
  certificationDetails: string;
  certificationDetailsOdia: string;
  materials: string[];
  materialsOdia: string[];
  contactPerson: string;
  contactPhone: string;
  contactEmail: string;
  registrationDeadline: string;
  images: string[];
}

export const trainingData: Training[] = [
  {
    id: "trn-001",
    trainingId: "TRN-DAIRY-2024-001",
    title: "Advanced Dairy Farm Management",
    titleOdia: "ଉନ୍ନତ ଦୁଗ୍ଧ ଫାର୍ମ ପରିଚାଳନା",
    category: "management",
    type: "hybrid",
    description: "Comprehensive training program on modern dairy farm management covering herd management, milk production optimization, disease prevention, financial management, and marketing strategies. Hands-on practical sessions included.",
    descriptionOdia: "ପଶୁ ପରିଚାଳନା, ଦୁଗ୍ଧ ଉତ୍ପାଦନ ଅପ୍ଟିମାଇଜେସନ୍, ରୋଗ ପ୍ରତିରୋଧ, ଆର୍ଥିକ ପରିଚାଳନା ଏବଂ ମାର୍କେଟିଂ ରଣନୀତି ଆବୃତ କରୁଥିବା ଆଧୁନିକ ଦୁଗ୍ଧ ଫାର୍ମ ପରିଚାଳନା ଉପରେ ବ୍ୟାପକ ପ୍ରଶିକ୍ଷଣ କାର୍ଯ୍ୟକ୍ରମ।",
    duration: "4 weeks (60 hours)",
    durationOdia: "୪ ସପ୍ତାହ (୬୦ ଘଣ୍ଟା)",
    level: "intermediate",
    language: ["English", "Odia", "Hindi"],
    languageOdia: ["ଇଂରାଜୀ", "ଓଡ଼ିଆ", "ହିନ୍ଦୀ"],
    instructor: "Dr. Suresh Kumar Jena (PhD, Animal Husbandry)",
    instructorOdia: "ଡ଼. ସୁରେଶ କୁମାର ଜେନା (PhD, ପଶୁପାଳନ)",
    instructorQualification: "PhD in Animal Husbandry, 15+ years experience",
    organization: "Odisha State Dairy Development Board",
    organizationOdia: "ଓଡିଶା ରାଜ୍ୟ ଦୁଗ୍ଧ ବିକାଶ ବୋର୍ଡ",
    venue: "Regional Training Center, Bhubaneswar",
    venueOdia: "ଆଞ୍ଚଳିକ ତାଲିମ କେନ୍ଦ୍ର, ଭୁବନେଶ୍ୱର",
    startDate: "2024-12-15",
    endDate: "2025-01-10",
    schedule: "Monday to Friday, 10 AM - 2 PM",
    scheduleOdia: "ସୋମବାରରୁ ଶୁକ୍ରବାର, ୧୦ AM - ୨ PM",
    fees: 5000,
    seatsTotal: 40,
    seatsAvailable: 12,
    subsidy: 80,
    netFees: 1000,
    rating: 4.8,
    reviews: 156,
    enrolled: 28,
    status: "registration-open",
    objectives: [
      "Master modern dairy farm management techniques",
      "Learn optimal milk production strategies",
      "Understand disease prevention and control",
      "Develop financial management skills",
      "Create effective marketing plans",
      "Implement quality control measures"
    ],
    objectivesOdia: [
      "ଆଧୁନିକ ଦୁଗ୍ଧ ଫାର୍ମ ପରିଚାଳନା କୌଶଳ ଆୟତ୍ତ କରନ୍ତୁ",
      "ଅନୁକୂଳ ଦୁଗ୍ଧ ଉତ୍ପାଦନ ରଣନୀତି ଶିଖନ୍ତୁ",
      "ରୋଗ ପ୍ରତିରୋଧ ଏବଂ ନିୟନ୍ତ୍ରଣ ବୁଝନ୍ତୁ",
      "ଆର୍ଥିକ ପରିଚାଳନା କୌଶଳ ବିକଶିତ କରନ୍ତୁ",
      "ପ୍ରଭାବଶାଳୀ ମାର୍କେଟିଂ ଯୋଜନା ସୃଷ୍ଟି କରନ୍ତୁ",
      "ଗୁଣବତ୍ତା ନିୟନ୍ତ୍ରଣ ପଦକ୍ଷେପ କାର୍ଯ୍ୟକାରୀ କରନ୍ତୁ"
    ],
    syllabus: [
      {
        module: "Week 1: Herd Management Basics",
        topics: [
          "Cattle selection and breeding",
          "Housing and infrastructure",
          "Nutrition and feeding management",
          "Record keeping systems"
        ],
        moduleOdia: "ସପ୍ତାହ ୧: ପଶୁ ପରିଚାଳନା ମୂଳତତ୍ତ୍ୱ",
        topicsOdia: [
          "ଗୋରୁ ଚୟନ ଏବଂ ପ୍ରଜନନ",
          "ଗୃହ ଏବଂ ଭିତ୍ତିଭୂମି",
          "ପୋଷଣ ଏବଂ ଖାଦ୍ୟ ପରିଚାଳନା",
          "ରେକର୍ଡ ରଖିବା ପ୍ରଣାଳୀ"
        ]
      },
      {
        module: "Week 2: Milk Production Optimization",
        topics: [
          "Milking techniques and hygiene",
          "Lactation management",
          "Milk quality testing",
          "Production enhancement strategies"
        ],
        moduleOdia: "ସପ୍ତାହ ୨: ଦୁଗ୍ଧ ଉତ୍ପାଦନ ଅପ୍ଟିମାଇଜେସନ୍",
        topicsOdia: [
          "ଦୁଗ୍ଧ କୌଶଳ ଏବଂ ପରିଚ୍ଛନ୍ନତା",
          "ସ୍ତନ୍ୟପାନ ପରିଚାଳନା",
          "ଦୁଗ୍ଧ ଗୁଣବତ୍ତା ପରୀକ୍ଷଣ",
          "ଉତ୍ପାଦନ ବୃଦ୍ଧି ରଣନୀତି"
        ]
      },
      {
        module: "Week 3: Health & Disease Management",
        topics: [
          "Common diseases and prevention",
          "Vaccination schedules",
          "Emergency care protocols",
          "Veterinary coordination"
        ],
        moduleOdia: "ସପ୍ତାହ ୩: ସ୍ୱାସ୍ଥ୍ୟ ଏବଂ ରୋଗ ପରିଚାଳନା",
        topicsOdia: [
          "ସାଧାରଣ ରୋଗ ଏବଂ ପ୍ରତିରୋଧ",
          "ଟିକାକରଣ କାର୍ଯ୍ୟସୂଚୀ",
          "ଜରୁରୀକାଳୀନ ଯତ୍ନ ପ୍ରୋଟୋକଲ୍",
          "ପ୍ରାଣୀ ଚିକିତ୍ସା ସମନ୍ୱୟ"
        ]
      },
      {
        module: "Week 4: Business & Marketing",
        topics: [
          "Financial planning and budgeting",
          "Cost optimization techniques",
          "Marketing and value addition",
          "Government schemes and subsidies"
        ],
        moduleOdia: "ସପ୍ତାହ ୪: ବ୍ୟବସାୟ ଏବଂ ମାର୍କେଟିଂ",
        topicsOdia: [
          "ଆର୍ଥିକ ଯୋଜନା ଏବଂ ବଜେଟିଂ",
          "ଖର୍ଚ୍ଚ ଅପ୍ଟିମାଇଜେସନ୍ କୌଶଳ",
          "ମାର୍କେଟିଂ ଏବଂ ମୂଲ୍ୟ ଯୋଗ",
          "ସରକାରୀ ଯୋଜନା ଏବଂ ସବସିଡି"
        ]
      }
    ],
    prerequisites: [
      "Basic knowledge of dairy farming",
      "Own or plan to start a dairy farm",
      "Minimum 10th standard education"
    ],
    prerequisitesOdia: [
      "ଦୁଗ୍ଧ ଚାଷର ମୂଳ ଜ୍ଞାନ",
      "ଦୁଗ୍ଧ ଫାର୍ମ ମାଲିକ କିମ୍ବା ଆରମ୍ଭ କରିବାକୁ ଯୋଜନା",
      "ସର୍ବନିମ୍ନ ୧୦ମ ଶ୍ରେଣୀ ଶିକ୍ଷା"
    ],
    benefits: [
      "Increase milk production by 30-40%",
      "Reduce disease incidence",
      "Improve farm profitability",
      "Access to expert network",
      "Government certification",
      "Priority for loans and subsidies"
    ],
    benefitsOdia: [
      "ଦୁଗ୍ଧ ଉତ୍ପାଦନ ୩୦-୪୦% ବୃଦ୍ଧି",
      "ରୋଗ ଘଟଣା ହ୍ରାସ",
      "ଫାର୍ମ ଲାଭଦାୟକତା ଉନ୍ନତି",
      "ବିଶେଷଜ୍ଞ ନେଟୱାର୍କ ପ୍ରବେଶ",
      "ସରକାରୀ ପ୍ରମାଣପତ୍ର",
      "ଋଣ ଏବଂ ସବସିଡି ପାଇଁ ପ୍ରାଥମିକତା"
    ],
    certification: true,
    certificationDetails: "Certificate of Completion from Odisha State Dairy Development Board, recognized by Government of Odisha",
    certificationDetailsOdia: "ଓଡିଶା ରାଜ୍ୟ ଦୁଗ୍ଧ ବିକାଶ ବୋର୍ଡରୁ ସମାପ୍ତି ପ୍ରମାଣପତ୍ର, ଓଡିଶା ସରକାର ଦ୍ୱାରା ସ୍ୱୀକୃତ",
    materials: [
      "Training manual (English & Odia)",
      "Video lectures access",
      "Case study materials",
      "Practice worksheets",
      "Farm visit reports template",
      "Digital resources library"
    ],
    materialsOdia: [
      "ତାଲିମ ମାନୁଆଲ୍ (ଇଂରାଜୀ ଏବଂ ଓଡ଼ିଆ)",
      "ଭିଡିଓ ବକ୍ତୃତା ପ୍ରବେଶ",
      "କେସ୍ ଷ୍ଟଡି ସାମଗ୍ରୀ",
      "ଅଭ୍ୟାସ ୱାର୍କସିଟ୍",
      "ଫାର୍ମ ପରିଦର୍ଶନ ରିପୋର୍ଟ ଟେମ୍ପଲେଟ୍",
      "ଡିଜିଟାଲ୍ ଉତ୍ସ ଲାଇବ୍ରେରୀ"
    ],
    contactPerson: "Mr. Rajesh Panda",
    contactPhone: "+91-674-2345678",
    contactEmail: "training@odishadairy.gov.in",
    registrationDeadline: "2024-12-10",
    images: ["https://images.unsplash.com/photo-1516467508483-a7212febe31a?w=800"]
  },
  {
    id: "trn-002",
    trainingId: "TRN-AI-2024-002",
    title: "Artificial Insemination Techniques for Technicians",
    titleOdia: "ପ୍ରାଣୀ କୃତ୍ରିମ ଗର୍ଭାଧାନ କୌଶଳ",
    category: "breeding",
    type: "offline",
    description: "Intensive hands-on training for aspiring AI technicians. Learn semen handling, estrus detection, insemination procedures, pregnancy diagnosis, and record keeping. Certification enables you to work as a professional AI technician.",
    descriptionOdia: "ଆକାଂକ୍ଷୀ AI ଟେକ୍ନିସିଆନମାନଙ୍କ ପାଇଁ ଘନିଷ୍ଠ ହ୍ୟାଣ୍ଡ-ଅନ୍ ପ୍ରଶିକ୍ଷଣ। ସେମେନ୍ ହ୍ୟାଣ୍ଡଲିଂ, ଏଷ୍ଟ୍ରସ୍ ଚିହ୍ନଟ, ଗର୍ଭାଧାନ ପ୍ରକ୍ରିୟା, ଗର୍ଭଧାରଣ ନିର୍ଣ୍ଣୟ ଏବଂ ରେକର୍ଡ ରଖିବା ଶିଖନ୍ତୁ।",
    duration: "3 weeks (90 hours)",
    durationOdia: "୩ ସପ୍ତାହ (୯୦ ଘଣ୍ଟା)",
    level: "advanced",
    language: ["English", "Odia"],
    languageOdia: ["ଇଂରାଜୀ", "ଓଡ଼ିଆ"],
    instructor: "Dr. Priya Mohapatra (MVSc, Reproduction)",
    instructorOdia: "ଡ଼. ପ୍ରିୟା ମହାପାତ୍ର (MVSc, ପ୍ରଜନନ)",
    instructorQualification: "MVSc in Animal Reproduction, Certified AI Trainer",
    organization: "National Dairy Development Board - Regional Center",
    organizationOdia: "ଜାତୀୟ ଦୁଗ୍ଧ ବିକାଶ ବୋର୍ଡ - ଆଞ୍ଚଳିକ କେନ୍ଦ୍ର",
    venue: "NDDB Training Center, Cuttack",
    venueOdia: "NDDB ତାଲିମ କେନ୍ଦ୍ର, କଟକ",
    startDate: "2024-12-20",
    endDate: "2025-01-08",
    schedule: "Monday to Saturday, 9 AM - 5 PM",
    scheduleOdia: "ସୋମବାରରୁ ଶନିବାର, ୯ AM - ୫ PM",
    fees: 8000,
    seatsTotal: 25,
    seatsAvailable: 8,
    subsidy: 50,
    netFees: 4000,
    rating: 4.9,
    reviews: 203,
    enrolled: 17,
    status: "registration-open",
    objectives: [
      "Master AI techniques for cattle and buffalo",
      "Learn proper semen handling and storage",
      "Develop estrus detection skills",
      "Understand reproductive anatomy and physiology",
      "Practice pregnancy diagnosis methods",
      "Maintain accurate breeding records"
    ],
    objectivesOdia: [
      "ଗୋରୁ ଏବଂ ମହିଷ ପାଇଁ AI କୌଶଳ ଆୟତ୍ତ କରନ୍ତୁ",
      "ସଠିକ୍ ସେମେନ୍ ହ୍ୟାଣ୍ଡଲିଂ ଏବଂ ସଂରକ୍ଷଣ ଶିଖନ୍ତୁ",
      "ଏଷ୍ଟ୍ରସ୍ ଚିହ୍ନଟ କୌଶଳ ବିକଶିତ କରନ୍ତୁ",
      "ପ୍ରଜନନ ଅନାଟୋମି ଏବଂ ଫିଜିଓଲୋଜି ବୁଝନ୍ତୁ",
      "ଗର୍ଭଧାରଣ ନିର୍ଣ୍ଣୟ ପଦ୍ଧତି ଅଭ୍ୟାସ କରନ୍ତୁ",
      "ସଠିକ୍ ପ୍ରଜନନ ରେକର୍ଡ ବଜାୟ ରଖନ୍ତୁ"
    ],
    syllabus: [
      {
        module: "Week 1: Reproductive Anatomy & Physiology",
        topics: [
          "Reproductive system of cattle and buffalo",
          "Estrus cycle and hormonal control",
          "Semen production and quality",
          "Liquid nitrogen handling"
        ],
        moduleOdia: "ସପ୍ତାହ ୧: ପ୍ରଜନନ ଅନାଟୋମି ଏବଂ ଫିଜିଓଲୋଜି",
        topicsOdia: [
          "ଗୋରୁ ଏବଂ ମହିଷର ପ୍ରଜନନ ପ୍ରଣାଳୀ",
          "ଏଷ୍ଟ୍ରସ୍ ଚକ୍ର ଏବଂ ହରମୋନାଲ୍ ନିୟନ୍ତ୍ରଣ",
          "ସେମେନ୍ ଉତ୍ପାଦନ ଏବଂ ଗୁଣବତ୍ତା",
          "ତରଳ ନାଇଟ୍ରୋଜେନ୍ ହ୍ୟାଣ୍ଡଲିଂ"
        ]
      },
      {
        module: "Week 2: AI Techniques & Practice",
        topics: [
          "Estrus detection methods",
          "Insemination timing",
          "AI gun handling and procedures",
          "Semen thawing techniques",
          "Field practice sessions"
        ],
        moduleOdia: "ସପ୍ତାହ ୨: AI କୌଶଳ ଏବଂ ଅଭ୍ୟାସ",
        topicsOdia: [
          "ଏଷ୍ଟ୍ରସ୍ ଚିହ୍ନଟ ପଦ୍ଧତି",
          "ଗର୍ଭାଧାନ ସମୟ",
          "AI ଗନ୍ ହ୍ୟାଣ୍ଡଲିଂ ଏବଂ ପ୍ରକ୍ରିୟା",
          "ସେମେନ୍ ଥୱିଂ କୌଶଳ",
          "ଫିଲ୍ଡ ଅଭ୍ୟାସ ଅଧିବେଶନ"
        ]
      },
      {
        module: "Week 3: Pregnancy Diagnosis & Record Keeping",
        topics: [
          "Pregnancy diagnosis techniques",
          "Post-AI care and follow-up",
          "Record keeping systems",
          "Common problems and solutions",
          "Final assessment and certification"
        ],
        moduleOdia: "ସପ୍ତାହ ୩: ଗର୍ଭଧାରଣ ନିର୍ଣ୍ଣୟ ଏବଂ ରେକର୍ଡ ରଖିବା",
        topicsOdia: [
          "ଗର୍ଭଧାରଣ ନିର୍ଣ୍ଣୟ କୌଶଳ",
          "AI ପରବର୍ତ୍ତୀ ଯତ୍ନ ଏବଂ ଅନୁସରଣ",
          "ରେକର୍ଡ ରଖିବା ପ୍ରଣାଳୀ",
          "ସାଧାରଣ ସମସ୍ୟା ଏବଂ ସମାଧାନ",
          "ଅନ୍ତିମ ମୂଲ୍ୟାଙ୍କନ ଏବଂ ପ୍ରମାଣପତ୍ର"
        ]
      }
    ],
    prerequisites: [
      "12th standard with Biology/Agriculture",
      "Age between 18-45 years",
      "Physical fitness for field work",
      "Basic English/Odia reading ability"
    ],
    prerequisitesOdia: [
      "ଜୀବବିଜ୍ଞାନ/କୃଷି ସହିତ ୧୨ମ ଶ୍ରେଣୀ",
      "୧୮-୪୫ ବର୍ଷ ମଧ୍ୟରେ ବୟସ",
      "କ୍ଷେତ୍ର କାର୍ଯ୍ୟ ପାଇଁ ଶାରୀରିକ ଫିଟନେସ୍",
      "ମୂଳ ଇଂରାଜୀ/ଓଡ଼ିଆ ପଢିବା କ୍ଷମତା"
    ],
    benefits: [
      "Become certified AI technician",
      "Employment opportunity with dairy boards",
      "Start own AI service business",
      "Monthly income potential: ₹15,000-30,000",
      "Government registration and ID card",
      "Tool kit provided after completion"
    ],
    benefitsOdia: [
      "ପ୍ରମାଣିତ AI ଟେକ୍ନିସିଆନ୍ ହୁଅନ୍ତୁ",
      "ଦୁଗ୍ଧ ବୋର୍ଡ ସହିତ ନିଯୁକ୍ତି ସୁଯୋଗ",
      "ନିଜର AI ସେବା ବ୍ୟବସାୟ ଆରମ୍ଭ କରନ୍ତୁ",
      "ମାସିକ ଆୟ ସମ୍ଭାବନା: ₹୧୫,୦୦୦-୩୦,୦୦୦",
      "ସରକାରୀ ପଞ୍ଜୀକରଣ ଏବଂ ID କାର୍ଡ",
      "ସମାପ୍ତି ପରେ ଟୁଲ୍ କିଟ୍ ପ୍ରଦାନ କରାଯାଏ"
    ],
    certification: true,
    certificationDetails: "NDDB Certified AI Technician Certificate, valid for employment across India",
    certificationDetailsOdia: "NDDB ପ୍ରମାଣିତ AI ଟେକ୍ନିସିଆନ୍ ପ୍ରମାଣପତ୍ର, ଭାରତରେ ନିଯୁକ୍ତି ପାଇଁ ବୈଧ",
    materials: [
      "AI equipment training kit",
      "Comprehensive training manual",
      "Video demonstration library",
      "Practice sheets and forms",
      "Safety equipment",
      "Reference books (English & Odia)"
    ],
    materialsOdia: [
      "AI ଉପକରଣ ତାଲିମ କିଟ୍",
      "ବ୍ୟାପକ ତାଲିମ ମାନୁଆଲ୍",
      "ଭିଡିଓ ପ୍ରଦର୍ଶନ ଲାଇବ୍ରେରୀ",
      "ଅଭ୍ୟାସ ସିଟ୍ ଏବଂ ଫର୍ମ",
      "ସୁରକ୍ଷା ଉପକରଣ",
      "ସନ୍ଦର୍ଭ ପୁସ୍ତକ (ଇଂରାଜୀ ଏବଂ ଓଡ଼ିଆ)"
    ],
    contactPerson: "Dr. Sanjay Mohanty",
    contactPhone: "+91-671-2567890",
    contactEmail: "ai.training@nddb.org.in",
    registrationDeadline: "2024-12-15",
    images: ["https://images.unsplash.com/photo-1581579438747-1dc8d17bbce4?w=800"]
  },
  {
    id: "trn-003",
    trainingId: "TRN-VET-2024-003",
    title: "Basic Animal Healthcare for Farmers",
    titleOdia: "କୃଷକଙ୍କ ପାଇଁ ମୂଳ ପଶୁ ସ୍ୱାସ୍ଥ୍ୟସେବା",
    category: "healthcare",
    type: "online",
    description: "Essential veterinary care training for farmers to identify common diseases, administer first aid, maintain animal health records, and coordinate with veterinary services. Practical tips for daily animal care and disease prevention.",
    descriptionOdia: "ସାଧାରଣ ରୋଗ ଚିହ୍ନଟ, ପ୍ରଥମ ଚିକିତ୍ସା ପ୍ରଦାନ, ପଶୁ ସ୍ୱାସ୍ଥ୍ୟ ରେକର୍ଡ ବଜାୟ ରଖିବା ଏବଂ ପ୍ରାଣୀ ଚିକିତ୍ସା ସେବା ସହ ସମନ୍ୱୟ ପାଇଁ କୃଷକଙ୍କ ପାଇଁ ଅତ୍ୟାବଶ୍ୟକ ପ୍ରାଣୀ ଚିକିତ୍ସା ତାଲିମ।",
    duration: "2 weeks (30 hours)",
    durationOdia: "୨ ସପ୍ତାହ (୩୦ ଘଣ୍ଟା)",
    level: "beginner",
    language: ["Odia", "Hindi", "English"],
    languageOdia: ["ଓଡ଼ିଆ", "ହିନ୍ଦୀ", "ଇଂରାଜୀ"],
    instructor: "Dr. Anita Pradhan (BVSc & AH)",
    instructorOdia: "ଡ଼. ଅନିତା ପ୍ରଧାନ (BVSc & AH)",
    instructorQualification: "BVSc & AH, 8 years field experience",
    organization: "Odisha Animal Resource Development",
    organizationOdia: "ଓଡିଶା ପଶୁ ସମ୍ପଦ ବିକାଶ",
    startDate: "2024-12-08",
    endDate: "2024-12-21",
    schedule: "Self-paced online, Live sessions on Weekends",
    scheduleOdia: "ସେଲ୍ଫ-ପେସ୍ ଅନଲାଇନ୍, ସପ୍ତାହାନ୍ତରେ ଲାଇଭ୍ ଅଧିବେଶନ",
    fees: 2000,
    seatsTotal: 100,
    seatsAvailable: 45,
    subsidy: 75,
    netFees: 500,
    rating: 4.7,
    reviews: 432,
    enrolled: 55,
    status: "registration-open",
    objectives: [
      "Identify common animal diseases",
      "Provide basic first aid to livestock",
      "Maintain health and vaccination records",
      "Recognize emergency situations",
      "Implement preventive health measures",
      "Coordinate with veterinary professionals"
    ],
    objectivesOdia: [
      "ସାଧାରଣ ପଶୁ ରୋଗ ଚିହ୍ନଟ କରନ୍ତୁ",
      "ପଶୁଧନକୁ ମୂଳ ପ୍ରଥମ ଚିକିତ୍ସା ପ୍ରଦାନ କରନ୍ତୁ",
      "ସ୍ୱାସ୍ଥ୍ୟ ଏବଂ ଟିକାକରଣ ରେକର୍ଡ ବଜାୟ ରଖନ୍ତୁ",
      "ଜରୁରୀକାଳୀନ ପରିସ୍ଥିତି ଚିହ୍ନନ୍ତୁ",
      "ପ୍ରତିରୋଧକ ସ୍ୱାସ୍ଥ୍ୟ ପଦକ୍ଷେପ କାର୍ଯ୍ୟକାରୀ କରନ୍ତୁ",
      "ପ୍ରାଣୀ ଚିକିତ୍ସା ବୃତ୍ତିଗତଙ୍କ ସହ ସମନ୍ୱୟ କରନ୍ତୁ"
    ],
    syllabus: [
      {
        module: "Module 1: Animal Health Basics",
        topics: [
          "Signs of healthy vs sick animals",
          "Common diseases in cattle and buffalo",
          "Vaccination schedules",
          "Deworming protocols"
        ],
        moduleOdia: "ମଡ୍ୟୁଲ୍ ୧: ପଶୁ ସ୍ୱାସ୍ଥ୍ୟ ମୂଳତତ୍ତ୍ୱ",
        topicsOdia: [
          "ସୁସ୍ଥ ବନାମ ଅସୁସ୍ଥ ପଶୁର ଚିହ୍ନ",
          "ଗୋରୁ ଏବଂ ମହିଷରେ ସାଧାରଣ ରୋଗ",
          "ଟିକାକରଣ କାର୍ଯ୍ୟସୂଚୀ",
          "କୃମିମୁକ୍ତ ପ୍ରୋଟୋକଲ୍"
        ]
      },
      {
        module: "Module 2: First Aid & Emergency Care",
        topics: [
          "Basic first aid procedures",
          "Wound cleaning and dressing",
          "Emergency response protocols",
          "When to call a veterinarian"
        ],
        moduleOdia: "ମଡ୍ୟୁଲ୍ ୨: ପ୍ରଥମ ଚିକିତ୍ସା ଏବଂ ଜରୁରୀକାଳୀନ ଯତ୍ନ",
        topicsOdia: [
          "ମୂଳ ପ୍ରଥମ ଚିକିତ୍ସା ପ୍ରକ୍ରିୟା",
          "କ୍ଷତ ସଫା ଏବଂ ଡ୍ରେସିଂ",
          "ଜରୁରୀକାଳୀନ ପ୍ରତିକ୍ରିୟା ପ୍ରୋଟୋକଲ୍",
          "ପ୍ରାଣୀ ଚିକିତ୍ସକଙ୍କୁ କେବେ ଡାକିବେ"
        ]
      },
      {
        module: "Module 3: Preventive Care",
        topics: [
          "Hygiene and sanitation",
          "Nutrition for disease prevention",
          "Stress management in animals",
          "Biosecurity measures"
        ],
        moduleOdia: "ମଡ୍ୟୁଲ୍ ୩: ପ୍ରତିରୋଧକ ଯତ୍ନ",
        topicsOdia: [
          "ପରିଷ୍କାର ଏବଂ ପରିଚ୍ଛନ୍ନତା",
          "ରୋଗ ପ୍ରତିରୋଧ ପାଇଁ ପୋଷଣ",
          "ପଶୁମାନଙ୍କରେ ଚାପ ପରିଚାଳନା",
          "ବାୟୋସିକ୍ୟୁରିଟି ପଦକ୍ଷେପ"
        ]
      }
    ],
    prerequisites: [
      "Own livestock or planning to",
      "Basic smartphone/computer skills",
      "Interest in animal welfare"
    ],
    prerequisitesOdia: [
      "ପଶୁଧନ ମାଲିକ କିମ୍ବା ଯୋଜନା",
      "ମୂଳ ସ୍ମାର୍ଟଫୋନ/କମ୍ପ୍ୟୁଟର କୌଶଳ",
      "ପଶୁ କଲ୍ୟାଣରେ ଆଗ୍ରହ"
    ],
    benefits: [
      "Reduce veterinary costs by 40-50%",
      "Early disease detection",
      "Improve animal welfare",
      "Reduce mortality rates",
      "Better coordination with vets",
      "Lifetime course access"
    ],
    benefitsOdia: [
      "ପ୍ରାଣୀ ଚିକିତ୍ସା ଖର୍ଚ୍ଚ ୪୦-୫୦% ହ୍ରାସ",
      "ପ୍ରାରମ୍ଭିକ ରୋଗ ଚିହ୍ନଟ",
      "ପଶୁ କଲ୍ୟାଣ ଉନ୍ନତି",
      "ମୃତ୍ୟୁହାର ହ୍ରାସ",
      "ପ୍ରାଣୀ ଚିକିତ୍ସକଙ୍କ ସହ ଉତ୍ତମ ସମନ୍ୱୟ",
      "ଆଜୀବନ ପାଠ୍ୟକ୍ରମ ପ୍ରବେଶ"
    ],
    certification: true,
    certificationDetails: "Digital Certificate of Completion, recognized by Odisha Animal Resource Development",
    certificationDetailsOdia: "ଡିଜିଟାଲ୍ ସମାପ୍ତି ପ୍ରମାଣପତ୍ର, ଓଡିଶା ପଶୁ ସମ୍ପଦ ବିକାଶ ଦ୍ୱାରା ସ୍ୱୀକୃତ",
    materials: [
      "Video lectures in Odia/Hindi",
      "Digital handbook (PDF)",
      "Disease identification charts",
      "First aid checklist",
      "Vaccination calendar",
      "WhatsApp support group"
    ],
    materialsOdia: [
      "ଓଡ଼ିଆ/ହିନ୍ଦୀରେ ଭିଡିଓ ବକ୍ତୃତା",
      "ଡିଜିଟାଲ୍ ହ୍ୟାଣ୍ଡବୁକ୍ (PDF)",
      "ରୋଗ ଚିହ୍ନଟ ଚାର୍ଟ",
      "ପ୍ରଥମ ଚିକିତ୍ସା ଚେକଲିଷ୍ଟ",
      "ଟିକାକରଣ କ୍ୟାଲେଣ୍ଡର",
      "WhatsApp ସହାୟତା ଗୋଷ୍ଠୀ"
    ],
    contactPerson: "Ms. Sunita Das",
    contactPhone: "+91-674-2456789",
    contactEmail: "healthcare.training@oard.gov.in",
    registrationDeadline: "2024-12-05",
    images: ["https://images.unsplash.com/photo-1628771065518-0d82f1938462?w=800"]
  },
  {
    id: "trn-004",
    trainingId: "TRN-ENT-2024-004",
    title: "Dairy Entrepreneurship & Business Development",
    titleOdia: "ଦୁଗ୍ଧ ଉଦ୍ୟୋଗ ଏବଂ ବ୍ୟବସାୟ ବିକାଶ",
    category: "entrepreneurship",
    type: "hybrid",
    description: "Transform your dairy farm into a profitable business. Learn business planning, financial management, value addition, marketing strategies, accessing loans, and scaling operations. Includes mentorship from successful dairy entrepreneurs.",
    descriptionOdia: "ଆପଣଙ୍କ ଦୁଗ୍ଧ ଫାର୍ମକୁ ଏକ ଲାଭଜନକ ବ୍ୟବସାୟରେ ପରିଣତ କରନ୍ତୁ। ବ୍ୟବସାୟ ଯୋଜନା, ଆର୍ଥିକ ପରିଚାଳନା, ମୂଲ୍ୟ ଯୋଗ, ମାର୍କେଟିଂ ରଣନୀତି, ଋଣ ପ୍ରବେଶ ଏବଂ ସ୍କେଲିଂ ଶିଖନ୍ତୁ।",
    duration: "3 weeks (45 hours)",
    durationOdia: "୩ ସପ୍ତାହ (୪୫ ଘଣ୍ଟା)",
    level: "intermediate",
    language: ["English", "Odia"],
    languageOdia: ["ଇଂରାଜୀ", "ଓଡ଼ିଆ"],
    instructor: "Mr. Biswajit Swain (MBA, Dairy Management)",
    instructorOdia: "ଶ୍ରୀ ବିଶ୍ୱଜିତ୍ ସ୍ୱାଇନ୍ (MBA, ଦୁଗ୍ଧ ପରିଚାଳନା)",
    instructorQualification: "MBA in Agribusiness, Successful Dairy Entrepreneur",
    organization: "NABARD - Farmer Training Institute",
    organizationOdia: "NABARD - କୃଷକ ତାଲିମ ପ୍ରତିଷ୍ଠାନ",
    venue: "NABARD Campus, Bhubaneswar + Online",
    venueOdia: "NABARD କ୍ୟାମ୍ପସ୍, ଭୁବନେଶ୍ୱର + ଅନଲାଇନ୍",
    startDate: "2025-01-05",
    endDate: "2025-01-25",
    schedule: "Weekends, 10 AM - 4 PM",
    scheduleOdia: "ସପ୍ତାହାନ୍ତ, ୧୦ AM - ୪ PM",
    fees: 6000,
    seatsTotal: 35,
    seatsAvailable: 18,
    subsidy: 60,
    netFees: 2400,
    rating: 4.8,
    reviews: 189,
    enrolled: 17,
    status: "upcoming",
    objectives: [
      "Develop comprehensive business plans",
      "Understand dairy market dynamics",
      "Learn financial planning and budgeting",
      "Explore value addition opportunities",
      "Master marketing and branding",
      "Access funding and government schemes"
    ],
    objectivesOdia: [
      "ବ୍ୟାପକ ବ୍ୟବସାୟ ଯୋଜନା ବିକଶିତ କରନ୍ତୁ",
      "ଦୁଗ୍ଧ ବଜାର ଗତିଶୀଳତା ବୁଝନ୍ତୁ",
      "ଆର୍ଥିକ ଯୋଜନା ଏବଂ ବଜେଟିଂ ଶିଖନ୍ତୁ",
      "ମୂଲ୍ୟ ଯୋଗ ସୁଯୋଗ ଅନ୍ୱେଷଣ କରନ୍ତୁ",
      "ମାର୍କେଟିଂ ଏବଂ ବ୍ରାଣ୍ଡିଂ ଆୟତ୍ତ କରନ୍ତୁ",
      "ଅର୍ଥ ଏବଂ ସରକାରୀ ଯୋଜନା ପ୍ରବେଶ"
    ],
    syllabus: [
      {
        module: "Week 1: Business Fundamentals",
        topics: [
          "Dairy business models",
          "Market analysis and opportunities",
          "Business plan development",
          "Legal and regulatory compliance"
        ],
        moduleOdia: "ସପ୍ତାହ ୧: ବ୍ୟବସାୟ ମୂଳତତ୍ତ୍ୱ",
        topicsOdia: [
          "ଦୁଗ୍ଧ ବ୍ୟବସାୟ ମଡେଲ୍",
          "ବଜାର ବିଶ୍ଳେଷଣ ଏବଂ ସୁଯୋଗ",
          "ବ୍ୟବସାୟ ଯୋଜନା ବିକାଶ",
          "ଆଇନଗତ ଏବଂ ନିୟାମକ ଅନୁପାଳନ"
        ]
      },
      {
        module: "Week 2: Financial Management & Funding",
        topics: [
          "Cost estimation and pricing",
          "Financial record keeping",
          "Loan application process",
          "Government subsidies and schemes",
          "Risk management"
        ],
        moduleOdia: "ସପ୍ତାହ ୨: ଆର୍ଥିକ ପରିଚାଳନା ଏବଂ ଅର୍ଥ",
        topicsOdia: [
          "ଖର୍ଚ୍ଚ ଆକଳନ ଏବଂ ମୂଲ୍ୟ ନିର୍ଧାରଣ",
          "ଆର୍ଥିକ ରେକର୍ଡ ରଖିବା",
          "ଋଣ ଆବେଦନ ପ୍ରକ୍ରିୟା",
          "ସରକାରୀ ସବସିଡି ଏବଂ ଯୋଜନା",
          "ବିପଦ ପରିଚାଳନା"
        ]
      },
      {
        module: "Week 3: Marketing & Scaling",
        topics: [
          "Value addition in dairy products",
          "Branding and packaging",
          "Digital marketing for dairy",
          "Distribution channels",
          "Scaling strategies",
          "Mentorship sessions"
        ],
        moduleOdia: "ସପ୍ତାହ ୩: ମାର୍କେଟିଂ ଏବଂ ସ୍କେଲିଂ",
        topicsOdia: [
          "ଦୁଗ୍ଧ ଉତ୍ପାଦରେ ମୂଲ୍ୟ ଯୋଗ",
          "ବ୍ରାଣ୍ଡିଂ ଏବଂ ପ୍ୟାକେଜିଂ",
          "ଦୁଗ୍ଧ ପାଇଁ ଡିଜିଟାଲ୍ ମାର୍କେଟିଂ",
          "ବଣ୍ଟନ ଚ୍ୟାନେଲ୍",
          "ସ୍କେଲିଂ ରଣନୀତି",
          "ମେଣ୍ଟରସିପ୍ ଅଧିବେଶନ"
        ]
      }
    ],
    prerequisites: [
      "Existing dairy farm or concrete plan",
      "Basic business understanding",
      "Commitment to business growth"
    ],
    prerequisitesOdia: [
      "ବିଦ୍ୟମାନ ଦୁଗ୍ଧ ଫାର୍ମ କିମ୍ବା ଠୋସ୍ ଯୋଜନା",
      "ମୂଳ ବ୍ୟବସାୟ ବୁଝାମଣା",
      "ବ୍ୟବସାୟ ବୃଦ୍ଧି ପାଇଁ ପ୍ରତିବଦ୍ଧତା"
    ],
    benefits: [
      "Increase profitability by 50-100%",
      "Access to ₹10-50 lakh loans",
      "Network with successful entrepreneurs",
      "Business plan ready for funding",
      "Ongoing mentorship (6 months)",
      "Market linkage support"
    ],
    benefitsOdia: [
      "ଲାଭଦାୟକତା ୫୦-୧୦୦% ବୃଦ୍ଧି",
      "₹୧୦-୫୦ ଲକ୍ଷ ଋଣ ପ୍ରବେଶ",
      "ସଫଳ ଉଦ୍ୟୋଗୀଙ୍କ ସହ ନେଟୱାର୍କ",
      "ଅର୍ଥ ପାଇଁ ବ୍ୟବସାୟ ଯୋଜନା ପ୍ରସ୍ତୁତ",
      "ଚାଲୁଥିବା ମେଣ୍ଟରସିପ୍ (୬ ମାସ)",
      "ବଜାର ଲିଙ୍କେଜ୍ ସହାୟତା"
    ],
    certification: true,
    certificationDetails: "NABARD Certificate of Dairy Entrepreneurship, helps in loan applications",
    certificationDetailsOdia: "NABARD ଦୁଗ୍ଧ ଉଦ୍ୟୋଗ ପ୍ରମାଣପତ୍ର, ଋଣ ଆବେଦନରେ ସାହାଯ୍ୟ କରେ",
    materials: [
      "Business plan template",
      "Financial calculators",
      "Marketing toolkit",
      "Case studies of successful farms",
      "Government scheme directory",
      "Mentor contact database"
    ],
    materialsOdia: [
      "ବ୍ୟବସାୟ ଯୋଜନା ଟେମ୍ପଲେଟ୍",
      "ଆର୍ଥିକ କାଲକୁଲେଟର",
      "ମାର୍କେଟିଂ ଟୁଲକିଟ୍",
      "ସଫଳ ଫାର୍ମର କେସ୍ ଷ୍ଟଡି",
      "ସରକାରୀ ଯୋଜନା ଡିରେକ୍ଟୋରୀ",
      "ମେଣ୍ଟର ସମ୍ପର୍କ ଡାଟାବେସ୍"
    ],
    contactPerson: "Mr. Ramesh Pati",
    contactPhone: "+91-674-2567123",
    contactEmail: "entrepreneur@nabard.org",
    registrationDeadline: "2024-12-30",
    images: ["https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800"]
  }
];

export const trainingCategories = [
  { value: 'all', label: 'All Categories', labelOdia: 'ସମସ୍ତ ବିଭାଗ' },
  { value: 'technical', label: 'Technical Skills', labelOdia: 'ବୈଷୟିକ କୌଶଳ' },
  { value: 'management', label: 'Farm Management', labelOdia: 'ଫାର୍ମ ପରିଚାଳନା' },
  { value: 'healthcare', label: 'Animal Healthcare', labelOdia: 'ପଶୁ ସ୍ୱାସ୍ଥ୍ୟସେବା' },
  { value: 'breeding', label: 'Breeding & AI', labelOdia: 'ପ୍ରଜନନ ଏବଂ AI' },
  { value: 'dairy', label: 'Dairy Processing', labelOdia: 'ଦୁଗ୍ଧ ପ୍ରକ୍ରିୟାକରଣ' },
  { value: 'entrepreneurship', label: 'Entrepreneurship', labelOdia: 'ଉଦ୍ୟୋଗ' }
];
