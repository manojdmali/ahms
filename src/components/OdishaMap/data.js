// ─────────────────────────────────────────────────────────────────────────────
// data.js  –  All district data, alerts, restock requests, and helper utils
// ─────────────────────────────────────────────────────────────────────────────

export const odishaDistricts = [
  { id:'KHD', name:'Khordha',       stock:1240, allocated:1500, used:980,  target:1200, daysToStockout:38,  lastUpdated:'2h ago',  reporting:true,  blocks:10, lacs:42  },
  { id:'CTK', name:'Cuttack',       stock:180,  allocated:1200, used:1020, target:1100, daysToStockout:9,   lastUpdated:'6h ago',  reporting:true,  blocks:14, lacs:58  },
  { id:'PRI', name:'Puri',          stock:620,  allocated:900,  used:710,  target:850,  daysToStockout:26,  lastUpdated:'3h ago',  reporting:true,  blocks:11, lacs:44  },
  { id:'BLS', name:'Balasore',      stock:1850, allocated:1100, used:640,  target:900,  daysToStockout:null,lastUpdated:'1h ago',  reporting:true,  blocks:12, lacs:50  },
  { id:'BDK', name:'Bhadrak',       stock:420,  allocated:700,  used:580,  target:650,  daysToStockout:21,  lastUpdated:'4h ago',  reporting:true,  blocks:7,  lacs:30  },
  { id:'JJP', name:'Jajapur',       stock:310,  allocated:800,  used:690,  target:750,  daysToStockout:13,  lastUpdated:'8h ago',  reporting:false, blocks:10, lacs:40  },
  { id:'KNJ', name:'Kendrapara',    stock:540,  allocated:650,  used:490,  target:600,  daysToStockout:33,  lastUpdated:'2h ago',  reporting:true,  blocks:9,  lacs:36  },
  { id:'JGS', name:'Jagatsinghpur', stock:290,  allocated:550,  used:460,  target:500,  daysToStockout:19,  lastUpdated:'5h ago',  reporting:true,  blocks:8,  lacs:32  },
  { id:'GNJ', name:'Ganjam',        stock:980,  allocated:1400, used:1100, target:1300, daysToStockout:27,  lastUpdated:'2h ago',  reporting:true,  blocks:22, lacs:88  },
  { id:'GJP', name:'Gajapati',      stock:140,  allocated:350,  used:310,  target:320,  daysToStockout:7,   lastUpdated:'12h ago', reporting:false, blocks:7,  lacs:28  },
  { id:'KLH', name:'Kalahandi',     stock:460,  allocated:600,  used:480,  target:560,  daysToStockout:29,  lastUpdated:'3h ago',  reporting:true,  blocks:13, lacs:52  },
  { id:'NWR', name:'Nuapada',       stock:220,  allocated:300,  used:270,  target:280,  daysToStockout:12,  lastUpdated:'9h ago',  reporting:false, blocks:5,  lacs:20  },
  { id:'BRG', name:'Bargarh',       stock:680,  allocated:750,  used:590,  target:700,  daysToStockout:35,  lastUpdated:'2h ago',  reporting:true,  blocks:12, lacs:48  },
  { id:'SBP', name:'Sambalpur',     stock:750,  allocated:900,  used:720,  target:850,  daysToStockout:31,  lastUpdated:'1h ago',  reporting:true,  blocks:9,  lacs:36  },
  { id:'DWR', name:'Deogarh',       stock:160,  allocated:250,  used:220,  target:230,  daysToStockout:11,  lastUpdated:'14h ago', reporting:false, blocks:3,  lacs:12  },
  { id:'SND', name:'Sundargarh',    stock:890,  allocated:1000, used:810,  target:950,  daysToStockout:33,  lastUpdated:'2h ago',  reporting:true,  blocks:17, lacs:68  },
  { id:'KBJ', name:'Keonjhar',      stock:570,  allocated:700,  used:560,  target:660,  daysToStockout:30,  lastUpdated:'3h ago',  reporting:true,  blocks:13, lacs:52  },
  { id:'MYB', name:'Mayurbhanj',    stock:1100, allocated:1300, used:1050, target:1200, daysToStockout:32,  lastUpdated:'2h ago',  reporting:true,  blocks:26, lacs:104 },
  { id:'ANL', name:'Angul',         stock:490,  allocated:600,  used:480,  target:560,  daysToStockout:30,  lastUpdated:'4h ago',  reporting:true,  blocks:8,  lacs:32  },
  { id:'DBG', name:'Dhenkanal',     stock:380,  allocated:500,  used:400,  target:470,  daysToStockout:28,  lastUpdated:'5h ago',  reporting:true,  blocks:8,  lacs:32  },
  { id:'BLP', name:'Bolangir',      stock:520,  allocated:650,  used:520,  target:610,  daysToStockout:30,  lastUpdated:'3h ago',  reporting:true,  blocks:14, lacs:56  },
  { id:'SBR', name:'Subarnapur',    stock:240,  allocated:320,  used:260,  target:300,  daysToStockout:28,  lastUpdated:'6h ago',  reporting:true,  blocks:6,  lacs:24  },
  { id:'KPT', name:'Kandhamal',     stock:190,  allocated:280,  used:240,  target:260,  daysToStockout:12,  lastUpdated:'10h ago', reporting:false, blocks:12, lacs:48  },
  { id:'BPT', name:'Boudh',         stock:170,  allocated:240,  used:200,  target:220,  daysToStockout:13,  lastUpdated:'8h ago',  reporting:true,  blocks:3,  lacs:12  },
  { id:'NBS', name:'Nayagarh',      stock:350,  allocated:450,  used:360,  target:420,  daysToStockout:29,  lastUpdated:'4h ago',  reporting:true,  blocks:11, lacs:44  },
  { id:'KPR', name:'Koraput',       stock:310,  allocated:420,  used:340,  target:390,  daysToStockout:27,  lastUpdated:'5h ago',  reporting:true,  blocks:14, lacs:56  },
  { id:'NWG', name:'Nabarangpur',   stock:200,  allocated:300,  used:250,  target:280,  daysToStockout:12,  lastUpdated:'11h ago', reporting:false, blocks:10, lacs:40  },
  { id:'RYG', name:'Rayagada',      stock:260,  allocated:380,  used:310,  target:350,  daysToStockout:25,  lastUpdated:'6h ago',  reporting:true,  blocks:11, lacs:44  },
  { id:'MLK', name:'Malkangiri',    stock:130,  allocated:220,  used:190,  target:200,  daysToStockout:10,  lastUpdated:'13h ago', reporting:false, blocks:7,  lacs:28  },
  { id:'JHR', name:'Jharsuguda',    stock:310,  allocated:380,  used:300,  target:350,  daysToStockout:31,  lastUpdated:'3h ago',  reporting:true,  blocks:4,  lacs:16  },
];

