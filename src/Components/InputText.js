import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Input = styled.input`
	padding-bottom: 6px;
	border-bottom: 1px solid #666;
`;
const Bar = styled.span`
	position: absolute;
	left: 0;
	bottom: 0;
	max-width: 100%;
	height: 3px;
	line-height: 0;
	border-bottom: 1px solid #fff;
	overflow: hidden;
	color: transparent;
	${Input}:focus + & {
		border-color: #ea0037;
	}
`;
const Container = styled.div`
	position: relative;
	${Input}, ${Bar} {
		font-size: ${(props) => props.fontSize};
	}
`;

const InputText = ({ placeholder="", value="", onChange, fontSize="20px" }) => (
	<Container fontSize={fontSize}>
		<Input type="text" placeholder={placeholder} value={value} onChange={onChange} />
		<Bar aria-hidden="true">{value}</Bar>
	</Container>
);

InputText.propTypes = {
	placeholder: PropTypes.string.isRequired,
	value: PropTypes.string.isRequired,
	onChange: PropTypes.func
};

export default InputText;