export {
	selectFIlters as getBlocksFilters,
	selectIsShowMore as getIsShowMoreBlocks,
	getList as getBlocksList
} from './model/selectors';
export { Component as BlocksList } from "./ui";
export {
	reducer as blocksReducer,
	key as blocksReducerKey,
	setFilters as setBlocksFilters,
	resetFilters as resetBlocksFilters,
	fetchBlocks as fetchBlocksList,
	showMore as showMoreBlocks
} from "./model";



