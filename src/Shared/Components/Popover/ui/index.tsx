import MaterialPopover from '@mui/material/Popover';
import c from './.module.scss'
import './index.scss';
import { useTheme } from '@mui/system';
import { ClickAwayListener, Dialog, useMediaQuery } from '@mui/material';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import React from 'react'

interface Props {
	TriggerComponent: React.ReactNode
	ContentComponent: React.ReactNode
	isOpen: boolean
	setIsOpen: (isOpen: boolean) => void
	contentClasses?: string
	contentClassesMobile?: string
}


const Transition = React.forwardRef(function Transition(
	props: TransitionProps & {
		children: React.ReactElement<any, any>;
	},
	ref: React.Ref<unknown>,
) {
	return <Slide direction="up" ref={ref} {...props} />;
});
export function Popover({
	TriggerComponent,
	ContentComponent,
	isOpen,
	setIsOpen,
	contentClasses,
	contentClassesMobile
}: Props) {
	const theme = useTheme();
	const matches = useMediaQuery(theme.breakpoints.up('md'))
	const [anchorEl, setAnchorEl] = React.useState<HTMLDivElement | null>(null);
	const [activeState, setActive] = React.useState(false);
	const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
		setIsOpen(!isOpen);
		setAnchorEl(event.currentTarget);
	}

	const handleClose = () => {
		setAnchorEl(null);
		setIsOpen(false);
	}
	const handleKeyDown = () => {
		setActive(true)
	}
	const handleKeyUp = () => {
		setActive(false)
	}

	const handleClickAway = () => {
		setIsOpen(false);
	};

	return (
		<ClickAwayListener onClickAway={handleClickAway}>
			<div className='Popover' onScroll={() => { console.log('ffff') }}>
				<div
					className={`Popover__buttonContainer${activeState ? ' pressed' : ''}`}
					onClick={handleClick}
					onMouseDown={handleKeyDown}
					onMouseUp={handleKeyUp}
				>
					{TriggerComponent}
				</div>
				{matches && <MaterialPopover
					className='Popover__root'
					open={isOpen}
					anchorEl={anchorEl}
					onClose={handleClose}
					anchorOrigin={{
						vertical: 'bottom',
						horizontal: 'center',
					}}
					transformOrigin={{
						vertical: 'top',
						horizontal: 'center',
					}}
					sx={{ transform: "translateY(10px);" }}
				>
					<div className={`${c.defaultWrapper} Popover__container ${contentClasses}`}>
						{ContentComponent}
					</div>
				</MaterialPopover>}
				{!matches && <Dialog
					open={isOpen}
					TransitionComponent={Transition}
					keepMounted
					onClose={handleClose}
					aria-describedby="alert-dialog-slide-description"
					className='MobilePopover'
				>
					<div className={`${c.defaultWrapper} ${contentClassesMobile}`}>
						{ContentComponent}
					</div>
				</Dialog>}
			</div>
		</ClickAwayListener>
	);
}

