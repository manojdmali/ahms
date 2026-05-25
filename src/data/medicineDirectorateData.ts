// Module 3: Medicine Procurement & Distribution — Directorate & CDVO mock data

export type MedicineTone = 'green' | 'amber' | 'red';
export type MedicineUrgencyLevel = 'P0' | 'P1' | 'P2' | 'P3';

export interface DistrictMedicineStock {
  id: string;
  name: string;
  totalSkus: number;
  criticalSkus: number;
  amberSkus: number;
  healthySkus: number;
  lastUpdated: string;
  reporting: boolean;
  p0Requests: number;
}

export interface StateMedicineKPI {
  totalDistricts: number;
  criticalDistricts: number;
  p0Emergencies: number;
  stockOutOccurrences: number;
  avgFulfilmentDays: number;
}

export interface MedicineSKU {
  sku: string;
  category: 'Antibiotic' | 'Vaccine' | 'Antiparasitic' | 'Supplement' | 'Wound Care' | 'Deworming';
  centralStock: number;
  threshold: number;
  unit: string;
  barcode: string;
  lastReceived: string;
  lastUsed: string;
}

export interface MedicineAllocationRecord {
  id: string;
  district: string;
  sku: string;
  quantity: number;
  mode: 'numbers' | 'percent';
  pickupDate: string;
  pickupTime: string;
  status: 'Scheduled' | 'Picked Up' | 'Delivered';
  createdAt: string;
}

export interface MedicineRedistributionRecord {
  id: string;
  donorDistrict: string;
  recipientDistrict: string;
  sku: string;
  quantity: number;
  donorPickupDate: string;
  recipientPickupDate: string;
  status: 'Pending' | 'In Transit' | 'Completed';
  createdAt: string;
}

export interface DirectorateRequisition {
  id: string;
  district: string;
  block?: string;
  sku: string;
  quantity: number;
  urgency: MedicineUrgencyLevel;
  status: 'Pending' | 'Approved' | 'Rejected' | 'Procurement' | 'Fulfilled';
  submittedAt: string;
  approvedAt?: string;
  vendor?: string;
  notes?: string;
}

export interface MedicineUsageTrend {
  period: string;
  antibiotics: number;
  vaccines: number;
  antiparasitic: number;
  supplements: number;
}

export interface ARIMAForecast {
  week: string;
  actual: number | null;
  forecast: number | null;
  lower: number | null;
  upper: number | null;
}

export interface AnomalyAlert {
  id: string;
  lac: string;
  district: string;
  sku: string;
  quantity: number;
  window: string;
  avgNormal: number;
  severity: 'critical' | 'high' | 'medium';
  time: string;
}

