import React, { useEffect, useState } from "react";
import "./style.scss";
import { Form, FormInput, FormGroup, Button, Alert } from "shards-react";
import { clearErrors, uploadProfileImage, updateUserInfo } from "../../redux/user/actions";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
import withHeader from "../../HOC/withHeader";

function UpdateUserInfoPage() {
    const [name, setName] = useState("");
    const [tel, setTel] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState("2000-08-19");
    const [selectedDate, setSelectedDate] = useState(false);
    const [imageURLOfUser, setImageURLOfUser] = useState("");
    const [alertSuccess, setAlertSuccess] = useState(false);
    const [count, setCount] = useState(-1);
    const [nameErrorMesage, setNameErrorMesage] = useState("");
    const dispatch = useDispatch();
    const currentUser = useSelector((state) => state.user.currentUser);
    const isLoading = useSelector((state) => state.user.isLoading);
    const isUploading = useSelector((state) => state.user.isUploading);
    const errors = useSelector((state) => state.user.errors);
    const profileImageURL = useSelector((state) => state.user.profileImageURL);
    const message = useSelector((state) => state.user.message);
    const handleName = (e) => {
        setName(e.target.value);
    };
    const uploadImage = (e) => {
        const file = e.target?.files[0];
        dispatch(uploadProfileImage(file));
    };
    const handleDateOfBirth = (e) => {
        setDateOfBirth(e.target.value);
        if (!selectedDate) {
            setSelectedDate(true);
        }
    };
    const submitForm = (e) => {
        e.preventDefault();
        if (name) {
            dispatch(
                updateUserInfo({
                    name,
                    phoneNumber: tel,
                    dateOfBirth: selectedDate ? dateOfBirth : currentUser.dateOfBirth,
                    profileImageURL: profileImageURL ? profileImageURL : imageURLOfUser,
                })
            );
        } else {
            setNameErrorMesage("Vui lòng nhập họ tên");
        }
    };

    useEffect(() => {
        setName(currentUser.name);
        setTel(currentUser.phoneNumber);
        setImageURLOfUser(currentUser.profileImageURL);
        setDateOfBirth(dayjs(currentUser.dateOfBirth ? currentUser.dateOfBirth : Date.now()).format("YYYY-MM-DD"));

        return () => {
            dispatch(clearErrors());
        };
    }, [dispatch, currentUser.name, currentUser.phoneNumber, currentUser.profileImageURL, currentUser.dateOfBirth]);
    useEffect(() => {
        if (message === "success") {
            setCount(3000);
        }
    }, [message]);
    useEffect(() => {
        if (count === 3000) {
            setAlertSuccess(true);
        }
        if (count >= 0) {
            const renderAlert = setTimeout(() => {
                if (count === 0) {
                    clearTimeout(renderAlert);
                    setAlertSuccess(false);
                    setCount(-1);
                } else {
                    setCount(count - 1000);
                }
            }, count);
        }
    }, [count]);

    return (
        <div className='bg-white update-user-info-page position-relative'>
            <Alert dismissible={() => setAlertSuccess(false)} open={alertSuccess} theme='success'>
                Đã cập nhật thông tin thành công
            </Alert>
            <div className='container w-100 h-100'>
                <div className='form-container d-flex flex-column bg-white'>
                    <h3 className='mb-3 text-center'>Cập nhật tài khoản</h3>
                    <Form className='d-flex w-100'>
                        <div className='col-of-form'>
                            <FormGroup>
                                <label htmlFor='name'>Họ Tên</label>
                                <FormInput
                                    type='text'
                                    placeholder={nameErrorMesage ? nameErrorMesage : "Họ Tên"}
                                    id='name'
                                    value={name}
                                    onChange={handleName}
                                    invalid={nameErrorMesage ? true : false}
                                />
                            </FormGroup>
                            <FormGroup>
                                <label htmlFor='phone-number'>Số điện thoại</label>
                                <FormInput
                                    invalid={errors.name ? true : false}
                                    type='tel'
                                    placeholder='Số điện thoại'
                                    id='phone-number'
                                    value={tel}
                                    onChange={(e) => setTel(e.target.value)}
                                />
                            </FormGroup>
                            <FormGroup>
                                <label htmlFor='date-of-birth'>Ngày sinh</label>
                                <FormInput
                                    value={dateOfBirth}
                                    onChange={handleDateOfBirth}
                                    type='date'
                                    id='date-of-birth'
                                />
                            </FormGroup>
                        </div>
                        <div className='col-of-form'>
                            <FormGroup className='d-flex flex-column'>
                                <label className='d-inline' htmlFor='profile-image'>
                                    Ảnh đại diện
                                </label>
                                <input onChange={uploadImage} type='file' accept='image/*' id='profile-image' />
                                <label htmlFor='profile-image' className='preview-image'>
                                    {(imageURLOfUser || profileImageURL) && !isUploading ? (
                                        <img alt='' src={profileImageURL ? profileImageURL : imageURLOfUser} />
                                    ) : (
                                        <span>
                                            {isUploading ? (
                                                <i className='fas fa-circle-notch' />
                                            ) : (
                                                <i className='fas fa-plus' />
                                            )}
                                        </span>
                                    )}
                                </label>
                            </FormGroup>

                            <Button
                                className='w-50 align-self-center'
                                disabled={isLoading}
                                type='submit'
                                onClick={submitForm}
                            >
                                {isLoading ? "Đang Cập Nhật ..." : "Cập Nhật"}
                            </Button>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    );
}

export default withHeader(UpdateUserInfoPage);
