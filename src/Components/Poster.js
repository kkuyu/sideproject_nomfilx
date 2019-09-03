import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
`;
const ImageContainer = styled.span`
`;
const Image = styled.img`
`;
const Rating = styled.span``;
const Title = styled.strong``;
const Year = styled.span``;

const Poster = ({id, imageUrl, title, rating, year, isMovie=false}) => (
	<Link to={ isMovie ? `/movie/${id}` : `/show/${id}` }>
		<Container>
			<ImageContainer>
				<Image src={imageUrl} alt={title} />
				<Rating><span role="img" aria-label="rating">⭐</span> {rating}/10</Rating>
			</ImageContainer>
			<Title>{title}</Title>
			<Year>{year}</Year>
		</Container>
	</Link>
);

Poster.prototype = {
	id: PropTypes.number.isRequired,
	imageUrl: PropTypes.string,
	title: PropTypes.string,
	rating: PropTypes.number,
	year: PropTypes.string,
	isMovie: PropTypes.bool
};

export default Poster;