// 30-district medicine stock overview
export const districtMedicineStocks: DistrictMedicineStock[] = [
  { id: 'KHD', name: 'Khordha',      totalSkus: 24, criticalSkus: 1, amberSkus: 3, healthySkus: 20, lastUpdated: '2h ago',  reporting: true,  p0Requests: 0 },
  { id: 'CTK', name: 'Cuttack',      totalSkus: 24, criticalSkus: 3, amberSkus: 4, healthySkus: 17, lastUpdated: '6h ago',  reporting: true,  p0Requests: 2 },
  { id: 'PRI', name: 'Puri',         totalSkus: 24, criticalSkus: 0, amberSkus: 2, healthySkus: 22, lastUpdated: '3h ago',  reporting: true,  p0Requests: 0 },
  { id: 'BLS', name: 'Balasore',     totalSkus: 24, criticalSkus: 2, amberSkus: 5, healthySkus: 17, lastUpdated: '1h ago',  reporting: true,  p0Requests: 1 },
  { id: 'BDK', name: 'Bhadrak',      totalSkus: 24, criticalSkus: 0, amberSkus: 1, healthySkus: 23, lastUpdated: '4h ago',  reporting: true,  p0Requests: 0 },
  { id: 'JJP', name: 'Jajapur',      totalSkus: 24, criticalSkus: 4, amberSkus: 6, healthySkus: 14, lastUpdated: '8h ago',  reporting: false, p0Requests: 3 },
  { id: 'KNJ', name: 'Kendrapara',   totalSkus: 24, criticalSkus: 1, amberSkus: 2, healthySkus: 21, lastUpdated: '2h ago',  reporting: true,  p0Requests: 0 },
  { id: 'JGS', name: 'Jagatsinghpur',totalSkus: 24, criticalSkus: 0, amberSkus: 3, healthySkus: 21, lastUpdated: '5h ago',  reporting: true,  p0Requests: 0 },
  { id: 'GNJ', name: 'Ganjam',       totalSkus: 24, criticalSkus: 5, amberSkus: 7, healthySkus: 12, lastUpdated: '2h ago',  reporting: true,  p0Requests: 4 },
  { id: 'GJP', name: 'Gajapati',     totalSkus: 24, criticalSkus: 6, amberSkus: 4, healthySkus: 14, lastUpdated: '12h ago', reporting: false, p0Requests: 2 },
  { id: 'KLH', name: 'Kalahandi',    totalSkus: 24, criticalSkus: 2, amberSkus: 3, healthySkus: 19, lastUpdated: '3h ago',  reporting: true,  p0Requests: 1 },
  { id: 'NWR', name: 'Nuapada',      totalSkus: 24, criticalSkus: 3, amberSkus: 5, healthySkus: 16, lastUpdated: '9h ago',  reporting: false, p0Requests: 2 },
  { id: 'BRG', name: 'Bargarh',      totalSkus: 24, criticalSkus: 0, amberSkus: 2, healthySkus: 22, lastUpdated: '2h ago',  reporting: true,  p0Requests: 0 },
  { id: 'SBP', name: 'Sambalpur',    totalSkus: 24, criticalSkus: 1, amberSkus: 4, healthySkus: 19, lastUpdated: '1h ago',  reporting: true,  p0Requests: 0 },
  { id: 'DWR', name: 'Deogarh',      totalSkus: 24, criticalSkus: 4, amberSkus: 3, healthySkus: 17, lastUpdated: '14h ago', reporting: false, p0Requests: 1 },
  { id: 'SND', name: 'Sundargarh',   totalSkus: 24, criticalSkus: 0, amberSkus: 1, healthySkus: 23, lastUpdated: '2h ago',  reporting: true,  p0Requests: 0 },
  { id: 'KBJ', name: 'Keonjhar',     totalSkus: 24, criticalSkus: 1, amberSkus: 2, healthySkus: 21, lastUpdated: '3h ago',  reporting: true,  p0Requests: 0 },
  { id: 'MYB', name: 'Mayurbhanj',   totalSkus: 24, criticalSkus: 2, amberSkus: 4, healthySkus: 18, lastUpdated: '2h ago',  reporting: true,  p0Requests: 1 },
  { id: 'ANL', name: 'Angul',        totalSkus: 24, criticalSkus: 0, amberSkus: 2, healthySkus: 22, lastUpdated: '4h ago',  reporting: true,  p0Requests: 0 },
  { id: 'DBG', name: 'Dhenkanal',    totalSkus: 24, criticalSkus: 1, amberSkus: 3, healthySkus: 20, lastUpdated: '5h ago',  reporting: true,  p0Requests: 0 },
  { id: 'BLP', name: 'Bolangir',     totalSkus: 24, criticalSkus: 2, amberSkus: 4, healthySkus: 18, lastUpdated: '3h ago',  reporting: true,  p0Requests: 1 },
  { id: 'SBR', name: 'Subarnapur',   totalSkus: 24, criticalSkus: 0, amberSkus: 1, healthySkus: 23, lastUpdated: '6h ago',  reporting: true,  p0Requests: 0 },
  { id: 'KPT', name: 'Kandhamal',    totalSkus: 24, criticalSkus: 3, amberSkus: 5, healthySkus: 16, lastUpdated: '10h ago', reporting: false, p0Requests: 2 },
  { id: 'BPT', name: 'Boudh',        totalSkus: 24, criticalSkus: 1, amberSkus: 2, healthySkus: 21, lastUpdated: '8h ago',  reporting: true,  p0Requests: 0 },
  { id: 'NBS', name: 'Nayagarh',     totalSkus: 24, criticalSkus: 0, amberSkus: 2, healthySkus: 22, lastUpdated: '4h ago',  reporting: true,  p0Requests: 0 },
  { id: 'KPR', name: 'Koraput',      totalSkus: 24, criticalSkus: 4, amberSkus: 6, healthySkus: 14, lastUpdated: '5h ago',  reporting: true,  p0Requests: 3 },
  { id: 'NWG', name: 'Nabarangpur',  totalSkus: 24, criticalSkus: 3, amberSkus: 4, healthySkus: 17, lastUpdated: '11h ago', reporting: false, p0Requests: 2 },
  { id: 'RYG', name: 'Rayagada',     totalSkus: 24, criticalSkus: 2, amberSkus: 3, healthySkus: 19, lastUpdated: '6h ago',  reporting: true,  p0Requests: 1 },
  { id: 'MLK', name: 'Malkangiri',   totalSkus: 24, criticalSkus: 5, amberSkus: 5, healthySkus: 14, lastUpdated: '13h ago', reporting: false, p0Requests: 3 },
  { id: 'JHR', name: 'Jharsuguda',   totalSkus: 24, criticalSkus: 0, amberSkus: 1, healthySkus: 23, lastUpdated: '3h ago',  reporting: true,  p0Requests: 0 },
];

