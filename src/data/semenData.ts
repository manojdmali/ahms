export interface DistrictSemen {
  id: string;
  name: string;
  stock: number;
  allocated: number;
  used: number;
  target: number;
  daysToStockout: number | null;
  lastUpdated: string;
  reporting: boolean;
  blocks: number;
  lacs: number;
}

export const odishaDistricts: DistrictSemen[] = [
  { id: 'KHD', name: 'Khordha',     stock: 1240, allocated: 1500, used: 980,  target: 1200, daysToStockout: 38,  lastUpdated: '2h ago',  reporting: true,  blocks: 10, lacs: 42 },
  { id: 'CTK', name: 'Cuttack',     stock: 180,  allocated: 1200, used: 1020, target: 1100, daysToStockout: 9,   lastUpdated: '6h ago',  reporting: true,  blocks: 14, lacs: 58 },
  { id: 'PRI', name: 'Puri',        stock: 620,  allocated: 900,  used: 710,  target: 850,  daysToStockout: 26,  lastUpdated: '3h ago',  reporting: true,  blocks: 11, lacs: 44 },
  { id: 'BLS', name: 'Balasore',    stock: 1850, allocated: 1100, used: 640,  target: 900,  daysToStockout: null,lastUpdated: '1h ago',  reporting: true,  blocks: 12, lacs: 50 },
  { id: 'BDK', name: 'Bhadrak',     stock: 420,  allocated: 700,  used: 580,  target: 650,  daysToStockout: 21,  lastUpdated: '4h ago',  reporting: true,  blocks: 7,  lacs: 30 },
  { id: 'JJP', name: 'Jajapur',     stock: 310,  allocated: 800,  used: 690,  target: 750,  daysToStockout: 13,  lastUpdated: '8h ago',  reporting: false, blocks: 10, lacs: 40 },
  { id: 'KNJ', name: 'Kendrapara',  stock: 540,  allocated: 650,  used: 490,  target: 600,  daysToStockout: 33,  lastUpdated: '2h ago',  reporting: true,  blocks: 9,  lacs: 36 },
  { id: 'JGS', name: 'Jagatsinghpur',stock:290,  allocated: 550,  used: 460,  target: 500,  daysToStockout: 19,  lastUpdated: '5h ago',  reporting: true,  blocks: 8,  lacs: 32 },
  { id: 'GNJ', name: 'Ganjam',      stock: 980,  allocated: 1400, used: 1100, target: 1300, daysToStockout: 27,  lastUpdated: '2h ago',  reporting: true,  blocks: 22, lacs: 88 },
  { id: 'GJP', name: 'Gajapati',    stock: 140,  allocated: 350,  used: 310,  target: 320,  daysToStockout: 7,   lastUpdated: '12h ago', reporting: false, blocks: 7,  lacs: 28 },
  { id: 'KLH', name: 'Kalahandi',   stock: 460,  allocated: 600,  used: 480,  target: 560,  daysToStockout: 29,  lastUpdated: '3h ago',  reporting: true,  blocks: 13, lacs: 52 },
  { id: 'NWR', name: 'Nuapada',     stock: 220,  allocated: 300,  used: 270,  target: 280,  daysToStockout: 12,  lastUpdated: '9h ago',  reporting: false, blocks: 5,  lacs: 20 },
  { id: 'BRG', name: 'Bargarh',     stock: 680,  allocated: 750,  used: 590,  target: 700,  daysToStockout: 35,  lastUpdated: '2h ago',  reporting: true,  blocks: 12, lacs: 48 },
  { id: 'SBP', name: 'Sambalpur',   stock: 750,  allocated: 900,  used: 720,  target: 850,  daysToStockout: 31,  lastUpdated: '1h ago',  reporting: true,  blocks: 9,  lacs: 36 },
  { id: 'DWR', name: 'Deogarh',     stock: 160,  allocated: 250,  used: 220,  target: 230,  daysToStockout: 11,  lastUpdated: '14h ago', reporting: false, blocks: 3,  lacs: 12 },
  { id: 'SND', name: 'Sundargarh',  stock: 890,  allocated: 1000, used: 810,  target: 950,  daysToStockout: 33,  lastUpdated: '2h ago',  reporting: true,  blocks: 17, lacs: 68 },
  { id: 'KBJ', name: 'Keonjhar',    stock: 570,  allocated: 700,  used: 560,  target: 660,  daysToStockout: 30,  lastUpdated: '3h ago',  reporting: true,  blocks: 13, lacs: 52 },
  { id: 'MYB', name: 'Mayurbhanj',  stock: 1100, allocated: 1300, used: 1050, target: 1200, daysToStockout: 32,  lastUpdated: '2h ago',  reporting: true,  blocks: 26, lacs: 104 },
  { id: 'ANL', name: 'Angul',       stock: 490,  allocated: 600,  used: 480,  target: 560,  daysToStockout: 30,  lastUpdated: '4h ago',  reporting: true,  blocks: 8,  lacs: 32 },
  { id: 'DBG', name: 'Dhenkanal',   stock: 380,  allocated: 500,  used: 400,  target: 470,  daysToStockout: 28,  lastUpdated: '5h ago',  reporting: true,  blocks: 8,  lacs: 32 },
  { id: 'BLP', name: 'Bolangir',    stock: 520,  allocated: 650,  used: 520,  target: 610,  daysToStockout: 30,  lastUpdated: '3h ago',  reporting: true,  blocks: 14, lacs: 56 },
  { id: 'SBR', name: 'Subarnapur',  stock: 240,  allocated: 320,  used: 260,  target: 300,  daysToStockout: 28,  lastUpdated: '6h ago',  reporting: true,  blocks: 6,  lacs: 24 },
  { id: 'KPT', name: 'Kandhamal',   stock: 190,  allocated: 280,  used: 240,  target: 260,  daysToStockout: 12,  lastUpdated: '10h ago', reporting: false, blocks: 12, lacs: 48 },
  { id: 'BPT', name: 'Boudh',       stock: 170,  allocated: 240,  used: 200,  target: 220,  daysToStockout: 13,  lastUpdated: '8h ago',  reporting: true,  blocks: 3,  lacs: 12 },
  { id: 'NBS', name: 'Nayagarh',    stock: 350,  allocated: 450,  used: 360,  target: 420,  daysToStockout: 29,  lastUpdated: '4h ago',  reporting: true,  blocks: 11, lacs: 44 },
  { id: 'KPR', name: 'Koraput',     stock: 310,  allocated: 420,  used: 340,  target: 390,  daysToStockout: 27,  lastUpdated: '5h ago',  reporting: true,  blocks: 14, lacs: 56 },
  { id: 'NWG', name: 'Nabarangpur', stock: 200,  allocated: 300,  used: 250,  target: 280,  daysToStockout: 12,  lastUpdated: '11h ago', reporting: false, blocks: 10, lacs: 40 },
  { id: 'RYG', name: 'Rayagada',    stock: 260,  allocated: 380,  used: 310,  target: 350,  daysToStockout: 25,  lastUpdated: '6h ago',  reporting: true,  blocks: 11, lacs: 44 },
  { id: 'MLK', name: 'Malkangiri',  stock: 130,  allocated: 220,  used: 190,  target: 200,  daysToStockout: 10,  lastUpdated: '13h ago', reporting: false, blocks: 7,  lacs: 28 },
  { id: 'JHR', name: 'Jharsuguda',  stock: 310,  allocated: 380,  used: 300,  target: 350,  daysToStockout: 31,  lastUpdated: '3h ago',  reporting: true,  blocks: 4,  lacs: 16 },
];

