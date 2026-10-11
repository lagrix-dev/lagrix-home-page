"use client"

import { AppDialog } from "@/components/dialog/app-dialog.client"
import type { AppDialogUi } from "@/components/dialog/app-dialog.i18n"

// ВИДЕО ТЕЛЕВИЗОРА ЗАЛА ОЖИДАНИЯ (владелец 2026-10-11: «video for tv: https://youtu.be/zhkn2p1FQoM»). Ролик — из данных главной
// (`waiting.video`, идентификатор YouTube), не из кода. Плеер — `youtube-nocookie.com`: YouTube не ставит cookie, пока ролик не
// запущен. Окно — общее окно продукта (`AppDialog`), слова его — с сервера; плеер рисуется только после нажатия — до этого на
// странице нет ни одного запроса к YouTube.
export function TvVideo({ open, onOpenChange, video, title, ui }: { open: boolean; onOpenChange: (open: boolean) => void; video: string; title: string; ui: AppDialogUi }) {
  return (
    <AppDialog open={open} onOpenChange={onOpenChange} title={title} ui={ui} size="xl">
      {open && (
        <div data-block="tvfrm" className="aspect-video w-full overflow-hidden rounded-lg">
          <iframe
            className="h-full w-full"
            src={`https://www.youtube-nocookie.com/embed/${encodeURIComponent(video)}?autoplay=1&rel=0`}
            title={title}
            allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
            allowFullScreen
          />
        </div>
      )}
    </AppDialog>
  )
}
