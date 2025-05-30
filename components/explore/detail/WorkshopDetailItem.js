'use client'

import { fetchAnswerList, fetchFAQList } from "@/app/api/faq";
import { getUserInfo } from "@/app/util/auth";
import { progressData } from "@/data";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import RatingForm from "./RatingForm";
import WorkshopFrequentQuestion from "./WorkshopFrequentQuestion";
import WorkshopIntroduction from "./WorkshopIntroduction";
import WorkshopRating from "./WorkshopRating";

const userInfo = getUserInfo();

export default function WorkshopDetailItem({ workshopDetail, mode }) {
    const { data } = useQuery({
        queryKey: ['faq-list'],
        queryFn: fetchFAQList,
    });

    const [faqAnswers, setFaqAnswers] = useState([]);

    useEffect(() => {
        const fetchAnswers = async () => {
            if (data) {
                const answers = await Promise.all(data.slice(0, 5).map(async (item) => {
                    const response = await fetchAnswerList(item.faqQuestionId);
                    return {
                        id: item.faqQuestionId,
                        question: item.title,
                        answer: response[0]?.answerContent || '',
                    };
                }));
                setFaqAnswers(answers);
            }
        };

        fetchAnswers();
    }, [data]);

    return (
        <div className="box-collapse-expand">
            <WorkshopIntroduction contents={[`${workshopDetail?.description || ""}`]} />
            {mode !== "review" && <>
                <WorkshopFrequentQuestion questions={faqAnswers} />
                <WorkshopRating progressData={progressData} workshopDetail={workshopDetail} />
                {userInfo && <RatingForm />}
            </>}

            {mode === "review" && <WorkshopFrequentQuestion mode="review"/>}
        </div>
    );
}