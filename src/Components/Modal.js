import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes as faClose } from '@fortawesome/free-solid-svg-icons';

const Container = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	width: 100vw;
	height: 100vh;
	z-index: 999;
`;
const ModalDim = styled.div`
	width: 100vw;
	height: 100vh;
	background: rgba(0, 0, 0, 0.6);
`;
const ModalContent = styled.div`
	position: absolute;
	top: 50%;
	left: 50%;
	width: 60%;
	min-height: 300px;
	border: 2px solid #ea0037;
	border-radius: 10px;
	overflow: hidden;
	transform: translate(-50%, -50%);
`;
const CloseButton = styled.button`
	position: absolute;
	top: 15px;
	right: 15px;
	font-size: 30px;
	color: #fff;
`;

const Modal = ({ handleCloseModal}) => (
	<Container>
		<ModalDim onClick={handleCloseModal} />
		<ModalContent>
			<CloseButton onClick={handleCloseModal}>
				<FontAwesomeIcon icon={ faClose } className="faClose" />
			</CloseButton>
		</ModalContent>
	</Container>
);

Modal.prototype = {
	handleCloseModal: PropTypes.func
};

export default Modal;