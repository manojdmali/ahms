import { useMemo, useState } from 'react';
import { motion } from 'motion/react';
import {
  AlertTriangle,
  Barcode,
  Bot,
  CheckCircle2,
  Cloud,
  CloudOff,
  FilePlus2,
  History,
  Home,
  MessageSquare,
  PackageCheck,
  Search,
  Send,
  UserPlus,
} from 'lucide-react';
import {
  FarmerMedicineProfile,
  farmerMedicineProfiles,
  MedicineRequisition,
  MedicineStockItem,
  medicineStock,
} from '../data/medicineMvuData';

type LacScreen = 'home' | 'log' | 'farmer' | 'barcode' | 'request' | 'inventory' | 'offline';
type FarmerScreen = 'login' | 'request' | 'history' | 'chatbot';

interface LacMedicineAppProps {
  screen?: LacScreen;
  stock?: MedicineStockItem[];
  requisitions?: MedicineRequisition[];
  onStockChange?: (stock: MedicineStockItem[]) => void;
  onRequisitionAdd?: (request: MedicineRequisition) => void;
  onNavigate?: (page: string) => void;
}

interface FarmerMedicineAppProps {
  screen?: FarmerScreen;
  onNavigate?: (page: string) => void;
}

const lacScreens: Array<[LacScreen, string, string]> = [
  ['home', 'S3-L-01', 'Home'],
  ['log', 'S3-L-02', 'Log Medicine'],
  ['farmer', 'S3-L-03', 'Farmer Profile'],
  ['barcode', 'S3-L-04', 'Barcode Receipt'],
  ['request', 'S3-L-05', 'Raise Request'],
  ['inventory', 'S3-L-06', 'Inventory'],
  ['offline', 'S3-L-07', 'Offline Mode'],
];

const farmerScreens: Array<[FarmerScreen, string, string]> = [
  ['login', 'S3-F-01', 'Login'],
  ['request', 'S3-F-02', 'Service Request'],
  ['history', 'S3-F-03', 'History'],
  ['chatbot', 'S3-F-04', 'Chatbot'],
];

const medicineRoutes: Record<LacScreen, string> = {
  home: 'lac-medicine-home',
  log: 'lac-medicine-log',
  farmer: 'lac-medicine-farmer',
  barcode: 'lac-medicine-barcode',
  request: 'lac-medicine-request',
  inventory: 'lac-medicine-inventory',
  offline: 'lac-medicine-offline',
};

const farmerRoutes: Record<FarmerScreen, string> = {
  login: 'farmer-medicine-login',
  request: 'farmer-medicine-request',
  history: 'farmer-medicine-history',
  chatbot: 'farmer-medicine-chatbot',
};

const toneForStock = (item: MedicineStockItem) => {
  if (item.stock <= item.threshold * 0.6) return { bg: '#fee2e2', text: '#991b1b', label: 'Critical' };
  if (item.stock <= item.threshold * 1.25) return { bg: '#fef3c7', text: '#92400e', label: 'Watch' };
  return { bg: '#dcfce7', text: '#166534', label: 'Healthy' };
};

const fmt = (value: number) => new Intl.NumberFormat('en-IN').format(value);

function PhoneShell({ children, title, subtitle }: { children: React.ReactNode; title: string; subtitle: string }) {
  return (
    <div className="mx-auto max-w-[430px]">
      <div className="rounded-[28px] border-8 border-slate-900 bg-slate-950 shadow-2xl overflow-hidden">
        <div className="bg-slate-900 text-white px-5 py-3 flex items-center justify-between">
          <div>
            <p className="text-xs text-green-200">{subtitle}</p>
            <h2 className="text-lg">{title}</h2>
          </div>
          <div className="w-12 h-1.5 rounded-full bg-slate-700" />
        </div>
        <div className="bg-mesh min-h-[720px] p-4">{children}</div>
      </div>
    </div>
  );
}

function MobileTabs({ active, onNavigate }: { active: LacScreen; onNavigate?: (page: string) => void }) {
  return (
    <div className="flex gap-2 overflow-x-auto hide-scrollbar mb-4">
      {lacScreens.map(([key, id, label]) => (
        <button
          key={key}
          onClick={() => onNavigate?.(medicineRoutes[key])}
          className={`px-3 py-2 rounded-xl text-xs whitespace-nowrap ${active === key ? 'bg-green-600 text-white' : 'bg-white/70 text-slate-700'}`}
        >
          {id} {label}
        </button>
      ))}
    </div>
  );
}