// Central store SKUs
export const centralMedicineSKUs: MedicineSKU[] = [
  { sku: 'Amoxicillin 500mg',    category: 'Antibiotic',    centralStock: 48000, threshold: 10000, unit: 'Tablets',  barcode: 'MED-AMX-1001', lastReceived: '2026-05-10', lastUsed: '2026-05-22' },
  { sku: 'Oxytetracycline',      category: 'Antibiotic',    centralStock: 32000, threshold: 8000,  unit: 'Vials',    barcode: 'MED-OTC-1002', lastReceived: '2026-05-12', lastUsed: '2026-05-22' },
  { sku: 'FMD Vaccine',          category: 'Vaccine',       centralStock: 12000, threshold: 5000,  unit: 'Doses',    barcode: 'MED-FMD-1003', lastReceived: '2026-05-08', lastUsed: '2026-05-22' },
  { sku: 'HS Vaccine',           category: 'Vaccine',       centralStock: 18000, threshold: 6000,  unit: 'Doses',    barcode: 'MED-HSV-1004', lastReceived: '2026-05-14', lastUsed: '2026-05-21' },
  { sku: 'BQ Vaccine',           category: 'Vaccine',       centralStock: 9500,  threshold: 4000,  unit: 'Doses',    barcode: 'MED-BQV-1005', lastReceived: '2026-05-11', lastUsed: '2026-05-20' },
  { sku: 'Ivermectin Injection', category: 'Antiparasitic', centralStock: 22000, threshold: 7000,  unit: 'Vials',    barcode: 'MED-IVM-1006', lastReceived: '2026-05-15', lastUsed: '2026-05-22' },
  { sku: 'Dewormer Bolus',       category: 'Deworming',     centralStock: 55000, threshold: 12000, unit: 'Bolus',    barcode: 'MED-DWB-1007', lastReceived: '2026-05-16', lastUsed: '2026-05-22' },
  { sku: 'Calcium Gel',          category: 'Supplement',    centralStock: 14000, threshold: 4000,  unit: 'Tubes',    barcode: 'MED-CAL-1008', lastReceived: '2026-05-09', lastUsed: '2026-05-22' },
  { sku: 'Antiseptic Spray',     category: 'Wound Care',    centralStock: 3200,  threshold: 2000,  unit: 'Bottles',  barcode: 'MED-ASP-1009', lastReceived: '2026-05-05', lastUsed: '2026-05-22' },
  { sku: 'Vitamin AD3E',         category: 'Supplement',    centralStock: 28000, threshold: 8000,  unit: 'Vials',    barcode: 'MED-VIT-1010', lastReceived: '2026-05-17', lastUsed: '2026-05-21' },
];

// Directorate requisition list
export const directorateRequisitions: DirectorateRequisition[] = [
  { id: 'DR-001', district: 'Ganjam',      sku: 'FMD Vaccine',          quantity: 5000, urgency: 'P0', status: 'Pending',    submittedAt: '2026-05-22 07:30' },
  { id: 'DR-002', district: 'Koraput',     sku: 'Amoxicillin 500mg',    quantity: 8000, urgency: 'P0', status: 'Pending',    submittedAt: '2026-05-22 08:00' },
  { id: 'DR-003', district: 'Malkangiri',  sku: 'Ivermectin Injection', quantity: 3000, urgency: 'P0', status: 'Approved',   submittedAt: '2026-05-21 14:00', approvedAt: '2026-05-21 16:30' },
  { id: 'DR-004', district: 'Cuttack',     sku: 'HS Vaccine',           quantity: 4000, urgency: 'P1', status: 'Pending',    submittedAt: '2026-05-21 10:00' },
  { id: 'DR-005', district: 'Jajapur',     sku: 'Dewormer Bolus',       quantity: 6000, urgency: 'P1', status: 'Procurement',submittedAt: '2026-05-20 09:00', vendor: 'Odisha Pharma Ltd' },
  { id: 'DR-006', district: 'Gajapati',    sku: 'Antiseptic Spray',     quantity: 1200, urgency: 'P1', status: 'Pending',    submittedAt: '2026-05-20 11:00' },
  { id: 'DR-007', district: 'Nuapada',     sku: 'Calcium Gel',          quantity: 2000, urgency: 'P2', status: 'Approved',   submittedAt: '2026-05-19 15:00', approvedAt: '2026-05-20 09:00' },
  { id: 'DR-008', district: 'Kandhamal',   sku: 'BQ Vaccine',           quantity: 3500, urgency: 'P2', status: 'Fulfilled',  submittedAt: '2026-05-18 10:00', approvedAt: '2026-05-18 14:00' },
  { id: 'DR-009', district: 'Nabarangpur', sku: 'Oxytetracycline',      quantity: 4000, urgency: 'P2', status: 'Pending',    submittedAt: '2026-05-19 08:00' },
  { id: 'DR-010', district: 'Deogarh',     sku: 'Vitamin AD3E',         quantity: 2500, urgency: 'P3', status: 'Pending',    submittedAt: '2026-05-17 12:00' },
];

