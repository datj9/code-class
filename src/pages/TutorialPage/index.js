import React, { Component, Fragment } from "react";
import "./style.css";
import { connect } from "react-redux";
import { fetchOneTutorial, clearTutorial, increaseView } from "../../redux/tutorials/actions";
import { Button, Badge } from "shards-react";
import parse from "html-react-parser";
import moment from "moment";
import ContentLoader from "react-content-loader";
import { Link } from "react-router-dom";
import { saveTutorial, clearErrors } from "../../redux/user/actions";
import hljs from "highlight.js/lib/highlight";
import javascript from "highlight.js/lib/languages/javascript";
import css from "highlight.js/lib/languages/css";
import scss from "highlight.js/lib/languages/scss";
import less from "highlight.js/lib/languages/less";
import bash from "highlight.js/lib/languages/bash";

hljs.registerLanguage("javascript", javascript);
hljs.registerLanguage("css", css);
hljs.registerLanguage("scss", scss);
hljs.registerLanguage("less", less);
hljs.registerLanguage("bash", bash);

class TutorialPage extends Component {
    state = { sentIP: false };

    handleSaveTutorial = () => {
        this.props.savedTutorialReq(this.props.tutorial.id);
    };

    componentDidMount() {
        const { tutorialId } = this.props.match.params;
        this.props.getTutorialReq(tutorialId);
        window.scrollTo(0, 0);
    }

    componentWillUnmount() {
        this.props.clearTutorialReq();
        this.props.clearUserStore();
    }

    componentDidUpdate() {
        const tutorial = this.props.tutorial;
        const nodes = document.querySelectorAll("pre");

        nodes.forEach((node) => {
            hljs.highlightBlock(node);
        });

        if (!this.state.sentIP && Object.keys(tutorial).length > 0) {
            this.setState({ sentIP: true });

            setTimeout(() => {
                this.props.increaseViewReq(tutorial.id);
            }, (tutorial.readingTime / 8) * 60 * 1000);
        }
    }

    render() {
        const { tutorial, currentUser, isLoading, isSaving, isAuthenticated, message } = this.props;

        const Loader = () => {
            const contentLines = [];

            for (let i = 0; i < 15; i++) {
                contentLines.push(<rect x='0' y={45 + 10 * i + ""} rx='3' ry='3' width='300' height='6' key={i} />);
            }

            return (
                <ContentLoader style={{ width: "100%" }} viewBox='0 0 300 330'>
                    <rect x='0' y='0' rx='5' ry='5' width='200' height='12' />
                    <rect x='0' y='20' rx='4' ry='4' width='30' height='8' />
                    <rect x='270' y='20' rx='3' ry='3' width='30' height='15' />
                    <rect x='0' y='32' rx='4' ry='4' width='50' height='8' />
                    {contentLines}
                </ContentLoader>
            );
        };

        const SaveTutorialButton = () => {
            const { savedTutorials } = currentUser;

            if (savedTutorials && savedTutorials.includes(tutorial.id) && !message.includes("success")) {
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
                    <Fragment>
                        <h3 className='mb-3'>{tutorial.title}</h3>
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
                    </Fragment>
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
