import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Helmet from "react-helmet";

import Loader from "Components/Loader";
import Message from "Components/Message";
import Poster from "Components/Poster";
import Section from "Components/Section";

const Container = styled.div`
	position: relative;
	width: 100%;
	height: calc( 100vh - 50px );
	padding: 50px;
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
	filter: blur(3px);
	opacity: 0.5;
	z-index: -1;
`;
const Content = styled.div`
	display: flex;
`;
const Cover = styled.img`
	width: 30%;
	border-radius: 5px;
`;
const Data = styled.div`
	margin-left: 10px;
	width: 70%;
`;
const Title = styled.h3`
	font-size: 32px;
`;
const ItemContainer = styled.div`
	margin-top: 15px;
`;
const Item = styled.span`
	& + &:before {
		content: "";
		margin: 0 10px;
		display: inline-block;
		width: 2px;
		height: 2px;
		background: #fff;
		vertical-align: super;
	}
	a {
		text-decoration: underline;
	}
`;
const Genre = styled.em`
	& + &:before {
		content: "/";
		margin: 0 5px;
	}
`;
const Overview = styled.p`
	margin-top: 30px;
	line-height: 1.5;
`;

const HomePresenter = ({ result, error, loading, isMovie }) => (
	loading ? <>
		<Helmet>
			<title>Loading | Nomfilx</title>
		</Helmet>
		<Loader />
	</> : <>
		{ error ? <Container><Message text={error} /></Container> : <>
			<Helmet>
				<title>{isMovie ? result.original_title : result.original_name} | Nomfilx</title>
			</Helmet>
			<Container>
				<Backdrop bgImage={`https://image.tmdb.org/t/p/original/${result.backdrop_path}`} />
				<Content>
					<Cover src={result.poster_path ? `https://image.tmdb.org/t/p/w500/${result.poster_path}` : require("../../assets/noPoster.png")} alt="" />
					<Data>
						<Title>{result.original_title ? result.original_title : result.original_name}</Title>
						<ItemContainer>
							<Item>{isMovie ? result.release_date.substring(0,4) : result.first_air_date.substring(0,4)}</Item>
							{isMovie ?
								result.runtime && <Item>{result.runtime}min</Item>
								: result.episode_run_time.length && <Item>{result.episode_run_time[0]}min</Item>
							}
							{result.vote_average && <Item><span role="img" aria-label="rating">⭐</span> {result.vote_average} / 10</Item>}
							{result.genres && <Item>{result.genres.map((genre, index) => <Genre key={index}>{genre.name}</Genre>)}</Item>}
							{result.imdb_id && <Item><a href={`https://www.imdb.com/title/${result.imdb_id}`} target="_blank" rel="noopener noreferrer" title={`Link to ${result.homepage} IMDb`}>IMDb</a></Item>}
							{result.homepage && <Item><a href={result.homepage} target="_blank" rel="noopener noreferrer" title={`Link to ${result.homepage} homepage`}>Homepage</a></Item>}
						</ItemContainer>
						<Overview>{result.overview}</Overview>
						{/* Collection */}
						{/* Youtube Video */}
						{/* Production Company & Countries */}
					</Data>
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