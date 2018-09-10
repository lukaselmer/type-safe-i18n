import { Translations } from './generated/i18n-interface'
import { allTranslations } from './generated/i18n-translations'
import { I18n } from '../lib/i18n/i18n'

// GENERATE THE FILES:
// `generate-i18n {path-to-get-json-translation-files} {path-to-generate-interfaces}`
// `../scripts/generate-i18n i18n generated`

const i18n = new I18n<Translations>('de', allTranslations);
console.log(i18n.t.another);