export const anomalyAlerts = [
  { id:'A1', lac:'LAC Bhubaneswar-3', district:'Khordha', doses:47, window:'2 hours', severity:'critical', time:'10:32 AM' },
  { id:'A2', lac:'LAC Cuttack-7',     district:'Cuttack', doses:31, window:'90 min',  severity:'high',     time:'09:15 AM' },
  { id:'A3', lac:'LAC Puri-2',        district:'Puri',    doses:22, window:'3 hours', severity:'medium',   time:'Yesterday' },
];

export const restockRequests = [
  { id:'RR-001', district:'Cuttack',     type:'Normal',     animal:'Cattle',  qty:500, urgency:'critical', submitted:'2024-12-01', status:'pending'   },
  { id:'RR-002', district:'Gajapati',    type:'Normal',     animal:'Buffalo', qty:200, urgency:'critical', submitted:'2024-12-02', status:'pending'   },
  { id:'RR-003', district:'Malkangiri',  type:'Normal',     animal:'Cattle',  qty:150, urgency:'high',     submitted:'2024-12-02', status:'pending'   },
  { id:'RR-004', district:'Jajapur',     type:'Sex Sorted', animal:'Cattle',  qty:300, urgency:'high',     submitted:'2024-12-03', status:'approved'  },
  { id:'RR-005', district:'Nuapada',     type:'Normal',     animal:'Cattle',  qty:180, urgency:'medium',   submitted:'2024-12-03', status:'pending'   },
  { id:'RR-006', district:'Deogarh',     type:'Normal',     animal:'Buffalo', qty:120, urgency:'medium',   submitted:'2024-12-04', status:'approved'  },
  { id:'RR-007', district:'Kandhamal',   type:'Sex Sorted', animal:'Cattle',  qty:250, urgency:'medium',   submitted:'2024-12-04', status:'pending'   },
  { id:'RR-008', district:'Nabarangpur', type:'Normal',     animal:'Cattle',  qty:200, urgency:'low',      submitted:'2024-12-05', status:'fulfilled' },
];

