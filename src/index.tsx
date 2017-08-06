// tslint:disable-next-line:no-reference
/// <reference path="../types/draft-js-plugins-editor.d.ts"/>

import 'draft-js-image-plugin/lib/plugin.css'
import 'draft-js-inline-toolbar-plugin/lib/plugin.css'
import 'draft-js-linkify-plugin/lib/plugin.css'
import './style/style.less'

import { EditorState, SelectionState } from 'draft-js'
import createAlignmentPlugin from 'draft-js-alignment-plugin'
import createFocusPlugin from 'draft-js-focus-plugin'
import createImagePlugin from 'draft-js-image-plugin'
import createInlineToolbarPlugin from 'draft-js-inline-toolbar-plugin'
import createLinkifyPlugin from 'draft-js-linkify-plugin'
import Editor, { composeDecorators } from 'draft-js-plugins-editor'
import createResizeablePlugin from 'draft-js-resizeable-plugin'
import createRichButtonsPlugin from 'draft-js-richbuttons-plugin'
import { CSSProperties } from 'react'
import * as React from 'react'

export interface LDraftProps {
	editorState: EditorState
	onChange(editorState: EditorState): void
	placeholder?: string
	readOnly?: boolean
	onEscape?(e: React.KeyboardEvent<{}>): void
	onTab?(e: React.KeyboardEvent<{}>): void
	onUpArrow?(e: React.KeyboardEvent<{}>): void
	onDownArrow?(e: React.KeyboardEvent<{}>): void
	onBlur?(e: React.SyntheticEvent<{}>): void
	onFocus?(e: React.SyntheticEvent<{}>): void
	className?: string
	style?: CSSProperties
}

const richButtonsPlugin = createRichButtonsPlugin()
const {
	// inline buttons
	ItalicButton, BoldButton, MonospaceButton, UnderlineButton,
	// block buttons
	BlockquoteButton, CodeButton, OLButton, ULButton,
	H1Button, H2Button, H3Button, H4Button, H5Button, H6Button
} = richButtonsPlugin

const inlineToolbarPlugin = createInlineToolbarPlugin()
const { InlineToolbar } = inlineToolbarPlugin

const linkifyPlugin = createLinkifyPlugin({
	target: '_blank'
})

const focusPlugin = createFocusPlugin()

const resizeablePlugin = createResizeablePlugin()

const alignmentPlugin = createAlignmentPlugin()
const { AlignmentTool } = alignmentPlugin

const decorator = composeDecorators(
	resizeablePlugin.decorator,
	alignmentPlugin.decorator,
	focusPlugin.decorator
)

const imagePlugin = createImagePlugin({ decorator })

const plugins = [
	richButtonsPlugin,
	inlineToolbarPlugin,
	linkifyPlugin,
	focusPlugin,
	alignmentPlugin,
	resizeablePlugin,
	imagePlugin
]

class LDraft extends React.Component<LDraftProps, any> {

	editor?: Editor

	focus(cursorToEnd?: boolean) {
		if (cursorToEnd) {
			const { editorState, onChange } = this.props
			const lastBlock = editorState.getCurrentContent().getLastBlock()
			const updatedSelection = editorState.getSelection().merge({
				anchorKey: lastBlock.getKey(),
				anchorOffset: lastBlock.getLength(),
				focusKey: lastBlock.getKey(),
				focusOffset: lastBlock.getLength()
			}) as SelectionState
			onChange(EditorState.forceSelection(editorState, updatedSelection))
			setTimeout(() => {
				this.editor.focus()
			}, 10)
		} else {
			this.editor && this.editor.focus()
		}
	}

	blur() {
		this.editor && this.editor.blur()
	}

	componentWillUnmount() {
		this.editor = null
	}

	render() {
		const { editorState, onChange, className, style, ...rest } = this.props
		const wrapperProps = { className, style }
		return (
			<div {...wrapperProps} onClick={(e) => e.stopPropagation()}>
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
				<button onClick={() => imagePlugin.addImage('https://lonord.name/static/image/icon.png')}>Add Image</button>
			</div>
		)
	}
}
