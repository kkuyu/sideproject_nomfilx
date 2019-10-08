import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Helmet from "react-helmet";

import Loader from "Components/Loader";
import Message from "Components/Message";
import DetailInfo from "Components/DetailInfo";
import Section from "Components/Section";
import PosterCard from "Components/PosterCard";

const Container = styled.div`
	width: 100%;
`;
const Content = styled.article`
	padding: 30px 55px;
`;

const SeasonPresenter = ({ result, error, loading }) => (
	loading ? <>
		<Helmet>
			<title>Loading | Nomfilx</title>
		</Helmet>
		<Loader />
	</> : <>
		{ error ? <Container><Message text={error} color="#e74c3c" /></Container> : <>
			<Helmet>
				<title>{result.name} | Nomfilx</title>
			</Helmet>
			<Container>
				<DetailInfo title={result.name} overview={result.overview} releaseDate={result.air_date} imageUrl={result.poster_path} />
				<Content>
					{result.episodes && result.episodes.length > 0 && <Section title="Episodes" columnWidth="450px">
						{result.episodes.map(episode => <PosterCard key={episode.id} imageUrl={episode.still_path} title={episode.name} overview={episode.overview} releaseDate={episode.air_date} />)}
					</Section>}
				</Content>
			</Container>
		</> }
	</>
)

SeasonPresenter.propTypes = {
	result: PropTypes.object,
	error: PropTypes.string,
	loading: PropTypes.bool.isRequired
};

export default SeasonPresenter;