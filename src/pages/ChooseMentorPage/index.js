import React, { useEffect, useState } from "react";
import "./style.scss";
import { useDispatch, useSelector } from "react-redux";
import { getMentorsList } from "../../redux/mentor/actions";
import { Badge, Button, Container, Modal, ModalBody, ModalFooter, ModalHeader } from "shards-react";

export default function ChooseMentorPage() {
    const dispatch = useDispatch();
    const mentorsList = useSelector((state) => state.mentor.mentorsList);
    const [modalInfoIsOpening, setModalInfoIsOpening] = useState(false);
    const [activeMentor, setActiveMentor] = useState({});

    const openModalInfo = (mentor) => {
        setModalInfoIsOpening(true);
        setActiveMentor(mentor);
    };
    const closeModalInfo = () => {
        setModalInfoIsOpening(false);
    };

    useEffect(() => {
        dispatch(getMentorsList());
    }, [dispatch]);

    return (
        <div className='choose-mentor-page'>
            <Container>
                <div className='mentors-list'>
                    {mentorsList.map((mentor) => (
                        <div className='list-item' key={mentor.id}>
                            <div className='mentor-image'></div>
                            <div className='mentor-info'>
                                <div className='mb-1'>{mentor.user.name}</div>
                                {mentor.user.dateOfBirth ? (
                                    <div className='mb-1'>
                                        Năm sinh: {new Date(mentor.user.dateOfBirth).getFullYear()}
                                    </div>
                                ) : null}
                                <div className='mb-1'>
                                    <span className='mr-2'>Có thể mentor</span>
                                    {mentor.specialities.map((speciality) => (
                                        <Badge key={speciality} className='mr-1' theme='dark'>
                                            {speciality}
                                        </Badge>
                                    ))}
                                </div>
                            </div>
                            <div className='buttons-wp d-flex'>
                                <Button className='mb-1'>Chọn Mentor</Button>
                                <Button className='mt-1' theme='light' onClick={() => openModalInfo(mentor)}>
                                    Thêm Thông Tin
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            </Container>
            <Modal open={modalInfoIsOpening} toggle={closeModalInfo} backdropClassName='backdrop-info-modal'>
                <ModalHeader>Thông tin Mentor</ModalHeader>
                <ModalBody>
                    <div>Tên: {activeMentor.user?.name}</div>
                    <div>Năm sinh: {new Date(activeMentor.user?.dateOfBirth).getFullYear()}</div>
                    <div>Công việc hiện tại: {activeMentor.currentJob}</div>
                    <div>Số năm kinh nghiệm: {activeMentor.numberOfYearsExperience} năm</div>
                    <div>
                        <span className='mr-2'>Có thể mentor</span>
                        {activeMentor.specialities?.map((speciality) => (
                            <Badge key={speciality} className='mr-1' theme='dark'>
                                {speciality}
                            </Badge>
                        ))}
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button theme='secondary' onClick={closeModalInfo}>
                        Đóng
                    </Button>
                </ModalFooter>
            </Modal>
        </div>
    );
}
