import { FC } from "react"
import logoImage from '../assets/x-blue.svg'
import { NavLink } from "react-router-dom"

interface LogoProps {
	url?: string
	classNames?: string
}
export const Logo: FC<LogoProps> = ({ url, classNames }) => {
	const logo = <img src={logoImage} alt="logo" className={classNames ?? ''} />
	return (
		<>
			{!url && logo}
			{url &&
				<NavLink to={url}>
					{logo}
				</NavLink>
			}
		</>
	)
}