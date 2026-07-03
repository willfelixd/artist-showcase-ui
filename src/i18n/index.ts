import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import ptBR from './locales/pt-BR'
import en from './locales/en'

i18n
  // Detecta idioma automaticamente
  .use(LanguageDetector)
  // Integra com React
  .use(initReactI18next)
  .init({
    resources: {
      'pt-BR': { translation: ptBR },
      en:      { translation: en },
    },

    // Idioma padrão se nenhum for detectado
    fallbackLng: 'pt-BR',

    // Idiomas suportados
    supportedLngs: ['pt-BR', 'en'],

    // Configuração do detector de idioma
    detection: {
      // Ordem de detecção: localStorage → browser → padrão
      order: ['localStorage', 'navigator'],
      // Chave usada no localStorage
      lookupLocalStorage: 'language',
      // Salva automaticamente no localStorage
      caches: ['localStorage'],
    },

    interpolation: {
      // React já escapa XSS — desabilita escape duplo
      escapeValue: false,
    },
  })

export default i18n