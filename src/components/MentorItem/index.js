import React from "react";
import { Badge, Button } from "shards-react";
import "./style.scss";

export default React.memo(function MentorItem({ mentor, chooseMentor, openModalInfo }) {
    return (
        <div className='mentor-item' key={mentor.id}>
            <div className='mentor-image'>
                <img src={mentor.user.profileImageURL} alt='' />
            </div>
            <div className='mentor-info'>
                <div className='mb-1'>{mentor.user.name}</div>
                {mentor.user.dateOfBirth ? (
                    <div className='mb-1'>Năm sinh: {new Date(mentor.user.dateOfBirth).getFullYear()}</div>
                ) : null}
                <div className='mb-1'>
                    <span className='mr-2'>Có thể mentor</span>
                    {mentor.specialities.length > 3
                        ? mentor.specialities.slice(0, 3).map((speciality, i) => (
                              <span key={speciality}>
                                  <Badge className='mr-1' theme='dark'>
                                      {speciality}
                                  </Badge>
                                  {i === 2 ? <Badge theme='dark'>...</Badge> : null}
                              </span>
                          ))
                        : mentor.specialities.map((speciality) => (
                              <Badge key={speciality} className='mr-1' theme='dark'>
                                  {speciality}
                              </Badge>
                          ))}
                </div>
            </div>
            <div className='buttons-wp d-flex'>
                <Button onClick={() => chooseMentor(mentor)} className='mb-1'>
                    Chọn Mentor
                </Button>
                <Button className='mt-1' theme='light' onClick={() => openModalInfo(mentor)}>
                    Thêm Thông Tin
                </Button>
            </div>
        </div>
    );
});
