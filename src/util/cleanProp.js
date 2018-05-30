import React from "react";

const cleanProp = (blackList = []) => Comp => props => {
  const filterProps = {};
  Object.keys(props).forEach(key => {
    if (!blackList.includes(key)) {
      filterProps[key] = props[key];
    }
  });
  return <Comp {...filterProps} />;
};

export default cleanProp;
