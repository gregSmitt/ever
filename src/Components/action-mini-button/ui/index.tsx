import { MiniButton } from 'Shared/Components/MiniButton'
import { Text } from 'Shared/Components/Text'
import { FC, ReactNode } from 'react'
import { NavLink } from 'react-router-dom'

interface IButton {
	href?: string
	onClick?: () => void
	children: ReactNode
}
export const Button: FC<IButton> = ({ href, onClick, children }) => {
	if (href) return (
		<NavLink to={href}>
			<Component>{children}</Component>
		</NavLink>
	)
	return (
		<div onClick={onClick}>
			<Component>{children}</Component>
		</div>
	)
}

interface IProps {
	children: ReactNode
}
const Component: FC<IProps> = ({ children }) => (
	<MiniButton classNames='BorderColorPrimary'>
		<Text size='ActionFootnote' classNames='TextAccent'>{children}</Text>
	</MiniButton>
)