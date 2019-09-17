import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Helmet from "react-helmet";

import Loader from "Components/Loader";
import Message from "Components/Message";
import Poster from "Components/Poster";
import Section from "Components/Section";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar as faStarSolid, faStarHalfAlt as faStarHalf } from '@fortawesome/free-solid-svg-icons';
import { faStar as faStarRegular } from '@fortawesome/free-regular-svg-icons';

const Container = styled.div`
	width: 100%;
`;
const Info = styled.header`
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
	width: 610px;
`;
const Title = styled.h2`
	font-size: 42px;
	font-weight: bold;
	* + & {
		margin-top: 14px;
	}
`;
const StarContainer = styled.div``;
const Star = styled.span`
	.faStarSolid, .faStarHalf {
		color: #ffd700;
	}
`;
const Rating = styled.strong`
	padding-left: 5px;
	font-size: 16px;
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
const LinkContainer = styled.div`
	margin-top: 30px;
`;
const Link = styled.a`
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
	&:hover, &:focus {
		border-color: #ea0037;
		&:before {
			width: 100%;
		}
	}
`;
const Content = styled.article`
	padding: 55px;
`;

const HomePresenter = ({ result, error, loading, isMovie }) => (
	loading ? <>
		<Helmet>
			<title>Loading | Nomfilx</title>
		</Helmet>
		<Loader />
	</> : <>
		{ error ? <Container><Message text={error} color="#e74c3c" /></Container> : <>
			<Helmet>
				<title>{isMovie ? result.original_title : result.original_name} | Nomfilx</title>
			</Helmet>
			<Container>
				<Info>
					<Backdrop bgImage={`https://image.tmdb.org/t/p/original/${result.backdrop_path}`} />
					<InfoData>
						<StarContainer>
							<Star>
								{ Array(parseInt(result.vote_average/2)).fill(null).map((i,index) => <FontAwesomeIcon key={index} icon={ faStarSolid } className="faStarSolid" /> ) }
								{ Array(parseInt(result.vote_average%2)).fill(null).map((i,index) => <FontAwesomeIcon key={index} icon={ faStarHalf } className="faStarHalf" /> ) }
								{ Array(5 - Math.round(result.vote_average/2)).fill(null).map((i,index) => <FontAwesomeIcon key={index} icon={ faStarRegular } className="faStarRegular" /> ) }
							</Star>
							<Rating>{result.vote_average}</Rating>
						</StarContainer>
						<Title>{isMovie ? result.original_title : result.original_name}</Title>
						<ItemContainer>
							<Item>{isMovie ? result.release_date.substring(0,4) : result.first_air_date.substring(0,4)}</Item>
							{isMovie ?
								result.runtime && <Item>{result.runtime}min</Item>
								: result.episode_run_time.length && <Item>{result.episode_run_time[0]}min</Item>
							}
							{result.genres && <Item>{result.genres.map((genre, index) => <Genre key={index}>{genre.name}</Genre>)}</Item>}
						</ItemContainer>
						<Overview>
							{result.tagline && <Tagline>&ldquo; {result.tagline} &rdquo;</Tagline>}
							<Synopsis>{result.overview ? result.overview : "No synopsis registered"}</Synopsis>
						</Overview>
						<LinkContainer>
							{result.imdb_id && <Link href={`https://www.imdb.com/title/${result.imdb_id}`} target="_blank" rel="noopener noreferrer" title={`Link to ${result.homepage} IMDb`}>IMDb</Link>}
							{result.homepage && <Link href={result.homepage} target="_blank" rel="noopener noreferrer" title={`Link to ${result.homepage} homepage`}>Homepage</Link>}
						</LinkContainer>
					</InfoData>
					<Cover src={result.poster_path ? `https://image.tmdb.org/t/p/w500/${result.poster_path}` : require("../../assets/noPoster.png")} alt="" />
				</Info>
				<Content>
					{/* Collection */}
					{/* Youtube Video */}
					{/* Production Company & Countries */}
				</Content>
			</Container>
		</> }
	</>
)

HomePresenter.propTypes = {
	result: PropTypes.object,
	error: PropTypes.string,
	loading: PropTypes.bool.isRequired,
	isMovie: PropTypes.bool.isRequired
};

export default HomePresenter;