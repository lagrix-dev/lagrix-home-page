import { buildLlmsTxt } from "@/lib/aio/llms";
import { liveDocs } from "@/app/[lang]/(publicLayer)/docs/_libs/docs";
import { DEFAULT_LANGUAGE } from "@/config/translations/translations.config";

// `/llms.txt` — карта сайта для модели, на языке по умолчанию (шаг 505).
//
// Прежде здесь стояла ЗАГОТОВКА: она называла сайт «self-hosted AI workspace»,
// рассказывала про архитектуру Fractera и перечисляла ровно одну ссылку — на
// главную. На сайте пекарни это описание чужого продукта, и агенту, пришедшему
// за содержимым, оно не давало ничего. Теперь файл собирается из настоящего
// перечня страниц (`lib/aio/surfaces.ts`) — того же, из которого берутся
// markdown-версии и полный текст.
//
// Языковые версии живут по своим адресам: `/<язык>/llms.txt`. Спецификация
// разрешает файл на любом подпути прямо.
//
// Статика с суточным обновлением: содержимое меняется вместе с настройками и
// постами, а не на каждый запрос.
export const dynamic = "force-static";
// 458-9: документы Lagrix читаются с GitHub на лету — карта обновляется вместе с ними, раз в 5 минут.
export const revalidate = 300;

export async function GET() {
  await liveDocs();
  return new Response(buildLlmsTxt(DEFAULT_LANGUAGE), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
