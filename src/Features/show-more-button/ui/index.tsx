import { ButtonHeightContainer } from "Components/button-height";
import { Text } from "Shared/Components/Text";
import { FC } from "react";
import { useTranslation } from "react-i18next";

interface IButtonProps {
	onClick: () => void
	classNames?: string
}
export const Button: FC<IButtonProps> = ({ onClick, classNames = '' }) => {
	const { t } = useTranslation()
	return (
		<ButtonHeightContainer onClick={onClick} classNames={`cursorPointer alignSelfCenter ${classNames}`}>
			<Text size="Action" classNames="flexGrow0 TextAccent">
				{t('Load more 25')}
			</Text>
		</ButtonHeightContainer>
	)
}