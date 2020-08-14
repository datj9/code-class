import React from "react";
import "./style.css";
import { Dropdown, DropdownToggle, DropdownMenu, FormCheckbox, DropdownItem, Button } from "shards-react";
import { connect } from "react-redux";
import { clearAllTutorials, fetchTutorials, searchTutorials } from "../../redux/tutorials/actions";
import TutorialsList from "../../components/TutorialsList";
import ChatBox from "../../components/ChatBox";

class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            openSearch: false,
            openSort: false,
            showScrollBtn: false,
            technologies: { ReactJS: false, JavaScript: false, TypeScript: false },
            pageIndex: 1,
            pageSize: 8,
            sortBy: "createdAt",
            orderBy: -1,
        };
    }

    toggleSearch = () => {
        this.setState({ openSearch: !this.state.openSearch });
    };
    toggleSort = () => {
        this.setState({ openSort: !this.state.openSort });
    };
    handleTechChange = (e, tech) => {
        const technologies = this.state.technologies;

        technologies[tech] = !technologies[tech];
        this.setState({ technologies });
    };
    handleSearch = () => {
        const { sortBy, orderBy } = this.state;
        const techsObj = this.state.technologies;
        const searchTechnologies = Object.keys(techsObj).filter((tech) => techsObj[tech]);

        this.props.searchTutorialsReq(this.state.pageSize, 1, searchTechnologies, sortBy, orderBy);
        this.toggleSearch();
        this.setState({ pageIndex: 1 });
    };
    handleSortType = (sortBy, orderBy) => {
        const techsObj = this.state.technologies;
        const searchTechnologies = Object.keys(techsObj).filter((tech) => techsObj[tech]);

        this.props.fetchTutorialsReq(this.state.pageSize, 1, sortBy, orderBy, searchTechnologies);
        this.setState({ sortBy, orderBy });
    };
    listenToScoll = () => {
        const techsObj = this.state.technologies;
        const searchTechnologies = Object.keys(techsObj).filter((tech) => techsObj[tech]);
        const { sortBy, orderBy } = this.state;

        if (document.documentElement.scrollTop > 50 || document.body.scrollTop > 50) {
            this.setState({ showScrollBtn: true });
        } else {
            this.setState({ showScrollBtn: false });
        }

        if (
            window.innerHeight + window.scrollY >= document.body.offsetHeight - 100 &&
            this.props.total > this.state.pageIndex * this.state.pageSize &&
            searchTechnologies.length === 0 &&
            this.props.tutorials.length > 0
        ) {
            this.props.fetchTutorialsReq(this.state.pageSize, this.state.pageIndex + 1, sortBy, orderBy);
            this.setState({ pageIndex: this.state.pageIndex + 1 });
        } else if (
            window.innerHeight + window.scrollY >= document.body.offsetHeight - 100 &&
            this.props.total > this.state.pageIndex * this.state.pageSize &&
            searchTechnologies.length > 0 &&
            this.props.tutorials.length > 0
        ) {
            this.props.searchTutorialsReq(
                this.state.pageSize,
                this.state.pageIndex + 1,
                searchTechnologies,
                sortBy,
                orderBy
            );
            this.setState({ pageIndex: this.state.pageIndex + 1 });
        }
    };

    scrollTop = () => {
        const scroll = setInterval(() => {
            if (document.documentElement.scrollTop > 0 || document.body.scrollTop > 0) {
                document.body.scrollTop = document.body.scrollTop - 50;
                document.documentElement.scrollTop = document.documentElement.scrollTop - 50;
            } else {
                clearInterval(scroll);
            }
        }, 5);
    };

    componentWillUnmount() {
        this.props.clearAllTutorialsInStore();
        window.removeEventListener("scroll", this.listenToScoll);
    }

    componentDidMount() {
        const { sortBy, orderBy } = this.state;
        this.props.fetchTutorialsReq(this.state.pageSize, this.state.pageIndex, sortBy, orderBy);
        window.addEventListener("scroll", this.listenToScoll);
    }

    render() {
        const { technologies } = this.state;
        const { isSearching } = this.props;

        return (
            <div className='container homepage'>
                <div className='breadcrumb-container'>
                    <ChatBox />
                    <span className='title text-dark font-weight-bold'>Bài hướng dẫn</span>
                    <div className='d-flex'>
                        <Dropdown className='mr-3' open={this.state.openSort} toggle={this.toggleSort}>
                            <DropdownToggle theme='secondary'>Sắp xếp theo</DropdownToggle>
                            <DropdownMenu>
                                <DropdownItem onClick={() => this.handleSortType("difficultyLevel", 1)}>
                                    Dễ - Khó
                                </DropdownItem>
                                <DropdownItem onClick={() => this.handleSortType("difficultyLevel", -1)}>
                                    Khó - Dễ
                                </DropdownItem>
                                <DropdownItem onClick={() => this.handleSortType("views", -1)}>
                                    Lượt xem cao
                                </DropdownItem>
                                <DropdownItem onClick={() => this.handleSortType("createdAt", -1)}>
                                    Gần đây nhất
                                </DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                        <Dropdown toggle={this.toggleSearch} open={this.state.openSearch} className='d-table'>
                            <DropdownToggle disabled={isSearching} onClick={this.toggle}>
                                {isSearching ? "Đang tìm kiếm" : "Tìm kiếm theo"}
                            </DropdownToggle>
                            <DropdownMenu>
                                <DropdownItem disabled>Ngôn ngữ</DropdownItem>
                                <FormCheckbox
                                    className='ml-4'
                                    checked={technologies.JavaScript}
                                    onChange={(e) => this.handleTechChange(e, "JavaScript")}
                                >
                                    JavaScript
                                </FormCheckbox>
                                <FormCheckbox
                                    className='ml-4'
                                    checked={technologies.TypeScript}
                                    onChange={(e) => this.handleTechChange(e, "TypeScript")}
                                >
                                    TypeScript
                                </FormCheckbox>
                                <DropdownItem divider />
                                <DropdownItem disabled>Công nghệ</DropdownItem>
                                <FormCheckbox
                                    className='ml-4'
                                    checked={technologies.ReactJS}
                                    onChange={(e) => this.handleTechChange(e, "ReactJS")}
                                >
                                    ReactJS
                                </FormCheckbox>
                                <DropdownItem divider />
                                <Button onClick={this.handleSearch} className='ml-4' theme='info'>
                                    Tìm kiếm
                                </Button>
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                </div>
                <hr />
                <TutorialsList pageSize={6} />
                {this.state.showScrollBtn ? (
                    <Button onClick={this.scrollTop} className='scroll-top-btn' theme='secondary'>
                        Lên Đầu Trang
                    </Button>
                ) : null}
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    tutorials: state.tutorial.tutorials,
    isSearching: state.tutorial.isSearching,
    total: state.tutorial.total,
});

const mapDispatchToProps = (dispatch) => ({
    fetchTutorialsReq: (pageSize, pageIndex, sortBy, orderBy, technologies) =>
        dispatch(fetchTutorials(pageSize, pageIndex, sortBy, orderBy, technologies)),
    searchTutorialsReq: (pageSize, pageIndex, technologies, sortBy, orderBy) =>
        dispatch(searchTutorials(pageSize, pageIndex, technologies, sortBy, orderBy)),
    clearAllTutorialsInStore: () => dispatch(clearAllTutorials()),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
