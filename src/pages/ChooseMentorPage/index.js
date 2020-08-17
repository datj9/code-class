import React, { useEffect, useState } from "react";
import "./style.scss";
import ContentLoader from "react-content-loader";
import { useDispatch, useSelector } from "react-redux";
import { getMentorsList } from "../../redux/mentor/actions";
import { Badge, Button, Container, Modal, ModalBody, ModalFooter, ModalHeader } from "shards-react";

export default function ChooseMentorPage() {
    const dispatch = useDispatch();
    const mentorsList = useSelector((state) => state.mentor.mentorsList);
    const isLoading = useSelector((state) => state.mentor.isLoading);
    const [modalInfoIsOpening, setModalInfoIsOpening] = useState(false);
    const [activeMentor, setActiveMentor] = useState({});
    const isLargeScreen = window.innerWidth > 576;

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

    const LoaderList = () => {
        const list = [];
        const rOfCicle = isLargeScreen ? "15" : "50";
        const xOfFirstTextLine = isLargeScreen ? "50" : "135";
        const yOfFirstTextLine = isLargeScreen ? "0" : +2 * rOfCircle + 10;
        const heightOfFirstTextLine = isLargeScreen ? "8" : "20";
        const widthOfFirstTextLine = isLargeScreen ? "100" : "110";
        const xOfSecondTextLine = isLargeScreen ? "50" : "100";
        const yOfSecondTextLine = isLargeScreen ? "15" : +yOfFirstTextLine + +heightOfFirstTextLine + 10;
        const heightOfSecondTextLine = isLargeScreen ? "8" : "20";
        const widthOfSecondTextLine = isLargeScreen ? "150" : "180";
        const xOfFirstBtn = isLargeScreen ? "322" : "0";
        const yOfFirstBtn = isLargeScreen ? "0" : +yOfSecondTextLine + +heightOfSecondTextLine + 20;
        const widthOfFirstBtn = isLargeScreen ? "58" : "180";
        const heighOfFirstBtn = isLargeScreen ? "13" : "40";
        const xOfSecondBtn = isLargeScreen ? "322" : 380 - widthOfFirstBtn;
        const yOfSecondBtn = isLargeScreen ? "20" : yOfFirstBtn;

        for (let i = 0; i < 8; i++) {
            list.push(
                <ContentLoader
                    key={i}
                    className='list-item'
                    viewBox={isLargeScreen ? "0 0 380 33" : "0 0 380 210"}
                    backgroundColor='#bdbdbd'
                    foregroundColor='#ccc'
                >
                    <circle cx={isLargeScreen ? rOfCicle : "190"} cy={rOfCicle} r={rOfCicle} />
                    <rect
                        x={xOfFirstTextLine}
                        y={yOfFirstTextLine}
                        rx='4'
                        ry='4'
                        width={widthOfFirstTextLine}
                        height={heightOfFirstTextLine}
                    />
                    <rect
                        x={xOfSecondTextLine}
                        y={yOfSecondTextLine}
                        rx='3'
                        ry='3'
                        width={widthOfSecondTextLine}
                        height={heightOfSecondTextLine}
                    />
                    <rect
                        x={xOfFirstBtn}
                        y={yOfFirstBtn}
                        rx='3'
                        ry='3'
                        width={widthOfFirstBtn}
                        height={heighOfFirstBtn}
                    />
                    <rect
                        x={xOfSecondBtn}
                        y={yOfSecondBtn}
                        rx='3'
                        ry='3'
                        width={widthOfFirstBtn}
                        height={heighOfFirstBtn}
                    />
                </ContentLoader>
            );
        }
        return list;
    };

    return (
        <div className='choose-mentor-page'>
            <Container>
                {isLoading ? (
                    <LoaderList />
                ) : (
                    <div className='mentors-list'>
                        {mentorsList.map((mentor) => (
                            <div className='list-item' key={mentor.id}>
                                <div className='mentor-image'>
                                    <img
                                        src='https://avatars2.githubusercontent.com/u/51848355?s=460&u=bf232c01c5a0c42352ef40d250ee13af51284a66&v=4'
                                        alt=''
                                    />
                                </div>
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
                )}
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
