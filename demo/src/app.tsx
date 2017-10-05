import 'babel-polyfill'

import 'normalize.css'
import './style/app.less'

import { ContentState, convertFromRaw, convertToRaw, EditorState, SelectionState } from 'draft-js'
import * as React from 'react'
import Editor, { Toolbar } from '../../src/'

interface AppState {
	editorState: EditorState
}

class App extends React.Component<any, AppState> {

	editor?: Editor

	state: AppState = {
		editorState: createEditorState()
	}

	handleChange = (editorState: EditorState) => {
		console.log(editorState.getDecorator())
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
			<div className="app-root">
				<div className="title">
					{/* <h1>Demo of L Draft</h1> */}
				</div>
				<div className="content">
					<div className="toolbar-wrapper" onClick={() => this.editor && this.editor.focus()}>
						<Toolbar/>
					</div>
					<div className="editor-wrapper" onClick={this.handleMoveCursorToEnd}>
						<Editor
							ref={(editor) => this.editor = editor}
							editorState={this.state.editorState}
							onChange={this.handleChange} />
					</div>
				</div>
				<div className="footer">
					<button className="themed-button" onClick={this.handleLogState}>Log State</button>
				</div>
	  		</div>
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
