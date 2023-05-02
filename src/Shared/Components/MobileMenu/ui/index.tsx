import { FC } from "react";
import c from './MenuScreen.module.scss'
import DragHandleOutlinedIcon from '@mui/icons-material/DragHandleOutlined';
import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';

interface IMenuProps {
	children: React.ReactNode
	classNames?: string
	openButtonClassNames?: string
	isOpen: boolean
	setOpen: (isOpen: boolean) => void
}

const Transition = React.forwardRef(function Transition(
	props: TransitionProps & {
		children: React.ReactElement;
	},
	ref: React.Ref<unknown>,
) {
	return <Slide direction="up" ref={ref} {...props} />;
});

export const MobileMenu: FC<IMenuProps> = ({ children, classNames, openButtonClassNames, isOpen, setOpen }) => {
	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<div>
			<div onClick={handleClickOpen} className={openButtonClassNames}>
				<DragHandleOutlinedIcon className="SvgPrimary" />
			</div>
			<Dialog
				fullScreen
				open={isOpen}
				onClose={handleClose}
				TransitionComponent={Transition}
			>
				<div
					className={`${c.default} ${classNames ?? ''}`}
				>
					<IconButton
						edge="start"
						color="inherit"
						onClick={handleClose}
						aria-label="close"
						className={`${c.closeButton} ${c.MUI}`}
					>
						<CloseIcon className="SvgPrimary" />
					</IconButton>
					{children}
				</div>
			</Dialog>
		</div>
	);
}

