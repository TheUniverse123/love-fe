export default function WorkshopIntroduction({ contents }) {
    return (
        <div className="group-collapse-expand main-background border-color">
            <button className="btn btn-collapse" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOverview" aria-expanded="false" aria-controls="collapseOverview">
                <h6 className="white-color">Giới thiệu</h6>
                <svg style={{stroke: "white!important"}} width={12} height={7} viewBox="0 0 12 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 1L6 6L11 1" stroke strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </button>
            <div className="collapse show" id="collapseOverview">
                <div className="card card-body main-background">
                    {contents.map((content, index) =>
                        (<p key={index} className="white-color">{content}</p>))}
                </div>
            </div>
        </div>
    )
}
