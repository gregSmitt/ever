export { getStatistic as allStatisticSelector } from './model/selectors';
export type { IUIStatistic } from './model/types';
export type {
	IUIProps as IStatisticUIProps,
	UITemplateType as StatisticUITemplateType
} from './ui'
export { Block as Statistic } from './ui'
export {
	key as statisticKey,
	reducer as statisticReducer,
	fetchStatistic as fetchAllStatistic
} from "./model"
