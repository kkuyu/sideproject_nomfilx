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
    transition: opacity 0.1s;
`;
const ImageContainer = styled.span`
	position: relative;
	display: block;
	font-size: 12px;
	overflow: hidden;
	border: 2px solid transparent;
	border-radius: 4px;
	transition: border-color 0.1s;
	&:before {
		content: "";
		display: block;
		width: 100%;
		height: 0;
		padding-bottom: 150%;
		z-index: -1;
	}
`;
const TextContainer = styled.div`
	position: relative;
	margin-top: 5px;
`;
const Title = styled.strong`
	display: block;
`;
const Rating = styled.em`
	float: right;
	.faStarSolid {
		color: #ffd700;
	}
`;
const Year = styled.span`
	display: inline-block;
`;
const Desc = styled.div`
	margin-top: 5px;
	font-size: 12px;
	color: #bbb;
`;
const SLink = styled(Link)`
	&:focus, &:hover {
		${ImageContainer} {
			border-color: red;
		}
		${Image} {
			opacity: 0.6;
		}
	}

`;

const Poster = ({linkTo, imageUrl, title, rating=0, year}) => (
	<SLink to={linkTo}>
		<Container>
			<ImageContainer>
				<Image src={imageUrl ? `https://image.tmdb.org/t/p/w500/${imageUrl}` : require("../assets/noPoster.png")} alt={title} />
			</ImageContainer>
			<TextContainer>
				<Title>{title.length > 15 ? `${title.substring(0,20)}...` : title}</Title>
				{ year && <Desc>
					<Year>{year}</Year>
					{ rating !== 0 && <Rating><FontAwesomeIcon icon={ faStarSolid } className="faStarSolid" aria-label="Star Rating" /> {rating}/10</Rating> }
				</Desc>}
			</TextContainer>
		</Container>
	</SLink>
);

Poster.prototypes = {
	linkTo: PropTypes.number.isRequired,
	imageUrl: PropTypes.string,
	title: PropTypes.string,
	rating: PropTypes.number,
	year: PropTypes.string
};

export default Poster;