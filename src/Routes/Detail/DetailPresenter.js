import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Helmet from "react-helmet";

import Loader from "Components/Loader";
import Message from "Components/Message";
import Section from "Components/Section";
import Tab from "Components/Tab";

import ModalPortal from "Components/ModalPortal";
import Modal from "Components/Modal";

import VideoThumbnail from "Components/VideoThumbnail";
import VideoPlayer from "Components/VideoPlayer";

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
				<Info>
					<InfoData>
						<StarContainer>
							<Star aria-label={`Star Rating ${ result.vote_average }/10`}>
								{ Array(parseInt(result.vote_average/2)).fill(null).map((i,index) => <FontAwesomeIcon key={index} icon={ faStarSolid } className="faStarSolid" /> ) }
								{ Array(parseInt(result.vote_average%2)).fill(null).map((i,index) => <FontAwesomeIcon key={index} icon={ faStarHalf } className="faStarHalf" /> ) }
								{ Array(5 - Math.round(result.vote_average/2)).fill(null).map((i,index) => <FontAwesomeIcon key={index} icon={ faStarRegular } className="faStarRegular" /> ) }
							</Star>
							<Rating aria-hidden="true">{result.vote_average}</Rating>
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
						<HyperlinkContainer>
							{result.imdb_id && <Hyperlink href={`https://www.imdb.com/title/${result.imdb_id}`} target="_blank" rel="noopener noreferrer" title={`Hyperlink to ${result.homepage} IMDb`}>IMDb</Hyperlink>}
							{result.homepage && <Hyperlink href={result.homepage} target="_blank" rel="noopener noreferrer" title={`Hyperlink to ${result.homepage} homepage`}>Homepage</Hyperlink>}
						</HyperlinkContainer>
					</InfoData>
					<Cover src={result.poster_path ? `https://image.tmdb.org/t/p/w500/${result.poster_path}` : require("../../assets/noPoster.png")} alt="" />
					<Backdrop bgImage={`https://image.tmdb.org/t/p/original/${result.backdrop_path}`} />
				</Info>
				<Content>
					{/* Collection */}

					{ isMovie && ( result.production_companies || result.production_countries ) && <Section title="Production" columnWidth="100%" columnGap="0">
						<Tab title="Production List" items={[
							{ name: "Countries", content: (result.production_countries) ? result.production_countries.map(countries => countries.name) : "No Countries information registered." },
							{ name: "Companies", content: (result.production_companies) ? result.production_companies.map(companies => companies.name) : "No Company information registered." }
						]} />
					</Section>}

					{console.log(new Set(result.production_companies.map(companies => companies.origin_country)))}

					{ !isMovie && ( result.production_companies ) && <Section title="Production" columnWidth="100%" columnGap="0">
						<Tab title="Production List" items={[
							{ name: "Countries", content: (result.production_companies) ? Array.from(new Set(result.production_companies.map(companies => companies.origin_country))) : "No Countries information registered." },
							{ name: "Companies", content: (result.production_companies) ? result.production_companies.map(companies => companies.name) : "No Company information registered." }
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