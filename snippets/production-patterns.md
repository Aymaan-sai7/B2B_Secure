# Production-ready Patterns Extracted from the Project

This document summarizes the most important reusable architecture patterns already implemented in the project.
All snippets below are based on actual source files in the repository.

---

## 1. API Service Pattern

### Core API client
- File: `src/services/axios.ts`
- Pattern: centralized Axios instance with base URL, JSON headers, auth token injection, and global response handling.
- Behavior:
  - reads `token` from `localStorage`
  - attaches `Authorization: Bearer ${token}` if available
  - redirects to `/login` on `401`
  - logs server errors for `>= 500`

### Service module pattern
- Files: `src/services/AdminServices.ts`, `src/services/TransactionService.ts`, `src/services/DashboardService.ts`
- Pattern: separate service modules by domain.
- Behavior:
  - use `api.get`, `api.post`, `api.put`, `api.delete`
  - transform API response data into local UI-friendly shapes
  - expose plain async functions for use in pages

Example from `AdminServices.ts`:
```ts
export async function getAllAdmins(): Promise<AdminType[]> {
  const res = await api.get("/admin/admins");
  return res.data.data.map((a: AdminApiResponse) => mapAdmin(a));
}
```

Example from `TransactionService.ts`:
```ts
function mapTransaction(t: TransactionApiResponse): transaction {
  return {
    id: t.id,
    senderCompany: t.sender_name || "Unknown",
    receiverCompany: t.receiver_name || "Unknown",
    state: t.status,
    amountSend: Number(t.amount),
    transactionDate: formatDate(t.date),
    status: t.status === "completed" ? "completed" : t.status === "pending" ? "pending" : "failed",
    date: formatDate(t.date),
    action: "icons",
  };
}
```

---

## 2. Protected and Role-based Routes

### Token-based route guard
- File: `src/routes/ProtectedRoute.tsx`
- Pattern: wrap route trees with a component that checks `localStorage.token`.

Actual implementation:
```tsx
export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const token = localStorage.getItem("token");
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return children;
}
```

### Super-admin route guard
- File: `src/routes/SuperAdminRoute.tsx`
- Pattern: `useAdmin()` context check plus loading spinner.
- Redirects unauthorized users to `/404`.

Actual implementation:
```tsx
const { admin, loading } = useAdmin();
if (loading) return <div className="min-h-screen flex items-center justify-center">...</div>;
if (!admin || !isSuperAdmin(admin.roles)) return <Navigate to="/404" replace />;
return <Outlet />;
```

### Route composition
- File: `src/App.tsx`
- Pattern: public auth routes plus protected dashboard routes nested under `ProtectedRoute`, then more specific role routes nested under `SuperAdminRoute`.

---

## 3. Form Patterns

### Shared form shell
- File: `src/components/form/Form.tsx`
- Pattern: simple presentational form wrapper with `onSubmit` and `children`.

Actual implementation:
```tsx
const Form: FC<FormProps> = ({ onSubmit, children, className = "" }) => (
  <form onSubmit={onSubmit} className={className}>{children}</form>
);
```

### Input field pattern
- File: `src/components/form/input/InputField.tsx`
- Pattern: reusable input with success/error states, hint text, disabled state, and custom styling.

### Domain-specific form components
- Files: `src/components/Forms/AdminForm.tsx`, `src/components/Forms/TransactionForm.tsx`
- Pattern: form components receive state and state setters from parent pages; validation is local and button state is computed from form values.

Example from `AdminForm.tsx`:
- uses `newAdmin` state object and updates via `setNewAdmin`
- validates `name`, `email`, and `password`
- disables action button when invalid or submitting
- uses inline SVG icons and Tailwind form controls

Example from `TransactionForm.tsx`:
- uses a status button group built from a local `STATUS_CONFIG`
- `TextInput` helper component with icon slot
- separate `Field` wrapper for consistent label/layout

---

## 4. Table Patterns

### Loading skeleton
- File: `src/components/ui/TableSkeleton.tsx`
- Pattern: reusable skeleton layout for table pages.
- Used in `Admin.tsx`, `Company.tsx`, and `Transactions.tsx`.

### Table row and action menu pattern
- Files: `src/components/ui/Tables/TableAdmin.tsx`, `src/components/ui/Tables/TableTransaction.tsx`
- Pattern: table body renders rows from data array; each row is clickable and contains a dropdown action menu.
- Action menu uses `useEffect` + `mousedown` listener to close outside clicks and calculates dropdown position based on available viewport space.

