import React, { useEffect, useState } from "react";
import "./style.scss";
import { Form, FormInput, FormGroup, Button, Alert, FormSelect, FormCheckbox } from "shards-react";
import { clearErrors, uploadProfileImage, updateUserInfo } from "../../redux/user/actions";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
import withHeader from "../../HOC/withHeader";
import { updateMentorInfo } from "../../redux/mentor/actions";

function UpdateUserInfoPage() {
    const [name, setName] = useState("");
    const [tel, setTel] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState("2000-08-19");
    const [selectedDate, setSelectedDate] = useState(false);
    const [imageURLOfUser, setImageURLOfUser] = useState("");
    const [currentJob, setCurrentJob] = useState("");
    const [numberOfYearsExperience, setNumberOfYearsExperience] = useState(0);
    const [specialities, setSpecialities] = useState({
        React: false,
        Angular: false,
        Vue: false,
        NodeJS: false,
        JavaScript: false,
    });
    const [alertSuccess, setAlertSuccess] = useState(false);
    const [count, setCount] = useState(-1);
    const [nameErrorMesage, setNameErrorMesage] = useState("");
    const [currentJobErrMsg, setCurrentJobErrMsg] = useState("");
    const [yearExpErrMsg, setYearExpErrMsg] = useState("");
    const [specsErrMsg, setspecsErrMsg] = useState("");
    const dispatch = useDispatch();
    const currentUser = useSelector((state) => state.user.currentUser);
    const isUpdatingUser = useSelector((state) => state.user.isLoading);
    const isUpdatingMentor = useSelector((state) => state.mentor.isLoading);
    const isUploading = useSelector((state) => state.user.isUploading);
    const errors = useSelector((state) => state.user.errors);
    const profileImageURL = useSelector((state) => state.user.profileImageURL);
    const messageUpdateUser = useSelector((state) => state.user.message);
    const messageUpdateMentor = useSelector((state) => state.mentor.message);
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
    const handleSpecialities = (spec) => {
        const specs = specialities;
        specs[spec] = !specs[spec];
        setSpecialities({ ...specs });
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
    const submitFormUpdateMentorInfo = (e) => {
        e.preventDefault();
        const selectedSpecs = Object.keys(specialities).filter((spec) => specialities[spec] === true);

        if (
            currentJob &&
            numberOfYearsExperience >= 0 &&
            numberOfYearsExperience % 0.5 === 0 &&
            selectedSpecs.length > 0
        ) {
            dispatch(
                updateMentorInfo(currentUser.mentorId, {
                    currentJob,
                    numberOfYearsExperience: +numberOfYearsExperience,
                    specialities: selectedSpecs,
                    userId: currentUser.id,
                })
            );
        } else {
            if (!currentJob) {
                setCurrentJobErrMsg("Vui lòng nhập công việc hiện tại");
            } else {
                setCurrentJobErrMsg("");
            }
            if (numberOfYearsExperience < 0) {
                setYearExpErrMsg("Số năm kinh nghiệm phải lớn hơn 0");
            } else if (numberOfYearsExperience % 0.5 !== 0) {
                setYearExpErrMsg("Số năm kinh nghiệm chỉ được nhập 0, 0.5, 1, 1.5,...");
            } else {
                setYearExpErrMsg("");
            }
            if (selectedSpecs.length === 0) {
                setspecsErrMsg("Vui lòng chọn những ngôn ngữ, framework bạn có thể mentor");
            } else {
                setspecsErrMsg("");
            }
        }
    };

    useEffect(() => {
        setName(currentUser.name);
        setTel(currentUser.phoneNumber);
        setImageURLOfUser(currentUser.profileImageURL);
        setDateOfBirth(dayjs(currentUser.dateOfBirth ? currentUser.dateOfBirth : Date.now()).format("YYYY-MM-DD"));

        if (currentUser.userType === "mentor") {
            const specs = {};
            currentUser.specialities.forEach((spec) => (specs[spec] = true));

            setSpecialities((specialities) => ({ ...specialities, ...specs }));
            setCurrentJob(currentUser.currentJob);
            setNumberOfYearsExperience(currentUser.numberOfYearsExperience);
        }

        return () => {
            dispatch(clearErrors());
        };
    }, [
        dispatch,
        currentUser.name,
        currentUser.phoneNumber,
        currentUser.profileImageURL,
        currentUser.dateOfBirth,
        currentUser.currentJob,
        currentUser.specialities,
        currentUser.numberOfYearsExperience,
        currentUser.userType,
    ]);

    useEffect(() => {
        if (messageUpdateUser === "success" || messageUpdateMentor === "success") {
            setCount(3000);
        }
    }, [messageUpdateUser, messageUpdateMentor]);
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
                <div className='form-container bg-white'>
                    <div className='h4 font-weight-bold'>Cập nhật thông tin cá nhân</div>
                    <Form className='d-flex mb-3 form-update-user-info'>
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
                                className='w-100 align-self-center'
                                disabled={isUpdatingUser}
                                type='submit'
                                onClick={submitForm}
                            >
                                {isUpdatingUser ? "Đang Cập Nhật ..." : "Cập Nhật"}
                            </Button>
                        </div>
                    </Form>

                    {currentUser.userType !== "mentor" ? null : (
                        <Form className='mt-3'>
                            <div className='h4 font-weight-bold'>Cập nhật thông tin mentor</div>
                            <div className='current-job-and-yearsexp-wp d-flex'>
                                <FormGroup>
                                    <label>Công việc hiện tại</label>
                                    <FormSelect
                                        invalid={currentJobErrMsg ? true : false}
                                        value={currentJob}
                                        onChange={(e) => setCurrentJob(e.target.value)}
                                    >
                                        <option value=''>Chọn công việc hiện tại</option>
                                        <option>Front-end Developer</option>
                                        <option>Back-end Developer</option>
                                        <option>Web Developer</option>
                                        <option>Mobile Developer</option>
                                        <option>Full-stack Developer</option>
                                    </FormSelect>
                                    {currentJobErrMsg ? <div className='text-danger'>{currentJobErrMsg}</div> : null}
                                </FormGroup>
                                <FormGroup>
                                    <label>Số năm kinh nghiệm</label>
                                    <FormInput
                                        invalid={yearExpErrMsg ? true : false}
                                        placeholder='Nhập số năm kinh nghiệm'
                                        type='number'
                                        value={numberOfYearsExperience}
                                        onChange={(e) => setNumberOfYearsExperience(e.target.value)}
                                    />
                                    {yearExpErrMsg ? <div className='text-danger'>{yearExpErrMsg}</div> : null}
                                </FormGroup>
                            </div>
                            <FormGroup>
                                <label>Chọn ngôn ngữ, framework có thể mentor </label>
                                <FormCheckbox
                                    checked={specialities.React === true ? true : false}
                                    onChange={() => handleSpecialities("React")}
                                >
                                    React
                                </FormCheckbox>
                                <FormCheckbox
                                    checked={specialities.Angular}
                                    onChange={() => handleSpecialities("Angular")}
                                >
                                    Angular
                                </FormCheckbox>
                                <FormCheckbox checked={specialities.Vue} onChange={() => handleSpecialities("Vue")}>
                                    Vue
                                </FormCheckbox>
                                <FormCheckbox
                                    checked={specialities.NodeJS}
                                    onChange={() => handleSpecialities("NodeJS")}
                                >
                                    NodeJS
                                </FormCheckbox>
                                <FormCheckbox
                                    checked={specialities.JavaScript}
                                    onChange={() => handleSpecialities("JavaScript")}
                                >
                                    JavaScript
                                </FormCheckbox>
                                {specsErrMsg ? <div className='text-danger'>{specsErrMsg}</div> : null}
                            </FormGroup>
                            <Button
                                className='w-100 align-self-center'
                                disabled={isUpdatingMentor}
                                type='submit'
                                onClick={submitFormUpdateMentorInfo}
                            >
                                {isUpdatingMentor ? "Đang Cập Nhật ..." : "Cập Nhật"}
                            </Button>
                        </Form>
                    )}
                </div>
            </div>
        </div>
    );
}

export default withHeader(UpdateUserInfoPage);
