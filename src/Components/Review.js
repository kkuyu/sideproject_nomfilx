import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Container = styled.div`
`;
const Author = styled.strong`
	font-size: 15px;
`;
const Content = styled.p`
	margin-top: 10px;
	color: #ddd;
`;

const Review = ({ index, author, content }) => (
	<Container>
		<Author>{index+1}. {author}</Author>
		{content && <Content>{content.length <= 300 ? content : `${content.substring(0,300)}...`}</Content>}
		{!content && <Content>No comment registered.</Content>}
	</Container>
);

Review.prototypes = {
	index: PropTypes.number,
	author: PropTypes.string,
	content: PropTypes.string
};

export default Review;