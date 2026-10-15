// СЛОВА СТРАНИЦЫ «САЙТ ВРЕМЕННО ЗАКРЫТ» — рядом с воротами, которые её отдают (шаг узла 488).
//
// 🔒 СЕРВЕРНЫЙ МОДУЛЬ: его зовёт прокси. Из клиента не импортировать — тот же закон, что у
// `temporary-address.i18n.ts`.

export type SiteClosedStrings = {
  title: string
  body: string
  /** Для вошедшего без нужной роли: войти другим аккаунтом. */
  switchAccount: string
}

const T: Record<string, SiteClosedStrings> = {
  en: {
    title: "This site is temporarily closed",
    body: "Access is open only to the architect of this site.",
    switchAccount: "Sign in with another account",
  },
  ru: {
    title: "Сайт временно закрыт",
    body: "Доступ открыт только архитектору этого сайта.",
    switchAccount: "Войти другим аккаунтом",
  },
}

export function siteClosedStrings(lang: string): SiteClosedStrings {
  return T[lang] ?? T.en
}
