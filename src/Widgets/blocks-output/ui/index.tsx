import { AbsoluteAlertMessage } from "Components/absolute-alert";
import { ListHeaderLayout } from "Components/list-header";
import { getBlocksList } from "Entities/blocks";
import { BlocksList, getBlocksFilters, setBlocksFilters, showMoreBlocks, } from "Entities/blocks";
import languages from "Entities/languages";
import { LIstSortButton } from "Features/ASC-filter";
import { ShowMoreButton } from "Features/show-more-button";
import { Text } from "Shared/Components/Text";
import i18next from "i18next";
import { FC, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";

export const Output: FC = () => {
	const { t } = useTranslation()
	const dispatch = useDispatch()
	const [alrtOpen, setAlertOpen] = useState(false)
	const isASC = useSelector(getBlocksFilters).isASC
	const isBlocks = useSelector(getBlocksList) !== null
	const setASC = () => dispatch(setBlocksFilters({ isASC: !isASC }))

	const showMoreCLickHandler = () => dispatch(showMoreBlocks())

	const copyHandle = () => {
		setAlertOpen(true)
	}
	useEffect(() => {
		if (alrtOpen) {
			const closeAlert = setInterval(() => {
				setAlertOpen(false)
				clearTimeout(closeAlert)
			}, 4000)
		}
	}, [alrtOpen])
	return (
		<div className="EVERList fullWidth container">
			<ListHeaderLayout nodeList={[{
				id: 1,
				Component: <LIstSortButton
					isASC={isASC}
					setASC={setASC}
				/>
			}]}>
				<Text size="TitleMedium" classNames="TextPrimary">{t('recent')}</Text>
			</ListHeaderLayout>
			<BlocksList
				ruSign={languages.list[1].sign}
				curLengSign={i18next.language}
				onCopy={copyHandle}
			/>
			{isBlocks &&
				<ShowMoreButton onClick={showMoreCLickHandler} classNames="marginTopDefault" />
			}
			<AbsoluteAlertMessage open={alrtOpen} text={t('on_copy_text')} />
		</div>
	)
}