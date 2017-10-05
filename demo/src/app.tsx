import 'babel-polyfill'

import 'normalize.css'

import { ContentState, convertFromRaw, convertToRaw, EditorState, SelectionState } from 'draft-js'
import * as React from 'react'
import Editor, { Toolbar } from '../../src/'
import {
	AppWrapper,
	ContentWrapper,
	EditorWrapper,
	FooterWrapper,
	LogButton,
	TitleWrapper,
	ToolbarWrapper
} from './styled'

interface AppState {
	editorState: EditorState
}

class App extends React.Component<any, AppState> {

	editor?: Editor

	state: AppState = {
		editorState: createEditorState()
	}

	handleChange = (editorState: EditorState) => {
		this.setState({
			editorState
		})
	}

	handleLogState = () => {
		console.log(convertToRaw(this.state.editorState.getCurrentContent()))
	}

	handleMoveCursorToEnd = (e: React.SyntheticEvent<any>) => {
		if (e.target === e.currentTarget) {
			this.editor && this.editor.moveCursorToEnd()
		}
	}

	componentWillUnmount() {
		this.editor = null
		saveContent(this.state.editorState.getCurrentContent())
	}

	render() {
		return (
			<AppWrapper>
				<TitleWrapper>
					<h3>Demo of L Draft</h3>
				</TitleWrapper>
				<ContentWrapper>
					<ToolbarWrapper onClick={() => this.editor && this.editor.focus()}>
						<Toolbar />
					</ToolbarWrapper>
					<EditorWrapper onClick={this.handleMoveCursorToEnd}>
						<Editor
							ref={(editor) => this.editor = editor}
							editorState={this.state.editorState}
							onChange={this.handleChange} />
					</EditorWrapper>
				</ContentWrapper>
				<FooterWrapper>
					<LogButton onClick={this.handleLogState}>Log State</LogButton>
				</FooterWrapper>
			</AppWrapper>
		)
	}
}

export default App

function createEditorState() {
	const content = readContent()
	return content ? EditorState.createWithContent(content) : EditorState.createEmpty()
}

function readContent(): ContentState {
	if (window && window.localStorage) {
		const rawStateJSONString = window.localStorage.getItem('__l-editor-content__')
		if (rawStateJSONString) {
			console.log('read from localStorage')
			return convertFromRaw(JSON.parse(rawStateJSONString))
		}
	}
	return null
}

function saveContent(contentState: ContentState) {
	if (window && window.localStorage) {
		const rawState = convertToRaw(contentState)
		window.localStorage.setItem('__l-editor-content__', JSON.stringify(rawState))
		console.log('save to localStorage')
	}
}
