import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Helmet from "react-helmet";

import Loader from "Components/Loader";
import Message from "Components/Message";
import Poster from "Components/Poster";
import Section from "Components/Section";
import InputText from "Components/InputText";

const Container = styled.div`
	padding: 30px 20px;
`;
const Heading = styled.h2`
	font-size: 17px;
`;
const Form = styled.form`
	margin-top: 20px;
	margin-bottom: 30px;
	width: 100%;
`;
// const Input = styled.input`
// 	all: unset;
// 	width: 100%;
// 	font-size: 28px;
// `;
const ResultSection = styled.div`
	margin-top: 30px;
`;

const SearchPresenter = ({ movieResults, tvResults, searchTerm, searchResultTerm, error, loading, handleSubmit, updateTerm }) => <>
	<Helmet>
		<title>Search | {searchResultTerm} | Nomfilx</title>
	</Helmet>
	<Container>
		<Heading>Search</Heading>
		<Form onSubmit={handleSubmit}>
			<InputText placeholder="Search Movies or TV Shows..." value={searchTerm} onChange={updateTerm} fontSize="20px" />
		</Form>
		{loading ? <Loader /> : <>
				{ (movieResults && movieResults.length === 0 && tvResults && tvResults.length === 0)
					? <Message text={`No search results found for "${searchResultTerm}"`} color="#ddd" />
					: searchResultTerm !== "" && <Message text={`Search results for "${searchResultTerm}"`} color="#ddd" />
				}
				<ResultSection>
					{ movieResults && movieResults.length > 0 && <Section title="Movie Result">{movieResults.map(movie => 
						<Poster key={movie.id} linkTo={`/movie/${movie.id}`} imageUrl={movie.poster_path} title={movie.original_title} rating={movie.vote_average} year={movie.release_date && movie.release_date.substring(0,4)} />
					)}</Section> }
					{ tvResults && tvResults.length > 0 && <Section title="TV Show Result">{tvResults.map(show => 
						<Poster key={show.id} linkTo={`/show/${show.id}`} imageUrl={show.poster_path} title={show.original_name} rating={show.vote_average} year={show.first_air_date && show.first_air_date.substring(0,4)} />
					)}</Section> }
				</ResultSection>
				{ error && <Message text={error} color="#e74c3c" /> }
			</>
		}
	</Container>
</>;

SearchPresenter.propTypes = {
	movieResults: PropTypes.array,
	tvResults: PropTypes.array,
	searchTerm: PropTypes.string,
	searchResultTerm: PropTypes.string,
	error: PropTypes.string,
	loading: PropTypes.bool.isRequired,
	handleSubmit: PropTypes.func.isRequired,
	updateTerm: PropTypes.func.isRequired
};

export default SearchPresenter;