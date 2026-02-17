import { create } from 'zustand' 
import fr from '../../messages/fr.json'
import en from '../../messages/en.json'

const translations = { fr, en }

interface LanguageState {
  lang: 'fr' | 'en'
  setLang: (lang: 'fr' | 'en') => void
  t: (path: string) => string
}

export const useI18n = create<LanguageState>((set, get) => ({
  lang: 'fr',
  setLang: (lang) => set({ lang }),
  t: (path) => {
    const keys = path.split('.')
    const lang = get().lang
    // @ts-ignore
    let result = translations[lang]
    
    for (const key of keys) {
      if (result && result[key]) {
        result = result[key]
      } else {
        return path 
      }
    }
    return result
  }
}))