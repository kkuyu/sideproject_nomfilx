import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Helmet from "react-helmet";

import Loader from "Components/Loader";
import Message from "Components/Message";
import DetailInfo from "Components/DetailInfo";
import Poster from "Components/Poster";
import Section from "Components/Section";
import Tab from "Components/Tab";

import ModalPortal from "Components/ModalPortal";
import Modal from "Components/Modal";

import VideoThumbnail from "Components/VideoThumbnail";
import VideoPlayer from "Components/VideoPlayer";

const Container = styled.div`
	width: 100%;
`;
const Content = styled.article`
	padding: 30px 55px;
`;

const DetailPresenter = ({ modalRef, videoArray, result, error, loading, isMovie, isModalOpen, modalContentType, currentVideoKey, handleModalOpen, handleModalClose, handleOnClick, handleKeyDown }) => (
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
				<DetailInfo
					voteAverage={result.vote_average} title={isMovie ? result.original_title : result.original_name} releaseDate={isMovie ? result.release_date : result.first_air_date}
					runtime={isMovie ? result.runtime : result.episode_run_time[0]} genres={result.genres} tagline={result.tagline} overview={result.overview}
					imdbId={result.imdb_id} homepageUrl={result.homepage} imageUrl={result.poster_path} backdropUrl={result.backdrop_path}
				/>
				<Content>

					{ isMovie && result.belongs_to_collection && <Section title="Collection">
						<Poster linkTo={`/movie/${result.id}/collection/${result.belongs_to_collection.id}`} imageUrl={result.belongs_to_collection.poster_path} title={result.belongs_to_collection.name} />
					</Section>}

					{ !isMovie && result.seasons && result.seasons.length > 0 && <Section title="Seasons">
						{ result.seasons.map(season => <Poster key={season.id} linkTo={`/show/${result.id}/season/${season.season_number}`} imageUrl={season.poster_path} title={season.name} />) }
					</Section>}

					{ isMovie && ( result.production_companies || result.production_countries ) && <Section title="Production" columnWidth="100%" columnGap="0">
						<Tab title="Production List" items={[
							{ name: "Companies", content: (result.production_companies) ? result.production_companies.map(companies => companies.name) : "No Company information registered." },
							{ name: "Countries", content: (result.production_countries) ? result.production_countries.map(countries => countries.iso_3166_1) : "No Countries information registered." }
						]} />
					</Section>}

					{ !isMovie && ( result.production_companies ) && <Section title="Production" columnWidth="100%" columnGap="0">
						<Tab title="Production List" items={[
							{ name: "Companies", content: (result.production_companies) ? result.production_companies.map(companies => companies.name) : "No Company information registered." },
							{ name: "Countries", content: (result.production_companies) ? Array.from(new Set(result.production_companies.map(companies => companies.origin_country))) : "No Countries information registered." }
						]} />
					</Section>}

					{result.videos.results.length > 0 && <Section title="YouTube Video" columnWidth="300px" columnGap="25px">
						{result.videos.results.map((video,index) => 
							video.site === "YouTube" && <VideoThumbnail key={index} handleModalOpen={handleModalOpen} videoArray={videoArray} index={index} type={video.type} videoKey={video.key} />
						)}
					</Section>}

				</Content>
			</Container>

			{ isModalOpen && <ModalPortal>
				<Modal modalRef={modalRef} handleModalClose={handleModalClose} handleOnClick={handleOnClick} handleKeyDown={handleKeyDown}>
					{ modalContentType === "video" && currentVideoKey && <VideoPlayer currentVideoInfo={ result.videos.results.find(video => video.key === currentVideoKey) } /> }
				</Modal>
			</ModalPortal>}

		</> }
	</>
)

DetailPresenter.propTypes = {
	modalRef: PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
	videoArray: PropTypes.array,
	result: PropTypes.object,
	error: PropTypes.string,
	loading: PropTypes.bool.isRequired,
	isMovie: PropTypes.bool.isRequired,
	isModalOpen: PropTypes.bool,
	modalContentType: PropTypes.string,
	currentVideoKey: PropTypes.string,
	handleModalOpen: PropTypes.func,
	handleModalClose: PropTypes.func,
	handleOnClick: PropTypes.func,
	handleKeyDown: PropTypes.func
};

export default DetailPresenter;