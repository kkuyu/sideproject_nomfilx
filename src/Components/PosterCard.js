import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
	display: flex;
	padding: 16px;
	background: #121317;
    border-radius: 8px;
`;
const ImageContainer = styled.div`
	width: 30%;
`;
const Image = styled.img`
	border-radius: 5px;
`;
const TextContainer = styled.div`
	width: 70%;
	padding-left: 20px;
`;
const Title = styled.strong`
	font-size: 15px;
`;
const Overview = styled.p`
	margin-top: 10px;
	color: #ddd;
`;

const PosterCard = ({ imageUrl, title, releaseDate, overview }) => (
	<Container>
		<ImageContainer>
			<Image src={imageUrl ? `https://image.tmdb.org/t/p/w500/${imageUrl}` : require("../assets/noPoster.png")} alt={title} />
		</ImageContainer>
		<TextContainer>
			<Title>{title}({releaseDate.substring(0,4)})</Title>
			<Overview>{overview}</Overview>
		</TextContainer>
	</Container>
);

PosterCard.prototypes = {
	imageUrl: PropTypes.string,
	title: PropTypes.string,
	releaseDate: PropTypes.string,
	overview: PropTypes.string
};

export default PosterCard;