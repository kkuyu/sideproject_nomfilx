import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import styled from "styled-components";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar as faStarSolid } from '@fortawesome/free-solid-svg-icons';

const Container = styled.div`
`;
const Image = styled.img`
	position: absolute;
	top: 50%;
	left: 0;
	width: 100%;
	transform: translateY(-50%);
    transition: opacity 0.1s ease-in;
`;
const Rating = styled.em`
	position: absolute;
	bottom: 5px;
	left: 5px;
	opacity: 0;
	transition: opacity 0.1s ease-in 0.05s;
	.faStarSolid {
		color: #ffd700;
	}
`;
const ImageContainer = styled.span`
	position: relative;
	display: block;
	font-size: 12px;
	overflow: hidden;
	border-radius: 4px;
	&:hover,
	&:focus {
		${Image} {
			opacity: 0.5;
		}
		${Rating} {
			opacity: 0.9;
		}
	}
	&:before {
		content: "";
		display: block;
		width: 100%;
		height: 0;
		padding-bottom: 150%;
		z-index: -1;
	}
`;
const Title = styled.strong`
	display: block;
`;
const Year = styled.span`
	display: inline-block;
	margin-top: 5px;
	font-size: 12px;
	color: #bbb;
`;
const TextContainer = styled.div`
	margin-top: 5px;
`;

const Poster = ({id, imageUrl, title, rating, year, isMovie=false}) => (
	<Link to={ isMovie ? `/movie/${id}` : `/show/${id}` }>
		<Container>
			<ImageContainer>
				<Image src={imageUrl ? `https://image.tmdb.org/t/p/w500/${imageUrl}` : require("../assets/noPoster.png")} alt={title} />
				<Rating><FontAwesomeIcon icon={ faStarSolid } className="faStarSolid" /> {rating}/10</Rating>
			</ImageContainer>
			<TextContainer>
				<Title>{title.length > 15 ? `${title.substring(0,20)}...` : title}</Title>
				<Year>{year}</Year>
			</TextContainer>
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