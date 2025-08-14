import MainLayout from "../_components/MainLayout";
import Header from "./Header";

function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <MainLayout>
      <div className="flex h-full flex-col justify-center items-center gap-4 pt-12">
        <Header />
        {children}
      </div>
    </MainLayout>
  );
}
export default Layout;
