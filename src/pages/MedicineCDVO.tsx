import { useState } from 'react';
import { motion } from 'motion/react';
import { AlertTriangle, ArrowRight, Barcode, CheckCircle2, Download, PackageCheck, Send } from 'lucide-react';
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { centralMedicineSKUs, directorateRequisitions, empanelledVendors } from '../data/medicineDirectorateData';
import { medicineStock, MedicineRequisition, initialMedicineRequisitions } from '../data/medicineMvuData';

export type CDVOMedScreen = 'dashboard' | 'inventory' | 'allocation' | 'approval' | 'analytics';
export type BVOMedScreen = 'dashboard' | 'approval';

const cdvoScreens: Array<[CDVOMedScreen, string, string, string]> = [
  ['dashboard',  'S3-C-01', 'District Dashboard', 'med-cdvo-dashboard'],
  ['inventory',  'S3-C-02', 'Inventory Update',   'med-cdvo-inventory'],
  ['allocation', 'S3-C-03', 'Block Allocation',   'med-cdvo-allocation'],
  ['approval',   'S3-C-04', 'Block Approval',     'med-cdvo-approval'],
  ['analytics',  'S3-C-05', 'Analytics',          'med-cdvo-analytics'],
];

const bvoScreens: Array<[BVOMedScreen, string, string, string]> = [
  ['dashboard', 'S3-B-01', 'Block Dashboard', 'med-bvo-dashboard'],
  ['approval',  'S3-B-02', 'LAC Approval',    'med-bvo-approval'],
];

const cdvoRoutes: Record<CDVOMedScreen, string> = {
  dashboard: 'med-cdvo-dashboard', inventory: 'med-cdvo-inventory',
  allocation: 'med-cdvo-allocation', approval: 'med-cdvo-approval', analytics: 'med-cdvo-analytics',
};

const bvoRoutes: Record<BVOMedScreen, string> = {
  dashboard: 'med-bvo-dashboard', approval: 'med-bvo-approval',
};

const fmt = (v: number) => new Intl.NumberFormat('en-IN').format(v);

function DownloadButtons() {
  return (
    <div className="flex gap-2">
      {['PDF', 'CSV', 'Excel'].map(t => (
        <button key={t} className="px-3 py-2 rounded-xl bg-white/70 border border-white/30 text-sm flex items-center gap-2">
          <Download size={14} />{t}
        </button>
      ))}
    </div>
  );
}

// Mock block-level data for Khordha district
const khordhaBlocks = [
  { name: 'Bhubaneswar', criticalSkus: 2, amberSkus: 3, healthySkus: 19, lastUpdated: '2h ago', reporting: true },
  { name: 'Jatni',       criticalSkus: 0, amberSkus: 1, healthySkus: 23, lastUpdated: '3h ago', reporting: true },
  { name: 'Khordha',     criticalSkus: 1, amberSkus: 4, healthySkus: 19, lastUpdated: '5h ago', reporting: true },
  { name: 'Balianta',    criticalSkus: 0, amberSkus: 2, healthySkus: 22, lastUpdated: '7h ago', reporting: false },
  { name: 'Bolagarh',    criticalSkus: 3, amberSkus: 2, healthySkus: 19, lastUpdated: '18h ago', reporting: false },
  { name: 'Chilika',     criticalSkus: 0, amberSkus: 0, healthySkus: 24, lastUpdated: '1h ago', reporting: true },
];

const blockTone = (b: typeof khordhaBlocks[0]) => {
  if (b.criticalSkus >= 2) return { bg: '#fee2e2', border: '#fca5a5', text: '#991b1b' };
  if (b.criticalSkus >= 1 || b.amberSkus >= 3) return { bg: '#fef3c7', border: '#fcd34d', text: '#92400e' };
  return { bg: '#dcfce7', border: '#86efac', text: '#166534' };
};

