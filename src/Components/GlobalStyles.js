import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const globalStyle = createGlobalStyle`
	${reset};
	a{
		color: inherit;
		text-decoration: none;
	}
	*{
		box-sizing: border-box;
	}
	body{
		padding-left: 250px;
		font-size: 14px;
		line-height: 1.2;
		color: white;
		background-color: #1b1c20;
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
	}
	img {
		display: inline-block;
		max-width: 100%;
	}
	button {
		padding: 0;
		line-height: 1.2;
		text-align: left;
		border: none;
		background: transparent;
		cursor: pointer;
	}
	.hidden {
		position: absolute;
		width: 1px;
		height: 1px;
		padding: 0;
		overflow: hidden;
		clip: rect(0, 0, 0, 0);
		white-space: nowrap;
		border: 0;
	}
`;

export default globalStyle;