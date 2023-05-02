import { useMediaQuery, useTheme } from "@mui/material";
import { subdomainsList } from "Entities/subdomains";
import { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import { ButtonWithArrow } from "Shared/Components/ButtonWithArrow";
import { Popover } from "Shared/Components/Popover";
import { PopoverPoint } from "Shared/Components/PopoverPoint";
import { Text } from "Shared/Components/Text";
import { textColor } from "Shared/View/lib/types"



export const SubdomainSelect: FC = () => {
	const [isOpen, setIsOpen] = useState(false)
	const closeSelect = () => {
		setIsOpen(false)
	}
	return (
		<div>
			<Popover
				isOpen={isOpen}
				setIsOpen={setIsOpen}
				TriggerComponent={<Trigger isAccent={isOpen} setIsAccent={setIsOpen} title={'Mainnet'} />}
				ContentComponent={<Content closeSelect={closeSelect} />}
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
		<div className="UIButton paddingHorizontalTiny TextAccent largeHeight overflowHidden">
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
}
const Content: FC<ContentProps> = ({ closeSelect }) => {
	const theme = useTheme()
	const biggerThanMD = useMediaQuery(theme.breakpoints.up('md'))
	const padding = !biggerThanMD ? 'paddingTopDefault paddingBottomTiny' : 'paddingHorizontal'
	const { t } = useTranslation()
	const subdomainsJsx = subdomainsList.map(sd => {
		return (
			<Subdomain
				isSelected={sd.isCurrent}
				url={sd.url}
				key={sd.id}
				clickAction={closeSelect}
			>
				{sd.title}
			</Subdomain>
		)
	})
	return (
		<div className={`${padding} BackgroundPrimary`}>
			{subdomainsJsx}
			{!biggerThanMD && <PopoverPoint
				handleClick={closeSelect}
				color='TextAccent'
				size='Action'
			>
				{t('cancel')}
			</PopoverPoint>}
		</div>
	)
}


interface SubdomainProps {
	children: string
	isSelected: boolean
	url: string
	clickAction: () => void
}
const Subdomain: FC<SubdomainProps> = ({ children, isSelected, url, clickAction }) => {
	const color: textColor = isSelected ? 'TextAccent' : 'TextPrimary'
	const handleClick = () => {
		if (!isSelected) {
			window.location.href = url
		}
		clickAction()
	}
	return (
		<PopoverPoint color={color} handleClick={handleClick} size='ActionCallout'>
			{children}
		</PopoverPoint>
	)
}