import './index.scss'
import { FC, ReactNode } from "react"

export type TextSizeType = 'ParagraphLabel' | 'ParagraphFootnote' | 'ParagraphNote' | 'ParagraphText' | 'ActionFootnote'
	| 'ActionCallout' | 'Action' | 'TitleMedium' | 'TitleHuge' | 'LightHuge' | 'HeadlineLabel' | 'LightLarge' | 'MonoText' | 'TinyMedium'

interface TextProps {
	children: ReactNode
	size?: TextSizeType
	classNames?: string
}

export const Text: FC<TextProps> = ({ children, size, classNames }) => {
	return (
		<div className={`defaultTextComponentContainer ${size ?? 'ParagraphText'} ${classNames}`}>
			{children}
		</div>
	)
}