'use client'
import { fetchUserInfo, updateUserInfo } from "@/app/api/account";
import { getUserInfo } from "@/app/util/auth";
import { convertToISOString, formatDate } from "@/app/util/convert";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import styles from "./Profile.module.css";
import { toast } from "react-toastify";
import { Spinner } from "react-bootstrap";
import { queryClient } from "@/app/util/providers";
import { uploadImageToFirebase } from "@/app/util/uploadImage";

const userInfo = getUserInfo()
export default function ProfilePage() {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phoneNumber: '',
        dateOfBirth: '',
        gender: 0,
        address: '',
        userName: '',
        avatarUrl: ''
    });
    const [imageUrl, setImageUrl] = useState(null);
    const [fileUpload, setFileUpload] = useState()
    const dateInputRef = useRef(null);
    const { data } = useQuery({
        queryKey: ['user-info'],
        queryFn: ({ signal }) => fetchUserInfo({ signal, userId: userInfo.id }),
    })
    const [errors, setErrors] = useState({});

    const validateForm = () => {
        const newErrors = {};
        // Full Name
        if (!formData.fullName.trim()) {
            newErrors.fullName = "Họ và tên không được để trống";
        } else if (!/^[\p{L}\s]+$/u.test(formData.fullName)) {
            newErrors.fullName = "Họ và tên không hợp lệ (chỉ cho phép chữ cái và khoảng trắng)";
        }

        // Phone
        if (!formData.phoneNumber.trim()) {
            newErrors.phoneNumber = "Số điện thoại không được để trống";
        } else if (!/^\d{10,11}$/.test(formData.phoneNumber)) {
            newErrors.phoneNumber = "Số điện thoại phải gồm 10 hoặc 11 chữ số";
        }

        const dobValue = dateInputRef.current.value
        if (!dobValue.trim()) {
            newErrors.dateOfBirth = "Ngày sinh không được để trống";
        } else if (!/^\d{2}\/\d{2}\/\d{4}$/.test(dobValue)) {
            newErrors.dateOfBirth = "Định dạng ngày sinh phải là DD/MM/YYYY";
        } else {
            const [day, month, year] = dobValue.split('/').map(Number);
            const dob = new Date(year, month - 1, day);
            const today = new Date();
            if (dob > today) {
                newErrors.dateOfBirth = "Ngày sinh không được lớn hơn ngày hiện tại";
            }
        }

        // Email
        if (!formData.email.trim()) {
            newErrors.email = "Email không được để trống";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = "Email không hợp lệ";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };
    const { mutate, isLoading } = useMutation({
        mutationKey: ['update-user'],
        mutationFn: (userInfo) => updateUserInfo(userInfo),
        onSuccess: (response) => {
            if (response.statusCode === 200) {
                toast.success("Cập nhật tài khoản thành công");
                queryClient.invalidateQueries({ queryKey: ['user-info'] })
            } else {
                toast.error(response[0])
            }
        },
        onError: () => {
            toast.error("Có lỗi xảy ra, vui lòng thử lại sau!");
        },
    });
    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;
        const avatarUrl = await handleUploadFileToFirebase();
        const dataSubmit = {
            id: getUserInfo().id,
            ...formData,
            dateOfBirth: convertToISOString(dateInputRef.current.value),
            avatarUrl: avatarUrl ? avatarUrl : data?.result.avatarUrl,
        };
        mutate(dataSubmit);
    };
    const handleUploadFileToFirebase = async () => {
        if (!fileUpload) return null;
        try {
            const url = await uploadImageToFirebase(fileUpload, "avatar");
            return url
        } catch (error) {
            toast.error("Tải ảnh lên server bị lỗi, vui lòng thử lại sau")
        }
    };
    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (!file) return;
        const validTypes = ['image/jpeg', 'image/png', 'image/svg+xml'];
        if (!validTypes.includes(file.type)) {
            toast.error("Định dạng ảnh không hợp lệ. Chỉ chấp nhận JPG, PNG, SVG.");
            return;
        }
        if (file.size > 2 * 1024 * 1024) {
            toast.error("Kích thước ảnh phải nhỏ hơn 2MB.");
            return;
        }

        setFileUpload(file)
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImageUrl(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };
    const triggerFileInput = () => {
        document.getElementById('file-upload').click();
    };
    const handleResetForm = async () => {
        if (data?.result) {
            const { fullName, email, phoneNumber, dateOfBirth, gender, address, userName } = data.result;
            setFormData({
                fullName: fullName || '',
                email: email || '',
                phoneNumber: phoneNumber || '',
                dateOfBirth: dateOfBirth || '',
                gender: gender ?? 0,
                address: address || '',
                userName: userName || ''
            });
        }
    }

    useEffect(() => {
        if (dateInputRef.current) {
            dateInputRef.current.value = formatDate(data?.result.dateOfBirth)
        }
    }, [data])

    useEffect(() => {
        handleResetForm()
    }, [data]);
    return (
        <div className={styles.container}>
            <div className="flex-space pb-20 border-1px-bottom">
                <h4 className="white-color">Thông tin tài khoản</h4>
            </div>
            <div className="pt-40 pb-200">
                <form onSubmit={handleUpdateProfile}>
                    <div className="secondary-background border-radius-25 p-20 mb-35">
                        <div className="row mt-10">
                            <div className="col-md-12 mb-20">
                                <div className="form-group">
                                    <p className='ml-25 mb-15 text-lg-bold white-color'>Họ và tên</p>
                                    <input
                                        className={`form-control form-input-background border-none border-radius-31 ${styles.input}`}
                                        type="text"
                                        placeholder="Nhập tên của bạn"
                                        value={formData.fullName}
                                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                                    />
                                    {errors.fullName && <p className="error-message-validate font-11">{errors.fullName}</p>}
                                </div>
                            </div>
                            <div className="col-md-6 mb-20">
                                <div className="form-group">
                                    <p className='ml-25 mb-15 text-lg-bold white-color'>Email</p>
                                    <input
                                        disabled
                                        className={`form-control form-input-background border-none border-radius-31 ${styles.input}`}
                                        type="email"
                                        placeholder="Nhập Email"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    />
                                    {errors.email && <p className="error-message-validate font-11">{errors.email}</p>}
                                </div>
                            </div>
                            <div className="col-md-6 mb-20">
                                <div className="form-group">
                                    <p className='ml-25 mb-15 text-lg-bold white-color'>Số điện thoại</p>
                                    <input
                                        className={`form-control form-input-background border-none border-radius-31 ${styles.input}`}
                                        type="text"
                                        placeholder="Nhập số điện thoại"
                                        value={formData.phoneNumber}
                                        onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                                    />
                                    {errors.phoneNumber && <p className="error-message-validate font-11">{errors.phoneNumber}</p>}
                                </div>
                            </div>
                            <div className="col-md-6 mb-50">
                                <div className="form-group position-relative">
                                    <p className='ml-25 mb-15 text-lg-bold white-color'>Ngày tháng năm sinh</p>
                                    <input
                                        className={`form-control calendar-date form-input-background border-none border-radius-31 ${styles.input}`}
                                        type="text"
                                        placeholder="DD/MM/YYYY"
                                        ref={dateInputRef}
                                    />
                                    {errors.dateOfBirth && <p className="error-message-validate font-11">{errors.dateOfBirth}</p>}
                                </div>
                            </div>
                            <div className="col-md-6 mb-40">
                                <p className='ml-25 mb-15 text-lg-bold white-color'>Giới tính</p>
                                <div className={`row ${styles.input} ${styles.genderWrapper}`} >
                                    <div className="col-md-4 flex-center-align">
                                        <div className="item-payment-method flex-center-align">
                                            <input
                                                type="radio"
                                                id="event-payment"
                                                name="payment-method"
                                                className={styles.genderInput}
                                                checked={formData.gender === 0}
                                                onChange={() => setFormData({ ...formData, gender: 0 })}
                                            />
                                            <label
                                                htmlFor="event-payment"
                                                className={`item-payment-method-text mb-0 ${styles.genderLabel}`}
                                            >
                                                Nam
                                            </label>
                                        </div>
                                    </div>
                                    <div className="col-md-4 flex-center-align">
                                        <div className="item-payment-method flex-center-align">
                                            <input
                                                type="radio"
                                                id="credit-card-payment"
                                                name="payment-method"
                                                className={styles.genderInput}
                                                checked={formData.gender === 1}
                                                onChange={() => setFormData({ ...formData, gender: 1 })}
                                            />
                                            <label
                                                htmlFor="credit-card-payment"
                                                className={`item-payment-method-text mb-0 ${styles.genderLabel}`}
                                            >
                                                Nữ
                                            </label>
                                        </div>
                                    </div>
                                    <div className="col-md-4 flex-center-align">
                                        <div className="item-payment-method flex-center-align">
                                            <input
                                                type="radio"
                                                id="credit-card-payment2"
                                                name="payment-method"
                                                className={styles.genderInput}
                                                checked={formData.gender === 2}
                                                onChange={() => setFormData({ ...formData, gender: 2 })}
                                            />
                                            <label
                                                htmlFor="credit-card-payment2"
                                                className={`item-payment-method-text mb-0 ${styles.genderLabel}`}
                                            >
                                                Khác
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='col-md-12 mb-20'>
                                <div className='flex-start'>
                                    <div
                                        className={styles.imageChoose}
                                        style={{
                                            backgroundImage: imageUrl ? `url(${imageUrl})` : 'none'
                                        }}
                                    />
                                    <p className='text-md-bold white-color ml-20'>Ảnh đại diện</p>
                                </div>
                            </div>
                            <div className='col-md-12 mb-20'
                                onClick={triggerFileInput} // Khi bấm vào hình tròn sẽ mở dialog chọn file
                            >
                                <div
                                    className="flex-center form-input-background border-dash-white"
                                    style={{ padding: "22px 0", borderRadius: "32px", flexDirection: "column" }}
                                >
                                    <div>
                                        <img src="/assets/icon/upload-icon.svg" />
                                    </div>
                                    <div className="mt-25">
                                        <span className="primary-color text-sm-bold">Bấm vào đây </span>
                                        <span style={{ color: "#475569" }}>để tải tệp hình ảnh hoặc kéo thả.</span>
                                    </div>
                                    <p style={{ color: "#94A3B8" }}>Định dạng hỗ trợ: SVG, JPG, PNG (tối đa 2MB mỗi tệp)</p>
                                    <input
                                        type="file"
                                        onChange={handleImageUpload}
                                        className="display-none"
                                        id="file-upload"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex-end">
                        <div className="d-flex justify-content-center justify-content-md-end">
                            <button type="reset" onClick={handleResetForm} className="btn btn-black-lg secondary-background">Đặt lại
                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
                                    <path d="M13.2882 11.962C13.4644 12.1381 13.5633 12.377 13.5633 12.626C13.5633 12.8751 13.4644 13.114 13.2882 13.2901C13.1121 13.4662 12.8733 13.5652 12.6242 13.5652C12.3751 13.5652 12.1362 13.4662 11.9601 13.2901L6.99997 8.32838L2.03825 13.2885C1.86213 13.4647 1.62326 13.5636 1.37418 13.5636C1.12511 13.5636 0.886243 13.4647 0.710122 13.2885C0.534002 13.1124 0.435059 12.8736 0.435059 12.6245C0.435059 12.3754 0.534002 12.1365 0.710122 11.9604L5.67184 7.00026L0.711685 2.03854C0.535564 1.86242 0.436621 1.62355 0.436621 1.37448C0.436621 1.12541 0.535564 0.886536 0.711685 0.710415C0.887805 0.534295 1.12668 0.435351 1.37575 0.435351C1.62482 0.435351 1.86369 0.534295 2.03981 0.710415L6.99997 5.67213L11.9617 0.709634C12.1378 0.533514 12.3767 0.43457 12.6257 0.43457C12.8748 0.43457 13.1137 0.533514 13.2898 0.709634C13.4659 0.885754 13.5649 1.12462 13.5649 1.3737C13.5649 1.62277 13.4659 1.86164 13.2898 2.03776L8.32809 7.00026L13.2882 11.962Z" fill="white" />
                                </svg>
                            </button>
                        </div>
                        <div className="d-flex justify-content-center justify-content-md-end ml-15">
                            <button disabled={isLoading} type="submit" className="btn btn-black-lg primary-background">
                                {isLoading ? (
                                    <>
                                        <Spinner 
                                            as="span" 
                                            animation="border" 
                                            size="sm" 
                                            role="status" 
                                            aria-hidden="true"
                                            style={{ marginRight: '8px' }}
                                            className={styles.spinner}
                                        />
                                        Đang xử lý...
                                    </>
                                ) : (
                                    <>
                                        Lưu
                                        <svg xmlns="http://www.w3.org/2000/svg" width="17" height="13" viewBox="0 0 17 13" fill="none">
                                            <path d="M16.1632 2.28815L6.16325 12.2882C6.07615 12.3756 5.97266 12.4449 5.8587 12.4922C5.74475 12.5395 5.62257 12.5639 5.49918 12.5639C5.3758 12.5639 5.25362 12.5395 5.13967 12.4922C5.02571 12.4449 4.92222 12.3756 4.83512 12.2882L0.460122 7.91315C0.372916 7.82594 0.303741 7.72242 0.256545 7.60848C0.20935 7.49454 0.185059 7.37242 0.185059 7.24909C0.185059 7.12576 0.20935 7.00364 0.256545 6.8897C0.303741 6.77576 0.372916 6.67223 0.460122 6.58503C0.547328 6.49782 0.650857 6.42864 0.764797 6.38145C0.878737 6.33425 1.00086 6.30996 1.12418 6.30996C1.24751 6.30996 1.36963 6.33425 1.48357 6.38145C1.59751 6.42864 1.70104 6.49782 1.78825 6.58503L5.49997 10.2967L14.8367 0.961587C15.0128 0.785467 15.2517 0.686523 15.5007 0.686523C15.7498 0.686523 15.9887 0.785467 16.1648 0.961587C16.3409 1.13771 16.4399 1.37658 16.4399 1.62565C16.4399 1.87472 16.3409 2.11359 16.1648 2.28971L16.1632 2.28815Z" fill="white" />
                                        </svg>
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

