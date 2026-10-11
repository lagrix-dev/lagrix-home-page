import { H3, P } from "@/components/ui/typography"
import { buttonVariants } from "@/components/ui/button"
import { aboutAuthorWords } from "./words"

// Author card of the About page (node step 450-4): photo, name, role and the Telegram contact. Static, no island.
export function AboutAuthor({ lang }: { lang: string }) {
  const w = aboutAuthorWords(lang)
  return (
    <section data-block="ab0s1" className="mx-auto flex w-full max-w-3xl flex-col items-center gap-6 px-4 py-8 sm:flex-row sm:items-center">
      <img data-block="ab0im" src="/images/about/roman-bolshiyanov.webp" alt={w.alt} width={192} height={192} className="h-48 w-48 shrink-0 rounded-full object-cover" />
      <div data-block="ab0tx" className="flex flex-col gap-2 text-center sm:text-left">
        <H3 data-block="ab0nm">{w.name}</H3>
        <P data-block="ab0rl">{w.role}</P>
        <div data-block="ab0bt">
          <a href="https://t.me/roma_armstrong" target="_blank" rel="noopener noreferrer" className={buttonVariants({ variant: "default" })}>{w.contact} {w.telegram}</a>
        </div>
      </div>
    </section>
  )
}
