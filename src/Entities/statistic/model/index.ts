import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IStatistic } from "./types";
import { statisticsAPI } from "Shared/api";

export const key = "statistic"
export const fetchStatistic = createAsyncThunk(
	`${key}/fetchStatistic`,
	async () => (await statisticsAPI.getAllData()).data.statistics
)

const initialSate: IStatistic = {
	blocks: {
		totalCount: null,
		ratePerSecond: null,
		countByCurrentValidators: null
	},
	accounts: {
		totalCount: null,
		totalSupply: null,
		circulatingSupply: null,
		lastDayCount: null
	},
	depools: {
		activeDepoolCount: null,
		totalStaked: null
	},
	validators: {
		totalCount: null,
		totalStaked: null,
		apr: null,
		rewardsPer30Days: null
	},
	transactions: {
		lastDayOrdinaryCount: null,
		totalOrdinaryCount: null
	}
}

const slice = createSlice({
	name: key,
	initialState: initialSate,
	reducers: {
		setState(state, action: PayloadAction<IStatistic>) {
			state.accounts = action.payload.accounts
			state.blocks = action.payload.blocks
			state.depools = action.payload.depools
			state.transactions = action.payload.transactions
			state.validators = action.payload.validators
		}
	},
	extraReducers: (builder) => {
		builder.addCase(fetchStatistic.fulfilled, (state, action) => {
			slice.caseReducers.setState(state, action)
		})
		builder.addCase(fetchStatistic.rejected, () => {
			console.log("statistic's loading error")
		})
	}
})

export const reducer = slice.reducer