// S3-C-01 District Medicine Dashboard
function CDVODistrictDashboard({ onNavigate }: { onNavigate?: (page: string) => void }) {
  const pendingRequests = initialMedicineRequisitions.filter(r => r.status === 'Pending').length;
  const criticalBlocks = khordhaBlocks.filter(b => b.criticalSkus > 0).length;
  const nonReporting = khordhaBlocks.filter(b => !b.reporting).length;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="glass-card rounded-xl p-4">
          <PackageCheck className="text-green-700 mb-2" size={20} />
          <p className="text-sm text-slate-600">District SKUs (Khordha)</p>
          <p className="text-3xl font-mono">24</p>
          <p className="text-xs text-slate-500">total medicine types</p>
        </div>
        <div className="glass-card rounded-xl p-4">
          <AlertTriangle className="text-red-700 mb-2" size={20} />
          <p className="text-sm text-slate-600">Critical blocks</p>
          <p className="text-3xl font-mono text-red-700">{criticalBlocks}</p>
          <p className="text-xs text-slate-500">need immediate action</p>
        </div>
        <div className="glass-card rounded-xl p-4">
          <AlertTriangle className="text-amber-700 mb-2" size={20} />
          <p className="text-sm text-slate-600">Non-reporting blocks</p>
          <p className="text-3xl font-mono text-amber-700">{nonReporting}</p>
          <p className="text-xs text-slate-500">7-day compliance gap</p>
        </div>
        <div className="glass-card rounded-xl p-4">
          <Send className="text-blue-700 mb-2" size={20} />
          <p className="text-sm text-slate-600">Pending block requests</p>
          <p className="text-3xl font-mono text-blue-700">{pendingRequests}</p>
          <button onClick={() => onNavigate?.('med-cdvo-approval')} className="text-xs text-blue-600 mt-1">View all →</button>
        </div>
      </div>

      {/* Directorate stock visible above */}
      <div className="glass-card rounded-2xl p-6">
        <p className="text-xs font-semibold text-green-700 mb-2">DIRECTORATE LEVEL (immediately above)</p>
        <h3 className="text-slate-900 mb-3">Central Store Stock — Key SKUs</h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {centralMedicineSKUs.slice(0, 5).map(s => {
            const pct = Math.round((s.centralStock / (s.threshold * 5)) * 100);
            const tone = s.centralStock < s.threshold ? 'bg-red-50 border-red-200 text-red-800' : s.centralStock < s.threshold * 2 ? 'bg-amber-50 border-amber-200 text-amber-800' : 'bg-green-50 border-green-200 text-green-800';
            return (
              <div key={s.sku} className={`p-3 rounded-xl border ${tone}`}>
                <p className="text-xs font-semibold truncate">{s.sku}</p>
                <p className="text-lg font-mono">{fmt(s.centralStock)}</p>
                <p className="text-xs">{s.unit}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Block inventory */}
      <div className="glass-card rounded-2xl p-6">
        <h3 className="text-slate-900 mb-4">Block-wise Inventory — Khordha District</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {khordhaBlocks.map(block => {
            const tone = blockTone(block);
            return (
              <div key={block.name} className="p-4 rounded-xl border" style={{ background: tone.bg, borderColor: tone.border }}>
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-semibold" style={{ color: tone.text }}>{block.name} Block</p>
                  {!block.reporting && <span className="text-xs text-red-700 font-semibold">No report</span>}
                </div>
                <p className="text-xs" style={{ color: tone.text }}>{block.criticalSkus} critical · {block.amberSkus} amber · {block.healthySkus} healthy</p>
                <p className="text-xs text-slate-500 mt-1">Last updated: {block.lastUpdated}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// S3-C-02 Inventory Update (CCD + Bulk)
function CDVOInventoryUpdate() {
  const [scanned, setScanned] = useState(false);
  const [toast, setToast] = useState('');
  const [bulkSku, setBulkSku] = useState('FMD Vaccine');
  const [bulkQty, setBulkQty] = useState(500);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="glass-card rounded-2xl p-6">
        <p className="text-xs font-semibold text-green-700 mb-1">S3-C-02</p>
        <h3 className="text-slate-900 mb-4">CCD Scan — Inflow / Outflow</h3>
        <div className="p-6 rounded-2xl bg-slate-900 text-center mb-4">
          <Barcode size={56} className="mx-auto text-green-400 mb-3" />
          {scanned ? (
            <div className="p-3 rounded-xl bg-green-900 text-green-200 text-sm">✓ MED-FMD-1003 → FMD Vaccine identified</div>
          ) : (
            <button onClick={() => setScanned(true)} className="px-5 py-2 rounded-xl bg-green-600 text-white text-sm">Simulate CCD Scan</button>
          )}
        </div>
        {scanned && (
          <div className="space-y-3">
            <div className="p-3 rounded-xl bg-green-50 border border-green-200">
              <p className="text-sm font-semibold text-green-900">FMD Vaccine · Vaccine</p>
              <p className="text-xs text-green-700">Barcode: MED-FMD-1003</p>
            </div>
            <input type="number" defaultValue={200} className="w-full px-3 py-2 rounded-xl bg-white/70 border border-white/30" />
            <button onClick={() => { setToast('200 FMD Vaccine doses received. District inventory updated.'); setScanned(false); }}
              className="w-full p-3 rounded-xl bg-green-600 text-white flex items-center justify-center gap-2">
              <CheckCircle2 size={16} /> Confirm Receipt
            </button>
          </div>
        )}
        {toast && <div className="mt-3 p-3 rounded-xl bg-green-50 border border-green-200 text-sm text-green-800">{toast}</div>}
      </div>
      <div className="glass-card rounded-2xl p-6">
        <h3 className="text-slate-900 mb-4">Bulk Approval (No Scanner)</h3>
        <label className="text-sm text-slate-700">SKU Name
          <select value={bulkSku} onChange={e => setBulkSku(e.target.value)} className="w-full mt-1 mb-3 px-3 py-2 rounded-xl bg-white/70 border border-white/30">
            {centralMedicineSKUs.map(s => <option key={s.sku}>{s.sku}</option>)}
          </select>
        </label>
        <label className="text-sm text-slate-700">Quantity
          <input type="number" value={bulkQty} onChange={e => setBulkQty(Number(e.target.value))} className="w-full mt-1 mb-3 px-3 py-2 rounded-xl bg-white/70 border border-white/30" />
        </label>
        <button onClick={() => setToast(`${bulkQty} ${bulkSku} updated in district inventory.`)}
          className="w-full p-3 rounded-xl bg-slate-700 text-white">Update Without Scan</button>
      </div>
    </div>
  );
}

// S3-C-03 Block Allocation & Reassignment
function CDVOBlockAllocation() {
  const [block, setBlock] = useState('Bhubaneswar');
  const [sku, setSku] = useState('FMD Vaccine');
  const [qty, setQty] = useState(300);
  const [toast, setToast] = useState('');
  const [flagged, setFlagged] = useState(false);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="glass-card rounded-2xl p-6">
        <p className="text-xs font-semibold text-green-700 mb-1">S3-C-03</p>
        <h3 className="text-slate-900 mb-4">Allocate Medicines to Blocks</h3>
        <label className="text-sm text-slate-700">Block
          <select value={block} onChange={e => setBlock(e.target.value)} className="w-full mt-1 mb-3 px-3 py-2 rounded-xl bg-white/70 border border-white/30">
            {khordhaBlocks.map(b => <option key={b.name}>{b.name}</option>)}
          </select>
        </label>
        <label className="text-sm text-slate-700">SKU
          <select value={sku} onChange={e => setSku(e.target.value)} className="w-full mt-1 mb-3 px-3 py-2 rounded-xl bg-white/70 border border-white/30">
            {centralMedicineSKUs.map(s => <option key={s.sku}>{s.sku}</option>)}
          </select>
        </label>
        <label className="text-sm text-slate-700">Quantity
          <input type="number" value={qty} onChange={e => setQty(Number(e.target.value))} className="w-full mt-1 mb-4 px-3 py-2 rounded-xl bg-white/70 border border-white/30" />
        </label>
        <button onClick={() => setToast(`${qty} ${sku} allocated to ${block} Block. Stock updated.`)}
          className="w-full p-3 rounded-xl bg-green-600 text-white flex items-center justify-center gap-2">
          <Send size={16} /> Allocate to Block
        </button>
        {toast && <div className="mt-3 p-3 rounded-xl bg-green-50 border border-green-200 text-sm text-green-800">{toast}</div>}
      </div>
      <div className="glass-card rounded-2xl p-6">
        <h3 className="text-slate-900 mb-4">Flag Extra Stock for Reallocation</h3>
        <p className="text-sm text-slate-600 mb-4">Mark your district's surplus medicines as 'extra' — visible to Directorate for redistribution.</p>
        <div className="space-y-3">
          {medicineStock.filter(s => s.stock > s.threshold * 2).map(s => (
            <div key={s.sku} className="p-3 rounded-xl bg-green-50 border border-green-200 flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-green-900">{s.sku}</p>
                <p className="text-xs text-green-700">{s.stock} units (surplus)</p>
              </div>
              <button onClick={() => setFlagged(true)} className="px-3 py-1 rounded-lg bg-green-600 text-white text-xs">Flag as Extra</button>
            </div>
          ))}
          {flagged && <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-sm text-amber-800">Flagged stock visible to Directorate for redistribution.</div>}
        </div>
      </div>
    </div>
  );
}

// S3-C-04 Block Requisition Approval
function CDVOBlockApproval({ requisitions }: { requisitions: MedicineRequisition[] }) {
  const [reqs, setReqs] = useState<MedicineRequisition[]>(requisitions);
  const [toast, setToast] = useState('');

  const update = (id: string, status: MedicineRequisition['status']) => {
    setReqs(prev => prev.map(r => r.id === id ? { ...r, status } : r));
    setToast(`Request ${id} ${status.toLowerCase()}.`);
  };

  return (
    <div className="glass-card rounded-2xl p-6">
      <p className="text-xs font-semibold text-green-700 mb-1">S3-C-04</p>
      <h3 className="text-slate-900 mb-4">Block Requisition Approval</h3>
      {toast && <div className="mb-3 p-3 rounded-xl bg-green-50 border border-green-200 text-sm text-green-800">{toast}</div>}
      <div className="space-y-3">
        {reqs.map(req => (
          <div key={req.id} className={`p-4 rounded-xl border ${req.urgency === 'P0' ? 'bg-red-50 border-red-200' : 'bg-white/80 border-white/40'}`}>
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-slate-900">{req.source}: {req.medicine}</p>
                <p className="text-xs text-slate-600">{req.quantity} units · {req.submittedAt}</p>
              </div>
              <div className="flex items-center gap-2">
                <span className={`px-2 py-1 rounded-full text-xs ${req.urgency === 'P0' ? 'bg-red-600 text-white' : req.urgency === 'P1' ? 'bg-orange-500 text-white' : 'bg-slate-200 text-slate-700'}`}>{req.urgency}</span>
                {req.status === 'Pending' && <>
                  <button onClick={() => update(req.id, 'Approved')} className="px-3 py-1 rounded-lg bg-green-600 text-white text-xs">Approve</button>
                  <button onClick={() => update(req.id, 'Fulfilled')} className="px-3 py-1 rounded-lg bg-blue-600 text-white text-xs">Forward to Dir.</button>
                </>}
                {req.status !== 'Pending' && <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">{req.status}</span>}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// S3-C-05 District Analytics
function CDVOAnalytics() {
  const usageData = khordhaBlocks.map(b => ({
    block: b.name,
    critical: b.criticalSkus,
    amber: b.amberSkus,
    healthy: b.healthySkus,
  }));

  return (
    <div className="space-y-6">
      <div className="glass-card rounded-2xl p-6">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div>
            <p className="text-xs font-semibold text-green-700">S3-C-05</p>
            <h3 className="text-slate-900">Block-wise SKU Status — Khordha</h3>
          </div>
          <DownloadButtons />
        </div>
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={usageData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="block" tick={{ fontSize: 11 }} />
            <YAxis tick={{ fontSize: 11 }} />
            <Tooltip />
            <Bar dataKey="healthy" fill="#16a34a" name="Healthy" stackId="a" radius={[0,0,0,0]} />
            <Bar dataKey="amber" fill="#d97706" name="Amber" stackId="a" />
            <Bar dataKey="critical" fill="#dc2626" name="Critical" stackId="a" radius={[3,3,0,0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="glass-card rounded-2xl p-6">
        <h3 className="text-slate-900 mb-3">Fulfilment Rate for Block Requests</h3>
        <div className="space-y-3">
          {khordhaBlocks.map(b => {
            const rate = b.criticalSkus === 0 ? 92 : b.criticalSkus === 1 ? 78 : 61;
            return (
              <div key={b.name} className="flex items-center gap-3">
                <p className="text-sm text-slate-700 w-28">{b.name}</p>
                <div className="flex-1 h-3 rounded-full bg-slate-200">
                  <div className="h-3 rounded-full" style={{ width: `${rate}%`, background: rate >= 85 ? '#16a34a' : rate >= 70 ? '#d97706' : '#dc2626' }} />
                </div>
                <p className="text-sm font-mono text-slate-700 w-10">{rate}%</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// CDVO Medicine Portal main export
export function CDVOMedicinePortal({ screen = 'dashboard', requisitions = initialMedicineRequisitions, onNavigate }: {
  screen?: CDVOMedScreen;
  requisitions?: MedicineRequisition[];
  onNavigate?: (page: string) => void;
}) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <div className="glass-card-darker rounded-2xl p-6">
        <p className="text-sm text-green-700 mb-1">Module 3 — CDVO Medicine Portal · Khordha District</p>
        <h2 className="text-2xl text-slate-900 mb-4">District Medicine Management</h2>
        <div className="flex flex-wrap gap-2">
          {cdvoScreens.map(([key, id, label]) => (
            <button key={key} onClick={() => onNavigate?.(cdvoRoutes[key])}
              className={`px-3 py-2 rounded-xl text-sm ${screen === key ? 'bg-green-600 text-white' : 'bg-white/70 text-slate-700'}`}>
              {id} {label}
            </button>
          ))}
        </div>
      </div>
      {screen === 'dashboard'  && <CDVODistrictDashboard onNavigate={onNavigate} />}
      {screen === 'inventory'  && <CDVOInventoryUpdate />}
      {screen === 'allocation' && <CDVOBlockAllocation />}
      {screen === 'approval'   && <CDVOBlockApproval requisitions={requisitions} />}
      {screen === 'analytics'  && <CDVOAnalytics />}
    </motion.div>
  );
}

// BVO Medicine Web Portal (S3-B-01, S3-B-02)
export function BVOMedicinePortal({ screen = 'dashboard', requisitions = initialMedicineRequisitions, onNavigate }: {
  screen?: BVOMedScreen;
  requisitions?: MedicineRequisition[];
  onNavigate?: (page: string) => void;
}) {
  const [reqs, setReqs] = useState<MedicineRequisition[]>(requisitions);
  const [toast, setToast] = useState('');
  const criticalItems = medicineStock.filter(s => s.stock < s.threshold);
  const amberItems = medicineStock.filter(s => s.stock >= s.threshold && s.stock < s.threshold * 1.5);

  const update = (id: string, status: MedicineRequisition['status']) => {
    setReqs(prev => prev.map(r => r.id === id ? { ...r, status } : r));
    setToast(`Request ${id} ${status.toLowerCase()}.`);
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <div className="glass-card-darker rounded-2xl p-6">
        <p className="text-sm text-green-700 mb-1">Module 3 — BVO Medicine Portal · Remuna Block</p>
        <h2 className="text-2xl text-slate-900 mb-4">Block Medicine Management</h2>
        <div className="flex flex-wrap gap-2">
          {bvoScreens.map(([key, id, label]) => (
            <button key={key} onClick={() => onNavigate?.(bvoRoutes[key])}
              className={`px-3 py-2 rounded-xl text-sm ${screen === key ? 'bg-green-600 text-white' : 'bg-white/70 text-slate-700'}`}>
              {id} {label}
            </button>
          ))}
        </div>
      </div>
      {screen === 'dashboard' && (
        <div className="space-y-6">
          {criticalItems.length > 0 && (
            <div className="p-4 rounded-xl bg-red-50 border border-red-200 flex items-start gap-3">
              <AlertTriangle className="text-red-600 mt-0.5" size={18} />
              <p className="text-sm text-red-900">Critical stock: {criticalItems.map(s => s.sku).join(', ')} — raise P0 request immediately.</p>
            </div>
          )}
          <div className="glass-card rounded-2xl p-6">
            <p className="text-xs font-semibold text-green-700 mb-1">S3-B-01</p>
            <h3 className="text-slate-900 mb-4">Block Medicine Inventory — Remuna Block</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {medicineStock.map(s => {
                const tone = s.stock < s.threshold ? 'bg-red-50 border-red-200 text-red-800' : s.stock < s.threshold * 1.5 ? 'bg-amber-50 border-amber-200 text-amber-800' : 'bg-green-50 border-green-200 text-green-800';
                return (
                  <div key={s.sku} className={`p-4 rounded-xl border ${tone}`}>
                    <p className="text-sm font-semibold">{s.sku}</p>
                    <p className="text-2xl font-mono">{s.stock}</p>
                    <p className="text-xs">{s.category} · threshold {s.threshold}</p>
                    <p className="text-xs opacity-70">Last used: {s.lastUsed}</p>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="glass-card rounded-2xl p-6">
            <h3 className="text-slate-900 mb-3">Non-updating LACs (7-day compliance)</h3>
            <div className="space-y-2">
              {['Remuna LAC-3 — last update 9 days ago', 'Basta LAC-1 — last update 12 days ago'].map(lac => (
                <div key={lac} className="p-3 rounded-xl bg-red-50 border border-red-200 flex items-center gap-2">
                  <AlertTriangle size={14} className="text-red-600" />
                  <p className="text-sm text-red-800">{lac}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      {screen === 'approval' && (
        <div className="glass-card rounded-2xl p-6">
          <p className="text-xs font-semibold text-green-700 mb-1">S3-B-02</p>
          <h3 className="text-slate-900 mb-4">LAC Requisition Approval</h3>
          {toast && <div className="mb-3 p-3 rounded-xl bg-green-50 border border-green-200 text-sm text-green-800">{toast}</div>}
          <div className="space-y-3">
            {reqs.map(req => (
              <div key={req.id} className={`p-4 rounded-xl border ${req.urgency === 'P0' ? 'bg-red-50 border-red-200' : 'bg-white/80 border-white/40'}`}>
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold text-slate-900">{req.source}: {req.medicine}</p>
                    <p className="text-xs text-slate-600">{req.quantity} units · {req.submittedAt}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 rounded-full text-xs ${req.urgency === 'P0' ? 'bg-red-600 text-white' : 'bg-slate-200 text-slate-700'}`}>{req.urgency}</span>
                    {req.status === 'Pending' && <>
                      <button onClick={() => update(req.id, 'Approved')} className="px-3 py-1 rounded-lg bg-green-600 text-white text-xs">Approve</button>
                      <button onClick={() => update(req.id, 'Approved')} className="px-3 py-1 rounded-lg bg-blue-600 text-white text-xs flex items-center gap-1">
                        <ArrowRight size={12} /> Forward to CDVO
                      </button>
                    </>}
                    {req.status !== 'Pending' && <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">{req.status}</span>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
}
