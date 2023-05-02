import { infoGeneralGetShards } from "Entities/info-general";
import { IUIStatistic, Statistic, StatisticUITemplateType } from "Entities/statistic";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

interface IDataProps {
	statisticPointClassnames?: string
}
export const Data: FC<IDataProps> = ({ statisticPointClassnames }) => {
	const shardsCount = useSelector(infoGeneralGetShards)?.length
	const useStatisticList = (statistic: IUIStatistic) => {
		const { t } = useTranslation()
		return [
			{
				id: 0,
				desc: t('blocks_amount', { ns: 'landing', defaultValue: 'Total blocks' }),
				value: statistic.blocks.totalCount
			},
			{
				id: 1,
				desc: t('blocks_avg', { ns: 'landing', defaultValue: 'Average block time' }),
				value: statistic.blocks.ratePerSecond !== '-'
					? statistic.blocks.ratePerSecond + ' ' + t('time_sec')
					: '-'
			},
			{
				id: 2,
				desc: t('Blocks by current validators'),
				value: statistic.blocks.countByCurrentValidators !== '-'
					? statistic.blocks.countByCurrentValidators
					: '-'
			},
			{
				id: 3,
				desc: t('Workchain shards'),
				value: shardsCount !== undefined
					? `${shardsCount}`
					: '-'
			}
		]
	}
	return (
		<>
			<Statistic useStatisticList={useStatisticList} pointClassnames={statisticPointClassnames} />
		</>
	)
}