export const forecastData = [
  { month: 'Jan', actual: 18400, forecast: null },
  { month: 'Feb', actual: 19200, forecast: null },
  { month: 'Mar', actual: 21000, forecast: null },
  { month: 'Apr', actual: 20100, forecast: null },
  { month: 'May', actual: 22300, forecast: null },
  { month: 'Jun', actual: 21800, forecast: null },
  { month: 'Jul', actual: 23400, forecast: null },
  { month: 'Aug', actual: 24100, forecast: null },
  { month: 'Sep', actual: 22900, forecast: null },
  { month: 'Oct', actual: 23600, forecast: null },
  { month: 'Nov', actual: 24800, forecast: null },
  { month: 'Dec', actual: 25200, forecast: null },
  { month: 'Jan\'25', actual: null, forecast: 26100 },
  { month: 'Feb\'25', actual: null, forecast: 27400 },
  { month: 'Mar\'25', actual: null, forecast: 29800 },
];

export const restockRequests = [
  { id: 'RR-001', district: 'Cuttack',     type: 'Normal',     animal: 'Cattle',  qty: 500, urgency: 'critical', submitted: '2024-12-01', status: 'pending' },
  { id: 'RR-002', district: 'Gajapati',    type: 'Normal',     animal: 'Buffalo', qty: 200, urgency: 'critical', submitted: '2024-12-02', status: 'pending' },
  { id: 'RR-003', district: 'Malkangiri',  type: 'Normal',     animal: 'Cattle',  qty: 150, urgency: 'high',     submitted: '2024-12-02', status: 'pending' },
  { id: 'RR-004', district: 'Jajapur',     type: 'Sex Sorted', animal: 'Cattle',  qty: 300, urgency: 'high',     submitted: '2024-12-03', status: 'approved' },
  { id: 'RR-005', district: 'Nuapada',     type: 'Normal',     animal: 'Cattle',  qty: 180, urgency: 'medium',   submitted: '2024-12-03', status: 'pending' },
  { id: 'RR-006', district: 'Deogarh',     type: 'Normal',     animal: 'Buffalo', qty: 120, urgency: 'medium',   submitted: '2024-12-04', status: 'approved' },
  { id: 'RR-007', district: 'Kandhamal',   type: 'Sex Sorted', animal: 'Cattle',  qty: 250, urgency: 'medium',   submitted: '2024-12-04', status: 'pending' },
  { id: 'RR-008', district: 'Nabarangpur', type: 'Normal',     animal: 'Cattle',  qty: 200, urgency: 'low',      submitted: '2024-12-05', status: 'fulfilled' },
];

export const anomalyAlerts = [
  { id: 'A1', lac: 'LAC Bhubaneswar-3', district: 'Khordha',  doses: 47, window: '2 hours',  severity: 'critical', time: '10:32 AM' },
  { id: 'A2', lac: 'LAC Cuttack-7',     district: 'Cuttack',  doses: 31, window: '90 min',   severity: 'high',     time: '09:15 AM' },
  { id: 'A3', lac: 'LAC Puri-2',        district: 'Puri',     doses: 22, window: '3 hours',  severity: 'medium',   time: 'Yesterday' },
];
