## Overview
Comprehensive livestock management system covering:
- 🧫 **Semen Module** — State/district inventory, allocation, redistribution, AI forecasting
- 💊 **Medicine Module** — Procurement, distribution, barcode scanning, requisitions
- 🚐 **MVU Operations** — Tour planning, fleet tracking, manpower, geotagged visits

## Roles (8)
| Role | Interface | Home Path |
|------|-----------|-----------|
| Directorate / DAH&VS | Web (sidebar) | /semen/dashboard |
| CDVO | Web (sidebar) | /cdvo/semen |
| SDVO | Web (sidebar) | /cdvo/semen |
| BVO | Web (sidebar) | /bvo/dashboard |
| AIT | Mobile (bottom nav) | /ait/home |
| LAC / VD | Mobile | /lac/home |
| MVU Field Team | Mobile | /mvu-team/home |
| Farmer | Mobile | /farmer/home |

## Tech Stack
- **Frontend:** React 18, Vite, Tailwind CSS, shadcn/ui
- **Routing:** React Router 6
- **State:** TanStack React Query 5
- **Charts:** Recharts
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Backend:** Stactic mock js dataset

## Key Features
- ✅ Role-based access with 8 distinct user experiences
- ✅ Offline-capable field logging (OfflineBanner + sync)
- ✅ Unified Notification Center with push-to-field
- ✅ Cattle TAG scanning + Bharat Pashudhan registry integration
- ✅ AI Service History per cattle
- ✅ Barcode scanning for medicine
- ✅ Geotagged village visit photos (MVU)
- ✅ AI forecasting panel (semen demand)
- ✅ 30-district Odisha heatmap
- ✅ Tour compliance & deviation alerts