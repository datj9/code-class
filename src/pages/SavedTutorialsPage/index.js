import React, { useEffect } from "react";
import "./style.css";
import { useSelector, useDispatch } from "react-redux";
import { clearAllTutorials, getSavedTutorials } from "../../redux/tutorials/actions";
import TutorialsList from "../../components/TutorialsList";
import withHeader from "../../HOC/withHeader";

function SavedTutorialsPage() {
    const loaded = useSelector((state) => state.tutorial.loaded);
    const tutorials = useSelector((state) => state.tutorial.tutorials);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getSavedTutorials());

        return () => {
            dispatch(clearAllTutorials());
        };
    }, [dispatch]);

    return (
        <div className='container saved-tutorials-page'>
            <div className='title text-dark font-weight-bold mb-3'>Bài hướng dẫn đã lưu</div>
            <hr />
            {loaded && tutorials.length === 0 ? (
                <div className='text-center h4'>Chưa có bài hướng dẫn nào được lưu</div>
            ) : (
                <TutorialsList pageSize={4} />
            )}
        </div>
    );
}

export default withHeader(SavedTutorialsPage);
