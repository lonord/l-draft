import './style/app.less'

import { convertFromRaw, convertToRaw, EditorState, SelectionState } from 'draft-js'
import * as React from 'react'
import Editor, { LDraftButtons } from '../../src/'

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

	handleFocus = () => {
		this.editor && this.editor.focus(true)
	}

	componentDidMount() {
		if (window.localStorage) {
			const rawStateJSONString = window.localStorage.getItem('__l-editor-content__')
			if (rawStateJSONString) {
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
		}
	}

	render() {
		return (
			<div className="app-root">
				<div className="title">
					<h1>Demo of L Draft</h1>
				</div>
				<div className="content">
					<div className="buttons-wrapper">
						<LDraftButtons />
					</div>
					<div className="editor-wrapper" onClick={this.handleFocus}>
						<Editor
							ref={(editor) => this.editor = editor}
							editorState={this.state.editorState}
							onChange={this.handleChange} />
					</div>
				</div>
				<div className="footer">
					<button onClick={this.handleLogState}>Log State</button>
				</div>
	  		</div>
		)
	}
}

export default App
