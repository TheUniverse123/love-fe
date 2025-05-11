import Banner from "@/components/banner/Banner";
import WorkshopBanner from "@/components/card/WorkshopBanner";
import WorkshopListType from "@/components/card/WorkshopListType";
import WorkshopTrendList from "@/components/card/WorkshopTrendList";
import { AIChooseWorkshops, comingSoonWorkshops, trendWorkshops } from "@/data";

export default function Home() {
  return (
    <>
      <main className="main">
        <Banner />
        <WorkshopListType />
        <WorkshopTrendList items={trendWorkshops} title="Workshop xu hướng" />
        <WorkshopBanner />
        <WorkshopTrendList
          background="secondary"
          sectionType="style1"
          items={AIChooseWorkshops}
          title="AI Chọn Rồi, Vào Workshop Thôi!" />
        <WorkshopTrendList
          background="secondary"
          sectionType="style2"
          items={comingSoonWorkshops}
          title="Coming soon" />
      </main>
    </>
  );
}