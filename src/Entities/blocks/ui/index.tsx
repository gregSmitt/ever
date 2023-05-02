import { useSelector } from "react-redux"
import { FC } from "react";
import { getList } from "../model/selectors";
import { Text } from "Shared/Components/Text";
import { ListPoint } from "Components/list-point";
import { getHHMMSSString } from "Shared/helpers/date";
import { declOfNumRu } from "Shared/helpers/strings";
import { NavLink } from "react-router-dom";
import { PageSpinner } from "Components/page-spinner";

interface IProps {
	onCopy?: () => void
	ruSign: string
	curLengSign: string
}
export const Component: FC<IProps> = ({ onCopy, ruSign, curLengSign }) => {
	const list = useSelector(getList)
	if (list) return (
		<>
			{list?.map(el => {
				const time = getHHMMSSString(el.gen_utime * 1000)
				let transactionWord = 'transactions'
				if (el.tr_count) {
					if (curLengSign === ruSign) {
						transactionWord = declOfNumRu(el.tr_count, ['транзакция', 'транзакции', 'транзакций'])
					} else {
						transactionWord = el.tr_count > 1 ? 'transactions' : 'transaction'
					}
				}
				return (
					<NavLink to={`/blocks/blockDetails?id=${el.hash}`} key={el.hash}>
						<ListPoint
							onCopy={onCopy}
							title={el.seq_no}
							copiedValue={el.seq_no}
							LeftBottomComponent={
								<Text
									size="ParagraphFootnote"
									classNames="TextSecondary"
								>
									{`${el.workchain_id}:${el.shard.split('').slice(0, 2).join('')}... | v${el.gen_software_version}`}
								</Text>
							}
							RightTopComponent={
								<Text
									size="ParagraphNote"
									classNames="TextPrimary"
								>
									{time}
								</Text>
							}
							RightBottomComponent={
								el.tr_count
									? <Text
										size="ParagraphFootnote"
										classNames="TextSecondary"
									>
										{el.tr_count} {transactionWord}
									</Text>
									: null
							}
						/>
					</NavLink>
				)
			})}
		</>
	)
	return (
		<div className="UIDetailsButton">
			<PageSpinner />
		</div>
	)
}