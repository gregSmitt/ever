import { FC, ReactNode } from "react"
import c from './.module.scss'

interface ButtonProps {
	children: ReactNode
	classNames?: string
	onClick?: () => void
}

export const Button: FC<ButtonProps> = ({ children, classNames, onClick }) => {
	return (
		<div onClick={onClick} className={`${c.default} ${classNames ?? ''}`}>
			{children}
		</div>
	)
}
