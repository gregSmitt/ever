
import { infoGeneralFetchShards } from "Entities/info-general";
import { AnyAction } from 'redux';
import { FC, useEffect, ReactNode } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { infoGeneralGetShards } from "Entities/info-general";
import Preloader from "Shared/assets/img/preloader.png"


export const Initialization: FC<{ children: ReactNode }> = ({ children }) => {
	const shardsList = useSelector(infoGeneralGetShards)
	const dispatch = useDispatch()
	useEffect(() => {
		dispatch(infoGeneralFetchShards() as unknown as AnyAction)
	}, [dispatch])

	if (shardsList) return <>{children}</>
	return (
		<div className="TextPrimary marginAuto">
			<img className="Spinner" src={Preloader} alt="Looading" style={{ width: '30px' }} />
		</div>
	)
}
