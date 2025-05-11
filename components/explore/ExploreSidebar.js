import { filters, posts } from '@/data';
import FilterBlock from './FilterBlock';
import PopularPostsSidebar from './PopularPostsSidebar';

export default function ExploreSidebar() {
    return (
        <div className="content-left order-lg-first">
            <div className="sidebar-left border-1 main-secondary-background border-color">
                <div className="box-filters-sidebar">
                    {/* Phần lọc theo giá */}
                    <div className="block-filter border-1">
                        <h6 className="text-lg-bold item-collapse white-color">Lọc theo giá </h6>
                        <div className="box-collapse scrollFilter">
                            <div className="pt-20">
                                <div className="box-slider-range">
                                    <div id="slider-range" />
                                    <div className="box-value-price">
                                        <span className="text-md-medium white-color">$0
                                        </span>
                                        <span className="text-md-medium white-color">$500
                                        </span>
                                    </div>
                                    <input className="value-money" type="hidden" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {filters.map((filter, index) => (
                        <FilterBlock key={index} title={filter.title} items={filter.items} />
                    ))}

                    <div className="block-filter border-1 border-color">
                        <h6 className="text-lg-bold item-collapse white-color">Đánh giá</h6>
                        <div className="box-collapse scrollFilter">
                            <ul className="list-filter-checkbox">
                                <li>
                                    <label className="cb-container">
                                        <input type="checkbox" />
                                        <span className="text-sm-medium white-color">
                                            <img src="/assets/lib/user/imgs/template/icons/star-yellow.svg" alt="Travila" />
                                            <img src="/assets/lib/user/imgs/template/icons/star-yellow.svg" alt="Travila" />
                                            <img src="/assets/lib/user/imgs/template/icons/star-yellow.svg" alt="Travila" />
                                            <img src="/assets/lib/user/imgs/template/icons/star-yellow.svg" alt="Travila" />
                                            <img src="/assets/lib/user/imgs/template/icons/star-yellow.svg" alt="Travila" />
                                        </span>
                                        <span className="checkmark black-color" />
                                    </label>
                                </li>
                                <li>
                                    <label className="cb-container">
                                        <input type="checkbox" />
                                        <span className="text-sm-medium white-color">
                                            <img src="/assets/lib/user/imgs/template/icons/star-yellow.svg" alt="Travila" />
                                            <img src="/assets/lib/user/imgs/template/icons/star-yellow.svg" alt="Travila" />
                                            <img src="/assets/lib/user/imgs/template/icons/star-yellow.svg" alt="Travila" />
                                            <img src="/assets/lib/user/imgs/template/icons/star-yellow.svg" alt="Travila" />
                                            <img src="/assets/lib/user/imgs/template/icons/star-grey.svg" alt="Travila" />
                                        </span>
                                        <span className="checkmark black-color" />
                                    </label>
                                </li>
                                <li>
                                    <label className="cb-container">
                                        <input type="checkbox" />
                                        <span className="text-sm-medium white-color">
                                            <img src="/assets/lib/user/imgs/template/icons/star-yellow.svg" alt="Travila" />
                                            <img src="/assets/lib/user/imgs/template/icons/star-yellow.svg" alt="Travila" />
                                            <img src="/assets/lib/user/imgs/template/icons/star-yellow.svg" alt="Travila" />
                                            <img src="/assets/lib/user/imgs/template/icons/star-grey.svg" alt="Travila" />
                                            <img src="/assets/lib/user/imgs/template/icons/star-grey.svg" alt="Travila" />
                                        </span>
                                        <span className="checkmark black-color" />
                                    </label>
                                </li>
                                <li>
                                    <label className="cb-container">
                                        <input type="checkbox" />
                                        <span className="text-sm-medium white-color">
                                            <img src="/assets/lib/user/imgs/template/icons/star-yellow.svg" alt="Travila" />
                                            <img src="/assets/lib/user/imgs/template/icons/star-yellow.svg" alt="Travila" />
                                            <img src="/assets/lib/user/imgs/template/icons/star-grey.svg" alt="Travila" />
                                            <img src="/assets/lib/user/imgs/template/icons/star-grey.svg" alt="Travila" />
                                            <img src="/assets/lib/user/imgs/template/icons/star-grey.svg" alt="Travila" />
                                        </span>
                                        <span className="checkmark black-color" />
                                    </label>
                                </li>
                                <li>
                                    <label className="cb-container">
                                        <input type="checkbox" />
                                        <span className="text-sm-medium white-color">
                                            <img src="/assets/lib/user/imgs/template/icons/star-yellow.svg" alt="Travila" />
                                            <img src="/assets/lib/user/imgs/template/icons/star-grey.svg" alt="Travila" />
                                            <img src="/assets/lib/user/imgs/template/icons/star-grey.svg" alt="Travila" />
                                            <img src="/assets/lib/user/imgs/template/icons/star-grey.svg" alt="Travila" />
                                            <img src="/assets/lib/user/imgs/template/icons/star-grey.svg" alt="Travila" />
                                        </span>
                                        <span className="checkmark black-color" />
                                    </label>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <PopularPostsSidebar title="Workshop nổi bật" posts={posts} />

            <div className='mb-10'>
                <img src='/assets/banner/banner-small.png' alt='banner-small' />
            </div>

            <div className='mb-10'>
                <img src='/assets/banner/banner-small.png' alt='banner-small' />
            </div>
        </div>
    );
}
