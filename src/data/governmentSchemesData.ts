export interface GovernmentScheme {
  id: string;
  schemeId: string;
  name: string;
  nameOdia: string;
  category: 'subsidy' | 'insurance' | 'training' | 'infrastructure' | 'welfare' | 'dairy';
  description: string;
  descriptionOdia: string;
  department: string;
  launchedDate: string;
  budget: number;
  beneficiaries: number;
  status: 'active' | 'upcoming' | 'closed';
  eligibility: string[];
  eligibilityOdia: string[];
  benefits: string[];
  benefitsOdia: string[];
  documents: string[];
  documentsOdia: string[];
  applicationProcess: string[];
  applicationProcessOdia: string[];
  subsidyAmount?: string;
  coverageAmount?: string;
  duration?: string;
  contactPerson: string;
  contactPhone: string;
  contactEmail: string;
  lastUpdated: string;
  applicationDeadline?: string;
  targetAudience: string;
  targetAudienceOdia: string;
}

export const governmentSchemesData: GovernmentScheme[] = [
  {
    id: "gs-001",
    schemeId: "ODISHA-LI-2024-001",
    name: "Livestock Insurance Scheme",
    nameOdia: "ପଶୁଧନ ବୀମା ଯୋଜନା",
    category: "insurance",
    description: "Comprehensive insurance coverage for cattle, buffalo, and other livestock against death, accident, and natural calamities",
    descriptionOdia: "ମୃତ୍ୟୁ, ଦୁର୍ଘଟଣା ଏବଂ ପ୍ରାକୃତିକ ବିପର୍ଯ୍ୟୟ ବିରୁଦ୍ଧରେ ଗୋରୁ, ମହିଷ ଏବଂ ଅନ୍ୟ ପଶୁମାନଙ୍କ ପାଇଁ ବ୍ୟାପକ ବୀମା",
    department: "Department of Fisheries and Animal Resources Development",
    launchedDate: "2024-01-15",
    budget: 50000000,
    beneficiaries: 12450,
    status: "active",
    eligibility: [
      "Must be a registered farmer in Odisha",
      "Livestock should be healthy and aged between 2-8 years",
      "Must have proof of ownership",
      "Livestock must have identification tags",
      "No pre-existing health conditions"
    ],
    eligibilityOdia: [
      "ଓଡିଶାରେ ପଞ୍ଜୀକୃତ କୃଷକ ହେବା ଆବଶ୍ୟକ",
      "ପଶୁ ସୁସ୍ଥ ଏବଂ ୨-୮ ବର୍ଷ ମଧ୍ୟରେ ହେବା ଆବଶ୍ୟକ",
      "ମାଲିକାନା ପ୍ରମାଣ ଥିବା ଆବଶ୍ୟକ",
      "ପଶୁଙ୍କର ପରିଚୟ ଟ୍ୟାଗ୍ ଥିବା ଆବଶ୍ୟକ",
      "କୌଣସି ପୂର୍ବ ସ୍ୱାସ୍ଥ୍ୟ ସମସ୍ୟା ନଥିବା"
    ],
    benefits: [
      "Up to ₹50,000 coverage per animal",
      "Free health checkup before enrollment",
      "90% premium subsidy by government",
      "24/7 helpline support",
      "Fast claim settlement within 15 days"
    ],
    benefitsOdia: [
      "ପ୍ରତି ପଶୁ ପାଇଁ ₹୫୦,୦୦୦ ପର୍ଯ୍ୟନ୍ତ କଭରେଜ୍",
      "ନାମଲେଖା ପୂର୍ବରୁ ମାଗଣା ସ୍ୱାସ୍ଥ୍ୟ ଯାଞ୍ଚ",
      "ସରକାରଙ୍କ ଦ୍ୱାରା ୯୦% ପ୍ରିମିୟମ୍ ସବସିଡି",
      "୨୪/୭ ହେଲ୍ପଲାଇନ୍ ସହାୟତା",
      "୧୫ ଦିନ ମଧ୍ୟରେ ଶୀଘ୍ର କ୍ଲେମ୍ ସମାଧାନ"
    ],
    documents: [
      "Aadhaar Card",
      "Bank Account Details",
      "Livestock Ownership Certificate",
      "Veterinary Health Certificate",
      "Recent Photograph of Animal",
      "Address Proof"
    ],
    documentsOdia: [
      "ଆଧାର କାର୍ଡ",
      "ବ୍ୟାଙ୍କ ଖାତା ବିବରଣୀ",
      "ପଶୁ ମାଲିକାନା ସାର୍ଟିଫିକେଟ୍",
      "ପ୍ରାଣୀ ଚିକିତ୍ସା ସ୍ୱାସ୍ଥ୍ୟ ପ୍ରମାଣପତ୍ର",
      "ପଶୁର ସାମ୍ପ୍ରତିକ ଫଟୋ",
      "ଠିକଣା ପ୍ରମାଣ"
    ],
    applicationProcess: [
      "Visit nearest veterinary office or apply online",
      "Fill application form with livestock details",
      "Submit required documents",
      "Get livestock health checkup done",
      "Pay premium amount (10% of coverage)",
      "Receive insurance certificate within 7 days"
    ],
    applicationProcessOdia: [
      "ନିକଟସ୍ଥ ପ୍ରାଣୀ ଚିକିତ୍ସା କାର୍ଯ୍ୟାଳୟକୁ ଯାଆନ୍ତୁ କିମ୍ବା ଅନଲାଇନ୍ ଆବେଦନ କରନ୍ତୁ",
      "ପଶୁ ବିବରଣୀ ସହିତ ଆବେଦନ ଫର୍ମ ପୂରଣ କରନ୍ତୁ",
      "ଆବଶ୍ୟକ ଦଲିଲ୍ ଦାଖଲ କରନ୍ତୁ",
      "ପଶୁ ସ୍ୱାସ୍ଥ୍ୟ ଯାଞ୍ଚ କରାନ୍ତୁ",
      "ପ୍ରିମିୟମ୍ ରାଶି ଦିଅନ୍ତୁ (କଭରେଜ୍ର ୧୦%)",
      "୭ ଦିନ ମଧ୍ୟରେ ବୀମା ପ୍ରମାଣପତ୍ର ଗ୍ରହଣ କରନ୍ତୁ"
    ],
    subsidyAmount: "90% premium subsidy",
    coverageAmount: "Up to ₹50,000 per animal",
    duration: "1 year (renewable)",
    contactPerson: "Dr. Ramesh Kumar Sahoo",
    contactPhone: "+91-674-2345678",
    contactEmail: "livestock.insurance@odisha.gov.in",
    lastUpdated: "2024-11-30",
    targetAudience: "Small and marginal livestock farmers",
    targetAudienceOdia: "କ୍ଷୁଦ୍ର ଏବଂ ମାର୍ଜିନାଲ୍ ପଶୁପାଳକ"
  },
  {
    id: "gs-002",
    schemeId: "ODISHA-DAIRY-2024-002",
    name: "Dairy Entrepreneurship Development Scheme",
    nameOdia: "ଦୁଗ୍ଧ ଉଦ୍ୟୋଗ ବିକାଶ ଯୋଜନା",
    category: "dairy",
    description: "Financial assistance for setting up dairy units, milk chilling centers, and dairy product processing units",
    descriptionOdia: "ଦୁଗ୍ଧ ୟୁନିଟ୍, ଦୁଗ୍ଧ ଥଣ୍ଡା କେନ୍ଦ୍ର ଏବଂ ଦୁଗ୍ଧ ଉତ୍ପାଦ ପ୍ରକ୍ରିୟାକରଣ ୟୁନିଟ୍ ସ୍ଥାପନ ପାଇଁ ଆର୍ଥିକ ସହାୟତା",
    department: "Department of Fisheries and Animal Resources Development",
    launchedDate: "2024-02-01",
    budget: 75000000,
    beneficiaries: 3450,
    status: "active",
    eligibility: [
      "Individual farmers or Self Help Groups (SHGs)",
      "Minimum land requirement: 500 sq ft",
      "Must have access to consistent milk supply",
      "Age between 18-55 years",
      "No previous loan defaults"
    ],
    eligibilityOdia: [
      "ବ୍ୟକ୍ତିଗତ କୃଷକ କିମ୍ବା ସ୍ୱୟଂ ସହାୟକ ଗୋଷ୍ଠୀ (SHGs)",
      "ସର୍ବନିମ୍ନ ଜମି ଆବଶ୍ୟକତା: ୫୦୦ ବର୍ଗଫୁଟ",
      "ନିୟମିତ ଦୁଗ୍ଧ ଯୋଗାଣର ସୁବିଧା ଥିବା ଆବଶ୍ୟକ",
      "ବୟସ ୧୮-୫୫ ବର୍ଷ ମଧ୍ୟରେ",
      "କୌଣସି ପୂର୍ବ ଋଣ ଡିଫଲ୍ଟ ନାହିଁ"
    ],
    benefits: [
      "40% capital subsidy on project cost",
      "Additional 10% subsidy for SC/ST/Women",
      "Low-interest loan facility",
      "Free technical training",
      "Marketing support and linkages"
    ],
    benefitsOdia: [
      "ପ୍ରକଳ୍ପ ମୂଲ୍ୟ ଉପରେ ୪୦% ପୁଞ୍ଜି ସବସିଡି",
      "SC/ST/ମହିଳାଙ୍କ ପାଇଁ ଅତିରିକ୍ତ ୧୦% ସବସିଡି",
      "ସ୍ୱଳ୍ପ ସୁଧ ଋଣ ସୁବିଧା",
      "ମାଗଣା ଯାନ୍ତ୍ରିକ ପ୍ରଶିକ୍ଷଣ",
      "ମାର୍କେଟିଂ ସହାୟତା ଏବଂ ସଂଯୋଗ"
    ],
    documents: [
      "Project proposal with cost estimates",
      "Land ownership/lease documents",
      "Aadhaar and PAN Card",
      "Bank Account and loan sanction letter",
      "Caste certificate (if applicable)",
      "Business registration documents"
    ],
    documentsOdia: [
      "ମୂଲ୍ୟ ଆକଳନ ସହିତ ପ୍ରକଳ୍ପ ପ୍ରସ୍ତାବ",
      "ଜମି ମାଲିକାନା/ଲିଜ୍ ଦଲିଲ୍",
      "ଆଧାର ଏବଂ ପାନ୍ କାର୍ଡ",
      "ବ୍ୟାଙ୍କ ଖାତା ଏବଂ ଋଣ ମଞ୍ଜୁରୀ ପତ୍ର",
      "ଜାତି ପ୍ରମାଣପତ୍ର (ଯଦି ପ୍ରଯୁଜ୍ୟ)",
      "ବ୍ୟବସାୟ ପଞ୍ଜୀକରଣ ଦଲିଲ୍"
    ],
    applicationProcess: [
      "Submit detailed project proposal",
      "Technical scrutiny by department officials",
      "Site visit and verification",
      "Loan sanction from bank",
      "Release of subsidy in installments",
      "Regular monitoring and guidance"
    ],
    applicationProcessOdia: [
      "ବିସ୍ତୃତ ପ୍ରକଳ୍ପ ପ୍ରସ୍ତାବ ଦାଖଲ କରନ୍ତୁ",
      "ବିଭାଗୀୟ ଅଧିକାରୀଙ୍କ ଦ୍ୱାରା ଯାନ୍ତ୍ରିକ ଯାଞ୍ଚ",
      "ସାଇଟ୍ ପରିଦର୍ଶନ ଏବଂ ଯାଞ୍ଚ",
      "ବ୍ୟାଙ୍କରୁ ଋଣ ମଞ୍ଜୁରୀ",
      "କିସ୍ତିରେ ସବସିଡି ମୁକ୍ତ",
      "ନିୟମିତ ମନିଟରିଂ ଏବଂ ମାର୍ଗଦର୍ଶନ"
    ],
    subsidyAmount: "40-50% of project cost (Max ₹10 lakhs)",
    duration: "One-time assistance",
    contactPerson: "Shri Prakash Jena",
    contactPhone: "+91-674-2345679",
    contactEmail: "dairy.scheme@odisha.gov.in",
    lastUpdated: "2024-11-28",
    targetAudience: "Dairy entrepreneurs and farmer groups",
    targetAudienceOdia: "ଦୁଗ୍ଧ ଉଦ୍ୟୋଗୀ ଏବଂ କୃଷକ ଗୋଷ୍ଠୀ"
  },
  {
    id: "gs-003",
    schemeId: "ODISHA-AI-2024-003",
    name: "Artificial Insemination Subsidy Scheme",
    nameOdia: "କୃତ୍ରିମ ଗର୍ଭାଧାନ ସବସିଡି ଯୋଜନା",
    category: "subsidy",
    description: "Free or subsidized artificial insemination services to improve livestock genetics and milk production",
    descriptionOdia: "ପଶୁ ଜେନେଟିକ୍ସ ଏବଂ ଦୁଗ୍ଧ ଉତ୍ପାଦନକୁ ଉନ୍ନତ କରିବା ପାଇଁ ମାଗଣା କିମ୍ବା ସବସିଡିଯୁକ୍ତ କୃତ୍ରିମ ଗର୍ଭାଧାନ ସେବା",
    department: "Department of Fisheries and Animal Resources Development",
    launchedDate: "2024-01-10",
    budget: 25000000,
    beneficiaries: 45780,
    status: "active",
    eligibility: [
      "All dairy farmers in Odisha",
      "Female cattle/buffalo in heat cycle",
      "Age of animal: 15 months to 12 years",
      "No restrictions on herd size"
    ],
    eligibilityOdia: [
      "ଓଡିଶାର ସମସ୍ତ ଦୁଗ୍ଧ ଚାଷୀ",
      "ମହିଳା ଗୋରୁ/ମହିଷ ଉତ୍ତାପ ଚକ୍ରରେ",
      "ପଶୁର ବୟସ: ୧୫ ମାସରୁ ୧୨ ବର୍ଷ",
      "ପଲ ଆକାର ଉପରେ କୌଣସି ପ୍ରତିବନ୍ଧକ ନାହିଁ"
    ],
    benefits: [
      "Free AI services at doorstep",
      "Quality semen from high-yielding breeds",
      "100% subsidy for first three inseminations",
      "Pregnancy detection after 60 days",
      "Follow-up veterinary care"
    ],
    benefitsOdia: [
      "ଦ୍ୱାରରେ ମାଗଣା AI ସେବା",
      "ଉଚ୍ଚ ଉତ୍ପାଦନକାରୀ ପ୍ରଜାତିରୁ ଗୁଣବତ୍ତା ଶୁକ୍ରାଣୁ",
      "ପ୍ରଥମ ତିନୋଟି ଗର୍ଭାଧାନ ପାଇଁ ୧୦୦% ସବସିଡି",
      "୬୦ ଦିନ ପରେ ଗର୍ଭଧାରଣ ଚିହ୍ନଟ",
      "ଫଲୋ-ଅପ୍ ପ୍ରାଣୀ ଚିକିତ୍ସା ଯତ୍ନ"
    ],
    documents: [
      "Farmer ID card",
      "Animal identification tag number",
      "Mobile number for SMS updates"
    ],
    documentsOdia: [
      "କୃଷକ ID କାର୍ଡ",
      "ପଶୁ ପରିଚୟ ଟ୍ୟାଗ୍ ନମ୍ବର",
      "SMS ଅପଡେଟ୍ ପାଇଁ ମୋବାଇଲ୍ ନମ୍ବର"
    ],
    applicationProcess: [
      "Call AI helpline: 1800-XXX-XXXX",
      "Register animal details",
      "AI technician visit within 2 hours",
      "Service provided at farm",
      "SMS confirmation sent",
      "Follow-up after 60 days"
    ],
    applicationProcessOdia: [
      "AI ହେଲ୍ପଲାଇନ୍ କଲ୍ କରନ୍ତୁ: ୧୮୦୦-XXX-XXXX",
      "ପଶୁ ବିବରଣୀ ପଞ୍ଜୀକରଣ କରନ୍ତୁ",
      "୨ ଘଣ୍ଟା ମଧ୍ୟରେ AI ଟେକ୍ନିସିଆନ ପରିଦର୍ଶନ",
      "ଫାର୍ମରେ ସେବା ପ୍ରଦାନ କରାଯାଇଛି",
      "SMS ନିଶ୍ଚିତକରଣ ପଠାଯାଇଛି",
      "୬୦ ଦିନ ପରେ ଫଲୋ-ଅପ୍"
    ],
    subsidyAmount: "100% for first 3 attempts (Worth ₹500 each)",
    duration: "Ongoing service",
    contactPerson: "Dr. Santosh Behera",
    contactPhone: "1800-345-6789",
    contactEmail: "ai.services@odisha.gov.in",
    lastUpdated: "2024-12-01",
    targetAudience: "All dairy and livestock farmers",
    targetAudienceOdia: "ସମସ୍ତ ଦୁଗ୍ଧ ଏବଂ ପଶୁପାଳକ"
  },
  {
    id: "gs-004",
    schemeId: "ODISHA-FEED-2024-004",
    name: "Cattle Feed Subsidy Scheme",
    nameOdia: "ପଶୁ ଖାଦ୍ୟ ସବସିଡି ଯୋଜନା",
    category: "subsidy",
    description: "Subsidized quality cattle feed and mineral supplements to improve animal health and productivity",
    descriptionOdia: "ପଶୁ ସ୍ୱାସ୍ଥ୍ୟ ଏବଂ ଉତ୍ପାଦନକୁ ଉନ୍ନତ କରିବା ପାଇଁ ସବସିଡିଯୁକ୍ତ ଗୁଣବତ୍ତା ପଶୁ ଖାଦ୍ୟ ଏବଂ ଖଣିଜ ସପ୍ଲିମେଣ୍ଟ",
    department: "Department of Fisheries and Animal Resources Development",
    launchedDate: "2024-03-01",
    budget: 35000000,
    beneficiaries: 28950,
    status: "active",
    eligibility: [
      "Farmers with minimum 2 milch animals",
      "Must be enrolled in dairy cooperative",
      "Regular milk suppliers",
      "Small and marginal farmers get priority"
    ],
    eligibilityOdia: [
      "ସର୍ବନିମ୍ନ ୨ ଟି ଦୁଗ୍ଧବତୀ ପଶୁ ସହିତ କୃଷକ",
      "ଦୁଗ୍ଧ ସହଯୋଗରେ ନାମଲେଖା ହୋଇଥିବା ଆବଶ୍ୟକ",
      "ନିୟମିତ ଦୁଗ୍ଧ ଯୋଗାଣକାରୀ",
      "କ୍ଷୁଦ୍ର ଏବଂ ମାର୍ଜିନାଲ୍ କୃଷକ ପ୍ରାଥମିକତା ପାଆନ୍ତି"
    ],
    benefits: [
      "25% subsidy on cattle feed purchase",
      "50% subsidy on mineral mixture",
      "Quality assurance of feed products",
      "Doorstep delivery option",
      "Credit facility available"
    ],
    benefitsOdia: [
      "ପଶୁ ଖାଦ୍ୟ କ୍ରୟ ଉପରେ ୨୫% ସବସିଡି",
      "ଖଣିଜ ମିଶ୍ରଣ ଉପରେ ୫୦% ସବସିଡି",
      "ଖାଦ୍ୟ ଉତ୍ପାଦର ଗୁଣବତ୍ତା ନିଶ୍ଚିତତା",
      "ଦ୍ୱାରରେ ବିତରଣ ବିକଳ୍ପ",
      "କ୍ରେଡିଟ୍ ସୁବିଧା ଉପଲବ୍ଧ"
    ],
    documents: [
      "Dairy cooperative membership card",
      "Livestock count certificate",
      "Aadhaar card",
      "Bank account details"
    ],
    documentsOdia: [
      "ଦୁଗ୍ଧ ସହଯୋଗ ସଦସ୍ୟତା କାର୍ଡ",
      "ପଶୁ ଗଣନା ପ୍ରମାଣପତ୍ର",
      "ଆଧାର କାର୍ଡ",
      "ବ୍ୟାଙ୍କ ଖାତା ବିବରଣୀ"
    ],
    applicationProcess: [
      "Register at nearest feed distribution center",
      "Submit livestock details",
      "Choose feed type and quantity",
      "Pay subsidized amount",
      "Collect feed or opt for home delivery",
      "Subsidy auto-credited to account"
    ],
    applicationProcessOdia: [
      "ନିକଟସ୍ଥ ଖାଦ୍ୟ ବଣ୍ଟନ କେନ୍ଦ୍ରରେ ପଞ୍ଜୀକରଣ କରନ୍ତୁ",
      "ପଶୁଧନ ବିବରଣୀ ଦାଖଲ କରନ୍ତୁ",
      "ଖାଦ୍ୟ ପ୍ରକାର ଏବଂ ପରିମାଣ ବାଛନ୍ତୁ",
      "ସବସିଡିଯୁକ୍ତ ରାଶି ଦିଅନ୍ତୁ",
      "ଖାଦ୍ୟ ସଂଗ୍ରହ କରନ୍ତୁ କିମ୍ବା ଘର ବିତରଣ ବାଛନ୍ତୁ",
      "ସବସିଡି ସ୍ୱୟଂଚାଳିତ ଖାତାରେ କ୍ରେଡିଟ୍"
    ],
    subsidyAmount: "25% on feed, 50% on minerals (Max ₹5,000/month)",
    duration: "Monthly quota available",
    contactPerson: "Smt. Anita Panda",
    contactPhone: "+91-674-2345680",
    contactEmail: "cattlefeed.subsidy@odisha.gov.in",
    lastUpdated: "2024-11-25",
    targetAudience: "Dairy cooperative members",
    targetAudienceOdia: "ଦୁଗ୍ଧ ସହଯୋଗ ସଦସ୍ୟ"
  },
  {
    id: "gs-005",
    schemeId: "ODISHA-TRAIN-2024-005",
    name: "Farmer Training and Skill Development Program",
    nameOdia: "କୃଷକ ପ୍ରଶିକ୍ଷଣ ଏବଂ କୌଶଳ ବିକାଶ କାର୍ଯ୍ୟକ୍ରମ",
    category: "training",
    description: "Comprehensive training programs on modern animal husbandry practices, dairy management, and entrepreneurship",
    descriptionOdia: "ଆଧୁନିକ ପଶୁପାଳନ ଅଭ୍ୟାସ, ଦୁଗ୍ଧ ପରିଚାଳନା ଏବଂ ଉଦ୍ୟୋଗତା ଉପରେ ବ୍ୟାପକ ପ୍ରଶିକ୍ଷଣ କାର୍ଯ୍ୟକ୍ରମ",
    department: "Department of Fisheries and Animal Resources Development",
    launchedDate: "2024-04-01",
    budget: 15000000,
    beneficiaries: 8950,
    status: "active",
    eligibility: [
      "Age 18-60 years",
      "Interest in animal husbandry",
      "Basic literacy preferred",
      "Both existing and aspiring farmers"
    ],
    eligibilityOdia: [
      "ବୟସ ୧୮-୬୦ ବର୍ଷ",
      "ପଶୁପାଳନରେ ଆଗ୍ରହ",
      "ମୌଳିକ ସାକ୍ଷରତା ପସନ୍ଦ",
      "ଉଭୟ ବିଦ୍ୟମାନ ଏବଂ ଇଚ୍ଛୁକ କୃଷକ"
    ],
    benefits: [
      "Free 15-day residential training",
      "Hands-on practical training",
      "Free study materials and toolkit",
      "Daily allowance of ₹300",
      "Free food and accommodation",
      "Certificate on completion"
    ],
    benefitsOdia: [
      "ମାଗଣା ୧୫ ଦିନିଆ ଆବାସିକ ପ୍ରଶିକ୍ଷଣ",
      "ହ୍ୟାଣ୍ଡ-ଅନ୍ ବ୍ୟବହାରିକ ପ୍ରଶିକ୍ଷଣ",
      "ମାଗଣା ଅଧ୍ୟୟନ ସାମଗ୍ରୀ ଏବଂ ଟୁଲକିଟ୍",
      "ଦୈନିକ ₹୩୦୦ ଭତ୍ତା",
      "ମାଗଣା ଖାଦ୍ୟ ଏବଂ ରହଣି",
      "ସମାପ୍ତି ପରେ ପ୍ରମାଣପତ୍ର"
    ],
    documents: [
      "Aadhaar card",
      "Age proof",
      "Address proof",
      "Passport size photographs",
      "Educational certificates (if any)"
    ],
    documentsOdia: [
      "ଆଧାର କାର୍ଡ",
      "ବୟସ ପ୍ରମାଣ",
      "ଠିକଣା ପ୍ରମାଣ",
      "ପାସପୋର୍ଟ ସାଇଜ୍ ଫଟୋଗ୍ରାଫ୍",
      "ଶିକ୍ଷାଗତ ପ୍ରମାଣପତ୍ର (ଯଦି ଥାଏ)"
    ],
    applicationProcess: [
      "Online application through portal",
      "Selection based on first-come-first-serve",
      "Confirmation SMS sent",
      "Report to training center on given date",
      "Complete 15-day training",
      "Receive certificate and toolkit"
    ],
    applicationProcessOdia: [
      "ପୋର୍ଟାଲ୍ ମାଧ୍ୟମରେ ଅନଲାଇନ୍ ଆବେଦନ",
      "ପ୍ରଥମ-ଆସ-ପ୍ରଥମ-ସେବା ଆଧାରରେ ଚୟନ",
      "ନିଶ୍ଚିତକରଣ SMS ପଠାଯାଇଛି",
      "ଦିଆଯାଇଥିବା ତାରିଖରେ ପ୍ରଶିକ୍ଷଣ କେନ୍ଦ୍ରକୁ ରିପୋର୍ଟ କରନ୍ତୁ",
      "୧୫ ଦିନିଆ ପ୍ରଶିକ୍ଷଣ ସମ୍ପୂର୍ଣ୍ଣ କରନ୍ତୁ",
      "ପ୍ରମାଣପତ୍ର ଏବଂ ଟୁଲକିଟ୍ ଗ୍ରହଣ କରନ୍ତୁ"
    ],
    subsidyAmount: "₹300/day allowance + Free training worth ₹15,000",
    duration: "15 days residential program",
    contactPerson: "Dr. Bikash Mohanty",
    contactPhone: "+91-674-2345681",
    contactEmail: "training.ahvd@odisha.gov.in",
    lastUpdated: "2024-11-20",
    applicationDeadline: "2024-12-31",
    targetAudience: "Farmers and youth interested in animal husbandry",
    targetAudienceOdia: "ପଶୁପାଳନରେ ଆଗ୍ରହୀ କୃଷକ ଏବଂ ଯୁବକ"
  },
  {
    id: "gs-006",
    schemeId: "ODISHA-INFRA-2024-006",
    name: "Livestock Infrastructure Development Grant",
    nameOdia: "ପଶୁଧନ ଭିତ୍ତିଭୂମି ବିକାଶ ଅନୁଦାନ",
    category: "infrastructure",
    description: "Financial support for construction of cattle sheds, fodder storage units, and bio-gas plants",
    descriptionOdia: "ଗୋଶାଳା, ଘାସ ସଂରକ୍ଷଣ ୟୁନିଟ୍ ଏବଂ ବାୟୋ-ଗ୍ୟାସ୍ ପ୍ଲାଣ୍ଟ ନିର୍ମାଣ ପାଇଁ ଆର୍ଥିକ ସହାୟତା",
    department: "Department of Fisheries and Animal Resources Development",
    launchedDate: "2024-05-15",
    budget: 45000000,
    beneficiaries: 5670,
    status: "active",
    eligibility: [
      "Farmers with minimum 5 animals",
      "Landowners with sufficient space",
      "Project cost minimum ₹50,000",
      "No pending loans from government"
    ],
    eligibilityOdia: [
      "ସର୍ବନିମ୍ନ ୫ ପଶୁ ସହିତ କୃଷକ",
      "ପର୍ଯ୍ୟାପ୍ତ ସ୍ଥାନ ସହିତ ଜମି ମାଲିକ",
      "ପ୍ରକଳ୍ପ ମୂଲ୍ୟ ସର୍ବନିମ୍ନ ₹୫୦,୦୦୦",
      "ସରକାରୀ ବିଚାରାଧୀନ ଋଣ ନାହିଁ"
    ],
    benefits: [
      "50% subsidy on construction cost",
      "Additional 10% for SC/ST/Women",
      "Technical guidance and blueprint",
      "Quality material specification",
      "Inspection and approval support"
    ],
    benefitsOdia: [
      "ନିର୍ମାଣ ମୂଲ୍ୟ ଉପରେ ୫୦% ସବସିଡି",
      "SC/ST/ମହିଳାଙ୍କ ପାଇଁ ଅତିରିକ୍ତ ୧୦%",
      "ଯାନ୍ତ୍ରିକ ମାର୍ଗଦର୍ଶନ ଏବଂ ବ୍ଲୁପ୍ରିଣ୍ଟ",
      "ଗୁଣବତ୍ତା ସାମଗ୍ରୀ ନିର୍ଦ୍ଦିଷ୍ଟକରଣ",
      "ଯାଞ୍ଚ ଏବଂ ଅନୁମୋଦନ ସହାୟତା"
    ],
    documents: [
      "Land documents",
      "Detailed project estimate",
      "Livestock ownership certificate",
      "Aadhaar and bank details",
      "Caste certificate (if applicable)",
      "Site photographs"
    ],
    documentsOdia: [
      "ଜମି ଦଲିଲ୍",
      "ବିସ୍ତୃତ ପ୍ରକଳ୍ପ ଆକଳନ",
      "ପଶୁଧନ ମାଲିକାନା ପ୍ରମାଣପତ୍ର",
      "ଆଧାର ଏବଂ ବ୍ୟାଙ୍କ ବିବରଣୀ",
      "ଜାତି ପ୍ରମାଣପତ୍ର (ଯଦି ପ୍ରଯୁଜ୍ୟ)",
      "ସାଇଟ୍ ଫଟୋଗ୍ରାଫ୍"
    ],
    applicationProcess: [
      "Submit application with project details",
      "Site inspection by technical team",
      "Project approval within 30 days",
      "First installment (30%) on approval",
      "Second installment (40%) at plinth level",
      "Final installment (30%) on completion"
    ],
    applicationProcessOdia: [
      "ପ୍ରକଳ୍ପ ବିବରଣୀ ସହିତ ଆବେଦନ ଦାଖଲ କରନ୍ତୁ",
      "ଯାନ୍ତ୍ରିକ ଦଳ ଦ୍ୱାରା ସାଇଟ୍ ଯାଞ୍ଚ",
      "୩୦ ଦିନ ମଧ୍ୟରେ ପ୍ରକଳ୍ପ ଅନୁମୋଦନ",
      "ଅନୁମୋଦନ ପରେ ପ୍ରଥମ କିସ୍ତି (୩୦%)",
      "ପ୍ଲିନ୍ଥ ସ୍ତରରେ ଦ୍ୱିତୀୟ କିସ୍ତି (୪୦%)",
      "ସମାପ୍ତି ପରେ ଅନ୍ତିମ କିସ୍ତି (୩୦%)"
    ],
    subsidyAmount: "50-60% of project cost (Max ₹3 lakhs)",
    duration: "One-time grant",
    contactPerson: "Er. Rajesh Patra",
    contactPhone: "+91-674-2345682",
    contactEmail: "infrastructure.ahvd@odisha.gov.in",
    lastUpdated: "2024-11-15",
    targetAudience: "Farmers with 5+ animals",
    targetAudienceOdia: "୫+ ପଶୁ ସହିତ କୃଷକ"
  }
];

export const schemeCategories = [
  { value: 'all', label: 'All Categories', labelOdia: 'ସମସ୍ତ ବିଭାଗ' },
  { value: 'subsidy', label: 'Subsidy Schemes', labelOdia: 'ସବସିଡି ଯୋଜନା' },
  { value: 'insurance', label: 'Insurance', labelOdia: 'ବୀମା' },
  { value: 'training', label: 'Training Programs', labelOdia: 'ପ୍ରଶିକ୍ଷଣ କାର୍ଯ୍ୟକ୍ରମ' },
  { value: 'infrastructure', label: 'Infrastructure', labelOdia: 'ଭିତ୍ତିଭୂମି' },
  { value: 'welfare', label: 'Welfare Schemes', labelOdia: 'କଲ୍ୟାଣ ଯୋଜନା' },
  { value: 'dairy', label: 'Dairy Development', labelOdia: 'ଦୁଗ୍ଧ ବିକାଶ' }
];
