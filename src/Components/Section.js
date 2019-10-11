import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Container = styled.section`
	& + & {
		margin-top:70px;
	}
`;

const Title = styled.h3`
	font-size: 17px;
	font-weight: 600;
`;

const Grid = styled.div`
	margin-top: 25px;
	display: grid;
	grid-template-columns: repeat(auto-fill, ${props => props.columnWidth || "145px"});
	grid-gap: ${props => props.columnGap || "20px"};
`;

const Section = ({title, columnWidth, columnGap, children}) => (
	<Container>
		<Title>{title}</Title>
		<Grid columnWidth={columnWidth} columnGap={columnGap}>{children}</Grid>
	</Container>
);

Section.prototypes = {
	title: PropTypes.string.isRequired,
	columnWidth: PropTypes.string,
	columnGap: PropTypes.string,
	children: PropTypes.oneOfType([
		PropTypes.arrayOf(PropTypes.node),
		PropTypes.node
	])
};

export default Section;