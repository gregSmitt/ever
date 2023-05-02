import { createContext } from "react"

const ThemeModeContext =
	createContext<{ mode: string, setMode: (mode: string) => void }>
		({ mode: 'night', setMode: () => { } });



export default ThemeModeContext