import { css } from "styled-components";

export const mobile = (props) => {
  return css`
    @media only screen and (max-width: 380px) {
      ${props}
    }
  `;
};

export const minitablet = (props) => {
  return css`
  @media only screen and (max-width: 540px) {
    ${props}
  }
`;
}

export const tablet = (props) => {
  return css`
  @media only screen and (max-width: 860px) {
    ${props}
  }
`;
}

export const largeTablet = (props) => {
  return css`
  @media only screen and (max-width: 1020px) {
    ${props}
  }
`;
}
export const smallTablet = (props) => {
  return css`
  @media only screen and (max-width: 594px) {
    ${props}
  }
`;
}
