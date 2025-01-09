"use client";

import newStyled from "@emotion/styled";

export const PostsList = newStyled.ul`
  background-color: grey;
`;

export const PostsListItem = newStyled.li`
  ${(props) => (props.isFive ? "font-size: 40px;" : "")}

  background-color: yellow;

  > a {
    color: red;
  }
`;