Actual dropdown logic:
```tsx
const rect = e.currentTarget.getBoundingClientRect();
const spaceBelow = window.innerHeight - rect.bottom;
setDropdownPosition(spaceBelow < 200 ? "bottom" : "top");
```

### Table component style
- Pattern: header row uses uppercase text, `divide-y`, hover backgrounds, and a dedicated action column.
- Empty data fallback row is rendered when `data.length === 0`.

---

## 5. Chart and Dashboard Patterns

### Chart wrapper
- File: `src/components/Charts/Bar.tsx`
- Pattern: reusable ApexCharts wrapper with default labels/datasets and chart options.
- The component computes derived summary values such as total, peak month, and growth.

### Metrics dashboard pattern
- File: `src/components/dash/Metrics.tsx`
- Pattern: show skeleton cards while loading, then render metric cards.
- Uses small reusable `MetricCard` subcomponent and grid layout.

Loading pattern from `Metrics.tsx`:
```tsx
if (loading || !data) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="h-32 rounded-2xl bg-[#F1F3FA] dark:bg-white/5 animate-pulse" />
      ))}
    </div>
  );
}
```

---

## 6. Modal Patterns

### Base modal component
- File: `src/components/ui/Modal.tsx`
- Pattern: `AnimatePresence` + `framer-motion` overlay + scroll locking.
- `onClose` is attached to backdrop click; inner content click stops propagation.

Actual implementation:
```tsx
useEffect(() => {
  const original = document.body.style.overflow;
  if (isOpen) document.body.style.overflow = "hidden";
  return () => { document.body.style.overflow = original; };
}, [isOpen]);
```

### Confirmation dialog
- File: `src/components/ui/Confirm.tsx`
- Pattern: simple modal overlay without motion; reuses `isOpen`, `title`, `message`, `onConfirm`, and `variant`.
- Used by pages to confirm destructive actions before API calls.

### Modal usage pattern in pages
- `Admin.tsx` and `Transactions.tsx` both use:
  - `Modal` for edit/add forms
  - `Confirm` for destructive user actions
  - `AnimatePresence` for report drawer/modal visibility

---

## 7. Loading State Patterns

### Page-level loading flags
- Pattern: parent page manages `loading` state for data fetch lifecycle.
- Example in `Admin.tsx` and `Transactions.tsx`:
  - set `loading` true before request
  - `try/catch/finally`
  - render `TableSkeleton` while `loading`

### Data fetching lifecycle
- Pattern: `fetchX()` helper in page, called inside `useEffect(() => { fetchX(); }, [])`.
- Provides optimistic UI update and re-fetch on error fallback.

### Context loading state
- File: `src/context/AdminContext.tsx`
- Pattern: `AdminProvider` loads current admin profile at mount and exposes `loading`, `error`, and `refreshAdmin`.
- Used in `SuperAdminRoute.tsx` to gate role-based access.

### Inline skeletons
- Pattern: use `animate-pulse` geometric blocks for metric cards and tables, not a third-party spinner.
- This is the actual production style used across the dashboard.

---

## 8. High-level production-ready takeaways

1. **Centralize API behavior** in `src/services/axios.ts` and keep domain service modules thin.
2. **Protect routes at the router level** using composable route wrappers (`ProtectedRoute`, `SuperAdminRoute`).
3. **Keep forms stateless externally**: local form state managed in page, pass down values and setters to reusable form component.
4. **Use table skeletons consistently** for loading states instead of blank tables.
5. **Share modal infrastructure** with one base modal and lightweight confirm dialog.
6. **Use simple UI-only loading states** (`animate-pulse`, inline spinner) for consistent dashboard feedback.

---

## Usage

These patterns can be reused directly in new pages by following the same structure:
- create a service in `src/services/` with `api` and response mapping
- add a `loading` boolean and `data` state in the page
- render `TableSkeleton` during load, otherwise the specialized table component
- place form content inside `Modal` and use `Confirm` for destructive flows
- use `ProtectedRoute` / `SuperAdminRoute` in `App.tsx` to wrap route groups

If you want, I can also extract a second document that maps these patterns to a stable reusable component library for `src/components/common`.
