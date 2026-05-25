import { useState } from 'react';
import { motion } from 'motion/react';
import {
  AlertTriangle, Bot, CheckCircle2, ChevronRight, Clock, Cloud, CloudOff,
  Dna, FilePlus2, History, MapPin, MessageSquare, RefreshCw, Search,
  Send, Syringe, User, Wifi, WifiOff,
} from 'lucide-react';
import {
  aitRestockRequests, aitUtilisationHistory, AITRestockRequest,
  availableDoses, bharatPashuAnimals, farmerAIRequests,
  krushakFarmers, sourceOfDistributionOptions,
} from '../data/aitFarmerData';

export type AITScreen = 'home' | 'utilisation' | 'restock' | 'status' | 'offline';
export type FarmerSemenScreen = 'login' | 'request' | 'history' | 'chatbot';

const aitScreens: Array<[AITScreen, string, string, string]> = [
  ['home',        'S1-A-01', 'Home',        'ait-home'],
  ['utilisation', 'S1-A-02', 'Log Dose',    'ait-utilisation'],
  ['restock',     'S1-A-03', 'Restock Req', 'ait-restock'],
  ['status',      'S1-A-04', 'Status',      'ait-status'],
  ['offline',     'S1-A-05', 'Offline',     'ait-offline'],
];

const farmerSemenScreens: Array<[FarmerSemenScreen, string, string, string]> = [
  ['login',   'S1-F-01', 'Login',   'farmer-semen-login'],
  ['request', 'S1-F-02', 'Request', 'farmer-semen-request'],
  ['history', 'S1-F-03', 'History', 'farmer-semen-history'],
  ['chatbot', 'S1-F-04', 'Chatbot', 'farmer-semen-chatbot'],
];

const aitRoutes: Record<AITScreen, string> = {
  home: 'ait-home', utilisation: 'ait-utilisation',
  restock: 'ait-restock', status: 'ait-status', offline: 'ait-offline',
};

const farmerRoutes: Record<FarmerSemenScreen, string> = {
  login: 'farmer-semen-login', request: 'farmer-semen-request',
  history: 'farmer-semen-history', chatbot: 'farmer-semen-chatbot',
};

interface AITMobileProps {
  screen?: AITScreen;
  doseCount?: number;
  onDoseCountChange?: (count: number) => void;
  onNavigate?: (page: string) => void;
}

interface FarmerSemenProps {
  screen?: FarmerSemenScreen;
  onNavigate?: (page: string) => void;
}

function PhoneShell({ children, title, subtitle }: { children: React.ReactNode; title: string; subtitle: string }) {
  return (
    <div className="mx-auto max-w-[430px]">
      <div className="rounded-[28px] border-8 border-slate-900 bg-slate-950 shadow-2xl overflow-hidden">
        <div className="bg-slate-900 text-white px-5 py-3 flex items-center justify-between">
          <div>
            <p className="text-xs text-green-200">{subtitle}</p>
            <h2 className="text-lg">{title}</h2>
          </div>
          <div className="flex items-center gap-2">
            <Wifi size={14} className="text-green-300" />
            <div className="w-12 h-1.5 rounded-full bg-slate-700" />
          </div>
        </div>
        <div className="bg-mesh min-h-[720px] p-4">{children}</div>
      </div>
    </div>
  );
}

function AITTabs({ active, onNavigate }: { active: AITScreen; onNavigate?: (page: string) => void }) {
  return (
    <div className="flex gap-2 overflow-x-auto hide-scrollbar mb-4">
      {aitScreens.map(([key, id, label]) => (
        <button key={key} onClick={() => onNavigate?.(aitRoutes[key])}
          className={`px-3 py-2 rounded-xl text-xs whitespace-nowrap ${active === key ? 'bg-green-600 text-white' : 'bg-white/70 text-slate-700'}`}>
          {id} {label}
        </button>
      ))}
    </div>
  );
}

