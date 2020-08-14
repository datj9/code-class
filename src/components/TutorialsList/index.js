import React, { Component } from "react";
import "./style.css";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { Badge } from "shards-react";
import CardLoader from "../CardLoader";
import ThreeDotsLoader from "../ThreeDotsLoader";
import dayjs from "dayjs";
import { fetchTutorials } from "../../redux/tutorials/actions";

class TutorialsList extends Component {
    render() {
        const { tutorials, isLoading, isSearching, pageSize, isFetchingMore } = this.props;

        const List = () => {
            return tutorials.map((tutorial) => (
                <Link
                    to={`/tutorials/${tutorial.id}`}
                    className='card-item text-decoration-none text-dark'
                    key={tutorial.id}
                >
                    <img className='mr-3' src={tutorial.thumbnailUrl} alt='' />
                    <div className='d-flex flex-column'>
                        <span className='tutorial-title'>{tutorial.title}</span>
                        <span className='tutorial-description'>
                            {tutorial.description.length <= 23 || window.innerWidth > 576
                                ? tutorial.description
                                : `${tutorial.description.slice(0, 23)}...`}
                        </span>
                        <span className='mt-2 created-at'>
                            {Date.now() - new Date(tutorial.createdAt) <= 3 * 24 * 60 * 60 * 1000
                                ? dayjs(tutorial.createdAt).fromNow()
                                : dayjs(tutorial.createdAt).format("MMMM DD")}
                        </span>
                        <div>
                            {tutorial.tags.map((tag) => (
                                <Badge key={tag} className='mr-2' pill theme='secondary'>
                                    {tag}
                                </Badge>
                            ))}
                        </div>
                    </div>
                </Link>
            ));
        };

        return (
            <div className='d-flex flex-wrap'>
                {isLoading || isSearching ? (
                    <CardLoader numberOfCards={pageSize} />
                ) : (
                    <>
                        <List /> {isFetchingMore ? <ThreeDotsLoader /> : null}
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
