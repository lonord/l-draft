
declare module "draft-js-plugins-editor" {
	export interface PluginEditorProps extends Draft.EditorProps {
		plugins?: Array<any>
		defaultKeyBindings?: boolean
		defaultBlockRenderMap?: boolean
		decorators?: Array<any>
	}
	export default class PluginEditor extends React.Component<PluginEditorProps, any> {
		// Force focus back onto the editor node.
		focus(): void
		// Remove focus from the editor node.
		blur(): void
	}

	export var composeDecorators: any
}