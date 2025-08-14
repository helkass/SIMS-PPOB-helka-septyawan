import ContentSection from "./_components/ContentSection";
import MainLayout from "./_components/MainLayout";
import BannerComponent from "./Banner";
import MenuFeatures from "./MenuFeatures";

export default function Home() {
  return (
    <MainLayout header>
      <div className="w-full overflow-hidden">
        <MenuFeatures />
      </div>

      {/* banner */}
      <ContentSection
        title="Temukan promo menarik"
        contentClass="w-full overflow-hidden"
      >
        <BannerComponent />
      </ContentSection>
    </MainLayout>
  );
}
