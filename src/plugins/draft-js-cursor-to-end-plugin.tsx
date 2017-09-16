import { EditorState, SelectionState } from 'draft-js'

export default function createCursorToEndPlugin() {
	let pluginFunctions = null
	return {
		initialize: (_pluginFunctions) => {
			pluginFunctions = _pluginFunctions
		},
		willUnMount: () => {
			pluginFunctions = null
		},
		moveCursorToEnd: () => {
			if (!pluginFunctions) {
				return
			}
			const { setEditorState, getEditorState, getEditorRef } = pluginFunctions
			const editorState = getEditorState()
			const lastBlock = editorState.getCurrentContent().getLastBlock()
			const updatedSelection = editorState.getSelection().merge({
				anchorKey: lastBlock.getKey(),
				anchorOffset: lastBlock.getLength(),
				focusKey: lastBlock.getKey(),
				focusOffset: lastBlock.getLength()
			}) as SelectionState
			setEditorState(EditorState.forceSelection(editorState, updatedSelection))
			const editor = getEditorRef()
			if (editor) {
				setTimeout(() => {
					editor.focus()
				}, 10)
			}
		}
	}
}
