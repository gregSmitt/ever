import { FC } from "react"
import { textColor } from "Shared/View/lib/types"
import { TextSizeType } from "../Text"
import { Text } from "../Text"

interface IButtonProps {
	handleClick: () => void
	color: textColor
	children: string
	size?: TextSizeType
}
export const PopoverPoint: FC<IButtonProps> = ({ handleClick, color, children, size }) => {
	return (
		<div className="displayFlex flexColumn"
			onClick={handleClick}
		>
			<Text
				classNames={`cursorPointer displayFlex backgroundTransparent 
				centerLeftContainer buttonHeight justifyContentCenter ${color}`}
				size={size ?? 'ActionCallout'}
			>
				{children}
			</Text>
		</div>
	)
}