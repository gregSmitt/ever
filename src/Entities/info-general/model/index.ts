import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { IInitialState, IShard } from "../lib"
import { IShardHashesReponse, infoAPI } from "Shared/api"
export const key = "infoGeneral"
export interface IState {
	[key]: IInitialState
}
export const fetchShards = createAsyncThunk<IShardHashesReponse, void, { state: IState }>(
	`${key}/fetchShards`,
	async () => await infoAPI.getShardHashesList()
)

const initialState: IInitialState = {
	chains: [
		{ id: 0, sign: 0 },
		{ id: 1, sign: -1 }
	],
	shards: null
}

const slice = createSlice({
	name: key,
	initialState,
	reducers: {
		setShards(state, action: PayloadAction<IShard[] | undefined>) {
			if (action.payload) {
				state.shards = action.payload
			}
		}
	},
	extraReducers: (builder) => {
		builder.addCase(fetchShards.fulfilled, (state, action) => {
			const shards = action.payload.data.blockchain.blocks.edges[0].node.master.shard_hashes
			let count = 0;
			state.shards = shards.map(sh => ({
				id: count++,
				workchain_id: sh.workchain_id,
				shard: sh.shard,
				gen_utime: sh.descr.gen_utime,
			}))
		})
		builder.addCase(fetchShards.rejected, () => {
			console.log("info loading error")
		})
	}
})


export const reducer = slice.reducer