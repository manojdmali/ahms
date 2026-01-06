export interface Report {
  id: string;
  reportId: string;
  title: string;
  titleOdia: string;
  category: 'livestock' | 'health' | 'breeding' | 'dairy' | 'financial' | 'farmers' | 'training' | 'schemes' | 'insurance';
  type: 'summary' | 'detailed' | 'comparative' | 'trend';
  description: string;
  descriptionOdia: string;
  period: string;
  periodOdia: string;
  generatedDate: string;
  generatedBy: string;
  status: 'ready' | 'generating' | 'scheduled';
  format: string[];
  size: string;
  downloads: number;
  views: number;
  metrics: {
    label: string;
    labelOdia: string;
    value: string | number;
    change?: number;
    trend?: 'up' | 'down' | 'stable';
  }[];
  chartData?: {
    type: 'bar' | 'line' | 'pie' | 'area';
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      color?: string;
    }[];
  };
  insights: string[];
  insightsOdia: string[];
  recommendations: string[];
  recommendationsOdia: string[];
}

export const reportsData: Report[] = [
  {
    id: "rpt-001",
    reportId: "RPT-LST-2024-001",
    title: "Livestock Population & Health Report",
    titleOdia: "ପଶୁ ଜନସଂଖ୍ୟା ଏବଂ ସ୍ୱାସ୍ଥ୍ୟ ରିପୋର୍ଟ",
    category: "livestock",
    type: "summary",
    description: "Comprehensive overview of livestock population, species distribution, health status, and vaccination coverage across all registered farms in the district.",
    descriptionOdia: "ଜିଲ୍ଲାର ସମସ୍ତ ପଞ୍ଜୀକୃତ ଫାର୍ମରେ ପଶୁ ଜନସଂଖ୍ୟା, ପ୍ରଜାତି ବଣ୍ଟନ, ସ୍ୱାସ୍ଥ୍ୟ ସ୍ଥିତି ଏବଂ ଟିକାକରଣ କଭରେଜର ସମ୍ପୂର୍ଣ୍ଣ ସମୀକ୍ଷା।",
    period: "November 2024",
    periodOdia: "ନଭେମ୍ବର ୨୦୨୪",
    generatedDate: "2024-12-01",
    generatedBy: "District Livestock Officer",
    status: "ready",
    format: ["PDF", "Excel", "CSV"],
    size: "2.4 MB",
    downloads: 234,
    views: 1456,
    metrics: [
      {
        label: "Total Livestock",
        labelOdia: "ମୋଟ ପଶୁ",
        value: "24,567",
        change: 8.5,
        trend: "up"
      },
      {
        label: "Cattle",
        labelOdia: "ଗୋରୁ",
        value: "15,234",
        change: 6.2,
        trend: "up"
      },
      {
        label: "Buffalo",
        labelOdia: "ମହିଷ",
        value: "6,789",
        change: 12.3,
        trend: "up"
      },
      {
        label: "Goats & Sheep",
        labelOdia: "ଛେଳି ଏବଂ ମେଣ୍ଢା",
        value: "2,544",
        change: 3.1,
        trend: "up"
      },
      {
        label: "Vaccination Coverage",
        labelOdia: "ଟିକାକରଣ କଭରେଜ୍",
        value: "92.3%",
        change: 5.4,
        trend: "up"
      },
      {
        label: "Healthy Animals",
        labelOdia: "ସୁସ୍ଥ ପଶୁ",
        value: "96.8%",
        change: 2.1,
        trend: "up"
      }
    ],
    chartData: {
      type: "bar",
      labels: ["Cattle", "Buffalo", "Goat", "Sheep", "Others"],
      datasets: [
        {
          label: "Current Month",
          data: [15234, 6789, 1890, 654, 0],
          color: "#10b981"
        },
        {
          label: "Previous Month",
          data: [14345, 6045, 1834, 635, 0],
          color: "#94a3b8"
        }
      ]
    },
    insights: [
      "Livestock population increased by 8.5% compared to previous month",
      "Buffalo population showed highest growth at 12.3%",
      "Vaccination coverage improved to 92.3%, exceeding target of 90%",
      "Disease incidence decreased by 15% due to proactive measures",
      "95% of farms maintain proper health records"
    ],
    insightsOdia: [
      "ପଶୁ ଜନସଂଖ୍ୟା ପୂର୍ବ ମାସ ତୁଳନାରେ ୮.୫% ବୃଦ୍ଧି",
      "ମହିଷ ଜନସଂଖ୍ୟା ୧୨.୩% ରେ ସର୍ବାଧିକ ବୃଦ୍ଧି ଦେଖାଇଲା",
      "ଟିକାକରଣ କଭରେଜ୍ ୯୨.୩% କୁ ଉନ୍ନତ, ୯୦% ଲକ୍ଷ୍ୟ ଅତିକ୍ରମ",
      "ସକ୍ରିୟ ପଦକ୍ଷେପ କାରଣରୁ ରୋଗ ଘଟଣା ୧୫% ହ୍ରାସ",
      "୯୫% ଫାର୍ମ ସଠିକ୍ ସ୍ୱାସ୍ଥ୍ୟ ରେକର୍ଡ ବଜାୟ ରଖେ"
    ],
    recommendations: [
      "Continue vaccination drives in remote areas to achieve 95% coverage",
      "Focus on buffalo breeding programs to meet growing demand",
      "Implement digital health monitoring for early disease detection",
      "Provide training to farmers on preventive healthcare measures"
    ],
    recommendationsOdia: [
      "୯୫% କଭରେଜ୍ ହାସଲ କରିବାକୁ ଦୂର ଅଞ୍ଚଳରେ ଟିକାକରଣ ଅଭିଯାନ ଜାରି ରଖନ୍ତୁ",
      "ବଢୁଥିବା ଚାହିଦା ପୂରଣ ପାଇଁ ମହିଷ ପ୍ରଜନନ କାର୍ଯ୍ୟକ୍ରମ ଉପରେ ଧ୍ୟାନ ଦିଅନ୍ତୁ",
      "ପ୍ରାରମ୍ଭିକ ରୋଗ ଚିହ୍ନଟ ପାଇଁ ଡିଜିଟାଲ୍ ସ୍ୱାସ୍ଥ୍ୟ ନିରୀକ୍ଷଣ କାର୍ଯ୍ୟକାରୀ କରନ୍ତୁ",
      "ପ୍ରତିରୋଧକ ସ୍ୱାସ୍ଥ୍ୟ ପଦକ୍ଷେପ ଉପରେ କୃଷକମାନଙ୍କୁ ତାଲିମ ପ୍ରଦାନ କରନ୍ତୁ"
    ]
  },
  {
    id: "rpt-002",
    reportId: "RPT-DAIRY-2024-002",
    title: "Dairy Collection & Revenue Analysis",
    titleOdia: "ଦୁଗ୍ଧ ସଂଗ୍ରହ ଏବଂ ରାଜସ୍ୱ ବିଶ୍ଳେଷଣ",
    category: "dairy",
    type: "detailed",
    description: "Detailed analysis of milk collection volumes, quality parameters, payment processing, and revenue generation from dairy operations across all collection centers.",
    descriptionOdia: "ସମସ୍ତ ସଂଗ୍ରହ କେନ୍ଦ୍ରରେ ଦୁଗ୍ଧ ସଂଗ୍ରହ ପରିମାଣ, ଗୁଣବତ୍ତା ପାରାମିଟର, ଦେୟ ପ୍ରକ୍ରିୟାକରଣ ଏବଂ ଦୁଗ୍ଧ କାର୍ଯ୍ୟରୁ ରାଜସ୍ୱ ସୃଷ୍ଟିର ବିସ୍ତୃତ ବିଶ୍ଳେଷଣ।",
    period: "November 2024",
    periodOdia: "ନଭେମ୍ବର ୨୦୨୪",
    generatedDate: "2024-12-01",
    generatedBy: "Dairy Development Officer",
    status: "ready",
    format: ["PDF", "Excel"],
    size: "3.1 MB",
    downloads: 189,
    views: 987,
    metrics: [
      {
        label: "Total Collection",
        labelOdia: "ମୋଟ ସଂଗ୍ରହ",
        value: "485,678 L",
        change: 12.4,
        trend: "up"
      },
      {
        label: "Avg Daily Collection",
        labelOdia: "ଦୈନିକ ହାରାହାରି ସଂଗ୍ରହ",
        value: "16,189 L",
        change: 8.7,
        trend: "up"
      },
      {
        label: "Avg Fat Content",
        labelOdia: "ହାରାହାରି ଚର୍ବି ପରିମାଣ",
        value: "4.85%",
        change: 2.3,
        trend: "up"
      },
      {
        label: "Avg SNF",
        labelOdia: "ହାରାହାରି SNF",
        value: "8.72%",
        change: 1.8,
        trend: "up"
      },
      {
        label: "Total Revenue",
        labelOdia: "ମୋଟ ରାଜସ୍ୱ",
        value: "₹24.5 Lakh",
        change: 15.2,
        trend: "up"
      },
      {
        label: "Active Farmers",
        labelOdia: "ସକ୍ରିୟ କୃଷକ",
        value: "1,234",
        change: 6.8,
        trend: "up"
      }
    ],
    chartData: {
      type: "line",
      labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
      datasets: [
        {
          label: "Collection (Liters)",
          data: [115000, 118500, 122800, 129378],
          color: "#3b82f6"
        },
        {
          label: "Revenue (₹ Thousands)",
          data: [575, 592, 614, 647],
          color: "#10b981"
        }
      ]
    },
    insights: [
      "Milk collection increased by 12.4% with consistent week-over-week growth",
      "Average fat content improved to 4.85%, indicating better cattle nutrition",
      "Revenue per liter increased by 2.5% due to quality improvement",
      "Peak collection hours: 6-8 AM (45%) and 5-7 PM (55%)",
      "Digital payment adoption reached 78%, up from 65% last month"
    ],
    insightsOdia: [
      "ଦୁଗ୍ଧ ସଂଗ୍ରହ ୧୨.୪% ବୃଦ୍ଧି ସହ ସପ୍ତାହିକ ଧାରାବାହିକ ବୃଦ୍ଧି",
      "ହାରାହାରି ଚର୍ବି ପରିମାଣ ୪.୮୫% କୁ ଉନ୍ନତ, ଉତ୍ତମ ଗୋରୁ ପୋଷଣ ସୂଚାଏ",
      "ଗୁଣବତ୍ତା ଉନ୍ନତି କାରଣରୁ ଲିଟର ପ୍ରତି ରାଜସ୍ୱ ୨.୫% ବୃଦ୍ଧି",
      "ଶିଖର ସଂଗ୍ରହ ସମୟ: ୬-୮ AM (୪୫%) ଏବଂ ୫-୭ PM (୫୫%)",
      "ଡିଜିଟାଲ୍ ଦେୟ ଗ୍ରହଣ ଗତ ମାସର ୬୫% ରୁ ୭୮% ରେ ପହଞ୍ଚିଲା"
    ],
    recommendations: [
      "Incentivize farmers to maintain fat content above 5% through bonus payments",
      "Expand collection centers in high-production areas",
      "Promote digital payment adoption to reach 90% by next quarter",
      "Implement cold chain infrastructure to reduce spoilage"
    ],
    recommendationsOdia: [
      "ବୋନସ୍ ଦେୟ ମାଧ୍ୟମରେ ୫% ରୁ ଅଧିକ ଚର୍ବି ପରିମାଣ ବଜାୟ ରଖିବାକୁ କୃଷକମାନଙ୍କୁ ଉତ୍ସାହିତ କରନ୍ତୁ",
      "ଉଚ୍ଚ ଉତ୍ପାଦନ କ୍ଷେତ୍ରରେ ସଂଗ୍ରହ କେନ୍ଦ୍ର ବିସ୍ତାର କରନ୍ତୁ",
      "ପରବର୍ତ୍ତୀ ତ୍ରୈମାସିକରେ ୯୦% ରେ ପହଞ୍ଚିବାକୁ ଡିଜିଟାଲ୍ ଦେୟ ଗ୍ରହଣକୁ ପ୍ରୋତ୍ସାହିତ କରନ୍ତୁ",
      "ନଷ୍ଟ ହ୍ରାସ କରିବାକୁ କୋଲ୍ଡ ଚେନ୍ ଭିତ୍ତିଭୂମି କାର୍ଯ୍ୟକାରୀ କରନ୍ତୁ"
    ]
  },
  {
    id: "rpt-003",
    reportId: "RPT-VAC-2024-003",
    title: "Vaccination Coverage & Disease Control",
    titleOdia: "ଟିକାକରଣ କଭରେଜ୍ ଏବଂ ରୋଗ ନିୟନ୍ତ୍ରଣ",
    category: "health",
    type: "summary",
    description: "Analysis of vaccination campaigns, disease outbreaks, treatment effectiveness, and overall health management across the district.",
    descriptionOdia: "ଟିକାକରଣ ଅଭିଯାନ, ରୋଗ ପ୍ରକୋପ, ଚିକିତ୍ସା ପ୍ରଭାବଶୀଳତା ଏବଂ ଜିଲ୍ଲାରେ ସାମଗ୍ରିକ ସ୍ୱାସ୍ଥ୍ୟ ପରିଚାଳନାର ବିଶ୍ଳେଷଣ।",
    period: "Q4 2024 (Oct-Dec)",
    periodOdia: "Q୪ ୨୦୨୪ (ଅକ୍ଟୋ-ଡିସେ)",
    generatedDate: "2024-12-01",
    generatedBy: "Chief Veterinary Officer",
    status: "ready",
    format: ["PDF", "Excel", "CSV"],
    size: "1.8 MB",
    downloads: 312,
    views: 1823,
    metrics: [
      {
        label: "Animals Vaccinated",
        labelOdia: "ଟିକାକରଣ ପ୍ରାପ୍ତ ପଶୁ",
        value: "22,678",
        change: 18.5,
        trend: "up"
      },
      {
        label: "FMD Vaccination",
        labelOdia: "FMD ଟିକାକରଣ",
        value: "95.2%",
        change: 8.3,
        trend: "up"
      },
      {
        label: "Deworming Coverage",
        labelOdia: "କୃମିମୁକ୍ତ କଭରେଜ୍",
        value: "88.7%",
        change: 12.1,
        trend: "up"
      },
      {
        label: "Disease Cases",
        labelOdia: "ରୋଗ ମାମଲା",
        value: "456",
        change: -15.4,
        trend: "down"
      },
      {
        label: "Recovery Rate",
        labelOdia: "ପୁନରୁଦ୍ଧାର ହାର",
        value: "97.8%",
        change: 3.2,
        trend: "up"
      },
      {
        label: "Camps Organized",
        labelOdia: "ଆୟୋଜିତ କ୍ୟାମ୍ପ",
        value: "48",
        change: 20.0,
        trend: "up"
      }
    ],
    chartData: {
      type: "pie",
      labels: ["FMD", "HS", "BQ", "Deworming", "Other"],
      datasets: [
        {
          label: "Vaccination Distribution",
          data: [8945, 4567, 3456, 4890, 820],
          color: "#10b981"
        }
      ]
    },
    insights: [
      "FMD vaccination coverage exceeded 95%, meeting national standards",
      "Disease incidence reduced by 15.4% due to proactive vaccination",
      "48 health camps reached 12,000+ farmers in remote areas",
      "Recovery rate improved to 97.8% with better treatment protocols",
      "Digital health records maintained for 94% of vaccinated animals"
    ],
    insightsOdia: [
      "FMD ଟିକାକରଣ କଭରେଜ୍ ୯୫% ଅତିକ୍ରମ, ଜାତୀୟ ମାନକ ପୂରଣ",
      "ସକ୍ରିୟ ଟିକାକରଣ କାରଣରୁ ରୋଗ ଘଟଣା ୧୫.୪% ହ୍ରାସ",
      "୪୮ ସ୍ୱାସ୍ଥ୍ୟ କ୍ୟାମ୍ପ ଦୂର ଅଞ୍ଚଳରେ ୧୨,୦୦୦+ କୃଷକଙ୍କ ନିକଟରେ ପହଞ୍ଚିଲା",
      "ଉନ୍ନତ ଚିକିତ୍ସା ପ୍ରୋଟୋକଲ୍ ସହିତ ପୁନରୁଦ୍ଧାର ହାର ୯୭.୮% କୁ ଉନ୍ନତ",
      "୯୪% ଟିକାକରଣ ପ୍ରାପ୍ତ ପଶୁଙ୍କ ପାଇଁ ଡିଜିଟାଲ୍ ସ୍ୱାସ୍ଥ୍ୟ ରେକର୍ଡ ବଜାୟ"
    ],
    recommendations: [
      "Target 98% FMD coverage through door-to-door campaigns",
      "Strengthen deworming program to achieve 95% coverage",
      "Establish mobile veterinary units for remote areas",
      "Conduct regular disease surveillance and early warning systems"
    ],
    recommendationsOdia: [
      "ଘର-ଘର ଅଭିଯାନ ମାଧ୍ୟମରେ ୯୮% FMD କଭରେଜ୍ ଲକ୍ଷ୍ୟ ରଖନ୍ତୁ",
      "୯୫% କଭରେଜ୍ ହାସଲ କରିବାକୁ କୃମିମୁକ୍ତ କାର୍ଯ୍ୟକ୍ରମକୁ ଶକ୍ତିଶାଳୀ କରନ୍ତୁ",
      "ଦୂର ଅଞ୍ଚଳ ପାଇଁ ମୋବାଇଲ୍ ପ୍ରାଣୀ ଚିକିତ୍ସା ୟୁନିଟ୍ ପ୍ରତିଷ୍ଠା କରନ୍ତୁ",
      "ନିୟମିତ ରୋଗ ନିରୀକ୍ଷଣ ଏବଂ ପ୍ରାରମ୍ଭିକ ଚେତାବନୀ ପ୍ରଣାଳୀ ପରିଚାଳନା କରନ୍ତୁ"
    ]
  },
  {
    id: "rpt-004",
    reportId: "RPT-BREED-2024-004",
    title: "Breeding & AI Services Performance",
    titleOdia: "ପ୍ରଜନନ ଏବଂ AI ସେବା ପ୍ରଦର୍ଶନ",
    category: "breeding",
    type: "detailed",
    description: "Comprehensive report on artificial insemination services, conception rates, bull performance, genetic improvement programs, and breeding outcomes.",
    descriptionOdia: "କୃତ୍ରିମ ଗର୍ଭାଧାନ ସେବା, ଗର୍ଭଧାରଣ ହାର, ବୃଷ ପ୍ରଦର୍ଶନ, ଜେନେଟିକ୍ ଉନ୍ନତି କାର୍ଯ୍ୟକ୍ରମ ଏବଂ ପ୍ରଜନନ ଫଳାଫଳ ଉପରେ ସମ୍ପୂର୍ଣ୍ଣ ରିପୋର୍ଟ।",
    period: "November 2024",
    periodOdia: "ନଭେମ୍ବର ୨୦୨୪",
    generatedDate: "2024-12-01",
    generatedBy: "Breeding Coordinator",
    status: "ready",
    format: ["PDF", "Excel"],
    size: "2.7 MB",
    downloads: 156,
    views: 789,
    metrics: [
      {
        label: "AI Services",
        labelOdia: "AI ସେବା",
        value: "3,456",
        change: 14.2,
        trend: "up"
      },
      {
        label: "Conception Rate",
        labelOdia: "ଗର୍ଭଧାରଣ ହାର",
        value: "68.5%",
        change: 5.8,
        trend: "up"
      },
      {
        label: "Calving Rate",
        labelOdia: "ବାଛୁର ଜନ୍ମ ହାର",
        value: "94.2%",
        change: 2.3,
        trend: "up"
      },
      {
        label: "Active AI Technicians",
        labelOdia: "ସକ୍ରିୟ AI ଟେକ୍ନିସିଆନ୍",
        value: "78",
        change: 8.3,
        trend: "up"
      },
      {
        label: "Crossbred Calves",
        labelOdia: "କ୍ରସ୍ବ୍ରିଡ୍ ବାଛୁର",
        value: "2,145",
        change: 16.7,
        trend: "up"
      },
      {
        label: "Avg Milk Yield (L/day)",
        labelOdia: "ହାରାହାରି ଦୁଗ୍ଧ ଉତ୍ପାଦନ",
        value: "12.8",
        change: 8.5,
        trend: "up"
      }
    ],
    chartData: {
      type: "area",
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov"],
      datasets: [
        {
          label: "AI Services",
          data: [2845, 2923, 3045, 3156, 3234, 3312, 3398, 3401, 3423, 3445, 3456],
          color: "#8b5cf6"
        }
      ]
    },
    insights: [
      "AI services increased by 14.2% with consistent monthly growth",
      "Conception rate improved to 68.5%, exceeding national average of 65%",
      "Crossbred calves showing 25% higher milk productivity",
      "78 AI technicians serving average 44 services per month",
      "Jersey and HF crosses most popular accounting for 75% of AI services"
    ],
    insightsOdia: [
      "AI ସେବା ଧାରାବାହିକ ମାସିକ ବୃଦ୍ଧି ସହ ୧୪.୨% ବୃଦ୍ଧି",
      "ଗର୍ଭଧାରଣ ହାର ୬୮.୫% କୁ ଉନ୍ନତ, ଜାତୀୟ ହାରାହାରି ୬୫% ଅତିକ୍ରମ",
      "କ୍ରସ୍ବ୍ରିଡ୍ ବାଛୁର ୨୫% ଅଧିକ ଦୁଗ୍ଧ ଉତ୍ପାଦକତା ଦେଖାଉଛନ୍ତି",
      "୭୮ AI ଟେକ୍ନିସିଆନ୍ ମାସିକ ହାରାହାରି ୪୪ ସେବା ପ୍ରଦାନ କରୁଛନ୍ତି",
      "ଜର୍ସି ଏବଂ HF କ୍ରସ୍ ସବୁଠାରୁ ଲୋକପ୍ରିୟ, AI ସେବାର ୭୫% ଗଠନ"
    ],
    recommendations: [
      "Train additional AI technicians to cover underserved blocks",
      "Introduce sex-sorted semen to increase female calf births",
      "Establish semen production unit for indigenous breeds",
      "Implement pregnancy diagnosis camps for early detection"
    ],
    recommendationsOdia: [
      "ଅବ୍ୟବହୃତ ବ୍ଲକ୍ କଭର୍ କରିବାକୁ ଅତିରିକ୍ତ AI ଟେକ୍ନିସିଆନ୍ ତାଲିମ ଦିଅନ୍ତୁ",
      "ମହିଳା ବାଛୁର ଜନ୍ମ ବୃଦ୍ଧି ପାଇଁ ଲିଙ୍ଗ-ବଛା ସେମେନ୍ ପ୍ରବର୍ତ୍ତନ କରନ୍ତୁ",
      "ଦେଶୀ ପ୍ରଜାତି ପାଇଁ ସେମେନ୍ ଉତ୍ପାଦନ ୟୁନିଟ୍ ପ୍ରତିଷ୍ଠା କରନ୍ତୁ",
      "ପ୍ରାରମ୍ଭିକ ଚିହ୍ନଟ ପାଇଁ ଗର୍ଭଧାରଣ ନିର୍ଣ୍ଣୟ କ୍ୟାମ୍ପ କାର୍ଯ୍ୟକାରୀ କରନ୍ତୁ"
    ]
  },
  {
    id: "rpt-005",
    reportId: "RPT-FIN-2024-005",
    title: "Financial Performance & Budget Utilization",
    titleOdia: "ଆର୍ଥିକ ପ୍ରଦର୍ଶନ ଏବଂ ବଜେଟ୍ ବ୍ୟବହାର",
    category: "financial",
    type: "summary",
    description: "Overview of financial performance, budget allocation, expenditure tracking, revenue generation, and fund utilization across various schemes and programs.",
    descriptionOdia: "ଆର୍ଥିକ ପ୍ରଦର୍ଶନ, ବଜେଟ୍ ଆବଣ୍ଟନ, ବ୍ୟୟ ଟ୍ରାକିଂ, ରାଜସ୍ୱ ସୃଷ୍ଟି ଏବଂ ବିଭିନ୍ନ ଯୋଜନା ଏବଂ କାର୍ଯ୍ୟକ୍ରମରେ ପାଣ୍ଠି ବ୍ୟବହାରର ସମୀକ୍ଷା।",
    period: "FY 2024-25 (Apr-Nov)",
    periodOdia: "ଆର୍ଥିକ ବର୍ଷ ୨୦୨୪-୨୫ (ଏପ୍ରି-ନଭେ)",
    generatedDate: "2024-12-01",
    generatedBy: "Finance Controller",
    status: "ready",
    format: ["PDF", "Excel"],
    size: "1.5 MB",
    downloads: 423,
    views: 2134,
    metrics: [
      {
        label: "Total Budget",
        labelOdia: "ମୋଟ ବଜେଟ୍",
        value: "₹45.6 Cr",
        change: 0,
        trend: "stable"
      },
      {
        label: "Amount Utilized",
        labelOdia: "ବ୍ୟବହୃତ ପରିମାଣ",
        value: "₹28.9 Cr",
        change: 18.5,
        trend: "up"
      },
      {
        label: "Utilization Rate",
        labelOdia: "ବ୍ୟବହାର ହାର",
        value: "63.4%",
        change: 12.3,
        trend: "up"
      },
      {
        label: "Revenue Generated",
        labelOdia: "ସୃଷ୍ଟି ହୋଇଥିବା ରାଜସ୍ୱ",
        value: "₹12.3 Cr",
        change: 22.5,
        trend: "up"
      },
      {
        label: "Farmer Payments",
        labelOdia: "କୃଷକ ଦେୟ",
        value: "₹18.5 Cr",
        change: 15.8,
        trend: "up"
      },
      {
        label: "Pending Claims",
        labelOdia: "ବିଚାରାଧୀନ ଦାବି",
        value: "₹1.2 Cr",
        change: -25.6,
        trend: "down"
      }
    ],
    chartData: {
      type: "bar",
      labels: ["Schemes", "Infrastructure", "Training", "Healthcare", "Breeding", "Dairy", "Admin"],
      datasets: [
        {
          label: "Allocated",
          data: [15.5, 8.2, 4.3, 6.5, 5.1, 4.8, 1.2],
          color: "#94a3b8"
        },
        {
          label: "Utilized",
          data: [9.8, 5.2, 2.9, 4.1, 3.4, 3.1, 0.4],
          color: "#10b981"
        }
      ]
    },
    insights: [
      "Budget utilization at 63.4%, on track to achieve 85% by year-end",
      "Revenue generation exceeded targets by 22.5%",
      "Pending claims reduced by 25.6% through faster processing",
      "Dairy operations self-sustaining with 95% cost recovery",
      "Digital payment adoption reduced transaction costs by 18%"
    ],
    insightsOdia: [
      "ବଜେଟ୍ ବ୍ୟବହାର ୬୩.୪% ରେ, ବର୍ଷ ଶେଷରେ ୮୫% ହାସଲ କରିବାକୁ ଟ୍ରାକରେ",
      "ରାଜସ୍ୱ ସୃଷ୍ଟି ଲକ୍ଷ୍ୟକୁ ୨୨.୫% ଅତିକ୍ରମ କଲା",
      "ଦ୍ରୁତ ପ୍ରକ୍ରିୟାକରଣ ମାଧ୍ୟମରେ ବିଚାରାଧୀନ ଦାବି ୨୫.୬% ହ୍ରାସ",
      "ଦୁଗ୍ଧ କାର୍ଯ୍ୟ ୯୫% ଖର୍ଚ୍ଚ ପୁନରୁଦ୍ଧାର ସହ ଆତ୍ମନିର୍ଭରଶୀଳ",
      "ଡିଜିଟାଲ୍ ଦେୟ ଗ୍ରହଣ କାରବାର ଖର୍ଚ୍ଚ ୧୮% ହ୍ରାସ କଲା"
    ],
    recommendations: [
      "Accelerate scheme disbursements in underutilized categories",
      "Expand revenue streams through value-added services",
      "Implement automated claim processing to eliminate backlog",
      "Allocate additional funds for high-performing programs"
    ],
    recommendationsOdia: [
      "ଅବ୍ୟବହୃତ ବର୍ଗରେ ଯୋଜନା ବିତରଣ ତ୍ୱରାନ୍ୱିତ କରନ୍ତୁ",
      "ମୂଲ୍ୟ ଯୋଗ ସେବା ମାଧ୍ୟମରେ ରାଜସ୍ୱ ଧାରା ବିସ୍ତାର କରନ୍ତୁ",
      "ବ୍ୟାକଲଗ୍ ହଟାଇବାକୁ ସ୍ୱୟଂଚାଳିତ ଦାବି ପ୍ରକ୍ରିୟାକରଣ କାର୍ଯ୍ୟକାରୀ କରନ୍ତୁ",
      "ଉଚ୍ଚ-ପ୍ରଦର୍ଶନକାରୀ କାର୍ଯ୍ୟକ୍ରମ ପାଇଁ ଅତିରିକ୍ତ ପାଣ୍ଠି ଆବଣ୍ଟନ କରନ୍ତୁ"
    ]
  },
  {
    id: "rpt-006",
    reportId: "RPT-FARM-2024-006",
    title: "Farmer Engagement & Activity Report",
    titleOdia: "କୃଷକ ସଂଲଗ୍ନତା ଏବଂ କାର୍ଯ୍ୟକଳାପ ରିପୋର୍ଟ",
    category: "farmers",
    type: "detailed",
    description: "Analysis of farmer registrations, activity levels, service utilization, satisfaction scores, and engagement with various government programs.",
    descriptionOdia: "କୃଷକ ପଞ୍ଜୀକରଣ, କାର୍ଯ୍ୟକଳାପ ସ୍ତର, ସେବା ବ୍ୟବହାର, ସନ୍ତୋଷ ସ୍କୋର ଏବଂ ବିଭିନ୍ନ ସରକାରୀ କାର୍ଯ୍ୟକ୍ରମ ସହ ସଂଲଗ୍ନତାର ବିଶ୍ଳେଷଣ।",
    period: "November 2024",
    periodOdia: "ନଭେମ୍ବର ୨୦୨୪",
    generatedDate: "2024-12-01",
    generatedBy: "Extension Officer",
    status: "ready",
    format: ["PDF", "Excel", "CSV"],
    size: "2.2 MB",
    downloads: 267,
    views: 1245,
    metrics: [
      {
        label: "Registered Farmers",
        labelOdia: "ପଞ୍ଜୀକୃତ କୃଷକ",
        value: "8,945",
        change: 12.3,
        trend: "up"
      },
      {
        label: "Active Farmers",
        labelOdia: "ସକ୍ରିୟ କୃଷକ",
        value: "7,234",
        change: 8.7,
        trend: "up"
      },
      {
        label: "Digital Adoption",
        labelOdia: "ଡିଜିଟାଲ୍ ଗ୍ରହଣ",
        value: "82.5%",
        change: 15.2,
        trend: "up"
      },
      {
        label: "Service Requests",
        labelOdia: "ସେବା ଅନୁରୋଧ",
        value: "12,456",
        change: 18.9,
        trend: "up"
      },
      {
        label: "Satisfaction Score",
        labelOdia: "ସନ୍ତୋଷ ସ୍କୋର",
        value: "4.6/5",
        change: 6.5,
        trend: "up"
      },
      {
        label: "Training Participation",
        labelOdia: "ତାଲିମ ଅଂଶଗ୍ରହଣ",
        value: "1,890",
        change: 22.4,
        trend: "up"
      }
    ],
    chartData: {
      type: "line",
      labels: ["Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov"],
      datasets: [
        {
          label: "Active Farmers",
          data: [6234, 6345, 6512, 6689, 6834, 6945, 7089, 7234],
          color: "#10b981"
        },
        {
          label: "Service Requests",
          data: [9234, 9512, 9845, 10234, 10678, 11123, 11789, 12456],
          color: "#3b82f6"
        }
      ]
    },
    insights: [
      "Farmer registrations growing at 12.3% month-over-month",
      "Digital platform adoption reached 82.5%, highest in the state",
      "Average 1.7 service requests per active farmer per month",
      "Satisfaction score improved to 4.6/5 from 4.3/5 last quarter",
      "Youth farmers (18-35 age) constitute 34% of new registrations"
    ],
    insightsOdia: [
      "କୃଷକ ପଞ୍ଜୀକରଣ ମାସ-ମାସରେ ୧୨.୩% ବୃଦ୍ଧି ପାଉଛି",
      "ଡିଜିଟାଲ୍ ପ୍ଲାଟଫର୍ମ ଗ୍ରହଣ ୮୨.୫% ରେ ପହଞ୍ଚିଲା, ରାଜ୍ୟରେ ସର୍ବୋଚ୍ଚ",
      "ପ୍ରତି ସକ୍ରିୟ କୃଷକ ପ୍ରତି ମାସରେ ହାରାହାରି ୧.୭ ସେବା ଅନୁରୋଧ",
      "ଗତ ତ୍ରୈମାସିକର ୪.୩/୫ ରୁ ସନ୍ତୋଷ ସ୍କୋର ୪.୬/୫ କୁ ଉନ୍ନତ",
      "ଯୁବ କୃଷକ (୧୮-୩୫ ବୟସ) ନୂତନ ପଞ୍ଜୀକରଣର ୩୪% ଗଠନ କରନ୍ତି"
    ],
    recommendations: [
      "Launch targeted campaigns to onboard remaining 18% farmers to digital platform",
      "Establish farmer help desk in each block for personalized support",
      "Introduce farmer feedback system for continuous improvement",
      "Create farmer producer organizations (FPOs) for collective bargaining"
    ],
    recommendationsOdia: [
      "ଅବଶିଷ୍ଟ ୧୮% କୃଷକଙ୍କୁ ଡିଜିଟାଲ୍ ପ୍ଲାଟଫର୍ମରେ ଅନବୋର୍ଡ କରିବାକୁ ଲକ୍ଷ୍ୟବସ୍ତୁ ଅଭିଯାନ ଆରମ୍ଭ କରନ୍ତୁ",
      "ବ୍ୟକ୍ତିଗତ ସହାୟତା ପାଇଁ ପ୍ରତ୍ୟେକ ବ୍ଲକରେ କୃଷକ ସହାୟତା ଡେସ୍କ ପ୍ରତିଷ୍ଠା କରନ୍ତୁ",
      "ନିରନ୍ତର ଉନ୍ନତି ପାଇଁ କୃଷକ ମତାମତ ପ୍ରଣାଳୀ ପ୍ରବର୍ତ୍ତନ କରନ୍ତୁ",
      "ସାମୂହିକ ବୁ for ାମଣା ପାଇଁ କୃଷକ ଉତ୍ପାଦକ ସଂଗଠନ (FPO) ସୃଷ୍ଟି କରନ୍ତୁ"
    ]
  }
];

