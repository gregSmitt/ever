import { externalLinks } from "Entities/web";
import { Text } from "Shared/Components/Text";
import { FC } from "react";
import { useTranslation } from "react-i18next";

const Introduction: FC = () => {
	const { t } = useTranslation()
	return (
		<>
			<div className='marginTopSpacious marginBottomDefault'>
				<Text size='TitleHuge' classNames="TextPrimary">Everscale Blockchain Explorer</Text>
			</div>
			<Text size='ParagraphNote' classNames='TextSecondary description'>
				{t('intro_part_1', {
					ns: 'landing',
					defaultValue: 'This Everscale Explorer by EverX has been developed based upon'
				})}&nbsp;
				<ExtLink
					href={externalLinks.everOSGetStarted}
					title={t('intro_part_2_ever_link', { ns: 'landing', defaultValue: 'EVER OS' })}
				/>
				&nbsp;{t('intro_part_3', { ns: 'landing', defaultValue: 'technology. See API documentation' })}&nbsp;
				<ExtLink
					href={externalLinks.everOSAPI}
					title={t('intro_part_4_api_link', { ns: 'landing', defaultValue: 'here' })}
				/>.
			</Text>
		</>
	)
}

interface ILinkProps {
	href: string
	title: string
}

const ExtLink: FC<ILinkProps> = ({ href, title }) => {
	return <a href={href}><Text size='ParagraphNote' classNames='TextAccent'>{title}</Text></a>
}

export default Introduction