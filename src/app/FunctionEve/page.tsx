// app/function-evaluation/page.tsx (Server Component)
export const metadata = {
  title: "Next.js Settings | TailAdmin - Next.js Dashboard Template",
  description: "This is Next.js Settings page for TailAdmin - Next.js Tailwind CSS Admin Dashboard Template",
};

import FunctionEve from './FunctionEve'; // Import your Client Component

export default function Page() {
  return (
    <div>
      <FunctionEve />
    </div>
  );
}
