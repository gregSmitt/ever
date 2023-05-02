import { FC, ReactNode } from "react"

interface IContainerProps {
	children: ReactNode
}

export const Container: FC<IContainerProps> = ({ children }) => {
	return (
		<div className="UIScreen displayFlex flexColumn flex1">
			<div className="UIScreen__content displayFlex flexColumn flex1 alignCenter">
				{children}
			</div>
		</div>
	)
}