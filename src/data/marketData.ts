export interface MarketListing {
  id: string;
  listingId: string;
  title: string;
  titleOdia: string;
  category: 'livestock' | 'dairy' | 'feed' | 'equipment' | 'produce' | 'services';
  type: 'sell' | 'buy';
  description: string;
  descriptionOdia: string;
  sellerName: string;
  sellerNameOdia: string;
  sellerLocation: string;
  sellerLocationOdia: string;
  sellerContact: string;
  sellerEmail: string;
  price: number;
  unit: string;
  unitOdia: string;
  quantity: number;
  quantityAvailable: number;
  minOrder?: number;
  images: string[];
  quality: 'premium' | 'standard' | 'economy';
  verified: boolean;
  rating: number;
  reviews: number;
  listedDate: string;
  expiryDate?: string;
  status: 'available' | 'limited' | 'sold';
  features: string[];
  featuresOdia: string[];
  specifications: { label: string; value: string; labelOdia: string; valueOdia: string }[];
  delivery: {
    available: boolean;
    radius: string;
    charges: string;
    radiusOdia: string;
    chargesOdia: string;
  };
  negotiable: boolean;
  certification?: string[];
  certificationOdia?: string[];
}

export const marketData: MarketListing[] = [
  {
    id: "mkt-001",
    listingId: "MKT-LSK-2024-001",
    title: "Jersey Milch Cow - High Yielding",
    titleOdia: "ଜର୍ସି ଦୁଗ୍ଧବତୀ ଗାଈ - ଉଚ୍ଚ ଉତ୍ପାଦନକାରୀ",
    category: "livestock",
    type: "sell",
    description: "Premium quality Jersey cow, 3rd lactation, currently giving 18-20 liters milk per day. Healthy, vaccinated, and well-maintained. Excellent genetics with proven milk production record.",
    descriptionOdia: "ପ୍ରିମିୟମ୍ ଗୁଣବତ୍ତା ଜର୍ସି ଗାଈ, ୩ୟ ସ୍ତନ୍ୟପାନ, ବର୍ତ୍ତମାନ ଦିନକୁ ୧୮-୨୦ ଲିଟର ଦୁଗ୍ଧ ଦେଉଛି। ସୁସ୍ଥ, ଟିକାକରଣ ହୋଇଛି ଏବଂ ଭଲ ଭାବରେ ରକ୍ଷଣାବେକ୍ଷଣ ହୋଇଛି।",
    sellerName: "Ramesh Kumar Patel",
    sellerNameOdia: "ରମେଶ କୁମାର ପଟେଲ",
    sellerLocation: "Bhubaneswar, Khordha",
    sellerLocationOdia: "ଭୁବନେଶ୍ୱର, ଖୋର୍ଦ୍ଧା",
    sellerContact: "+91-9876543210",
    sellerEmail: "ramesh.patel@example.com",
    price: 85000,
    unit: "per animal",
    unitOdia: "ପ୍ରତି ପଶୁ",
    quantity: 1,
    quantityAvailable: 1,
    images: ["https://images.unsplash.com/photo-1516467508483-a7212febe31a?w=800"],
    quality: "premium",
    verified: true,
    rating: 4.8,
    reviews: 12,
    listedDate: "2024-11-25",
    status: "available",
    features: [
      "Daily milk yield: 18-20 liters",
      "Age: 5 years",
      "3rd lactation period",
      "All vaccinations up to date",
      "Ear tag: JER-2024-456",
      "Regular veterinary checkups",
      "Good temperament",
      "Proven breeding history"
    ],
    featuresOdia: [
      "ଦୈନିକ ଦୁଗ୍ଧ ଉତ୍ପାଦନ: ୧୮-୨୦ ଲିଟର",
      "ବୟସ: ୫ ବର୍ଷ",
      "୩ୟ ସ୍ତନ୍ୟପାନ ଅବଧି",
      "ସମସ୍ତ ଟିକାକରଣ ଅଦ୍ୟତନ",
      "କାନ ଟ୍ୟାଗ୍: JER-2024-456",
      "ନିୟମିତ ପ୍ରାଣୀ ଚିକିତ୍ସା ଯାଞ୍ଚ",
      "ଭଲ ସ୍ୱଭାବ",
      "ପ୍ରମାଣିତ ପ୍ରଜନନ ଇତିହାସ"
    ],
    specifications: [
      { label: "Breed", value: "Jersey", labelOdia: "ପ୍ରଜାତି", valueOdia: "ଜର୍ସି" },
      { label: "Age", value: "5 years", labelOdia: "ବୟସ", valueOdia: "୫ ବର୍ଷ" },
      { label: "Weight", value: "380 kg", labelOdia: "ଓଜନ", valueOdia: "୩୮୦ କିଗ୍ରା" },
      { label: "Milk/Day", value: "18-20 liters", labelOdia: "ଦୁଗ୍ଧ/ଦିନ", valueOdia: "୧୮-୨୦ ଲିଟର" },
      { label: "Lactation", value: "3rd", labelOdia: "ସ୍ତନ୍ୟପାନ", valueOdia: "୩ୟ" },
      { label: "Pregnancy", value: "Not pregnant", labelOdia: "ଗର୍ଭଧାରଣ", valueOdia: "ଗର୍ଭବତୀ ନୁହେଁ" }
    ],
    delivery: {
      available: true,
      radius: "Within 50 km",
      charges: "₹2,000 (negotiable)",
      radiusOdia: "୫୦ କିମି ମଧ୍ୟରେ",
      chargesOdia: "₹୨,୦୦୦ (ବୁଝାମଣା ଯୋଗ୍ୟ)"
    },
    negotiable: true,
    certification: ["Veterinary Health Certificate", "Vaccination Record", "Pedigree Certificate"],
    certificationOdia: ["ପ୍ରାଣୀ ଚିକିତ୍ସା ସ୍ୱାସ୍ଥ୍ୟ ପ୍ରମାଣପତ୍ର", "ଟିକାକରଣ ରେକର୍ଡ", "ବଂଶାବଳୀ ପ୍ରମାଣପତ୍ର"]
  },
  {
    id: "mkt-002",
    listingId: "MKT-DRY-2024-002",
    title: "Fresh Cow Milk - Daily Supply",
    titleOdia: "ତାଜା ଗାଈ କ୍ଷୀର - ଦୈନିକ ଯୋଗାଣ",
    category: "dairy",
    type: "sell",
    description: "Pure, fresh cow milk available for daily supply. Direct from farm to customer. Quality tested, hygienic, and chemical-free. Morning and evening delivery available.",
    descriptionOdia: "ଦୈନିକ ଯୋଗାଣ ପାଇଁ ଶୁଦ୍ଧ, ତାଜା ଗାଈ କ୍ଷୀର ଉପଲବ୍ଧ। ଫାର୍ମରୁ ସିଧା ଗ୍ରାହକଙ୍କ ପାଖକୁ। ଗୁଣବତ୍ତା ପରୀକ୍ଷିତ, ପରିଷ୍କାର ଏବଂ ରାସାୟନିକ ମୁକ୍ତ।",
    sellerName: "Gopal Dairy Farm",
    sellerNameOdia: "ଗୋପାଳ ଡେରୀ ଫାର୍ମ",
    sellerLocation: "Cuttack, Odisha",
    sellerLocationOdia: "କଟକ, ଓଡିଶା",
    sellerContact: "+91-9876543211",
    sellerEmail: "gopal.dairy@example.com",
    price: 65,
    unit: "per liter",
    unitOdia: "ପ୍ରତି ଲିଟର",
    quantity: 500,
    quantityAvailable: 500,
    minOrder: 2,
    images: ["https://images.unsplash.com/photo-1563636619-e9143da7973b?w=800"],
    quality: "premium",
    verified: true,
    rating: 4.9,
    reviews: 145,
    listedDate: "2024-11-20",
    status: "available",
    features: [
      "Fat content: 4.5-5%",
      "SNF: 8.5%+",
      "Morning & evening delivery",
      "Quality tested daily",
      "Chemical and preservative free",
      "Direct from farm",
      "Bulk orders accepted",
      "Regular customers get discount"
    ],
    featuresOdia: [
      "ଚର୍ବି ପରିମାଣ: ୪.୫-୫%",
      "SNF: ୮.୫%+",
      "ସକାଳ ଏବଂ ସନ୍ଧ୍ୟା ବିତରଣ",
      "ଦୈନିକ ଗୁଣବତ୍ତା ପରୀକ୍ଷିତ",
      "ରାସାୟନିକ ଏବଂ ସଂରକ୍ଷକ ମୁକ୍ତ",
      "ଫାର୍ମରୁ ସିଧା",
      "ବଲ୍କ ଅର୍ଡର ଗ୍ରହଣ କରାଯାଏ",
      "ନିୟମିତ ଗ୍ରାହକଙ୍କୁ ରିହାତି"
    ],
    specifications: [
      { label: "Type", value: "Fresh Cow Milk", labelOdia: "ପ୍ରକାର", valueOdia: "ତାଜା ଗାଈ କ୍ଷୀର" },
      { label: "Fat", value: "4.5-5%", labelOdia: "ଚର୍ବି", valueOdia: "୪.୫-୫%" },
      { label: "SNF", value: "8.5%+", labelOdia: "SNF", valueOdia: "୮.୫%+" },
      { label: "Delivery", value: "Twice daily", labelOdia: "ବିତରଣ", valueOdia: "ଦିନକୁ ଦୁଇଥର" },
      { label: "Minimum Order", value: "2 liters", labelOdia: "ସର୍ବନିମ୍ନ ଅର୍ଡର", valueOdia: "୨ ଲିଟର" }
    ],
    delivery: {
      available: true,
      radius: "Within 10 km",
      charges: "Free for orders above 10 liters",
      radiusOdia: "୧୦ କିମି ମଧ୍ୟରେ",
      chargesOdia: "୧୦ ଲିଟରରୁ ଅଧିକ ଅର୍ଡର ପାଇଁ ମାଗଣା"
    },
    negotiable: false,
    certification: ["FSSAI License", "Daily Quality Test Reports"],
    certificationOdia: ["FSSAI ଲାଇସେନ୍ସ", "ଦୈନିକ ଗୁଣବତ୍ତା ପରୀକ୍ଷା ରିପୋର୍ଟ"]
  },
  {
    id: "mkt-003",
    listingId: "MKT-FED-2024-003",
    title: "Premium Cattle Feed - Mixed Grain",
    titleOdia: "ପ୍ରିମିୟମ୍ ପଶୁ ଖାଦ୍ୟ - ମିଶ୍ରିତ ଶସ୍ୟ",
    category: "feed",
    type: "sell",
    description: "High-quality mixed grain cattle feed with optimal nutrition for milk production. Contains maize, soybean, wheat bran, minerals, and vitamins. Suitable for all types of cattle.",
    descriptionOdia: "ଦୁଗ୍ଧ ଉତ୍ପାଦନ ପାଇଁ ଉତ୍କୃଷ୍ଟ ପୋଷଣ ସହିତ ଉଚ୍ଚ ଗୁଣବତ୍ତା ମିଶ୍ରିତ ଶସ୍ୟ ପଶୁ ଖାଦ୍ୟ। ମକା, ସୋୟାବିନ, ଗହମ କଣା, ଖଣିଜ ଏବଂ ଭିଟାମିନ୍ ଧାରଣ କରିଥାଏ।",
    sellerName: "Odisha Agro Feeds Pvt. Ltd.",
    sellerNameOdia: "ଓଡିଶା ଏଗ୍ରୋ ଫିଡ୍ସ ପ୍ରା. ଲି.",
    sellerLocation: "Berhampur, Ganjam",
    sellerLocationOdia: "ବ୍ରହ୍ମପୁର, ଗଞ୍ଜାମ",
    sellerContact: "+91-9876543212",
    sellerEmail: "sales@odishaagro.com",
    price: 28,
    unit: "per kg",
    unitOdia: "ପ୍ରତି କିଗ୍ରା",
    quantity: 10000,
    quantityAvailable: 8500,
    minOrder: 50,
    images: ["https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800"],
    quality: "premium",
    verified: true,
    rating: 4.7,
    reviews: 89,
    listedDate: "2024-11-15",
    status: "available",
    features: [
      "Protein: 18-20%",
      "Energy: 70-75% TDN",
      "Balanced minerals & vitamins",
      "Improves milk production",
      "Easy to digest",
      "Suitable for all cattle",
      "No artificial additives",
      "Bulk discounts available"
    ],
    featuresOdia: [
      "ପ୍ରୋଟିନ୍: ୧୮-୨୦%",
      "ଶକ୍ତି: ୭୦-୭୫% TDN",
      "ସନ୍ତୁଲିତ ଖଣିଜ ଏବଂ ଭିଟାମିନ୍",
      "ଦୁଗ୍ଧ ଉତ୍ପାଦନ ଉନ୍ନତ କରେ",
      "ହଜମ କରିବା ସହଜ",
      "ସମସ୍ତ ଗୋରୁ ପାଇଁ ଉପଯୁକ୍ତ",
      "କୌଣସି କୃତ୍ରିମ ଯୋଗାଣ ନାହିଁ",
      "ବଲ୍କ ରିହାତି ଉପଲବ୍ଧ"
    ],
    specifications: [
      { label: "Protein", value: "18-20%", labelOdia: "ପ୍ରୋଟିନ୍", valueOdia: "୧୮-୨୦%" },
      { label: "Fat", value: "3-4%", labelOdia: "ଚର୍ବି", valueOdia: "୩-୪%" },
      { label: "Fiber", value: "8-10%", labelOdia: "ଫାଇବର", valueOdia: "୮-୧୦%" },
      { label: "Moisture", value: "Max 11%", labelOdia: "ଆର୍ଦ୍ରତା", valueOdia: "ସର୍ବାଧିକ ୧୧%" },
      { label: "Packaging", value: "50 kg bags", labelOdia: "ପ୍ୟାକେଜିଂ", valueOdia: "୫୦ କିଗ୍ରା ବ୍ୟାଗ" }
    ],
    delivery: {
      available: true,
      radius: "Pan Odisha",
      charges: "Free for orders above 1000 kg",
      radiusOdia: "ସମଗ୍ର ଓଡିଶା",
      chargesOdia: "୧୦୦୦ କିଗ୍ରାରୁ ଅଧିକ ଅର୍ଡର ପାଇଁ ମାଗଣା"
    },
    negotiable: true,
    certification: ["ISO 9001:2015", "FSSAI Approved", "Lab Tested"],
    certificationOdia: ["ISO 9001:2015", "FSSAI ଅନୁମୋଦିତ", "ଲ୍ୟାବ୍ ପରୀକ୍ଷିତ"]
  },
  {
    id: "mkt-004",
    listingId: "MKT-EQP-2024-004",
    title: "Automatic Milking Machine - Portable",
    titleOdia: "ସ୍ୱୟଂଚାଳିତ ଦୁଗ୍ଧ ମେସିନ୍ - ପୋର୍ଟେବଲ୍",
    category: "equipment",
    type: "sell",
    description: "High-efficiency portable milking machine suitable for 2-4 cows. Easy to operate, clean, and maintain. Reduces milking time and labor cost. Stainless steel construction.",
    descriptionOdia: "୨-୪ ଗାଈ ପାଇଁ ଉପଯୁକ୍ତ ଉଚ୍ଚ ଦକ୍ଷତା ପୋର୍ଟେବଲ୍ ଦୁଗ୍ଧ ମେସିନ୍। ଚଲାଇବା, ସଫା କରିବା ଏବଂ ରକ୍ଷଣାବେକ୍ଷଣ କରିବା ସହଜ।",
    sellerName: "Agri Equipment Solutions",
    sellerNameOdia: "ଏଗ୍ରି ଇକ୍ୱିପମେଣ୍ଟ ସୋଲ୍ୟୁସନ୍ସ",
    sellerLocation: "Rourkela, Sundargarh",
    sellerLocationOdia: "ରାଉରକେଲା, ସୁନ୍ଦରଗଡ଼",
    sellerContact: "+91-9876543213",
    sellerEmail: "info@agriequip.com",
    price: 35000,
    unit: "per unit",
    unitOdia: "ପ୍ରତି ୟୁନିଟ୍",
    quantity: 15,
    quantityAvailable: 12,
    images: ["https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800"],
    quality: "standard",
    verified: true,
    rating: 4.6,
    reviews: 34,
    listedDate: "2024-11-18",
    status: "available",
    features: [
      "Capacity: 2-4 cows/buffaloes",
      "Motor: 0.5 HP single phase",
      "Vacuum pressure: Adjustable",
      "Stainless steel teat cups",
      "Easy to clean and sterilize",
      "Portable and lightweight",
      "1-year warranty included",
      "Free training provided"
    ],
    featuresOdia: [
      "କ୍ଷମତା: ୨-୪ ଗାଈ/ମହିଷ",
      "ମୋଟର: ୦.୫ HP ସିଙ୍ଗଲ୍ ଫେଜ୍",
      "ଭାକ୍ୟୁମ୍ ଚାପ: ଆଡଜଷ୍ଟେବଲ୍",
      "ଷ୍ଟେନଲେସ୍ ଷ୍ଟିଲ୍ ଟିଟ୍ କପ୍",
      "ସଫା ଏବଂ ଜୀବାଣୁମୁକ୍ତ କରିବା ସହଜ",
      "ପୋର୍ଟେବଲ୍ ଏବଂ ହାଲୁକା",
      "୧ ବର୍ଷର ୱାରେଣ୍ଟି ଅନ୍ତର୍ଭୁକ୍ତ",
      "ମାଗଣା ପ୍ରଶିକ୍ଷଣ ପ୍ରଦାନ କରାଯାଏ"
    ],
    specifications: [
      { label: "Type", value: "Portable Bucket", labelOdia: "ପ୍ରକାର", valueOdia: "ପୋର୍ଟେବଲ୍ ବକେଟ୍" },
      { label: "Capacity", value: "2-4 animals", labelOdia: "କ୍ଷମତା", valueOdia: "୨-୪ ପଶୁ" },
      { label: "Power", value: "0.5 HP", labelOdia: "ଶକ୍ତି", valueOdia: "୦.୫ HP" },
      { label: "Voltage", value: "220V", labelOdia: "ଭୋଲ୍ଟେଜ୍", valueOdia: "୨୨୦V" },
      { label: "Bucket Size", value: "25 liters", labelOdia: "ବକେଟ୍ ଆକାର", valueOdia: "୨୫ ଲିଟର" },
      { label: "Warranty", value: "1 year", labelOdia: "ୱାରେଣ୍ଟି", valueOdia: "୧ ବର୍ଷ" }
    ],
    delivery: {
      available: true,
      radius: "All India",
      charges: "₹500-1500 depending on location",
      radiusOdia: "ସମଗ୍ର ଭାରତ",
      chargesOdia: "ସ୍ଥାନ ଉପରେ ନିର୍ଭର କରି ₹୫୦୦-୧୫୦୦"
    },
    negotiable: true,
    certification: ["ISI Mark", "CE Certified", "1 Year Warranty"],
    certificationOdia: ["ISI ମାର୍କ", "CE ପ୍ରମାଣିତ", "୧ ବର୍ଷ ୱାରେଣ୍ଟି"]
  },
  {
    id: "mkt-005",
    listingId: "MKT-LSK-2024-005",
    title: "Murrah Buffalo Calves - Premium Quality",
    titleOdia: "ମୁରା ମହିଷ ବାଛୁରୀ - ପ୍ରିମିୟମ୍ ଗୁଣବତ୍ତା",
    category: "livestock",
    type: "sell",
    description: "Healthy Murrah buffalo female calves, 6-8 months old, from high milk-yielding mothers. Vaccinated, dewormed, and ready for rearing. Good genetics for future milk production.",
    descriptionOdia: "ସୁସ୍ଥ ମୁରା ମହିଷ ମହିଳା ବାଛୁରୀ, ୬-୮ ମାସ ବୟସ, ଉଚ୍ଚ ଦୁଗ୍ଧ ଉତ୍ପାଦନକାରୀ ମାତାଙ୍କଠାରୁ। ଟିକାକରଣ, କୃମିମୁକ୍ତ ଏବଂ ପାଳିବା ପାଇଁ ପ୍ରସ୍ତୁତ।",
    sellerName: "Balaji Buffalo Farm",
    sellerNameOdia: "ବାଲାଜୀ ବଫାଲୋ ଫାର୍ମ",
    sellerLocation: "Puri, Odisha",
    sellerLocationOdia: "ପୁରୀ, ଓଡିଶା",
    sellerContact: "+91-9876543214",
    sellerEmail: "balajibuffalo@example.com",
    price: 28000,
    unit: "per calf",
    unitOdia: "ପ୍ରତି ବାଛୁରୀ",
    quantity: 8,
    quantityAvailable: 6,
    images: ["https://images.unsplash.com/photo-1560493676-04071c5f467b?w=800"],
    quality: "premium",
    verified: true,
    rating: 4.8,
    reviews: 18,
    listedDate: "2024-11-22",
    status: "limited",
    features: [
      "Age: 6-8 months",
      "Mother's milk yield: 12-14 liters/day",
      "Fully vaccinated",
      "Dewormed",
      "Healthy and active",
      "Good body weight",
      "Parents from proven bloodline",
      "Health certificate provided"
    ],
    featuresOdia: [
      "ବୟସ: ୬-୮ ମାସ",
      "ମାତାର ଦୁଗ୍ଧ ଉତ୍ପାଦନ: ୧୨-୧୪ ଲିଟର/ଦିନ",
      "ସମ୍ପୂର୍ଣ୍ଣ ଟିକାକରଣ",
      "କୃମିମୁକ୍ତ",
      "ସୁସ୍ଥ ଏବଂ ସକ୍ରିୟ",
      "ଭଲ ଶରୀର ଓଜନ",
      "ପ୍ରମାଣିତ ରକ୍ତ ସମ୍ବନ୍ଧୀୟ ପିତାମାତା",
      "ସ୍ୱାସ୍ଥ୍ୟ ପ୍ରମାଣପତ୍ର ପ୍ରଦାନ କରାଯାଏ"
    ],
    specifications: [
      { label: "Breed", value: "Murrah", labelOdia: "ପ୍ରଜାତି", valueOdia: "ମୁରା" },
      { label: "Age", value: "6-8 months", labelOdia: "ବୟସ", valueOdia: "୬-୮ ମାସ" },
      { label: "Gender", value: "Female", labelOdia: "ଲିଙ୍ଗ", valueOdia: "ମହିଳା" },
      { label: "Weight", value: "120-140 kg", labelOdia: "ଓଜନ", valueOdia: "୧୨୦-୧୪୦ କିଗ୍ରା" },
      { label: "Mother's Yield", value: "12-14 L/day", labelOdia: "ମାତାର ଉତ୍ପାଦନ", valueOdia: "୧୨-୧୪ ଲି/ଦିନ" }
    ],
    delivery: {
      available: true,
      radius: "Within 100 km",
      charges: "₹3,000 per calf",
      radiusOdia: "୧୦୦ କିମି ମଧ୍ୟରେ",
      chargesOdia: "ପ୍ରତି ବାଛୁରୀ ₹୩,୦୦୦"
    },
    negotiable: true,
    certification: ["Veterinary Health Certificate", "Vaccination Card", "Breed Certificate"],
    certificationOdia: ["ପ୍ରାଣୀ ଚିକିତ୍ସା ସ୍ୱାସ୍ଥ୍ୟ ପ୍ରମାଣପତ୍ର", "ଟିକାକରଣ କାର୍ଡ", "ପ୍ରଜାତି ପ୍ରମାଣପତ୍ର"]
  },
  {
    id: "mkt-006",
    listingId: "MKT-SRV-2024-006",
    title: "Veterinary Consultation Services",
    titleOdia: "ପ୍ରାଣୀ ଚିକିତ୍ସା ପରାମର୍ଶ ସେବା",
    category: "services",
    type: "sell",
    description: "Professional veterinary services including health checkups, vaccinations, AI services, pregnancy diagnosis, treatment of diseases, and emergency care. Available 24/7.",
    descriptionOdia: "ସ୍ୱାସ୍ଥ୍ୟ ଯାଞ୍ଚ, ଟିକାକରଣ, AI ସେବା, ଗର୍ଭଧାରଣ ନିର୍ଣ୍ଣୟ, ରୋଗ ଚିକିତ୍ସା ଏବଂ ଜରୁରୀକାଳୀନ ଯତ୍ନ ସହିତ ବୃତ୍ତିଗତ ପ୍ରାଣୀ ଚିକିତ୍ସା ସେବା। ୨୪/୭ ଉପଲବ୍ଧ।",
    sellerName: "Dr. Prakash Mishra (MVSc)",
    sellerNameOdia: "ଡ଼. ପ୍ରକାଶ ମିଶ୍ର (MVSc)",
    sellerLocation: "Sambalpur, Odisha",
    sellerLocationOdia: "ସମ୍ବଲପୁର, ଓଡିଶା",
    sellerContact: "+91-9876543215",
    sellerEmail: "dr.prakash.vet@example.com",
    price: 500,
    unit: "per visit",
    unitOdia: "ପ୍ରତି ପରିଦର୍ଶନ",
    quantity: 999,
    quantityAvailable: 999,
    images: ["https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800"],
    quality: "premium",
    verified: true,
    rating: 4.9,
    reviews: 234,
    listedDate: "2024-11-10",
    status: "available",
    features: [
      "Qualified veterinarian (MVSc)",
      "10+ years experience",
      "Health checkups and diagnosis",
      "Vaccination services",
      "AI (Artificial Insemination)",
      "Pregnancy testing",
      "Emergency treatment",
      "24/7 availability"
    ],
    featuresOdia: [
      "ଯୋଗ୍ୟ ପ୍ରାଣୀ ଚିକିତ୍ସକ (MVSc)",
      "୧୦+ ବର୍ଷର ଅଭିଜ୍ଞତା",
      "ସ୍ୱାସ୍ଥ୍ୟ ଯାଞ୍ଚ ଏବଂ ନିର୍ଣ୍ଣୟ",
      "ଟିକାକରଣ ସେବା",
      "AI (କୃତ୍ରିମ ଗର୍ଭାଧାନ)",
      "ଗର୍ଭଧାରଣ ପରୀକ୍ଷଣ",
      "ଜରୁରୀକାଳୀନ ଚିକିତ୍ସା",
      "୨୪/୭ ଉପଲବ୍ଧତା"
    ],
    specifications: [
      { label: "Qualification", value: "MVSc (Master)", labelOdia: "ଯୋଗ୍ୟତା", valueOdia: "MVSc (ମାଷ୍ଟର)" },
      { label: "Experience", value: "10+ years", labelOdia: "ଅଭିଜ୍ଞତା", valueOdia: "୧୦+ ବର୍ଷ" },
      { label: "Services", value: "All livestock", labelOdia: "ସେବା", valueOdia: "ସମସ୍ତ ପଶୁ" },
      { label: "Availability", value: "24/7", labelOdia: "ଉପଲବ୍ଧତା", valueOdia: "୨୪/୭" },
      { label: "Coverage", value: "50 km radius", labelOdia: "କଭରେଜ୍", valueOdia: "୫୦ କିମି ପରିସୀମା" }
    ],
    delivery: {
      available: true,
      radius: "50 km from Sambalpur",
      charges: "Free within 10 km, ₹10/km beyond",
      radiusOdia: "ସମ୍ବଲପୁରରୁ ୫୦ କିମି",
      chargesOdia: "୧୦ କିମି ମଧ୍ୟରେ ମାଗଣା, ପରେ ₹୧୦/କିମି"
    },
    negotiable: false,
    certification: ["Veterinary Council Registration", "MVSc Degree", "Practice License"],
    certificationOdia: ["ପ୍ରାଣୀ ଚିକିତ୍ସା ପରିଷଦ ପଞ୍ଜୀକରଣ", "MVSc ଡିଗ୍ରୀ", "ଅଭ୍ୟାସ ଲାଇସେନ୍ସ"]
  }
];

export const marketCategories = [
  { value: 'all', label: 'All Categories', labelOdia: 'ସମସ୍ତ ବିଭାଗ' },
  { value: 'livestock', label: 'Livestock', labelOdia: 'ପଶୁଧନ' },
  { value: 'dairy', label: 'Dairy Products', labelOdia: 'ଦୁଗ୍ଧ ଉତ୍ପାଦ' },
  { value: 'feed', label: 'Feed & Fodder', labelOdia: 'ଖାଦ୍ୟ ଏବଂ ଘାସ' },
  { value: 'equipment', label: 'Equipment', labelOdia: 'ଉପକରଣ' },
  { value: 'produce', label: 'Farm Produce', labelOdia: 'ଫାର୍ମ ଉତ୍ପାଦ' },
  { value: 'services', label: 'Services', labelOdia: 'ସେବା' }
];
