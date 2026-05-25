import { useState } from 'react';
import { motion } from 'motion/react';
import {
  AlertTriangle, ArrowRightLeft, BarChart3, Barcode, CheckCircle2,
  Download, PackageCheck, Send, ShieldAlert, Sparkles, TrendingUp,
} from 'lucide-react';
import {
  Area, AreaChart, Bar, BarChart, CartesianGrid, Cell, Legend,
  Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis,
} from 'recharts';
import {
  arimaForecastGanjam, centralMedicineSKUs, directorateRequisitions,
  DirectorateRequisition, districtMedicineStocks, DistrictMedicineStock,
  empanelledVendors, medicineAnomalyAlerts, medicineUsageTrends,
} from '../data/medicineDirectorateData';

export type MedDirScreen = 'dashboard' | 'ccd' | 'allocation' | 'redistribution' | 'requisitions' | 'analytics';

const screens: Array<[MedDirScreen, string, string, string]> = [
  ['dashboard',    'S3-D-01', 'State Dashboard',   'med-dir-dashboard'],
  ['ccd',          'S3-D-02', 'CCD Scanning',       'med-dir-ccd'],
  ['allocation',   'S3-D-03', 'Allocation',         'med-dir-allocation'],
  ['redistribution','S3-D-04','Redistribution',     'med-dir-redistribution'],
  ['requisitions', 'S3-D-05', 'Requisitions',       'med-dir-requisitions'],
  ['analytics',    'S3-D-06', 'Analytics',          'med-dir-analytics'],
];

const routes: Record<MedDirScreen, string> = {
  dashboard: 'med-dir-dashboard', ccd: 'med-dir-ccd',
  allocation: 'med-dir-allocation', redistribution: 'med-dir-redistribution',
  requisitions: 'med-dir-requisitions', analytics: 'med-dir-analytics',
};

interface MedDirProps {
  screen?: MedDirScreen;
  onNavigate?: (page: string) => void;
}

const fmt = (v: number) => new Intl.NumberFormat('en-IN').format(v);

const districtTone = (d: DistrictMedicineStock) => {
  if (d.criticalSkus >= 4) return { bg: '#fee2e2', border: '#fca5a5', text: '#991b1b', fill: '#dc2626' };
  if (d.criticalSkus >= 1 || d.amberSkus >= 4) return { bg: '#fef3c7', border: '#fcd34d', text: '#92400e', fill: '#d97706' };
  return { bg: '#dcfce7', border: '#86efac', text: '#166534', fill: '#16a34a' };
};

const urgencyStyle = (u: string) => {
  if (u === 'P0') return 'bg-red-600 text-white';
  if (u === 'P1') return 'bg-orange-500 text-white';
  if (u === 'P2') return 'bg-amber-400 text-slate-900';
  return 'bg-slate-200 text-slate-700';
};

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

function TopTabs({ active, onNavigate }: { active: MedDirScreen; onNavigate?: (page: string) => void }) {
  return (
    <div className="flex flex-wrap gap-2">
      {screens.map(([key, id, label]) => (
        <button key={key} onClick={() => onNavigate?.(routes[key])}
          className={`px-3 py-2 rounded-xl text-sm ${active === key ? 'bg-green-600 text-white' : 'bg-white/70 text-slate-700'}`}>
          {id} {label}
        </button>
      ))}
    </div>
  );
}

