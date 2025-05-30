import QuestionItem from "./QuestionItem";

export default function WorkshopFrequentQuestion({ questions, mode }) {
    return (
        <div className="group-collapse-expand main-background border-color">
            <button className="btn btn-collapse" type="button" data-bs-toggle="collapse" data-bs-target="#collapseQuestion" aria-expanded="false" aria-controls="collapseQuestion">
                <h6 className="white-color">{mode === "review" ? "Phản hồi" : "Câu hỏi thường gặp"}</h6>
                <svg className="stroke-white" width={12} height={7} viewBox="0 0 12 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 1L6 6L11 1" stroke strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </button>
            <div className="collapse show" id="collapseQuestion">
                <div className="card card-body main-background">
                    <div className="list-questions">
                        <QuestionItem question="Phản hồi" answer="Absolutely! The High Roller offers a family-friendly experience suitable for visitors of all ages. Children must be accompanied by an adult." />
                    </div>
                </div>
            </div>
        </div>
    )
}
