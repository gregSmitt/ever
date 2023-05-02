import './index.scss'
import { TextField } from "@mui/material"
import { FC } from "react"
import searchImg from "../assets/ico-search.png"

interface SearchInputProps {
	placeholder: string
	classNames?: string
	imgClassNames?: string
}

export const SearchInput: FC<SearchInputProps> = ({ placeholder, classNames, imgClassNames }) => {
	return (
		<div className={`SearchField ${classNames}`}>
			<img src={searchImg} alt="search" className={imgClassNames} />
			<TextField
				className="MUI"
				InputProps={{ inputProps: { className: 'TextPrimary' } }}
				placeholder={placeholder}
				autoComplete="off"
				id='mui-1'
				fullWidth={true}
			/>
		</div>
	)
}