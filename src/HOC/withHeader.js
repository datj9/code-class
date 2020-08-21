import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import ChatBox from "../components/ChatBox";
import Header from "../components/Header";
import { connectMentor } from "../redux/chat/actions";

export default function withHeader(WrappedComponent) {
    class WithHeader extends Component {
        constructor(props) {
            super(props);
            this.state = {
                chatBoxOpen: false,
                selectedReceiver: {},
            };
        }

        handleReceiverChange = (receiver) => {
            this.setState({ selectedReceiver: receiver });
            localStorage.setItem("receiver", JSON.stringify(receiver));
        };

        toggleChatBox = () => {
            this.setState({ chatBoxOpen: !this.state.chatBoxOpen });
        };
        closeChatBox = () => {
            this.setState({ chatBoxOpen: false });
        };

        componentDidMount() {
            const receiver = JSON.parse(localStorage.getItem("receiver"));
            const currentUser = this.props.currentUser;

            if (receiver) {
                this.setState({ selectedReceiver: receiver });
                this.props.connectMentor([currentUser.id, receiver.id]);
            }
        }

        render() {
            const { chatBoxOpen, selectedReceiver } = this.state;

            return (
                <Fragment>
                    <Header
                        handleReceiverChange={this.handleReceiverChange}
                        selectedReceiver={this.state.selectedReceiver}
                        toggleChatBox={this.toggleChatBox}
                    />
                    <WrappedComponent {...this.props} />
                    {Object.keys(selectedReceiver).length > 0 ? (
                        <span onClick={this.toggleChatBox} role='button' className='bubble-messenger'>
                            <img src={require("../assets/icons/messenger.svg")} alt='' />
                        </span>
                    ) : null}
                    {chatBoxOpen ? <ChatBox receiver={selectedReceiver} closeChatBox={this.closeChatBox} /> : null}
                </Fragment>
            );
        }
    }

    const mapStateToProps = (state) => ({
        currentUser: state.user.currentUser,
    });
    const mapDispatchToProps = (dispatch) => ({
        connectMentor: (members) => dispatch(connectMentor(members)),
    });

    return connect(mapStateToProps, mapDispatchToProps)(WithHeader);
}
