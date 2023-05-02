import { Popover } from "Shared/Components/Popover";
import { FC, useState } from "react";
import { DataPicker } from "Components/data-picker";
import { getDateString } from "Shared/helpers/date";
import './style.scss'
import { MiniTriggerButton } from "Components/mini-trigger";
import { useTranslation } from "react-i18next";

interface ISelectProps {
	isStart?: boolean
	value: number | null
	setValue: (value: number | null) => void
}
export const Select: FC<ISelectProps> = ({ isStart = true, value, setValue }) => {
	const { t } = useTranslation()
	const now = new Date()
	const defaultValue = isStart
		? new Date(now.getFullYear(), now.getMonth(), now.getDate()).valueOf()
		: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, -1).valueOf()
	let openText = isStart
		? value ? getDateString(value) + ' 🡢 ' : ' 🡢 '
		: value ? ' 🡠 ' + getDateString(value) : ' 🡠 '

	const [isOpen, setIsOpen] = useState(false)
	const closeHandler = () => {
		setIsOpen(false)
	}
	const clearHandler = () => {
		setValue(null)
		setIsOpen(false)
	}
	const setConfirmHandler = (value: number) => {
		setValue(value)
		setIsOpen(false)
	}

	return (
		<>
			<Popover
				TriggerComponent={
					<MiniTriggerButton isActive={Boolean(value)}>
						{openText}
					</MiniTriggerButton>
				}
				ContentComponent={
					<DataPicker
						defaultValue={value ?? defaultValue}
						onClose={closeHandler}
						onConfirm={setConfirmHandler}
						onClear={clearHandler}
						cancelTitle={t('cancel')}
						confirmTitle={t('submit')}
						clearTitle={t('clear')}
					/>
				}
				contentClasses="Tag"
				contentClassesMobile="displayFlex flexColumn paddingHorizontal paddingTopDefault paddingBottomTiny BackgroundPrimary"
				isOpen={isOpen}
				setIsOpen={setIsOpen}
			/>
		</>
	)
}
