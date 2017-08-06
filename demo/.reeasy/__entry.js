
		import { AppContainer } from 'react-hot-loader'
		import React from 'react'
		import ReactDOM from 'react-dom'
		import App from '../src/app.tsx'

		const rootEl = document.getElementById('root')
		const render = Component =>
			ReactDOM.render(
				<AppContainer>
					<Component />
				</AppContainer>,
				rootEl
			);

		render(App)
		if (module.hot) module.hot.accept('../src/app.tsx', () => {
			const NextApp = require('../src/app.tsx').default
			render(NextApp)
		})
	