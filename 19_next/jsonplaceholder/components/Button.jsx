"use client";

import newStyled from "@emotion/styled";

const Button = newStyled.button`
  ${({ size = "md" }) => {
    if (size === "sm") {
      return `
        font-size: 14px;
        padding: 0.5rem 1rem;
      `;
    } else if (size === "md") {
      return `
        font-size: 16px;
        padding: 1rem 2rem;
      `;
    } else {
      return `
        font-size: 18px;
        padding: 2rem 4rem;
      `;
    }
  }}


  ${({ intent = "primary" }) => {
    if (intent === "primary") {
      return `
        background-color: blue;
      `;
    } else if (intent === "secondary") {
      return `
        background-color: grey;
      `;
    } else {
      return `
        background-color: red;
      `;
    }
  }}
`;

export default Button;
