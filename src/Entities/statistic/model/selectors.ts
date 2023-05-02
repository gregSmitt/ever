import { createSelector } from "@reduxjs/toolkit";
import { IStatistic, IUIStatistic } from "./types";
import { devideDefaultPoints, splitNumberBySpaces } from "Shared/helpers/math";
import { key } from '../model'
interface Istate {
	[key]: IStatistic
}

export const selectStatisticsData = (state: Istate) => state[key]
export const getStatistic = createSelector<[(state: Istate) => IStatistic], IUIStatistic>(
	[selectStatisticsData],
	(state: IStatistic) => {
		return {
			accounts: {
				circulatingSupply: splitAndDevide(state.accounts.circulatingSupply),
				lastDayCount: splitString(state.accounts.lastDayCount),
				totalCount: splitString(state.accounts.totalCount),
				totalSupply: splitAndDevide(state.accounts.totalSupply)
			},
			blocks: {
				ratePerSecond: state.blocks.ratePerSecond ? floatToString((1 / state.blocks.ratePerSecond), 2)
					: '-',
				totalCount: splitString(state.blocks.totalCount),
				countByCurrentValidators: splitString(state.blocks.countByCurrentValidators)
			},
			validators: {
				apr: state.validators.apr ? floatToString(state.validators.apr * 100, 1) : '-',
				rewardsPer30Days: splitAndDevide(state.validators.rewardsPer30Days),
				totalCount: splitString(state.validators.totalCount),
				totalStaked: splitAndDevide(state.validators.totalStaked)
			},
			transactions: {
				lastDayOrdinaryCount: splitString(state.transactions.lastDayOrdinaryCount),
				totalOrdinaryCount: splitString(state.transactions.totalOrdinaryCount)
			},
			depools: {
				activeDepoolCount: splitString(state.depools.activeDepoolCount),
				totalStaked: splitAndDevide(state.depools.totalStaked)
			}
		}
	}
)

function floatToString(num: number, afterDot: number = 1) {
	return `${parseFloat(num.toFixed(afterDot))}`.split('.').join(',')
}
function splitAndDevide(str: string | number | null) {
	if (str === null) return '-'
	return splitNumberBySpaces(devideDefaultPoints(Number(str)))
}
function splitString(str: string | number | null) {
	if (str === null) return '-'
	return splitNumberBySpaces(Number(str))
}