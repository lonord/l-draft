import styled, { injectGlobal } from 'styled-components'

injectGlobal`
	html,
	body,
	#root {
		height: 100%;
	}
`

export const FlexContainer = styled.div`
	display: flex;
`

export const FlexVerticalContainer = FlexContainer.extend`
	flex-direction: column;
`

export const FlexItemFixed = styled.div`
	flex-grow: 0;
	flex-shrink: 0;
`

export const FlexItemAdaptive = styled.div`
	flex-grow: 1;
	flex-shrink: 1;
`

export const AppWrapper = FlexVerticalContainer.extend`
	padding: 0 50px;
	height: 100%;
`

export const TitleWrapper = FlexItemFixed.extend`
	padding: 0 15px 10px;
`

export const ContentWrapper = (FlexItemAdaptive.withComponent(FlexVerticalContainer)).extend`
	padding: 15px;
	border: 1px solid #eee;
`

export const ToolbarWrapper = FlexItemFixed.extend`
	padding-bottom: 10px;
`

export const EditorWrapper = FlexItemAdaptive.extend`
	overflow-y: auto;
	cursor: text;
`

export const FooterWrapper = FlexItemFixed.extend`
	padding: 10px 0;
`

export const LogButton = styled.button`
	border: 1px solid #ddd;
	border-radius: 4px;
	padding: 2px 10px;
	background: #fff;
	cursor: pointer;
	font-size: 14px;
	outline: none;

	&:hover {
		opacity: 0.6;
	}
`
