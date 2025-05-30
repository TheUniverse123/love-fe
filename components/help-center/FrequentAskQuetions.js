'use client'

import { fetchAnswerList, fetchFAQList } from "@/app/api/faq";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

export default function FrequentAskQuetions() {

    const { data } = useQuery({
        queryKey: ['faq-list'],
        queryFn: fetchFAQList,
    });

    const [faqAnswers, setFaqAnswers] = useState([]);
    console.log(faqAnswers);

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
        <section className="section-box box-faqs-help main-background pt-0 border-0px">
            <div className="container">
                <div className="box-faqs-inner">
                    <div className="box-title-contact-form">
                        <div className="text-start wow fadeInUp">
                            <h3 className="white-color mb-10">Câu hỏi thường gặp</h3>
                            <p className="text-xl-medium neutral-500">Bạn có câu hỏi nào không? Chúng tôi rất sẵn lòng giúp bạn.</p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-6">
                            <div className="block-faqs">
                                <div className="accordion main-background" id="accordionFAQ">
                                    {faqAnswers.map((faq, index) => (
                                        <div key={faq.id} className="accordion-item wow fadeInUp main-background border-color">
                                            <h5 className="accordion-header" id={`heading${faq.id}`}>
                                                <button
                                                    className="accordion-button text-heading-5 main-background border-color"
                                                    type="button"
                                                    data-bs-toggle="collapse"
                                                    data-bs-target={`#collapse${faq.id}`}
                                                    aria-expanded="false"
                                                    aria-controls={`collapse${faq.id}`}
                                                >
                                                    <p className="white-color">{faq.question}</p>
                                                </button>
                                            </h5>
                                            <div
                                                className="accordion-collapse collapse main-background border-color"
                                                id={`collapse${faq.id}`}
                                                aria-labelledby={`heading${faq.id}`}
                                                data-bs-parent="#accordionFAQ"
                                            >
                                                <div className="accordion-body">{faq.answer}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="block-faqs wow fadeInUp">
                                <div className="accordion wow fadeInUp main-background" id="accordionFAQ2">
                                    {faqAnswers.map((faq, index) => (
                                        <div key={faq.id} className="accordion-item wow fadeInUp main-background border-color">
                                            <h5 className="accordion-header" id={`heading${faq.id + 100}`}>
                                                <button
                                                    className="accordion-button text-heading-5 main-background border-color"
                                                    type="button"
                                                    data-bs-toggle="collapse"
                                                    data-bs-target={`#collapse${faq.id + 100}`}
                                                    aria-expanded="false"
                                                    aria-controls={`collapse${faq.id + 100}`}
                                                >
                                                    <p className="white-color">{faq.question}</p>
                                                </button>
                                            </h5>
                                            <div
                                                className="accordion-collapse collapse main-background border-color"
                                                id={`collapse${faq.id + 100}`}
                                                aria-labelledby={`heading${faq.id + 100}`}
                                                data-bs-parent="#accordionFAQ2"
                                            >
                                                <div className="accordion-body">{faq.answer}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
