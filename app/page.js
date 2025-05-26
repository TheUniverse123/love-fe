'use client'

import Banner from "@/components/banner/Banner";
import WorkshopBanner from "@/components/card/WorkshopBanner";
import WorkshopListType from "@/components/card/WorkshopListType";
import WorkshopTrendList from "@/components/card/WorkshopTrendList";
import { useQuery } from "@tanstack/react-query";
import { fetchComingSoonWorkshops, fetchMostBookedWorkshops, fetchWorkshops } from "./api/workshop";
import { convertTrendWorkshop } from "./util/convert";

export default function Home() {

  const { data: AIChooseWorkshops } = useQuery({
    queryKey: ['AI-workshops'],
    queryFn: ({ signal }) => fetchWorkshops({ signal, pageNumber: 1, pageSize: 15 }),
  });

  const { data: comingSoonWorkshops } = useQuery({
    queryKey: ['upcoming-workshops'],
    queryFn: ({ signal }) => fetchComingSoonWorkshops({ signal, pageNumber: 1, pageSize: 15 }),
  });

  const { data: trendWorkshops } = useQuery({
    queryKey: ['most-booked-workshops'],
    queryFn: ({ signal }) => fetchMostBookedWorkshops({ signal, pageNumber: 1, pageSize: 15 }),
  });
  return (
    <>
      <main className="main">
        <Banner />
        <WorkshopListType />
        <WorkshopTrendList items={convertTrendWorkshop(trendWorkshops)} title="Workshop xu hướng" />
        <WorkshopBanner />
        <WorkshopTrendList
          background="secondary"
          sectionType="style1"
          items={convertTrendWorkshop(AIChooseWorkshops)}
          title="AI Chọn Rồi, Vào Workshop Thôi!" />
        <WorkshopTrendList
          background="secondary"
          sectionType="style2"
          items={convertTrendWorkshop(comingSoonWorkshops)}
          title="Coming soon" />
      </main>
    </>
  );
}