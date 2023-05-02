import { FC, ReactNode } from "react";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import c from './.module.scss'

interface Props {
	isActive?: boolean
	isAccent: boolean
	setIsAccent: (isAccent: boolean) => void
	children: ReactNode
	arrowClasses?: string
	wraperClasses?: string
	arrowClassActive: string
}

export const ButtonWithArrow: FC<Props> = ({ isAccent, setIsAccent, children, arrowClasses, wraperClasses, arrowClassActive }) => {
	const handleClick = () => { setIsAccent(!isAccent) }
	return (
		<div
			className={`${c.defaultWrap} ${wraperClasses}`}
			onClick={handleClick}
		>
			{children}
			<KeyboardArrowDownIcon className={`${arrowClasses} ${c.defaultArraw} ${isAccent ? arrowClassActive : ""}`} />
		</div>
	)
}