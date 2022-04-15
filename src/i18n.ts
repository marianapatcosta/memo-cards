import * as Localisation from 'expo-localization'
import i18n from 'i18n-js'
import translationEN from './locales/en/translation.json'
import translationPT from './locales/pt/translation.json'
import translationDE from './locales/de/translation.json'
import translationFR from './locales/fr/translation.json'
import translationES from './locales/es/translation.json'
import translationIT from './locales/it/translation.json'

i18n.translations = {
  en: translationEN,
  pt: translationPT,
  de: translationDE,
  fr: translationFR,
  es: translationES,
  it: translationIT,
}

i18n.locale = Localisation.locale
i18n.fallbacks = true

export default i18n
