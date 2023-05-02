import { ListPoint } from "Components/list-point";
import { HalfWidthContainer } from "Components/page-part-container";
import { BlocksList } from "Entities/blocks";
import { MiniButton } from "Shared/Components/MiniButton";
import { Text } from "Shared/Components/Text";
import { BlocksFilter } from "Widgets/blocks-filter";
import { BlocksOutput } from "Widgets/blocks-output";
import { BlocksStatistic } from "Widgets/blocks-statistic";
import { FC } from "react";
import { useTranslation } from "react-i18next";

export const Page: FC = () => {
	const { t } = useTranslation()
	return (
		<>
			<HalfWidthContainer>
				<BlocksFilter />
			</HalfWidthContainer>
			<HalfWidthContainer marginTop="marginTopSpacious">
				<Text size='TitleHuge' classNames="TextPrimary marginBottomMedium">
					{t('blocks')}
				</Text>
			</HalfWidthContainer>
			<div className="halfWidthContainer">
				<BlocksStatistic
					statisticPointClassnames="marginTopDefault"
				/>
			</div>
			<HalfWidthContainer marginTop="marginTopHuge">
				<BlocksOutput />
			</HalfWidthContainer>
		</>)
}