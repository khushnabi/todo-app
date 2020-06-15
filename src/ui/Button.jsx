import React from "react";
import theme from "../theme";
import Spinner from "./Spinner";
import styled from "styled-components";
const ButtonElement = styled.button`
    background-color: ${(props) => theme.colors.primary};
    color: #fff;
    outline: none;
    border: none;
    padding: 8px 10px;
    border-radius: 1px;
    border-radius: 4px;
    margin: 2px 3px;
`;

export default function Button(props) {
    return (
        <ButtonElement
            style={props.type}
            color={props.type}
            style={props.style}
        >
            {props.children}
            {props.isLoading && <Spinner style={{ marginLeft: 4 }} />}
        </ButtonElement>
    );
}

Button.defaultProps = {
    color: "primary",
};
