export default function QuestionItem({ question, answer }) {
    return (
        <div className="item-question main-background border-color">
            <div className="head-question">
                <p className="text-xl-bold neutral-400">{question}</p>
            </div>
            <div className="content-question">
                <p className="text-sm-medium neutral-500 whie-color">{answer}</p>
            </div>
        </div>
    )
}
