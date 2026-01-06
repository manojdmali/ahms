export interface Insurance {
  id: string;
  policyId: string;
  name: string;
  nameOdia: string;
  provider: string;
  providerOdia: string;
  category: 'livestock' | 'dairy' | 'poultry' | 'comprehensive' | 'health' | 'accident';
  description: string;
  descriptionOdia: string;
  coverageAmount: number;
  premiumAmount: number;
  subsidyPercentage: number;
  netPremium: number;
  tenure: string;
  tenureOdia: string;
  activePolicies: number;
  totalClaims: number;
  claimSettlementRatio: number;
  features: string[];
  featuresOdia: string[];
  coverage: string[];
  coverageOdia: string[];
  exclusions: string[];
  exclusionsOdia: string[];
  eligibility: string[];
  eligibilityOdia: string[];
  documents: string[];
  documentsOdia: string[];
  claimProcess: string[];
  claimProcessOdia: string[];
  benefits: string[];
  benefitsOdia: string[];
  contactPerson: string;
  contactPhone: string;
  contactEmail: string;
  status: 'active' | 'popular' | 'new';
  rating: number;
  reviews: number;
  lastUpdated: string;
}

export const insuranceData: Insurance[] = [
  {
    id: "ins-001",
    policyId: "ODISHA-LI-CATTLE-2024",
    name: "Cattle Insurance Policy",
    nameOdia: "ଗୋରୁ ବୀମା ପଲିସି",
    provider: "National Insurance Company Ltd.",
    providerOdia: "ନ୍ୟାସନାଲ୍ ଇନସୁରାନ୍ସ କମ୍ପାନୀ",
    category: "livestock",
    description: "Comprehensive insurance coverage for indigenous and crossbred cattle against death due to accident, disease, natural calamities, fire, lightning, flood, earthquake, and surgical operations",
    descriptionOdia: "ଦୁର୍ଘଟଣା, ରୋଗ, ପ୍ରାକୃତିକ ବିପର୍ଯ୍ୟୟ, ଅଗ୍ନି, ବିଦ୍ୟୁତ୍, ବନ୍ୟା, ଭୂମିକମ୍ପ ଏବଂ ଅସ୍ତ୍ରୋପଚାର କାରଣରୁ ମୃତ୍ୟୁ ବିରୁଦ୍ଧରେ ସ୍ୱଦେଶୀ ଏବଂ କ୍ରସବ୍ରିଡ୍ ଗୋରୁ ପାଇଁ ବ୍ୟାପକ ବୀମା",
    coverageAmount: 50000,
    premiumAmount: 3500,
    subsidyPercentage: 90,
    netPremium: 350,
    tenure: "1 Year (Renewable)",
    tenureOdia: "୧ ବର୍ଷ (ନବୀକରଣଯୋଗ୍ୟ)",
    activePolicies: 8450,
    totalClaims: 456,
    claimSettlementRatio: 94.5,
    features: [
      "Coverage up to ₹50,000 per animal",
      "90% premium subsidy by government",
      "24/7 claim helpline support",
      "Fast claim settlement within 15 days",
      "Free health checkup before enrollment",
      "Coverage for surgical operations",
      "No upper age limit for indigenous cattle"
    ],
    featuresOdia: [
      "ପ୍ରତି ପଶୁ ପାଇଁ ₹୫୦,୦୦୦ ପର୍ଯ୍ୟନ୍ତ କଭରେଜ୍",
      "ସରକାରଙ୍କ ଦ୍ୱାରା ୯୦% ପ୍ରିମିୟମ୍ ସବସିଡି",
      "୨୪/୭ କ୍ଲେମ୍ ହେଲ୍ପଲାଇନ୍ ସହାୟତା",
      "୧୫ ଦିନ ମଧ୍ୟରେ ଶୀଘ୍ର କ୍ଲେମ୍ ସମାଧାନ",
      "ନାମଲେଖା ପୂର୍ବରୁ ମାଗଣା ସ୍ୱାସ୍ଥ୍ୟ ଯାଞ୍ଚ",
      "ଅସ୍ତ୍ରୋପଚାର ପାଇଁ କଭରେଜ୍",
      "ସ୍ୱଦେଶୀ ଗୋରୁ ପାଇଁ କୌଣସି ଉପର ବୟସ ସୀମା ନାହିଁ"
    ],
    coverage: [
      "Death due to accident or disease",
      "Natural calamities (flood, earthquake, cyclone)",
      "Fire and lightning strikes",
      "Snakebite and wild animal attacks",
      "Surgical operations",
      "Poisoning from contaminated feed/water",
      "Epidemic and endemic diseases"
    ],
    coverageOdia: [
      "ଦୁର୍ଘଟଣା କିମ୍ବା ରୋଗ କାରଣରୁ ମୃତ୍ୟୁ",
      "ପ୍ରାକୃତିକ ବିପର୍ଯ୍ୟୟ (ବନ୍ୟା, ଭୂମିକମ୍ପ, ଘୂର୍ଣ୍ଣିବାତ୍ୟା)",
      "ଅଗ୍ନି ଏବଂ ବିଦ୍ୟୁତ୍ ଆଘାତ",
      "ସାପ କାମୁଡା ଏବଂ ବନ୍ୟ ଜନ୍ତୁ ଆକ୍ରମଣ",
      "ଅସ୍ତ୍ରୋପଚାର",
      "ଦୂଷିତ ଖାଦ୍ୟ/ଜଳରୁ ବିଷାକ୍ତତା",
      "ମହାମାରୀ ଏବଂ ସ୍ଥାନୀୟ ରୋଗ"
    ],
    exclusions: [
      "Pre-existing diseases at enrollment",
      "Death due to willful negligence",
      "War, riots, and nuclear risks",
      "Animals above 8 years (for crossbred)",
      "Theft or disappearance of animal",
      "Experimental medical procedures"
    ],
    exclusionsOdia: [
      "ନାମଲେଖା ସମୟରେ ପୂର୍ବ ରୋଗ",
      "ଇଚ୍ଛାକୃତ ଅବହେଳା କାରଣରୁ ମୃତ୍ୟୁ",
      "ଯୁଦ୍ଧ, ଦଙ୍ଗା ଏବଂ ପରମାଣୁ ବିପଦ",
      "୮ ବର୍ଷରୁ ଅଧିକ ପଶୁ (କ୍ରସବ୍ରିଡ୍ ପାଇଁ)",
      "ପଶୁର ଚୋରି କିମ୍ବା ଅଦୃଶ୍ୟତା",
      "ପରୀକ୍ଷାମୂଳକ ଚିକିତ୍ସା ପ୍ରକ୍ରିୟା"
    ],
    eligibility: [
      "Registered farmer in Odisha",
      "Cattle aged 2-8 years (crossbred) or any age (indigenous)",
      "Healthy animal with no pre-existing conditions",
      "Valid identification tags on cattle",
      "Veterinary health certificate required"
    ],
    eligibilityOdia: [
      "ଓଡିଶାରେ ପଞ୍ଜୀକୃତ କୃଷକ",
      "୨-୮ ବର୍ଷ ଗୋରୁ (କ୍ରସବ୍ରିଡ୍) କିମ୍ବା କୌଣସି ବୟସ (ସ୍ୱଦେଶୀ)",
      "କୌଣସି ପୂର୍ବ ଅବସ୍ଥା ନଥିବା ସୁସ୍ଥ ପଶୁ",
      "ଗୋରୁ ଉପରେ ବୈଧ ପରିଚୟ ଟ୍ୟାଗ୍",
      "ପ୍ରାଣୀ ଚିକିତ୍ସା ସ୍ୱାସ୍ଥ୍ୟ ପ୍ରମାଣପତ୍ର ଆବଶ୍ୟକ"
    ],
    documents: [
      "Aadhaar Card",
      "Bank Account Details & Cancelled Cheque",
      "Veterinary Health Certificate",
      "Cattle Ownership Certificate",
      "Ear Tag Number/Photo of Animal",
      "Address Proof",
      "Farmer Registration Certificate"
    ],
    documentsOdia: [
      "ଆଧାର କାର୍ଡ",
      "ବ୍ୟାଙ୍କ ଖାତା ବିବରଣୀ ଏବଂ ବାତିଲ ଚେକ୍",
      "ପ୍ରାଣୀ ଚିକିତ୍ସା ସ୍ୱାସ୍ଥ୍ୟ ପ୍ରମାଣପତ୍ର",
      "ଗୋରୁ ମାଲିକାନା ସାର୍ଟିଫିକେଟ୍",
      "କାନ ଟ୍ୟାଗ୍ ନମ୍ବର/ପଶୁର ଫଟୋ",
      "ଠିକଣା ପ୍ରମାଣ",
      "କୃଷକ ପଞ୍ଜୀକରଣ ପ୍ରମାଣପତ୍ର"
    ],
    claimProcess: [
      "Immediately inform veterinary officer about animal death",
      "Report to insurance company within 24 hours",
      "Post-mortem examination by authorized veterinarian",
      "Submit claim form with required documents",
      "Insurance surveyor inspection and verification",
      "Claim settlement within 15 days of approval"
    ],
    claimProcessOdia: [
      "ପଶୁ ମୃତ୍ୟୁ ବିଷୟରେ ତୁରନ୍ତ ପ୍ରାଣୀ ଚିକିତ୍ସା ଅଧିକାରୀଙ୍କୁ ସୂଚନା ଦିଅନ୍ତୁ",
      "୨୪ ଘଣ୍ଟା ମଧ୍ୟରେ ବୀମା କମ୍ପାନୀକୁ ରିପୋର୍ଟ କରନ୍ତୁ",
      "ଅଧିକୃତ ପ୍ରାଣୀ ଚିକିତ୍ସକଙ୍କ ଦ୍ୱାରା ପୋଷ୍ଟମର୍ଟମ୍ ପରୀକ୍ଷା",
      "ଆବଶ୍ୟକ ଦଲିଲ୍ ସହିତ କ୍ଲେମ୍ ଫର୍ମ ଦାଖଲ କରନ୍ତୁ",
      "ବୀମା ସର୍ଭେୟର ଯାଞ୍ଚ ଏବଂ ଯାଞ୍ଚ",
      "ଅନୁମୋଦନର ୧୫ ଦିନ ମଧ୍ୟରେ କ୍ଲେମ୍ ସମାଧାନ"
    ],
    benefits: [
      "Financial security against unexpected losses",
      "90% subsidy makes it highly affordable",
      "Quick claim settlement process",
      "Covers wide range of risks",
      "No waiting period for accidents",
      "Free veterinary consultation during policy"
    ],
    benefitsOdia: [
      "ଅପ୍ରତ୍ୟାଶିତ କ୍ଷତି ବିରୁଦ୍ଧରେ ଆର୍ଥିକ ସୁରକ୍ଷା",
      "୯୦% ସବସିଡି ଏହାକୁ ଅତ୍ୟନ୍ତ ସୁଲଭ କରିଥାଏ",
      "ଶୀଘ୍ର କ୍ଲେମ୍ ସମାଧାନ ପ୍ରକ୍ରିୟା",
      "ବିସ୍ତୃତ ବିପଦକୁ ଆବୃତ୍ତ କରେ",
      "ଦୁର୍ଘଟଣା ପାଇଁ କୌଣସି ଅପେକ୍ଷା ସମୟ ନାହିଁ",
      "ପଲିସି ସମୟରେ ମାଗଣା ପ୍ରାଣୀ ଚିକିତ୍ସା ପରାମର୍ଶ"
    ],
    contactPerson: "Mr. Suresh Kumar Patnaik",
    contactPhone: "+91-674-2567890",
    contactEmail: "cattle.insurance@odisha.gov.in",
    status: "popular",
    rating: 4.7,
    reviews: 1245,
    lastUpdated: "2024-12-01"
  },
  {
    id: "ins-002",
    policyId: "ODISHA-LI-BUFFALO-2024",
    name: "Buffalo Insurance Policy",
    nameOdia: "ମହିଷ ବୀମା ପଲିସି",
    provider: "Oriental Insurance Company Ltd.",
    providerOdia: "ଓରିଏଣ୍ଟାଲ୍ ଇନସୁରାନ୍ସ କମ୍ପାନୀ",
    category: "livestock",
    description: "Specialized insurance coverage for buffaloes providing financial protection against death, accident, disease, and natural disasters with government subsidy support",
    descriptionOdia: "ସରକାରୀ ସବସିଡି ସହାୟତା ସହିତ ମୃତ୍ୟୁ, ଦୁର୍ଘଟଣା, ରୋଗ ଏବଂ ପ୍ରାକୃତିକ ବିପର୍ଯ୍ୟୟ ବିରୁଦ୍ଧରେ ଆର୍ଥିକ ସୁରକ୍ଷା ପ୍ରଦାନ କରୁଥିବା ମହିଷ ପାଇଁ ବିଶେଷ ବୀମା",
    coverageAmount: 60000,
    premiumAmount: 4200,
    subsidyPercentage: 90,
    netPremium: 420,
    tenure: "1 Year (Renewable)",
    tenureOdia: "୧ ବର୍ଷ (ନବୀକରଣଯୋଗ୍ୟ)",
    activePolicies: 6780,
    totalClaims: 378,
    claimSettlementRatio: 95.2,
    features: [
      "Coverage up to ₹60,000 per buffalo",
      "Special rates for high-yielding breeds",
      "90% premium subsidy for small farmers",
      "Covers pregnancy complications",
      "Free annual health checkup",
      "Doorstep claim assistance",
      "SMS alerts for policy renewal"
    ],
    featuresOdia: [
      "ପ୍ରତି ମହିଷ ପାଇଁ ₹୬୦,୦୦୦ ପର୍ଯ୍ୟନ୍ତ କଭରେଜ୍",
      "ଉଚ୍ଚ ଉତ୍ପାଦନକାରୀ ପ୍ରଜାତି ପାଇଁ ବିଶେଷ ହାର",
      "କ୍ଷୁଦ୍ର କୃଷକଙ୍କ ପାଇଁ ୯୦% ପ୍ରିମିୟମ୍ ସବସିଡି",
      "ଗର୍ଭଧାରଣ ଜଟିଳତାକୁ ଆବୃତ୍ତ କରେ",
      "ମାଗଣା ବାର୍ଷିକ ସ୍ୱାସ୍ଥ୍ୟ ଯାଞ୍ଚ",
      "ଦ୍ୱାରରେ କ୍ଲେମ୍ ସହାୟତା",
      "ପଲିସି ନବୀକରଣ ପାଇଁ SMS ସତର୍କତା"
    ],
    coverage: [
      "Death due to any cause (accident/disease)",
      "Natural calamities and disasters",
      "Fire, lightning, and electrical accidents",
      "Surgical and medical expenses",
      "Pregnancy and calving complications",
      "Infectious and contagious diseases",
      "Transportation accidents"
    ],
    coverageOdia: [
      "କୌଣସି କାରଣରୁ ମୃତ୍ୟୁ (ଦୁର୍ଘଟଣା/ରୋଗ)",
      "ପ୍ରାକୃତିକ ବିପର୍ଯ୍ୟୟ ଏବଂ ବିପର୍ଯ୍ୟୟ",
      "ଅଗ୍ନି, ବିଦ୍ୟୁତ୍ ଏବଂ ବିଦ୍ୟୁତ୍ ଦୁର୍ଘଟଣା",
      "ଅସ୍ତ୍ରୋପଚାର ଏବଂ ଚିକିତ୍ସା ଖର୍ଚ୍ଚ",
      "ଗର୍ଭଧାରଣ ଏବଂ ବାଛୁରୀ ଜଟିଳତା",
      "ସଂକ୍ରାମକ ଏବଂ ସଂକ୍ରାମକ ରୋଗ",
      "ପରିବହନ ଦୁର୍ଘଟଣା"
    ],
    exclusions: [
      "Intentional harm or negligence",
      "War, terrorism, and nuclear events",
      "Buffaloes above 10 years of age",
      "Non-disclosure of pre-existing diseases",
      "Death during experimental treatment"
    ],
    exclusionsOdia: [
      "ଇଚ୍ଛାକୃତ କ୍ଷତି କିମ୍ବା ଅବହେଳା",
      "ଯୁଦ୍ଧ, ଆତଙ୍କବାଦ ଏବଂ ପରମାଣୁ ଘଟଣା",
      "୧୦ ବର୍ଷରୁ ଅଧିକ ମହିଷ",
      "ପୂର୍ବ ରୋଗର ଅଣ-ପ୍ରକାଶ",
      "ପରୀକ୍ଷାମୂଳକ ଚିକିତ୍ସା ସମୟରେ ମୃତ୍ୟୁ"
    ],
    eligibility: [
      "Buffalo aged between 2-10 years",
      "Healthy animal verified by veterinarian",
      "Proper identification and tagging",
      "Ownership proof required",
      "Regular vaccination records"
    ],
    eligibilityOdia: [
      "୨-୧୦ ବର୍ଷ ମଧ୍ୟରେ ମହିଷ",
      "ପ୍ରାଣୀ ଚିକିତ୍ସକଙ୍କ ଦ୍ୱାରା ଯାଞ୍ଚ ହୋଇଥିବା ସୁସ୍ଥ ପଶୁ",
      "ସଠିକ୍ ପରିଚୟ ଏବଂ ଟ୍ୟାଗିଂ",
      "ମାଲିକାନା ପ୍ରମାଣ ଆବଶ୍ୟକ",
      "ନିୟମିତ ଟିକାକରଣ ରେକର୍ଡ"
    ],
    documents: [
      "Identity Proof (Aadhaar/Voter ID)",
      "Bank Account Statement",
      "Veterinary Certificate",
      "Buffalo Photographs (4 angles)",
      "Ear Tag Registration",
      "Purchase Invoice (if applicable)"
    ],
    documentsOdia: [
      "ପରିଚୟ ପ୍ରମାଣ (ଆଧାର/ଭୋଟର ID)",
      "ବ୍ୟାଙ୍କ ଖାତା ବିବରଣୀ",
      "ପ୍ରାଣୀ ଚିକିତ୍ସା ପ୍ରମାଣପତ୍ର",
      "ମହିଷ ଫଟୋଗ୍ରାଫ୍ (୪ କୋଣ)",
      "କାନ ଟ୍ୟାଗ୍ ପଞ୍ଜୀକରଣ",
      "କ୍ରୟ ଇନଭଏସ୍ (ଯଦି ପ୍ରଯୁଜ୍ୟ)"
    ],
    claimProcess: [
      "Inform veterinary officer immediately",
      "Call insurance helpline within 6 hours",
      "Get post-mortem done by govt. veterinarian",
      "Submit claim documents within 7 days",
      "Inspection by insurance surveyor",
      "Receive claim amount in bank account"
    ],
    claimProcessOdia: [
      "ତୁରନ୍ତ ପ୍ରାଣୀ ଚିକିତ୍ସା ଅଧିକାରୀଙ୍କୁ ସୂଚନା ଦିଅନ୍ତୁ",
      "୬ ଘଣ୍ଟା ମଧ୍ୟରେ ବୀମା ହେଲ୍ପଲାଇନ୍ କଲ୍ କରନ୍ତୁ",
      "ସରକାରୀ ପ୍ରାଣୀ ଚିକିତ୍ସକଙ୍କ ଦ୍ୱାରା ପୋଷ୍ଟମର୍ଟମ୍ କରାନ୍ତୁ",
      "୭ ଦିନ ମଧ୍ୟରେ କ୍ଲେମ୍ ଦଲିଲ୍ ଦାଖଲ କରନ୍ତୁ",
      "ବୀମା ସର୍ଭେୟରଙ୍କ ଦ୍ୱାରା ଯାଞ୍ଚ",
      "ବ୍ୟାଙ୍କ ଖାତାରେ କ୍ଲେମ୍ ରାଶି ଗ୍ରହଣ କରନ୍ତୁ"
    ],
    benefits: [
      "Higher coverage for buffaloes",
      "Special pregnancy coverage",
      "Annual health checkup included",
      "Fast track claim settlement",
      "Doorstep service available",
      "Minimal documentation"
    ],
    benefitsOdia: [
      "ମହିଷ ପାଇଁ ଅଧିକ କଭରେଜ୍",
      "ବିଶେଷ ଗର୍ଭଧାରଣ କଭରେଜ୍",
      "ବାର୍ଷିକ ସ୍ୱାସ୍ଥ୍ୟ ଯାଞ୍ଚ ଅନ୍ତର୍ଭୁକ୍ତ",
      "ଫାଷ୍ଟ ଟ୍ରାକ୍ କ୍ଲେମ୍ ସମାଧାନ",
      "ଦ୍ୱାରରେ ସେବା ଉପଲବ୍ଧ",
      "ସର୍ବନିମ୍ନ ଦସ୍ତାବିଜୀକରଣ"
    ],
    contactPerson: "Ms. Priya Nayak",
    contactPhone: "+91-674-2567891",
    contactEmail: "buffalo.insurance@odisha.gov.in",
    status: "active",
    rating: 4.6,
    reviews: 892,
    lastUpdated: "2024-11-28"
  },
  {
    id: "ins-003",
    policyId: "ODISHA-DAIRY-COMPREHENSIVE-2024",
    name: "Comprehensive Dairy Farm Insurance",
    nameOdia: "ବ୍ୟାପକ ଦୁଗ୍ଧ ଫାର୍ମ ବୀମା",
    provider: "United India Insurance Company",
    providerOdia: "ୟୁନାଇଟେଡ୍ ଇଣ୍ଡିଆ ଇନସୁରାନ୍ସ କମ୍ପାନୀ",
    category: "comprehensive",
    description: "All-in-one insurance package for dairy farms covering livestock, equipment, buildings, stock, and business interruption with complete financial protection",
    descriptionOdia: "ପଶୁଧନ, ଉପକରଣ, କୋଠା, ଷ୍ଟକ୍ ଏବଂ ବ୍ୟବସାୟ ବାଧା ସମ୍ପୂର୍ଣ୍ଣ ଆର୍ଥିକ ସୁରକ୍ଷା ସହିତ ଆବୃତ୍ତ କରୁଥିବା ଦୁଗ୍ଧ ଫାର୍ମ ପାଇଁ ସର୍ବ-ଇନ-ୱାନ ବୀମା ପ୍ୟାକେଜ୍",
    coverageAmount: 500000,
    premiumAmount: 25000,
    subsidyPercentage: 40,
    netPremium: 15000,
    tenure: "3 Years",
    tenureOdia: "୩ ବର୍ଷ",
    activePolicies: 1240,
    totalClaims: 89,
    claimSettlementRatio: 96.8,
    features: [
      "Covers all farm assets under one policy",
      "Livestock + Equipment + Buildings",
      "Business interruption coverage",
      "40% subsidy for registered farms",
      "₹5 lakh comprehensive coverage",
      "Free farm safety audit",
      "Priority claim processing"
    ],
    featuresOdia: [
      "ଗୋଟିଏ ପଲିସି ଅଧୀନରେ ସମସ୍ତ ଫାର୍ମ ସମ୍ପତ୍ତି ଆବୃତ୍ତ",
      "ପଶୁଧନ + ଉପକରଣ + କୋଠା",
      "ବ୍ୟବସାୟ ବାଧା କଭରେଜ୍",
      "ପଞ୍ଜୀକୃତ ଫାର୍ମ ପାଇଁ ୪୦% ସବସିଡି",
      "₹୫ ଲକ୍ଷ ବ୍ୟାପକ କଭରେଜ୍",
      "ମାଗଣା ଫାର୍ମ ସୁରକ୍ଷା ଅଡିଟ୍",
      "ପ୍ରାଥମିକତା କ୍ଲେମ୍ ପ୍ରକ୍ରିୟାକରଣ"
    ],
    coverage: [
      "All milch animals on farm",
      "Dairy equipment and machinery",
      "Farm buildings and structures",
      "Feed and fodder stock",
      "Milk storage and cooling units",
      "Power backup systems",
      "Loss of income due to interruption"
    ],
    coverageOdia: [
      "ଫାର୍ମରେ ସମସ୍ତ ଦୁଗ୍ଧବତୀ ପଶୁ",
      "ଦୁଗ୍ଧ ଉପକରଣ ଏବଂ ଯନ୍ତ୍ରପାତି",
      "ଫାର୍ମ କୋଠା ଏବଂ ସଂରଚନା",
      "ଖାଦ୍ୟ ଏବଂ ଘାସ ଷ୍ଟକ୍",
      "ଦୁଗ୍ଧ ସଂରକ୍ଷଣ ଏବଂ ଥଣ୍ଡା ୟୁନିଟ୍",
      "ପାୱାର ବ୍ୟାକଅପ୍ ସିଷ୍ଟମ୍",
      "ବାଧା କାରଣରୁ ଆୟ କ୍ଷତି"
    ],
    exclusions: [
      "Normal wear and tear",
      "Gradual deterioration",
      "Consequential losses not specified",
      "Non-authorized modifications"
    ],
    exclusionsOdia: [
      "ସାଧାରଣ ପରିଧାନ ଏବଂ ଲୁହ",
      "ଧୀରେ ଧୀରେ ଖରାପ",
      "ନିର୍ଦ୍ଦିଷ୍ଟ ନଥିବା ପରିଣାମମୂଳକ କ୍ଷତି",
      "ଅଣ-ଅଧିକୃତ ପରିବର୍ତ୍ତନ"
    ],
    eligibility: [
      "Registered dairy farm with minimum 10 animals",
      "Valid business registration",
      "Proper maintenance records",
      "Fire safety compliance",
      "Regular veterinary supervision"
    ],
    eligibilityOdia: [
      "ସର୍ବନିମ୍ନ ୧୦ ପଶୁ ସହିତ ପଞ୍ଜୀକୃତ ଦୁଗ୍ଧ ଫାର୍ମ",
      "ବୈଧ ବ୍ୟବସାୟ ପଞ୍ଜୀକରଣ",
      "ସଠିକ୍ ରକ୍ଷଣାବେକ୍ଷଣ ରେକର୍ଡ",
      "ଅଗ୍ନି ସୁରକ୍ଷା ଅନୁପାଳନ",
      "ନିୟମିତ ପ୍ରାଣୀ ଚିକିତ୍ସା ତତ୍ତ୍ୱାବଧାନ"
    ],
    documents: [
      "Farm registration certificate",
      "Business license",
      "Property ownership documents",
      "Equipment purchase invoices",
      "Livestock inventory and health records",
      "Farm layout and photographs",
      "Fire NOC certificate"
    ],
    documentsOdia: [
      "ଫାର୍ମ ପଞ୍ଜୀକରଣ ପ୍ରମାଣପତ୍ର",
      "ବ୍ୟବସାୟ ଲାଇସେନ୍ସ",
      "ସମ୍ପତ୍ତି ମାଲିକାନା ଦଲିଲ୍",
      "ଉପକରଣ କ୍ରୟ ଇନଭଏସ୍",
      "ପଶୁଧନ ତାଲିକା ଏବଂ ସ୍ୱାସ୍ଥ୍ୟ ରେକର୍ଡ",
      "ଫାର୍ମ ଲେଆଉଟ୍ ଏବଂ ଫଟୋଗ୍ରାଫ୍",
      "ଅଗ୍ନି NOC ପ୍ରମାଣପତ୍ର"
    ],
    claimProcess: [
      "Report incident to company within 24 hours",
      "Preserve evidence and take photographs",
      "Submit detailed claim form",
      "Surveyor inspection and assessment",
      "Document submission and verification",
      "Claim approval and payment"
    ],
    claimProcessOdia: [
      "୨୪ ଘଣ୍ଟା ମଧ୍ୟରେ କମ୍ପାନୀକୁ ଘଟଣା ରିପୋର୍ଟ କରନ୍ତୁ",
      "ପ୍ରମାଣ ସଂରକ୍ଷଣ କରନ୍ତୁ ଏବଂ ଫଟୋଗ୍ରାଫ୍ ନିଅନ୍ତୁ",
      "ବିସ୍ତୃତ କ୍ଲେମ୍ ଫର୍ମ ଦାଖଲ କରନ୍ତୁ",
      "ସର୍ଭେୟର ଯାଞ୍ଚ ଏବଂ ମୂଲ୍ୟାଙ୍କନ",
      "ଦଲିଲ୍ ଦାଖଲ ଏବଂ ଯାଞ୍ଚ",
      "କ୍ଲେମ୍ ଅନୁମୋଦନ ଏବଂ ଦେୟ"
    ],
    benefits: [
      "Complete farm protection",
      "Single premium for all assets",
      "Business continuity assured",
      "Tax benefits available",
      "Free risk management consultation",
      "Covers income loss"
    ],
    benefitsOdia: [
      "ସମ୍ପୂର୍ଣ୍ଣ ଫାର୍ମ ସୁରକ୍ଷା",
      "ସମସ୍ତ ସମ୍ପତ୍ତି ପାଇଁ ଗୋଟିଏ ପ୍ରିମିୟମ୍",
      "ବ୍ୟବସାୟ ନିରନ୍ତରତା ନିଶ୍ଚିତ",
      "ଟିକସ ସୁବିଧା ଉପଲବ୍ଧ",
      "ମାଗଣା ବିପଦ ପରିଚାଳନା ପରାମର୍ଶ",
      "ଆୟ କ୍ଷତି ଆବୃତ୍ତ କରେ"
    ],
    contactPerson: "Mr. Debasis Sahoo",
    contactPhone: "+91-674-2567892",
    contactEmail: "dairy.comprehensive@odisha.gov.in",
    status: "new",
    rating: 4.8,
    reviews: 145,
    lastUpdated: "2024-12-02"
  },
  {
    id: "ins-004",
    policyId: "ODISHA-POULTRY-2024",
    name: "Poultry Farm Insurance",
    nameOdia: "କୁକୁଡ଼ା ଫାର୍ମ ବୀମା",
    provider: "New India Assurance Company",
    providerOdia: "ନ୍ୟୁ ଇଣ୍ଡିଆ ଆଶ୍ୱାରାନ୍ସ କମ୍ପାନୀ",
    category: "poultry",
    description: "Specialized insurance for poultry farms covering birds, sheds, equipment, and epidemic outbreaks with quick claim settlement",
    descriptionOdia: "ଶୀଘ୍ର କ୍ଲେମ୍ ସମାଧାନ ସହିତ ପକ୍ଷୀ, ସେଡ୍, ଉପକରଣ ଏବଂ ମହାମାରୀ ପ୍ରକୋପକୁ ଆବୃତ୍ତ କରୁଥିବା କୁକୁଡ଼ା ଫାର୍ମ ପାଇଁ ବିଶେଷ ବୀମା",
    coverageAmount: 200000,
    premiumAmount: 8000,
    subsidyPercentage: 50,
    netPremium: 4000,
    tenure: "6 Months (Renewable)",
    tenureOdia: "୬ ମାସ (ନବୀକରଣଯୋଗ୍ୟ)",
    activePolicies: 2340,
    totalClaims: 156,
    claimSettlementRatio: 93.5,
    features: [
      "Coverage for up to 5,000 birds",
      "Epidemic disease coverage included",
      "50% government subsidy",
      "Covers layer and broiler both",
      "Equipment and shed protection",
      "24x7 veterinary helpline",
      "Quick 7-day claim settlement"
    ],
    featuresOdia: [
      "୫,୦୦୦ ପକ୍ଷୀ ପର୍ଯ୍ୟନ୍ତ କଭରେଜ୍",
      "ମହାମାରୀ ରୋଗ କଭରେଜ୍ ଅନ୍ତର୍ଭୁକ୍ତ",
      "୫୦% ସରକାରୀ ସବସିଡି",
      "ଉଭୟ ଲେୟାର ଏବଂ ବ୍ରୋଇଲର ଆବୃତ୍ତ",
      "ଉପକରଣ ଏବଂ ସେଡ୍ ସୁରକ୍ଷା",
      "୨୪x୭ ପ୍ରାଣୀ ଚିକିତ୍ସା ହେଲ୍ପଲାଇନ୍",
      "ଶୀଘ୍ର ୭ ଦିନର କ୍ଲେମ୍ ସମାଧାନ"
    ],
    coverage: [
      "Death of birds due to disease",
      "Epidemic outbreaks (Bird Flu, Ranikhet)",
      "Fire and natural calamities",
      "Predator attacks",
      "Power failure losses",
      "Feed contamination",
      "Equipment breakdown"
    ],
    coverageOdia: [
      "ରୋଗ କାରଣରୁ ପକ୍ଷୀମାନଙ୍କର ମୃତ୍ୟୁ",
      "ମହାମାରୀ ପ୍ରକୋପ (ବାର୍ଡ ଫ୍ଲୁ, ରାଣୀଖେତ)",
      "ଅଗ୍ନି ଏବଂ ପ୍ରାକୃତିକ ବିପର୍ଯ୍ୟୟ",
      "ଶିକାରୀ ଆକ୍ରମଣ",
      "ବିଦ୍ୟୁତ୍ ବିଫଳତା କ୍ଷତି",
      "ଖାଦ୍ୟ ଦୂଷଣ",
      "ଉପକରଣ ଭାଙ୍ଗିବା"
    ],
    exclusions: [
      "Normal mortality rate (up to 5%)",
      "Poor management practices",
      "Non-vaccination related deaths",
      "Unregistered farms"
    ],
    exclusionsOdia: [
      "ସାଧାରଣ ମୃତ୍ୟୁହାର (୫% ପର୍ଯ୍ୟନ୍ତ)",
      "ଖରାପ ପରିଚାଳନା ଅଭ୍ୟାସ",
      "ଅଣ-ଟିକାକରଣ ସମ୍ବନ୍ଧୀୟ ମୃତ୍ୟୁ",
      "ଅପଞ୍ଜୀକୃତ ଫାର୍ମ"
    ],
    eligibility: [
      "Registered poultry farm",
      "Minimum 500 birds",
      "Proper vaccination records",
      "Licensed farm operations",
      "Bio-security measures in place"
    ],
    eligibilityOdia: [
      "ପଞ୍ଜୀକୃତ କୁକୁଡ଼ା ଫାର୍ମ",
      "ସର୍ବନିମ୍ନ ୫୦୦ ପକ୍ଷୀ",
      "ସଠିକ୍ ଟିକାକରଣ ରେକର୍ଡ",
      "ଲାଇସେନ୍ସପ୍ରାପ୍ତ ଫାର୍ମ ଅପରେସନ୍",
      "ବାୟୋ-ସିକ୍ୟୁରିଟି ପଦକ୍ଷେପ"
    ],
    documents: [
      "Poultry farm license",
      "Bird stock register",
      "Vaccination certificates",
      "Farm layout diagram",
      "Equipment invoices",
      "Bank account details"
    ],
    documentsOdia: [
      "କୁକୁଡ଼ା ଫାର୍ମ ଲାଇସେନ୍ସ",
      "ପକ୍ଷୀ ଷ୍ଟକ୍ ରେଜିଷ୍ଟର",
      "ଟିକାକରଣ ପ୍ରମାଣପତ୍ର",
      "ଫାର୍ମ ଲେଆଉଟ୍ ଚିତ୍ର",
      "ଉପକରଣ ଇନଭଏସ୍",
      "ବ୍ୟାଙ୍କ ଖାତା ବିବରଣୀ"
    ],
    claimProcess: [
      "Report mortality immediately",
      "Call helpline within 12 hours",
      "Preserve dead birds for inspection",
      "Submit mortality register",
      "Veterinary inspection",
      "Claim settlement in 7 days"
    ],
    claimProcessOdia: [
      "ତୁରନ୍ତ ମୃତ୍ୟୁହାର ରିପୋର୍ଟ କରନ୍ତୁ",
      "୧୨ ଘଣ୍ଟା ମଧ୍ୟରେ ହେଲ୍ପଲାଇନ୍ କଲ୍ କରନ୍ତୁ",
      "ଯାଞ୍ଚ ପାଇଁ ମୃତ ପକ୍ଷୀ ସଂରକ୍ଷଣ କରନ୍ତୁ",
      "ମୃତ୍ୟୁହାର ରେଜିଷ୍ଟର ଦାଖଲ କରନ୍ତୁ",
      "ପ୍ରାଣୀ ଚିକିତ୍ସା ଯାଞ୍ଚ",
      "୭ ଦିନରେ କ୍ଲେମ୍ ସମାଧାନ"
    ],
    benefits: [
      "Epidemic protection crucial for poultry",
      "Affordable with 50% subsidy",
      "Fast claim processing",
      "Covers both birds and infrastructure",
      "Free bio-security audit",
      "Vaccination reminder service"
    ],
    benefitsOdia: [
      "କୁକୁଡ଼ା ପାଇଁ ମହାମାରୀ ସୁରକ୍ଷା ଗୁରୁତ୍ୱପୂର୍ଣ୍ଣ",
      "୫୦% ସବସିଡି ସହିତ ସୁଲଭ",
      "ଦ୍ରୁତ କ୍ଲେମ୍ ପ୍ରକ୍ରିୟାକରଣ",
      "ଉଭୟ ପକ୍ଷୀ ଏବଂ ଭିତ୍ତିଭୂମି ଆବୃତ୍ତ",
      "ମାଗଣା ବାୟୋ-ସିକ୍ୟୁରିଟି ଅଡିଟ୍",
      "ଟିକାକରଣ ସ୍ମାରକ ସେବା"
    ],
    contactPerson: "Dr. Sanjay Mohanty",
    contactPhone: "+91-674-2567893",
    contactEmail: "poultry.insurance@odisha.gov.in",
    status: "active",
    rating: 4.5,
    reviews: 567,
    lastUpdated: "2024-11-25"
  }
];

export const insuranceCategories = [
  { value: 'all', label: 'All Categories', labelOdia: 'ସମସ୍ତ ବିଭାଗ' },
  { value: 'livestock', label: 'Livestock Insurance', labelOdia: 'ପଶୁଧନ ବୀମା' },
  { value: 'dairy', label: 'Dairy Insurance', labelOdia: 'ଦୁଗ୍ଧ ବୀମା' },
  { value: 'poultry', label: 'Poultry Insurance', labelOdia: 'କୁକୁଡ଼ା ବୀମା' },
  { value: 'comprehensive', label: 'Comprehensive', labelOdia: 'ବ୍ୟାପକ' },
  { value: 'health', label: 'Animal Health', labelOdia: 'ପଶୁ ସ୍ୱାସ୍ଥ୍ୟ' },
  { value: 'accident', label: 'Accident Cover', labelOdia: 'ଦୁର୍ଘଟଣା କଭର' }
];