export const reportCategories = [
  { value: 'all', label: 'All Reports', labelOdia: 'ସମସ୍ତ ରିପୋର୍ଟ' },
  { value: 'livestock', label: 'Livestock', labelOdia: 'ପଶୁଧନ' },
  { value: 'health', label: 'Health & Vaccination', labelOdia: 'ସ୍ୱାସ୍ଥ୍ୟ ଏବଂ ଟିକାକରଣ' },
  { value: 'breeding', label: 'Breeding & AI', labelOdia: 'ପ୍ରଜନନ ଏବଂ AI' },
  { value: 'dairy', label: 'Dairy Operations', labelOdia: 'ଦୁଗ୍ଧ କାର୍ଯ୍ୟ' },
  { value: 'financial', label: 'Financial', labelOdia: 'ଆର୍ଥିକ' },
  { value: 'farmers', label: 'Farmer Engagement', labelOdia: 'କୃଷକ ସଂଲଗ୍ନତା' },
  { value: 'training', label: 'Training Programs', labelOdia: 'ତାଲିମ କାର୍ଯ୍ୟକ୍ରମ' },
  { value: 'schemes', label: 'Government Schemes', labelOdia: 'ସରକାରୀ ଯୋଜନା' },
  { value: 'insurance', label: 'Insurance', labelOdia: 'ବୀମା' }
];
