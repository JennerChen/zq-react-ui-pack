import React, { cloneElement } from "react";
import { LeanIcon, TrailIcon, StyledClearIcon } from "./BaseUI";

export const renderLeanIcon = component => {
  const { size, leanIcon, disabled } = component.props;

  return cloneElement(leanIcon(LeanIcon), {
    size,
    disabled
  });
};

export const renderTrailIcon = component => {
  const { size, trailIcon, allowClear, value, disabled } = component.props;

  let trailIconComp = allowClear ? (
    value ? (
      <TrailIcon allowRipple={!!value} onClick={component.emptyValue}>
        <StyledClearIcon size={20} />
      </TrailIcon>
    ) : null
  ) : (
    trailIcon(TrailIcon)
  );

  if (!trailIconComp) {
    return null;
  }

  return cloneElement(trailIconComp, {
    size,
    disabled
  });
};
