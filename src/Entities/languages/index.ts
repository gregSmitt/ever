export type LanguageSignType = 'en' | 'ru'
export interface ILanguages {
	localStorageKey: 'language',
	default: number,
	list: { id: number, sign: LanguageSignType, nativeName: string, interName: string }[],
	locationDictionary: {
		[key: string]: 'ru' | 'en-gb'
	}
}


const languages: ILanguages = {
	localStorageKey: 'language',
	default: 0,
	list: [
		{ id: 0, sign: 'en', nativeName: 'English', interName: 'English' },
		{ id: 1, sign: 'ru', nativeName: 'Русский', interName: 'Russian' }
	],
	locationDictionary: {
		'ru': 'ru',
		'en': 'en-gb'
	}
}



export default languages