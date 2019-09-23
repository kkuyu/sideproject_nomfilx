import React from "react";
import styled from "styled-components";

const Container = styled.div`
	display: flex;
	width: 100%;
	padding-top: 20px;
	justify-content: center;
	font-size: 28px;
`;

export default () => <Container><span role="img" aria-label="Loading">⏰</span></Container>;