import React, { Component } from "react";
import "./style.css";
import { connect } from "react-redux";
import { fetchOneTutorial, clearTutorial, increaseView } from "../../redux/tutorials/actions";
import { Button, Badge } from "shards-react";
import parse from "html-react-parser";
import moment from "moment";
import ContentLoader from "react-content-loader";
import { Link } from "react-router-dom";
import { saveTutorial, clearErrors } from "../../redux/user/actions";
import Prism from "prismjs";

class TutorialPage extends Component {
    constructor(props) {
        super(props);
        this.state = { sentIP: false, isHighlight: false };
        this.timer = null;
    }

    handleSaveTutorial = () => {
        this.props.savedTutorialReq(this.props.tutorial.id);
    };

    sendIPTimout = () => {
        const { tutorial } = this.props;
        this.timer = setTimeout(
            () => this.props.increaseViewReq(tutorial.id),
            (this.props.tutorial.readingTime / 8) * 60 * 1000
        );
    };

    clearTimeOutSendIP = () => {
        clearTimeout(this.timer);
    };

    componentDidMount() {
        const { tutorialId } = this.props.match.params;
        this.props.getTutorialReq(tutorialId);
        window.scrollTo(0, 0);
    }

    componentWillUnmount() {
        this.props.clearTutorialReq();
        this.props.clearUserStore();
        if (this.timer) {
            this.clearTimeOutSendIP();
        }
    }

    componentDidUpdate() {
        const tutorial = this.props.tutorial;

        if (!this.state.isHighlight && Object.keys(tutorial).length) {
            Prism.highlightAll();
            this.setState({ isHighlight: true });
        }

        if (!this.state.sentIP && Object.keys(tutorial).length > 0) {
            this.setState({ sentIP: true });
            this.sendIPTimout();
        }
    }

    render() {
        const { tutorial, currentUser, isLoading, isSaving, isAuthenticated, message } = this.props;
        const isLargeScreen = window.innerWidth > 768;

        const Loader = () => {
            const contentLines = [];

            for (let i = 0; i < (isLargeScreen ? 15 : 12); i++) {
                contentLines.push(
                    <rect
                        x='0'
                        y={(isLargeScreen ? 45 : 136) + (isLargeScreen ? 10 : 17) * i}
                        rx='3'
                        ry='3'
                        width='300'
                        height={isLargeScreen ? 6 : 12}
                        key={i}
                    />
                );
            }

            return (
                <ContentLoader style={{ width: "100%" }} viewBox='0 0 300 355'>
                    <rect
                        x='0'
                        y='0'
                        rx='5'
                        ry='5'
                        width={isLargeScreen ? 200 : 300}
                        height={isLargeScreen ? 12 : 24}
                    />
                    {isLargeScreen ? null : <rect x='0' y='30' rx='5' ry='5' width='300' height='24' />}
                    <rect
                        x='0'
                        y={isLargeScreen ? 20 : 74}
                        rx='4'
                        ry='4'
                        width={isLargeScreen ? 30 : 55}
                        height={isLargeScreen ? 8 : 16}
                    />
                    <rect
                        x={isLargeScreen ? 275 : 230}
                        y={isLargeScreen ? 20 : 74}
                        rx='3'
                        ry='3'
                        width={isLargeScreen ? 25 : 70}
                        height={isLargeScreen ? 10 : 30}
                    />
                    <rect
                        x='0'
                        y={isLargeScreen ? 32 : 95}
                        rx='4'
                        ry='4'
                        width={isLargeScreen ? 50 : 65}
                        height={isLargeScreen ? 8 : 16}
                    />
                    {contentLines}
                </ContentLoader>
            );
        };

        const SaveTutorialButton = () => {
            if (tutorial.isSaved && !message.includes("success")) {
                return null;
            } else if (isAuthenticated && !message.includes("success")) {
                return (
                    <Button disabled={isSaving} onClick={this.handleSaveTutorial}>
                        {isSaving ? "Đang Lưu Bài.." : " Lưu Bài"}
                    </Button>
                );
            } else if (isAuthenticated && message.includes("success")) {
                return (
                    <Button disabled theme='success'>
                        Đã Lưu Thành Công
                    </Button>
                );
            } else {
                return (
                    <Link to={`/sign-in?tutorialId=${tutorial.id}`}>
                        <Button>Lưu Bài</Button>
                    </Link>
                );
            }
        };

        return (
            <div className='container mt-5'>
                {isLoading ? (
                    <Loader />
                ) : (
                    <div className='tutorial-page'>
                        <h3 className='mb-3 tutorial-title'>{tutorial.title}</h3>
                        <div className='mb-3 d-flex justify-content-between'>
                            <div className='d-flex flex-column flex-start'>
                                <span>Lượt xem: {tutorial.views}</span>
                                <span>
                                    {Date.now() - new Date(tutorial.createdAt) <= 3 * 24 * 60 * 60 * 1000
                                        ? moment(tutorial.createdAt).fromNow()
                                        : moment(tutorial.createdAt).format("MMMM DD")}
                                </span>
                            </div>
                            <SaveTutorialButton />
                        </div>
                        <div className='mt-5'>{parse(tutorial.content || "")}</div>
                        <div className='my-3'>
                            {tutorial.tags?.map((tag) => (
                                <Badge key={tag} className='mr-2' pill theme='secondary'>
                                    {tag}
                                </Badge>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    tutorial: state.tutorial.tutorial,
    currentUser: state.user.currentUser,
    isAuthenticated: state.user.isAuthenticated,
    isLoading: state.tutorial.isLoading,
    isSaving: state.user.isLoading,
    message: state.user.message,
});

const mapDispatchToProps = (dispatch) => ({
    getTutorialReq: (tutorialId) => dispatch(fetchOneTutorial(tutorialId)),
    clearTutorialReq: () => dispatch(clearTutorial()),
    savedTutorialReq: (tutorialId) => dispatch(saveTutorial(tutorialId)),
    clearUserStore: () => dispatch(clearErrors()),
    increaseViewReq: (tutorialId) => dispatch(increaseView(tutorialId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TutorialPage);
