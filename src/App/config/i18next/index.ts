import en from 'Entities/languages/en.json'
import ru from 'Entities/languages/ru.json'
import enLanding from 'Entities/languages/landing.en.json'
import ruLanding from 'Entities/languages/landing.ru.json'
import { initReactI18next } from 'react-i18next'
import i18n from 'i18next'
import languages from "Entities/languages"
const defaultLanguage = JSON.stringify(languages.list.find(l => l.id === languages.default)?.sign
	?? languages.list[0].sign)
export const defaultNS = 'translation'
export const resources = {
	en: {
		translation: en,
		landing: enLanding
	},
	ru: {
		translation: ru,
		landing: ruLanding
	}
}

i18n
	.use(initReactI18next)
	.init({
		resources,
		lng: JSON.parse(localStorage.getItem(languages.localStorageKey) ?? defaultLanguage),
		ns: ['translation', 'landing'],
		defaultNS,
		fallbackLng: ['en', 'ru']
	})

export default i18n