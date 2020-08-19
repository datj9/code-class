import React, { Component, Fragment } from "react";
import Header from "../components/Header";

export default function withHeader(WrappedComponent) {
    return class extends Component {
        render() {
            return (
                <Fragment>
                    <Header />
                    <WrappedComponent {...this.props} />
                </Fragment>
            );
        }
    };
}
