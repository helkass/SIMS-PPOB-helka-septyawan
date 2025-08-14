import React from "react";
import Navbar from "./Navbar";
import TopSection from "./home/TopSection";

interface IMainLayout {
  children: React.ReactNode;
  header?: boolean;
}
const MainLayout = ({ children, header }: IMainLayout) => {
  return (
    <main className="mx-auto">
      <Navbar />
      <div className="px-4 pt-16 min-h-screen max-w-[1140px] mx-auto pb-12">
        <div className="space-y-3">
          {header && <TopSection />}
          {children}
        </div>
      </div>
    </main>
  );
};

export default MainLayout;
