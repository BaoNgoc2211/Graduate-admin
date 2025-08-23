import type { Metadata } from "next";
import "./globals.css";
import { Urbanist, Open_Sans } from "next/font/google";
import { cn } from "@/lib/utils";
// import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import QueryProvider from "@/providers/query-provider";
import { Toaster } from "sonner";
import Sidebar from "@/components/layout/sidebar/sidebar";
export const metadata: Metadata = {
  title: "Trung tâm quản lý – MediGo",
  description: "Trung tâm quản lý dữ liệu và vận hành của MediGo.",
};
const urbanist = Urbanist({ subsets: ["latin"] });
const open_sans = Open_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-open_sans",
});
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn("bg-white", open_sans.variable, urbanist.className)}>
        <QueryProvider>
          <Toaster position="top-right" richColors />
          {/* <Header /> */}
          <div className="flex min-h-screen">
            <div className="flex-shrink-0">
              <Sidebar />
            </div>
            <main className="flex-1 p-4">
              <section className="w-full">{children}</section>
            </main>
          </div>
          <Footer />
        </QueryProvider>
      </body>
    </html>
  );
}
