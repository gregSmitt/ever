import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { blocksAPI, IBlocksListParams, requestsAbortConroller } from "Shared/api";
import { IDefaultFilters, IFetchBlocksResponse, IInitialState } from "../lib";

export const key = "blocks"
export const fetchBlocks = createAsyncThunk<
	IFetchBlocksResponse,
	void, {
		state: { [key]: IInitialState }
	}>(
		`${key}/fetchBlocks`,
		async (_, { getState }) => {
			requestsAbortConroller.abort()
			const state = getState()[key]
			const filters = state.filters
			let cursor = undefined
			if (state.isShowMore && state.pageInfo) {
				cursor = (filters.isASC) ? state.pageInfo.endCursor : state.pageInfo.startCursor
			}
			const workchain = filters.workchain !== null ? filters.workchain
				: filters.thread ? 0 : undefined
			const params: IBlocksListParams = {
				cursor,
				workchain,
				thread: filters.thread ?? undefined,
				minTrCount: filters.minTrCount ?? undefined,
				maxTrCount: filters.maxTrCount ?? undefined,
				startTime: filters.startTime ? filters.startTime / 1000 : undefined,
				endTime: filters.endTime ? filters.endTime / 1000 : undefined,
				isOrderBySeqNoASC: filters.isASC
			}
			if (filters.isKeyBlocks) { return (await blocksAPI.getKeyBlocks(params)).data.blockchain.key_blocks }
			return (await blocksAPI.getBlocksList(params)).data.blockchain.blocks
		}
	)
const defaultFilters: IDefaultFilters = {
	workchain: null,
	thread: null,
	minTrCount: null,
	maxTrCount: null,
	startTime: null, //=timestamp/1000
	endTime: null,
	isASC: false,
	isKeyBlocks: false
}
const initialState: IInitialState = {
	isShowMore: false,
	list: null,
	filters: defaultFilters,
	pageInfo: null
}

const slice = createSlice({
	name: key,
	initialState,
	reducers: {
		setBlocks(state, action: PayloadAction<IFetchBlocksResponse>) {
			state.list = action.payload.edges
			state.pageInfo = action.payload.pageInfo
		},
		resetFilters(state) {
			state.filters = defaultFilters
			state.list = null
		},
		setFilters(state, action: PayloadAction<Partial<IDefaultFilters>>) {
			for (const key in action.payload) {
				const prop = action.payload[key]
				if (prop !== undefined) {
					state.filters[key] = prop
					state.list = null
				}
			}
		},
		addBlocks(state, action: PayloadAction<IFetchBlocksResponse>) {
			state.list = state.list ? [...state.list, ...action.payload.edges] : state.list
			state.pageInfo = action.payload.pageInfo
		},
		showMore(state) {
			state.isShowMore = true
		}
	},
	extraReducers: (builder) => {
		builder.addCase(fetchBlocks.fulfilled, (state, action) => {
			if (state.isShowMore) {
				slice.caseReducers.addBlocks(state, action)
				state.isShowMore = false
			} else slice.caseReducers.setBlocks(state, action)
		})
		builder.addCase(fetchBlocks.rejected, () => {
			console.log("bloks loading error")
		})
	}
})
export const reducer = slice.reducer
export const { showMore, resetFilters, setFilters } = slice.actions