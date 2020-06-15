import React from 'react';
import theme from '../theme';
import Spinner from './Spinner';
import styled from 'styled-components';
export const ButtonElement = styled.button`
	background: ${(props) => theme.colors[props.color]};
	color: #fff;
	outline: none;
	border: none;
	padding: 4px 10px;
	border-radius: 1px;
`;

export default function Button(props) {
	return (
		<ButtonElement tyle={props.type} color={props.type} style={props.style}>
			{props.children} {props.isLoading && <Spinner />}
		</ButtonElement>
	);
}
