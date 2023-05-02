import { createSelector } from 'reselect'
import { DefaultListType, IInitialState } from '../lib'
import { key } from '../model'
import { IBlocksListPoint } from 'Shared/api'
interface IState {
	[key]: IInitialState
}
const getState = (state: IState) => state[key]
export const selectFIlters = (state: IState) => state[key].filters
export const selectIsShowMore = (state: IState) => state[key].isShowMore
export const getList = createSelector<[(state: IState) => IInitialState], IBlocksListPoint[] | null>(
	[getState],
	(state: IInitialState) => {
		return state.list === null
			? null
			: state.filters.isASC
				? state.list.map(el => el.node).sort((a, b) => a.gen_utime - b.gen_utime)
				: state.list.map(el => el.node).sort((a, b) => b.gen_utime - a.gen_utime)
	}

)