function FarmerTabs({ active, onNavigate }: { active: FarmerScreen; onNavigate?: (page: string) => void }) {
  return (
    <div className="flex gap-2 overflow-x-auto hide-scrollbar mb-4">
      {farmerScreens.map(([key, id, label]) => (
        <button
          key={key}
          onClick={() => onNavigate?.(farmerRoutes[key])}
          className={`px-3 py-2 rounded-xl text-xs whitespace-nowrap ${active === key ? 'bg-green-600 text-white' : 'bg-white/70 text-slate-700'}`}
        >
          {id} {label}
        </button>
      ))}
    </div>
  );
}

function StockTiles({ stock, compact = false, onSelect }: { stock: MedicineStockItem[]; compact?: boolean; onSelect?: (item: MedicineStockItem) => void }) {
  return (
    <div className={compact ? 'grid grid-cols-2 gap-3' : 'space-y-3'}>
      {stock.map((item) => {
        const tone = toneForStock(item);
        return (
          <button
            key={item.sku}
            onClick={() => onSelect?.(item)}
            className="text-left rounded-xl p-3 border"
            style={{ background: tone.bg, borderColor: tone.bg, color: tone.text }}
          >
            <div className="flex items-center justify-between gap-2">
              <p className="text-sm font-semibold">{item.sku}</p>
              <span className="text-xs">{tone.label}</span>
            </div>
            <p className="text-2xl font-mono mt-1">{fmt(item.stock)}</p>
            <p className="text-xs opacity-80">{item.category}</p>
          </button>
        );
      })}
    </div>
  );
}

