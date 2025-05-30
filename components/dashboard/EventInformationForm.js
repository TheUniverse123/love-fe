'use client'

import useDistricts from "@/app/hooks/useDistricts";
import useProvinces from "@/app/hooks/useProvinces";
import useWards from "@/app/hooks/useWards";
import { useState } from "react";
import InputLabel from "./InputLabel";

export default function EventInformationForm({ onContinue }) {
    const [logoFile, setLogoFile] = useState(null);
    const [backgroundImage, setBackgroundImage] = useState(null);
    const [organizerLogo, setOrganizerLogo] = useState(null);
    const { provinces, loading: loadingProvinces, error: errorProvinces } = useProvinces();
    const [selectedProvince, setSelectedProvince] = useState('');
    const { districts, loading: loadingDistricts, error: errorDistricts } = useDistricts(selectedProvince);
    const [selectedDistrict, setSelectedDistrict] = useState('');
    const { wards, loading: loadingWards, error: errorWards } = useWards(selectedDistrict);
    const [selectedWard, setSelectedWard] = useState('');
    const [eventName, setEventName] = useState('');
    const [eventAddressName, setEventAddressName] = useState('');
    const [houseNumber, setHouseNumber] = useState('');
    const [eventDescription, setEventDescription] = useState('');
    const [organizerName, setOrganizerName] = useState('');
    const [organizerInfo, setOrganizerInfo] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [errors, setErrors] = useState({});

    const categories = [
        "Nghệ thuật & Thủ công",
        "Ẩm thực & Pha chế",
        "Sức khỏe",
        "Phát triển kỹ năng"
    ];

    // Hàm giúp xóa lỗi theo key
    const clearError = (field) => {
        if (errors[field]) {
            setErrors(prevErrors => {
                const newErrors = { ...prevErrors };
                delete newErrors[field];
                return newErrors;
            });
        }
    };

    const handleProvinceChange = (event) => {
        const val = event.target.value;
        setSelectedProvince(val);
        setSelectedDistrict(''); // Reset quận/huyện khi tỉnh thay đổi
        setSelectedWard(''); // Reset phường/xã khi tỉnh thay đổi
        clearError('selectedProvince');
        clearError('selectedDistrict');
        clearError('selectedWard');
    };

    const handleDistrictChange = (event) => {
        const val = event.target.value;
        setSelectedDistrict(val);
        setSelectedWard(''); // Reset phường/xã khi huyện thay đổi
        clearError('selectedDistrict');
        clearError('selectedWard');
    };

    const handleWardChange = (event) => {
        const val = event.target.value;
        setSelectedWard(val);
        clearError('selectedWard');
    };

    // Hàm xử lý tải tệp logo sự kiện
    const handleLogoUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setLogoFile(URL.createObjectURL(file)); // Lưu trữ URL của tệp để hiển thị hình ảnh
            clearError('logoFile');
        }
    };

    // Hàm xử lý tải tệp ảnh nền sự kiện
    const handleBackgroundImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setBackgroundImage(URL.createObjectURL(file)); // Lưu trữ URL của tệp để hiển thị hình ảnh
            clearError('backgroundImage');
        }
    };

    // Hàm xử lý tải tệp logo ban tổ chức
    const handleOrganizerLogoUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setOrganizerLogo(URL.createObjectURL(file)); // Lưu trữ URL của tệp để hiển thị hình ảnh
            clearError('organizerLogo');
        }
    };

    // Handle chọn thể loại sự kiện (chỉ 1)
    const handleCategoryClick = (category) => {
        setSelectedCategory(category);
        clearError('selectedCategory');
    };

    // Handle radio payment method
    const handlePaymentMethodChange = (e) => {
        setPaymentMethod(e.target.id);
        clearError('paymentMethod');
    };

    const handleEventNameChange = (e) => {
        setEventName(e.target.value);
        clearError('eventName');
    };

    const handleEventAddressNameChange = (e) => {
        setEventAddressName(e.target.value);
        clearError('eventAddressName');
    };

    const handleHouseNumberChange = (e) => {
        setHouseNumber(e.target.value);
        clearError('houseNumber');
    };

    const handleEventDescriptionChange = (e) => {
        setEventDescription(e.target.value);
        clearError('eventDescription');
    };

    const handleOrganizerNameChange = (e) => {
        setOrganizerName(e.target.value);
        clearError('organizerName');
    };

    const handleOrganizerInfoChange = (e) => {
        setOrganizerInfo(e.target.value);
        clearError('organizerInfo');
    };

    // Validate form
    const validate = () => {
        const newErrors = {};

        if (!logoFile) newErrors.logoFile = "Vui lòng tải logo sự kiện";
        if (!backgroundImage) newErrors.backgroundImage = "Vui lòng tải ảnh nền sự kiện";
        if (!eventName.trim()) newErrors.eventName = "Vui lòng nhập tên sự kiện";
        if (!paymentMethod) newErrors.paymentMethod = "Vui lòng chọn hình thức sự kiện";
        if (!eventAddressName.trim()) newErrors.eventAddressName = "Vui lòng nhập tên địa điểm";
        if (!selectedProvince) newErrors.selectedProvince = "Vui lòng chọn Tỉnh/Thành phố";
        if (!selectedDistrict) newErrors.selectedDistrict = "Vui lòng chọn Quận/Huyện";
        if (!selectedWard) newErrors.selectedWard = "Vui lòng chọn Phường/Xã";
        if (!houseNumber.trim()) newErrors.houseNumber = "Vui lòng nhập số nhà, đường";
        if (!selectedCategory) newErrors.selectedCategory = "Vui lòng chọn thể loại sự kiện";
        if (!eventDescription.trim()) newErrors.eventDescription = "Vui lòng nhập mô tả sự kiện";
        if (!organizerLogo) newErrors.organizerLogo = "Vui lòng tải logo Ban Tổ chức";
        if (!organizerName.trim()) newErrors.organizerName = "Vui lòng nhập tên Ban Tổ chức";
        if (!organizerInfo.trim()) newErrors.organizerInfo = "Vui lòng nhập thông tin Ban Tổ chức";

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = () => {
        if (validate()) {
            onContinue()
        } else {
            window.scrollTo({ top: 0, behavior: "smooth" })
        }
    };

    return (
        <div className="mt-30">
            <div className="secondary-background border-radius-25 mb-35" style={{ padding: "20px 40px" }}>
                <div className="row mt-10">
                    <InputLabel label="Tải hình" />
                    <div className='col-md-5 mb-20'>
                        <div
                            className="flex-center form-input-background border-dash-white"
                            style={{ width: "100%", height: "381px", borderRadius: "32px", flexDirection: "column" }}
                            onClick={() => document.getElementById('logo-upload').click()}
                        >
                            {logoFile ? (
                                <img src={logoFile} alt="Logo Sự kiện" className="w-100 h-100" style={{ borderRadius: "32px", objectFit: "cover" }} />
                            ) : (
                                <>
                                    <img src="/assets/icon/upload-icon.svg" alt="Icon" />
                                    <div className="mt-25">
                                        <span className="primary-color text-sm-bold">Tải tệp lên</span>
                                    </div>
                                    <p style={{ color: "#94A3B8" }}>Thêm logo sự kiện</p>
                                </>
                            )}
                            <input
                                type="file"
                                style={{ display: 'none' }}
                                id="logo-upload"
                                onChange={handleLogoUpload}
                            />
                        </div>
                        {errors.logoFile && <p className="error-message-validate font-12">{errors.logoFile}</p>}
                    </div>

                    {/* Input Tải ảnh nền sự kiện */}
                    <div className='col-md-7 mb-20'>
                        <div
                            className="flex-center form-input-background border-dash-white"
                            style={{ width: "100%", height: "381px", borderRadius: "32px", flexDirection: "column" }}
                            onClick={() => document.getElementById('background-upload').click()} // Mở hộp thoại chọn tệp khi bấm vào khung
                        >
                            {backgroundImage ? (
                                <img src={backgroundImage} alt="Background Sự kiện" className="w-100 h-100" style={{ borderRadius: "32px", objectFit: "cover" }} />
                            ) : (
                                <>
                                    <img src="/assets/icon/upload-icon.svg" alt="Icon" />
                                    <div className="mt-25">
                                        <span className="primary-color text-sm-bold">Tải tệp lên</span>
                                    </div>
                                    <p style={{ color: "#94A3B8" }}>Thêm ảnh nền sự kiện</p>
                                </>
                            )}
                            <input
                                type="file"
                                style={{ display: 'none' }}
                                id="background-upload"
                                onChange={handleBackgroundImageUpload}
                            />
                        </div>
                        {errors.backgroundImage && <p className="error-message-validate font-12">{errors.backgroundImage}</p>}
                    </div>

                    <div className="col-md-12 mb-20">
                        <div className="form-group">
                            <InputLabel label="Tên sự kiện" />
                            <input
                                style={{ padding: "16px 25px" }}
                                className="form-control form-input-background border-none border-radius-31"
                                type="text"
                                placeholder="Tên sự kiện"
                                value={eventName}
                                onChange={handleEventNameChange}
                            />
                            {errors.eventName && <p className="error-message-validate font-12">{errors.eventName}</p>}
                        </div>
                    </div>
                </div>
            </div>

            <div className="secondary-background border-radius-25 mb-35" style={{ padding: "20px 40px" }}>
                <div className="row mt-10">
                    <div className="col-md-12 mb-20">
                        <div className="form-group ml-25">
                            <InputLabel label="Địa chỉ sự kiện" />
                            <div className="row" style={{ width: "70%", alignItems: "center" }}>
                                <div className="col-md-4" style={{ display: 'flex', alignItems: 'center' }}>
                                    <div className="item-payment-method" style={{ display: 'flex', alignItems: 'center' }}>
                                        <input
                                            type="radio"
                                            id="event-payment"
                                            name="payment-method"
                                            style={{
                                                width: '23px',
                                                height: '23px',
                                                backgroundColor: '#fff',
                                                borderRadius: '50%',
                                                marginRight: '10px',
                                                accentColor: '#fff',
                                                border: '1px solid #fff'
                                            }}
                                            checked={paymentMethod === "event-payment"}
                                            onChange={handlePaymentMethodChange}
                                        />
                                        <label
                                            htmlFor="event-payment"
                                            className="item-payment-method-text item-payment"
                                            style={{ color: '#fff', fontSize: '14px', cursor: 'pointer', margin: "0!important" }}
                                        >
                                            Sự kiện offline
                                        </label>
                                    </div>
                                </div>
                                <div className="col-md-4" style={{ display: 'flex', alignItems: 'center' }}>
                                    <div className="item-payment-method" style={{ display: 'flex', alignItems: 'center' }}>
                                        <input
                                            type="radio"
                                            id="credit-card-payment"
                                            name="payment-method"
                                            style={{
                                                width: '23px',
                                                height: '23px',
                                                backgroundColor: '#fff',
                                                borderRadius: '50%',
                                                marginRight: '10px',
                                                accentColor: '#fff',
                                                border: '1px solid #fff'
                                            }}
                                            checked={paymentMethod === "credit-card-payment"}
                                            onChange={handlePaymentMethodChange}
                                        />
                                        <label
                                            htmlFor="credit-card-payment"
                                            className="item-payment-method-text item-payment"
                                            style={{ color: '#fff', fontSize: '14px', cursor: 'pointer', margin: "0!important" }}
                                        >
                                            Sự kiện online
                                        </label>
                                    </div>
                                </div>
                            </div>
                            {errors.paymentMethod && <p className="error-message-validate font-12">{errors.paymentMethod}</p>}
                        </div>
                    </div>

                    <div className="col-md-12 mb-20">
                        <div className="form-group">
                            <InputLabel label="Tên địa điểm" isMarginLeft />
                            <input
                                style={{ padding: "16px 25px" }}
                                className="form-control form-input-background border-none border-radius-31"
                                type="text"
                                placeholder="Tên địa điểm"
                                value={eventAddressName}
                                onChange={handleEventAddressNameChange}
                            />
                            {errors.eventAddressName && <p className="error-message-validate font-12">{errors.eventAddressName}</p>}
                        </div>
                    </div>

                    <div className="col-md-6 mb-20">
                        <div className="form-group">
                            <InputLabel label="Tỉnh/Thành phố" isMarginLeft />
                            <select
                                style={{ padding: "16px 25px", color: "white", backgroundColor: "#333", maxHeight: "250px", overflowY: "auto" }}
                                className="form-control form-input-background border-none border-radius-31"
                                value={selectedProvince}
                                onChange={handleProvinceChange}
                            >
                                <option value="" disabled>Chọn Tỉnh/Thành phố</option>
                                {provinces.map(province => (
                                    <option key={province.code} value={province.code}>
                                        {province.name}
                                    </option>
                                ))}
                            </select>
                            {errors.selectedProvince && <p className="error-message-validate font-12">{errors.selectedProvince}</p>}
                        </div>
                    </div>

                    <div className="col-md-6 mb-20">
                        <div className="form-group">
                            <InputLabel label="Quận/Huyện" isMarginLeft />
                            <select
                                style={{ padding: "16px 25px", color: "white", backgroundColor: "#333", maxHeight: "250px", overflowY: "auto" }}
                                className="form-control form-input-background border-none border-radius-31"
                                value={selectedDistrict}
                                onChange={handleDistrictChange}
                                disabled={!selectedProvince}
                            >
                                <option value="">Chọn Quận/Huyện</option>
                                {districts.map(district => (
                                    <option key={district.code} value={district.code}>
                                        {district.name}
                                    </option>
                                ))}
                            </select>
                            {errors.selectedDistrict && <p className="error-message-validate font-12">{errors.selectedDistrict}</p>}
                        </div>
                    </div>

                    <div className="col-md-6 mb-20">
                        <div className="form-group">
                            <InputLabel label="Phường/Xã" isMarginLeft />
                            <select
                                style={{ padding: "16px 25px", color: "white", backgroundColor: "#333", maxHeight: "250px", overflowY: "auto" }}
                                className="form-control form-input-background border-none border-radius-31"
                                value={selectedWard}
                                onChange={handleWardChange}
                                disabled={!selectedDistrict}
                            >
                                <option value="">Chọn Phường/Xã</option>
                                {wards.map(ward => (
                                    <option key={ward.code} value={ward.code}>
                                        {ward.name}
                                    </option>
                                ))}
                            </select>
                            {errors.selectedWard && <p className="error-message-validate font-12">{errors.selectedWard}</p>}
                        </div>
                    </div>

                    <div className="col-md-6 mb-20">
                        <div className="form-group">
                            <InputLabel label="Số nhà, đường" isMarginLeft />
                            <input
                                style={{ padding: "16px 25px" }}
                                className="form-control form-input-background border-none border-radius-31"
                                type="text"
                                placeholder="Số nhà, đường"
                                value={houseNumber}
                                onChange={handleHouseNumberChange}
                            />
                            {errors.houseNumber && <p className="error-message-validate font-12">{errors.houseNumber}</p>}
                        </div>
                    </div>
                </div>
            </div>

            {/* Thể loại sự kiện chọn 1 */}
            <div className="secondary-background border-radius-25 mb-35" style={{ padding: "20px 40px" }}>
                <InputLabel label="Thể loại sự kiện" isMarginLeft />
                <div className="row mt-10 d-flex">
                    <div className="form-group d-flex flex-wrap gap-3">
                        {categories.map(category => (
                            <button
                                type="button"
                                key={category}
                                onClick={() => handleCategoryClick(category)}
                                style={{
                                    padding: "16px 25px",
                                    borderRadius: "31px",
                                    border: "none",
                                    cursor: "pointer",
                                    backgroundColor: selectedCategory === category ? "var(--bg-primary-color)" : "#202020",
                                    color: "white",
                                    minWidth: "180px",
                                    fontWeight: "600"
                                }}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                    {errors.selectedCategory && <p className="error-message-validate font-12" style={{ marginTop: "5px" }}>{errors.selectedCategory}</p>}
                </div>
            </div>

            <div className="secondary-background border-radius-25 mb-35" style={{ padding: "20px 40px" }}>
                <div className="row mt-10 d-flex">
                    <div className="col-md-12 mb-20">
                        <div className="form-group">
                            <InputLabel label="Mô tả sự kiện" isMarginLeft />
                            <textarea
                                style={{ padding: "16px 25px", height: "333px" }}
                                className="form-control form-input-background border-none border-radius-31"
                                type="text"
                                value={eventDescription}
                                onChange={handleEventDescriptionChange}
                            />
                            {errors.eventDescription && <p className="error-message-validate font-12">{errors.eventDescription}</p>}
                        </div>
                    </div>
                </div>
            </div>

            <div className="secondary-background border-radius-25 mb-35" style={{ padding: "20px 40px" }}>
                <div className="row mt-10">
                    {/* Input Tải logo Ban Tổ chức */}
                    <div className="col-md-5 mb-20">
                        <div
                            className="flex-center form-input-background border-dash-white"
                            style={{ width: "100%", height: "293px", borderRadius: "32px", flexDirection: "column" }}
                            onClick={() => document.getElementById('organizer-logo-upload').click()} // Mở hộp thoại chọn tệp khi bấm vào khung
                        >
                            {organizerLogo ? (
                                <img src={organizerLogo} alt="Logo Ban Tổ chức" className="w-100 h-100" style={{ objectFit: "cover", borderRadius: "32px" }} />
                            ) : (
                                <>
                                    <img src="/assets/icon/upload-icon.svg" alt="Icon" />
                                    <div className="mt-25">
                                        <span className="primary-color text-sm-bold">Tải tệp lên</span>
                                    </div>
                                    <p style={{ color: "#94A3B8" }}>Thêm logo Ban Tổ chức</p>
                                </>
                            )}
                            <input
                                type="file"
                                style={{ display: 'none' }}
                                id="organizer-logo-upload"
                                onChange={handleOrganizerLogoUpload}
                            />
                        </div>
                        {errors.organizerLogo && <p className="error-message-validate font-12">{errors.organizerLogo}</p>}
                    </div>

                    <div className="col-md-7 mb-20">
                        <div className="form-group">
                            <InputLabel label="Tên Ban Tổ chức" isMarginLeft />
                            <input
                                style={{ padding: "16px 25px" }}
                                className="form-control form-input-background border-none border-radius-31 ml-20"
                                type="text"
                                placeholder="Tên Ban Tổ chức"
                                value={organizerName}
                                onChange={handleOrganizerNameChange}
                            />
                            {errors.organizerName && <p className="error-message-validate font-12 ml-20">{errors.organizerName}</p>}
                        </div>

                        <div className="form-group">
                            <InputLabel label="Thông tin Ban Tổ chức" isMarginLeft />
                            <textarea
                                style={{ padding: "16px 25px", height: "142px" }}
                                className="form-control form-input-background border-none border-radius-31 ml-20"
                                type="text"
                                placeholder="Thông tin Ban Tổ chức"
                                value={organizerInfo}
                                onChange={handleOrganizerInfoChange}
                            />
                            {errors.organizerInfo && <p className="error-message-validate font-12 ml-20">{errors.organizerInfo}</p>}
                        </div>
                    </div>
                </div>
            </div>
            <button
                className="btn btn-default primary-background white-color w-100 mb-50"
                onClick={handleSubmit}
            >Tiếp tục</button>
        </div>
    );
};
