import { buildLlmsFullTxt } from "@/lib/aio/llms";
import { liveDocs } from "@/app/[lang]/(publicLayer)/docs/_libs/docs";
import { DEFAULT_LANGUAGE } from "@/config/translations/translations.config";

// `/llms-full.txt` — полные тексты страниц одним документом, язык по умолчанию.
//
// 🔒 ЭТОГО ФАЙЛА В СПЕЦИФИКАЦИИ llmstxt.org НЕТ. Он — сложившаяся практика
// сообщества, и внутри самого файла это сказано прямо. Выдавать практику за
// стандарт нельзя даже умолчанием.
export const dynamic = "force-static";
// 458-9: документы Lagrix читаются с GitHub на лету — карта обновляется вместе с ними, раз в 5 минут.
export const revalidate = 300;

export async function GET() {
  await liveDocs();
  return new Response(buildLlmsFullTxt(DEFAULT_LANGUAGE), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
