import { useEffect, useState } from "react";

const FilterBlock = ({ title, items = [], selectedItems = [], onChange }) => {
    const [checkedItems, setCheckedItems] = useState(selectedItems ?? []);
    const [isOpen, setIsOpen] = useState(true);

    useEffect(() => {
        setCheckedItems(selectedItems ?? []);
    }, [selectedItems]);

    const handleCheckboxChange = (type, isChecked) => {
        let updatedChecked;
        if (isChecked) {
            updatedChecked = [...checkedItems, type];
        } else {
            updatedChecked = checkedItems.filter(item => item !== type);
        }
        setCheckedItems(updatedChecked);
        if (onChange) onChange(updatedChecked);
    };
    const toggleCollapse = () => {
        setIsOpen(prev => !prev);
    };

    return (
        <div className="block-filter border-1 border-color">
            <h6
                className="text-lg-bold item-collapse white-color"
                style={{ cursor: "pointer" }}
                onClick={toggleCollapse}
            >
                {title}
            </h6>
            {isOpen && (
                <div className="box-collapse scrollFilter">
                    <ul className="list-filter-checkbox">
                        {items.map((item, index) => (
                            <li key={index}>
                                <label className="cb-container">
                                    <input
                                        type="checkbox"
                                        checked={checkedItems.includes(item.type)}
                                        onChange={(e) => handleCheckboxChange(item.type, e.target.checked)}
                                    />
                                    <span className="text-sm-medium white-color">{item.label}</span>
                                    <span className="checkmark black-color" />
                                </label>
                                <span className="number-item border-background white-color">{item.count}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default FilterBlock;
