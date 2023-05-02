import { FC, useState } from "react";
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import c from './.module.scss';

interface SwitcherProps {
	isNight: boolean
	switchMode: (isNight: boolean) => void
	classNames?: string
	wrapperClassNames?: string
}

export const DayNightSwitcher: FC<SwitcherProps> = ({ isNight, switchMode, classNames, wrapperClassNames }) => {
	const [isHovered, setHover] = useState(false);
	const hendlerClick = () => {
		switchMode(!isNight);
	}
	const hendlerMouseEnter = () => {
		if (!isNight) setHover(true);
	}
	const hendlerMouseLeave = () => {
		if (!isNight) setHover(false);
	}
	const dayStyle = isHovered ? { fill: 'rgb(125, 133, 137)' } : { fill: 'rgb(32, 38, 42)' };
	const nightStyle = { fill: 'rgb(255, 255, 255)' };
	return (
		<div
			className={`${c.default} ${wrapperClassNames ?? ''}`}
			style={isNight ? nightStyle : dayStyle}
			onClick={hendlerClick}
			onMouseEnter={hendlerMouseEnter}
			onMouseLeave={hendlerMouseLeave}
		>
			{isNight && <DarkModeOutlinedIcon className={classNames ?? ''} />}
			{!isNight && <LightModeOutlinedIcon className={classNames ?? ''} />}
		</div>
	)
}