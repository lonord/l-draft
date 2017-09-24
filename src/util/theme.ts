import styled, { injectGlobal } from 'styled-components'

injectGlobal`
	.l-draft-toolbar {
		border: 1px solid #ddd;
		background: white;
		border-radius: 2px;
		box-shadow: 0px 1px 3px 0px rgba(220,220,220,1);
		z-index: 2;
		box-sizing: border-box;
		&:after {
			border-color: rgba(255, 255, 255, 0);
			border-top-color: #fff;
			border-width: 4px;
			margin-left: -4px;
		}
		&:before {
			border-color: rgba(221, 221, 221, 0);
			border-top-color: #ddd;
			border-width: 6px;
			margin-left: -6px;
		}
	}
	.l-draft-toolbar-buttons-wrapper {
		display: inline-block;
		background: white;
	}
	.l-draft-toolbar-button {
		background: white;
		color: #888;
		font-size: 18px;
		border: 0;
		padding-top: 5px;
		vertical-align: bottom;
		height: 34px;
		width: 36px;
		& svg {
			fill: #888;
		}
		&:hover,
		&:focus {
			background: #f3f3f3;
			outline: 0;
		}
	}
	.l-draft-toolbar-button-active {
		background: #efefef;
		color: #444;
		& svg {
			fill: #444;
		}
	}
`

export const inlineButtonTheme = {
	buttonWrapper: 'l-draft-toolbar-buttons-wrapper',
	button: 'l-draft-toolbar-button',
	active: 'l-draft-toolbar-button-active'
}

export const toolbarTheme = {
	toolbar: 'l-draft-toolbar'
}
