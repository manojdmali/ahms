export interface Farmer {
  id: string;
  farmerId: string;
  name: string;
  nameOdia: string;
  fatherName: string;
  age: number;
  gender: string;
  contact: string;
  alternateContact: string | null;
  email: string | null;
  address: {
    village: string;
    panchayat: string;
    block: string;
    district: string;
    state: string;
    pincode: string;
  };
  bankDetails: {
    accountNumber: string;
    ifsc: string;
    bankName: string;
    branch: string;
  };
  livestock: {
    cattle: number;
    buffalo: number;
    goat: number;
    sheep: number;
    poultry: number;
  };
  totalLivestock: number;
  registrationDate: string;
  kycStatus: string;
  aadhaar: string;
  schemes: string[];
  insuranceStatus: string;
  photo: string | null;
}

export const farmersData: Farmer[] = [
  {
    id: "f7b3c1a5-2d4e-4f8b-9c1a-5e6d7f8a9b0c",
    farmerId: "OD-KHD-F-2024-001",
    name: "Ramesh Kumar Patel",
    nameOdia: "ରମେଶ କୁମାର ପଟେଲ",
    fatherName: "Bhagwan Patel",
    age: 45,
    gender: "Male",
    contact: "+91 9876543210",
    alternateContact: "+91 8765432109",
    email: "ramesh.patel@gmail.com",
    address: {
      village: "Baliguali",
      panchayat: "Baliguali",
      block: "Balipatna",
      district: "Khordha",
      state: "Odisha",
      pincode: "752104"
    },
    bankDetails: {
      accountNumber: "1234567890",
      ifsc: "SBIN0001234",
      bankName: "State Bank of India",
      branch: "Balipatna"
    },
    livestock: {
      cattle: 5,
      buffalo: 2,
      goat: 8,
      sheep: 0,
      poultry: 25
    },
    totalLivestock: 40,
    registrationDate: "2023-01-15",
    kycStatus: "Verified",
    aadhaar: "XXXX-XXXX-3456",
    schemes: ["PM-KISAN", "Livestock Insurance", "NDDB Dairy"],
    insuranceStatus: "Active",
    photo: null
  },
  {
    id: "a8c4d2b6-3e5f-4g9c-0d2b-6f7e8g9a0c1d",
    farmerId: "OD-KHD-F-2024-002",
    name: "Suresh Mohanty",
    nameOdia: "ସୁରେଶ ମହାନ୍ତି",
    fatherName: "Brundaban Mohanty",
    age: 38,
    gender: "Male",
    contact: "+91 9123456789",
    alternateContact: "+91 8234567890",
    email: "suresh.mohanty@yahoo.com",
    address: {
      village: "Khuntuni",
      panchayat: "Khuntuni",
      block: "Tangi",
      district: "Khordha",
      state: "Odisha",
      pincode: "752054"
    },
    bankDetails: {
      accountNumber: "2345678901",
      ifsc: "HDFC0001234",
      bankName: "HDFC Bank",
      branch: "Tangi"
    },
    livestock: {
      cattle: 8,
      buffalo: 1,
      goat: 5,
      sheep: 0,
      poultry: 50
    },
    totalLivestock: 64,
    registrationDate: "2023-03-20",
    kycStatus: "Verified",
    aadhaar: "XXXX-XXXX-7890",
    schemes: ["PM-KISAN", "Livestock Insurance", "Kisan Credit Card"],
    insuranceStatus: "Active",
    photo: null
  },
  {
    id: "b9d5e3c7-4f6g-5h0d-1e3c-7g8f9h0b1d2e",
    farmerId: "OD-KHD-F-2024-003",
    name: "Prakash Jena",
    nameOdia: "ପ୍ରକାଶ ଜେନା",
    fatherName: "Ratnakar Jena",
    age: 52,
    gender: "Male",
    contact: "+91 9988776655",
    alternateContact: null,
    email: null,
    address: {
      village: "Jatni",
      panchayat: "Jatni",
      block: "Jatni",
      district: "Khordha",
      state: "Odisha",
      pincode: "752050"
    },
    bankDetails: {
      accountNumber: "3456789012",
      ifsc: "SBIN0005678",
      bankName: "State Bank of India",
      branch: "Jatni"
    },
    livestock: {
      cattle: 3,
      buffalo: 4,
      goat: 12,
      sheep: 6,
      poultry: 30
    },
    totalLivestock: 55,
    registrationDate: "2022-11-10",
    kycStatus: "Verified",
    aadhaar: "XXXX-XXXX-2345",
    schemes: ["Livestock Insurance", "NDDB Dairy"],
    insuranceStatus: "Active",
    photo: null
  },
  {
    id: "c0e6f4d8-5g7h-6i1e-2f4d-8h9g0i1c2e3f",
    farmerId: "OD-KHD-F-2024-004",
    name: "Bijay Kumar Sahu",
    nameOdia: "ବିଜୟ କୁମାର ସାହୁ",
    fatherName: "Kishore Sahu",
    age: 41,
    gender: "Male",
    contact: "+91 9876543211",
    alternateContact: "+91 7654321098",
    email: "bijay.sahu@gmail.com",
    address: {
      village: "Khandagiri",
      panchayat: "Khandagiri",
      block: "Bhubaneswar",
      district: "Khordha",
      state: "Odisha",
      pincode: "751030"
    },
    bankDetails: {
      accountNumber: "4567890123",
      ifsc: "ICIC0001234",
      bankName: "ICICI Bank",
      branch: "Khandagiri"
    },
    livestock: {
      cattle: 6,
      buffalo: 0,
      goat: 10,
      sheep: 0,
      poultry: 40
    },
    totalLivestock: 56,
    registrationDate: "2023-06-15",
    kycStatus: "Verified",
    aadhaar: "XXXX-XXXX-5678",
    schemes: ["PM-KISAN", "Livestock Insurance"],
    insuranceStatus: "Active",
    photo: null
  },
  {
    id: "d1f7g5e9-6h8i-7j2f-3g5e-9i0h1j2d3f4g",
    farmerId: "OD-KHD-F-2024-005",
    name: "Sanjay Pradhan",
    nameOdia: "ସଞ୍ଜୟ ପ୍ରଧାନ",
    fatherName: "Dillip Pradhan",
    age: 35,
    gender: "Male",
    contact: "+91 9123456780",
    alternateContact: "+91 8123456789",
    email: "sanjay.pradhan@outlook.com",
    address: {
      village: "Begunia",
      panchayat: "Begunia",
      block: "Balipatna",
      district: "Khordha",
      state: "Odisha",
      pincode: "752104"
    },
    bankDetails: {
      accountNumber: "5678901234",
      ifsc: "SBIN0002345",
      bankName: "State Bank of India",
      branch: "Begunia"
    },
    livestock: {
      cattle: 4,
      buffalo: 3,
      goat: 6,
      sheep: 0,
      poultry: 20
    },
    totalLivestock: 33,
    registrationDate: "2023-08-22",
    kycStatus: "Verified",
    aadhaar: "XXXX-XXXX-9012",
    schemes: ["PM-KISAN", "Kisan Credit Card"],
    insuranceStatus: "Pending",
    photo: null
  },
  {
    id: "e2g8h6f0-7i9j-8k3g-4h6f-0j1i2k3e4g5h",
    farmerId: "OD-KHD-F-2024-006",
    name: "Mahendra Nayak",
    nameOdia: "ମହେନ୍ଦ୍ର ନାୟକ",
    fatherName: "Gobinda Nayak",
    age: 48,
    gender: "Male",
    contact: "+91 9988776644",
    alternateContact: null,
    email: "mahendra.nayak@rediffmail.com",
    address: {
      village: "Bolagarh",
      panchayat: "Bolagarh",
      block: "Bolagarh",
      district: "Khordha",
      state: "Odisha",
      pincode: "752066"
    },
    bankDetails: {
      accountNumber: "6789012345",
      ifsc: "HDFC0005678",
      bankName: "HDFC Bank",
      branch: "Bolagarh"
    },
    livestock: {
      cattle: 7,
      buffalo: 2,
      goat: 15,
      sheep: 8,
      poultry: 60
    },
    totalLivestock: 92,
    registrationDate: "2022-09-05",
    kycStatus: "Verified",
    aadhaar: "XXXX-XXXX-3456",
    schemes: ["PM-KISAN", "Livestock Insurance", "NDDB Dairy", "Kisan Credit Card"],
    insuranceStatus: "Active",
    photo: null
  },
  {
    id: "f3h9i7g1-8j0k-9l4h-5i7g-1k2j3l4f5h6i",
    farmerId: "OD-KHD-F-2024-007",
    name: "Anita Behera",
    nameOdia: "ଅନିତା ବେହେରା",
    fatherName: "Jagannath Behera",
    age: 42,
    gender: "Female",
    contact: "+91 9123456781",
    alternateContact: "+91 8234567891",
    email: "anita.behera@gmail.com",
    address: {
      village: "Balianta",
      panchayat: "Balianta",
      block: "Balipatna",
      district: "Khordha",
      state: "Odisha",
      pincode: "752101"
    },
    bankDetails: {
      accountNumber: "7890123456",
      ifsc: "SBIN0003456",
      bankName: "State Bank of India",
      branch: "Balianta"
    },
    livestock: {
      cattle: 3,
      buffalo: 1,
      goat: 20,
      sheep: 0,
      poultry: 45
    },
    totalLivestock: 69,
    registrationDate: "2023-04-18",
    kycStatus: "Verified",
    aadhaar: "XXXX-XXXX-6789",
    schemes: ["PM-KISAN", "Livestock Insurance", "Women Farmer Scheme"],
    insuranceStatus: "Active",
    photo: null
  },
  {
    id: "g4i0j8h2-9k1l-0m5i-6j8h-2l3k4m5g6i7j",
    farmerId: "OD-KHD-F-2024-008",
    name: "Debasis Swain",
    nameOdia: "ଦେବାସିସ ସ୍ୱାଇଁ",
    fatherName: "Krushna Swain",
    age: 39,
    gender: "Male",
    contact: "+91 9876543212",
    alternateContact: null,
    email: null,
    address: {
      village: "Aiginia",
      panchayat: "Aiginia",
      block: "Tangi",
      district: "Khordha",
      state: "Odisha",
      pincode: "752056"
    },
    bankDetails: {
      accountNumber: "8901234567",
      ifsc: "ICIC0002345",
      bankName: "ICICI Bank",
      branch: "Tangi"
    },
    livestock: {
      cattle: 5,
      buffalo: 0,
      goat: 8,
      sheep: 0,
      poultry: 35
    },
    totalLivestock: 48,
    registrationDate: "2023-07-12",
    kycStatus: "Pending",
    aadhaar: "XXXX-XXXX-0123",
    schemes: ["Livestock Insurance"],
    insuranceStatus: "Pending",
    photo: null
  },
  {
    id: "h5j1k9i3-0l2m-1n6j-7k9i-3m4l5n6h7j8k",
    farmerId: "OD-KHD-F-2024-009",
    name: "Santosh Kumar Behera",
    nameOdia: "ସନ୍ତୋଷ କୁମାର ବେହେରା",
    fatherName: "Balakrushna Behera",
    age: 55,
    gender: "Male",
    contact: "+91 9988776633",
    alternateContact: "+91 8877665544",
    email: "santosh.behera@yahoo.com",
    address: {
      village: "Bhimpur",
      panchayat: "Bhimpur",
      block: "Jatni",
      district: "Khordha",
      state: "Odisha",
      pincode: "752055"
    },
    bankDetails: {
      accountNumber: "9012345678",
      ifsc: "HDFC0003456",
      bankName: "HDFC Bank",
      branch: "Jatni"
    },
    livestock: {
      cattle: 9,
      buffalo: 3,
      goat: 18,
      sheep: 10,
      poultry: 80
    },
    totalLivestock: 120,
    registrationDate: "2022-08-01",
    kycStatus: "Verified",
    aadhaar: "XXXX-XXXX-4567",
    schemes: ["PM-KISAN", "Livestock Insurance", "NDDB Dairy", "Kisan Credit Card"],
    insuranceStatus: "Active",
    photo: null
  },
  {
    id: "i6k2l0j4-1m3n-2o7k-8l0j-4n5m6o7i8k9l",
    farmerId: "OD-KHD-F-2024-010",
    name: "Priyanka Sahoo",
    nameOdia: "ପ୍ରିୟଙ୍କା ସାହୁ",
    fatherName: "Niranjan Sahoo",
    age: 33,
    gender: "Female",
    contact: "+91 9123456782",
    alternateContact: "+91 8123456788",
    email: "priyanka.sahoo@gmail.com",
    address: {
      village: "Sisupalgarh",
      panchayat: "Sisupalgarh",
      block: "Bhubaneswar",
      district: "Khordha",
      state: "Odisha",
      pincode: "751002"
    },
    bankDetails: {
      accountNumber: "0123456789",
      ifsc: "SBIN0004567",
      bankName: "State Bank of India",
      branch: "Sisupalgarh"
    },
    livestock: {
      cattle: 2,
      buffalo: 1,
      goat: 12,
      sheep: 0,
      poultry: 55
    },
    totalLivestock: 70,
    registrationDate: "2023-09-28",
    kycStatus: "Verified",
    aadhaar: "XXXX-XXXX-7890",
    schemes: ["PM-KISAN", "Women Farmer Scheme", "Livestock Insurance"],
    insuranceStatus: "Active",
    photo: null
  },
  {
    id: "j7l3m1k5-2n4o-3p8l-9m1k-5o6n7p8j9l0m",
    farmerId: "OD-KHD-F-2024-011",
    name: "Ranjan Das",
    nameOdia: "ରଞ୍ଜନ ଦାସ",
    fatherName: "Harihar Das",
    age: 47,
    gender: "Male",
    contact: "+91 9876543213",
    alternateContact: "+91 7654321099",
    email: "ranjan.das@gmail.com",
    address: {
      village: "Chandaka",
      panchayat: "Chandaka",
      block: "Bhubaneswar",
      district: "Khordha",
      state: "Odisha",
      pincode: "751021"
    },
    bankDetails: {
      accountNumber: "1234509876",
      ifsc: "SBIN0006789",
      bankName: "State Bank of India",
      branch: "Chandaka"
    },
    livestock: {
      cattle: 6,
      buffalo: 2,
      goat: 14,
      sheep: 5,
      poultry: 42
    },
    totalLivestock: 69,
    registrationDate: "2023-02-14",
    kycStatus: "Verified",
    aadhaar: "XXXX-XXXX-8901",
    schemes: ["PM-KISAN", "Livestock Insurance", "NDDB Dairy"],
    insuranceStatus: "Active",
    photo: null
  },
  {
    id: "k8m4n2l6-3o5p-4q9m-0n2l-6p7o8q9k0m1n",
    farmerId: "OD-KHD-F-2024-012",
    name: "Sarita Panda",
    nameOdia: "ସରିତା ପଣ୍ଡା",
    fatherName: "Pranab Panda",
    age: 36,
    gender: "Female",
    contact: "+91 9123456783",
    alternateContact: null,
    email: "sarita.panda@yahoo.com",
    address: {
      village: "Mancheswar",
      panchayat: "Mancheswar",
      block: "Bhubaneswar",
      district: "Khordha",
      state: "Odisha",
      pincode: "751010"
    },
    bankDetails: {
      accountNumber: "2345610987",
      ifsc: "HDFC0007890",
      bankName: "HDFC Bank",
      branch: "Mancheswar"
    },
    livestock: {
      cattle: 4,
      buffalo: 1,
      goat: 8,
      sheep: 0,
      poultry: 38
    },
    totalLivestock: 51,
    registrationDate: "2023-05-20",
    kycStatus: "Verified",
    aadhaar: "XXXX-XXXX-9012",
    schemes: ["PM-KISAN", "Women Farmer Scheme", "Kisan Credit Card"],
    insuranceStatus: "Active",
    photo: null
  },
  {
    id: "l9n5o3m7-4p6q-5r0n-1o3m-7q8p9r0l1n2o",
    farmerId: "OD-KHD-F-2024-013",
    name: "Tapan Mishra",
    nameOdia: "ତପନ ମିଶ୍ର",
    fatherName: "Rama Mishra",
    age: 50,
    gender: "Male",
    contact: "+91 9988776622",
    alternateContact: "+91 8877665533",
    email: null,
    address: {
      village: "Patia",
      panchayat: "Patia",
      block: "Bhubaneswar",
      district: "Khordha",
      state: "Odisha",
      pincode: "751024"
    },
    bankDetails: {
      accountNumber: "3456721098",
      ifsc: "ICIC0008901",
      bankName: "ICICI Bank",
      branch: "Patia"
    },
    livestock: {
      cattle: 7,
      buffalo: 3,
      goat: 16,
      sheep: 7,
      poultry: 65
    },
    totalLivestock: 98,
    registrationDate: "2022-10-15",
    kycStatus: "Verified",
    aadhaar: "XXXX-XXXX-0123",
    schemes: ["PM-KISAN", "Livestock Insurance", "NDDB Dairy", "Kisan Credit Card"],
    insuranceStatus: "Active",
    photo: null
  },
  {
    id: "m0o6p4n8-5q7r-6s1o-2p4n-8r9q0s1m2o3p",
    farmerId: "OD-KHD-F-2024-014",
    name: "Laxmi Naik",
    nameOdia: "ଲକ୍ଷ୍ମୀ ନାୟକ",
    fatherName: "Baidyanath Naik",
    age: 44,
    gender: "Female",
    contact: "+91 9123456784",
    alternateContact: "+91 8234567892",
    email: "laxmi.naik@gmail.com",
    address: {
      village: "Sundarpada",
      panchayat: "Sundarpada",
      block: "Bhubaneswar",
      district: "Khordha",
      state: "Odisha",
      pincode: "751014"
    },
    bankDetails: {
      accountNumber: "4567832109",
      ifsc: "SBIN0009012",
      bankName: "State Bank of India",
      branch: "Sundarpada"
    },
    livestock: {
      cattle: 5,
      buffalo: 2,
      goat: 18,
      sheep: 0,
      poultry: 52
    },
    totalLivestock: 77,
    registrationDate: "2023-03-10",
    kycStatus: "Verified",
    aadhaar: "XXXX-XXXX-1234",
    schemes: ["PM-KISAN", "Women Farmer Scheme", "Livestock Insurance"],
    insuranceStatus: "Active",
    photo: null
  },
  {
    id: "n1p7q5o9-6r8s-7t2p-3q5o-9s0r1t2n3p4q",
    farmerId: "OD-KHD-F-2024-015",
    name: "Ashok Parida",
    nameOdia: "ଅଶୋକ ପରିଡ଼ା",
    fatherName: "Laxman Parida",
    age: 40,
    gender: "Male",
    contact: "+91 9876543214",
    alternateContact: null,
    email: "ashok.parida@outlook.com",
    address: {
      village: "Rasulgarh",
      panchayat: "Rasulgarh",
      block: "Bhubaneswar",
      district: "Khordha",
      state: "Odisha",
      pincode: "751010"
    },
    bankDetails: {
      accountNumber: "5678943210",
      ifsc: "HDFC0000123",
      bankName: "HDFC Bank",
      branch: "Rasulgarh"
    },
    livestock: {
      cattle: 4,
      buffalo: 1,
      goat: 10,
      sheep: 0,
      poultry: 30
    },
    totalLivestock: 45,
    registrationDate: "2023-07-05",
    kycStatus: "Verified",
    aadhaar: "XXXX-XXXX-2345",
    schemes: ["Livestock Insurance", "Kisan Credit Card"],
    insuranceStatus: "Active",
    photo: null
  }
];
