import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import 'dayjs/locale/en-gb';
import updateLocale from 'dayjs/plugin/updateLocale'
import languages from 'Entities/languages';
import { useTranslation } from 'react-i18next';

dayjs.extend(updateLocale)
const ruMounths = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь']
const enMounths = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
dayjs.updateLocale('ru', {
	months: ruMounths,
	monthsShort: ruMounths
})

dayjs.updateLocale('en-gb', {
	months: enMounths,
	monthsShort: enMounths
})

export const withLocalization = (component: () => React.ReactNode) => () => {
	const { t } = useTranslation()
	const location = languages.locationDictionary[t('languageSign')]
	return (
		<LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={location}>
			{component()}
		</LocalizationProvider>
	);
}