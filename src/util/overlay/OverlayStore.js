import { observable, action, computed, toJS } from "mobx";
import { findDOMNode } from "react-dom";

export default class OverlayStore {
  overlay = null;

  @observable overlayProps = null;
  @observable show = false;

  constructor(overlay) {
    this.overlay = overlay;
    this.overlayProps = overlay.props;
  }

  @computed
  get overlayContent() {
    return toJS(this.overlayProps.overlay);
  }

  @computed
  get children() {
    return this.overlayProps.children;
  }

  @computed
  get offset() {
    return this.overlayProps.offset;
  }

  @computed
  get placement() {
    return this.overlayProps.placement;
  }

  @computed
  get allowArrow() {
    return this.overlayProps.arrow;
  }

  @computed
  get arrowStyleProps() {
    return {
      size: this.overlayProps.arrowSize,
      bg: this.overlayProps.arrowColor
    };
  }

  @computed
  get hoverDelay() {
    return this.overlayProps.hoverDelay ? this.overlayProps.hoverDelay : 0;
  }

  @computed
  get autoClose() {
    return this.overlayProps.autoClose;
  }

  @computed
  get animation() {
    return this.overlayProps.animation;
  }

  @computed
  get zIndex() {
    return this.overlayProps.zIndex;
  }

  @computed
  get flip() {
    return this.overlayProps.flip;
  }

  @computed
  get disabled() {
    return this.overlayProps.disabled;
  }

  @computed
  get visible() {
    return this.overlayProps.visible;
  }

  @action.bound
  getOnVisibleChange() {
    return this.overlayProps.onVisibleChange;
  }

  @action.bound
  updateOverlayProps(newProps) {
    this.overlayProps = newProps;
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
    if (this.disabled || this.overlayProps.trigger !== "click") {
      return;
    }

    if (this.getOnVisibleChange()(!this.show) !== false) {
      this.show = !this.show;
    }
  }

  @action.bound
  showPopperByMouseEnter() {
    if (this.disabled || this.overlayProps.trigger !== "hover") {
      return;
    }

    if (this.showTimer) clearTimeout(this.showTimer);

    if (this.getOnVisibleChange()(true) !== false) {
      this.showTimer = setTimeout(action("show-popper", this.forceShowOverlay), this.hoverDelay);
    }
  }

  @action.bound
  hidePopperByMouseEnter() {
    if (this.overlayProps.trigger !== "hover") {
      return;
    }

    if (this.showTimer) clearTimeout(this.showTimer);

    if (this.getOnVisibleChange()(false) !== false) {
      this.showTimer = setTimeout(action("hide-popper", this.forceCloseOverlay), this.hoverDelay);
    }
  }

  @action.bound
  closeOverlay() {
    if (this.getOnVisibleChange()(false) !== false) {
      this.show = false;
    }
  }

  @action.bound
  showOverlay() {
    if (this.getOnVisibleChange()(true) !== false) {
      this.show = true;
    }
  }

  @action.bound
  forceCloseOverlay() {
    this.show = false;
  }

  @action.bound
  forceShowOverlay() {
    this.show = true;
  }

  @action.bound
  bindReference(reference) {
    this.reference = reference;
  }
}
