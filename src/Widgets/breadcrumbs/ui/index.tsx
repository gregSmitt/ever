import { ButtonHeightContainer } from 'Components/button-height';
import { Text } from 'Shared/Components/Text';
import { FC, useState, useEffect } from 'react'
import { NavLink, useLocation } from 'react-router-dom';
import arrowLeft from 'Shared/assets/img/ico-arrow-left.png'
import './style.scss'
import { useTranslation } from 'react-i18next';
import { navigationLinks } from 'Features/navigation-select';
import { internalLinks } from 'Entities/web';


export const Breadcrumbs: FC = () => {
	const { t } = useTranslation()
	const location = useLocation()
	const [history, setHistory] = useState<string[]>([])
	const currentHash = location.pathname
	useEffect(() => {
		if (history[history.length - 1] !== currentHash) {
			setHistory([...history, currentHash])
		}
	}, [currentHash])

	const mainHash = internalLinks.main
	const prevHash: string | undefined = history[history.length - 2]
	const prevPageSign = navigationLinks.find(l => prevHash === l.hash)?.translateSign

	const crumbClickHandler = () => {
		setHistory(history.slice(0, history.length - 1))
	}

	if (!prevHash && currentHash === mainHash) return null
	return (
		<div className="BottomNavigationBar bigCellHeight halfWidthContainer">
			{currentHash !== mainHash &&
				<div className='positionAbsoluteCenter'>
					<NavLink to={mainHash}>
						<ButtonHeightContainer classNames='cursorPointer'>
							<Text size='Action' classNames='flexGrow0 TextAccent'>
								{t('Back to Home')}
							</Text>
						</ButtonHeightContainer>
					</NavLink>
				</div>
			}
			{prevHash && prevPageSign &&
				<NavLink to={prevHash} onClick={crumbClickHandler}>
					<ButtonHeightContainer classNames='cursorPointer'>
						<img src={arrowLeft} alt="arrow lrft" className='marginRightSmall' />
						<Text size='Action' classNames='flexGrow0 TextAccent'>
							{t(prevPageSign, { defaultValue: prevHash })}
						</Text>
					</ButtonHeightContainer>
				</NavLink>
			}
		</div>
	)
}