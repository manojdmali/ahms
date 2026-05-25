// AIT (Artificial Insemination Technician) and Farmer Semen Module mock data

export interface KrushakFarmer {
  aadhaar: string;
  mobile: string;
  name: string;
  village: string;
  block: string;
  district: string;
}

export interface BharatPashuAnimal {
  tagNumber: string;
  breed: string;
  animalType: 'Cattle' | 'Buffalo';
  age: number;
  ownerAadhaar: string;
  ownerName: string;
}

export interface SemenDose {
  code: string;
  bullId: string;
  breed: string;
  animalType: 'Cattle' | 'Buffalo';
  semenType: 'Normal' | 'Sex Sorted';
  batchNumber: string;
  stationNumber: string;
  dampSeal: string;
  dateOfCollection: string;
  available: boolean;
}

export interface AITUtilisationRecord {
  id: string;
  farmerName: string;
  farmerAadhaar: string;
  farmerMobile: string;
  animalTag: string;
  animalBreed: string;
  bullId: string;
  doseCode: string;
  semenType: 'Normal' | 'Sex Sorted';
  dateAdministered: string;
  batchNumber: string;
  dampSeal: string;
  stationNumber: string;
  sourceOfDistribution: string;
  aitName: string;
  lac: string;
  block: string;
  district: string;
  synced: boolean;
}

export interface AITRestockRequest {
  id: string;
  animalType: 'Cattle' | 'Buffalo';
  semenType: 'Normal' | 'Sex Sorted';
  quantity: number;
  urgency: 'Urgent' | 'Not Urgent';
  status: 'Pending' | 'Approved' | 'Fulfilled';
  submittedAt: string;
  approvedAt?: string;
  approvedBy?: string;
}

export interface FarmerAIRequest {
  id: string;
  farmerName: string;
  animalType: string;
  breed: string;
  location: string;
  preferredDate: string;
  preferredTime: string;
  status: 'Pending' | 'AIT Assigned' | 'Completed';
  assignedAIT?: string;
  submittedAt: string;
}

// Krushak Odisha farmer database (mock)
export const krushakFarmers: KrushakFarmer[] = [
  { aadhaar: '4512-8823-9901', mobile: '9437012098', name: 'Gopal Jena', village: 'Remuna', block: 'Remuna', district: 'Balasore' },
  { aadhaar: '7822-3341-0012', mobile: '9776244012', name: 'Sabitri Nayak', village: 'Basta', block: 'Basta', district: 'Balasore' },
  { aadhaar: '2201-9934-5567', mobile: '8895612340', name: 'Ramesh Patel', village: 'Soro', block: 'Soro', district: 'Balasore' },
  { aadhaar: '6634-1122-7788', mobile: '7978345612', name: 'Sunita Das', village: 'Nilgiri', block: 'Nilgiri', district: 'Balasore' },
  { aadhaar: '3309-5544-2211', mobile: '9438901234', name: 'Bijay Mohanty', village: 'Jaleswar', block: 'Jaleswar', district: 'Balasore' },
];

// Bharat Pashudhan animal database (mock)
export const bharatPashuAnimals: BharatPashuAnimal[] = [
  { tagNumber: 'OD-BLS-C-2024-0012', breed: 'HF Cross', animalType: 'Cattle', age: 4, ownerAadhaar: '4512-8823-9901', ownerName: 'Gopal Jena' },
  { tagNumber: 'OD-BLS-B-2024-0034', breed: 'Murrah Buffalo', animalType: 'Buffalo', age: 5, ownerAadhaar: '7822-3341-0012', ownerName: 'Sabitri Nayak' },
  { tagNumber: 'OD-BLS-C-2024-0056', breed: 'Jersey Cross', animalType: 'Cattle', age: 3, ownerAadhaar: '2201-9934-5567', ownerName: 'Ramesh Patel' },
  { tagNumber: 'OD-BLS-C-2024-0078', breed: 'Sahiwal', animalType: 'Cattle', age: 6, ownerAadhaar: '6634-1122-7788', ownerName: 'Sunita Das' },
  { tagNumber: 'OD-BLS-B-2024-0090', breed: 'Surti Buffalo', animalType: 'Buffalo', age: 4, ownerAadhaar: '3309-5544-2211', ownerName: 'Bijay Mohanty' },
];