// ── Helpers ───────────────────────────────────────────────────────────────────

/** SVG path order (indices 30-59 map to these district names) */
export const SVG_DISTRICT_ORDER = [
  'Angul','Bolangir','Balasore','Bargarh','Bhadrak',
  'Boudh','Cuttack','Deogarh','Dhenkanal','Gajapati',
  'Ganjam','Jagatsinghpur','Jajpur','Jharsuguda',
  'Kalahandi','Kandhamal','Kendrapara','Keonjhar',
  'Khordha','Koraput','Malkangiri','Mayurbhanj',
  'Nabarangpur','Nayagarh','Nuapada','Puri',
  'Rayagada','Sambalpur','Subarnapur','Sundargarh',
];

/** SVG label name → data name (handles spelling differences) */
export const SVG_NAME_MAP = {
  Angul:'Angul', Bolangir:'Bolangir', Balasore:'Balasore', Bargarh:'Bargarh',
  Bhadrak:'Bhadrak', Boudh:'Boudh', Cuttack:'Cuttack', Deogarh:'Deogarh',
  Dhenkanal:'Dhenkanal', Gajapati:'Gajapati', Ganjam:'Ganjam',
  Jagatsinghpur:'Jagatsinghpur', Jajpur:'Jajapur', Jharsuguda:'Jharsuguda',
  Kalahandi:'Kalahandi', Kandhamal:'Kandhamal', Kendrapara:'Kendrapara',
  Keonjhar:'Keonjhar', Khordha:'Khordha', Koraput:'Koraput',
  Malkangiri:'Malkangiri', Mayurbhanj:'Mayurbhanj', Nabarangpur:'Nabarangpur',
  Nayagarh:'Nayagarh', Nuapada:'Nuapada', Puri:'Puri', Rayagada:'Rayagada',
  Sambalpur:'Sambalpur', Subarnapur:'Subarnapur', Sundargarh:'Sundargarh',
};

export function getStatus(d) {
  if (d.daysToStockout === null) return 'surplus';
  if (d.daysToStockout <= 10)   return 'critical';
  if (d.daysToStockout <= 20)   return 'warning';
  if (d.daysToStockout <= 35)   return 'good';
  return 'surplus';
}

export const STATUS_COLORS = {
  critical: { fill:'#fca5a5', stroke:'#ef4444', hover:'#f87171', hoverStroke:'#dc2626', text:'#dc2626' },
  warning:  { fill:'#fde68a', stroke:'#f59e0b', hover:'#fcd34d', hoverStroke:'#d97706', text:'#d97706' },
  good:     { fill:'#86efac', stroke:'#16a34a', hover:'#4ade80', hoverStroke:'#15803d', text:'#16a34a' },
  surplus:  { fill:'#93c5fd', stroke:'#2563eb', hover:'#60a5fa', hoverStroke:'#1d4ed8', text:'#2563eb' },
};

export function statusLabel(s) {
  return { critical:'Critical', warning:'Warning', good:'Good', surplus:'Surplus' }[s] || s;
}

export function utilPct(d) {
  return d.allocated > 0 ? Math.round((d.used / d.allocated) * 100) : 0;
}

export function stockPct(d) {
  return d.target > 0 ? Math.min(100, Math.round((d.stock / d.target) * 100)) : 0;
}

/** Build a lookup map: district name → district object */
export function buildDataByName(districts) {
  return Object.fromEntries(districts.map(d => [d.name, d]));
}
