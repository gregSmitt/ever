import { FC, useState } from "react"
import { useTranslation } from "react-i18next"
import { NavLink, useLocation } from "react-router-dom"
import { ButtonWithArrow } from "Shared/Components/ButtonWithArrow"
import { Popover } from "Shared/Components/Popover"
import { Text } from "Shared/Components/Text"
import { textColor } from "Shared/View/lib/types"

export interface ILinksList {
	hash: string
	id: number
	translateSign: string
	category: string
}
interface INavigationProps {
	title: string
	linksList: ILinksList[]
}
export const NavigationSelect: FC<INavigationProps> = ({ title, linksList }) => {
	const location = useLocation();
	const [isOpen, setIsOpen] = useState(false)
	const closeSelect = () => {
		setIsOpen(false)
	}
	return (
		<div>
			<Popover
				isOpen={isOpen}
				setIsOpen={setIsOpen}
				TriggerComponent={<Trigger
					isAccent={isOpen}
					setIsAccent={setIsOpen}
					title={title}
				/>}
				ContentComponent={<Content
					closeSelect={closeSelect}
					currentPath={location.pathname}
					linksList={linksList}
				/>}
			/>
		</div>
	)
}
interface TriggerProps {
	isAccent: boolean
	setIsAccent: (isAccent: boolean) => void
	title: string
}
const Trigger: FC<TriggerProps> = ({ isAccent, setIsAccent, title }) => {
	const color: textColor = isAccent ? 'TextAccent' : 'TextPrimary';

	return (
		<div className="UIButton paddingHorizontalSmall TextAccent largeHeight overflowHidden">
			<div className="displayFlex centerContainer">
				<ButtonWithArrow
					isAccent={isAccent}
					setIsAccent={setIsAccent}
					arrowClassActive={'show'}
					arrowClasses={'marginLeftSmall arrowDrop'}
				>
					<Text size='Action' classNames={color}>
						{title}
					</Text>
				</ButtonWithArrow>
			</div>
		</div>
	)
}



interface ContentProps {
	closeSelect: () => void
	currentPath: string
	linksList: ILinksList[]
}


const Content: FC<ContentProps> = ({ closeSelect, currentPath, linksList }) => {
	const { t } = useTranslation();
	const links = linksList.map(link => {
		return (
			<Link url={link.hash}
				clickAction={closeSelect}
				currentPath={currentPath}
				key={link.id}
			>
				{t(link.translateSign, { defaultValue: link.translateSign })}
			</Link>
		)
	})
	return (
		<div className="paddingDefault BackgroundPrimary">
			{links}
		</div>
	)
}

interface LinkProps {
	children: string
	currentPath: string
	url: string
	clickAction: () => void
}
const Link: FC<LinkProps> = ({ children, url, clickAction, currentPath }) => {
	let color: textColor = currentPath === url ? 'TextAccent' : 'TextPrimary'
	return (
		<NavLink
			to={url}
			onClick={clickAction}>
			<div className="displayFlex flexColumn">
				<Text
					classNames={`cursorPointer displayFlex backgroundTransparent 
				centerLeftContainer buttonHeight ${color}`}
					size='Action'
				>
					{children}
				</Text>
			</div>
		</NavLink>
	)
}
