import { resources, defaultNS } from "./";
import en from 'Entities/languages/en.json'
import enLanding from 'Entities/languages/landing.en.json'

declare module "i18next" {
	interface CustomTypeOptions {
		defaultNS: typeof defaultNS;
		resources: typeof resources["en"];
	}
}