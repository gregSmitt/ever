import { Text } from "Shared/Components/Text"
import { FC, ReactNode } from "react"

interface IPointProps {
	children?: ReactNode
	title: string
	description: string
}

const Point: FC<IPointProps> = ({ children, title, description }) => {
	const descMT = children ? '' : 'marginTopSmall '
	return (
		<div className='flex1'>
			<Text size='LightHuge' classNames='marginTopMedium TextPrimary'>{title}</Text>
			{children}
			<Text size='ParagraphFootnote' classNames={`${descMT}marginBottomDefault TextSecondary`}>
				{description}
			</Text>
		</div>
	)
}
export { Point }