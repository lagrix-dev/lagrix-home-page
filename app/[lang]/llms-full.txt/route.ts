import { buildLlmsFullTxt } from "@/lib/aio/llms";
import { liveDocs } from "@/app/[lang]/(publicLayer)/docs/_libs/docs";
import { SUPPORTED_LANGUAGES, SINGLE_LANG_MODE } from "@/config/translations/translations.config";

// `/<язык>/llms-full.txt` — тот же единый английский полный текст, что `/llms-full.txt` (468-6: русской версии нет).
export const dynamic = "force-static";
export const dynamicParams = false;
// 458-9: документы Lagrix читаются с GitHub на лету — карта обновляется вместе с ними, раз в 5 минут.
export const revalidate = 300;

export function generateStaticParams() {
  return SINGLE_LANG_MODE ? [] : SUPPORTED_LANGUAGES.map(lang => ({ lang }));
}

export async function GET(_req: Request, { params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  await liveDocs();
  return new Response(buildLlmsFullTxt(lang), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
