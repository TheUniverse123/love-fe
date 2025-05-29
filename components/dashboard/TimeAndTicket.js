'use client'

import { useState } from "react";
import Calendar from "../calendar/Calendar";
import InputLabel from "./InputLabel";

export default function TimeAndTicket() {
    const [isChecked, setIsChecked] = useState(false);
    const [ticketFile, setTicketFile] = useState(null);
    const [eventStartDate, setEventStartDate] = useState(null);
    const [eventEndDate, setEventEndDate] = useState(null);
    const [ticketSaleStartDate, setTicketSaleStartDate] = useState(null);
    const [ticketSaleEndDate, setTicketSaleEndDate] = useState(null);

    const [ticketName, setTicketName] = useState('');
    const [totalTickets, setTotalTickets] = useState(0);
    const [minTickets, setMinTickets] = useState(0);
    const [maxTickets, setMaxTickets] = useState(0);
    const [ticketPrice, setTicketPrice] = useState(0);
    const [eventDescription, setEventDescription] = useState('');
    const [errors, setErrors] = useState({});

    const clearError = (field) => {
        if (errors[field]) {
            setErrors(prev => {
                const copy = { ...prev };
                delete copy[field];
                return copy;
            });
        }
    };

    const handleChange = () => {
        setIsChecked(prevState => {
            if (!prevState) {
                setTicketPrice(0);  // Nếu chọn miễn phí, giá vé sẽ là 0
            } else {
                setTicketPrice("");  // Khi bỏ chọn, giá vé có thể nhập lại
            }
            return !prevState;
        });
        clearError('isChecked');
    };

    const handleLogoUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setTicketFile(URL.createObjectURL(file));
            clearError('ticketFile');
        }
    };

    const handleTicketNameChange = e => {
        setTicketName(e.target.value);
        clearError('ticketName');
    };
    const handleTotalTicketsChange = e => {
        const value = e.target.value;
        if (value >= 0 && value <= 999) {
            setTotalTickets(value);
            clearError('totalTickets');
        }
    };
    const handleMinTicketsChange = e => {
        const value = e.target.value;
        if (value >= 0 && value <= 999) {
            setMinTickets(value);
            clearError('minTickets');
        }
    };
    const handleMaxTicketsChange = e => {
        const value = e.target.value;
        if (value >= 0 && value <= 999) {
            setMaxTickets(value);
            clearError('maxTickets');
        }
    };
    const handleTicketPriceChange = (e) => {
        if (!isChecked) {  // Nếu checkbox không được chọn
            setTicketPrice(e.target.value);
            clearError('ticketPrice');
        } else {
            setTicketPrice(0);  // Nếu checkbox được chọn, giá vé sẽ là 0 và không thay đổi
        }
    };

    const handleEventDescriptionChange = e => {
        setEventDescription(e.target.value);
        clearError('eventDescription');
    };

    // Hàm nhận giá trị từ Calendar
    const handleEventStartDateChange = (date) => {
        setEventStartDate(date);
        clearError('eventStartDate');
    };

    const handleEventEndDateChange = (date) => {
        setEventEndDate(date);
        clearError('eventEndDate');
    };

    const handleTicketSaleStartDateChange = (date) => {
        setTicketSaleStartDate(date);
        clearError('ticketSaleStartDate');
    };

    const handleTicketSaleEndDateChange = (date) => {
        setTicketSaleEndDate(date);
        clearError('ticketSaleEndDate');
    };

    const validateTimeRange = (start, end) => {
        if (start && end) {
            const diff = (end - start) / (1000 * 60 * 60); // Khoảng cách giờ
            if (diff < 0) return "Thời gian kết thúc phải sau thời gian bắt đầu";
            if (diff > 4) return "Khoảng cách giữa thời gian bắt đầu và kết thúc không được quá 4 giờ";
        }
        return null;
    };

    const validate = () => {
        const newErrors = {};

        if (!ticketName.trim()) newErrors.ticketName = "Vui lòng nhập tên vé";
        if (isNaN(totalTickets) || Number(totalTickets) < 0 || Number(totalTickets) > 999) newErrors.totalTickets = "Vui lòng nhập tổng số lượng vé hợp lệ (0-999)";
        if (isNaN(minTickets) || Number(minTickets) < 0 || Number(minTickets) > 999) newErrors.minTickets = "Vui lòng nhập số vé tối thiểu hợp lệ (0-999)";
        if (isNaN(maxTickets) || Number(maxTickets) < 0 || Number(maxTickets) > 999) newErrors.maxTickets = "Vui lòng nhập số vé tối đa hợp lệ (0-999)";
        else if (Number(minTickets) > Number(maxTickets)) newErrors.maxTickets = "Số vé tối đa phải lớn hơn hoặc bằng số vé tối thiểu";
        console.log(ticketPrice)
        if (isNaN(ticketPrice) || Number(ticketPrice) < 0) newErrors.ticketPrice = "Vui lòng nhập giá vé hợp lệ";
        if (!eventStartDate) newErrors.eventStartDate = "Vui lòng chọn thời gian bắt đầu sự kiện";
        if (!eventEndDate) newErrors.eventEndDate = "Vui lòng chọn thời gian kết thúc sự kiện";
        else {
            const timeValidationError = validateTimeRange(eventStartDate, eventEndDate);
            if (timeValidationError) newErrors.eventEndDate = timeValidationError;
        }

        // Kiểm tra thời gian bắt đầu sự kiện phải ít nhất 1 tuần so với hiện tại
        const currentDate = new Date();
        const minStartDate = new Date(currentDate.setDate(currentDate.getDate() + 7)); // Thời gian hiện tại cộng thêm 7 ngày

        if (eventStartDate && eventStartDate < minStartDate) {
            newErrors.eventStartDate = "Thời gian bắt đầu sự kiện phải ít nhất 1 tuần sau thời gian hiện tại";
        }

        // Kiểm tra thời gian bắt đầu bán vé phải trước thời gian bắt đầu sự kiện
        if (ticketSaleStartDate && eventStartDate) {
            const saleStartBeforeEventStart = ticketSaleStartDate > eventStartDate;
            if (saleStartBeforeEventStart) {
                newErrors.ticketSaleStartDate = "Thời gian bắt đầu bán vé phải trước thời gian bắt đầu sự kiện";
            }
        }

        // Kiểm tra thời gian kết thúc bán vé phải trước thời gian kết thúc sự kiện
        if (ticketSaleEndDate && eventEndDate) {
            const saleEndBeforeEventEnd = ticketSaleEndDate > eventEndDate;
            if (saleEndBeforeEventEnd) {
                newErrors.ticketSaleEndDate = "Thời gian kết thúc bán vé phải trước thời gian kết thúc sự kiện";
            }
        }

        if (!ticketSaleStartDate) newErrors.ticketSaleStartDate = "Vui lòng chọn thời gian bắt đầu bán vé";
        if (!ticketSaleEndDate) newErrors.ticketSaleEndDate = "Vui lòng chọn thời gian kết thúc bán vé";

        if (!eventDescription.trim()) newErrors.eventDescription = "Vui lòng nhập mô tả sự kiện";
        if (!ticketFile) newErrors.ticketFile = "Vui lòng tải hình ảnh vé";
        if (!isChecked) newErrors.isChecked = "Vui lòng xác nhận vé miễn phí nếu có";

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = () => {
        if (validate()) {
            alert("Form hợp lệ, tiến hành gửi dữ liệu");
        } else {
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    };

    return (
        <div className="mt-30">
            <div className="secondary-background border-radius-25 mb-35" style={{
                padding: "20px 40px",
            }}>
                <InputLabel label="Ngày sự kiện" />

                <div className="row mt-45 p-20 pt-30 border-1px-color4 border-radius-10 flex-space-start">
                    <div className="col-xxl-6 col-lg-12 mb-20 pr-30">
                        <p className="text-md-bold white-color text-center mb-10">Thời gian bắt đầu</p>
                        <Calendar onDateChange={handleEventStartDateChange} onTimeChange={(hour, minute) => {
                            // Xử lý giờ và phút, ví dụ như cập nhật giờ/phút
                        }} />
                        {errors.eventStartDate && <p className="error-message-validate font-12">{errors.eventStartDate}</p>}
                    </div>

                    <div className="col-xxl-6 col-lg-12 mb-20 pl-30">
                        <p className="text-md-bold white-color text-center mb-10">Thời gian kết thúc</p>
                        <Calendar onDateChange={handleEventEndDateChange} onTimeChange={(hour, minute) => {
                            // Xử lý giờ và phút, ví dụ như cập nhật giờ/phút
                        }} />
                        {errors.eventEndDate && <p className="error-message-validate font-12">{errors.eventEndDate}</p>}
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
                            <input
                                style={{ padding: "16px 25px" }}
                                className="form-control form-input-background border-none border-radius-31"
                                type="text"
                                placeholder="Tên vé"
                                value={ticketName}
                                onChange={handleTicketNameChange}
                            />
                            {errors.ticketName && <p className="error-message-validate font-12">{errors.ticketName}</p>}
                        </div>
                    </div>

                    <div className="col-xxl-3 col-xl-4 mb-20">
                        <div className="form-group">
                            <InputLabel label="Tổng số lượng vé" isMarginLeft />
                            <input
                                style={{ padding: "16px 25px" }}
                                className="form-control form-input-background border-none border-radius-31"
                                type="number"
                                placeholder="0"
                                value={totalTickets}
                                onChange={handleTotalTicketsChange}
                            />
                            {errors.totalTickets && <p className="error-message-validate font-12">{errors.totalTickets}</p>}
                        </div>
                    </div>

                    <div className="col-xxl-4 col-xl-4 mb-20">
                        <div className="form-group">
                            <InputLabel label="Số vé tối thiểu trong 1 đơn hàng" isMarginLeft />
                            <input
                                style={{ padding: "16px 25px" }}
                                className="form-control form-input-background border-none border-radius-31"
                                type="number"
                                placeholder="0"
                                value={minTickets}
                                onChange={handleMinTicketsChange}
                            />
                            {errors.minTickets && <p className="error-message-validate font-12">{errors.minTickets}</p>}
                        </div>
                    </div>

                    <div className="col-xxl-4 col-xl-4 mb-20">
                        <div className="form-group">
                            <InputLabel label="Số vé tối đa trong 1 đơn hàng" isMarginLeft />
                            <input
                                style={{ padding: "16px 25px" }}
                                className="form-control form-input-background border-none border-radius-31"
                                type="number"
                                placeholder="0"
                                value={maxTickets}
                                onChange={handleMaxTicketsChange}
                            />
                            {errors.maxTickets && <p className="error-message-validate font-12">{errors.maxTickets}</p>}
                        </div>
                    </div>

                    <div className="col-xxl-3 col-xl-4 mb-20">
                        <div className="form-group">
                            <InputLabel label="Giá vé" isMarginLeft />
                            <input
                                style={{ padding: "16px 25px" }}
                                className="form-control form-input-background border-none border-radius-31"
                                type="number"
                                placeholder="0"
                                value={ticketPrice}
                                onChange={handleTicketPriceChange}
                                disabled={isChecked}  // Khi checkbox miễn phí được chọn, không thể thay đổi giá vé
                            />

                            {errors.ticketPrice && <p className="error-message-validate font-12">{errors.ticketPrice}</p>}
                        </div>
                    </div>

                    <div className="col-xxl-3 col-xl-4" style={{ display: 'flex', alignItems: 'center' }}>
                        <div className="item-payment-method mr-10" style={{ display: 'flex', alignItems: 'center' }}>
                            <input
                                type="checkbox"
                                id="event-payment"
                                name="payment-method"
                                checked={isChecked}  // Điều chỉnh theo trạng thái
                                onChange={handleChange}  // Cập nhật trạng thái khi thay đổi
                                style={{
                                    display: 'none',
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
                        {errors.isChecked && <p className="error-message-validate font-12">{errors.isChecked}</p>}
                    </div>
                </div>

                <div className="row p-20 pt-30 border-1px-color4 border-radius-10 flex-space-start">
                    <div className="col-xxl-6 col-lg-12 mb-20 pr-30">
                        <p className="text-md-bold white-color text-center mb-10">Thời gian bắt đầu bán vé</p>
                        <Calendar onDateChange={handleTicketSaleStartDateChange} />
                        {errors.ticketSaleStartDate && <p className="error-message-validate font-12">{errors.ticketSaleStartDate}</p>}
                    </div>

                    <div className="col-xxl-6 col-lg-12 mb-20 pl-30">
                        <p className="text-md-bold white-color text-center mb-10">Thời gian kết thúc bán vé</p>
                        <Calendar onDateChange={handleTicketSaleEndDateChange} />
                        {errors.ticketSaleEndDate && <p className="error-message-validate font-12">{errors.ticketSaleEndDate}</p>}
                    </div>
                </div>

                <div className="row mt-20">
                    <div className="col-md-8 mb-20">
                        <div className="form-group">
                            <InputLabel label="Mô tả sự kiện" isMarginLeft />
                            <textarea
                                style={{ padding: "16px 25px", height: "193px" }}
                                className="form-control form-input-background border-none border-radius-31"
                                type="text"
                                value={eventDescription}
                                onChange={handleEventDescriptionChange}
                            />
                            {errors.eventDescription && <p className="error-message-validate font-12">{errors.eventDescription}</p>}
                        </div>
                    </div>

                    <div className='col-md-4 mb-20'>
                        <InputLabel label="Hình ảnh vé" isMarginLeft isRequired={false} />
                        <div
                            className="flex-center form-input-background border-dash-white"
                            style={{ width: "100%", height: "192px", borderRadius: "32px", flexDirection: "column" }}
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
                        {errors.ticketFile && <p className="error-message-validate font-12">{errors.ticketFile}</p>}
                    </div>
                </div>
            </div>

            <button
                className="btn btn-default primary-background white-color w-100 mb-50"
                onClick={handleSubmit}
            >Tiếp tục</button>
        </div>
    )
}
