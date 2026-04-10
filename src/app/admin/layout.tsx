import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin — AI AETAR",
  robots: "noindex,nofollow",
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#070f1e] text-white">
      {children}
    </div>
  );
}
