import { historyAccumulatePoint } from '@/data'

export default function PointAccumulatePage() {
    return (
        <div style={{ marginRight: "532px", paddingLeft: "35px", paddingTop: "20px", height: "200vh" }}>
            <div className="flex-space pb-20 border-1px-bottom">
                <h4 className="white-color">Thông tin tích điểm</h4>
            </div>
            <div className='mt-30 mb-70 flex-center'>
                <div className='text-center'>
                    <img src='/assets/icon/ticket-point.svg' />
                    <h4 className='white-color flex-center mt-30'>
                        <span className='mr-10'>50.000</span>
                        <img src='/assets/icon/star-dashboard.svg' width={51} height={51} />
                    </h4>
                    <p className='white-color text-xl-bold mt-20'>Chúc mừng bạn đã đặt hạng Vàng!</p>
                </div>
            </div>

            <div className='p-30 main-background border-1px'>
                <div className="group-collapse-expand main-background border-1px-color5 p-20">
                    <button className="btn btn-collapse p-0" type="button" data-bs-toggle="collapse" data-bs-target="#collapseQuestion" aria-expanded="false" aria-controls="collapseQuestion">
                        <p className="white-color text-md-bold">Lịch sử điểm thưởng</p>
                        <svg style={{ stroke: "white!important" }} width={12} height={7} viewBox="0 0 12 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 1L6 6L11 1" stroke strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                    <div className="collapse show mt-30" id="collapseQuestion">
                        <div className="card card-body main-background">
                            <div className="list-questions">
                                {historyAccumulatePoint.map((item) => (
                                    <div className="item-question main-background border-color">
                                        <p className="text-xl-bold neutral-400">{item.date}</p>
                                        <div className="content-question">
                                            <p className="text-sm-medium neutral-500 whie-color">{item.points}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="group-collapse-expand main-background border-1px-color5 p-20">
                    <button className="btn btn-collapse p-0" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOverview" aria-expanded="false" aria-controls="collapseOverview">
                        <p className="white-color text-md-bold">Chính sách thành viên</p>
                        <svg style={{ stroke: "white!important" }} width={12} height={7} viewBox="0 0 12 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 1L6 6L11 1" stroke strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                    <div className="collapse show mt-30" id="collapseOverview">
                        <div className="card card-body main-background">
                            <p className="white-color">Elevate your Las Vegas experience to new heights with a journey aboard The High Roller at The LINQ. As the tallest observation wheel in the world, standing at an impressive 550 feet tall, The High Roller offers a bird's-eye perspective of the iconic Las Vegas Strip and its surrounding desert landscape. From the moment you step into one of the spacious cabins, you'll be transported on a mesmerizing adventure, where every turn offers a new and breathtaking vista of the vibrant city below.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
