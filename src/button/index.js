import React, { Component } from "react";
import PropTypes from "prop-types";
import styled, { css } from "styled-components";
// import tag from 'tag-hoc'
import { Button as RebassBtn } from "rebass";
import cleanProp from "../util/cleanProp";

const LoadingCover = css`
    &:before {
        position: absolute;
        top: -1px;
        left: -1px;
        bottom: -1px;
        right: -1px;
        background: #fff;
        opacity: 0.35;
        content: "";
        border-radius: inherit;
        z-index: 1;
        transition: opacity 0.2s;
        pointer-events: none;
        display: block;
    }
`;

const Disabled = css`
    color: rgba(0, 0, 0, 0.25);
    background-color: #f5f5f5;
    border-color: #d9d9d9;
    cursor: not-allowed;
`;

const Btn = styled(cleanProp(["showCover"])(RebassBtn))`
    font-weight: normal;
    transition: all 0.3s;
    position: relative;
    border: 1px solid transparent;
    ${props => (props.showCover ? LoadingCover : "")};
    ${props => (props.disabled ? Disabled : "")};
`;

export default class Button extends Component {
    static propTypes = {
        style: PropTypes.object,
        onClick: PropTypes.func,
        disabled: PropTypes.bool
    };

    static defaultProps = {
        style: {},
        onClick: () => {},
        disabled: false
    };

    state = {
        showCover: false
    };

    handleClick = e => {
        if (this.props.disabled || this.state.showCover) {
            return;
        }

        let result = this.props.onClick(e);
        if (result instanceof Promise) {
            this.setState({
                showCover: true
            });
            result.finally(() => {
                this.setState({
                    showCover: false
                });
            });
        } else {
            this.setState({
                showCover: false
            });
        }
    };

    render() {
        const { onClick, disabled, ...rest } = this.props;
        const { showCover } = this.state;
        return (
            <Btn showCover={showCover} {...rest} onClick={this.handleClick} disabled={disabled}>
                {this.props.children}
            </Btn>
        );
    }
}