function FarmerSemenTabs({ active, onNavigate }: { active: FarmerSemenScreen; onNavigate?: (page: string) => void }) {
  return (
    <div className="flex gap-2 overflow-x-auto hide-scrollbar mb-4">
      {farmerSemenScreens.map(([key, id, label]) => (
        <button key={key} onClick={() => onNavigate?.(farmerRoutes[key])}
          className={`px-3 py-2 rounded-xl text-xs whitespace-nowrap ${active === key ? 'bg-green-600 text-white' : 'bg-white/70 text-slate-700'}`}>
          {id} {label}
        </button>
      ))}
    </div>
  );
}

// AIT Home Screen (S1-A-01)
function AITHomeScreen({ doseCount, onNavigate }: { doseCount: number; onNavigate?: (page: string) => void }) {
  const weeklyStatus = doseCount >= 5;
  return (
    <div className="space-y-4">
      <div className="glass-card rounded-2xl p-4">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-full bg-green-600 flex items-center justify-center text-white font-bold">SP</div>
          <div>
            <p className="font-semibold text-slate-900">Suresh Pradhan</p>
            <p className="text-xs text-slate-600">AIT · Remuna Block · Balasore LAC-1</p>
          </div>
        </div>
      </div>
      <div className={`p-4 rounded-2xl border-2 ${doseCount > 10 ? 'bg-green-50 border-green-300' : doseCount > 5 ? 'bg-amber-50 border-amber-300' : 'bg-red-50 border-red-300'}`}>
        <p className="text-xs font-semibold text-slate-600 mb-1">Current Dose Count</p>
        <p className={`text-4xl font-mono font-bold ${doseCount > 10 ? 'text-green-700' : doseCount > 5 ? 'text-amber-700' : 'text-red-700'}`}>{doseCount}</p>
        <p className="text-xs text-slate-600 mt-1">doses available at your LAC</p>
      </div>
      <div className="glass-card rounded-2xl p-4">
        <p className="text-sm font-semibold text-slate-900 mb-2">Today's Tasks</p>
        <div className="space-y-2">
          {['Gopal Jena — Cattle AI (10:00 AM)', 'Sabitri Nayak — Buffalo AI (2:00 PM)', 'Ramesh Patel — Cattle AI (4:30 PM)'].map((task) => (
            <div key={task} className="flex items-center gap-2 p-2 rounded-xl bg-white/70">
              <Syringe size={14} className="text-green-600" />
              <p className="text-xs text-slate-700">{task}</p>
            </div>
          ))}
        </div>
      </div>
      <div className={`p-3 rounded-xl flex items-center gap-2 ${weeklyStatus ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
        {weeklyStatus ? <CheckCircle2 size={16} className="text-green-600" /> : <AlertTriangle size={16} className="text-red-600" />}
        <p className={`text-xs ${weeklyStatus ? 'text-green-800' : 'text-red-800'}`}>
          Weekly data submission: {weeklyStatus ? 'Up to date ✓' : 'Overdue — submit now'}
        </p>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {[
          { label: 'Log Utilisation', route: 'ait-utilisation', icon: Syringe, color: 'bg-green-600' },
          { label: 'Raise Request', route: 'ait-restock', icon: FilePlus2, color: 'bg-blue-600' },
          { label: 'Track Status', route: 'ait-status', icon: History, color: 'bg-amber-600' },
          { label: 'Raise Grievance', route: 'ait-offline', icon: MessageSquare, color: 'bg-slate-600' },
        ].map(({ label, route, icon: Icon, color }) => (
          <button key={label} onClick={() => onNavigate?.(route)}
            className="p-4 rounded-xl bg-white/80 border border-white/40 text-left">
            <div className={`w-8 h-8 rounded-lg ${color} flex items-center justify-center mb-2`}>
              <Icon size={16} className="text-white" />
            </div>
            <p className="text-xs font-semibold text-slate-900">{label}</p>
          </button>
        ))}
      </div>
    </div>
  );
}

// AIT Utilisation Entry Form (S1-A-02) — DEMO CRITICAL
function AITUtilisationForm({ onDoseCountChange, doseCount }: { onDoseCountChange?: (count: number) => void; doseCount: number }) {
  const [aadhaarInput, setAadhaarInput] = useState('');
  const [fetchedFarmer, setFetchedFarmer] = useState<typeof krushakFarmers[0] | null>(null);
  const [tagInput, setTagInput] = useState('');
  const [fetchedAnimal, setFetchedAnimal] = useState<typeof bharatPashuAnimals[0] | null>(null);
  const [selectedDose, setSelectedDose] = useState('');
  const [dateAdministered, setDateAdministered] = useState('2026-05-22');
  const [source, setSource] = useState(sourceOfDistributionOptions[0]);
  const [toast, setToast] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const fetchFarmer = () => {
    const found = krushakFarmers.find(f => f.aadhaar.replace(/-/g, '') === aadhaarInput.replace(/-/g, '') || f.mobile === aadhaarInput);
    if (found) setFetchedFarmer(found);
    else setFetchedFarmer({ aadhaar: aadhaarInput, mobile: '', name: 'Manual Entry Required', village: '', block: '', district: '' });
  };

  const fetchAnimal = () => {
    const found = bharatPashuAnimals.find(a => a.tagNumber === tagInput);
    if (found) setFetchedAnimal(found);
    else setFetchedAnimal(null);
  };

  const dose = availableDoses.find(d => d.code === selectedDose);

  const handleSubmit = () => {
    if (!fetchedFarmer || !selectedDose) return;
    onDoseCountChange?.(Math.max(0, doseCount - 1));
    setSubmitted(true);
    setToast(`Dose ${selectedDose} administered to ${fetchedFarmer.name}. Inventory deducted. Record synced to district dashboard.`);
  };

  if (submitted) {
    return (
      <div className="space-y-4">
        <div className="p-5 rounded-2xl bg-green-50 border-2 border-green-300 text-center">
          <CheckCircle2 size={40} className="text-green-600 mx-auto mb-3" />
          <p className="font-bold text-green-900 text-lg">Dose Logged Successfully</p>
          <p className="text-sm text-green-700 mt-1">{toast}</p>
        </div>
        <div className="p-4 rounded-xl bg-white/80 border border-white/40">
          <p className="text-xs text-slate-600 mb-1">Updated dose count</p>
          <p className="text-3xl font-mono text-green-700">{Math.max(0, doseCount - 1)}</p>
          <p className="text-xs text-slate-500">District dashboard updated in real time</p>
        </div>
        <button onClick={() => { setSubmitted(false); setFetchedFarmer(null); setFetchedAnimal(null); setSelectedDose(''); setToast(''); }}
          className="w-full p-3 rounded-xl bg-green-600 text-white">Log Another Dose</button>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="glass-card rounded-2xl p-4">
        <p className="text-xs font-semibold text-green-700 mb-2">DEMO CRITICAL — S1-A-02</p>
        <h3 className="text-slate-900 mb-3">Semen Utilisation Entry</h3>
        <label className="text-xs text-slate-600">Farmer Aadhaar / Mobile (Krushak Odisha fetch)</label>
        <div className="flex gap-2 mt-1 mb-2">
          <input value={aadhaarInput} onChange={e => setAadhaarInput(e.target.value)}
            placeholder="4512-8823-9901 or mobile"
            className="flex-1 px-3 py-2 rounded-xl bg-white/70 border border-white/30 text-sm" />
          <button onClick={fetchFarmer} className="px-3 py-2 rounded-xl bg-green-600 text-white text-xs">Fetch</button>
        </div>
        {fetchedFarmer && (
          <div className="p-3 rounded-xl bg-green-50 border border-green-200 mb-3">
            <p className="text-sm font-semibold text-green-900">{fetchedFarmer.name}</p>
            <p className="text-xs text-green-700">{fetchedFarmer.village}, {fetchedFarmer.block} · {fetchedFarmer.aadhaar}</p>
          </div>
        )}
        <label className="text-xs text-slate-600">Cattle Tag (Bharat Pashudhan fetch)</label>
        <div className="flex gap-2 mt-1 mb-2">
          <input value={tagInput} onChange={e => setTagInput(e.target.value)}
            placeholder="OD-BLS-C-2024-0012"
            className="flex-1 px-3 py-2 rounded-xl bg-white/70 border border-white/30 text-sm" />
          <button onClick={fetchAnimal} className="px-3 py-2 rounded-xl bg-blue-600 text-white text-xs">Fetch</button>
        </div>
        {fetchedAnimal && (
          <div className="p-3 rounded-xl bg-blue-50 border border-blue-200 mb-3">
            <p className="text-sm font-semibold text-blue-900">{fetchedAnimal.breed} ({fetchedAnimal.animalType})</p>
            <p className="text-xs text-blue-700">Age {fetchedAnimal.age}y · Owner: {fetchedAnimal.ownerName}</p>
          </div>
        )}
        <label className="text-xs text-slate-600">Semen Dose Code (from available doses)</label>
        <select value={selectedDose} onChange={e => setSelectedDose(e.target.value)}
          className="w-full mt-1 mb-2 px-3 py-2 rounded-xl bg-white/70 border border-white/30 text-sm">
          <option value="">— Select dose —</option>
          {availableDoses.filter(d => d.available).map(d => (
            <option key={d.code} value={d.code}>{d.code} · {d.breed} · {d.semenType}</option>
          ))}
        </select>
        {dose && (
          <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 mb-3 text-xs text-amber-900 space-y-1">
            <p>Bull ID: {dose.bullId} · Batch: {dose.batchNumber}</p>
            <p>Station: {dose.stationNumber} · Damp Seal: {dose.dampSeal}</p>
            <p>Collected: {dose.dateOfCollection}</p>
          </div>
        )}
        <label className="text-xs text-slate-600">Date Administered</label>
        <input type="date" value={dateAdministered} onChange={e => setDateAdministered(e.target.value)}
          className="w-full mt-1 mb-2 px-3 py-2 rounded-xl bg-white/70 border border-white/30 text-sm" />
        <label className="text-xs text-slate-600">Source of Distribution</label>
        <select value={source} onChange={e => setSource(e.target.value)}
          className="w-full mt-1 mb-3 px-3 py-2 rounded-xl bg-white/70 border border-white/30 text-sm">
          {sourceOfDistributionOptions.map(s => <option key={s}>{s}</option>)}
        </select>
        <button onClick={handleSubmit} disabled={!fetchedFarmer || !selectedDose}
          className="w-full p-3 rounded-xl bg-green-600 text-white disabled:opacity-50 flex items-center justify-center gap-2">
          <Send size={16} /> Submit — Inventory Auto-Deducts
        </button>
      </div>
    </div>
  );
}

// AIT Restocking Request Form (S1-A-03)
function AITRestockForm({ onNavigate }: { onNavigate?: (page: string) => void }) {
  const [animalType, setAnimalType] = useState<'Cattle' | 'Buffalo'>('Cattle');
  const [semenType, setSemenType] = useState<'Normal' | 'Sex Sorted'>('Normal');
  const [quantity, setQuantity] = useState(50);
  const [urgency, setUrgency] = useState<'Urgent' | 'Not Urgent'>('Urgent');
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div className="p-5 rounded-2xl bg-green-50 border-2 border-green-300 text-center space-y-3">
        <CheckCircle2 size={40} className="text-green-600 mx-auto" />
        <p className="font-bold text-green-900">Request Submitted</p>
        <p className="text-sm text-green-700">Appears in BVO approval queue immediately.</p>
        <button onClick={() => onNavigate?.('ait-status')} className="w-full p-3 rounded-xl bg-green-600 text-white">Track Status</button>
      </div>
    );
  }

  return (
    <div className="glass-card rounded-2xl p-4 space-y-3">
      <h3 className="text-slate-900">S1-A-03 Restocking Request</h3>
      <label className="text-xs text-slate-600">Animal Type
        <select value={animalType} onChange={e => setAnimalType(e.target.value as 'Cattle' | 'Buffalo')}
          className="w-full mt-1 px-3 py-2 rounded-xl bg-white/70 border border-white/30">
          <option>Cattle</option><option>Buffalo</option>
        </select>
      </label>
      <label className="text-xs text-slate-600">Semen Type
        <select value={semenType} onChange={e => setSemenType(e.target.value as 'Normal' | 'Sex Sorted')}
          className="w-full mt-1 px-3 py-2 rounded-xl bg-white/70 border border-white/30">
          <option>Normal</option><option>Sex Sorted</option>
        </select>
      </label>
      <label className="text-xs text-slate-600">Quantity Needed
        <input type="number" value={quantity} onChange={e => setQuantity(Number(e.target.value))}
          className="w-full mt-1 px-3 py-2 rounded-xl bg-white/70 border border-white/30" />
      </label>
      <label className="text-xs text-slate-600">Urgency
        <select value={urgency} onChange={e => setUrgency(e.target.value as 'Urgent' | 'Not Urgent')}
          className="w-full mt-1 px-3 py-2 rounded-xl bg-white/70 border border-white/30">
          <option>Urgent</option><option>Not Urgent</option>
        </select>
      </label>
      <button onClick={() => setSubmitted(true)}
        className={`w-full p-3 rounded-xl text-white ${urgency === 'Urgent' ? 'bg-red-600' : 'bg-green-600'}`}>
        Submit Request → BVO Queue
      </button>
    </div>
  );
}

// AIT Request Status Tracker (S1-A-04)
function AITStatusTracker() {
  const [selected, setSelected] = useState<AITRestockRequest | null>(null);
  const allRequests = [...aitRestockRequests];

  const statusColor = (s: string) => s === 'Fulfilled' ? 'bg-green-100 text-green-800' : s === 'Approved' ? 'bg-blue-100 text-blue-800' : 'bg-amber-100 text-amber-800';

  return (
    <div className="space-y-3">
      <h3 className="text-slate-900">S1-A-04 Request Status Tracker</h3>
      {allRequests.map(req => (
        <button key={req.id} onClick={() => setSelected(selected?.id === req.id ? null : req)}
          className="w-full text-left p-4 rounded-xl bg-white/80 border border-white/40">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-slate-900">{req.animalType} · {req.semenType}</p>
              <p className="text-xs text-slate-600">{req.quantity} doses · {req.submittedAt}</p>
            </div>
            <span className={`px-2 py-1 rounded-full text-xs ${statusColor(req.status)}`}>{req.status}</span>
          </div>
          {selected?.id === req.id && (
            <div className="mt-3 pt-3 border-t border-white/40 space-y-1">
              <p className="text-xs text-slate-600">Urgency: <span className="font-semibold">{req.urgency}</span></p>
              {req.approvedAt && <p className="text-xs text-slate-600">Approved: {req.approvedAt}</p>}
              {req.approvedBy && <p className="text-xs text-slate-600">By: {req.approvedBy}</p>}
            </div>
          )}
        </button>
      ))}
    </div>
  );
}

// AIT Offline Mode (S1-A-05)
function AITOfflineMode() {
  const [offline, setOffline] = useState(true);
  const [queued, setQueued] = useState(1);
  const [synced, setSynced] = useState(false);

  const handleSync = () => {
    if (!offline) { setSynced(true); setQueued(0); }
  };

  return (
    <div className="space-y-4">
      <button onClick={() => setOffline(!offline)}
        className={`w-full p-3 rounded-xl text-white flex items-center justify-center gap-2 ${offline ? 'bg-red-600' : 'bg-green-600'}`}>
        {offline ? <><WifiOff size={16} /> Airplane Mode ON — Tap to Reconnect</> : <><Wifi size={16} /> Online — Tap to Go Offline</>}
      </button>
      <div className={`p-4 rounded-xl border text-sm ${offline ? 'bg-red-50 border-red-200 text-red-800' : 'bg-green-50 border-green-200 text-green-800'}`}>
        {offline ? <><CloudOff size={16} className="inline mr-1" /> Working offline — data will sync when connected</> : <><Cloud size={16} className="inline mr-1" /> Online — all data synced</>}
      </div>
      {queued > 0 && (
        <div className="p-4 rounded-xl bg-white/80 border border-white/40">
          <p className="text-sm font-semibold text-slate-900">Queued Submissions: {queued}</p>
          <p className="text-xs text-slate-600 mt-1">Dose log for Gopal Jena saved locally.</p>
          <button onClick={handleSync} disabled={offline}
            className="mt-3 w-full p-2 rounded-xl bg-green-600 text-white text-sm disabled:opacity-40 flex items-center justify-center gap-2">
            <RefreshCw size={14} /> Sync Now
          </button>
        </div>
      )}
      {synced && (
        <div className="p-4 rounded-xl bg-green-50 border border-green-200 text-green-800 text-sm">
          <CheckCircle2 size={16} className="inline mr-1" /> Auto-sync complete. District dashboard updated.
        </div>
      )}
      <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-800">
        DEMO: Turn on airplane mode, submit a dose on S1-A-02, reconnect here, watch sync.
      </div>
    </div>
  );
}

// Main AIT Mobile App export
export function AITMobileApp({ screen = 'home', doseCount = 14, onDoseCountChange, onNavigate }: AITMobileProps) {
  const [localDoseCount, setLocalDoseCount] = useState(doseCount);
  const activeDoseCount = doseCount ?? localDoseCount;
  const changeDoseCount = onDoseCountChange ?? setLocalDoseCount;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <PhoneShell title="AIT Mobile" subtitle="Suresh Pradhan · Remuna Block · Balasore">
        <AITTabs active={screen} onNavigate={onNavigate} />
        {screen === 'home' && <AITHomeScreen doseCount={activeDoseCount} onNavigate={onNavigate} />}
        {screen === 'utilisation' && <AITUtilisationForm doseCount={activeDoseCount} onDoseCountChange={changeDoseCount} />}
        {screen === 'restock' && <AITRestockForm onNavigate={onNavigate} />}
        {screen === 'status' && <AITStatusTracker />}
        {screen === 'offline' && <AITOfflineMode />}
      </PhoneShell>
    </motion.div>
  );
}

// Farmer Semen App (S1-F-01 to S1-F-04)
export function FarmerSemenApp({ screen = 'login', onNavigate }: FarmerSemenProps) {
  const [query, setQuery] = useState('When is my next AI service due?');
  const chatResponse = 'Your last AI service was on 20 May 2026 for your HF Cross cow (OD-BLS-C-2024-0012). Pregnancy check is due in 25 days (14 June 2026). For new service, tap Request AI Service.';

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <PhoneShell title="Farmer AI Portal" subtitle="Gopal Jena · Remuna, Balasore">
        <FarmerSemenTabs active={screen} onNavigate={onNavigate} />
        {screen === 'login' && (
          <div className="glass-card rounded-2xl p-4 space-y-3">
            <h3 className="text-slate-900">S1-F-01 Farmer Login</h3>
            <input placeholder="Mobile number" className="w-full px-3 py-2 rounded-xl bg-white/70 border border-white/30" />
            <button className="w-full p-3 rounded-xl bg-green-600 text-white">Send OTP</button>
            <div className="border-t border-white/30 pt-3">
              <p className="text-xs text-slate-600 mb-2">New farmer? Register here:</p>
              <div className="space-y-2">
                <input placeholder="Full name" className="w-full px-3 py-2 rounded-xl bg-white/70 border border-white/30 text-sm" />
                <input placeholder="Aadhaar number" className="w-full px-3 py-2 rounded-xl bg-white/70 border border-white/30 text-sm" />
                <button className="w-full p-2 rounded-xl bg-white/70 border border-white/30 text-sm">Create Profile</button>
              </div>
            </div>
          </div>
        )}
        {screen === 'request' && (
          <div className="glass-card rounded-2xl p-4 space-y-3">
            <h3 className="text-slate-900">S1-F-02 AI Service Request</h3>
            <select className="w-full px-3 py-2 rounded-xl bg-white/70 border border-white/30">
              <option>Cattle</option><option>Buffalo</option><option>Goat</option>
            </select>
            <select className="w-full px-3 py-2 rounded-xl bg-white/70 border border-white/30">
              <option>HF Cross</option><option>Jersey</option><option>Murrah Buffalo</option><option>Sahiwal</option>
            </select>
            <div className="flex items-center gap-2 p-3 rounded-xl bg-white/70 border border-white/30">
              <MapPin size={16} className="text-green-600" />
              <p className="text-sm text-slate-700">Remuna Village, Balasore (GPS auto-detected)</p>
            </div>
            <input type="date" defaultValue="2026-05-24" className="w-full px-3 py-2 rounded-xl bg-white/70 border border-white/30" />
            <input type="time" defaultValue="09:00" className="w-full px-3 py-2 rounded-xl bg-white/70 border border-white/30" />
            <button className="w-full p-3 rounded-xl bg-green-600 text-white">Submit → AIT Assigned via On-Call AI</button>
          </div>
        )}
        {screen === 'history' && (
          <div className="space-y-3">
            <h3 className="text-slate-900">S1-F-03 Service History</h3>
            {farmerAIRequests.map(req => (
              <div key={req.id} className="p-4 rounded-xl bg-white/80 border border-white/40">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-sm font-semibold text-slate-900">{req.animalType} · {req.breed}</p>
                  <span className={`px-2 py-1 rounded-full text-xs ${req.status === 'Completed' ? 'bg-green-100 text-green-800' : req.status === 'AIT Assigned' ? 'bg-blue-100 text-blue-800' : 'bg-amber-100 text-amber-800'}`}>{req.status}</span>
                </div>
                <p className="text-xs text-slate-600">{req.preferredDate} at {req.preferredTime}</p>
                {req.assignedAIT && <p className="text-xs text-green-700 mt-1">AIT: {req.assignedAIT}</p>}
              </div>
            ))}
          </div>
        )}
        {screen === 'chatbot' && (
          <div className="space-y-3">
            <div className="glass-card rounded-2xl p-4">
              <div className="flex items-center gap-2 mb-3">
                <Bot size={24} className="text-green-700" />
                <h3 className="text-slate-900">S1-F-04 AI Chatbot</h3>
              </div>
              <p className="text-xs text-slate-600 mb-2">Ask in English or Odia</p>
              <input value={query} onChange={e => setQuery(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-white/70 border border-white/30 text-sm mb-2" />
              <button className="w-full p-3 rounded-xl bg-green-600 text-white text-sm">Ask AI</button>
            </div>
            <div className="p-4 rounded-xl bg-white/80 border border-white/40 text-sm text-slate-800">
              <p className="text-xs text-green-700 font-semibold mb-1">AI Response (RAG-based)</p>
              {chatResponse}
            </div>
            <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-800">
              Try: "Which bull breeds are available?" or "ମୋ ଗାଈ ପାଇଁ AI ସେବା କେବେ?"
            </div>
          </div>
        )}
      </PhoneShell>
    </motion.div>
  );
}
