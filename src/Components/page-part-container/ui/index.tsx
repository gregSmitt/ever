import { FC, ReactNode } from "react";
import { useMediaQuery, useTheme } from '@mui/material';

interface IContainerProps {
	children: ReactNode
	marginTop?: string
}

export const Container: FC<IContainerProps> = ({ children, marginTop = 'marginTopDefault' }) => {
	const theme = useTheme()

	const biggerThanMD = useMediaQuery(theme.breakpoints.up('md'))
	const classNames = biggerThanMD ? `halfWidthContainer ${marginTop}`
		: `fullWidthPaddingContainer ${marginTop}`

	return <div className={classNames}>
		{children}
	</div>
}