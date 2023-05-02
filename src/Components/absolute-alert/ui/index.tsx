import { Text } from "Shared/Components/Text";
import { FC } from "react";
import './style.scss'

interface IAlertProps {
	text: string
	open?: boolean
}
export const Alert: FC<IAlertProps> = ({ text, open = false }) => {
	const openClass = open ? ' open' : ''
	return (
		<div className={`Alert paddingDefault borderRadiusMedium StaticBackgroundBlack${openClass}`}>
			<Text size="ParagraphFootnote" classNames="StaticTextPrimaryLight">{text}</Text>
		</div>
	)
}