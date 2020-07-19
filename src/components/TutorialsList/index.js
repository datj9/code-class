import React, { Component } from "react";
import "./style.css";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { Badge } from "shards-react";
import CardLoader from "../CardLoader";
import ThreeDotsLoader from "../ThreeDotsLoader";
import moment from "moment";
import { fetchTutorials } from "../../redux/tutorials/actions";

class TutorialsList extends Component {
    render() {
        const { tutorials, isLoading, isSearching, sortType, pageSize, isFetchingMore } = this.props;

        const List = () => {
            let tutorialsList;

            switch (sortType) {
                case "DIFFICULTY_ASC":
                    tutorialsList = tutorials.sort((a, b) => a.difficultyLevel - b.difficultyLevel);
                    break;
                case "DIFFICULTY_DESC":
                    tutorialsList = tutorials.sort((a, b) => b.difficultyLevel - a.difficultyLevel);
                    break;
                case "VIEWS_DESC":
                    tutorialsList = tutorials.sort((a, b) => b.views - a.views);
                    break;
                case "MOST_RECENT":
                    tutorialsList = tutorials.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                    break;
                default:
                    tutorialsList = tutorials;
                    break;
            }

            return tutorialsList.map((tutorial) => (
                <Link
                    to={`/tutorials/${tutorial.id}`}
                    className='card-item text-decoration-none text-dark'
                    key={tutorial.id}
                >
                    <img className='mr-3' src={tutorial.thumbnailUrl} alt='' />
                    <div className='d-flex flex-column'>
                        <span className='tutorial-title'>{tutorial.title}</span>
                        <span className='tutorial-description'>
                            {tutorial.description.length <= 26 || window.innerWidth > 576
                                ? tutorial.description
                                : `${tutorial.description.slice(0, 26)}...`}
                        </span>
                        <span className='mt-2 created-at'>
                            {Date.now() - new Date(tutorial.createdAt) <= 3 * 24 * 60 * 60 * 1000
                                ? moment(tutorial.createdAt).fromNow()
                                : moment(tutorial.createdAt).format("MMMM DD")}
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
        console.log(tutorials);
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
