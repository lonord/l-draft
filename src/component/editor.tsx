// tslint:disable-next-line:no-reference
/// <reference path="../../types/draft-js-plugins-editor.d.ts"/>

import 'draft-js-static-toolbar-plugin/lib/plugin.css'

import { EditorState, Modifier, SelectionState } from 'draft-js'
import createBlockBreakoutPlugin from 'draft-js-block-breakout-plugin'
import {
	BlockquoteButton,
	BoldButton,
	CodeBlockButton,
	CodeButton,
	HeadlineOneButton,
	HeadlineThreeButton,
	HeadlineTwoButton,
	ItalicButton,
	OrderedListButton,
	UnderlineButton,
	UnorderedListButton
} from 'draft-js-buttons'
import createDeleteTextPlugin from 'draft-js-delete-selection-plugin'
import createLinkifyPlugin from 'draft-js-linkify-plugin'
import createPicker, { createTriggerButton } from 'draft-js-plugin-editor-toolbar-picker'
import Editor, { composeDecorators, PluginEditorProps } from 'draft-js-plugins-editor'
import createRichButtonsPlugin from 'draft-js-richbuttons-plugin'
import createToolbarPlugin, { Separator } from 'draft-js-static-toolbar-plugin'
import createToolbarLinkPlugin from 'draft-js-toolbar-link-plugin'
import { CSSProperties } from 'react'
import * as React from 'react'
import createRenderOrderFixer from 'react-render-order-fixer'

import { inlineButtonTheme, toolbarTheme } from '../util/theme'

const Picker = createPicker({
	triggerItem: createTriggerButton({ child: 'H' }),
	items: [
		HeadlineOneButton,
		HeadlineTwoButton,
		HeadlineThreeButton
	]
})

const toolbarLinkPlugin = createToolbarLinkPlugin()
const { LinkButton } = toolbarLinkPlugin

const toolbarPlugin = createToolbarPlugin({
	structure: [
		BoldButton,
		ItalicButton,
		UnderlineButton,
		CodeButton,
		LinkButton,
		Separator,
		Picker,
		UnorderedListButton,
		OrderedListButton,
		BlockquoteButton,
		CodeBlockButton,
		Separator
	],
	theme: {
		buttonStyles: inlineButtonTheme,
		toolbarStyles: toolbarTheme
	}
})

const blockBreakoutPlugin = createBlockBreakoutPlugin()

const deleteTextPlugin = createDeleteTextPlugin()

const plugins = [
	toolbarPlugin,
	blockBreakoutPlugin,
	deleteTextPlugin,
	toolbarLinkPlugin
]

const renderOrderFixer = createRenderOrderFixer()
const ToolbarFixed = renderOrderFixer.withOrderFixer(toolbarPlugin.Toolbar)
const { ReRenderTrigger } = renderOrderFixer

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
			<div>
				<Editor ref={(editor) => this.editor = editor}
					editorState={editorState}
					onChange={onChange}
					{...rest}
					plugins={plugins} />
				<ReRenderTrigger/>
			</div>
		)
	}
}

export default LDraft

export const Toolbar = ToolbarFixed
