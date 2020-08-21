import React, { Component } from "react";
import "./style.css";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import CardLoader from "../CardLoader";
import ThreeDotsLoader from "../ThreeDotsLoader";
import { fetchTutorials } from "../../redux/tutorials/actions";
import TutorialItem from "../TutorialItem";

class TutorialsList extends Component {
    render() {
        const { tutorials, isLoading, isSearching, pageSize, isFetchingMore } = this.props;

        return (
            <div className='d-flex flex-column'>
                {isLoading || isSearching ? (
                    <CardLoader numberOfCards={pageSize} />
                ) : (
                    <>
                        {tutorials.map((tutorial) => (
                            <TutorialItem key={tutorial.id} tutorial={tutorial} />
                        ))}
                        {isFetchingMore ? <ThreeDotsLoader /> : null}
                    </>
                )}
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    tutorials: state.tutorial.tutorials,
    isLoading: state.tutorial.isLoading,
    isFetchingMore: state.tutorial.isFetchingMore,
    isSearching: state.tutorial.isSearching,
    currentUser: state.user.currentUser,
});

const mapDispatchToProps = (dispatch) => ({
    fetchTutorialsReq: (pageSize, pageIndex) => dispatch(fetchTutorials(pageSize, pageIndex)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(TutorialsList));
