export type StockTone = 'green' | 'amber' | 'red';
export type MedicineUrgency = 'P0' | 'P1' | 'P2' | 'P3';

export interface MedicineStockItem {
  sku: string;
  category: string;
  stock: number;
  threshold: number;
  lastReceived: string;
  lastUsed: string;
  barcode: string;
}

export interface FarmerMedicineProfile {
  name: string;
  aadhaar: string;
  mobile: string;
  animal: string;
  history: Array<{ medicine: string; quantity: number; date: string; lac: string }>;
}

export interface MedicineRequisition {
  id: string;
  source: string;
  medicine: string;
  quantity: number;
  urgency: MedicineUrgency;
  status: 'Pending' | 'Approved' | 'Fulfilled';
  submittedAt: string;
}

export interface MVUUnit {
  id: string;
  district: string;
  status: 'On tour' | 'Delayed' | 'Not on tour' | 'Understaffed';
  villagesPlanned: number;
  villagesVisited: number;
  treatments: number;
  vaccinations: number;
  ai: number;
  camps: number;
  staffPresent: number;
  staffSanctioned: number;
  distanceKm: number;
  idleHours: number;
  driverScore: number;
}

export const medicineStock: MedicineStockItem[] = [
  { sku: 'Oxytetracycline', category: 'Antibiotic', stock: 62, threshold: 30, lastReceived: '2026-05-19', lastUsed: '2026-05-22', barcode: 'MED-OTC-2241' },
  { sku: 'FMD Vaccine', category: 'Vaccine', stock: 18, threshold: 35, lastReceived: '2026-05-18', lastUsed: '2026-05-22', barcode: 'MED-FMD-7788' },
  { sku: 'Dewormer Bolus', category: 'Deworming', stock: 145, threshold: 50, lastReceived: '2026-05-20', lastUsed: '2026-05-21', barcode: 'MED-DWB-3309' },
  { sku: 'Calcium Gel', category: 'Supplement', stock: 29, threshold: 25, lastReceived: '2026-05-16', lastUsed: '2026-05-22', barcode: 'MED-CAL-1120' },
  { sku: 'Antiseptic Spray', category: 'Wound Care', stock: 9, threshold: 20, lastReceived: '2026-05-10', lastUsed: '2026-05-22', barcode: 'MED-ASP-4401' },
];

export const farmerMedicineProfiles: FarmerMedicineProfile[] = [
  {
    name: 'Gopal Jena',
    aadhaar: 'XXXX-XXXX-4512',
    mobile: '94370 12098',
    animal: 'Cow',
    history: [
      { medicine: 'FMD Vaccine', quantity: 1, date: '2026-05-08', lac: 'Balasore LAC-2' },
      { medicine: 'Calcium Gel', quantity: 2, date: '2026-04-24', lac: 'Balasore LAC-2' },
    ],
  },
  {
    name: 'Sabitri Nayak',
    aadhaar: 'XXXX-XXXX-7822',
    mobile: '97762 44012',
    animal: 'Buffalo',
    history: [
      { medicine: 'Dewormer Bolus', quantity: 3, date: '2026-05-11', lac: 'Balasore LAC-1' },
    ],
  },
];

export const initialMedicineRequisitions: MedicineRequisition[] = [
  { id: 'REQ-104', source: 'Balasore LAC-2', medicine: 'FMD Vaccine', quantity: 100, urgency: 'P1', status: 'Pending', submittedAt: '2026-05-21 15:20' },
  { id: 'REQ-105', source: 'MVU-14 Sambalpur', medicine: 'Antiseptic Spray', quantity: 60, urgency: 'P2', status: 'Pending', submittedAt: '2026-05-22 09:10' },
];

export const mvuUnits: MVUUnit[] = [
  { id: 'MVU-07', district: 'Ganjam', status: 'Understaffed', villagesPlanned: 24, villagesVisited: 15, treatments: 210, vaccinations: 340, ai: 46, camps: 5, staffPresent: 2, staffSanctioned: 4, distanceKm: 482, idleHours: 9.2, driverScore: 71 },
  { id: 'MVU-12', district: 'Koraput', status: 'On tour', villagesPlanned: 26, villagesVisited: 22, treatments: 188, vaccinations: 276, ai: 39, camps: 7, staffPresent: 4, staffSanctioned: 4, distanceKm: 526, idleHours: 2.1, driverScore: 89 },
  { id: 'MVU-05', district: 'Cuttack', status: 'Delayed', villagesPlanned: 20, villagesVisited: 14, treatments: 156, vaccinations: 204, ai: 31, camps: 3, staffPresent: 3, staffSanctioned: 4, distanceKm: 318, idleHours: 6.8, driverScore: 76 },
  { id: 'MVU-22', district: 'Malkangiri', status: 'Not on tour', villagesPlanned: 18, villagesVisited: 8, treatments: 90, vaccinations: 132, ai: 18, camps: 2, staffPresent: 1, staffSanctioned: 4, distanceKm: 174, idleHours: 13.4, driverScore: 64 },
  { id: 'MVU-31', district: 'Balasore', status: 'On tour', villagesPlanned: 28, villagesVisited: 25, treatments: 244, vaccinations: 362, ai: 52, camps: 8, staffPresent: 4, staffSanctioned: 4, distanceKm: 612, idleHours: 1.7, driverScore: 92 },
];