// S3-D-01 State Medicine Dashboard
function StateMedicineDashboard({ districts, onNavigate }: { districts: DistrictMedicineStock[]; onNavigate?: (page: string) => void }) {
  const totalCritical = districts.reduce((s, d) => s + d.criticalSkus, 0);
  const totalP0 = districts.reduce((s, d) => s + d.p0Requests, 0);
  const nonReporting = districts.filter(d => !d.reporting).length;
  const stockOutDistricts = districts.filter(d => d.criticalSkus > 0).length;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="glass-card rounded-xl p-4">
          <PackageCheck className="text-green-700 mb-2" size={22} />
          <p className="text-sm text-slate-600">Districts with critical SKUs</p>
          <p className="text-3xl font-mono text-red-700">{stockOutDistricts}</p>
          <p className="text-xs text-slate-500">of 30 districts</p>
        </div>
        <div className="glass-card rounded-xl p-4">
          <AlertTriangle className="text-red-700 mb-2" size={22} />
          <p className="text-sm text-slate-600">P0 emergency requests</p>
          <p className="text-3xl font-mono text-red-700">{totalP0}</p>
          <p className="text-xs text-slate-500">active today</p>
        </div>
        <div className="glass-card rounded-xl p-4">
          <BarChart3 className="text-amber-700 mb-2" size={22} />
          <p className="text-sm text-slate-600">Total critical SKU instances</p>
          <p className="text-3xl font-mono text-amber-700">{totalCritical}</p>
          <p className="text-xs text-slate-500">across all districts</p>
        </div>
        <div className="glass-card rounded-xl p-4">
          <ShieldAlert className="text-slate-700 mb-2" size={22} />
          <p className="text-sm text-slate-600">Non-reporting districts</p>
          <p className="text-3xl font-mono text-slate-700">{nonReporting}</p>
          <p className="text-xs text-slate-500">data compliance gap</p>
        </div>
      </div>

      {/* Anomaly alerts */}
      <div className="glass-card rounded-2xl p-6">
        <div className="flex items-center gap-2 mb-4">
          <AlertTriangle className="text-red-600" size={20} />
          <h3 className="text-slate-900">AI Anomaly Detection Alerts</h3>
        </div>
        <div className="space-y-3">
          {medicineAnomalyAlerts.map(alert => (
            <div key={alert.id} className={`p-4 rounded-xl border ${alert.severity === 'critical' ? 'bg-red-50 border-red-200' : alert.severity === 'high' ? 'bg-orange-50 border-orange-200' : 'bg-amber-50 border-amber-200'}`}>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold text-slate-900">
                    Suspicious: {alert.lac} logged {alert.quantity} units of {alert.sku} in {alert.window} ({Math.round(alert.quantity / alert.avgNormal)}x average). Flagged for review.
                  </p>
                  <p className="text-xs text-slate-600 mt-1">{alert.district} · {alert.time}</p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs whitespace-nowrap ${alert.severity === 'critical' ? 'bg-red-600 text-white' : 'bg-orange-500 text-white'}`}>{alert.severity.toUpperCase()}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* District heatmap */}
      <div className="glass-card rounded-2xl p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-xs font-semibold text-green-700">S3-D-01</p>
            <h3 className="text-slate-900">State-wide Medicine Inventory Heatmap</h3>
            <p className="text-sm text-slate-600">Click district to drill down. Green = healthy, Amber = watch, Red = critical.</p>
          </div>
          <div className="flex items-center gap-3 text-xs text-slate-600">
            {[['#dcfce7','#86efac','Healthy'],['#fef3c7','#fcd34d','Watch'],['#fee2e2','#fca5a5','Critical']].map(([bg,border,label]) => (
              <span key={label} className="flex items-center gap-1">
                <span className="w-3 h-3 rounded-full" style={{ background: bg, border: `1px solid ${border}` }} />
                {label}
              </span>
            ))}
          </div>
        </div>
        <div className="grid gap-2" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))' }}>
          {districts.map(d => {
            const tone = districtTone(d);
            return (
              <button key={d.id} className="text-left rounded-xl p-3 border button-press"
                style={{ background: tone.bg, borderColor: tone.border }}
                onClick={() => onNavigate?.('med-cdvo-dashboard')}>
                <p className="text-xs font-semibold" style={{ color: tone.text }}>{d.name}</p>
                <p className="text-xs mt-1" style={{ color: tone.text }}>{d.criticalSkus} critical</p>
                {d.p0Requests > 0 && <p className="text-xs font-bold text-red-700">P0: {d.p0Requests}</p>}
                {!d.reporting && <p className="text-xs text-red-600">No report</p>}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// S3-D-02 CCD Scanning
function CCDScanScreen() {
  const [mode, setMode] = useState<'inflow' | 'outflow'>('inflow');
  const [scanned, setScanned] = useState(false);
  const [qty, setQty] = useState(500);
  const [toast, setToast] = useState('');
  const sku = centralMedicineSKUs[2]; // FMD Vaccine

  const handleScan = () => setScanned(true);
  const handleConfirm = () => {
    setToast(`${mode === 'inflow' ? '+' : '-'}${qty} ${sku.sku} recorded. State inventory updated immediately.`);
    setScanned(false);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="glass-card rounded-2xl p-6">
        <p className="text-xs font-semibold text-green-700 mb-1">S3-D-02</p>
        <h3 className="text-slate-900 mb-4">CCD Barcode Scan — Inventory Update</h3>
        <div className="flex gap-3 mb-5">
          {(['inflow', 'outflow'] as const).map(m => (
            <button key={m} onClick={() => setMode(m)}
              className={`flex-1 py-3 rounded-xl text-sm font-semibold ${mode === m ? 'bg-green-600 text-white' : 'bg-white/70 text-slate-700'}`}>
              {m === 'inflow' ? '↓ Inflow (Receipt)' : '↑ Outflow (Dispatch)'}
            </button>
          ))}
        </div>
        <div className="p-6 rounded-2xl bg-slate-900 text-center mb-4">
          <Barcode size={64} className="mx-auto text-green-400 mb-3" />
          <p className="text-green-300 text-sm">CCD Scanner Interface</p>
          {scanned ? (
            <div className="mt-3 p-3 rounded-xl bg-green-900 text-green-200 text-sm">
              ✓ Barcode {sku.barcode} identified: {sku.sku}
            </div>
          ) : (
            <button onClick={handleScan} className="mt-3 px-5 py-2 rounded-xl bg-green-600 text-white text-sm">
              Simulate Scan
            </button>
          )}
        </div>
        {scanned && (
          <div className="space-y-3">
            <div className="p-3 rounded-xl bg-green-50 border border-green-200">
              <p className="text-sm font-semibold text-green-900">{sku.sku}</p>
              <p className="text-xs text-green-700">{sku.category} · {sku.barcode}</p>
            </div>
            <label className="text-sm text-slate-700">Quantity
              <input type="number" value={qty} onChange={e => setQty(Number(e.target.value))}
                className="w-full mt-1 px-3 py-2 rounded-xl bg-white/70 border border-white/30" />
            </label>
            <button onClick={handleConfirm} className="w-full p-3 rounded-xl bg-green-600 text-white flex items-center justify-center gap-2">
              <CheckCircle2 size={16} /> Confirm {mode === 'inflow' ? 'Receipt' : 'Dispatch'}
            </button>
          </div>
        )}
        {toast && <div className="mt-3 p-3 rounded-xl bg-green-50 border border-green-200 text-sm text-green-800">{toast}</div>}
      </div>
      <div className="glass-card rounded-2xl p-6">
        <h3 className="text-slate-900 mb-4">Manual Override (No Scanner)</h3>
        <label className="text-sm text-slate-700">SKU Name
          <select className="w-full mt-1 mb-3 px-3 py-2 rounded-xl bg-white/70 border border-white/30">
            {centralMedicineSKUs.map(s => <option key={s.sku}>{s.sku}</option>)}
          </select>
        </label>
        <label className="text-sm text-slate-700">Quantity
          <input type="number" defaultValue={200} className="w-full mt-1 mb-3 px-3 py-2 rounded-xl bg-white/70 border border-white/30" />
        </label>
        <button className="w-full p-3 rounded-xl bg-slate-700 text-white">Update Inventory Manually</button>
        <div className="mt-4 space-y-2">
          <p className="text-xs font-semibold text-slate-600">Central Store SKU Levels</p>
          {centralMedicineSKUs.slice(0, 5).map(s => {
            const pct = Math.round((s.centralStock / (s.threshold * 5)) * 100);
            const tone = s.centralStock < s.threshold ? '#dc2626' : s.centralStock < s.threshold * 2 ? '#d97706' : '#16a34a';
            return (
              <div key={s.sku} className="flex items-center gap-3">
                <p className="text-xs text-slate-700 w-36 truncate">{s.sku}</p>
                <div className="flex-1 h-2 rounded-full bg-slate-200">
                  <div className="h-2 rounded-full" style={{ width: `${Math.min(pct, 100)}%`, background: tone }} />
                </div>
                <p className="text-xs font-mono text-slate-700 w-16 text-right">{fmt(s.centralStock)}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// S3-D-03 Medicine Allocation to Districts
function MedicineAllocationScreen({ districts }: { districts: DistrictMedicineStock[] }) {
  const [district, setDistrict] = useState('Ganjam');
  const [sku, setSku] = useState('FMD Vaccine');
  const [mode, setMode] = useState<'numbers' | 'percent'>('numbers');
  const [qty, setQty] = useState(2400);
  const [pickupDate, setPickupDate] = useState('2026-05-25');
  const [pickupTime, setPickupTime] = useState('10:00');
  const [toast, setToast] = useState('');
  const skuData = centralMedicineSKUs.find(s => s.sku === sku) ?? centralMedicineSKUs[0];
  const allocQty = mode === 'percent' ? Math.round((skuData.centralStock * qty) / 100) : qty;
  const aiSuggestion = sku === 'FMD Vaccine' && district === 'Ganjam';

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="glass-card rounded-2xl p-6 lg:col-span-2">
        <p className="text-xs font-semibold text-green-700 mb-1">S3-D-03</p>
        <h3 className="text-slate-900 mb-4">Medicine Allocation to Districts</h3>
        {aiSuggestion && (
          <div className="p-4 rounded-xl bg-green-50 border border-green-200 mb-4 flex items-start gap-3">
            <Sparkles className="text-green-700 mt-0.5" size={18} />
            <div>
              <p className="text-sm font-semibold text-green-900">AI Suggestion: Based on livestock population and last 3 months usage, recommend 2,400 units to Ganjam vs current plan of 1,800.</p>
              <button onClick={() => setQty(2400)} className="mt-2 px-3 py-1 rounded-lg bg-green-600 text-white text-xs">Apply AI Suggestion</button>
            </div>
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <label className="text-sm text-slate-700">District
            <select value={district} onChange={e => setDistrict(e.target.value)} className="w-full mt-1 px-3 py-2 rounded-xl bg-white/70 border border-white/30">
              {districts.map(d => <option key={d.id}>{d.name}</option>)}
            </select>
          </label>
          <label className="text-sm text-slate-700">SKU Name
            <select value={sku} onChange={e => setSku(e.target.value)} className="w-full mt-1 px-3 py-2 rounded-xl bg-white/70 border border-white/30">
              {centralMedicineSKUs.map(s => <option key={s.sku}>{s.sku}</option>)}
            </select>
          </label>
          <label className="text-sm text-slate-700">Quantity Mode
            <select value={mode} onChange={e => setMode(e.target.value as 'numbers' | 'percent')} className="w-full mt-1 px-3 py-2 rounded-xl bg-white/70 border border-white/30">
              <option value="numbers">Numbers</option>
              <option value="percent">% of central stock</option>
            </select>
          </label>
          <label className="text-sm text-slate-700">Quantity
            <input type="number" value={qty} onChange={e => setQty(Number(e.target.value))} className="w-full mt-1 px-3 py-2 rounded-xl bg-white/70 border border-white/30" />
          </label>
          <label className="text-sm text-slate-700">Pickup Date
            <input type="date" value={pickupDate} onChange={e => setPickupDate(e.target.value)} className="w-full mt-1 px-3 py-2 rounded-xl bg-white/70 border border-white/30" />
          </label>
          <label className="text-sm text-slate-700">Pickup Time
            <input type="time" value={pickupTime} onChange={e => setPickupTime(e.target.value)} className="w-full mt-1 px-3 py-2 rounded-xl bg-white/70 border border-white/30" />
          </label>
        </div>
        <button onClick={() => setToast(`${fmt(allocQty)} ${sku} allocated to ${district}. District inventory updated in real time.`)}
          className="mt-5 px-5 py-3 rounded-xl bg-green-600 text-white flex items-center gap-2">
          <Send size={16} /> Submit Allocation
        </button>
        {toast && <div className="mt-3 p-3 rounded-xl bg-green-50 border border-green-200 text-sm text-green-800">{toast}</div>}
      </div>
      <div className="glass-card rounded-2xl p-6">
        <h3 className="text-slate-900 mb-4">Live Preview</h3>
        <div className="space-y-3">
          <div className="p-4 rounded-xl bg-white/60 border border-white/30">
            <p className="text-xs text-slate-600">Central store stock</p>
            <p className="text-3xl font-mono text-slate-900">{fmt(skuData.centralStock)}</p>
            <p className="text-xs text-slate-500">{sku}</p>
          </div>
          <div className="p-4 rounded-xl bg-green-50 border border-green-200">
            <p className="text-xs text-green-700">After allocation to {district}</p>
            <p className="text-3xl font-mono text-green-800">{fmt(Math.max(0, skuData.centralStock - allocQty))}</p>
            <p className="text-xs text-green-700 mt-1">Pickup: {pickupDate} at {pickupTime}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// S3-D-04 Redistribution Between Districts
function MedicineRedistributionScreen({ districts }: { districts: DistrictMedicineStock[] }) {
  const [donor, setDonor] = useState('Balasore');
  const [recipient, setRecipient] = useState('Ganjam');
  const [sku, setSku] = useState('FMD Vaccine');
  const [qty, setQty] = useState(3000);
  const [toast, setToast] = useState('');

  const surplusDistricts = districts.filter(d => d.criticalSkus === 0 && d.amberSkus <= 1);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="glass-card rounded-2xl p-6 lg:col-span-2">
        <p className="text-xs font-semibold text-green-700 mb-1">S3-D-04</p>
        <h3 className="text-slate-900 mb-4">Redistribution Between Districts</h3>
        <div className="p-4 rounded-xl bg-green-50 border border-green-200 mb-4 flex items-start gap-3">
          <Sparkles className="text-green-700 mt-0.5" size={18} />
          <p className="text-sm font-semibold text-green-900">AI Suggestion: Balasore has surplus FMD Vaccine — recommend sending 3,000 doses to Ganjam (P0 emergency).</p>
        </div>
        <div className="p-4 rounded-xl bg-white/60 border border-white/30 mb-4">
          <p className="text-xs font-semibold text-slate-600 mb-2">Districts with surplus stock</p>
          <div className="flex flex-wrap gap-2">
            {surplusDistricts.slice(0, 6).map(d => (
              <button key={d.id} onClick={() => setDonor(d.name)}
                className={`px-3 py-1 rounded-full text-xs ${donor === d.name ? 'bg-green-600 text-white' : 'bg-green-100 text-green-800'}`}>
                {d.name}
              </button>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <label className="text-sm text-slate-700">Donor District (surplus)
            <select value={donor} onChange={e => setDonor(e.target.value)} className="w-full mt-1 px-3 py-2 rounded-xl bg-white/70 border border-white/30">
              {districts.map(d => <option key={d.id}>{d.name}</option>)}
            </select>
          </label>
          <label className="text-sm text-slate-700">Recipient District (deficit)
            <select value={recipient} onChange={e => setRecipient(e.target.value)} className="w-full mt-1 px-3 py-2 rounded-xl bg-white/70 border border-white/30">
              {districts.map(d => <option key={d.id}>{d.name}</option>)}
            </select>
          </label>
          <label className="text-sm text-slate-700">SKU
            <select value={sku} onChange={e => setSku(e.target.value)} className="w-full mt-1 px-3 py-2 rounded-xl bg-white/70 border border-white/30">
              {centralMedicineSKUs.map(s => <option key={s.sku}>{s.sku}</option>)}
            </select>
          </label>
          <label className="text-sm text-slate-700">Quantity
            <input type="number" value={qty} onChange={e => setQty(Number(e.target.value))} className="w-full mt-1 px-3 py-2 rounded-xl bg-white/70 border border-white/30" />
          </label>
          <label className="text-sm text-slate-700">Donor Pickup Date
            <input type="date" defaultValue="2026-05-24" className="w-full mt-1 px-3 py-2 rounded-xl bg-white/70 border border-white/30" />
          </label>
          <label className="text-sm text-slate-700">Recipient Delivery Date
            <input type="date" defaultValue="2026-05-25" className="w-full mt-1 px-3 py-2 rounded-xl bg-white/70 border border-white/30" />
          </label>
        </div>
        <button onClick={() => setToast(`${fmt(qty)} ${sku} moved from ${donor} to ${recipient}. Both district inventories updated instantly.`)}
          className="mt-5 px-5 py-3 rounded-xl bg-green-600 text-white flex items-center gap-2">
          <ArrowRightLeft size={16} /> Confirm Redistribution
        </button>
        {toast && <div className="mt-3 p-3 rounded-xl bg-green-50 border border-green-200 text-sm text-green-800">{toast}</div>}
      </div>
      <div className="glass-card rounded-2xl p-6">
        <h3 className="text-slate-900 mb-4">Before / After</h3>
        <div className="space-y-3">
          <div className="p-3 rounded-xl bg-white/60 border border-white/30">
            <p className="text-xs text-slate-600">{donor} (donor)</p>
            <p className="text-sm font-semibold text-green-700">Surplus → -{fmt(qty)}</p>
          </div>
          <div className="p-3 rounded-xl bg-red-50 border border-red-200">
            <p className="text-xs text-slate-600">{recipient} (recipient)</p>
            <p className="text-sm font-semibold text-red-700">Critical → +{fmt(qty)}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// S3-D-05 Requisition Request Management
function RequisitionManagement() {
  const [reqs, setReqs] = useState<DirectorateRequisition[]>(directorateRequisitions);
  const [filter, setFilter] = useState<string>('All');
  const [toast, setToast] = useState('');

  const filtered = filter === 'All' ? reqs : reqs.filter(r => r.urgency === filter || r.status === filter);
  const pending = reqs.filter(r => r.status === 'Pending').length;
  const approved = reqs.filter(r => r.status === 'Approved').length;
  const fulfilled = reqs.filter(r => r.status === 'Fulfilled').length;

  const updateStatus = (id: string, status: DirectorateRequisition['status'], vendor?: string) => {
    setReqs(prev => prev.map(r => r.id === id ? { ...r, status, vendor: vendor ?? r.vendor, approvedAt: 'Just now' } : r));
    setToast(`Request ${id} updated to ${status}.`);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="glass-card rounded-xl p-4"><p className="text-sm text-slate-600">Pending</p><p className="text-3xl font-mono text-amber-700">{pending}</p></div>
        <div className="glass-card rounded-xl p-4"><p className="text-sm text-slate-600">Approved</p><p className="text-3xl font-mono text-blue-700">{approved}</p></div>
        <div className="glass-card rounded-xl p-4"><p className="text-sm text-slate-600">Fulfilled</p><p className="text-3xl font-mono text-green-700">{fulfilled}</p></div>
        <div className="glass-card rounded-xl p-4"><p className="text-sm text-slate-600">Avg approval time</p><p className="text-3xl font-mono text-slate-700">4.2h</p></div>
      </div>
      <div className="glass-card rounded-2xl p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-xs font-semibold text-green-700">S3-D-05</p>
            <h3 className="text-slate-900">All District Requisition Requests</h3>
          </div>
          <div className="flex gap-2">
            {['All', 'P0', 'P1', 'P2', 'P3', 'Pending', 'Approved'].map(f => (
              <button key={f} onClick={() => setFilter(f)}
                className={`px-3 py-1 rounded-xl text-xs ${filter === f ? 'bg-green-600 text-white' : 'bg-white/70 text-slate-700'}`}>{f}</button>
            ))}
          </div>
        </div>
        {toast && <div className="mb-3 p-3 rounded-xl bg-green-50 border border-green-200 text-sm text-green-800">{toast}</div>}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px]">
            <thead>
              <tr className="text-left text-xs text-slate-600 border-b">
                <th className="py-3 pr-4">ID</th><th className="pr-4">District</th><th className="pr-4">SKU</th>
                <th className="pr-4">Qty</th><th className="pr-4">Urgency</th><th className="pr-4">Status</th>
                <th className="pr-4">Submitted</th><th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(req => (
                <tr key={req.id} className="border-b border-white/40 text-sm">
                  <td className="py-3 pr-4 font-mono text-xs">{req.id}</td>
                  <td className="pr-4">{req.district}</td>
                  <td className="pr-4">{req.sku}</td>
                  <td className="pr-4 font-mono">{fmt(req.quantity)}</td>
                  <td className="pr-4"><span className={`px-2 py-1 rounded-full text-xs ${urgencyStyle(req.urgency)}`}>{req.urgency}</span></td>
                  <td className="pr-4"><span className={`px-2 py-1 rounded-full text-xs ${req.status === 'Fulfilled' ? 'bg-green-100 text-green-800' : req.status === 'Approved' ? 'bg-blue-100 text-blue-800' : req.status === 'Procurement' ? 'bg-purple-100 text-purple-800' : 'bg-amber-100 text-amber-800'}`}>{req.status}</span></td>
                  <td className="pr-4 text-xs text-slate-500">{req.submittedAt}</td>
                  <td>
                    <div className="flex gap-1">
                      {req.status === 'Pending' && <>
                        <button onClick={() => updateStatus(req.id, 'Approved')} className="px-2 py-1 rounded-lg bg-green-600 text-white text-xs">Approve</button>
                        <button onClick={() => updateStatus(req.id, 'Rejected')} className="px-2 py-1 rounded-lg bg-red-600 text-white text-xs">Reject</button>
                        <button onClick={() => updateStatus(req.id, 'Procurement', empanelledVendors[0])} className="px-2 py-1 rounded-lg bg-purple-600 text-white text-xs">Procure</button>
                      </>}
                      {req.status === 'Approved' && <button onClick={() => updateStatus(req.id, 'Fulfilled')} className="px-2 py-1 rounded-lg bg-blue-600 text-white text-xs">Fulfil</button>}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// S3-D-06 Analytics Dashboard with ARIMA
function MedicineAnalyticsDashboard() {
  const [selectedDistrict, setSelectedDistrict] = useState('Ganjam');
  const [selectedSku, setSelectedSku] = useState('Amoxicillin 500mg');

  return (
    <div className="space-y-6">
      <div className="glass-card rounded-2xl p-6">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div>
            <p className="text-xs font-semibold text-green-700">S3-D-06 AI MOMENT</p>
            <h3 className="text-slate-900">ARIMA Demand Forecast — {selectedSku} in {selectedDistrict}</h3>
            <p className="text-sm text-slate-600">Predicted spike in 3 weeks. Procurement request auto-raised 2 weeks early.</p>
          </div>
          <div className="flex gap-3">
            <select value={selectedDistrict} onChange={e => setSelectedDistrict(e.target.value)}
              className="px-3 py-2 rounded-xl bg-white/70 border border-white/30 text-sm">
              {['Ganjam', 'Koraput', 'Cuttack', 'Balasore', 'Malkangiri'].map(d => <option key={d}>{d}</option>)}
            </select>
            <select value={selectedSku} onChange={e => setSelectedSku(e.target.value)}
              className="px-3 py-2 rounded-xl bg-white/70 border border-white/30 text-sm">
              {centralMedicineSKUs.map(s => <option key={s.sku}>{s.sku}</option>)}
            </select>
          </div>
        </div>
        <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 mb-4 flex items-start gap-2">
          <AlertTriangle size={16} className="text-amber-700 mt-0.5" />
          <p className="text-sm text-amber-900">AI Forecast: Demand for {selectedSku} in {selectedDistrict} predicted to spike to 1,180 units/week by W3 Jun — 83% above current average. Procurement request DR-002 auto-raised on 2026-05-08.</p>
        </div>
        <ResponsiveContainer width="100%" height={320}>
          <AreaChart data={arimaForecastGanjam} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="week" tick={{ fontSize: 11 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip />
            <Legend />
            <Area type="monotone" dataKey="actual" stroke="#16a34a" fill="#dcfce7" strokeWidth={2} name="Actual Usage" connectNulls={false} />
            <Area type="monotone" dataKey="forecast" stroke="#d97706" fill="#fef3c7" strokeWidth={2} strokeDasharray="6 3" name="ARIMA Forecast" connectNulls={false} />
            <Area type="monotone" dataKey="upper" stroke="#fca5a5" fill="none" strokeWidth={1} strokeDasharray="3 3" name="Upper Bound" connectNulls={false} />
            <Area type="monotone" dataKey="lower" stroke="#fca5a5" fill="none" strokeWidth={1} strokeDasharray="3 3" name="Lower Bound" connectNulls={false} />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="glass-card rounded-2xl p-6">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div>
            <p className="text-xs font-semibold text-green-700">S3-D-06</p>
            <h3 className="text-slate-900">Medicine Usage Trends by Category</h3>
          </div>
          <DownloadButtons />
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={medicineUsageTrends.slice(-8)} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="period" tick={{ fontSize: 10 }} />
            <YAxis tick={{ fontSize: 11 }} />
            <Tooltip />
            <Legend />
            <Bar dataKey="antibiotics" fill="#3b82f6" name="Antibiotics" radius={[3,3,0,0]} />
            <Bar dataKey="vaccines" fill="#16a34a" name="Vaccines" radius={[3,3,0,0]} />
            <Bar dataKey="antiparasitic" fill="#d97706" name="Antiparasitic" radius={[3,3,0,0]} />
            <Bar dataKey="supplements" fill="#8b5cf6" name="Supplements" radius={[3,3,0,0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="glass-card rounded-2xl p-6">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div>
            <p className="text-xs font-semibold text-green-700">NUMERICAL FORECAST TABLE</p>
            <h3 className="text-slate-900">District vs Projected Demand (Next 4 Weeks)</h3>
          </div>
          <DownloadButtons />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px]">
            <thead>
              <tr className="text-left text-xs text-slate-600 border-b">
                <th className="py-3 pr-4">District</th>
                <th className="pr-4">W3 May</th><th className="pr-4">W4 May</th>
                <th className="pr-4">W1 Jun</th><th className="pr-4">W2 Jun</th>
                <th>Trend</th>
              </tr>
            </thead>
            <tbody>
              {[
                { d: 'Ganjam',     w3: 680, w4: 720, w1: 890, w2: 1050, trend: 'up' },
                { d: 'Koraput',    w3: 420, w4: 450, w1: 510, w2: 580,  trend: 'up' },
                { d: 'Cuttack',    w3: 380, w4: 390, w1: 400, w2: 410,  trend: 'stable' },
                { d: 'Malkangiri', w3: 290, w4: 320, w1: 380, w2: 440,  trend: 'up' },
                { d: 'Balasore',   w3: 310, w4: 300, w1: 295, w2: 290,  trend: 'down' },
              ].map(row => (
                <tr key={row.d} className="border-b border-white/40 text-sm">
                  <td className="py-3 pr-4 font-semibold">{row.d}</td>
                  <td className="pr-4 font-mono">{row.w3}</td>
                  <td className="pr-4 font-mono">{row.w4}</td>
                  <td className="pr-4 font-mono">{row.w1}</td>
                  <td className="pr-4 font-mono">{row.w2}</td>
                  <td><TrendingUp size={16} className={row.trend === 'up' ? 'text-red-600' : row.trend === 'down' ? 'text-green-600' : 'text-slate-400'} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// Main export
export function MedicineDirectoratePortal({ screen = 'dashboard', onNavigate }: MedDirProps) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <div className="glass-card-darker rounded-2xl p-6">
        <p className="text-sm text-green-700 mb-1">Module 3 — Directorate Medicine Portal</p>
        <h2 className="text-2xl text-slate-900 mb-4">Medicine Procurement & Distribution</h2>
        <TopTabs active={screen} onNavigate={onNavigate} />
      </div>
      {screen === 'dashboard'      && <StateMedicineDashboard districts={districtMedicineStocks} onNavigate={onNavigate} />}
      {screen === 'ccd'            && <CCDScanScreen />}
      {screen === 'allocation'     && <MedicineAllocationScreen districts={districtMedicineStocks} />}
      {screen === 'redistribution' && <MedicineRedistributionScreen districts={districtMedicineStocks} />}
      {screen === 'requisitions'   && <RequisitionManagement />}
      {screen === 'analytics'      && <MedicineAnalyticsDashboard />}
    </motion.div>
  );
}
