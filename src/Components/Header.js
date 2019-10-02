import React from "react";
import { Link, withRouter } from "react-router-dom";
import styled from "styled-components";

const Header = styled.header`
	position: fixed;
	top: 0;
	left: 0;
	width: 250px;
	height: 100vh;
	color: white;
	background-color: #121317;
	z-index: 10;
`;
const Logo = styled.h1`
	margin-top: 8px;
`;
const LogoLink = styled(Link)`
	display: flex;
	height: 75px;
	font-size: 16px;
	font-weight: bold;
	align-items: center;
	justify-content: center;
`;
const GnbList = styled.nav`
	margin-top: 26px;
`;
const ListName = styled.strong`
	display: block;
	padding-left: 24px;
	* + & {
		margin-top: 60px;
	}
`;
const List = styled.ul`
	margin-top: 26px;
`;
const Item = styled.li`
	width: 100%;
	color: ${props => props.current ? "#ea0037" : "#666"};
	font-weight: ${props => props.current ? "600" : "400"};
	text-align: center;
	border-left: 3px solid ${props => props.current ? "#ea0037" : "transparent"};
	& + & {
		margin-top: 16px;
	}
`;
const SLink = styled(Link)`
	display: flex;
	height: 28px;
	padding-left: 22px;
	align-items: center;
`;

export default withRouter(({ location: { pathname } }) => (
	<Header>
		<Logo>
			<LogoLink to="/">Nomflix</LogoLink>
		</Logo>
		<GnbList>
			<ListName>Browse Nomflix</ListName>
			<List>
				<Item current={pathname === "/" || pathname.includes("/movie")}><SLink to="/">Movies</SLink></Item>
				<Item current={pathname === "/tv" || pathname.includes("/show")}><SLink to="/tv">TV</SLink></Item>
				<Item current={pathname === "/search"}><SLink to="/search">Search</SLink></Item>
			</List>
			{/* <ListName>Categories</ListName>
			<List>
				<Item><SLink to="">lorem</SLink></Item>
				<Item><SLink to="">ipsum</SLink></Item>
				<Item><SLink to="">dolor</SLink></Item>
				<Item><SLink to="">sit amet</SLink></Item>
			</List> */}
		</GnbList>
	</Header>
));