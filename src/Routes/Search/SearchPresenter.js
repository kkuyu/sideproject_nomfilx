import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import Loader from "Components/Loader";
import Message from "Components/Message";
import Section from "Components/Section";

const Container = styled.div`
	padding: 0 20px;
`;

const Form = styled.form`
	margin-bottom: 50px;
	width: 100%;
`;

const Input = styled.input`
	all: unset;
	width: 100%;
	font-size: 28px;
`;

const SearchPresenter = ({ movieResults, tvResults, searchTerm, error, loading, handleSubmit, updateTerm }) => (
	<Container>
		<Form onSubmit={handleSubmit}>
			<Input type="text" placeholder="Search Movies or TV Shows..." value={searchTerm} onChange={updateTerm} />
		</Form>
		{loading ? <Loader /> : <>
			{ movieResults && movieResults.length > 0 && <Section title="Movie Result">{movieResults.map(movie => <span key={movie.id}>{movie.title}</span>)}</Section> }
			{ tvResults && tvResults.length > 0 && <Section title="TV Show Result">{tvResults.map(show => <span key={show.id}>{show.name}</span>)}</Section> }
			{ error && <Message text={error} color="#e74c3c" /> }
			{ movieResults && movieResults.length === 0 && tvResults && tvResults.length === 0 && <Message text="Nothing Found." color="#95a5a6" /> }
		</>}
	</Container>
);

SearchPresenter.propTypes = {
	movieResults: PropTypes.array,
	tvResults: PropTypes.array,
	searchTerm: PropTypes.string,
	error: PropTypes.string,
	loading: PropTypes.bool.isRequired,
	handleSubmit: PropTypes.func.isRequired,
	updateTerm: PropTypes.func.isRequired
};

export default SearchPresenter;