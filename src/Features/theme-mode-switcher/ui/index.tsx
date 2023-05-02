import { FC, useEffect } from 'react';
import { DayNightSwitcher } from 'Shared/Components/DayNightSwitcher';
import useLocalStorage from 'Shared/lib/hooks/use-localstorage';
import { themeModesNames } from 'Shared/View';

export type ThemeModeType = 'day' | 'night'
export const THEME_MODE_DEFAULT: ThemeModeType = 'day'
export const THEME_MODE_KEY = 'themeMode'
const DARK = themeModesNames.config.DarkClassName
const LIGHT = themeModesNames.config.LightClassName

interface ISwitcherProps {
	biggetThanSM?: boolean
}
export const ThemeModeSwitcher: FC<ISwitcherProps> = ({ biggetThanSM }) => {
	const [mode, setMode] = useLocalStorage<ThemeModeType>(THEME_MODE_KEY, THEME_MODE_DEFAULT)
	const isNight = mode === 'night'
	const switchMode = (isNight: boolean) => {
		if (isNight) setMode('night')
		else setMode('day')
	}
	return (
		<>
			<DayNightSwitcher
				isNight={isNight}
				switchMode={switchMode}
				classNames={`${biggetThanSM ? 'marginLeftSmall' : ''} MUI Img`}
			/>
			<ThemeModeListener mode={mode} />
		</>
	)
}


export const ThemeModeListener: FC<{ mode: ThemeModeType }> = ({ mode }) => {
	useEffect(() => {
		if (mode === 'night') {
			document.body.classList.remove(LIGHT);
			document.body.classList.add(DARK);
		} else {
			document.body.classList.remove(DARK);
			document.body.classList.add(LIGHT);
		}
	}, [mode]);

	return null
}