// Medicine usage trends (weekly)
export const medicineUsageTrends: MedicineUsageTrend[] = [
  { period: 'Week 1 Jan', antibiotics: 4200, vaccines: 8100, antiparasitic: 3100, supplements: 2800 },
  { period: 'Week 2 Jan', antibiotics: 4500, vaccines: 7800, antiparasitic: 3300, supplements: 2900 },
  { period: 'Week 3 Jan', antibiotics: 4100, vaccines: 8400, antiparasitic: 3000, supplements: 3100 },
  { period: 'Week 4 Jan', antibiotics: 4800, vaccines: 9200, antiparasitic: 3500, supplements: 3200 },
  { period: 'Week 1 Feb', antibiotics: 5100, vaccines: 9800, antiparasitic: 3800, supplements: 3400 },
  { period: 'Week 2 Feb', antibiotics: 4900, vaccines: 10200, antiparasitic: 3600, supplements: 3300 },
  { period: 'Week 3 Feb', antibiotics: 5300, vaccines: 10800, antiparasitic: 4000, supplements: 3600 },
  { period: 'Week 4 Feb', antibiotics: 5600, vaccines: 11400, antiparasitic: 4200, supplements: 3800 },
  { period: 'Week 1 Mar', antibiotics: 5200, vaccines: 10600, antiparasitic: 3900, supplements: 3500 },
  { period: 'Week 2 Mar', antibiotics: 5800, vaccines: 12000, antiparasitic: 4400, supplements: 4000 },
  { period: 'Week 3 Mar', antibiotics: 6100, vaccines: 12800, antiparasitic: 4600, supplements: 4200 },
  { period: 'Week 4 Mar', antibiotics: 5900, vaccines: 12200, antiparasitic: 4300, supplements: 4100 },
];

// ARIMA forecast for Amoxicillin in Ganjam
export const arimaForecastGanjam: ARIMAForecast[] = [
  { week: 'W1 Mar', actual: 420, forecast: null, lower: null, upper: null },
  { week: 'W2 Mar', actual: 445, forecast: null, lower: null, upper: null },
  { week: 'W3 Mar', actual: 480, forecast: null, lower: null, upper: null },
  { week: 'W4 Mar', actual: 510, forecast: null, lower: null, upper: null },
  { week: 'W1 Apr', actual: 490, forecast: null, lower: null, upper: null },
  { week: 'W2 Apr', actual: 520, forecast: null, lower: null, upper: null },
  { week: 'W3 Apr', actual: 560, forecast: null, lower: null, upper: null },
  { week: 'W4 Apr', actual: 590, forecast: null, lower: null, upper: null },
  { week: 'W1 May', actual: 610, forecast: null, lower: null, upper: null },
  { week: 'W2 May', actual: 640, forecast: null, lower: null, upper: null },
  { week: 'W3 May', actual: null, forecast: 680, lower: 620, upper: 740 },
  { week: 'W4 May', actual: null, forecast: 720, lower: 650, upper: 790 },
  { week: 'W1 Jun', actual: null, forecast: 890, lower: 800, upper: 980 },
  { week: 'W2 Jun', actual: null, forecast: 1050, lower: 940, upper: 1160 },
  { week: 'W3 Jun', actual: null, forecast: 1180, lower: 1050, upper: 1310 },
];

// Medicine anomaly alerts
export const medicineAnomalyAlerts: AnomalyAlert[] = [
  { id: 'MA-001', lac: 'LAC Puri-7',          district: 'Puri',     sku: 'Ivermectin Injection', quantity: 400, window: '24 hours', avgNormal: 133, severity: 'critical', time: '08:45 AM' },
  { id: 'MA-002', lac: 'LAC Cuttack-3',       district: 'Cuttack',  sku: 'Amoxicillin 500mg',    quantity: 280, window: '6 hours',  avgNormal: 80,  severity: 'high',     time: '11:20 AM' },
  { id: 'MA-003', lac: 'LAC Ganjam-12',       district: 'Ganjam',   sku: 'FMD Vaccine',          quantity: 150, window: '3 hours',  avgNormal: 60,  severity: 'medium',   time: 'Yesterday' },
];

// Empanelled vendors
export const empanelledVendors = [
  'Odisha Pharma Ltd',
  'Bharat Biotech Odisha',
  'Hester Biosciences',
  'Indian Immunologicals Ltd',
  'Intervet India Pvt Ltd',
  'Virbac Animal Health',
  'Zoetis India Ltd',
];
