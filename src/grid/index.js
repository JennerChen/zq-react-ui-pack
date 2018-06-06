import styled from "styled-components";
import flex from "./flex";
import item from "./item";

export { default as flex } from "./flex";
export { default as item } from "./item";

export const Flex = styled.div`
  ${props => flex({ ...props })};
`;

export const Item = styled.div`
  ${props => item({ ...props })};
`;
