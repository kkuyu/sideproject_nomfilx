import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Helmet from "react-helmet";

import Loader from "Components/Loader";
import Message from "Components/Message";
import DetailInfo from "Components/DetailInfo";
import Section from "Components/Section";

const Container = styled.div`
	width: 100%;
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
				<DetailInfo title={result.name} overview={result.overview} posterPath={result.poster_path} />
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