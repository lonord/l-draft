// tslint:disable-next-line:no-reference
/// <reference path="../types/draft-js-plugins-editor.d.ts"/>

import 'draft-js-linkify-plugin/lib/plugin.css'

import { EditorState, Modifier, SelectionState } from 'draft-js'
import createBlockBreakoutPlugin from 'draft-js-block-breakout-plugin'
import createLinkifyPlugin from 'draft-js-linkify-plugin'
import Editor, { composeDecorators, PluginEditorProps } from 'draft-js-plugins-editor'
import createRichButtonsPlugin from 'draft-js-richbuttons-plugin'
import { CSSProperties } from 'react'
import * as React from 'react'

import createDeleteTextPlugin from './plugins/draft-js-delete-text-plugin'

const linkifyPlugin = createLinkifyPlugin()

const richButtonsPlugin = createRichButtonsPlugin()
const {
	// inline buttons
	ItalicButton, BoldButton, MonospaceButton, UnderlineButton,
	// block buttons
	BlockquoteButton, CodeButton, OLButton, ULButton,
	H1Button, H2Button, H3Button, H4Button, H5Button, H6Button
} = richButtonsPlugin

const blockBreakoutPlugin = createBlockBreakoutPlugin()

const deleteTextPlugin = createDeleteTextPlugin()

const plugins = [
	linkifyPlugin,
	richButtonsPlugin,
	blockBreakoutPlugin,
	deleteTextPlugin
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
		const { editorState, onChange } = this.props
		onChange(EditorState.moveFocusToEnd(editorState))
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
				<BoldButton />
				<ItalicButton />
				<UnderlineButton />
				<MonospaceButton />
				<i>&nbsp;&nbsp;&nbsp;</i>
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
