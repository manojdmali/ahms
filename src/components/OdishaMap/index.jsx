import React, { useState, useMemo } from 'react';
import './OdishaMap.css';
import OdishaMapCore from './OdishaMapCore.jsx';
import {
  odishaDistricts as DEFAULT_DISTRICTS,
  anomalyAlerts   as DEFAULT_ALERTS,
  restockRequests as DEFAULT_RESTOCK,
  getStatus,
  STATUS_COLORS,
  statusLabel,
  stockPct,
} from './data.js';

// ─────────────────────────────────────────────────────────────────────────────
// OdishaMapDashboard  –  Full plug-and-play dashboard
//
// Props (all optional – defaults to built-in data):
//   districts        – DistrictData[]
//   alerts           – AnomalyAlert[]
//   restockRequests  – RestockRequest[]
//   svgUrl           – path to odisha-map.svg  (default: '/odisha-map.svg')
//   title            – string
//   subtitle         – string
//   onDistrictClick(district) – callback
//   className        – extra class on root
// ─────────────────────────────────────────────────────────────────────────────

export default function OdishaMapDashboard({
  districts       = DEFAULT_DISTRICTS,
  alerts          = DEFAULT_ALERTS,
  restockRequests = DEFAULT_RESTOCK,
  svgUrl          = '/odisha-map.svg',
  title           = 'Odisha Semen Stock Intelligence',
  subtitle        = 'Animal Husbandry & Veterinary Services · District-level Dashboard',
  onDistrictClick,
  className = '',
}) {
  const [activeTab,    setActiveTab]    = useState('districts');
  const [sortKey,      setSortKey]      = useState('stock');
  const [search,       setSearch]       = useState('');
  const [selectedName, setSelectedName] = useState(null);

  // ── KPI calculations ──────────────────────────────────────────────────────
  const kpis = useMemo(() => {
    const total    = districts.reduce((s, d) => s + d.stock, 0);
    const critical = districts.filter(d => getStatus(d) === 'critical').length;
    const reporting= districts.filter(d => d.reporting).length;
    const withDays = districts.filter(d => d.daysToStockout !== null);
    const avgDays  = withDays.length
      ? Math.round(withDays.reduce((s, d) => s + d.daysToStockout, 0) / withDays.length)
      : 0;
    return { total, critical, reporting, avgDays, total30: districts.length };
  }, [districts]);

  // ── Sorted + filtered district list ──────────────────────────────────────
  const sortedDistricts = useMemo(() => {
    let list = search
      ? districts.filter(d => d.name.toLowerCase().includes(search.toLowerCase()))
      : [...districts];

    if (sortKey === 'stock')    list.sort((a, b) => b.stock - a.stock);
    if (sortKey === 'days')     list.sort((a, b) => (a.daysToStockout ?? 999) - (b.daysToStockout ?? 999));
    if (sortKey === 'name')     list.sort((a, b) => a.name.localeCompare(b.name));
    if (sortKey === 'critical') {
      const order = { critical:0, warning:1, good:2, surplus:3 };
      list.sort((a, b) => order[getStatus(a)] - order[getStatus(b)]);
    }
    return list;
  }, [districts, search, sortKey]);

  const maxStock = useMemo(() => Math.max(...districts.map(d => d.stock)), [districts]);

  // ── Urgency list (≤15 days) ───────────────────────────────────────────────
  const urgencyList = useMemo(() =>
    [...districts]
      .filter(d => d.daysToStockout !== null && d.daysToStockout <= 15)
      .sort((a, b) => a.daysToStockout - b.daysToStockout),
    [districts]
  );

  // ── Handlers ─────────────────────────────────────────────────────────────
  function handleDistrictClick(d) {
    setSelectedName(prev => prev === d.name ? null : d.name);
    setActiveTab('districts');
    if (onDistrictClick) onDistrictClick(d);
  }

  function handleListItemClick(name) {
    setSelectedName(prev => prev === name ? null : name);
  }

  return (
    <div className={`odisha-map-root ${className}`}>

      {/* ── Top Bar ── */}
      <div className="om-top-bar">
        <div className="om-top-bar-left">
          <div className="om-logo">🧬</div>
          <div>
            <div className="om-title">{title}</div>
            <div className="om-subtitle">{subtitle}</div>
          </div>
        </div>
        <div className="om-live-badge">
          <div className="om-live-dot" />
          Live · Updated 2h ago
        </div>
      </div>

      {/* ── Dashboard Grid ── */}
      <div className="om-dashboard">

        {/* ── Left: Map Panel ── */}
        <div className="om-map-panel">

          {/* KPI Row */}
          <div className="om-kpi-row">
            <KpiCard
              accent="#4ade80"
              label="Total Stock"
              value={kpis.total.toLocaleString()}
              sub={`Doses across ${kpis.total30} districts`}
              trend="up"
              trendText="↑ 8.2% vs last month"
            />
            <KpiCard
              accent="#f87171"
              label="Critical Districts"
              value={kpis.critical}
              sub="Stock < 10 days"
              trend="down"
              trendText="Immediate action needed"
            />
            <KpiCard
              accent="#fbbf24"
              label="Reporting Rate"
              value={`${kpis.reporting}/${kpis.total30}`}
              sub="Districts reporting on time"
              trend="warn"
              trendText={`${kpis.total30 - kpis.reporting} districts delayed`}
            />
            <KpiCard
              accent="#2563eb"
              label="Avg Days to Stockout"
              value={`${kpis.avgDays}d`}
              sub="Across active districts"
              trend="up"
              trendText="↑ 3 days vs last week"
            />
          </div>

          {/* Map */}
          <div className="om-map-wrap">
            <OdishaMapCore
              districts={districts}
              selectedName={selectedName}
              onDistrictClick={handleDistrictClick}
              svgUrl={svgUrl}
              showLegend
            />
          </div>

        </div>{/* /om-map-panel */}

        {/* ── Right Panel ── */}
        <div className="om-right-panel">

          {/* Tabs */}
          <div className="om-tabs">
            {['districts','alerts','restock'].map(tab => (
              <button
                key={tab}
                className={`om-tab-btn ${activeTab === tab ? 'active' : ''}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          {/* ── Districts Tab ── */}
          {activeTab === 'districts' && (
            <div className="om-tab-body">
              <div className="om-search-wrap">
                <span className="om-search-icon">🔍</span>
                <input
                  type="text"
                  placeholder="Search district…"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                />
              </div>
              <div className="om-sort-row">
                {[
                  { key:'stock',    label:'By Stock' },
                  { key:'days',     label:'By Days'  },
                  { key:'name',     label:'A–Z'      },
                  { key:'critical', label:'Critical First' },
                ].map(s => (
                  <button
                    key={s.key}
                    className={`om-sort-btn ${sortKey === s.key ? 'active' : ''}`}
                    onClick={() => setSortKey(s.key)}
                  >
                    {s.label}
                  </button>
                ))}
              </div>

              {sortedDistricts.length === 0 && (
                <div style={{ color:'var(--om-muted)', fontSize:12, padding:'12px 0' }}>
                  No results found.
                </div>
              )}
              {sortedDistricts.map((d, i) => {
                const status = getStatus(d);
                const color  = STATUS_COLORS[status]?.text || '#94a3b8';
                const pct    = Math.round((d.stock / maxStock) * 100);
                const daysText = d.daysToStockout === null ? '∞ surplus' : `${d.daysToStockout}d left`;
                return (
                  <div
                    key={d.id}
                    className={`om-district-item ${selectedName === d.name ? 'selected' : ''}`}
                    onClick={() => handleListItemClick(d.name)}
                  >
                    <div className="om-di-rank">{i + 1}</div>
                    <div className="om-di-info">
                      <div className="om-di-name">
                        {d.name}
                        <span className="om-di-status-tag" style={{ color }}>{statusLabel(status)}</span>
                      </div>
                      <div className="om-di-bar-wrap">
                        <div className="om-di-bar" style={{ width:`${pct}%`, background: color }} />
                      </div>
                    </div>
                    <div className="om-di-right">
                      <div className="om-di-stock" style={{ color }}>{d.stock.toLocaleString()}</div>
                      <div className="om-di-days">{daysText}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* ── Alerts Tab ── */}
          {activeTab === 'alerts' && (
            <div className="om-tab-body">
              <div className="om-section-header">Anomaly Alerts</div>
              {alerts.map(a => (
                <div
                  key={a.id}
                  className="om-alert-card"
                  style={{ '--om-accent-color': a.severity === 'critical' ? 'var(--om-red)' : a.severity === 'high' ? 'var(--om-amber)' : '#a78bfa' }}
                >
                  <div className="om-alert-top">
                    <div className="om-alert-title">{a.lac}</div>
                    <div className="om-alert-time">{a.time}</div>
                  </div>
                  <div className="om-alert-body">
                    <strong>{a.doses} doses</strong> dispensed in <strong>{a.window}</strong> · {a.district} District
                  </div>
                </div>
              ))}

              <div className="om-section-header" style={{ marginTop: 16 }}>Restock Urgency</div>
              {urgencyList.length === 0 && (
                <div style={{ color:'var(--om-muted)', fontSize:12 }}>No urgent districts.</div>
              )}
              {urgencyList.map(d => {
                const s = getStatus(d);
                const c = STATUS_COLORS[s]?.text || '#94a3b8';
                return (
                  <div key={d.id} className="om-district-item">
                    <div className="om-di-info">
                      <div className="om-di-name">{d.name}</div>
                      <div className="om-di-bar-wrap">
                        <div className="om-di-bar" style={{ width:`${stockPct(d)}%`, background: c }} />
                      </div>
                    </div>
                    <div className="om-di-right">
                      <div className="om-di-stock" style={{ color: c }}>{d.daysToStockout}d</div>
                      <div className="om-di-days">{d.stock} doses</div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* ── Restock Tab ── */}
          {activeTab === 'restock' && (
            <div className="om-tab-body">
              <div className="om-section-header">Pending Requests</div>
              {restockRequests.map(r => (
                <div key={r.id} className="om-restock-card">
                  <div className="om-restock-top">
                    <span className="om-restock-id">{r.id}</span>
                    <span className={`om-restock-status ${r.status}`}>{r.status}</span>
                  </div>
                  <div className="om-restock-district">
                    <span className={`om-urgency-dot ${r.urgency}`} />
                    {r.district}
                  </div>
                  <div className="om-restock-meta">
                    <span className="om-restock-tag">🐄 {r.animal}</span>
                    <span className="om-restock-tag">💉 {r.type}</span>
                    <span className="om-restock-tag">📦 {r.qty} doses</span>
                    <span className="om-restock-tag">📅 {r.submitted}</span>
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>{/* /om-right-panel */}
      </div>{/* /om-dashboard */}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// KpiCard  –  small internal component
// ─────────────────────────────────────────────────────────────────────────────
function KpiCard({ accent, label, value, sub, trend, trendText }) {
  return (
    <div className="om-kpi-card" style={{ '--om-accent': accent }}>
      <div className="om-kpi-label">{label}</div>
      <div className="om-kpi-value">{value}</div>
      <div className="om-kpi-sub">{sub}</div>
      <div className={`om-kpi-trend ${trend}`}>{trendText}</div>
    </div>
  );
}
