import {
  createContext,
  useContext,
  useState,
  type ReactNode
} from 'react'
import { useTranslation } from 'react-i18next'

type Language = 'pt-BR' | 'en'

interface LanguageContextData {
  language: Language
  toggleLanguage: () => void
  isEnglish: boolean
}

const LanguageContext = createContext<LanguageContextData>({} as LanguageContextData)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const { i18n } = useTranslation()

  const [language, setLanguage] = useState<Language>(
    (localStorage.getItem('language') as Language) || 'pt-BR'
  )

  const toggleLanguage = () => {
    const next: Language = language === 'pt-BR' ? 'en' : 'pt-BR'
    i18n.changeLanguage(next)
    setLanguage(next)
  }

  return (
    <LanguageContext.Provider value={{
      language,
      toggleLanguage,
      isEnglish: language === 'en'
    }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage deve ser usado dentro de LanguageProvider')
  }
  return context
}