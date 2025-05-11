'use client'

import { useState } from "react";
import Calendar from "../calendar/Calendar";
import InputLabel from "./InputLabel";

export default function TimeAndTicket() {
    const [isChecked, setIsChecked] = useState
        (false);

    const [ticketFile, setTicketFile] = useState(null);

    const handleChange = () => {
        setIsChecked(prevState => !prevState);
    };
    // Hàm xử lý tải tệp logo sự kiện
    const handleLogoUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setTicketFile(URL.createObjectURL(file)); // Lưu trữ URL của tệp để hiển thị hình ảnh
        }
    };


    return (
        <div className="mt-30">
            <div className="secondary-background border-radius-25 mb-35" style={{
                padding: "20px 40px",
            }}>
                <InputLabel label="Ngày sự kiện" />

                <div className="row mt-45 p-20 pt-30 border-1px-color4 border-radius-10 flex-space">
                    <div className="col-md-6 mb-20 pr-50">
                        <p className="text-md-bold white-color text-center mb-10">Thời gian bắt đầu</p>
                        <Calendar />
                    </div>

                    <div className="col-md-6 mb-20 pl-50">
                        <p className="text-md-bold white-color text-center mb-10">Thời gian kết thúc</p>
                        <Calendar />
                    </div>
                </div>
            </div>

            <div className="secondary-background border-radius-25 mb-35" style={{
                padding: "20px 40px",
            }}>
                <div className="row mt-10">
                    <div className="col-md-12 mb-20">
                        <div className="form-group">
                            <InputLabel label="Tạo loại vé" isMarginLeft />
                            <input style={{ padding: "16px 25px" }} className="form-control form-input-background border-none border-radius-31" type="text" placeholder="Tên vé" />
                        </div>
                    </div>

                    <div className="col-md-2 mb-20">
                        <div className="form-group">
                            <InputLabel label="Tổng số lượng vé" isMarginLeft />
                            <input style={{ padding: "16px 25px" }} className="form-control form-input-background border-none border-radius-31" type="text" placeholder="12" />
                        </div>
                    </div>

                    <div className="col-md-3 mb-20">
                        <div className="form-group">
                            <InputLabel label="Số vé tối thiểu trong 1 đơn hàng" isMarginLeft />
                            <input style={{ padding: "16px 25px" }} className="form-control form-input-background border-none border-radius-31" type="text" placeholder="12" />
                        </div>
                    </div>

                    <div className="col-md-3 mb-20">
                        <div className="form-group">
                            <InputLabel label="Số vé tối đa trong 1 đơn hàng" isMarginLeft />
                            <input style={{ padding: "16px 25px" }} className="form-control form-input-background border-none border-radius-31" type="text" placeholder="12" />
                        </div>
                    </div>

                    <div className="col-md-2 mb-20">
                        <div className="form-group">
                            <InputLabel label="Giá vé" isMarginLeft />
                            <input style={{ padding: "16px 25px" }} className="form-control form-input-background border-none border-radius-31" type="text" placeholder="12" />
                        </div>
                    </div>

                    <div className="col-md-2" style={{ display: 'flex', alignItems: 'center' }}>
                        <div className="item-payment-method" style={{ display: 'flex', alignItems: 'center' }}>
                            <input
                                type="checkbox"
                                id="event-payment"
                                name="payment-method"
                                checked={isChecked}  // Điều chỉnh theo trạng thái
                                onChange={handleChange}  // Cập nhật trạng thái khi thay đổi
                                style={{
                                    display: 'none',
                                    // width: '23px',
                                    // height: '23px',
                                    // backgroundColor: '#fff',
                                    // borderRadius: '50%',
                                    // marginRight: '10px',
                                    // accentColor: '#fff',
                                    // border: '1px solid #fff'
                                }}
                            />
                            <div style={{
                                width: '21px',
                                height: '21px',
                                backgroundColor: '#fff',
                                borderRadius: '50%',
                                marginRight: '10px',
                                accentColor: '#fff',
                                border: '1px solid #fff'
                            }} className="flex-center">
                                {isChecked && (
                                    <div style={{
                                        width: '50%',
                                        height: '50%',
                                        backgroundColor: '#000',
                                        borderRadius: '50%',
                                    }}></div>
                                )}
                            </div>
                            <label
                                htmlFor="event-payment"
                                className="item-payment-method-text item-payment"
                                style={{ color: '#fff', fontSize: '14px', cursor: 'pointer', margin: '0!important' }}
                            >
                                Miễn phí
                            </label>
                        </div>
                    </div>

                </div>

                <div className="row p-20 pt-30 border-1px-color4 border-radius-10 flex-space">
                    <div className="col-md-6 mb-20 pr-50">
                        <p className="text-md-bold white-color text-center mb-10">Thời gian bắt đầu bán vé</p>
                        <Calendar />
                    </div>

                    <div className="col-md-6 mb-20 pl-50">
                        <p className="text-md-bold white-color text-center mb-10">Thời gian kết thúc bán vé</p>
                        <Calendar />
                    </div>
                </div>

                <div className="row mt-20">
                    <div className="col-md-8 mb-20">
                        <div className="form-group">
                            <InputLabel label="Mô tả sự kiện" isMarginLeft />
                            <textarea style={{ padding: "16px 25px", height: "193px" }} className="form-control form-input-background border-none border-radius-31" type="text" />
                        </div>
                    </div>

                    <div className='col-md-4 mb-20'>
                        <InputLabel label="Hình ảnh vé" isMarginLeft isRequired={false} />
                        <div
                            className="flex-center form-input-background border-dash-white"
                            style={{ width: "367px", height: "192px", borderRadius: "32px", flexDirection: "column" }}
                            onClick={() => document.getElementById('ticket-upload').click()} // Mở hộp thoại chọn tệp khi bấm vào khung
                        >
                            {ticketFile ? (
                                <img src={ticketFile} alt="Logo Ban Tổ chức" className="w-100 h-100" style={{ objectFit: "cover", borderRadius: "32px" }} />
                            ) : (
                                <>
                                    <img src="/assets/icon/upload-icon.svg" alt="Icon" />
                                    <div className="mt-25">
                                        <span className="primary-color text-sm-bold">Tải tệp lên</span>
                                    </div>
                                </>
                            )}
                            <input
                                type="file"
                                style={{ display: 'none' }}
                                id="ticket-upload"
                                onChange={handleLogoUpload}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
