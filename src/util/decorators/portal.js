import { decorate } from "./util";
import { Component, createElement } from "react";
import { unstable_renderSubtreeIntoContainer, unmountComponentAtNode } from "react-dom";

function getDecorator() {
  return target => {
    return class Portal extends Component {
      componentDidMount() {
        this.portal = document.createElement("div");
        document.body.appendChild(this.portal);
        this.renderPortal(this.props);
      }

      componentWillUnmount() {
        unmountComponentAtNode(this.portal);
        this.portal.remove();
      }

      componentDidUpdate() {
        this.renderPortal(this.props);
      }

      renderPortal(props) {
        unstable_renderSubtreeIntoContainer(this, createElement(target, props), this.portal);
      }

      render() {
        return null;
      }
    };
  };
}

export const portal = function() {
  const isReactElement = typeof arguments[0] === "function";
  const decorator = getDecorator(isReactElement);
  return decorate(!isReactElement, decorator, arguments);
};
