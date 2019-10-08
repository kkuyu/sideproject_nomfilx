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
	width: 40%;
`;
const Image = styled.img`
	border-radius: 5px;
`;
const TextContainer = styled.div`
	width: 60%;
	padding-left: 18px;
`;
const Title = styled.strong`
	font-size: 15px;
`;
const Overview = styled.p`
	margin-top: 10px;
	color: #bcbcbc;
`;

const PosterCard = ({ imageUrl, title, releaseDate, overview }) => (
	<Container>
		<ImageContainer>
			<Image src={imageUrl ? `https://image.tmdb.org/t/p/w500/${imageUrl}` : require("../assets/noStillcut.png")} alt={title} />
		</ImageContainer>
		<TextContainer>
			<Title>{title} {releaseDate && `(${releaseDate.substring(0,4)})`}</Title>
			<Overview>{overview ? overview : "No synopsis registered."}</Overview>
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