export function LacMedicineMobileApp({
  screen = 'home',
  stock,
  requisitions,
  onStockChange,
  onRequisitionAdd,
  onNavigate,
}: LacMedicineAppProps) {
  const [localStock, setLocalStock] = useState<MedicineStockItem[]>(medicineStock);
  const [selectedMedicine, setSelectedMedicine] = useState('FMD Vaccine');
  const [selectedFarmer, setSelectedFarmer] = useState('Gopal Jena');
  const [quantity, setQuantity] = useState(1);
  const [toast, setToast] = useState('');
  const [offline, setOffline] = useState(false);
  const [selectedSku, setSelectedSku] = useState<MedicineStockItem | null>(null);
  const activeStock = stock ?? localStock;
  const changeStock = onStockChange ?? setLocalStock;
  const farmer = farmerMedicineProfiles.find((item) => item.name === selectedFarmer) ?? farmerMedicineProfiles[0];
  const criticalItems = activeStock.filter((item) => toneForStock(item).label === 'Critical');

  const deductStock = () => {
    const updated = activeStock.map((item) => item.sku === selectedMedicine ? { ...item, stock: Math.max(0, item.stock - quantity), lastUsed: '2026-05-22' } : item);
    changeStock(updated);
    setToast(`${selectedMedicine} deducted by ${quantity}. ${farmer.name}'s history auto-filled and log is saved.`);
  };

  const receiveBarcode = () => {
    const updated = activeStock.map((item) => item.sku === 'FMD Vaccine' ? { ...item, stock: item.stock + 120, lastReceived: '2026-05-22' } : item);
    changeStock(updated);
    setToast('Barcode MED-FMD-7788 identified. 120 FMD Vaccine doses received and requisition marked Fulfilled.');
  };

  const submitP0 = () => {
    const request: MedicineRequisition = {
      id: `REQ-${Math.floor(200 + Math.random() * 500)}`,
      source: 'Balasore LAC-2',
      medicine: selectedMedicine,
      quantity: 200,
      urgency: 'P0',
      status: 'Pending',
      submittedAt: 'Just now',
    };
    onRequisitionAdd?.(request);
    setToast('P0 request submitted. It appears immediately in BVO/CDVO queue as a red urgent item.');
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <PhoneShell title="LAC Medicine" subtitle="Balasore LAC-2 / Remuna Block">
        <MobileTabs active={screen} onNavigate={onNavigate} />
        {toast && <div className="mb-4 p-3 rounded-xl bg-green-50 border border-green-200 text-sm text-green-800">{toast}</div>}
        {screen === 'home' && (
          <div className="space-y-4">
            <div className="glass-card rounded-2xl p-4">
              <p className="text-sm text-slate-600">Ramesh Das</p>
              <h3 className="text-slate-900">LAC / VD Assignment</h3>
              <p className="text-xs text-slate-500">Balasore LAC-2, Remuna Block</p>
            </div>
            {criticalItems.length > 0 && <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-sm text-red-800"><AlertTriangle size={16} className="inline mr-1" /> Critical stock: {criticalItems.map((item) => item.sku).join(', ')}</div>}
            <StockTiles stock={activeStock} compact />
            <div className="grid grid-cols-2 gap-3">
              {[['Log Medicine', 'lac-medicine-log', Home], ['Scan Barcode', 'lac-medicine-barcode', Barcode], ['Raise Request', 'lac-medicine-request', FilePlus2], ['Raise Grievance', 'lac-medicine-offline', MessageSquare]].map(([label, route, Icon]) => {
                const C = Icon as typeof Home;
                return <button key={label as string} onClick={() => onNavigate?.(route as string)} className="p-4 rounded-xl bg-white/80 border border-white/40 text-left"><C size={20} className="text-green-700 mb-2" /><p className="text-sm font-semibold text-slate-900">{label as string}</p></button>;
              })}
            </div>
          </div>
        )}
        {screen === 'log' && (
          <div className="space-y-4">
            <div className="glass-card rounded-2xl p-4">
              <h3 className="text-slate-900 mb-3">Medicine Administration Log</h3>
              <label className="text-xs text-slate-600">Search farmer (L2 auto-fill)</label>
              <select value={selectedFarmer} onChange={(event) => setSelectedFarmer(event.target.value)} className="w-full mt-1 mb-3 px-3 py-2 rounded-xl bg-white/70 border border-white/30">
                {farmerMedicineProfiles.map((item) => <option key={item.aadhaar}>{item.name}</option>)}
              </select>
              <div className="p-3 rounded-xl bg-green-50 border border-green-200 mb-3">
                <p className="text-sm text-green-900">{farmer.name} - {farmer.animal}</p>
                <p className="text-xs text-green-700">History auto-filled: {farmer.history.length} previous medicine entries</p>
              </div>
              <button className="mb-3 w-full p-3 rounded-xl bg-white/70 border border-white/30 text-sm flex items-center gap-2"><UserPlus size={16} /> Create New Farmer Profile</button>
              <select value={selectedMedicine} onChange={(event) => setSelectedMedicine(event.target.value)} className="w-full mb-3 px-3 py-2 rounded-xl bg-white/70 border border-white/30">
                {activeStock.map((item) => <option key={item.sku}>{item.sku}</option>)}
              </select>
              <input type="number" value={quantity} onChange={(event) => setQuantity(Number(event.target.value))} className="w-full mb-3 px-3 py-2 rounded-xl bg-white/70 border border-white/30" />
              <input type="date" defaultValue="2026-05-22" className="w-full mb-3 px-3 py-2 rounded-xl bg-white/70 border border-white/30" />
              <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 mb-3">
                <p className="text-xs text-amber-800">Stray animal entry: select SKU + animal type when farmer is unknown.</p>
              </div>
              <button onClick={deductStock} className="w-full p-3 rounded-xl bg-green-600 text-white">Submit and Deduct Inventory</button>
            </div>
          </div>
        )}
        {screen === 'farmer' && (
          <div className="space-y-4">
            <div className="relative"><Search size={16} className="absolute left-3 top-3 text-slate-400" /><input placeholder="Search by name or Aadhaar" className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-white/80 border border-white/40" /></div>
            <div className="glass-card rounded-2xl p-4">
              <h3 className="text-slate-900">{farmer.name}</h3>
              <p className="text-sm text-slate-600">{farmer.aadhaar} / {farmer.mobile}</p>
              <p className="text-sm text-green-700 mt-2">Total medicines received: {farmer.history.reduce((sum, item) => sum + item.quantity, 0)}</p>
            </div>
            <select className="w-full px-3 py-2 rounded-xl bg-white/70 border border-white/30"><option>All medicines</option><option>FMD Vaccine</option></select>
            {farmer.history.map((item) => <div key={`${item.medicine}${item.date}`} className="p-3 rounded-xl bg-white/80 border border-white/40"><p className="text-sm font-semibold">{item.medicine}</p><p className="text-xs text-slate-600">{item.quantity} doses, {item.date}, {item.lac}</p></div>)}
          </div>
        )}
        {screen === 'barcode' && (
          <div className="space-y-4">
            <div className="glass-card rounded-2xl p-5 text-center">
              <Barcode size={72} className="mx-auto text-green-700 mb-3" />
              <h3 className="text-slate-900">Inflow Barcode Scan</h3>
              <p className="text-sm text-slate-600">MED-FMD-7788 detected: FMD Vaccine</p>
              <input type="number" defaultValue={120} className="w-full my-4 px-3 py-2 rounded-xl bg-white/70 border border-white/30" />
              <button onClick={receiveBarcode} className="w-full p-3 rounded-xl bg-green-600 text-white">Mark as Received</button>
            </div>
            {(requisitions ?? []).slice(0, 3).map((req) => <div key={req.id} className="p-3 rounded-xl bg-white/80 border border-white/40 flex justify-between"><span className="text-sm">{req.medicine}</span><span className="text-xs text-green-700">Fulfilled</span></div>)}
          </div>
        )}
        {screen === 'request' && (
          <div className="glass-card rounded-2xl p-4 space-y-3">
            <h3 className="text-slate-900">Requisition Request Form</h3>
            <select value={selectedMedicine} onChange={(event) => setSelectedMedicine(event.target.value)} className="w-full px-3 py-2 rounded-xl bg-white/70 border border-white/30">{activeStock.map((item) => <option key={item.sku}>{item.sku}</option>)}</select>
            <input type="number" defaultValue={200} className="w-full px-3 py-2 rounded-xl bg-white/70 border border-white/30" />
            <select defaultValue="P0" className="w-full px-3 py-2 rounded-xl bg-white/70 border border-white/30"><option>P0</option><option>P1</option><option>P2</option><option>P3</option></select>
            <button onClick={submitP0} className="w-full p-3 rounded-xl bg-red-600 text-white">Submit P0 Request</button>
          </div>
        )}
        {screen === 'inventory' && (
          <div className="space-y-4">
            {criticalItems.length > 0 && <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-sm text-red-800">Critical stock banner: {criticalItems.length} SKU needs action.</div>}
            <StockTiles stock={activeStock} compact onSelect={setSelectedSku} />
            {selectedSku && <div className="p-4 rounded-xl bg-white/80 border border-white/40"><p className="font-semibold">{selectedSku.sku}</p><p className="text-sm text-slate-600">Qty {selectedSku.stock}, received {selectedSku.lastReceived}, used {selectedSku.lastUsed}</p></div>}
          </div>
        )}
        {screen === 'offline' && (
          <div className="space-y-4">
            <button onClick={() => setOffline(!offline)} className={`w-full p-3 rounded-xl text-white ${offline ? 'bg-red-600' : 'bg-green-600'}`}>{offline ? 'Go Online / Sync' : 'Turn Offline Mode On'}</button>
            <div className={`p-3 rounded-xl border text-sm ${offline ? 'bg-red-50 border-red-200 text-red-800' : 'bg-green-50 border-green-200 text-green-800'}`}>{offline ? <CloudOff size={16} className="inline mr-1" /> : <Cloud size={16} className="inline mr-1" />} {offline ? 'Offline banner: logs saved locally.' : 'Online: queued logs auto-synced with confirmation toast.'}</div>
            <div className="p-4 rounded-xl bg-white/80 border border-white/40"><p className="font-semibold">Queued medicine log</p><p className="text-sm text-slate-600">FMD Vaccine for Gopal Jena saved locally and ready to sync.</p></div>
          </div>
        )}
      </PhoneShell>
    </motion.div>
  );
}

export function FarmerMedicineApp({ screen = 'login', onNavigate }: FarmerMedicineAppProps) {
  const [query, setQuery] = useState('FMD Vaccine');
  const profile = farmerMedicineProfiles[0];
  const response = "FMD-like symptoms need immediate veterinary confirmation. Isolate the animal, avoid self-medication, and contact Balasore LAC-2. Nearest LAC: Remuna, 4.2 km.";

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <PhoneShell title="Farmer Medicine" subtitle="Single farmer login">
        <FarmerTabs active={screen} onNavigate={onNavigate} />
        {screen === 'login' && <div className="glass-card rounded-2xl p-4 space-y-3"><h3>Mobile OTP Login</h3><input placeholder="Mobile number" className="w-full px-3 py-2 rounded-xl bg-white/70 border border-white/30" /><button className="w-full p-3 rounded-xl bg-green-600 text-white">Send OTP</button><p className="text-xs text-slate-600">Same login works for all farmer-facing modules.</p></div>}
        {screen === 'request' && <div className="glass-card rounded-2xl p-4 space-y-3"><h3>Medicine Service Request</h3><select className="w-full px-3 py-2 rounded-xl bg-white/70 border border-white/30"><option>Cow</option><option>Buffalo</option><option>Goat</option></select><select className="w-full px-3 py-2 rounded-xl bg-white/70 border border-white/30"><option>FMD symptoms</option><option>Fever</option><option>Wound</option></select><button className="w-full p-3 rounded-xl bg-green-600 text-white">Submit Request</button></div>}
        {screen === 'history' && <div className="space-y-3"><div className="glass-card rounded-2xl p-4"><h3>{profile.name}</h3><p className="text-sm text-slate-600">{profile.aadhaar}</p></div><select className="w-full px-3 py-2 rounded-xl bg-white/70 border border-white/30"><option>All medicines</option></select>{profile.history.map((item) => <div key={item.date} className="p-3 rounded-xl bg-white/80 border border-white/40"><History size={16} className="text-green-700 mb-1" /><p className="text-sm font-semibold">{item.medicine}</p><p className="text-xs">{item.quantity} doses on {item.date}</p></div>)}</div>}
        {screen === 'chatbot' && <div className="space-y-3"><div className="glass-card rounded-2xl p-4"><Bot size={28} className="text-green-700 mb-2" /><input value={query} onChange={(event) => setQuery(event.target.value)} className="w-full px-3 py-2 rounded-xl bg-white/70 border border-white/30" /><button className="mt-3 w-full p-3 rounded-xl bg-green-600 text-white">Ask AI</button></div><div className="p-4 rounded-xl bg-white/80 border border-white/40 text-sm text-slate-800">{response}</div></div>}
      </PhoneShell>
    </motion.div>
  );
}

export function BVOMedicineQueue({ requisitions }: { requisitions: MedicineRequisition[] }) {
  const urgent = useMemo(() => requisitions.filter((item) => item.urgency === 'P0'), [requisitions]);
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <div className="glass-card-darker rounded-2xl p-6">
        <p className="text-sm text-green-700 mb-1">BVO Web Portal</p>
        <h2 className="text-2xl text-slate-900">Medicine Requisition Approval Queue</h2>
        <p className="text-sm text-slate-600">P0 requests from LAC mobile appear here instantly.</p>
      </div>
      <div className="grid gap-3">
        {requisitions.map((req) => <div key={req.id} className={`p-4 rounded-xl border ${req.urgency === 'P0' ? 'bg-red-50 border-red-200' : 'bg-white/80 border-white/40'}`}><div className="flex items-center justify-between"><div><p className="font-semibold text-slate-900">{req.source}: {req.medicine}</p><p className="text-sm text-slate-600">{req.quantity} units, {req.submittedAt}</p></div><span className={`px-3 py-1 rounded-full text-xs ${req.urgency === 'P0' ? 'bg-red-600 text-white' : 'bg-slate-100 text-slate-700'}`}>{req.urgency}</span></div></div>)}
      </div>
      {urgent.length > 0 && <div className="p-4 rounded-xl bg-red-600 text-white"><AlertTriangle size={18} className="inline mr-2" /> Red urgent item visible to BVO/CDVO: {urgent[0].medicine} from {urgent[0].source}</div>}
    </motion.div>
  );
}
