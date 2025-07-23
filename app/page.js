'use client'

import Banner from "@/components/banner/Banner";
import WorkshopBanner from "@/components/card/WorkshopBanner";
import WorkshopListType from "@/components/card/WorkshopListType";
import WorkshopTrendList from "@/components/card/WorkshopTrendList";
import { useQuery } from "@tanstack/react-query";
import { fetchComingSoonWorkshops, fetchMostBookedWorkshops, fetchWorkshops } from "./api/workshop";
import { convertTrendWorkshop } from "./util/convert";
import { useEffect, useState } from "react";
import { fetchOrderedTickets } from "./api/manage-workshop";
import { generateBotResponse } from "./api/geminiAI";
import { getUserInfo } from "./util/auth";
const userInfo = getUserInfo();

export default function Home() {
  const [aiWorkshops, setAiWorkshops] = useState([]);
  const [aiLoading, setAiLoading] = useState(false);

  const { data: AIChooseWorkshops } = useQuery({
    queryKey: ['AI-workshops'],
    queryFn: ({ signal }) => fetchWorkshops({ signal, pageNumber: 1, pageSize: 100 }),
  });

  const { data: comingSoonWorkshops } = useQuery({
    queryKey: ['upcoming-workshops'],
    queryFn: ({ signal }) => fetchComingSoonWorkshops({ signal, pageNumber: 1, pageSize: 15 }),
  });

  const { data: trendWorkshops } = useQuery({
    queryKey: ['most-booked-workshops'],
    queryFn: ({ signal }) => fetchMostBookedWorkshops({ signal, pageNumber: 1, pageSize: 15 }),
  });

  const { data: randomWorkshop } = useQuery({
    queryKey: ['random-workshops'],
    queryFn: ({ signal }) => fetchWorkshops({ signal, pageNumber: 1, pageSize: 10 }),
  });

  useEffect(() => {
    async function fetchAIWorkshops() {
      if (!userInfo) return;
      setAiLoading(true);
      try {
        const tickets = await fetchOrderedTickets({
          signal: null,
          pageNumber: 1,
          pageSize: 100,
          userId: userInfo.id,
        });
        const workshops = await fetchWorkshops({
          signal: null,
          pageNumber: 1,
          pageSize: 100,
        });
        const ticketsToSend = (tickets || []).slice(0, 10);
        const workshopsToSend = (workshops || []).slice(0, 20);
        const prompt = `Dựa vào lịch sử đặt vé: ${JSON.stringify(ticketsToSend)} và danh sách workshop: ${JSON.stringify(workshopsToSend)}, hãy gợi ý ra ít nhất 5 workshopId phù hợp nhất cho tôi (nếu không đủ thì lặp lại id cho đủ 5 phần tử). Chỉ trả về mảng id số, ví dụ: [12, 45, 78, 99, 12]. Không giải thích, không markdown, không text thừa, chỉ trả về mảng số.`;
        const aiResult = await generateBotResponse(prompt);
        let aiIds = [];
        try {
          const match = aiResult.match(/\[.*\]/s);
          if (match) {
            aiIds = JSON.parse(match[0]);
          } else {
            aiIds = JSON.parse(aiResult);
          }
        } catch {
          aiIds = [];
        }
        // Lọc ra các workshop phù hợp từ danh sách đã fetch
        let aiWorkshopList = (workshopsToSend || []).filter(item => aiIds.includes(item.workshopId));
        // Đảm bảo luôn có đúng 5 workshop (nếu thiếu thì lặp lại id cuối cùng)
        if (aiWorkshopList.length < 5 && aiWorkshopList.length > 0) {
          const last = aiWorkshopList[aiWorkshopList.length - 1];
          while (aiWorkshopList.length < 5) {
            aiWorkshopList.push(last);
          }
        } else if (aiWorkshopList.length > 5) {
          aiWorkshopList = aiWorkshopList.slice(0, 5);
        }
        setAiWorkshops(aiWorkshopList);
      } catch (e) {
        setAiWorkshops([]);
      } finally {
        setAiLoading(false);
      }
    }
    if (userInfo) {
      fetchAIWorkshops();
    }
  }, [userInfo]);

  return (
    <>
      <main className="main">
        <Banner />
        <WorkshopListType />
        <WorkshopTrendList items={convertTrendWorkshop(trendWorkshops)} title="Workshop xu hướng" />

        {/* <div className="pt-50"></div> */}

        <WorkshopTrendList items={convertTrendWorkshop(randomWorkshop)}
          title="Workshop nổi bật"
          background="secondary"
          sectionType="style1"
        />
        <WorkshopTrendList
          background="secondary"
          sectionType="style1"
          items={userInfo ? convertTrendWorkshop(aiWorkshops) : convertTrendWorkshop(AIChooseWorkshops)}
          title={aiLoading ? "AI đang gợi ý cho bạn..." : "AI Chọn Rồi, Vào Workshop Thôi!"}
        />
        <WorkshopTrendList
          background="secondary"
          sectionType="style2"
          items={convertTrendWorkshop(comingSoonWorkshops)}
          title="Coming soon" />
      </main>
    </>
  );
}