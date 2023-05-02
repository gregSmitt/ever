import spinnerSrc from 'Shared/assets/img/progress.png'
import './style.scss'

export const Spinner = () => {
	return <img src={spinnerSrc} className='Spinner progress-spinner' alt="spinner" />
}