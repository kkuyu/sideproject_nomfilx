import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Container = styled.div`
	position: relative;
`;
const TabList = styled.div`
	position: absolute;
	top: -48px;
	right: 0;
`;
const TabButton = styled.button`
	position: relative;
	display: inline-block;
	padding: 5px 10px;
	color: #666;
	&[aria-selected="true"] {
		color: #fff;
	}
	& + &:before {
		content: "";
		position: absolute;
		top: 8px;
		left: 0px;
		width: 1px;
		height: 11px;
		background: #666;
	}
`;
const TabPanel = styled.div`
	display: ${props => props.isActive ? "block" : "none"};
	li {
		display: inline-block;
		margin-right: 20px;
	}
`;

const TabPresenter = ({ tabRef, activeIndex, title, items, handleOnClick, handleKeyDown }) => 
	<Container ref={tabRef}>
		<TabList role="TabList" aria-label={title}>
			{ items.map((item, index) => <TabButton id={`${title.replace(/\s/gi, "")}Tab${index}`} key={index} role="tab" aria-controls={`${title.replace(/\s/gi, "")}TabPanel${index}`} aria-selected={index === activeIndex ? "true": "false"} onClick={handleOnClick} onKeyDown={handleKeyDown}>{item.name}</TabButton> ) }
		</TabList>
		{ items.map((item, index) => 
			<TabPanel id={`${title.replace(/\s/gi, "")}TabPanel${index}`} key={index} role="tabpanel" aria-labelledby={`${title.replace(/\s/gi, "")}Tab${index}`} isActive={index === activeIndex} tabIndex="0">
				{(typeof item.content === "string") && <p>{item.content}</p>}
				{(typeof item.content === "object") && item.content.length > 0 && <ul>
					{item.content.map((content, index) => <li key={index}>{content}</li>)}
				</ul>}
			</TabPanel>
		) }
	</Container>;

TabPresenter.propTypes = {
	activeIndex: PropTypes.number,
	title: PropTypes.string,
	item: PropTypes.array,
	handleOnClick: PropTypes.func,
	handleKeyDown: PropTypes.func
};

export default TabPresenter;