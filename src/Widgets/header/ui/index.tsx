import { LanguageSelect } from 'Features/language-select';
import { SubdomainSelect } from 'Features/subdomain-select';
import { ThemeModeSwitcher } from 'Features/theme-mode-switcher';
import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Logo } from 'Shared/Components/Logo';
import { SearchInput } from 'Shared/Components/SearchInput';
import './index.scss'
import { useMediaQuery, useTheme } from '@mui/material';
import { MobileMenu } from 'Shared/Components/MobileMenu';
import { NavigationSelect, navigationLinks } from 'Features/navigation-select';
import { MenuContent } from './menu-content';
import { useLocation } from 'react-router-dom';

interface IHeaderProps {
	mainUrl?: string
}
export const Header: FC<IHeaderProps> = ({ mainUrl }) => {
	const location = useLocation();
	const isMainPage = mainUrl === location.pathname || mainUrl?.split('/')[1] === location.pathname
	const { t } = useTranslation()
	const theme = useTheme()
	const [open, setOpen] = useState(false)
	const onCloseMenu = () => {
		setOpen(false)
	}
	const biggerThanMD = useMediaQuery(theme.breakpoints.up('md'))
	const biggetThanSM = useMediaQuery(theme.breakpoints.up('sm'))
	const blockchainLinks = navigationLinks.filter(l => l.category === 'blockchain')
	const contractsLinks = navigationLinks.filter(l => l.category === 'contracts')
	const stakingLinks = navigationLinks.filter(l => l.category === 'staking')

	const placehplder = biggerThanMD ? t('search_placeholder') : t('search_placeholder_short')
	const narrow = !biggerThanMD ? ' narrow' : ''
	const inputContainer = biggerThanMD ? 'halfWidthContainer' : 'fullWidthPaddingContainer'
	return (
		<div className={`TopBar BorderBottomColorTertiary borderSolid BackgroundPrimary${narrow}`}>
			<div className='centerLeftContainer paddingLeftDefault defaultCellHeight displayFlex'>
				{!isMainPage ? <Logo url={mainUrl} classNames='icon marginRightSmall' />
					: <Logo classNames='icon marginRightSmall' />}
				<SubdomainSelect />
				<LanguageSelect />
			</div>
			<SearchInput
				placeholder={placehplder}
				classNames={`SearchField ${inputContainer} bigCellHeight centerLeftContainer displayFlex${narrow}`}
			/>
			<div className='paddingRightDefault displayFlex centerRightContainer '>
				{biggetThanSM && <>
					<NavigationSelect title={t('blockchain')} linksList={blockchainLinks} />
					<NavigationSelect title={t('contracts')} linksList={contractsLinks} />
					<NavigationSelect title={t('staking')} linksList={stakingLinks} />
				</>}
				<ThemeModeSwitcher biggetThanSM={biggetThanSM} />
				{!biggetThanSM && <MobileMenu
					classNames='BackgroundPrimary'
					openButtonClassNames='marginLeftOffset cursorPointer'
					isOpen={open}
					setOpen={setOpen}
				>
					<div className="alignSelfCenter paddingTopHuge">
						<MenuContent closeMenu={onCloseMenu} title={t('blockchain')} linksList={blockchainLinks} />
						<MenuContent closeMenu={onCloseMenu} title={t('contracts')} linksList={contractsLinks} />
						<MenuContent closeMenu={onCloseMenu} title={t('staking')} linksList={stakingLinks} />
					</div>
				</MobileMenu>}
			</div>
		</div>
	)
}
