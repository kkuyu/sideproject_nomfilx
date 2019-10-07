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

const CollectionPresenter = ({ result, error, loading }) => (
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
				{console.log(result.parts[0])}
				<DetailInfo title={result.name} overview={result.overview} imageUrl={result.poster_path} />
				<Content>
					{result.parts && result.parts.length > 0 && <Section title="Part" columnWidth="375px">
						{result.parts.map(part => <PosterCard key={part.id} imageUrl={part.poster_path} title={part.title} overview={part.overview} releaseDate={part.release_date} />)}
					</Section>}
				</Content>
			</Container>
		</> }
	</>
)

CollectionPresenter.propTypes = {
	result: PropTypes.object,
	error: PropTypes.string,
	loading: PropTypes.bool.isRequired
};

export default CollectionPresenter;