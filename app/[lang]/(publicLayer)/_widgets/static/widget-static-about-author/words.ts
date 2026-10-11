// Words of the author card on the About page (node step 450-4, owner 2026-10-11). en is the base, ru the translation.
export type AboutAuthorWords = { name: string; role: string; alt: string; contact: string; telegram: string }

const WORDS: Record<string, AboutAuthorWords> = {
  en: { name: "Roman Bolshiyanov (Armstrong)", role: "Author and solo developer of Lagrix", alt: "Roman Bolshiyanov, author of Lagrix", contact: "Write on Telegram", telegram: "@roma_armstrong" },
  ru: { name: "Роман Большиянов (Armstrong)", role: "Автор и единственный разработчик Lagrix", alt: "Роман Большиянов, автор Lagrix", contact: "Написать в Telegram", telegram: "@roma_armstrong" },
}

export function aboutAuthorWords(lang: string): AboutAuthorWords {
  return WORDS[lang] ?? WORDS.en
}
