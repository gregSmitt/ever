import { FC } from "react";
import Introduction from './Introduction';
import { useMediaQuery, useTheme } from "@mui/material";
import { StatisticGeneral } from "Widgets/statistic-general";

export const LandingPage: FC = () => {
	const theme = useTheme();
	const matches = useMediaQuery(theme.breakpoints.up('md'))
	const mainContainerStyle = matches ? 'halfWidthContainer' : 'fullWidthPaddingContainer'
	return (
		<div className={`MainScreenContent ${mainContainerStyle}`}>
			<Introduction />
			<StatisticGeneral />
		</div>
	)
}

