import React, { Component } from "react";
import PropTypes from "prop-types";
import { createComponent, util } from "rebass";

const Loader = createComponent({
    name: "Loader",
    type: "svg",
    style: props => ({
        verticalAlign: "middle",
        display: "inline",
        fill: util.color(props)(props.color),
        width: util.px(props.size),
        height: util.px(props.size)
    }),
    defaultProps: {
        color: "base",
        size: 16
    }
});

export default class Loading extends Component {
    static propTypes = {
        duration: PropTypes.number,
        size: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    };

    static defaultProps = {
        duration: 1.5,
        size: 16
    };

    render() {
        const { duration, size, ...props } = this.props;
        return (
            <Loader xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" size={size} {...props}>
                <path
                    opacity=".25"
                    d="M16 0 A16 16 0 0 0 16 32 A16 16 0 0 0 16 0 M16 4 A12 12 0 0 1 16 28 A12 12 0 0 1 16 4"
                />
                <path d="M16 0 A16 16 0 0 1 32 16 L28 16 A12 12 0 0 0 16 4z">
                    <animateTransform
                        attributeName="transform"
                        type="rotate"
                        from="0 16 16"
                        to="360 16 16"
                        dur={`${duration}s`}
                        repeatCount="indefinite"
                    />
                </path>
            </Loader>
        );
    }
}
