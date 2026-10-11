import { aboutAuthorWords } from "./words"

// The author card for machines (the page's Markdown copy and llms-full.txt).
export function markdown(lang: string): string {
  const w = aboutAuthorWords(lang)
  return [`## ${w.name}`, "", w.role, "", `${w.contact}: [${w.telegram}](https://t.me/roma_armstrong)`, ""].join("\n")
}
