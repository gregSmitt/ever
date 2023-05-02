import { IBlocksListPoint, IPageInfo } from "Shared/api"

export interface IFetchBlocksResponse {
	edges: {
		node: IBlocksListPoint
	}[],
	pageInfo: IPageInfo
}
export interface IDefaultFilters {
	[key: string]: number | string | boolean | null
	workchain: number | null
	thread: string | null
	minTrCount: number | null
	maxTrCount: number | null
	startTime: number | null
	endTime: number | null
	isASC: boolean
	isKeyBlocks: boolean
}
export interface IDefaulBlocklistPoint {
	node: IBlocksListPoint
}
export type DefaultListType = null | IDefaulBlocklistPoint[]
export interface IInitialState {
	isShowMore: boolean
	list: DefaultListType
	filters: IDefaultFilters,
	pageInfo: IPageInfo | null
}