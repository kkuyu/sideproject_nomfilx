import React from "react";
import styled from "styled-components";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar as faStarSolid, faStarHalfAlt as faStarHalf } from '@fortawesome/free-solid-svg-icons';
import { faStar as faStarRegular } from '@fortawesome/free-regular-svg-icons';

const Container = styled.div``;
const Star = styled.span`
	.faStarSolid, .faStarHalf {
		color: #ffd700;
	}
`;
const Rating = styled.strong`
	padding-left: 5px;
	font-size: 16px;
`;

export default ({ voteAverage }) => <Container>
	<Star aria-label={`Star Rating ${ voteAverage }/10`}>
		{ Array(parseInt(voteAverage/2)).fill(null).map((i,index) => <FontAwesomeIcon key={index} icon={ faStarSolid } className="faStarSolid" /> ) }
		{ Array(parseInt(voteAverage%2)).fill(null).map((i,index) => <FontAwesomeIcon key={index} icon={ faStarHalf } className="faStarHalf" /> ) }
		{ Array(5 - Math.round(voteAverage/2)).fill(null).map((i,index) => <FontAwesomeIcon key={index} icon={ faStarRegular } className="faStarRegular" /> ) }
	</Star>
	<Rating aria-hidden="true">{voteAverage}</Rating>
</Container>