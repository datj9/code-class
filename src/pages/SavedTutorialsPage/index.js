import React from "react";
import "./style.css";
import { connect } from "react-redux";
import { getSavedTutorials } from "../../redux/tutorials/actions";
import TutorialsList from "../../components/TutorialsList";

class SavedTutorialsPage extends React.Component {
    state = {};

    componentDidMount() {
        this.props.getSavedTutorialsReq();
        window.removeEventListener("scroll", () => {});
    }

    render() {
        const { loaded, tutorials } = this.props;
        return (
            <div className='container py-5'>
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
}

const mapStateToProps = (state) => ({
    tutorials: state.tutorial.tutorials,
    loaded: state.tutorial.loaded,
});

const mapDispatchToProps = (dispatch) => ({
    getSavedTutorialsReq: () => dispatch(getSavedTutorials()),
});

export default connect(mapStateToProps, mapDispatchToProps)(SavedTutorialsPage);
