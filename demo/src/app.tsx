import 'normalize.css'
import './style/app.less'

import { convertFromRaw, convertToRaw, EditorState, SelectionState } from 'draft-js'
import * as React from 'react'
import Editor, { Toolbar } from '../../src/'

interface AppState {
	editorState: EditorState
}

class App extends React.Component<any, AppState> {

	editor?: Editor

	state: AppState = {
		editorState: EditorState.createEmpty()
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

	componentDidMount() {
		if (window.localStorage) {
			const rawStateJSONString = window.localStorage.getItem('__l-editor-content__')
			if (rawStateJSONString) {
				console.log('read from localStorage')
				this.setState({
					editorState: EditorState.createWithContent(convertFromRaw(JSON.parse(rawStateJSONString)))
				})
			}
		}
	}

	componentWillUnmount() {
		this.editor = null
		if (window.localStorage) {
			const rawState = convertToRaw(this.state.editorState.getCurrentContent())
			window.localStorage.setItem('__l-editor-content__', JSON.stringify(rawState))
			console.log('save to localStorage')
		}
	}

	render() {
		return (
			<div className="app-root">
				<div className="title">
					<h1>Demo of L Draft</h1>
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
