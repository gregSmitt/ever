import { FC, ReactNode } from "react";

interface IProps {
	children: ReactNode
	classNames?: string
	onClick?: () => void
}
const Container: FC<IProps> = ({ children, classNames, onClick }) => {
	return (
		<div className={`displayFlex flexColumn`}>
			<div
				className={`displayFlex backgroundTransparent centerLeftContainer buttonHeight ${classNames}`}
				onClick={onClick}
			>
				{children}
			</div>
		</div>
	)
}

export { Container }