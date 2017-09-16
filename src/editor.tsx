// tslint:disable-next-line:no-reference
/// <reference path="../types/draft-js-plugins-editor.d.ts"/>

import 'draft-js-inline-toolbar-plugin/lib/plugin.css'

import { EditorState, Modifier, SelectionState } from 'draft-js'
import createInlineToolbarPlugin from 'draft-js-inline-toolbar-plugin'
import Editor, { composeDecorators, PluginEditorProps } from 'draft-js-plugins-editor'
import createRichButtonsPlugin from 'draft-js-richbuttons-plugin'
import { CSSProperties } from 'react'
import * as React from 'react'
import createCursorToEndPlugin from './plugins/draft-js-cursor-to-end-plugin'
import createDeleteTextPlugin from './plugins/draft-js-delete-text-plugin'

const richButtonsPlugin = createRichButtonsPlugin()
const {
	// block buttons
	BlockquoteButton, CodeButton, OLButton, ULButton,
	H1Button, H2Button, H3Button, H4Button, H5Button, H6Button
} = richButtonsPlugin

const inlineToolbarPlugin = createInlineToolbarPlugin()
const { InlineToolbar } = inlineToolbarPlugin

const deleteTextPlugin = createDeleteTextPlugin()

const cursorToEndPlugin = createCursorToEndPlugin()

const plugins = [
	richButtonsPlugin,
	inlineToolbarPlugin,
	deleteTextPlugin,
	cursorToEndPlugin
]

class LDraft extends React.Component<PluginEditorProps, any> {

	editor?: Editor

	focus() {
		this.editor && this.editor.focus()
	}

	blur() {
		this.editor && this.editor.blur()
	}

	moveCursorToEnd() {
		cursorToEndPlugin.moveCursorToEnd()
	}

	componentWillUnmount() {
		this.editor = null
	}

	render() {
		const { editorState, onChange, ...rest } = this.props
		return (
			<div onClick={(e) => e.stopPropagation()}>
				<Editor ref={(editor) => this.editor = editor}
					editorState={editorState}
					onChange={onChange}
					{...rest}
					plugins={plugins} />
				<InlineToolbar />
			</div>
		)
	}
}

export default LDraft

export interface LDraftButtonsProps {
	className?: string
	style?: CSSProperties
}

export class LDraftButtons extends React.Component<any, any> {
	render() {
		return (
			<div {...this.props} onClick={(e) => e.stopPropagation()}>
				<H1Button />
				<H2Button />
				<H3Button />
				<H4Button />
				<H5Button />
				<H6Button />
				<OLButton />
				<ULButton />
				<BlockquoteButton />
				<CodeButton />
			</div>
		)
	}
}
