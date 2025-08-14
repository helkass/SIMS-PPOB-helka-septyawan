import MainLayout from "@/app/_components/MainLayout";
import Header from "./Header";
import FormData from "./FormData";

interface PageProps {
  params: Promise<{
    service: string;
  }>;
}

export default async function TopupService({ params }: PageProps) {
  const { service } = await params;

  return (
    <MainLayout header>
      <Header service={service} />
      <FormData service={service} />
    </MainLayout>
  );
}
