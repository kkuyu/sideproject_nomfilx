import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Container = styled.div``;
const Video = styled.iframe``;
const VideoContainer = styled.div`
	position: relative;
	padding-bottom: 56.5%;
	background: url(${props => props.bgUrl}) center center no-repeat;
	background-size: 100% auto;
	${Video} {
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 100%;
	}
`
const InfoContainer = styled.div`
	padding: 15px 12px;
	line-height: 1.5;
`;
const Title = styled.h3`
	font-size: 16px;
`;
const List = styled.ul`
	margin-top: 5px;
`;
const Item = styled.li`
	display: inline-block;
	color: #ddd;
	& + & {
		&:before {
			content: "";
			margin: 0 10px;
			display: inline-block;
			width: 2px;
			height: 2px;
			background: #fff;
			vertical-align: super;
		}
	}
`;

const VideoPlayer = ({currentVideoInfo}) => (
	<Container tabIndex="0">
		<VideoContainer bgUrl={currentVideoInfo.key ? `http://i.ytimg.com/vi/${currentVideoInfo.key}/hqdefault.jpg` : require("../assets/noPoster.png")}>
			<Video src={`https://www.youtube.com/embed/${currentVideoInfo.key}?autoplay=1&controls=0&fs=0&modestbranding=1&origin=${window.location.origin}`} title={`${currentVideoInfo.name} video`} />
		</VideoContainer>
		<InfoContainer>
			<Title>{currentVideoInfo.name}</Title>
			{ (currentVideoInfo.type || currentVideoInfo.iso_639_1) && <List>
				<Item>{currentVideoInfo.type}</Item>
				<Item>{currentVideoInfo.iso_639_1}-{currentVideoInfo.iso_3166_1}</Item>
			</List> }
		</InfoContainer>
	</Container>
)

VideoPlayer.prototypes = {
	currentVideoInfo: PropTypes.shape({
		key: PropTypes.string,
		name: PropTypes.string,
		type: PropTypes.string,
		iso_639_1: PropTypes.string,
		iso_3166_1: PropTypes.string,
	})
};

export default VideoPlayer;