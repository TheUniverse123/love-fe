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
    const [expandedQuestionId, setExpandedQuestionId] = useState(null);

    const toggleQuestion = (id) => {
        setExpandedQuestionId(expandedQuestionId === id ? null : id);
    };

    useEffect(() => {
        const fetchAnswers = async () => {
            if (data) {
                const answers = await Promise.all(data.slice(0, 10).map(async (item) => {
                    const response = await fetchAnswerList(item.faqQuestionId);
                    return {
                        id: item.faqQuestionId,
                        question: item.description,
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
                                    {faqAnswers.slice(0, 5).map((faq, index) => (
                                        <div key={faq.id} className="accordion-item wow fadeInUp main-background border-color">
                                            <h5 className="accordion-header" id={`heading${faq.id}`}>
                                                <button
                                                    className="accordion-button text-heading-5 main-background border-color"
                                                    type="button"
                                                    onClick={() => toggleQuestion(faq.id)}
                                                >
                                                    <p className="white-color">{faq.question}</p>
                                                    <span className={`arrow-icon ${expandedQuestionId === faq.id ? 'arrow-down' : 'arrow-right'}`}></span>
                                                </button>
                                            </h5>
                                            <div
                                                className="main-background border-color"
                                                style={{ display: expandedQuestionId === faq.id ? 'block' : 'none' }}
                                            >
                                                <div className="accordion-body white-color">{faq.answer}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="block-faqs wow fadeInUp">
                                <div className="accordion wow fadeInUp main-background" id="accordionFAQ2">
                                    {faqAnswers.slice(6, 10).map((faq, index) => (
                                        <div key={faq.id} className="accordion-item wow fadeInUp main-background border-color">
                                            <h5 className="accordion-header" id={`heading${faq.id + 100}`}>
                                                <button
                                                    className="accordion-button text-heading-5 main-background border-color"
                                                    type="button"
                                                    onClick={() => toggleQuestion(faq.id)}
                                                >
                                                    <p className="white-color">{faq.question}</p>
                                                    <span className={`arrow-icon ${expandedQuestionId === faq.id ? 'arrow-down' : 'arrow-right'}`}></span>
                                                </button>
                                            </h5>
                                            <div
                                                className="main-background border-color"
                                                style={{ display: expandedQuestionId === faq.id ? 'block' : 'none' }}
                                            >
                                                <div className="accordion-body white-color">{faq.answer}</div>
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
