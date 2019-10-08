import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import StarRating from "./StarRating";

const Container = styled.header`
	position: relative;
	padding: 55px;
	display: flex;
	min-height: 400px;
	align-items: center;
    justify-content: space-between;
`;
const Backdrop = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-image: url(${props => props.bgImage});
	background-position: center center;
	background-size: cover;
	opacity: 0.2;
	z-index: -1;
	&:before {
		content:"";
		position: absolute;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 210px;
		background: linear-gradient(to bottom, transparent, #1b1c20);
	}
`;
const Cover = styled.img`
	margin-left: 35px;
	width: 190px;
	border-radius: 5px;
`;
const InfoData = styled.div`
	max-width: 610px;
`;
const Title = styled.h2`
	font-size: 42px;
	font-weight: bold;
	* + & {
		margin-top: 14px;
	}
`;
const ItemContainer = styled.div`
	margin-top: 25px;
`;
const Item = styled.span`
	color: #ddd;
	& + &:before {
		content: "";
		margin: 0 10px;
		display: inline-block;
		width: 2px;
		height: 2px;
		background: #fff;
		vertical-align: super;
	}
`;
const Genre = styled.em`
	& + &:before {
		content: "/";
		margin: 0 5px;
	}
`;
const Overview = styled.div`
	margin-top: 22px;
	line-height: 1.8;
`;
const Tagline = styled.strong`
	display: block;
	font-size: 15px;
`;
const Synopsis = styled.p`
	color: #ddd;
`;
const HyperlinkContainer = styled.div`
	margin-top: 30px;
`;
const Hyperlink = styled.a`
	position: relative;
	display: inline-block;
	padding: 8px 22px;
	color: #ddd;
	border: 1px solid #ddd;
	border-radius: 8px;
	overflow: hidden;
	transition: border-color 0.2s;
	& + & {
		margin-left: 10px;
	}
	&:before {
		content: "";
		position: absolute;
		top: 0;
		left: 0;
		width: 0;
		height: 100%;
		background: #ea0037;
		z-index: -1;
		transition: width 0.2s;
	}
	&:hover,
	&:focus {
		border-color: #ea0037;
		&:before {
			width: 100%;
		}
	}
`;

const DetailInfo = ({ voteAverage, title, releaseDate, runtime, genres, tagline, overview, imdbId, homepageUrl, imageUrl, backdropUrl }) => (
	<Container>
		<InfoData>
			{voteAverage && <StarRating voteAverage={voteAverage} />}
			<Title>{title}</Title>
			
			{(releaseDate || runtime || genres) && <ItemContainer>
				{releaseDate && <Item>{releaseDate.substring(0,4)}</Item>}
				{runtime && <Item>{runtime} min</Item>}
				{genres && genres.length > 0 && <Item>{genres.map((genre, index) => <Genre key={index}>{genre.name}</Genre>)}</Item>}
			</ItemContainer>}

			{<Overview>
				{tagline && <Tagline>&ldquo; {tagline} &rdquo;</Tagline>}
				<Synopsis>{overview.length > 0 ? overview : "No synopsis registered."}</Synopsis>
			</Overview>}

			{(imdbId || homepageUrl) && <HyperlinkContainer>
				{imdbId && <Hyperlink href={`https://www.imdb.com/title/${imdbId}`} target="_blank" rel="noopener noreferrer" title={`Hyperlink to ${title} IMDb`}>IMDb</Hyperlink>}
				{homepageUrl && <Hyperlink href={homepageUrl} target="_blank" rel="noopener noreferrer" title={`Hyperlink to ${title} homepage`}>Homepage</Hyperlink>}
			</HyperlinkContainer>}
		</InfoData>
		<Cover src={imageUrl ? `https://image.tmdb.org/t/p/w500/${imageUrl}` : require("../assets/noPoster.png")} alt="" />
		{backdropUrl && <Backdrop bgImage={`https://image.tmdb.org/t/p/original/${backdropUrl}`} />}
	</Container>
);

DetailInfo.prototypes = {
	voteAverage: PropTypes.number,
	title: PropTypes.string,
	releaseDate: PropTypes.string,
	runtime: PropTypes.number,
	genres: PropTypes.array,
	tagline: PropTypes.string,
	overview: PropTypes.string,
	imdbId: PropTypes.string,
	homepageUrl: PropTypes.string,
	imageUrl: PropTypes.string,
	backdropUrl: PropTypes.string
};

export default DetailInfo;