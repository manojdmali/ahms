# OdishaMap — React Component

Plug-and-play Odisha district semen stock dashboard for any React app.

---

## File Structure

```
OdishaMap/
  ├── index.jsx          ← Full dashboard (import this)
  ├── OdishaMapCore.jsx  ← Map + tooltip only (embed anywhere)
  ├── data.js            ← Data, types, and helper utils
  ├── OdishaMap.css      ← All styles (scoped, no conflicts)
  └── README.md
```

---

## Setup

### 1. Copy the folder

Copy the entire `OdishaMap/` folder into your project's `src/components/` directory.

### 2. Copy the SVG

Copy `odisha-map.svg` into your app's **`public/`** folder:

```
your-app/
  public/
    odisha-map.svg   ← place it here
  src/
    components/
      OdishaMap/
        index.jsx
        ...
```

### 3. Install the font (optional)

Add this to your `index.html` `<head>` for the best look:

```html
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
```

---

## Usage

### Full Dashboard (recommended)

```jsx
import OdishaMapDashboard from './components/OdishaMap';

export default function App() {
  return (
    <div style={{ height: '100vh' }}>
      <OdishaMapDashboard />
    </div>
  );
}
```

### With your own data

```jsx
import OdishaMapDashboard from './components/OdishaMap';

const myDistricts = [
  {
    id: 'KHD',
    name: 'Khordha',
    stock: 1240,
    allocated: 1500,
    used: 980,
    target: 1200,
    daysToStockout: 38,   // null = surplus (no stockout risk)
    lastUpdated: '2h ago',
    reporting: true,
    blocks: 10,
    lacs: 42,
  },
  // ... all 30 districts
];

export default function Dashboard() {
  return (
    <div style={{ height: '100vh' }}>
      <OdishaMapDashboard
        districts={myDistricts}
        onDistrictClick={(district) => console.log('Clicked:', district)}
      />
    </div>
  );
}
```

### Map only (embed in your own layout)

```jsx
import OdishaMapCore from './components/OdishaMap/OdishaMapCore';
import './components/OdishaMap/OdishaMap.css';

export default function MyPage() {
  return (
    <div style={{ position: 'relative', width: '100%', height: 500 }}>
      <OdishaMapCore
        onDistrictClick={(d) => console.log(d)}
        showLegend
      />
    </div>
  );
}
```

---

## Props

### `OdishaMapDashboard`

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `districts` | `DistrictData[]` | built-in 30 districts | Array of district objects |
| `alerts` | `AnomalyAlert[]` | built-in alerts | Anomaly alert objects |
| `restockRequests` | `RestockRequest[]` | built-in requests | Restock request objects |
| `svgUrl` | `string` | `'/odisha-map.svg'` | Path to the SVG file in `public/` |
| `title` | `string` | `'Odisha Semen Stock Intelligence'` | Dashboard title |
| `subtitle` | `string` | `'Animal Husbandry...'` | Dashboard subtitle |
| `onDistrictClick` | `(district) => void` | — | Fired when a district is clicked |
| `className` | `string` | `''` | Extra CSS class on root element |

### `OdishaMapCore`

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `districts` | `DistrictData[]` | built-in data | District data for coloring |
| `selectedName` | `string \| null` | `null` | Highlight a district by name |
| `onDistrictClick` | `(district) => void` | — | Click callback |
| `svgUrl` | `string` | `'/odisha-map.svg'` | Path to SVG |
| `showLegend` | `boolean` | `true` | Show/hide the color legend |
| `className` | `string` | `''` | Extra class on wrapper |

---

## District Data Shape

```ts
{
  id: string;            // e.g. 'KHD'
  name: string;          // must match SVG district name exactly
  stock: number;         // current doses
  allocated: number;     // allocated this period
  used: number;          // doses used
  target: number;        // target stock level
  daysToStockout: number | null;  // null = surplus
  lastUpdated: string;   // display string e.g. '2h ago'
  reporting: boolean;
  blocks: number;
  lacs: number;
}
```

---

## Color Logic

| Status | Condition | Fill Color |
|--------|-----------|------------|
| Critical | `daysToStockout <= 10` | Red `#c0392b` |
| Warning | `daysToStockout <= 20` | Amber `#d97706` |
| Good | `daysToStockout <= 35` | Green `#16a34a` |
| Surplus | `daysToStockout === null` or `> 35` | Blue `#0369a1` |

---

## Customising the SVG path

If your SVG is served from a different path (e.g. a CDN or `/assets/`):

```jsx
<OdishaMapDashboard svgUrl="/assets/maps/odisha-map.svg" />
```
