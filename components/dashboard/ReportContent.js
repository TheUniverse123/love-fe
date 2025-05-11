import { eventRecent } from '@/data'
import MyEvent from './MyEvent'
import ChartComponent from './ChartComponent'

export default function ReportContent() {
    return (
        <div className="row">
            <div className="col-xxxl-8 col-xxl-7 col-xl-12 mb-200">
                <div className="section-box main-background border-1px border-radius-10 mb-25">
                    <div className="container p-0">
                        <div className="panel-white">
                            <div className="panel-head flex-space border-1px-bottom" style={{ padding: "18px 30px" }}>
                                <h6 className="text-xl-bold white-color">Thống kê doanh thu & bán vé</h6><a className="menudrop" id="dropdownMenu3" type="button" data-bs-toggle="dropdown" aria-expanded="false" data-bs-display="static" />
                                <img src='/assets/icon/toggle.svg' />
                            </div>
                            <div className="panel-body">
                                <ChartComponent />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="section-box main-background border-1px border-radius-10">
                    <div className="container p-0">
                        <div className="panel-white">
                            <div className="panel-head flex-space border-1px-bottom" style={{ padding: "18px 30px" }}>
                                <h6 className="text-xl-bold white-color">Sự kiện đã tạo gần đây</h6><a className="menudrop" id="dropdownMenu3" type="button" data-bs-toggle="dropdown" aria-expanded="false" data-bs-display="static" />
                                <img src='/assets/icon/toggle.svg' />
                            </div>
                            <div className="panel-body" style={{ padding: "32px 42px" }}>
                                <div className="box-list-tours list-tours wow fadeIn">
                                    {eventRecent.map((event, index) => (
                                        <MyEvent
                                            key={index}
                                            title={event.title}
                                            time={event.time}
                                            address={event.address}
                                            price={event.price}
                                            imageSrc={event.imageSrc}
                                            link={event.link}
                                            buttonText={event.buttonText}
                                            isButtonVisible={false}
                                            isSuccess={event.isSuccess}
                                            smallImage={true}
                                        />
                                    ))}
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
                        </div>
                    </div>
                </div>

            </div>
            <div className="col-xxxl-4 col-xxl-5 col-xl-12">
                <div className="section-box main-background border-1px border-radius-10 mb-25">
                    <div className="container p-0">
                        <div className="panel-white">
                            <div className="panel-head flex-space border-1px-bottom" style={{ padding: "18px 30px" }}>
                                <h6 className="text-xl-bold white-color">Người dùng mới đăng ký</h6><a className="menudrop" id="dropdownMenu4" type="button" data-bs-toggle="dropdown" aria-expanded="false" data-bs-display="static" />
                                <img src='/assets/icon/toggle.svg' />
                            </div>
                            <div className="panel-body" style={{ padding: "20px 25px" }}>
                                <div className="card-style-3 row pb-20 pt-20 border-1px-bottom">
                                    <div className="card-image col-lg-4 d-flex" style={{ paddingRight: "0px!important" }}>
                                        <div className="card-image-inner online mr-10 flex-center"><img src="/assets/lib/dashboard/imgs/page/dashboard/avata1.png" alt="Travilla" /></div>
                                        <div className="card-title">
                                            <p className="text-sm-bold white-color">Lexander Smith</p><span className="text-xs-medium neutral-500 job-position">Travel Consultant</span>
                                        </div>
                                    </div>
                                    <div className="card-phone col-3 flex-center pl-0">
                                        <img src='/assets/icon/phone-dashboard.svg' />
                                        <a className="text-xs-medium phone white-color" href="#">(405) 555-0128</a></div>
                                    <div className="card-email col-4 pr-0 flex-start">
                                        <img src='/assets/icon/email-dashboard.svg' className='mr-5' />
                                        <a className="email white-color" href="#">smith.info@gmail.com</a>
                                    </div>
                                </div>
                                <div className="card-style-3 row pb-20 pt-20 border-1px-bottom">
                                    <div className="card-image col-lg-4 d-flex" style={{ paddingRight: "0px!important" }}>
                                        <div className="card-image-inner online mr-10 flex-center"><img src="/assets/lib/dashboard/imgs/page/dashboard/avata2.png" alt="Travilla" /></div>
                                        <div className="card-title">
                                            <p className="text-sm-bold white-color">Lexander Smith</p><span className="text-xs-medium neutral-500 job-position">Tour Guide</span>
                                        </div>
                                    </div>
                                    <div className="card-phone col-3 flex-center pl-0">
                                        <img src='/assets/icon/phone-dashboard.svg' />
                                        <a className="text-xs-medium phone white-color" href="#">(405) 555-0128</a></div>
                                    <div className="card-email col-4 pr-0 flex-start">
                                        <img src='/assets/icon/email-dashboard.svg' className='mr-5' />
                                        <a className="email white-color" href="#">emma.johnson@gmail.com</a>
                                    </div>
                                </div>
                                <div className="card-style-3 row pb-20 pt-20 border-1px-bottom">
                                    <div className="card-image col-lg-4 d-flex" style={{ paddingRight: "0px!important" }}>
                                        <div className="card-image-inner online mr-10 flex-center"><img src="/assets/lib/dashboard/imgs/page/dashboard/avata3.png" alt="Travilla" /></div>
                                        <div className="card-title">
                                            <p className="text-sm-bold white-color">Lexander Smith</p><span className="text-xs-medium neutral-500 job-position">Flight Attendant</span>
                                        </div>
                                    </div>
                                    <div className="card-phone col-3 flex-center pl-0">
                                        <img src='/assets/icon/phone-dashboard.svg' />
                                        <a className="text-xs-medium phone white-color" href="#">(405) 555-0128</a></div>
                                    <div className="card-email col-4 pr-0 flex-start">
                                        <img src='/assets/icon/email-dashboard.svg' className='mr-5' />
                                        <a className="email white-color" href="#">david.brown@gmail.com</a>
                                    </div>
                                </div>
                                <div className="card-style-3 row pb-20 pt-20 border-1px-bottom">
                                    <div className="card-image col-lg-4 d-flex" style={{ paddingRight: "0px!important" }}>
                                        <div className="card-image-inner online mr-10 flex-center"><img src="/assets/lib/dashboard/imgs/page/dashboard/avata4.png" alt="Travilla" /></div>
                                        <div className="card-title">
                                            <p className="text-sm-bold white-color">Lexander Smith</p><span className="text-xs-medium neutral-500 job-position">Travel Blogger</span>
                                        </div>
                                    </div>
                                    <div className="card-phone col-3 flex-center pl-0">
                                        <img src='/assets/icon/phone-dashboard.svg' />
                                        <a className="text-xs-medium phone white-color" href="#">(405) 555-0128</a></div>
                                    <div className="card-email col-4 pr-0 flex-start">
                                        <img src='/assets/icon/email-dashboard.svg' className='mr-5' />
                                        <a className="email white-color" href="#">sarah.davis@gmail.com</a>
                                    </div>
                                </div>
                                <div className="card-style-3 row pb-20 pt-20 border-1px-bottom">
                                    <div className="card-image col-lg-4 d-flex" style={{ paddingRight: "0px!important" }}>
                                        <div className="card-image-inner online mr-10 flex-center"><img src="/assets/lib/dashboard/imgs/page/dashboard/avata5.png" alt="Travilla" /></div>
                                        <div className="card-title">
                                            <p className="text-sm-bold white-color">Lexander Smith</p><span className="text-xs-medium neutral-500 job-position">Cruise Ship Director</span>
                                        </div>
                                    </div>
                                    <div className="card-phone col-3 flex-center pl-0">
                                        <img src='/assets/icon/phone-dashboard.svg' />
                                        <a className="text-xs-medium phone white-color" href="#">(405) 555-0128</a></div>
                                    <div className="card-email col-4 pr-0 flex-start">
                                        <img src='/assets/icon/email-dashboard.svg' className='mr-5' />
                                        <a className="email white-color" href="#">james@gmail.com</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="section-box main-background border-1px border-radius-10 mb-25">
                    <div className="container p-0">
                        <div className="panel-white">
                            <div className="panel-head flex-space border-1px-bottom" style={{ padding: "18px 30px" }}>
                                <h6 className="text-xl-bold white-color">Th3 2025</h6><a className="menudrop" id="dropdownMenu5" type="button" data-bs-toggle="dropdown" aria-expanded="false" data-bs-display="static" />
                                <img src='/assets/icon/toggle.svg' />
                            </div>
                            <div className="panel-body" style={{ padding: "20px 25px" }}>
                                <div className="box-calendar-events">
                                    <div className='p-0 transparent-background border-none' id="calendar-events" data-provide="datepicker-inline" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}
