import React from "react";
import "./style.css";
import { Dropdown, DropdownToggle, DropdownMenu, FormCheckbox, DropdownItem, Button } from "shards-react";
import { connect } from "react-redux";
import { fetchTutorials, searchTutorials } from "../../redux/tutorials/actions";
import TutorialsList from "../../components/TutorialsList";

class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            openSearch: false,
            openSort: false,
            sortType: "",
            technologies: { ReactJS: false, JavaScript: false },
            pageIndex: 1,
            pageSize: 8,
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
        const techsObj = this.state.technologies;
        const searchTechnologies = Object.keys(techsObj).filter((tech) => techsObj[tech]);
        this.props.searchTutorialsReq(this.state.pageSize, 1, searchTechnologies);
        this.toggleSearch();
        this.setState({ pageIndex: 1 });
    };
    handleSortType = (sortType) => {
        this.setState({ sortType });
    };

    componentDidMount() {
        this.props.fetchTutorialsReq(this.state.pageSize, 1);
    }

    render() {
        const { technologies } = this.state;
        const { isSearching } = this.props;

        document.addEventListener("scroll", () => {
            const techsObj = this.state.technologies;
            const searchTechnologies = Object.keys(techsObj).filter((tech) => techsObj[tech]);

            if (
                window.innerHeight + window.scrollY >= document.body.offsetHeight - 100 &&
                this.state.pageIndex < Math.ceil(this.props.total / this.state.pageSize) &&
                searchTechnologies.length === 0
            ) {
                this.props.fetchTutorialsReq(this.state.pageSize, this.state.pageIndex + 1);
                this.setState({ pageIndex: this.state.pageIndex + 1 });
            } else if (
                window.innerHeight + window.scrollY >= document.body.offsetHeight - 100 &&
                this.state.pageIndex < Math.ceil(this.props.total / this.state.pageSize) &&
                searchTechnologies.length > 0
            ) {
                this.props.searchTutorialsReq(this.state.pageSize, this.state.pageIndex + 1, searchTechnologies);
                this.setState({ pageIndex: this.state.pageIndex + 1 });
            }
        });

        return (
            <div className='container py-5'>
                <div className='breadcrumb-container'>
                    <span className='title text-dark font-weight-bold mb-3'>Bài hướng dẫn</span>
                    <div className='d-flex'>
                        <Dropdown className='mr-3' open={this.state.openSort} toggle={this.toggleSort}>
                            <DropdownToggle theme='secondary'>Sắp xếp theo</DropdownToggle>
                            <DropdownMenu>
                                <DropdownItem onClick={() => this.handleSortType("DIFFICULTY_ASC")}>
                                    Dễ - Khó
                                </DropdownItem>
                                <DropdownItem onClick={() => this.handleSortType("DIFFICULTY_DESC")}>
                                    Khó - Dễ
                                </DropdownItem>
                                <DropdownItem onClick={() => this.handleSortType("VIEWS_DESC")}>
                                    Lượt xem cao
                                </DropdownItem>
                                <DropdownItem onClick={() => this.handleSortType("MOST_RECENT")}>
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
                <TutorialsList pageSize={4} sortType={this.state.sortType} />
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
    fetchTutorialsReq: (pageSize, pageIndex) => dispatch(fetchTutorials(pageSize, pageIndex)),
    searchTutorialsReq: (pageSize, pageIndex, technologies) =>
        dispatch(searchTutorials(pageSize, pageIndex, technologies)),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
