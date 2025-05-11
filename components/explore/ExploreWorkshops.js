import { workshopExplore } from "@/data";
import ExploreBoxViewResult from "./ExploreBoxViewResult";
import ExploreWorkshopItem from "./ExploreWorkshopItem";

export default function ExploreWorkshops() {
    return (
        <div className="content-right">
            <div className="box-filters mb-25 pb-5 border-1 border-bottom-custom">
                <div className="row align-items-center">
                    <div className="col-xl-4 col-md-4 mb-10 text-lg-start text-center">
                        <ExploreBoxViewResult numberFound={64} />
                    </div>
                    <div className="col-xl-8 col-md-8 mb-10 text-lg-end text-center">
                        <div className="box-item-sort">
                            <a className="btn btn-sort" href="#">
                                <svg style={{ stroke: "white" }} width={18} height={18} viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M8.25 6L5.25 3M5.25 3L2.25 6M5.25 3L5.25 15" stroke strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M9.75 12L12.75 15M12.75 15L15.75 12M12.75 15L12.75 3" stroke strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </a>

                            <div className="item-sort border-1 border-color" style={{ padding: "7px 15px" }}>
                                <span className="text-xs-medium neutral-500 mr-5">Sắp xếp theo:</span>
                                <div className="dropdown dropdown-sort border-1-right">
                                    <button style={{ backgroundImage: "url(/assets/lib/user/imgs/template/icons/arrow-down-white.svg)!important" }} className="btn dropdown-toggle" id="dropdownSort" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        <span className="white-color">Mới nhất</span>
                                    </button>
                                    <ul className="dropdown-menu dropdown-menu-light" aria-labelledby="dropdownSort" style={{ margin: 0 }}>
                                        <li><a className="dropdown-item active" href="#">Mới nhất</a></li>
                                        <li><a className="dropdown-item" href="#">Nổi bật nhất</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            <div className="box-grid-tours wow fadeIn">
                <div className="row">
                    {workshopExplore.map((card, index) => (
                        <ExploreWorkshopItem key={index} {...card} />
                    ))}
                </div>
            </div>
            <nav aria-label="Page navigation example">
                <ul className="pagination">
                    <li className="page-item"><a className="page-link main-third-background white-color-4" href="#" aria-label="Previous"><span aria-hidden="true">
                        <svg style={{ stroke: "var(--bg-white-color-4) !important" }} width={12} height={12} viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6.00016 1.33325L1.3335 5.99992M1.3335 5.99992L6.00016 10.6666M1.3335 5.99992H10.6668" stroke strokeLinecap="round" strokeLinejoin="round" />
                        </svg></span></a></li>
                    <li className="page-item"><a className="page-link main-third-background white-color-4" href="#">1</a></li>
                    <li className="page-item"><a className="page-link secondary-background white-color active" href="#">2</a></li>
                    <li className="page-item"><a className="page-link main-third-background white-color-4" href="#">3</a></li>
                    <li className="page-item"><a className="page-link main-third-background white-color-4" href="#">4</a></li>
                    <li className="page-item"><a className="page-link main-third-background white-color-4" href="#">5</a></li>
                    <li className="page-item"><a className="page-link main-third-background white-color-4" href="#">...</a></li>
                    <li className="page-item"><a className="page-link main-third-background white-color-4" href="#" aria-label="Next"><span aria-hidden="true">
                        <svg
                            style={{ stroke: "var(--bg-white-color-4) !important" }}
                            width={12} height={12} viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M5.99967 10.6666L10.6663 5.99992L5.99968 1.33325M10.6663 5.99992L1.33301 5.99992" stroke strokeLinecap="round" strokeLinejoin="round" />
                        </svg></span></a></li>
                </ul>
            </nav>
        </div>
    )
}
