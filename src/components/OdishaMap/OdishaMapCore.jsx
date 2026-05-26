import React, { useEffect, useMemo, useRef, useState, useCallback } from 'react';
import { createPortal } from 'react-dom';
import RAW_SVG from './odisha-map.svg?raw';
import {
  odishaDistricts as DEFAULT_DISTRICTS,
  SVG_DISTRICT_ORDER,
  SVG_NAME_MAP,
  getStatus,
  STATUS_COLORS,
  statusLabel,
  utilPct,
  stockPct,
  buildDataByName,
} from './data.js';

// ─────────────────────────────────────────────────────────────────────────────
// OdishaMapCore
//
// Props:
//   districts      – array of district objects (defaults to built-in data)
//   selectedName   – string | null  – highlight a district from outside
//   onDistrictClick(district) – callback when a district path is clicked
//   svgUrl         – path to odisha-map.svg (default: '/odisha-map.svg')
//   showLegend     – boolean (default: true)
//   className      – extra class on the root wrapper
// ─────────────────────────────────────────────────────────────────────────────

export default function OdishaMapCore({
  districts = DEFAULT_DISTRICTS,
  selectedName = null,
  onDistrictClick,
  svgUrl = '/odisha-map.svg',   // kept for API compat, no longer used
  showLegend = true,
  className = '',
}) {
  const wrapRef   = useRef(null);
  const svgRef    = useRef(null);
  const [tooltip, setTooltip] = useState({ visible: false, pinned: false, x: 0, y: 0, district: null });

  const dataByName = useMemo(() => buildDataByName(districts), [districts]);

  const getDistrictPath = useCallback((target) => {
    return target instanceof Element ? target.closest('path[data-district]') : null;
  }, []);

  const getTooltipPosition = useCallback((e) => {
    const margin = 16;
    const edge = 8;
    const tw = Math.min(320, window.innerWidth - edge * 2);
    const th = Math.min(360, window.innerHeight - edge * 2);
    let x = e.clientX + margin;
    let y = e.clientY + margin;

    if (x + tw > window.innerWidth - edge) x = e.clientX - tw - margin;
    if (y + th > window.innerHeight - edge) y = e.clientY - th - margin;

    return {
      x: Math.max(edge, Math.min(x, window.innerWidth - tw - edge)),
      y: Math.max(edge, Math.min(y, window.innerHeight - th - edge)),
    };
  }, []);

  // ── Inject SVG from bundled raw import ───────────────────────────────────
  useEffect(() => {
    if (!wrapRef.current) return;

    // Inject the raw SVG string directly — no fetch, no CORS, no 404
    wrapRef.current.innerHTML = RAW_SVG;

    const svg = wrapRef.current.querySelector('svg');
    if (!svg) return;
    svgRef.current = svg;

    // Make it fill the container
    svg.setAttribute('width',  '100%');
    svg.setAttribute('height', '100%');
    svg.style.overflow = 'visible';

    // Remove the inline background colour that Paintmaps bakes in
    svg.style.backgroundColor = 'transparent';
    svg.style.background       = 'transparent';
    svg.removeAttribute('style'); // wipe all inline styles on <svg>
    svg.style.overflow = 'visible'; // re-apply only what we need

    // Remove background rect
    svg.querySelectorAll('rect').forEach(r => {
      r.style.fill = 'transparent';
      r.setAttribute('fill', 'transparent');
    });

    // Assign classes to paths
    const paths = svg.querySelectorAll('path');
    paths.forEach((path, index) => {
      if (index < 30) {
        path.classList.add('om-shadow');
        path.style.pointerEvents = 'none';
        return;
      }
      const districtIndex = index - 30;
      if (districtIndex >= SVG_DISTRICT_ORDER.length) {
        path.style.display = 'none';
        return;
      }
      const svgName  = SVG_DISTRICT_ORDER[districtIndex];
      const dataName = SVG_NAME_MAP[svgName] || svgName;
      const d        = dataByName[dataName];
      const status   = d ? getStatus(d) : 'good';

      path.dataset.district = dataName;
      path.classList.add(`om-${status}`);
      if (selectedName && dataName === selectedName) {
        path.classList.add('om-selected');
      }
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // run once on mount — data updates handled by the effect below

  // ── Re-apply status classes when data changes ─────────────────────────────
  useEffect(() => {
    if (!svgRef.current) return;
    const paths = svgRef.current.querySelectorAll('path[data-district]');
    paths.forEach(path => {
      const d = dataByName[path.dataset.district];
      if (!d) return;
      const status = getStatus(d);
      // Remove old status classes
      path.classList.remove('om-critical','om-warning','om-good','om-surplus');
      path.classList.add(`om-${status}`);
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [districts]);

  // ── Sync selected highlight ───────────────────────────────────────────────
  useEffect(() => {
    if (!svgRef.current) return;
    svgRef.current.querySelectorAll('path[data-district]').forEach(path => {
      path.classList.toggle('om-selected', path.dataset.district === selectedName);
    });
  }, [selectedName]);

  // ── Mouse events (delegated on the wrapper) ───────────────────────────────
  const handleMouseMove = useCallback((e) => {
    // Don't chase the mouse while a tooltip is pinned
    if (tooltip.pinned) return;

    const path = getDistrictPath(e.target);
    if (!path) {
      setTooltip(t => ({ ...t, visible: false }));
      return;
    }
    const name = path.dataset.district;
    const d    = dataByName[name];
    if (!d) return;

    const { x, y } = getTooltipPosition(e);

    setTooltip({ visible: true, pinned: false, x, y, district: d });
  }, [dataByName, getDistrictPath, getTooltipPosition, tooltip.pinned]);

  const handleMouseLeave = useCallback(() => {
    // Only hide if not pinned
    setTooltip(t => t.pinned ? t : { ...t, visible: false });
  }, []);

  const handleClick = useCallback((e) => {
    const path = getDistrictPath(e.target);
    if (!path) {
      // Click on empty map area — unpin
      setTooltip(t => ({ ...t, visible: false, pinned: false }));
      return;
    }
    const d = dataByName[path.dataset.district];
    if (!d) return;

    // Pin the tooltip at current position
    const { x, y } = getTooltipPosition(e);

    setTooltip({ visible: true, pinned: true, x, y, district: d });

    if (onDistrictClick) onDistrictClick(d);
  }, [dataByName, getDistrictPath, getTooltipPosition, onDistrictClick]);

  const handleTooltipClose = useCallback(() => {
    setTooltip({ visible: false, pinned: false, x: 0, y: 0, district: null });
  }, []);

  return (
    <>
      {/* Map container */}
      <div
        className={`om-map-inner ${className}`}
        style={{ width:'100%', height:'100%' }}
        ref={wrapRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
      />

      {/* Legend */}
      {showLegend && (
        <div className="om-legend">
          {[
            { label:'Critical (<10d)', color:'#e74c3c' },
            { label:'Warning (10–20d)', color:'#f59e0b' },
            { label:'Good (20–35d)',    color:'#22c55e' },
            { label:'Surplus (>35d)',   color:'#0ea5e9' },
          ].map(item => (
            <div key={item.label} className="om-legend-item">
              <div className="om-legend-dot" style={{ background: item.color }} />
              {item.label}
            </div>
          ))}
        </div>
      )}

      {/* Tooltip (portal-style fixed positioning) */}
      {tooltip.visible && tooltip.district && createPortal(
        <DistrictTooltip
          district={tooltip.district}
          x={tooltip.x}
          y={tooltip.y}
          pinned={tooltip.pinned}
          onClose={handleTooltipClose}
        />,
        document.body
      )}
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// DistrictTooltip
// ─────────────────────────────────────────────────────────────────────────────
function DistrictTooltip({ district: d, x, y, pinned, onClose }) {
  const status = getStatus(d);
  const color  = STATUS_COLORS[status]?.text || '#94a3b8';
  const spct   = stockPct(d);
  const util   = utilPct(d);
  const progColor = STATUS_COLORS[status]?.stroke || '#94a3b8';

  const daysNode = d.daysToStockout === null
    ? <span className={`om-tt-days surplus`}>∞ Surplus</span>
    : <span className={`om-tt-days ${status}`}>{d.daysToStockout} days left</span>;

  return (
    <div
      className={`om-tooltip${pinned ? ' om-tooltip-pinned' : ''}`}
      style={{ left: x, top: y }}
    >
      <div className="om-tt-header">
        <div className="om-tt-header-top">
          <div>
            <div className="om-tt-name">{d.name}</div>
            <div className="om-tt-id">ID: {d.id} · {d.blocks} Blocks · {d.lacs} LACs</div>
          </div>
          {/* Close button — always visible, prominent when pinned */}
          <button
            className={`om-tt-close${pinned ? ' om-tt-close-pinned' : ''}`}
            onClick={(e) => { e.stopPropagation(); onClose(); }}
            aria-label="Close"
            title="Close"
          >
            ✕
          </button>
        </div>
        <div className="om-tt-status-row">
          <span className={`om-tt-badge ${status}`}>{statusLabel(status)}</span>
          <span className={`om-tt-rep ${d.reporting ? 'yes' : 'no'}`}>
            {d.reporting ? '✓ Reporting' : '✗ Not Reporting'}
          </span>
          <span className="om-tt-time">🕐 {d.lastUpdated}</span>
        </div>
        {pinned && (
          <div className="om-tt-pinned-hint">📌 Pinned — click ✕ to dismiss</div>
        )}
      </div>

      <div className="om-tt-body">
        <div className="om-tt-grid">
          <div className="om-tt-stat">
            <div className="om-tt-stat-label">Current Stock</div>
            <div className="om-tt-stat-value" style={{ color }}>{d.stock.toLocaleString()}</div>
            <div className="om-tt-stat-sub">doses available</div>
          </div>
          <div className="om-tt-stat">
            <div className="om-tt-stat-label">Target</div>
            <div className="om-tt-stat-value">{d.target.toLocaleString()}</div>
            <div className="om-tt-stat-sub">{spct}% of target</div>
          </div>
          <div className="om-tt-stat">
            <div className="om-tt-stat-label">Allocated</div>
            <div className="om-tt-stat-value">{d.allocated.toLocaleString()}</div>
            <div className="om-tt-stat-sub">this period</div>
          </div>
          <div className="om-tt-stat">
            <div className="om-tt-stat-label">Used</div>
            <div className="om-tt-stat-value">{d.used.toLocaleString()}</div>
            <div className="om-tt-stat-sub">{util}% utilisation</div>
          </div>
        </div>

        <div className="om-tt-prog-wrap">
          <div className="om-tt-prog-label">
            <span>Stock vs Target</span><span>{spct}%</span>
          </div>
          <div className="om-tt-prog-bar">
            <div className="om-tt-prog-fill" style={{ width:`${spct}%`, background: progColor }} />
          </div>
        </div>

        <div className="om-tt-prog-wrap">
          <div className="om-tt-prog-label">
            <span>Utilisation Rate</span><span>{util}%</span>
          </div>
          <div className="om-tt-prog-bar">
            <div className="om-tt-prog-fill" style={{ width:`${util}%`, background:'#2563eb' }} />
          </div>
        </div>
      </div>

      <div className="om-tt-footer">
        <div className="om-tt-footer-item">Stockout: {daysNode}</div>
        <div className="om-tt-footer-item">Last: <strong>{d.lastUpdated}</strong></div>
      </div>
    </div>
  );
}
