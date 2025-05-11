'use client'

import { useState } from "react";
import Button from "../button/Button";
import InputLabel from "./InputLabel";
import useProvinces from "@/app/hooks/useProvinces";
import useDistricts from "@/app/hooks/useDistricts";
import useWards from "@/app/hooks/useWards";

export default function EventInformationForm() {
    const [logoFile, setLogoFile] = useState(null);
    const [backgroundImage, setBackgroundImage] = useState(null);
    const [organizerLogo, setOrganizerLogo] = useState(null);
    const { provinces, loading: loadingProvinces, error: errorProvinces } = useProvinces();
    const [selectedProvince, setSelectedProvince] = useState('');
    const { districts, loading: loadingDistricts, error: errorDistricts } = useDistricts(selectedProvince);
    const [selectedDistrict, setSelectedDistrict] = useState('');
    const { wards, loading: loadingWards, error: errorWards } = useWards(selectedDistrict);
    const handleProvinceChange = (event) => {
        setSelectedProvince(event.target.value);
        setSelectedDistrict(''); // Reset quận/huyện khi tỉnh thay đổi
    };

    const handleDistrictChange = (event) => {
        setSelectedDistrict(event.target.value);
    };

    // Hàm xử lý tải tệp logo sự kiện
    const handleLogoUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setLogoFile(URL.createObjectURL(file)); // Lưu trữ URL của tệp để hiển thị hình ảnh
        }
    };

    // Hàm xử lý tải tệp ảnh nền sự kiện
    const handleBackgroundImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setBackgroundImage(URL.createObjectURL(file)); // Lưu trữ URL của tệp để hiển thị hình ảnh
        }
    };

    // Hàm xử lý tải tệp logo ban tổ chức
    const handleOrganizerLogoUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setOrganizerLogo(URL.createObjectURL(file)); // Lưu trữ URL của tệp để hiển thị hình ảnh
        }
    };

    return (
        <div className="mt-30">
            <div className="secondary-background border-radius-25 mb-35" style={{ padding: "20px 40px" }}>
                <div className="row mt-10">
                    <InputLabel label="Tải hình" />

                    {/* Input Tải logo sự kiện */}
                    <div className='col-md-5 mb-20'>
                        <div
                            className="flex-center form-input-background border-dash-white"
                            style={{ width: "381px", height: "381px", borderRadius: "32px", flexDirection: "column" }}
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
                    </div>

                    {/* Input Tải ảnh nền sự kiện */}
                    <div className='col-md-7 mb-20'>
                        <div
                            className="flex-center form-input-background border-dash-white"
                            style={{ width: "562px", height: "381px", borderRadius: "32px", flexDirection: "column" }}
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
                    </div>

                    <div className="col-md-12 mb-20">
                        <div className="form-group">
                            <InputLabel label="Tên sự kiện" />
                            <input style={{ padding: "16px 25px" }} className="form-control form-input-background border-none border-radius-31" type="text" placeholder="Tên sự kiện" />
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
                        </div>
                    </div>

                    <div className="col-md-12 mb-20">
                        <div className="form-group">
                            <InputLabel label="Tên địa điểm" isMarginLeft />
                            <input style={{ padding: "16px 25px" }} className="form-control form-input-background border-none border-radius-31" type="text" placeholder="Tên địa điểm" />
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
                        </div>
                    </div>

                    <div className="col-md-6 mb-20">
                        <div className="form-group">
                            <InputLabel label="Phường/Xã" isMarginLeft />
                            <select
                                style={{ padding: "16px 25px", color: "white", backgroundColor: "#333", maxHeight: "250px", overflowY: "auto" }}
                                className="form-control form-input-background border-none border-radius-31"
                                disabled={!selectedDistrict}
                            >
                                <option value="">Chọn Phường/Xã</option>
                                {wards.map(ward => (
                                    <option key={ward.code} value={ward.code}>
                                        {ward.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="col-md-6 mb-20">
                        <div className="form-group">
                            <InputLabel label="Số nhà, đường" isMarginLeft />
                            <input style={{ padding: "16px 25px" }} className="form-control form-input-background border-none border-radius-31" type="text" placeholder="Số nhà, đường" />
                        </div>
                    </div>
                </div>
            </div>

            <div className="secondary-background border-radius-25 mb-35" style={{ padding: "20px 40px" }}>
                <InputLabel label="Thể loại sự kiện" isMarginLeft />
                <div className="row mt-10 d-flex">
                    <div className="form-group d-flex">
                        <input style={{ padding: "16px 25px" }} className="form-control form-input-background border-none border-radius-31 mr-20" type="text" placeholder="Nghệ thuật & Thủ công" />
                        <input style={{ padding: "16px 25px" }} className="form-control form-input-background border-none border-radius-31 mr-20" type="text" placeholder="Ẩm thực & Pha chế" />
                        <input style={{ padding: "16px 25px" }} className="form-control form-input-background border-none border-radius-31 mr-20" type="text" placeholder="Sức khỏe" />
                        <input style={{ padding: "16px 25px" }} className="form-control form-input-background border-none border-radius-31 mr-20" type="text" placeholder="Phát triển kỹ năng" />
                    </div>
                </div>
            </div>

            <div className="secondary-background border-radius-25 mb-35" style={{ padding: "20px 40px" }}>
                <div className="row mt-10 d-flex">
                    <div className="col-md-12 mb-20">
                        <div className="form-group">
                            <InputLabel label="Mô tả sự kiện" isMarginLeft />
                            <textarea style={{ padding: "16px 25px", height: "333px" }} className="form-control form-input-background border-none border-radius-31" type="text" />
                        </div>
                    </div>
                </div>
            </div>

            <div className="secondary-background border-radius-25 mb-35" style={{ padding: "20px 40px" }}>
                <div className="row mt-10">
                    {/* Input Tải logo Ban Tổ chức */}
                    <div className="col-md-4 mb-20">
                        <div
                            className="flex-center form-input-background border-dash-white"
                            style={{ width: "293px", height: "293px", borderRadius: "32px", flexDirection: "column" }}
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
                    </div>

                    <div className="col-md-8 mb-20">
                        <div className="form-group">
                            <InputLabel label="Tên Ban Tổ chức" isMarginLeft />
                            <input style={{ padding: "16px 25px" }} className="form-control form-input-background border-none border-radius-31 ml-20" type="text" placeholder="Tên Ban Tổ chức" />
                        </div>

                        <div className="form-group">
                            <InputLabel label="Thông tin Ban Tổ chức" isMarginLeft />
                            <textarea style={{ padding: "16px 25px", height: "142px" }} className="form-control form-input-background border-none border-radius-31 ml-20" type="text" placeholder="Thông tin Ban Tổ chức" />
                        </div>
                    </div>
                </div>
            </div>

            <Button className="btn btn-default primary-background white-color w-100 mb-50" text="Tiếp tục" />
        </div>
    );
};
