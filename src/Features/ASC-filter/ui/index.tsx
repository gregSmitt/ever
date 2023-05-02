import { FC, useState } from 'react'
import arrow from 'Shared/assets/img/arrow-down.png'
import './style.scss'

interface IFilter {
	disable?: boolean
	isASC?: boolean
	setASC?: () => void
}
export const SortButton: FC<IFilter> = ({ disable = false, isASC = false, setASC }) => {
	const disableClass = disable ? ' disabled' : ''
	const rotateClass = isASC ? '' : ' rotate'
	return (
		<div className="defaultCellHeight displayFlex alignItemsCenter">
			<div className="SortSwitcher centerContainer icon" data-testid="sortingButton">
				<img
					src={arrow}
					alt="sort"
					className={`icon cursorPointer${rotateClass}${disableClass}`}
					onClick={setASC}
				/>
			</div>
		</div>
	)
}