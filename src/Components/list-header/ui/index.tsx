import { ReactNode, FC, Fragment } from 'react'

interface IHeaderProps {
	children?: ReactNode
	nodeList?: {
		id: number | string,
		Component: ReactNode
	}[]
}
export const Header: FC<IHeaderProps> = ({ children, nodeList }) => {
	return (
		<div className="listHeader">
			<div className="displayFlex">
				<div className="displayFlex flex1 alignItemsCenter">
					{children}
				</div>
				{nodeList?.map(el => (
					<Fragment key={el.id}>
						{el.Component}
					</Fragment>
				))}
			</div>
		</div>
	)
}