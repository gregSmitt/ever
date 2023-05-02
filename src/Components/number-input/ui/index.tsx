import { FC, useState, useRef, useEffect } from "react";
import EastOutlinedIcon from '@mui/icons-material/EastOutlined';
import { Text, TextSizeType } from "Shared/Components/Text";

interface IProps {
	defaultValue?: null | number
	label?: string
	onClearHandler: (state?: number | null) => void
	onConfirmHandler: (value: number) => void
	autoFocus?: boolean
	clearTitle?: string
	isShowed?: boolean
}
export const Component: FC<IProps> = ({
	defaultValue = null,
	label,
	onClearHandler,
	onConfirmHandler,
	clearTitle = 'Clear',
	isShowed = true
}) => {
	const [state, setState] = useState<number | null>(defaultValue)
	const [inputStyle, setInputStyle] = useState<'common' | 'hover' | 'active'>('common')

	const borderStyle = inputStyle === 'common' ? 'BorderColorNeutral'
		: inputStyle === 'hover' ? 'BorderColorPrimaryAdditional'
			: 'BorderColorAccent'
	const isInputActive = inputStyle === 'active'
	const inputTextSize: TextSizeType = 'ParagraphText'

	const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		const number = Number(e.target.value)
		if (isNaN(number)) e.preventDefault()
		else setState(number)
	}
	const arrowOnClickHandler = () => {
		const value = state ?? 0
		onConfirmHandler(value)
	}
	const clearOnClick = () => {
		onClearHandler(state)
		setState(null)
	}
	const inputMouseEnterHandler = () => {
		if (inputStyle !== 'active') {
			setInputStyle('hover')
		}
	}
	const inputMouseLeaveHandler = () => {
		if (inputStyle !== 'active') {
			setInputStyle('common')
		}
	}
	const onFocusHandler = () => {
		setInputStyle('active')
	}
	const onBlureHandler = () => {
		setInputStyle('common')
	}

	const inputElement = useRef<HTMLInputElement>(null);
	useEffect(() => {
		if (inputElement.current) {
			if (isShowed) inputElement.current.focus();
			else inputElement.current.blur();
		}
	}, [isShowed]);
	return (
		<div onMouseEnter={inputMouseEnterHandler} onMouseLeave={inputMouseLeaveHandler} className="flex1">
			<Text size="ParagraphLabel" classNames="TextTertiary">
				{(isInputActive || Boolean(state) || state === 0) ? label : ''}
			</Text>
			<div
				className={`paddingTopTiny paddingBottomSmall displayFlex flexRow alignCenter borderBottom borderSolid ${borderStyle}`}
			>
				<div className="screenContainer">
					<input
						className={`displayFlex TextPrimary BackgroundPrimary fullWidth ${inputTextSize} UITextInput`}
						placeholder={!isInputActive ? label : ''}
						onChange={onChangeHandler}
						onFocus={onFocusHandler}
						onBlur={onBlureHandler}
						ref={inputElement}
						value={state ?? ''}
					/>
				</div>
				<div
					onClick={arrowOnClickHandler}
					className="cursorPointer ActionImage" style={{ fill: 'rgb(0, 122, 184)' }}
				>
					<EastOutlinedIcon className="MUI Img" />
				</div>
			</div>
			<div onClick={clearOnClick} className="displayFlex flexColumn cursorPointer">
				<div className="displayFlex centerLeftContainer marginTopSmall marginBottomSmall">
					<Text size='ParagraphNote' classNames="TextAccent flexGrow0">{clearTitle}</Text>
				</div>
			</div>
		</div>
	)
}