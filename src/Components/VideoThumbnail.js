import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlayCircle as faPlay } from '@fortawesome/free-regular-svg-icons';

const Container = styled.button``;
const Image = styled.img`
	position: absolute;
	top: 50%;
	left: 0;
	width: 100%;
	opacity: 1;
	transform: translateY(-50%);
	transition: opacity 0.1s;
`;
const Tag = styled.span`
	position: absolute;
	bottom: 10px;
	left: 10px;
	color: transparent;
	z-index: 1;
	transition: color 0.1s;
`;
const ImageContainer = styled.span`
	position: relative;
	display: block;
	overflow: hidden;
	border: 2px solid transparent;
	border-radius: 4px;
	background: #000;
	transition: border-color 0.1s;
	&:before {
		content: "";
		display: block;
		width: 100%;
		height: 0;
		padding-bottom: 75%;
		z-index: -1;
	}
	&:hover,
	&:focus {
		border-color: #ea0037;
		${Image} {
			opacity: 0.6;
		}
		${Tag} {
			color: #ea0037;
		}
	}
`;

const VideoThumbnail = ({ handleModalOpen, videoArray, index, type, videoKey }) => (
	<Container ref={ref => videoArray[index] = ref} data-video-key={videoKey} onClick={() => handleModalOpen({ type: "video", key: videoKey })}>
		<ImageContainer>
			<Tag>
				<FontAwesomeIcon icon={ faPlay } className="faPlay" />
				{index < 10 ? `0${index}` : index} {type}
			</Tag>
			<Image src={videoKey ? `http://i.ytimg.com/vi/${videoKey}/hqdefault.jpg` : require("../assets/noPoster.png")} alt="" />
		</ImageContainer>
	</Container>
);

VideoThumbnail.prototype = {
	handleOpenModal: PropTypes.func,
	videoArray: PropTypes.array,
	index: PropTypes.number.isRequired,
	type: PropTypes.string.isRequired,
	videoKey: PropTypes.string.isRequired
};

export default VideoThumbnail;