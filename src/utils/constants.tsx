import i18n from '../i18n'

export type DROPDOWN_OPTION = {
  label: string
  value: string
}

export const getLocales = () => [
  {
    label: i18n.t('settings.english'),
    value: 'en-UK',
  },
  {
    label: i18n.t('settings.portuguese'),
    value: 'pt-PT',
  },
  {
    label: i18n.t('settings.german'),
    value: 'de-DE',
  },
  {
    label: i18n.t('settings.french'),
    value: 'fr-FR',
  },
  {
    label: i18n.t('settings.spanish'),
    value: 'es-ES',
  },
  {
    label: i18n.t('settings.italian'),
    value: 'it-IT',
  },
]

export const getThemes = () => [
  {
    label: i18n.t('settings.dark'),
    value: 'dark',
  },
  {
    label: i18n.t('settings.light'),
    value: 'light',
  },
]

export const HTTP_METHODS = {
  GET: 'GET',
  POST: 'POST',
  PATCH: 'PATCH',
  PUT: 'PUT',
  DELETE: 'DELETE',
}
