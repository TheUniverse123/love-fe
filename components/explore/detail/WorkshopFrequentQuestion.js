import QuestionItem from "./QuestionItem";

export default function WorkshopFrequentQuestion({ questions }) {
    return (
        <div className="group-collapse-expand main-background border-color">
            <button className="btn btn-collapse" type="button" data-bs-toggle="collapse" data-bs-target="#collapseQuestion" aria-expanded="false" aria-controls="collapseQuestion">
                <h6 className="white-color">Câu hỏi thường gặp</h6>
                <svg style={{stroke: "white!important"}} width={12} height={7} viewBox="0 0 12 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 1L6 6L11 1" stroke strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </button>
            <div className="collapse show" id="collapseQuestion">
                <div className="card card-body main-background">
                    <div className="list-questions">
                        {questions.map((item) => (
                            <QuestionItem key={item.id} question={item.question} answer={item.answer} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
