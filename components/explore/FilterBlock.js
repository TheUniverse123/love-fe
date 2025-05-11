const FilterBlock = ({ title, items }) => {
    return (
        <div className="block-filter border-1 border-color">
            <h6 className="text-lg-bold item-collapse white-color">{title}</h6>
            <div className="box-collapse scrollFilter">
                <ul className="list-filter-checkbox">
                    {items.map((item, index) => (
                        <li key={index}>
                            <label className="cb-container">
                                <input type="checkbox" />
                                <span className="text-sm-medium white-color">{item.label}</span>
                                <span className="checkmark black-color" />
                            </label>
                            <span className="number-item border-background white-color">{item.count}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default FilterBlock;
