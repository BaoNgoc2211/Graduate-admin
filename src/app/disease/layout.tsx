import Footer from "@/components/layout/footer";
import Sidebar from "@/components/layout/sidebar/sidebar";

const DiseasePageLayout = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  return (
    <div>
      {" "}
      <div className="flex min-h-screen">
        <div className="flex-shrink-0">
          <Sidebar />
        </div>
        <main className="flex-14">
          <section className="w-full">{children}</section>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default DiseasePageLayout;
