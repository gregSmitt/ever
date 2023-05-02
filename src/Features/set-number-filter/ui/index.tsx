import { MiniTriggerButton } from "Components/mini-trigger"
import { NumberInput } from "Components/number-input";
import { Popover } from "Shared/Components/Popover"
import { FC, ReactNode, useState } from "react";

interface IFilterProps {
	children: ReactNode
	value: number | null //from redux-state
	setValue: (value: number | null) => void //to redux-state
}
export const Filter: FC<IFilterProps> = ({ children, value, setValue }) => {
	const [isOpen, setIsOpen] = useState(false)
	const onClearHandler = () => {
		setIsOpen(false)
		setValue(null)
	}
	const onConfirmHandler = (value: number) => {
		setIsOpen(false)
		setValue(value)
	}
	return (
		<div>
			<Popover
				TriggerComponent={
					<MiniTriggerButton isActive={Boolean(value)}>
						{value ? `${children}: ${value}` : children}
					</MiniTriggerButton>
				}
				ContentComponent={
					<NumberInput
						onClearHandler={onClearHandler}
						onConfirmHandler={onConfirmHandler}
						defaultValue={value}
						label="Min transactions"
						isShowed={isOpen}
					/>
				}
				isOpen={isOpen}
				setIsOpen={setIsOpen}
				contentClasses="Tag paddingBottomSmall paddingDefault BackgroundPrimary"
				contentClassesMobile="displayFlex flexColumn borderRadiusMedium paddingHorizontal paddingTopDefault paddingBottomTiny BackgroundPrimary"
			/>
		</div>
	)
}