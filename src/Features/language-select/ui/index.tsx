import i18n from "App/config/i18next"
import { FC, useState } from "react"
import { useTranslation } from "react-i18next"
import useLocalStorage from "Shared/lib/hooks/use-localstorage"
import { textColor } from "Shared/View/lib/types"
import languages, { LanguageSignType } from "Entities/languages"
import { Popover } from "Shared/Components/Popover"
import { Text } from "Shared/Components/Text"
import { ButtonWithArrow } from "Shared/Components/ButtonWithArrow"
import { PopoverPoint } from "Shared/Components/PopoverPoint"
import { useMediaQuery, useTheme } from "@mui/material"

export const LanguageSelect = () => {
	const { t } = useTranslation()
	const [isOpen, setIsOpen] = useState(false)
	const closeSelect = () => {
		setIsOpen(false)
	}
	return (
		<div>
			<Popover
				isOpen={isOpen}
				setIsOpen={setIsOpen}
				TriggerComponent={<Trigger isAccent={isOpen} setIsAccent={setIsOpen} title={t('langName')} />}
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

interface ContentProps { closeSelect: () => void }
const Content: FC<ContentProps> = ({ closeSelect }) => {
	const { t } = useTranslation()
	const theme = useTheme()
	const isMobile = !useMediaQuery(theme.breakpoints.up('md'))
	const padding = isMobile ? 'paddingTopDefault paddingBottomTiny' : 'paddingHorizontal'
	const defaultLanguage = languages.list.find(l => l.id === languages.default)?.sign
		?? languages.list[0].sign
	const [language, setLanguage] = useLocalStorage(languages.localStorageKey, defaultLanguage)
	const langs = languages.list.map(l => {
		return (
			<Lang
				clickAction={closeSelect}
				language={language}
				setLanguage={setLanguage}
				langSign={l.sign}
				key={l.id}
			>
				{l.nativeName}
			</Lang>
		)
	})

	return (
		<div className={`${padding} BackgroundPrimary`}>
			{langs}
			{isMobile && <PopoverPoint handleClick={closeSelect} color='TextAccent' size='Action'>
				{t('cancel')}
			</PopoverPoint>}
		</div>
	)
}

interface LangProps {
	children: string
	langSign: LanguageSignType
	language: string
	setLanguage: (language: LanguageSignType) => void
	clickAction: () => void
}
const Lang: FC<LangProps> = ({ children, langSign, language, setLanguage, clickAction }) => {
	const color: textColor = language === langSign ? 'TextAccent' : 'TextPrimary'
	const handleClick = () => {
		if (!(language === langSign)) {
			i18n.changeLanguage(langSign)
			setLanguage(langSign)
		}
		clickAction()
	}
	return (
		<PopoverPoint handleClick={handleClick} size='ActionCallout' color={color}>
			{children}
		</PopoverPoint>
	)
}