export default function ContactForm() {
    return (
        <section className="box-section box-contact-form main-background pt-0">
            <div className="container">
                <div className="row">
                    <div className="col-lg-7 mb-30">
                        <h2 className="white-color mb-25">Liên hệ chúng tôi</h2>
                        <div className="form-contact">
                            <div className="row">
                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label className="text-sm-medium white-color">Tên</label>
                                        <input className="form-control username" type="text" placeholder="First Name" />
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label className="text-sm-medium white-color">Họ</label>
                                        <input className="form-control username" type="text" placeholder="Last Name" />
                                    </div>
                                </div>
                                <div className="col-lg-12">
                                    <div className="form-group">
                                        <label className="text-sm-medium white-color">Địa chỉ email</label>
                                        <input className="form-control email" type="email" placeholder="email@domain.com" />
                                    </div>
                                </div>
                                <div className="col-lg-12">
                                    <div className="form-group">
                                        <label className="text-sm-medium white-color">Số điện thoại</label>
                                        <input className="form-control phone" type="text" placeholder="Phone number" />
                                    </div>
                                </div>
                                <div className="col-lg-12">
                                    <div className="form-group">
                                        <label className="text-sm-medium white-color">Vấn đề cần hỗ trợ</label>
                                        <textarea className="form-control" rows={6} placeholder="Để lại tin nhắn cho chúng tôi..." defaultValue={""} />
                                    </div>
                                </div>
                                <div className="box-remember-forgot">
                                    <div className="form-group">
                                        <div className="remeber-me">
                                            <label className="text-sm-medium neutral-500">
                                                <input className="cb-remember" type="checkbox" />Đồng ý với <a className="text-sm-bold white-color" href="term.html">Chính sách </a>và <a className="text-sm-bold white-color" href="privacy.html">Điều khoản</a> của chúng tôi
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-12">
                                    <button className="btn btn-book border-background">Gửi tin nhắn
                                        <svg width={17} height={16} viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M8.5 15L15.5 8L8.5 1M15.5 8L1.5 8" stroke strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-5 mb-30">
                        <div className="banner-contact">
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="banner-img-contact"> <img className="bdrd-16" src="/assets/lib/user/imgs/page/pages/banner-contact.png" alt="Travilla" /></div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="banner-img-contact">
                                        <div className="box-traveled-in">
                                            <p className="text-xl-medium mb-20">1684 people used <strong>Travila </strong>in the last <strong>24 hours</strong></p>
                                            <div className="box-authors-partner wow fadeInUp">
                                                <div className="authors-partner-left"><img src="/assets/lib/user/imgs/page/homepage5/author.png" alt="Travila" /><img src="/assets/lib/user/imgs/page/homepage5/author2.png" alt="Travila" /><img src="/assets/lib/user/imgs/page/homepage5/author3.png" alt="Travila" /><span className="item-author">
                                                    <svg width={18} height={18} viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <rect x="0.5" y="7.448" width={17} height="2.31818" fill="black" />
                                                        <rect x="7.84082" y="17.1072" width={17} height="2.31818" transform="rotate(-90 7.84082 17.1072)" fill="black" />
                                                    </svg></span></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="banner-img-contact"> <img className="bdrd-16" src="/assets/lib/user/imgs/page/pages/banner-contact3.png" alt="Travilla" /></div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="banner-img-contact"> <img className="bdrd-16" src="/assets/lib/user/imgs/page/pages/banner-contact2.png" alt="Travilla" /></div>
                                    <div className="banner-img-contact"> <img className="bdrd-16" src="/assets/lib/user/imgs/page/pages/banner-contact4.png" alt="Travilla" /></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

    )
}