// Available semen doses at AIT's LAC
export const availableDoses: SemenDose[] = [
  { code: 'SEM-HF-2024-0441', bullId: 'BULL-HF-001', breed: 'Holstein Friesian', animalType: 'Cattle', semenType: 'Normal', batchNumber: 'B-2024-112', stationNumber: 'FSB-BBSR-01', dampSeal: 'DS-441', dateOfCollection: '2024-10-15', available: true },
  { code: 'SEM-JRS-2024-0442', bullId: 'BULL-JRS-002', breed: 'Jersey', animalType: 'Cattle', semenType: 'Normal', batchNumber: 'B-2024-113', stationNumber: 'FSB-BBSR-01', dampSeal: 'DS-442', dateOfCollection: '2024-10-18', available: true },
  { code: 'SEM-MRH-2024-0443', bullId: 'BULL-MRH-003', breed: 'Murrah', animalType: 'Buffalo', semenType: 'Normal', batchNumber: 'B-2024-114', stationNumber: 'FSB-BBSR-01', dampSeal: 'DS-443', dateOfCollection: '2024-10-20', available: true },
  { code: 'SEM-HF-SS-2024-0444', bullId: 'BULL-HF-001', breed: 'Holstein Friesian', animalType: 'Cattle', semenType: 'Sex Sorted', batchNumber: 'B-2024-115', stationNumber: 'FSB-BBSR-01', dampSeal: 'DS-444', dateOfCollection: '2024-10-22', available: true },
  { code: 'SEM-SAH-2024-0445', bullId: 'BULL-SAH-004', breed: 'Sahiwal', animalType: 'Cattle', semenType: 'Normal', batchNumber: 'B-2024-116', stationNumber: 'FSB-BBSR-01', dampSeal: 'DS-445', dateOfCollection: '2024-10-25', available: true },
  { code: 'SEM-HF-2024-0446', bullId: 'BULL-HF-001', breed: 'Holstein Friesian', animalType: 'Cattle', semenType: 'Normal', batchNumber: 'B-2024-112', stationNumber: 'FSB-BBSR-01', dampSeal: 'DS-446', dateOfCollection: '2024-10-15', available: true },
  { code: 'SEM-JRS-2024-0447', bullId: 'BULL-JRS-002', breed: 'Jersey', animalType: 'Cattle', semenType: 'Normal', batchNumber: 'B-2024-113', stationNumber: 'FSB-BBSR-01', dampSeal: 'DS-447', dateOfCollection: '2024-10-18', available: true },
  { code: 'SEM-MRH-2024-0448', bullId: 'BULL-MRH-003', breed: 'Murrah', animalType: 'Buffalo', semenType: 'Normal', batchNumber: 'B-2024-114', stationNumber: 'FSB-BBSR-01', dampSeal: 'DS-448', dateOfCollection: '2024-10-20', available: true },
];

export const aitUtilisationHistory: AITUtilisationRecord[] = [
  {
    id: 'AIT-LOG-001',
    farmerName: 'Gopal Jena',
    farmerAadhaar: '4512-8823-9901',
    farmerMobile: '9437012098',
    animalTag: 'OD-BLS-C-2024-0012',
    animalBreed: 'HF Cross',
    bullId: 'BULL-HF-001',
    doseCode: 'SEM-HF-2024-0440',
    semenType: 'Normal',
    dateAdministered: '2026-05-20',
    batchNumber: 'B-2024-112',
    dampSeal: 'DS-440',
    stationNumber: 'FSB-BBSR-01',
    sourceOfDistribution: 'Remuna Block Store',
    aitName: 'Suresh Pradhan',
    lac: 'Remuna LAC-1',
    block: 'Remuna',
    district: 'Balasore',
    synced: true,
  },
  {
    id: 'AIT-LOG-002',
    farmerName: 'Sabitri Nayak',
    farmerAadhaar: '7822-3341-0012',
    farmerMobile: '9776244012',
    animalTag: 'OD-BLS-B-2024-0034',
    animalBreed: 'Murrah Buffalo',
    bullId: 'BULL-MRH-003',
    doseCode: 'SEM-MRH-2024-0439',
    semenType: 'Normal',
    dateAdministered: '2026-05-21',
    batchNumber: 'B-2024-114',
    dampSeal: 'DS-439',
    stationNumber: 'FSB-BBSR-01',
    sourceOfDistribution: 'Remuna Block Store',
    aitName: 'Suresh Pradhan',
    lac: 'Remuna LAC-1',
    block: 'Remuna',
    district: 'Balasore',
    synced: true,
  },
];

export const aitRestockRequests: AITRestockRequest[] = [
  {
    id: 'AIT-REQ-001',
    animalType: 'Cattle',
    semenType: 'Normal',
    quantity: 50,
    urgency: 'Urgent',
    status: 'Approved',
    submittedAt: '2026-05-18 09:00',
    approvedAt: '2026-05-18 14:30',
    approvedBy: 'Dr. Amit Behera (BVO)',
  },
  {
    id: 'AIT-REQ-002',
    animalType: 'Buffalo',
    semenType: 'Normal',
    quantity: 20,
    urgency: 'Not Urgent',
    status: 'Pending',
    submittedAt: '2026-05-21 11:00',
  },
];

export const farmerAIRequests: FarmerAIRequest[] = [
  {
    id: 'FAR-REQ-001',
    farmerName: 'Gopal Jena',
    animalType: 'Cattle',
    breed: 'HF Cross',
    location: 'Remuna Village, Balasore',
    preferredDate: '2026-05-24',
    preferredTime: '09:00',
    status: 'AIT Assigned',
    assignedAIT: 'Suresh Pradhan',
    submittedAt: '2026-05-22 08:30',
  },
  {
    id: 'FAR-REQ-002',
    farmerName: 'Bijay Mohanty',
    animalType: 'Buffalo',
    breed: 'Murrah',
    location: 'Jaleswar Village, Balasore',
    preferredDate: '2026-05-25',
    preferredTime: '11:00',
    status: 'Pending',
    submittedAt: '2026-05-22 10:15',
  },
];

export const sourceOfDistributionOptions = [
  'Remuna Block Store',
  'Basta Block Store',
  'Soro Block Store',
  'Nilgiri Block Store',
  'Jaleswar Block Store',
  'District Cold Chain Store',
  'FSB Direct',
];
