import styled, { css } from "styled-components";

export const Button = styled.button<{ $primary?: boolean }>`
    background: transparent;
    border-radius: 3px;
    border: 2px solid grey;
    color: grey;
    margin: 0 1em;
    padding: 10px 50px;
    cursor: pointer;

    ${(props) =>
        props.$primary &&
        css`
            background: #2d5299;
            border: 2px solid #2d5299;
            color: white;
        `}
`;
