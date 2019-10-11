import React from "react";
import styled from "styled-components";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner as faSpinner } from '@fortawesome/free-solid-svg-icons';

const Container = styled.div`
	position: fixed;
    top: 0;
    left: 0;
	display: flex;
	width: 100%;
	height: 100vh;
    flex-direction: column;
	align-items: center;
	justify-content: center;
	z-index: 999;
	background: rgba(0,0,0,0.7);
	.faSpinner {
		font-size: 32px;
	}
`;
const Text = styled.span`
	margin-top: 12px;
`;

export default () => <Container>
	<FontAwesomeIcon icon={ faSpinner } className="faSpinner" pulse />
	<Text>Loading</Text>
</Container>;