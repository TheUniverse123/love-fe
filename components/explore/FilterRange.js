export default function FilterRange() {
    return (
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
    )
}
