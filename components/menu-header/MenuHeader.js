export default function MenuHeader() {
    return (
        <>
            <div className="mobile-header-active mobile-header-wrapper-style perfect-scrollbar button-bg-2">
                <div className="mobile-header-wrapper-inner">
                    <div className="mobile-header-logo"> <a className="d-flex" href="index.html">
                        <img className="light-mode" alt="Travila" src="/assets/lib/user/imgs/template/logo.svg" />
                        <img className="dark-mode" alt="Travila" src="/assets/lib/user/imgs/template/logo-w.svg" />
                    </a>
                        <div className="burger-icon burger-icon-white" />
                    </div>
                    <div className="mobile-header-top">
                        <div className="box-author-profile">
                            <div className="card-author">
                                <div className="card-image"> <img src="/assets/lib/user/imgs/page/homepage1/author2.png" alt="Travila" /></div>
                                <div className="card-info">
                                    <p className="text-md-bold neutral-1000">Alice Roses</p>
                                    <p className="text-xs neutral-1000">London, England</p>
                                </div>
                            </div><a className="btn btn-black" href="#">Logout</a>
                        </div>
                    </div>
                    <div className="mobile-header-content-area">
                        <div className="perfect-scroll">
                            <div className="mobile-menu-wrap mobile-header-border">
                                <nav>
                                    <ul className="mobile-menu font-heading">
                                        <li className="has-children"><a className="active" href="index.html">Home Pages</a>
                                            <ul className="sub-menu">
                                                <li><a href="index.html">Home 1 - All services</a></li>
                                                <li><a href="index-2.html">Home 2 - All services</a></li>
                                                <li><a href="index-3.html">Home 3 - All services</a></li>
                                                <li><a href="index-4.html">Home 4 - All services</a></li>
                                                <li><a href="index-5.html">Home 5 - Tours</a></li>
                                                <li><a href="index-6.html">Home 6 - Activities</a></li>
                                                <li><a href="index-7.html">Home 7 - Destinations</a></li>
                                                <li><a href="index-8.html">Home 8 - Hotels</a></li>
                                                <li><a href="index-9.html">Home 9 - Rental Car</a></li>
                                                <li><a href="index-10.html">Home 10 - Rental Property</a></li>
                                                <li><a href="index-11.html">Home 11 - Tickets</a></li>
                                            </ul>
                                        </li>
                                        <li className="has-children"><a href="tour-grid.html">Tours</a>
                                            <ul className="sub-menu">
                                                <li><a href="tour-grid-3.html">Tours List - Top Fillter</a></li>
                                                <li><a href="tour-grid.html">Tours List - Sidebar Left Fillter</a></li>
                                                <li><a href="tour-grid-2.html">Tours List - Sidebar Right Fillter</a></li>
                                                <li><a href="tour-list.html">Tours List 1</a></li>
                                                <li><a href="tour-list-2.html">Tours List 2</a></li>
                                                <li><a href="tour-detail.html">Tour Single 01 - Gallery</a></li>
                                                <li><a href="tour-detail-2.html">Tour Single 02 - Slideshow</a></li>
                                                <li><a href="tour-detail-3.html">Tour Single 03 - Video</a></li>
                                                <li><a href="tour-detail-4.html">Tour Single 04 - Image</a></li>
                                            </ul>
                                        </li>
                                        <li className="has-children"><a href="destination.html">Destinations</a>
                                            <ul className="sub-menu">
                                                <li><a href="destination.html">Destinations list 1</a></li>
                                                <li><a href="destination-2.html">Destinations list 2</a></li>
                                                <li><a href="destination-3.html">Destinations list 3</a></li>
                                                <li><a href="destination-4.html">Destinations Details 01</a></li>
                                                <li><a href="destination-5.html">Destinations Details 02</a></li>
                                                <li><a href="destination-6.html">Destinations Details 03</a></li>
                                            </ul>
                                        </li>
                                        <li className="has-children"><a href="activities.html">Activities</a>
                                            <ul className="sub-menu">
                                                <li><a href="activities.html">Activities List - Top Fillter</a></li>
                                                <li><a href="activities-2.html">Activities List - Sidebar Left Fillter</a></li>
                                                <li><a href="activities-3.html">Activities List - Sidebar Right Fillter</a></li>
                                                <li><a href="activities-4.html">Activities List - Grid</a></li>
                                                <li><a href="activities-5.html">Activities List - List</a></li>
                                                <li><a href="activities-detail.html">Activities Single 01 - Gallery</a></li>
                                                <li><a href="activities-detail-2.html">Activities Single 02 - Slideshow</a></li>
                                                <li><a href="activities-detail-3.html">Activities Single 03</a></li>
                                                <li><a href="activities-detail-4.html">Activities Single 04</a></li>
                                            </ul>
                                        </li>
                                        <li className="has-children"> <a href="hotel-grid.html">Hotels</a>
                                            <ul className="sub-menu">
                                                <li><a href="hotel-grid.html">Hotel List 01</a></li>
                                                <li><a href="hotel-grid-2.html">Hotel List 02</a></li>
                                                <li><a href="hotel-grid-3.html">Hotel List 03</a></li>
                                                <li><a href="hotel-grid-4.html">Hotel List 04</a></li>
                                                <li><a href="hotel-grid-5.html">Hotel List 05</a></li>
                                                <li><a href="hotel-grid-6.html">Hotel List 06</a></li>
                                                <li><a href="hotel-detail.html">Hotel Details 01</a></li>
                                                <li><a href="hotel-detail-2.html">Hotel Details 02</a></li>
                                            </ul>
                                        </li>
                                        <li className="has-children"> <a href="rental-car.html">Rental</a>
                                            <ul className="sub-menu">
                                                <li><a href="rental-car.html">Car Grid</a></li>
                                                <li><a href="rental-car-2.html">Car list</a></li>
                                                <li><a href="rental-car-3.html">Car Details</a></li>
                                                <li><a href="rental-proprty.html">Property Grid</a></li>
                                                <li><a href="rental-proprty-2.html">Property Grid</a></li>
                                                <li><a href="rental-proprty-3.html">Property List</a></li>
                                                <li><a href="rental-detail.html">Property Details</a></li>
                                            </ul>
                                        </li>
                                        <li className="has-children"> <a href="tickets.html">Tickets</a>
                                            <ul className="sub-menu">
                                                <li><a href="tickets.html">Flight tickets</a></li>
                                                <li><a href="tickets-2.html">Train tickets</a></li>
                                                <li><a href="book-ticket.html">Ticket details</a></li>
                                            </ul>
                                        </li>
                                        <li className="has-children"> <a href="javascript:void(0)">Pages</a>
                                            <ul className="sub-menu">
                                                <li><a href="about.html">About</a></li>
                                                <li><a href="contact.html">Contact</a></li>
                                                <li><a href="faq.html">FAQs</a></li>
                                                <li><a href="help-center.html">Help center</a></li>
                                                <li><a href="become-expert.html">Become Expert</a></li>
                                                <li><a href="comming-soon.html">Coming soon                                  </a></li>
                                                <li><a href="checkout.html">Checkout</a></li>
                                                <li><a href="confirmation.html">Confirmationn</a></li>
                                                <li><a href="invoice.html">Invoice</a></li>
                                                <li><a href="term.html">Term</a></li>
                                                <li><a href="404.html">404</a></li>
                                            </ul>
                                        </li>
                                        <li className="has-children"> <a href="blog-grid.html">Blog</a>
                                            <ul className="sub-menu">
                                                <li><a href="blog-grid.html">Grid Full</a></li>
                                                <li><a href="blog-grid-2.html">Grid Sidebar</a></li>
                                                <li><a href="blog-grid-3.html">List</a></li>
                                                <li><a href="blog-detail.html">Blog Details</a></li>
                                                <li><a href="blog-detail-2.html">Blog Details 2</a></li>
                                            </ul>
                                        </li>
                                        <li><a href="contact.html">Contact</a></li>
                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="sidebar-canvas-wrapper perfect-scrollbar button-bg-2">
                <div className="sidebar-canvas-container">
                    <div className="sidebar-canvas-head">
                        <div className="sidebar-canvas-logo"> <a className="d-flex" href="index.html"><img className="light-mode" alt="Travila" src="/assets/lib/user/imgs/template/logo.svg" /><img className="dark-mode" alt="Travila" src="/assets/lib/user/imgs/template/logo-w.svg" /></a></div>
                        <div className="sidebar-canvas-lang">
                            <div className="d-inline-block box-dropdown-cart align-middle mr-15"><span className="text-14-medium icon-list icon-account icon-lang"><span className="text-14-medium arrow-down">EN</span></span>
                                <div className="dropdown-account">
                                    <ul>
                                        <li><a className="text-sm-medium" href="#">English</a></li>
                                        <li><a className="text-sm-medium" href="#">French</a></li>
                                        <li><a className="text-sm-medium" href="#">Chiness</a></li>
                                    </ul>
                                </div>
                            </div>
                            <div className="d-inline-block box-dropdown-cart align-middle mr-15"><span className="text-14-medium icon-list icon-cart"><span className="text-14-medium arrow-down">USD</span></span>
                                <div className="dropdown-cart">
                                    <ul>
                                        <li><a className="text-sm-medium" href="#">USD</a></li>
                                        <li><a className="text-sm-medium" href="#">EUR</a></li>
                                        <li><a className="text-sm-medium" href="#">SGP</a></li>
                                    </ul>
                                </div>
                            </div><a className="close-canvas" href="#"> <img alt="Travila" src="/assets/lib/user/imgs/template/icons/close.png" /></a>
                        </div>
                    </div>
                    <div className="sidebar-canvas-content">
                        <div className="box-author-profile">
                            <div className="card-author">
                                <div className="card-image"> <img src="/assets/lib/user/imgs/page/homepage1/author2.png" alt="Travila" /></div>
                                <div className="card-info">
                                    <p className="text-md-bold neutral-1000">Alice Roses</p>
                                    <p className="text-xs neutral-1000">London, England</p>
                                </div>
                            </div><a className="btn btn-black" href="#">Logout</a>
                        </div>
                        <div className="box-quicklinks">
                            <h6 className="title-quicklinks neutral-1000">Quick Links</h6>
                            <div className="box-list-quicklinks">
                                <div className="item-quicklinks">
                                    <div className="item-icon"> <img src="/assets/lib/user/imgs/template/icons/notify.svg" alt="Travila" /></div>
                                    <div className="item-info"> <a href="#">
                                        <h6 className="text-md-bold neutral-1000">Notifications</h6></a>
                                        <p className="text-xs neutral-500 online">2 new messages</p>
                                    </div>
                                </div>
                                <div className="item-quicklinks">
                                    <div className="item-icon"> <img src="/assets/lib/user/imgs/template/icons/bookmark.svg" alt="Travila" /></div>
                                    <div className="item-info"> <a href="#">
                                        <h6 className="text-md-bold neutral-1000">Bookmark</h6></a>
                                        <p className="text-xs neutral-500">7 tours, 2 rooms</p>
                                    </div>
                                </div>
                                <div className="item-quicklinks">
                                    <div className="item-icon"> <img src="/assets/lib/user/imgs/template/icons/wallet.svg" alt="Travila" /></div>
                                    <div className="item-info"> <a href="#">
                                        <h6 className="text-md-bold neutral-1000">My Wallet</h6></a>
                                        <p className="text-xs neutral-500">$4500</p>
                                    </div>
                                </div>
                                <div className="item-quicklinks">
                                    <div className="item-icon"> <img src="/assets/lib/user/imgs/template/icons/discount.svg" alt="Travila" /></div>
                                    <div className="item-info"> <a href="#">
                                        <h6 className="text-md-bold neutral-1000">Discount</h6></a>
                                        <p className="text-xs neutral-500">Only today</p>
                                    </div>
                                </div>
                                <div className="item-quicklinks">
                                    <div className="item-icon"> <img src="/assets/lib/user/imgs/template/icons/friends.svg" alt="Travila" /></div>
                                    <div className="item-info"> <a href="#">
                                        <h6 className="text-md-bold neutral-1000">Friends</h6></a>
                                        <p className="text-xs neutral-500">Your team</p>
                                    </div>
                                </div>
                                <div className="item-quicklinks">
                                    <div className="item-icon"> <img src="/assets/lib/user/imgs/template/icons/tickets.svg" alt="Travila" /></div>
                                    <div className="item-info"> <a href="#">
                                        <h6 className="text-md-bold neutral-1000">Tickets</h6></a>
                                        <p className="text-xs neutral-500 resolved">3 resolved tickets</p>
                                    </div>
                                </div>
                                <div className="item-quicklinks">
                                    <div className="item-icon"> <img src="/assets/lib/user/imgs/template/icons/settings.svg" alt="Travila" /></div>
                                    <div className="item-info"> <a href="#">
                                        <h6 className="text-md-bold neutral-1000">Setting</h6></a>
                                        <p className="text-xs neutral-500">Your account</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="box-eventsdate">
                            <h6 className="title-eventsdate neutral-1000">Event Dates</h6>
                            <div className="box-calendar-events">
                                <div id="calendar-events" />
                            </div>
                        </div>
                        <div className="box-savedplaces">
                            <h6 className="title-savedplaces neutral-1000">Saved Places</h6>
                            <div className="box-list-places">
                                <div className="card-place">
                                    <div className="card-image"> <img src="/assets/lib/user/imgs/page/homepage1/place.png" alt="Travila" /></div>
                                    <div className="card-info background-card">
                                        <div className="card-info-top">
                                            <h6 className="text-xl-bold"> <a className="neutral-1000" href="#">Machu Picchu</a></h6>
                                            <p className="text-xs card-rate"> <img src="/assets/lib/user/imgs/template/icons/star.svg" alt="Travila" />4/5</p>
                                        </div>
                                        <div className="card-info-bottom">
                                            <p className="text-xs-medium neutral-500">Carved by the Colorado River in Arizona, United States</p><a href="#">
                                                <svg width={10} height={10} viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M5.00011 9.08347L9.08347 5.00011L5.00011 0.916748M9.08347 5.00011L0.916748 5.00011" stroke strokeLinecap="round" strokeLinejoin="round" />
                                                </svg></a>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-place">
                                    <div className="card-image"> <img src="/assets/lib/user/imgs/page/homepage1/place2.png" alt="Travila" /></div>
                                    <div className="card-info background-card">
                                        <div className="card-info-top">
                                            <h6 className="text-xl-bold"> <a className="neutral-1000" href="#">Machu Picchu</a></h6>
                                            <p className="text-xs card-rate"> <img src="/assets/lib/user/imgs/template/icons/star.svg" alt="Travila" />4/5</p>
                                        </div>
                                        <div className="card-info-bottom">
                                            <p className="text-xs-medium neutral-500">Carved by the Colorado River in Arizona, United States</p><a href="#">
                                                <svg width={10} height={10} viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M5.00011 9.08347L9.08347 5.00011L5.00011 0.916748M9.08347 5.00011L0.916748 5.00011" stroke strokeLinecap="round" strokeLinejoin="round" />
                                                </svg></a>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-place">
                                    <div className="card-image"> <img src="/assets/lib/user/imgs/page/homepage1/place3.png" alt="Travila" /></div>
                                    <div className="card-info background-card">
                                        <div className="card-info-top">
                                            <h6 className="text-xl-bold"> <a className="neutral-1000" href="#">Machu Picchu</a></h6>
                                            <p className="text-xs card-rate"> <img src="/assets/lib/user/imgs/template/icons/star.svg" alt="Travila" />4/5</p>
                                        </div>
                                        <div className="card-info-bottom">
                                            <p className="text-xs-medium neutral-500">Carved by the Colorado River in Arizona, United States</p><a href="#">
                                                <svg width={10} height={10} viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M5.00011 9.08347L9.08347 5.00011L5.00011 0.916748M9.08347 5.00011L0.916748 5.00011" stroke strokeLinecap="round" strokeLinejoin="round" />
                                                </svg></a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="box-contactus">
                            <h6 className="title-contactus neutral-1000">Contact Us</h6>
                            <div className="contact-info">
                                <p className="address-2 text-md-medium neutral-1000">4517 Washington Ave. <br />Manchester, Kentucky 39495</p>
                                <p className="hour-work-2 text-md-medium neutral-1000">Hours: 8:00 - 17:00, Mon - Sat</p>
                                <p className="email-2 text-md-medium neutral-1000">support@travila.com</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
