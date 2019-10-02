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
	html.scroll-lock {
		overflow: hidden;
	}
	body{
		padding-left: 250px;
		font-size: 14px;
		line-height: 1.2;
		color: #fff;
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
		background-color: #1b1c20;
	}
	img {
		display: inline-block;
		max-width: 100%;
	}
	button {
		padding: 0;
		text-align: left;
		color: #fff;
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