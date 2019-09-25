import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes as faClose } from '@fortawesome/free-solid-svg-icons';

const Container = styled.aside`
	position: fixed;
	top: 0;
	left: 0;
	width: 100vw;
	height: 100vh;
	z-index: 999;
	background: rgba(0, 0, 0, 0.7);
`;
const ModalContent = styled.div`
	position: absolute;
	top: 50%;
	left: 50%;
	width: 60%;
	min-height: 300px;
	border: 2px solid #ea0037;
	background: #121317;
	transform: translate(-50%, -50%);
`;
const CloseButton = styled.button`
	position: absolute;
	top: 2px;
	right: -40px;
	width: 30px;
	font-size: 30px;
	text-align: center;
	color: #fff;
	&:hover,
	&:focus {
		color: #ea0037;
	}
`;

const Modal = ({ modalRef, handleModalClose, handleOnClick, handleKeyDown, children }) => (
	<Container aria-modal="true" onClick={handleOnClick} onKeyDown={(event) => handleKeyDown(event)}>
		<ModalContent ref={modalRef} tabIndex="0">
			{children}
			<CloseButton onClick={handleModalClose} aria-label="Close Modal">
				<FontAwesomeIcon icon={ faClose } className="faClose" aria-label="Modal Close" />
			</CloseButton>
		</ModalContent>
	</Container>
)

Modal.prototypes = {
	modalRef: PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
	handleModalClose: PropTypes.func,
	handleKeyDown: PropTypes.func,
	children: PropTypes.oneOfType([
		PropTypes.arrayOf(PropTypes.node),
		PropTypes.node
	])
};

export default Modal;