import React from 'react';
import styled from 'styled-components';

const BtnAddElement = styled.a`
	display: inline-block;
	padding: 10px;
	:hover {
		border-radius: 50%;
		background-color: rgba(0, 0, 0, 0.08);
	}
	transform: rotate(${(props) => (props.active ? '45' : 0)}deg);
`;

export default function BtnAdd(props) {
	return (
		<BtnAddElement active={props.isAdding} onClick={() => props.setIsAdding()}>
			<i className="fa fa-plus" aria-hidden="true" />
		</BtnAddElement>
	);
}
