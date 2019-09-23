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

const Modal = ({ modalRef, handleModalClose, handleOnClick, handleKeyDown, children }) => (
	<Container aria-modal="true" onClick={handleOnClick} onKeyDown={(event) => handleKeyDown(event)}>
		<ModalContent ref={modalRef} tabIndex="0">
			{children}
			<CloseButton onClick={handleModalClose} aria-label="Close Modal">
				<FontAwesomeIcon icon={ faClose } className="faClose" />
			</CloseButton>
		</ModalContent>
		{/* <ModalDim onClick={handleModalClose} /> */}
	</Container>
)

Modal.prototype = {
	modalRef: PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
	handleModalClose: PropTypes.func,
	handleKeyDown: PropTypes.func,
	children: PropTypes.oneOfType([
		PropTypes.arrayOf(PropTypes.node),
		PropTypes.node
	])
};

export default Modal;