import { MapPin, Calendar, Info, Flag, ChevronLeft } from "lucide-react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { CURRENT_EVENTS_DATA } from "@/constants/currentEvents";
import QuizStartButton from "@/components/QuizStartButton";

export default async function CurrentEventPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const eventData = CURRENT_EVENTS_DATA.find((item) => item.id === id);

  if (!eventData) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white">
      <nav className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-100 px-4 py-4">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <Link
            href="/current-events"
            className="flex items-center gap-1 text-slate-500 font-bold hover:text-slate-800 transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
            一覧へ
          </Link>
          <div className="w-10" />
        </div>
      </nav>

      {/* クイズボタン */}
      <div className="fixed bottom-0 left-0 right-0 z-50 pointer-events-none pb-6 px-6 md:pb-8 md:px-8">
        <div className="max-w-3xl mx-auto flex justify-center md:justify-end">
          <div className="pointer-events-auto w-full md:w-72">
            <QuizStartButton
              category="c"
              code={eventData.code}
              questionTitle={eventData.title}
              variant="mobile"
            />
          </div>
        </div>
      </div>

      <main className="max-w-3xl mx-auto px-6 pt-12 pb-32">
        <header className="mb-12">
          <h1 className="text-3xl md:text-4xl font-black text-slate-900 leading-tight mb-6">
            {eventData.title}
          </h1>
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2 bg-slate-50 px-4 py-2 rounded-xl border border-slate-100">
              <MapPin className="w-4 h-4 text-orange-600" />
              <span className="text-sm font-bold text-slate-600">
                {eventData.location}
              </span>
            </div>
            <div className="flex items-center gap-2 bg-slate-50 px-4 py-2 rounded-xl border border-slate-100">
              <Calendar className="w-4 h-4 text-orange-600" />
              <span className="text-sm font-bold text-slate-600">
                {eventData.period}
              </span>
            </div>
          </div>
        </header>

        <section className="mb-12">
          <div className="flex items-center gap-2 mb-4 text-blue-600">
            <Info className="w-5 h-5" />
            <h2 className="text-lg font-black">概要</h2>
          </div>
          <div className="bg-blue-50/50 border border-blue-100 rounded-3xl p-6 md:p-8">
            <p className="text-slate-600 leading-relaxed font-medium">
              {eventData.fullDescription}
            </p>
          </div>
        </section>

        <section className="mb-16">
          <div className="flex items-center gap-2 mb-8 text-orange-600 border-b-2 border-orange-100 pb-2">
            <Flag className="w-6 h-6" />
            <h2 className="text-xl font-black">重要トピックス</h2>
          </div>
          <div className="space-y-12">
            {eventData.topics.map((topic, idx) => (
              <article
                key={idx}
                className="relative pl-6 before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1.5 before:bg-orange-500 before:rounded-full"
              >
                <h3 className="text-xl font-bold text-slate-900 mb-3 leading-snug">
                  {topic.title}
                </h3>
                <div className="bg-slate-50 rounded-xl p-5 border border-slate-100 text-slate-700 text-sm leading-relaxed whitespace-pre-wrap">
                  {topic.content}
                </div>
              </article>
            ))}
          </div>
        </section>

        {eventData.sources && (
          <footer className="mt-12 pt-6 border-t border-slate-100">
            <p className="text-xs text-slate-400 mb-2 font-bold uppercase tracking-tighter">
              Sources
            </p>
            <div className="flex flex-col gap-2">
              {eventData.sources.map((src, i) => (
                <a
                  key={i}
                  href={src.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-blue-500 hover:underline inline-block w-fit"
                >
                  {src.name}
                </a>
              ))}
            </div>
          </footer>
        )}
      </main>
    </div>
  );
}
