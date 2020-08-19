import React, { PureComponent, Fragment } from "react";
import Header from "../components/Header";

export default function withHeader(WrappedComponent) {
    return class extends PureComponent {
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
