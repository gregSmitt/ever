import { textColor } from "Shared/View/lib/types"
import { Text } from "Shared/Components/Text";
import { NavLink, useLocation } from "react-router-dom";
import { ILinksList } from "Features/navigation-select";
import { FC } from "react";
import { useTranslation } from "react-i18next";

interface IMenuContentProps {
	linksList: ILinksList[]
	title: string
	closeMenu: () => void
}

export const MenuContent: FC<IMenuContentProps> = ({ linksList, title, closeMenu }) => {
	const location = useLocation();
	return (
		<div className="marginBottomGreat">
			<Text classNames="bigCellHeight TextTertiary" size='LightHuge'>{title}</Text>
			<Content closeMenu={closeMenu} currentPath={location.pathname} linksList={linksList} />
		</div>
	)
}

interface ContentProps {
	closeMenu: () => void
	currentPath: string
	linksList: ILinksList[]
}


const Content: FC<ContentProps> = ({ closeMenu, currentPath, linksList }) => {
	const { t } = useTranslation();
	const links = linksList.map(link => {
		return (
			<Link url={link.hash}
				clickAction={closeMenu}
				currentPath={currentPath}
				key={link.id}
			>
				{t(link.translateSign, { defaultValue: link.translateSign })}
			</Link>
		)
	})
	return (
		<>{links}</>
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

	const handleClick = () => {
		if (currentPath !== url) {
			clickAction()
		}
	}
	return (
		<div className="displayFlex backgroundTransparent centerLeftContainer">
			<NavLink
				to={url}
				onClick={handleClick}>
				<div className="displayFlex flexColumn">
					<Text
						classNames={`${color}`}
						size='LightLarge'
					>
						{children}
					</Text>
				</div>
			</NavLink>
		</div>
	)
}