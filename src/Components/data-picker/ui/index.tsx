import dayjs from 'dayjs'
import { StaticDateTimePicker } from '@mui/x-date-pickers/StaticDateTimePicker'
import { FC, useState } from "react"
import './style.scss'
import { ButtonHeightContainer } from 'Components/button-height'
import { Text } from 'Shared/Components/Text'

interface IPickerProps {
	// value: number
	// setValue: (value: number) => void
	onClose: () => void
	onClear?: () => void
	onConfirm: (value: number) => void
	defaultValue: number
	cancelTitle?: string
	clearTitle?: string
	confirmTitle?: string
}

export const Picker: FC<IPickerProps> = ({
	onClose,
	onClear,
	onConfirm,
	defaultValue,
	cancelTitle = 'Cancel',
	clearTitle = 'Clear',
	confirmTitle = 'Submit',
}) => {
	const mode = document.documentElement.clientHeight > 668 ? "mobile" : "desktop"
	const [value, setValue] = useState(defaultValue)
	const clearHandler = () => {
		if (onClear) onClear()
		setValue(defaultValue)
	}
	const confirmHandler = () => {
		onConfirm(value)
	}
	const onChangeHandler = (value: dayjs.Dayjs | null) => {
		setValue((value?.unix() ?? defaultValue / 1000) * 1000)
	}
	return (
		<div className='DateTimePicker MUI'>
			<div className='DateTimePicker__header'>
				<Button onClick={onClose}>{cancelTitle}</Button>
				<Button onClick={clearHandler}>{clearTitle}</Button>
				<Button onClick={confirmHandler}>{confirmTitle}</Button>
			</div>
			<StaticDateTimePicker
				className='LightTheme'
				ampm={false}
				views={['year', 'month', 'day', 'hours', 'minutes', 'seconds']}
				minDateTime={dayjs('2020-05-01T03:00:00')}
				onChange={onChangeHandler}
				value={dayjs(value)}
				displayStaticWrapperAs={mode}
			/>
		</div>
	);
}
interface IButtonProps {
	children: string
	onClick: () => void
}
const Button: FC<IButtonProps> = ({ children, onClick }) => {
	return (
		<ButtonHeightContainer classNames='cursorPointer header__button' onClick={onClick}>
			<Text size='Action' classNames='TextAccent'>{children}</Text>
		</ButtonHeightContainer>
	)
}