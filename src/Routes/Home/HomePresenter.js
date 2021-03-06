import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Helmet from "react-helmet";

import Loader from "Components/Loader";
import Message from "Components/Message";
import Poster from "Components/Poster";
import Section from "Components/Section";

const Container = styled.div`
	padding: 30px 30px;
`;
const Heading = styled.h2``;

const HomePresenter = ({ nowPlaying, upcoming, popular, error, loading }) => <>
	<Helmet>
		<title>Movie | Nomfilx</title>
	</Helmet>
	{ loading ? <Loader /> : (
		<Container>
			<Heading className="hidden">Movie List</Heading>
			{ nowPlaying && nowPlaying.length > 0 && <Section title="Now Playing">{nowPlaying.map(movie =>
				<Poster key={movie.id} linkTo={`/movie/${movie.id}`} imageUrl={movie.poster_path} title={movie.original_title} rating={movie.vote_average} year={movie.release_date && movie.release_date.substring(0,4)} />
			)}</Section> }
			{ upcoming && upcoming.length > 0 && <Section title="Upcoming Movies">{upcoming.map(movie =>
				<Poster key={movie.id} linkTo={`/movie/${movie.id}`} imageUrl={movie.poster_path} title={movie.original_title} rating={movie.vote_average} year={movie.release_date && movie.release_date.substring(0,4)} />
			)}</Section> }
			{ popular && popular.length > 0 && <Section title="Popular Movies">{popular.map(movie =>
				<Poster key={movie.id} linkTo={`/movie/${movie.id}`} imageUrl={movie.poster_path} title={movie.original_title} rating={movie.vote_average} year={movie.release_date && movie.release_date.substring(0,4)} />
			)}</Section> }
			{ error && <Message text={error} color="#e74c3c" /> }
		</Container>
	) }
</>

HomePresenter.propTypes = {
	nowPlaying: PropTypes.array,
	upcoming: PropTypes.array,
	popular: PropTypes.array,
	error: PropTypes.string,
	loading: PropTypes.bool.isRequired
};

export default HomePresenter;