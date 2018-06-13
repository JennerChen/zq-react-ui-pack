import { observable, action, computed } from "mobx";
import { findDOMNode } from "react-dom";
import Popper from "popper.js";

export default class OverlayStore {
  overlay = null;

  @observable show = false;
  @observable popperProps = null;
  constructor(overlay) {
    this.overlay = overlay;
  }

  @computed
  get overlayContent() {
    return this.overlay.props.overlay;
  }

  @computed
  get children() {
    return this.overlay.props.children;
  }

  @computed
  get offset() {
    return this.overlay.props.offset;
  }

  @computed
  get placement() {
    return this.overlay.props.placement;
  }

  @computed
  get allowArrow() {
    return this.overlay.props.arrow;
  }

  @computed
  get arrowStyleProps() {
    return {
      size: this.overlay.props.arrowSize,
      bg: this.overlay.props.arrowColor
    };
  }

  @computed
  get popperOptions() {
    return {
      placement: this.placement,
      eventsEnabled: true,
      positionFixed: false,
      modifiers: {
        computeStyle: { gpuAcceleration: false },
        arrow: {
          enabled: this.allowArrow,
          element: this.arrowElement
        },
        applyStyle: { enabled: false },
        updateStateModifier: {
          enabled: true,
          order: 900,
          fn: action("update-popperProps", data => {
            this.popperProps = data;
            return data;
          })
        }
      }
    };
  }

  @computed
  get hoverDelay() {
    return this.overlay.props.hoverDelay ? this.overlay.props.hoverDelay : 0;
  }

  @computed
  get autoClose() {
    return this.overlay.props.autoClose;
  }

  @action.bound
  setupOverlay() {
    this.node = findDOMNode(this.reference);
    this.node.addEventListener("click", this.showPopperByClick);
    this.node.addEventListener("mouseenter", this.showPopperByMouseEnter);
    this.node.addEventListener("mouseleave", this.hidePopperByMouseEnter);
  }

  @action.bound
  tearDownOverlay() {
    if (this.node) {
      this.node.removeEventListener("click", this.showPopperByClick);
      this.node.removeEventListener("mouseenter", this.showPopperByMouseEnter);
      this.node.removeEventListener("mouseleave", this.hidePopperByMouseEnter);
    }
  }

  @action.bound
  showPopperByClick() {
    if (this.overlay.props.trigger !== "click") {
      return;
    }
    this.show = !this.show;
  }

  @action.bound
  showPopperByMouseEnter() {
    if (this.overlay.props.trigger !== "hover") {
      return;
    }
    if (this.showTimer) clearTimeout(this.showTimer);

    this.showTimer = setTimeout(
      action("show-popper", () => {
        this.show = true;
      }),
      this.hoverDelay
    );
  }

  @action.bound
  hidePopperByMouseEnter() {
    if (this.overlay.props.trigger !== "hover") {
      return;
    }

    if (this.showTimer) clearTimeout(this.showTimer);

    this.showTimer = setTimeout(
      action("hide-popper", () => {
        this.show = false;
      }),
      this.hoverDelay
    );
  }

  @action.bound
  autoCloseOverlay(e) {
    if (!this.autoClose) return;
    if (!this.show) return;
    if (!this.popper) return;
    if (this.node.contains(e.target) || this.popperContainer.contains(e.target)) return;
    this.show = false;
  }

  @action.bound
  bindReference(reference) {
    this.reference = reference;
  }

  @action.bound
  bindPopper(container) {
    this.popperContainer = container;
  }

  @action.bound
  bindArrow(arrowElement) {
    this.arrowElement = arrowElement;
  }

  @action.bound
  initPopper() {
    if (this.popper) {
      this.popper.destroy();
    }
    this.popper = new Popper(this.reference, this.popperContainer, this.popperOptions);
    document.addEventListener("click", this.autoCloseOverlay);
  }

  @action.bound
  destroyPopper() {
    if (this.popper) {
      this.popper.destroy();
    }
    this.popper = null;
    document.removeEventListener("click", this.autoCloseOverlay);
  }
}
