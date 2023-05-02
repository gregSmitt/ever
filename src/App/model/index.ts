import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from 'react-redux'
import { statisticKey, statisticReducer } from "Entities/statistic";
import { blocksReducerKey, blocksReducer } from "Entities/blocks";
import { infoGeneralKey, infoGeneralReducer } from "Entities/info-general";


export const store = configureStore({
	reducer: {
		[statisticKey]: statisticReducer,
		[blocksReducerKey]: blocksReducer,
		[infoGeneralKey]: infoGeneralReducer
	}
})

export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch

export default store