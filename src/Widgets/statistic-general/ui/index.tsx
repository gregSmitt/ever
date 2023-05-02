import { IUIStatistic, Statistic } from "Entities/statistic"
import { internalLinks } from "Entities/web"
import { FC } from "react"
import { useTranslation } from "react-i18next"


const useStatisticList = (statistic: IUIStatistic) => {
	const { t } = useTranslation()
	return [
		{
			id: 0,
			url: internalLinks.blocks,
			url_title: t('blocks_amount', { ns: 'landing', defaultValue: 'Total blocks' }),
			desc: t('blocks_amount_desc', { ns: 'landing', defaultValue: 'Total number of blocks in the masterchain and in all shards' }),
			value: statistic.blocks.totalCount
		},
		{
			id: 1,
			url: internalLinks.blocks,
			url_title: t('blocks_avg', { ns: 'landing', defaultValue: 'Average block time' }),
			desc: t('blocks_avg_desc', { ns: 'landing', defaultValue: 'Average time for a new block to appear on the network' }),
			value: statistic.blocks.ratePerSecond !== '-'
				? statistic.blocks.ratePerSecond + ' ' + t('time_sec')
				: '-'
		},
		{
			id: 2,
			url: internalLinks.accounts,
			url_title: t('accounts_supply', { ns: 'landing', defaultValue: 'Supply' }),
			desc: t('accounts_supply_desc', { ns: 'landing', defaultValue: 'Total balance of all accounts in the network' }),
			value: statistic.accounts.totalSupply
		},
		{
			id: 3,
			url: internalLinks.accounts,
			url_title: t('accounts_circulating', { ns: 'landing', defaultValue: 'Circulating supply' }),
			desc: t('accounts_circulating_desc', { ns: 'landing', defaultValue: 'Total supply minus balances on Treasury accounts' }),
			value: statistic.accounts.circulatingSupply
		},
		{
			id: 4,
			url: internalLinks.accounts,
			url_title: t('accounts_total', { ns: 'landing', defaultValue: 'Total accounts' }),
			desc: t('accounts_total_desc', { ns: 'landing', defaultValue: 'Total number of accounts in the network' }),
			value: statistic.accounts.totalCount
		},
		{
			id: 5,
			url: internalLinks.accounts,
			url_title: t('accounts_new24h', { ns: 'landing', defaultValue: 'New accounts 24h' }),
			desc: t('accounts_new24h_desc', { ns: 'landing', defaultValue: 'New accounts in the last 24 hours' }),
			value: statistic.accounts.lastDayCount
		},
		{
			id: 6,
			url: internalLinks.depools,
			url_title: t('depools_active', { ns: 'landing', defaultValue: 'Active DePools' }),
			desc: t('depools_active_desc', { ns: 'landing', defaultValue: 'Number of DePools with non-zero stakes' }),
			value: statistic.depools.activeDepoolCount
		},
		{
			id: 7,
			url: internalLinks.depools,
			url_title: t('depools_stakes', { ns: 'landing', defaultValue: 'DePools stakes' }),
			desc: t('depools_stakes_desc', { ns: 'landing', defaultValue: 'Total amount of stakes in all DePools' }),
			value: statistic.depools.totalStaked
		},
		{
			id: 8,
			url: internalLinks.validators,
			url_title: t('validators_total', { ns: 'landing', defaultValue: 'Validators' }),
			desc: t('validators_total_desc', { ns: 'landing', defaultValue: 'Number of current validators' }),
			value: statistic.validators.totalCount
		},
		{
			id: 9,
			url: internalLinks.validators,
			url_title: t('validators_staked', { ns: 'landing', defaultValue: 'Total staked' }),
			desc: t('validators_staked_desc', { ns: 'landing', defaultValue: 'The current balance of the Elector contract, which includes the stakes of validators in the last cycles' }),
			value: statistic.validators.totalStaked
		},
		{
			id: 10,
			url: internalLinks.validators,
			url_title: t('validators_year_rewards', { ns: 'landing', defaultValue: 'Rewards yield p.a.' }),
			desc: t('validators_year_rewards_desc', { ns: 'landing', defaultValue: 'Annualized rate of return on the current cycle stakes' }),
			value: statistic.validators.apr !== '-'
				? statistic.validators.apr + '%'
				: '-'
		},
		{
			id: 11,
			url: internalLinks.validators,
			url_title: t('validators_rewards_30_days', { ns: 'landing', defaultValue: 'Total rewards 30 days' }),
			desc: t('validators_rewards_30_days_desc', { ns: 'landing', defaultValue: 'Total amount of validators rewards in the last 30 days' }),
			value: statistic.validators.rewardsPer30Days
		},
		{
			id: 12,
			url: internalLinks.transactions,
			url_title: t('transactions_total', { ns: 'landing', defaultValue: 'Ordinary transactions total' }),
			desc: t('transactions_total_desc', { ns: 'landing', defaultValue: 'Total number of transactions in the network without tick-tock transactions' }),
			value: statistic.transactions.totalOrdinaryCount
		},
		{
			id: 13,
			url: internalLinks.transactions,
			url_title: t('transactions_total24h', { ns: 'landing', defaultValue: 'Ordinary transactions 24h' }),
			desc: t('transactions_total24h_desc', { ns: 'landing', defaultValue: 'New transactions in the last 24 hours without tick-tock transactions' }),
			value: statistic.transactions.lastDayOrdinaryCount
		},
	]
}
const Widjet: FC = () => {
	return <Statistic useStatisticList={useStatisticList}></Statistic>
}
export { Widjet }