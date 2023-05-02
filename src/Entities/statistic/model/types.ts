import {
	IBlocksStatistics,
	IAccountsStatistics,
	IDepoolsStatistics,
	IValidatorsStatistics,
	ITransactionsStatistics
} from "Shared/api";

export interface IStatistic {
	blocks: IBlocksStatistics,
	accounts: Omit<IAccountsStatistics, 'amountOnGivers'>,
	depools: IDepoolsStatistics,
	validators: IValidatorsStatistics,
	transactions: ITransactionsStatistics,
}

export interface IUIStatistic {
	accounts: {
		circulatingSupply: string
		lastDayCount: string
		totalCount: string
		totalSupply: string
	}
	blocks: {
		ratePerSecond: string
		totalCount: string
		countByCurrentValidators: string
	}
	depools: {
		activeDepoolCount: string
		totalStaked: string
	}
	transactions: {
		lastDayOrdinaryCount: string
		totalOrdinaryCount: string
	}
	validators: {
		apr: string
		rewardsPer30Days: string
		totalCount: string
		totalStaked: string
	}
}