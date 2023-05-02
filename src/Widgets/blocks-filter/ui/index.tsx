import { TextFilterSelect } from "Features/select-text-filter";
import { FC, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { infoGeneralGetChains, infoGeneralGetShards } from "Entities/info-general";
import { useDispatch, useSelector } from "react-redux";
import { fetchBlocksList, getBlocksFilters, getIsShowMoreBlocks, resetBlocksFilters, setBlocksFilters } from "Entities/blocks";
import { AnyAction } from "redux";
import { FiltersLayout } from "Components/filters-layout";
import { TimeSelect } from "Features/select-time";
import { NumberFilter } from "Features/set-number-filter";
import { ActionMiniButton } from "Components/action-mini-button";
import { externalLinks } from "Entities/web"
import { MiniTriggerButton } from "Components/mini-trigger";

export const Widget: FC = () => {
	const { t } = useTranslation()
	const dispatch = useDispatch()
	const filters = useSelector(getBlocksFilters)
	const isShowMore = useSelector(getIsShowMoreBlocks)

	const chainsList = useSelector(infoGeneralGetChains).map(el => ({
		...el,
		value: `${el.sign}`
	}))
	const shardsList = useSelector(infoGeneralGetShards)?.map(el => ({
		...el,
		value: el.workchain_id + ':' + el.shard.split('').slice(0, 2).join('') + '...'
	}))
	const getShardButtonTitle = (shard: string | null) => {
		return shardsList?.find(el => el.shard === shard)?.value
	}
	const reset = () => {
		dispatch(resetBlocksFilters())
	}
	const setMaxTrCount = (value: number | null) => {
		dispatch(setBlocksFilters({ maxTrCount: value }))
	}
	const setMinTrCount = (value: number | null) => {
		dispatch(setBlocksFilters({ minTrCount: value }))
	}
	const setStartTime = (value: number | null) => {
		dispatch(setBlocksFilters({ startTime: value }))
	}
	const setEndTime = (value: number | null) => {
		dispatch(setBlocksFilters({ endTime: value }))
	}
	const setKeyBlocks = () => {
		dispatch(setBlocksFilters({ isKeyBlocks: !filters.isKeyBlocks }))
	}
	const setChain = (value: string | null, id?: number | string) => {
		const sign = chainsList.find(el => el.id === id)?.sign
		if (sign !== undefined) {
			dispatch(setBlocksFilters({ workchain: sign }))
		}
		if (value === null && id === undefined) {
			dispatch(setBlocksFilters({ workchain: null }))
		}
	}
	const setShard = (value: string | null, id?: number | string) => {
		if (shardsList) {
			const shard = shardsList.find(el => el.id === id)?.shard
			if (shard !== undefined) {
				dispatch(setBlocksFilters({ thread: shard }))
			}
			if (value === null && id === undefined) {
				dispatch(setBlocksFilters({ thread: null }))
			}
		}
	}

	useEffect(() => {
		if (isShowMore) {
			dispatch(fetchBlocksList() as unknown as AnyAction)
		}
	}, [isShowMore, dispatch])
	useEffect(() => {
		dispatch(fetchBlocksList() as unknown as AnyAction) //* FOR FSD ARRRGHHHHHHH!
	}, [dispatch, filters])


	return <FiltersLayout NodeList={[
		{
			id: 0,
			component: <TextFilterSelect
				buttonText={t('chain')}
				list={chainsList}
				setValue={setChain}
				value={filters.workchain !== null ? `${filters.workchain}` : null}
			/>
		},
		{
			id: 1,
			component: <MiniTriggerButton
				isActive={filters.isKeyBlocks}
				onClick={setKeyBlocks}
			>
				{t('key_block')}
			</MiniTriggerButton>
		},
		{
			id: 2,
			component: <>
				{shardsList && <TextFilterSelect
					buttonText={t('shard')}
					list={shardsList}
					setValue={setShard}
					value={getShardButtonTitle(filters.thread) ?? null}
				/>}
			</>
		},
		{
			id: 3,
			component: <TimeSelect
				value={filters.startTime}
				setValue={setStartTime}
			/>
		},
		{
			id: 4,
			component: <TimeSelect
				value={filters.endTime}
				setValue={setEndTime}
				isStart={false}
			/>
		},
		{
			id: 5,
			component: <NumberFilter
				value={filters.minTrCount}
				setValue={setMinTrCount}
			>
				{t('min_txs')}
			</NumberFilter>
		},
		{
			id: 6,
			component: <NumberFilter
				value={filters.maxTrCount}
				setValue={setMaxTrCount}
			>
				{t('max_txs')}
			</NumberFilter>
		},
		{
			id: 7,
			component: <ActionMiniButton onClick={reset}>
				{t('reset')}
			</ActionMiniButton>
		},
		{
			id: 8,
			component: <ActionMiniButton href={externalLinks.everMainnetPlayground}>
				{t('playground')}
			</ActionMiniButton>
		}
	]} />
}