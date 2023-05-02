import { Routing } from 'Pages'
import { withProviders } from './providers'
import './styles/index.scss'
import { THEME_MODE_DEFAULT, THEME_MODE_KEY, ThemeModeListener, ThemeModeType } from "Features/theme-mode-switcher";
import useLocalStorage from "Shared/lib/hooks/use-localstorage";


function App() {
	const [mode] = useLocalStorage<ThemeModeType>(THEME_MODE_KEY, THEME_MODE_DEFAULT)
	return (
		<div className="App">
			<Routing />
			<ThemeModeListener mode={mode} />
		</div>
	)
}

export { useAppDispatch } from './model'

export default withProviders(App)