import React from 'react';
import styled from 'styled-components';

const BtnAdd = styled.a`
	--size: 30px;
	display: inline-block;
	height: var(--size);
	width: var(--size);
	line-height: var(--size);
	text-align: center;
	:hover {
		background-color: rgba(0, 0, 0, 0.3);
	}
	border-radius: 50%;
	transform: rotate(${(props) => (props.active ? '45' : 0)}deg);
	transition: transform 0.3s;
`;

export default function BtnAdd(props) {
	return (
		<BtnAddElement active={props.isAdding} onClick={() => props.setIsAdding()}>
			<i className="fa fa-plus" aria-hidden="true" />
		</BtnAddElement>
	);
}
