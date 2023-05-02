import { MiniButton } from "Shared/Components/MiniButton";
import { Text } from "Shared/Components/Text";
import { FC, ReactNode } from "react";

interface IButtonProps {
	children: ReactNode
	isActive?: boolean
	onClick?: () => void
}
export const Button: FC<IButtonProps> = ({ children, isActive = false, onClick }) => {
	const buttonClassNames = isActive ? 'BackgroundAccent BorderColorAccent' : 'BorderColorPrimary'
	const textClassNames = isActive ? 'TextPrimary' : 'TextSecondary'
	return (
		<MiniButton classNames={buttonClassNames} onClick={onClick}>
			<Text classNames={textClassNames} size='ActionFootnote'>{children}</Text>
		</MiniButton>
	)
}