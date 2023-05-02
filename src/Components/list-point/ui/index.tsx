import { FC, useState, ReactNode } from 'react'
import './style.scss'
import { Text } from 'Shared/Components/Text'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import { useMediaQuery, useTheme, useThemeProps } from "@mui/material"

interface IComponentProps {
	title: string | number
	LeftBottomComponent?: ReactNode
	RightTopComponent?: ReactNode
	RightBottomComponent?: ReactNode
	copiedValue?: string | number
	onCopy?: (value?: string) => void
}
export const Component: FC<IComponentProps> = ({
	onCopy,
	copiedValue,
	title,
	RightBottomComponent,
	RightTopComponent,
	LeftBottomComponent
}) => {
	const theme = useTheme()
	const isMobile = !useMediaQuery(theme.breakpoints.up('md'))
	const [isHovered, setHovered] = useState(false)
	const [isCopyHovered, setCopyHovered] = useState(false)
	const mouseEntetHandle = () => setHovered(true)
	const mouseLeaveHandle = () => setHovered(false)
	const mouseEntetCopyHandle = () => setCopyHovered(true)
	const mouseLeaveCopyHandle = () => setCopyHovered(false)
	const titleClassName = isHovered ? 'TextAccent' : 'TextPrimary'
	const backgroundClassName = isHovered ? ' BackgroundSecondary' : ''
	const visibleClass = isHovered ? ' visible' : ''
	const fillClassName = isCopyHovered ? 'SvgAccent' : 'SvgPrimary'

	const copyToClipboard = (e: React.MouseEvent<HTMLElement>) => {
		e.preventDefault()
		if (copiedValue) {
			navigator.clipboard.writeText(`${copiedValue}`)//брать из пропсов
				.then(() => {
					if (onCopy) onCopy(`${copiedValue}`)
				})
				.catch(err => {
					console.log('Something went wrong', err);
				})
		}
	}
	return (
		<div className="UIDetailsButton cursorPointer">
			<div className={`card-container${backgroundClassName}`}
				onMouseEnter={mouseEntetHandle}
				onMouseLeave={mouseLeaveHandle}
			>
				<div className='content-card-component'>
					<div className='row-container'>
						<div className="label-container">
							<Text size='Action' classNames={titleClassName}>
								{title}
							</Text>
							{copiedValue && !isMobile && <div className={`copy-button${visibleClass}`}
								onMouseEnter={mouseEntetCopyHandle}
								onMouseLeave={mouseLeaveCopyHandle}
								onClick={copyToClipboard}
							>
								<ContentCopyIcon className={fillClassName} />
							</div>}
						</div>
						{RightTopComponent}
					</div>
					<div className="details-component row-container">
						<div className="details-component__first-item">
							{LeftBottomComponent}
						</div>
						{RightBottomComponent}
					</div>
				</div>
			</div>
		</div>
	)
}