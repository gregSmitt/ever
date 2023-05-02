import { useMediaQuery, useTheme } from "@mui/material";
import { ButtonHeightContainer } from "Components/button-height";
import SeparatorHorizontal from "Components/separator-horizontal";
import { StatisticPoint } from "Components/statistic-point";
import { Text } from "Shared/Components/Text";
import { FC, Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { IUIStatistic } from "../model/types";
import { fetchStatistic } from "../model";
import { getStatistic } from "../model/selectors";
import { AnyAction } from "redux";

interface ILinkProps {
	href: string
	title: string
}
export interface IUIProps {
	useStatisticList: (statistic: IUIStatistic) => UITemplateType
	pointClassnames?: string;
}
export type UITemplateType = {
	id: number;
	url?: string;
	url_title?: string;
	desc: string;
	value: string;
}[]
const Block: FC<IUIProps> = ({ useStatisticList, pointClassnames }) => {
	const dispatch = useDispatch()
	const theme = useTheme()
	const matches = useMediaQuery(theme.breakpoints.down('md'))
	const statistic = useSelector(getStatistic)
	const statisticUI = useStatisticList(statistic)
	useEffect(() => {
		dispatch(fetchStatistic() as unknown as AnyAction) //* for the glory of FSD
	}, [])
	const pointsListMobile = statisticUI.map((p, i, arr) => (
		<Fragment key={p.id}>
			<StatisticPoint
				title={p.value}
				description={p.desc}
			>
				{(p.url && p.url_title) && <PageLink href={p.url} title={p.url_title} />}
			</StatisticPoint>
			{(arr.length - 1 !== i) && <SeparatorHorizontal />}
		</Fragment>
	))
	const pointsList = statisticUI
		.map((p, i, arr) => {
			if (i % 2 === 0) {
				return {
					leftPart: {
						...p,
					},
					rightPart: {
						...arr[i + 1]
					}
				}
			}
			return null
		})
		.filter(p => p)
		.map((p, i, arr) => {
			if (p) {
				return (
					<Fragment key={p.leftPart.id}>
						<div className={`displayFlex flexRow fullWidth statusCell pointClassnames ${pointClassnames}`}>
							<StatisticPoint
								title={p.leftPart.value}
								description={p.leftPart.desc}
							>
								{(p.leftPart.url && p.leftPart.url_title) &&
									<PageLink href={p.leftPart.url} title={p.leftPart.url_title} />}
							</StatisticPoint>
							{p.rightPart &&
								<StatisticPoint
									title={p.rightPart.value}
									description={p.rightPart.desc}
								>
									{(p.rightPart.url && p.rightPart.url_title) &&
										<PageLink href={p.rightPart.url} title={p.rightPart.url_title} />}
								</StatisticPoint>
							}
						</div>
						{(arr.length - 1 !== i) && <SeparatorHorizontal />}
					</Fragment>
				)
			}
			return null
		})
	if (matches) return <div>{pointsListMobile}</div>
	return <>{pointsList}</>
}


const PageLink: FC<ILinkProps> = ({ href, title }) => {
	return (
		<div className='marginTopSmall marginBottomDefault'>
			<NavLink to={href}>
				<ButtonHeightContainer>
					<Text size='MonoText' classNames='TextAccent'>{title}</Text>
				</ButtonHeightContainer>
			</NavLink>
		</div>
	)
}


export { Block }