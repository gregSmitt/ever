import { ButtonHeightContainer } from "Components/button-height";
import { externalLinks, internalLinks } from "Entities/web";
import { Text } from "Shared/Components/Text";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";

const Footer: FC = () => {
	const { t } = useTranslation()
	return (
		<div className="bigCellHeight paddingHorizontal fullWidth displayFlex alignItemsCenter">
			<div className="centerLeftContainer flex1">
				<div className="centerLeftContainer displayFlex">
					<NavLink to={internalLinks.legal}>
						<FooterText>{t('legal')}</FooterText>
					</NavLink>
					<Text size='TinyMedium' classNames='TextSecondary'>&nbsp;&nbsp;·&nbsp;&nbsp;</Text>
					<a href={externalLinks.everOSAPI}>
						<FooterText>API</FooterText>
					</a>
				</div>
			</div>
			<a href={externalLinks.everX} className="alignEnd">
				<FooterText>2018–2022 © EverX</FooterText>
			</a>
		</div>
	)
}
interface ITextProps {
	children: string
}
const FooterText: FC<ITextProps> = ({ children }) => {
	return (
		<ButtonHeightContainer>
			<Text size='ParagraphLabel' classNames='TextSecondary'>{children}</Text>
		</ButtonHeightContainer>
	)
}

export { Footer }