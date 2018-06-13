import { observable, action, computed } from "mobx";
import { findDOMNode } from "react-dom";

export default class OverlayStore {
  overlay = null;

  @observable show = false;

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
  get hoverDelay() {
    return this.overlay.props.hoverDelay ? this.overlay.props.hoverDelay : 0;
  }

  @computed
  get autoClose() {
    return this.overlay.props.autoClose;
  }

  @computed
  get animation() {
    return this.overlay.props.animation;
  }

  @computed
  get zIndex() {
    return this.overlay.props.zIndex;
  }

  @computed
  get flip() {
    return this.overlay.props.flip;
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

    this.showTimer = setTimeout(action("show-popper", this.showOverlay), this.hoverDelay);
  }

  @action.bound
  hidePopperByMouseEnter() {
    if (this.overlay.props.trigger !== "hover") {
      return;
    }

    if (this.showTimer) clearTimeout(this.showTimer);

    this.showTimer = setTimeout(action("hide-popper", this.closeOverlay), this.hoverDelay);
  }

  @action.bound
  closeOverlay() {
    this.show = false;
  }

  @action.bound
  showOverlay() {
    this.show = true;
  }

  @action.bound
  bindReference(reference) {
    this.reference = reference;
  }
}
