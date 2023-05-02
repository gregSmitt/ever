import { FC, ReactNode } from "react";
interface ILayoutProps {
	NodeList: {
		component: ReactNode,
		id: number | string
	}[]
}
export const Layot: FC<ILayoutProps> = ({ NodeList }) => {
	return (
		<div className="flexRowWrap displayFlex">
			{NodeList.map((point, i, arr) =>
				<div
					className={`marginBottomSmall${i === arr.length - 1 ? '' : ' marginRightDefault'}`}
					key={point.id}
				>
					{point.component}
				</div>
			)}
		</div>
	)
}