import { ButtonHeightContainer } from "Components/button-height"
import { MiniTriggerButton } from "Components/mini-trigger"
import { Popover } from "Shared/Components/Popover"
import { Text, TextSizeType } from "Shared/Components/Text"
import { FC, useState } from "react"
import { useMediaQuery, useTheme } from "@mui/material"
import { useTranslation } from "react-i18next"

export interface IItem {
	value: string
	id: number | string
}
interface IFilterProps {
	list: { value: string, id?: number | string }[]
	buttonText: string
	setValue: (value: string | null, id?: number | string) => void
	value: string | null
}
export const Filter: FC<IFilterProps> = ({ buttonText, setValue, list, value }) => {
	const theme = useTheme()
	const isMobile = !useMediaQuery(theme.breakpoints.up('md'))
	const { t } = useTranslation()
	const [isOpen, setIsOpen] = useState(false)

	const clickHandler = (value: string, id?: number | string) => {
		setValue(value, id)
		setIsOpen(false)
	}
	const closeHandler = () => setIsOpen(false)
	const clearHandler = () => {
		setValue(null)
		setIsOpen(false)
	}

	const renderedList = list.map(el => <ListPoint
		key={el.id}
		clickHandler={clickHandler}
		value={el.value}
		id={el.id}
	/>)

	return (
		<>
			<Popover
				TriggerComponent={
					<MiniTriggerButton isActive={Boolean(value)}>
						{value ? `${buttonText}: ${value}` : buttonText}
					</MiniTriggerButton>
				}
				ContentComponent={
					<>
						{Boolean(value) && <ListPoint
							color='TextNegative'
							clickHandler={clearHandler}
							value={t('clear')}
						/>}
						{renderedList}
						{isMobile && <ListPoint
							size='Action'
							color='TextAccent'
							clickHandler={closeHandler}
							value={t('cancel')}
						/>}
					</>
				}
				contentClassesMobile="displayFlex flexColumn borderRadiusMedium paddingHorizontal paddingTopDefault paddingBottomTiny BackgroundPrimary"
				contentClasses="paddingHorizontal"
				isOpen={isOpen}
				setIsOpen={setIsOpen}
			/>
		</>
	)
}

interface IPointProps {
	value: string
	id?: number | string
	clickHandler?: (value: string, id?: number | string) => void
	size?: TextSizeType
	color?: 'TextPrimary' | 'TextAccent' | 'TextNegative'
}
const ListPoint: FC<IPointProps> = ({ value, clickHandler, size = 'ActionCallout', color = 'TextPrimary', id }) => {
	const onClick = () => {
		if (clickHandler) clickHandler(value, id)
	}
	return (
		<ButtonHeightContainer
			classNames="displayFlex centerLeftContainer justifyContentCenter cursorPointer"
			onClick={onClick}
		>
			<Text size={size} classNames={color}>{value}</Text>
		</ButtonHeightContainer>
	)
}