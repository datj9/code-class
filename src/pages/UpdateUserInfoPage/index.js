import React, { useEffect, useState } from "react";
import "./style.scss";
import { Form, FormInput, FormGroup, Button, Alert } from "shards-react";
import { clearErrors, uploadProfileImage, updateUserInfo } from "../../redux/user/actions";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";

export default function UpdateUserInfoPage() {
    const [name, setName] = useState("");
    const [tel, setTel] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState("2000-08-19");
    const [imageURLOfUser, setImageURLOfUser] = useState("");
    const [alertSuccess, setAlertSuccess] = useState(false);
    const [count, setCount] = useState(3000);
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
    const submitForm = (e) => {
        e.preventDefault();
        dispatch(
            updateUserInfo({
                name,
                phoneNumber: tel,
                profileImageURL: profileImageURL ? profileImageURL : imageURLOfUser,
                dateOfBirth,
            })
        );
    };

    const NameError = () => {
        const { name } = errors;
        if (name && name.includes("required")) {
            return <div className='text-danger mt-1'>Vui lòng nhập vào tên</div>;
        }
        return null;
    };

    useEffect(() => {
        setName(currentUser.name);
        setTel(currentUser.phoneNumber);
        setDateOfBirth(dayjs(currentUser.dateOfBirth).format("YYYY-MM-DD"));
        setImageURLOfUser(currentUser.profileImageURL);

        return () => {
            dispatch(clearErrors());
        };
    }, [currentUser.name, currentUser.phoneNumber, currentUser.dateOfBirth, currentUser.profileImageURL, dispatch]);
    useEffect(() => {
        if (message === "success") {
            if (count === 3000) {
                setAlertSuccess(true);
            }
            const renderAlert = setInterval(() => {
                if (count === 0) {
                    clearInterval(renderAlert);
                    setAlertSuccess(false);
                } else {
                    setCount((c) => c - 1000);
                }
            }, count);
        }
    }, [message, count]);

    return (
        <div className='bg-white update-user-info-page position-relative'>
            <Alert dismissible={() => setAlertSuccess(false)} open={alertSuccess} theme='success'>
                Đã cập nhật thông tin thành công
            </Alert>
            <div className='container w-100 h-100'>
                <div className='form-container d-flex flex-column bg-white'>
                    <h3 className='mb-3 text-center'>Cập nhật tài khoản</h3>
                    <Form className='d-flex flex-column w-100'>
                        <FormGroup>
                            <label htmlFor='name'>Họ Tên</label>
                            <FormInput
                                invalid={errors.name ? true : false}
                                type='text'
                                placeholder='Họ Tên'
                                id='name'
                                value={name}
                                onChange={handleName}
                            />
                            <NameError />
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
                                onChange={(e) => setDateOfBirth(e.target.value)}
                                type='date'
                                id='date-of-birth'
                            />
                        </FormGroup>
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
                    </Form>
                </div>
            </div>
        </div>
    );
}
