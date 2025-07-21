'use client'

import { useEffect, useState } from "react";
import Calendar from "../calendar/Calendar";
import InputLabel from "./InputLabel";

export default function TimeAndTicket({ onContinue, onBack, formRef }) {
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
    const [eventStartTime, setEventStartTime] = useState({ hour: 0, minute: 0 }); // giờ, phút
    const [ticketPath, setTicketImagePath] = useState(null)

    useEffect(() => {
        if (ticketPrice === 0) {
            setIsChecked(true)
        }
    }, [ticketPrice])
    useEffect(() => {
        if (formRef) {
            formRef.current = {
                getData: () => ({
                    isChecked,
                    ticketPath,
                    eventStartDate,
                    eventEndDate,
                    ticketSaleStartDate,
                    ticketSaleEndDate,
                    totalTickets,
                    minTickets,
                    maxTickets,
                    ticketPrice,
                    ticketName,
                    description: eventDescription,
                }),
                prefillData: (data) => {
                    setTicketName(data.workshopTicketInfo.ticketName || '');
                    setTotalTickets(data.totalTickets || 0);
                    setMinTickets(data.workshopTicketInfo.minQuantityPerOrder);
                    setMaxTickets(data.workshopTicketInfo.maxQuantityPerOrder);
                    setTicketSaleStartDate(data.workshopTicketInfo.saleStartDate);
                    setTicketSaleEndDate(data.workshopTicketInfo.saleEndDate);
                    setEventStartDate(data.startDate);
                    setEventEndDate(data.endDate);
                    setIsChecked(data.isFree === true);
                    setTicketPrice(Number(data.price) || 0);
                    setEventDescription(data.description || '');
                    setTicketImagePath(data.ticketImagePath);
                    setTicketFile(data.ticketImagePath);

                    // Set initial time values from the dates
                    if (data.startDate) {
                        const startDate = new Date(data.startDate);
                        setEventStartTime({
                            hour: startDate.getHours(),
                            minute: startDate.getMinutes()
                        });
                    }
                    if (data.endDate) {
                        const endDate = new Date(data.endDate);
                        setEventEndTime({
                            hour: endDate.getHours(),
                            minute: endDate.getMinutes()
                        });
                    }
                    if (data.workshopTicketInfo.saleStartDate) {
                        const saleStartDate = new Date(data.workshopTicketInfo.saleStartDate);
                        setTicketSaleStartTime({
                            hour: saleStartDate.getHours(),
                            minute: saleStartDate.getMinutes()
                        });
                    }
                    if (data.workshopTicketInfo.saleEndDate) {
                        const saleEndDate = new Date(data.workshopTicketInfo.saleEndDate);
                        setTicketSaleEndTime({
                            hour: saleEndDate.getHours(),
                            minute: saleEndDate.getMinutes()
                        });
                    }
                }
            };
        }
    }, [isChecked, ticketPath, eventStartDate, 
        eventEndDate, ticketSaleStartDate, ticketSaleEndDate, 
        totalTickets, minTickets, maxTickets, ticketPrice, 
        eventDescription, ticketName, ticketPrice, ticketPath,
        eventStartDate, eventEndDate, ticketSaleStartDate, ticketSaleEndDate,
        totalTickets, minTickets, maxTickets, ticketPrice, eventDescription
    ]);

    const applyTimeToDate = (date, hour, minute) => {
        const newDate = new Date(date);
        newDate.setHours(hour);
        newDate.setMinutes(minute);
        newDate.setSeconds(0);
        newDate.setMilliseconds(0);
        return newDate;
    };

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
                setTicketPrice(0);
            } else {
                setTicketPrice("");
            }
            return !prevState;
        });
        clearError('isChecked');
    };

    const handleLogoUpload = (e) => {
        const file = e.target.files[0];
        setTicketImagePath(file)
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
            setTicketPrice(0);
        }
    };

    const handleEventDescriptionChange = e => {
        setEventDescription(e.target.value);
        clearError('eventDescription');
    };

    const handleEventStartDateChange = (date) => {
        const fullDate = applyTimeToDate(date, eventStartTime.hour, eventStartTime.minute);
        setEventStartDate(fullDate);
        clearError('eventStartDate');
    };

    const handleEventStartTimeChange = (hour, minute) => {
        setEventStartTime({ hour, minute });
        if (eventStartDate) {
            const fullDate = applyTimeToDate(eventStartDate, hour, minute);
            setEventStartDate(fullDate);
        }
        clearError('eventStartDate');
    };

    const [eventEndTime, setEventEndTime] = useState({ hour: 0, minute: 0 });

    const handleEventEndDateChange = (date) => {
        const fullDate = applyTimeToDate(date, eventEndTime.hour, eventEndTime.minute);
        setEventEndDate(fullDate);
        clearError('eventEndDate');
    };

    const handleEventEndTimeChange = (hour, minute) => {
        setEventEndTime({ hour, minute });
        if (eventEndDate) {
            const fullDate = applyTimeToDate(eventEndDate, hour, minute);
            setEventEndDate(fullDate);
        }
        clearError('eventEndDate');
    };


    const [ticketSaleStartTime, setTicketSaleStartTime] = useState({ hour: 0, minute: 0 });

    const handleTicketSaleStartDateChange = (date) => {
        const fullDate = applyTimeToDate(date, ticketSaleStartTime.hour, ticketSaleStartTime.minute);
        setTicketSaleStartDate(fullDate);
        clearError('ticketSaleStartDate');
    };

    const handleTicketSaleStartTimeChange = (hour, minute) => {
        setTicketSaleStartTime({ hour, minute });
        if (ticketSaleStartDate) {
            const fullDate = applyTimeToDate(ticketSaleStartDate, hour, minute);
            setTicketSaleStartDate(fullDate);
        }
        clearError('ticketSaleStartDate');
    };

    const [ticketSaleEndTime, setTicketSaleEndTime] = useState({ hour: 0, minute: 0 });

    const handleTicketSaleEndDateChange = (date) => {
        const fullDate = applyTimeToDate(date, ticketSaleEndTime.hour, ticketSaleEndTime.minute);
        setTicketSaleEndDate(fullDate);
        clearError('ticketSaleEndDate');
    };

    const handleTicketSaleEndTimeChange = (hour, minute) => {
        setTicketSaleEndTime({ hour, minute });
        if (ticketSaleEndDate) {
            const fullDate = applyTimeToDate(ticketSaleEndDate, hour, minute);
            setTicketSaleEndDate(fullDate);
        }
        clearError('ticketSaleEndDate');
    };


    const validateTimeRange = (start, end) => {
        if (start && end) {
            if (end < start) return "Thời gian kết thúc phải sau thời gian bắt đầu";
        }
        return null;
    };
    const validate = () => {
        const newErrors = {};
        if (eventStartDate && eventEndDate && eventStartDate >= eventEndDate) {
            newErrors.eventEndDate = "Thời gian kết thúc sự kiện phải sau thời gian bắt đầu sự kiện";
        }

        if (ticketSaleStartDate && ticketSaleEndDate && ticketSaleStartDate >= ticketSaleEndDate) {
            newErrors.ticketSaleEndDate = "Thời gian kết thúc bán vé phải sau thời gian bắt đầu bán vé";
        }

        if (!ticketName.trim()) newErrors.ticketName = "Vui lòng nhập loại loại vé";
        if (isNaN(totalTickets) || Number(totalTickets) < 1 || Number(totalTickets) > 999) newErrors.totalTickets = "Vui lòng nhập tổng số lượng vé hợp lệ (1-999)";
        if (isNaN(minTickets) || Number(minTickets) < 1 || Number(minTickets) > 999) newErrors.minTickets = "Vui lòng nhập số vé tối thiểu hợp lệ (1-999)";
        if (isNaN(maxTickets) || Number(maxTickets) < 1 || Number(maxTickets) > 999) newErrors.maxTickets = "Vui lòng nhập số vé tối đa hợp lệ (1-999)";
        else if (Number(minTickets) > Number(maxTickets)) newErrors.maxTickets = "Số vé tối đa phải lớn hơn hoặc bằng số vé tối thiểu";
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

        if (!ticketFile) newErrors.ticketFile = "Vui lòng tải hình ảnh vé";

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
            <div className="secondary-background border-radius-25 mb-35" style={{
                padding: "20px 40px",
            }}>
                <InputLabel label="Ngày sự kiện" />

                <div className="row mt-45 p-20 pt-30 border-1px-color4 border-radius-10 flex-space-start">
                    <div className="col-xxl-6 col-lg-12 mb-20 pr-30">
                        <p className="text-md-bold white-color text-center mb-10">Thời gian bắt đầu</p>
                        <Calendar
                            initialDate={eventStartDate}
                            onDateChange={handleEventStartDateChange}
                            onTimeChange={handleEventStartTimeChange}
                        />
                        {errors.eventStartDate && <p className="error-message-validate font-12">{errors.eventStartDate}</p>}
                    </div>

                    <div className="col-xxl-6 col-lg-12 mb-20 pl-30">
                        <p className="text-md-bold white-color text-center mb-10">Thời gian kết thúc</p>
                        <Calendar
                            initialDate={eventEndDate}
                            onDateChange={handleEventEndDateChange}
                            onTimeChange={handleEventEndTimeChange}
                        />
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
                                id="free-checkbox"
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
                                htmlFor="free-checkbox"
                                className="item-payment-method-text item-payment"
                                style={{ color: '#fff', fontSize: '14px', cursor: 'pointer', margin: '0!important' }}
                            >
                                Miễn phí
                            </label>
                        </div>
                    </div>
                </div>

                <div className="row p-20 pt-30 border-1px-color4 border-radius-10 flex-space-start">
                    <div className="col-xxl-6 col-lg-12 mb-20 pr-30">
                        <p className="text-md-bold white-color text-center mb-10">Thời gian bắt đầu bán vé</p>
                        <Calendar
                            initialDate={ticketSaleStartDate}
                            onDateChange={handleTicketSaleStartDateChange}
                            onTimeChange={handleTicketSaleStartTimeChange}
                        />
                        {errors.ticketSaleStartDate && <p className="error-message-validate font-12">{errors.ticketSaleStartDate}</p>}
                    </div>

                    <div className="col-xxl-6 col-lg-12 mb-20 pl-30">
                        <p className="text-md-bold white-color text-center mb-10">Thời gian kết thúc bán vé</p>
                        <Calendar
                            initialDate={ticketSaleEndDate}
                            onDateChange={handleTicketSaleEndDateChange}
                            onTimeChange={handleTicketSaleEndTimeChange}
                        />
                        {errors.ticketSaleEndDate && <p className="error-message-validate font-12">{errors.ticketSaleEndDate}</p>}
                    </div>
                </div>

                <div className="row mt-20">
                    <div className="col-md-8 mb-20">
                        <div className="form-group">
                            <InputLabel label="Mô tả vé" isMarginLeft isRequired={false}/>
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

            <div className="row">
                <div className="col col-lg-6"><button
                    onClick={onBack}
                    className="btn btn-default main-background white-color w-100 mb-50"
                >Quay lại</button></div>
                <div className="col col-lg-6">
                    <button
                        className="btn btn-default primary-background white-color w-100 mb-50"
                        onClick={handleSubmit}
                    >Tiếp tục</button>
                </div>
            </div>
        </div>
    )
}
