import styled, { css } from "styled-components";

export const StyledForm = styled.form<{ $primary?: boolean }>`
    width: 80%;
    align-self: center;
    display: flex;
    flex-direction: column;
    align-items: left;

    ${(props) => props.$primary && css``}
`;

export const SubSection = styled.div`
    display: flex;
    flex-direction: column;
    margin: 20px 0;
`;

interface InputProps {
    error: boolean;
}

export const StyledInput = styled.input(({ error }: InputProps) => [
    `
    border: 2px solid grey;
    border-radius: 5px;
    padding: 7px 12px;
    font-size: 1.2rem;
    max-width: 300px;
    cursor: text;
`,
    error && `border: 2px solid red;`,
]);

export const StyledLabel = styled.label`
    font-size: 12px;
    font-weight: bold;
`;

export const Small = styled.small`
    font-size: 10px;
    color: grey;
`;

export const StyledRadio = styled.input(({ error }: InputProps) => [
    `
    border: 2px solid grey;
    border-radius: 5px;
    padding: 7px 12px;
    font-size: 1.2rem;
    max-width: 300px;
    cursor: pointer;
    width: 20px;
`,
    error && `border: 2px solid red;`,
]);

export const RadioHolder = styled.div`
    display: flex;
    gap: 10px;
    padding: 5px;
`;

export const RadioLabel = styled.label`
    font-size: 14px;
`;

export const ErrorP = styled.p`
    color: red;
`;
