"use client";

import { useEffect, useState, useRef } from "react";
import { createPortal } from "react-dom";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { Criterion, HeritageSection, Heritage } from "../../types";
import {
  Calendar,
  ExternalLink,
  ChevronLeft,
  Info,
  PlayCircle,
  Globe,
  AlertTriangle,
  AlertCircle,
  Leaf,
  Award,
  BookOpen,
  CheckCircle2,
} from "lucide-react";
import ReactMarkdown from "react-markdown";
import QuizSettingsModal from "../../../components/QuizSettingsModal";
import { API_BASE_URL, R2_BASE_URL } from "@/config/env";

const LEVEL_TABS = [
  { id: 1, label: "4級" },
  { id: 2, label: "3級" },
  { id: 3, label: "2級" },
  { id: 4, label: "準1級" },
  { id: 5, label: "1級" },
  { id: 6, label: "マイスター" },
];

// メイン画像用URL生成
const getImageUrl = (heritageCode: string | null | undefined) => {
  if (!heritageCode) return "";
  return `${R2_BASE_URL.replace(/\/$/, "")}/heritages/${heritageCode}.webp`;
};

// セクション画像用URL生成
const getSectionImageUrl = (
  heritageCode: string | null | undefined,
  imageCode: string | null | undefined,
) => {
  if (!heritageCode || !imageCode) return "";
  const baseUrl = R2_BASE_URL.replace(/\/$/, "");
  return `${baseUrl}/sections/${heritageCode}/${imageCode}.webp`;
};

// セクション用共通画像コンポーネント
const SectionImage = ({
  src,
  alt,
  sourceName,
  sourceUrl,
  className = "",
}: {
  src: string;
  alt: string;
  sourceName?: string;
  sourceUrl?: string;
  className?: string;
}) => {
  if (!src) return null;

  return (
    <div
      style={{ position: "relative" }}
      className={`relative rounded-xl overflow-hidden shrink-0 bg-slate-100 border border-slate-100 shadow-sm ${className}`}
    >
      <Image src={src} alt={alt} fill unoptimized className="object-cover" />
      {(sourceName || sourceUrl) && (
        <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/60 backdrop-blur-md rounded-md max-w-[90%] z-10">
          <a
            href={sourceUrl || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[9px] text-white flex items-center gap-1 hover:text-blue-200 cursor-pointer"
            onClick={(e) => e.stopPropagation()}
          >
            <span className="truncate">
              出典：{sourceName || "リンク"}（加工あり）
            </span>
            {sourceUrl && <ExternalLink className="w-2 h-2 shrink-0" />}
          </a>
        </div>
      )}
    </div>
  );
};

// 登録基準ツールチップコンポーネント
const CriterionTooltip = ({ criterion }: { criterion: Criterion | number }) => {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const [coords, setCoords] = useState({ top: 0, left: 0 });

  if (!criterion || typeof criterion === "number") {
    return (
      <span className="text-xs font-bold bg-slate-100 text-slate-700 px-2 py-1 rounded-md">
        {criterion}
      </span>
    );
  }

  const handleOpen = () => {
    if (triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      const tooltipWidth = 224; // w-56 = 224px
      const padding = 10; // 画面端との余白

      // 基本位置（ボタンの中央上）
      let left = rect.left + rect.width / 2;

      // 画面端からはみ出さないように調整
      if (left - tooltipWidth / 2 < padding) {
        left = tooltipWidth / 2 + padding;
      } else if (left + tooltipWidth / 2 > window.innerWidth - padding) {
        left = window.innerWidth - tooltipWidth / 2 - padding;
      }

      setCoords({
        top: rect.top + window.scrollY - 10,
        left: left,
      });
    }
    setIsOpen(true);
  };

  return (
    <span
      className="relative inline-block mx-0.5"
      onMouseEnter={handleOpen}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button
        ref={triggerRef}
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          handleOpen();
        }}
        className="text-xs font-bold bg-blue-50 text-blue-600 px-2 py-1 rounded-md border border-blue-100 hover:bg-blue-100 transition"
      >
        {criterion.number}
      </button>

      {isOpen &&
        createPortal(
          <div
            className="z-[9999] fixed bg-slate-800 text-white p-4 rounded-xl shadow-2xl w-56 text-xs pointer-events-none"
            style={{
              top: coords.top,
              left: coords.left,
              transform: "translate(-50%, -100%)",
            }}
          >
            <p className="font-bold border-b border-slate-600 mb-2 pb-1 text-blue-300 flex items-center gap-1">
              <Info size={12} /> 基準 {criterion.number}
            </p>
            <p className="font-bold text-slate-100 mb-1">
              {criterion.short_name}
            </p>
            <p className="text-slate-300 leading-relaxed">
              {criterion.description}
            </p>
          </div>,
          document.body,
        )}
    </span>
  );
};

export default function HeritageDetailPage() {
  const params = useParams();
  const router = useRouter();
  const code = params?.code as string;

  const [heritage, setHeritage] = useState<Heritage | null>(null);
  const [loading, setLoading] = useState(true);
  const [isQuizModalOpen, setIsQuizModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<number>(2);

  useEffect(() => {
    if (!code) return;
    const fetchHeritageDetail = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${API_BASE_URL}/heritages/${code}/`);
        if (!res.ok) throw new Error("遺産の取得に失敗しました");
        const data = await res.json();
        setHeritage(data);
        if (data.level) {
          setActiveTab(data.level);
        }
      } catch (err) {
        console.error("Failed to fetch heritage detail:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchHeritageDetail();
  }, [code]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-2">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-slate-500 font-bold text-sm">
            解説を読み込み中...
          </p>
        </div>
      </div>
    );
  }

  if (!heritage) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6">
        <p className="text-slate-500 font-bold mb-4">
          指定された世界遺産が見つかりませんでした。
        </p>
        <button
          onClick={() => router.push("/heritages")}
          className="flex items-center gap-1 text-sm font-bold text-blue-600 hover:underline"
        >
          <ChevronLeft size={16} /> 一覧に戻る
        </button>
      </div>
    );
  }

  const getLevelLabel = (lvNum: number) => {
    return LEVEL_TABS.find((t) => t.id === lvNum)?.label || "不明";
  };

  const sections = heritage.sections || [];

  // 1. 概要 (summary)
  const summarySection = sections.find(
    (s: HeritageSection) => s.section_type === "summary",
  );

  // 2. 注目ポイント (point)
  const pointSections = sections.filter(
    (s: HeritageSection) => s.section_type === "point",
  );

  // 3. 検定攻略メモ (exam_notes)
  const examNotesSections = sections.filter(
    (s: HeritageSection) =>
      s.section_type === "exam_notes" &&
      s.target_level === activeTab &&
      s.content &&
      s.content.replace(/[>\s]/g, "").length > 0,
  );

  // 各セクションの画像URL生成
  const summaryImageUrl = summarySection
    ? getSectionImageUrl(heritage.code, summarySection.image_code)
    : "";

  return (
    <div className="min-h-screen bg-slate-50/60 py-6 md:py-10 px-4">
      <div className="max-w-6xl mx-auto">
        {/* ヘッダーナビゲーション */}
        <button
          onClick={() => router.back()}
          className="mb-4 md:mb-6 flex items-center gap-2 text-xs md:text-sm font-bold text-slate-500 hover:text-blue-600 transition group"
        >
          <ChevronLeft
            size={16}
            className="transform group-hover:-translate-x-0.5 transition-transform"
          />
          世界遺産一覧に戻る
        </button>

        {/* メイングリッド構成 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 items-start">
          {/* 左カラム：画像＆基本情報 */}
          <div className="lg:col-span-1 lg:sticky lg:top-6 space-y-4">
            <div className="bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-sm">
              <div
                className="relative w-full aspect-video bg-slate-100"
                style={{ position: "relative" }}
              >
                <Image
                  src={getImageUrl(heritage.code)}
                  alt={heritage.name}
                  fill
                  unoptimized
                  className="object-cover"
                  priority
                />

                {/* 出典元情報 */}
                {heritage.source_url && (
                  <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/60 backdrop-blur-sm rounded-md max-w-[90%] truncate z-10">
                    <a
                      href={heritage.source_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[9px] text-white flex items-center gap-1 hover:text-blue-200"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <span className="truncate">
                        出典 ({heritage.source_name || "unknown"})（加工あり）
                      </span>
                      <ExternalLink className="w-2.5 h-2.5 shrink-0" />
                    </a>
                  </div>
                )}
              </div>

              <div className="p-5 space-y-4">
                <div>
                  <span className="text-[10px] font-bold text-slate-400 block uppercase tracking-wider mb-1">
                    世界遺産名
                  </span>
                  <h1 className="text-lg font-bold text-slate-900 leading-snug">
                    {heritage.name}
                  </h1>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  <span
                    className={`text-[11px] font-bold px-2 py-0.5 rounded text-white ${heritage.category === 1 ? "bg-amber-600" : heritage.category === 2 ? "bg-emerald-600" : "bg-purple-600"}`}
                  >
                    {heritage.category === 1
                      ? "文化遺産"
                      : heritage.category === 2
                        ? "自然遺産"
                        : "複合遺産"}
                  </span>
                  {heritage.level && (
                    <span className="text-[11px] font-bold bg-blue-50 text-blue-600 border border-blue-100 px-2 py-0.5 rounded flex items-center gap-0.5">
                      <Award size={12} /> {getLevelLabel(heritage.level)}レベル
                    </span>
                  )}
                </div>

                {/* 特殊バッジフラグ */}
                {(heritage.is_danger ||
                  heritage.is_negative_heritage ||
                  heritage.is_cultural_landscape) && (
                  <div className="space-y-1.5 pt-2 border-t border-slate-100">
                    {heritage.is_danger && (
                      <div className="flex items-center gap-1.5 text-red-600 font-bold text-[11px] bg-red-50 p-1.5 rounded-lg">
                        <AlertTriangle size={12} className="shrink-0" />
                        <span>
                          危機遺産 ({heritage.danger_registered_year}年〜)
                        </span>
                      </div>
                    )}
                    {heritage.is_negative_heritage && (
                      <div className="flex items-center gap-1.5 text-slate-600 font-bold text-[11px] bg-slate-100 p-1.5 rounded-lg">
                        <AlertCircle size={12} className="shrink-0" />
                        <span>負の遺産</span>
                      </div>
                    )}
                    {heritage.is_cultural_landscape && (
                      <div className="flex items-center gap-1.5 text-emerald-700 font-bold text-[11px] bg-emerald-50 p-1.5 rounded-lg border border-emerald-100">
                        <Leaf size={12} className="shrink-0" />
                        <span>文化的景観</span>
                      </div>
                    )}
                  </div>
                )}

                {/* メタデータテーブル */}
                <div className="space-y-2.5 pt-3 border-t border-slate-100 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-400 font-bold flex items-center gap-1">
                      <Calendar size={13} /> 登録年
                    </span>
                    <span className="font-semibold text-slate-700">
                      {heritage.registered_year}年
                    </span>
                  </div>
                  <div className="flex justify-between items-start">
                    <span className="text-slate-400 font-bold flex items-center gap-1">
                      <Globe size={13} /> 所在国
                    </span>
                    <span
                      className="font-semibold text-slate-700 text-right max-w-[150px] truncate"
                      title={heritage.countries?.join(", ")}
                    >
                      {heritage.countries?.join(", ") || "不明"}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400 font-bold flex items-center gap-1">
                      <Info size={13} /> 登録基準
                    </span>
                    <div className="flex flex-wrap gap-1 justify-end">
                      {heritage.criteria?.map(
                        (c: Criterion | number, idx: number) => (
                          <CriterionTooltip key={idx} criterion={c} />
                        ),
                      )}
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setIsQuizModalOpen(true)}
                  className="hidden lg:flex w-full mt-4 px-4 py-3 bg-blue-600 text-white rounded-xl text-sm font-bold items-center justify-center gap-2 hover:bg-blue-700 transition shadow-sm active:scale-[0.98]"
                >
                  <PlayCircle size={16} />
                  <span>この遺産のクイズに挑戦</span>
                </button>
              </div>
            </div>
          </div>

          {/* 右カラム：セクション */}
          <div className="lg:col-span-2 space-y-6">
            {/* 概要セクション */}
            <div className="bg-white rounded-2xl p-6 md:p-8 border border-slate-200/80 shadow-sm space-y-4">
              {heritage.catchphrase && (
                <div className="border-l-4 border-blue-500 pl-4 py-0.5">
                  <p className="text-md md:text-lg font-bold text-slate-800 italic">
                    「{heritage.catchphrase}」
                  </p>
                </div>
              )}

              <div className="flex flex-col md:flex-row gap-6 items-start">
                <div className="flex-1 prose prose-slate max-w-none text-slate-600 prose-p:text-sm prose-p:md:text-base prose-p:leading-relaxed prose-strong:text-blue-700 font-medium">
                  {summarySection ? (
                    <ReactMarkdown>{summarySection.content}</ReactMarkdown>
                  ) : (
                    <p className="text-sm text-slate-400 italic">
                      世界遺産の概要情報は登録されていません。
                    </p>
                  )}
                </div>
                <SectionImage
                  src={summaryImageUrl}
                  alt="概要画像"
                  sourceName={summarySection?.source_name}
                  sourceUrl={summarySection?.source_url}
                  className="w-full h-44 md:w-56 md:h-36"
                />
              </div>
            </div>

            {/* 注目ポイントセクション */}
            {pointSections.length > 0 && (
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-slate-800 font-bold text-sm md:text-base px-1">
                  <CheckCircle2 size={18} className="text-emerald-500" />
                  <span>解説・注目ポイント</span>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  {pointSections.map((sec: HeritageSection) => {
                    const pointImageUrl = getSectionImageUrl(
                      heritage.code,
                      sec.image_code,
                    );

                    return (
                      <div
                        key={sec.id}
                        className="bg-white rounded-2xl p-5 md:p-6 border border-slate-200/80 shadow-sm hover:border-slate-300 transition-colors"
                      >
                        {sec.title && (
                          <h3 className="text-sm md:text-base font-bold text-slate-900 mb-3 flex items-center gap-2 border-b border-slate-100 pb-2">
                            <span className="w-1.5 h-3.5 bg-emerald-500 rounded-full inline-block"></span>
                            {sec.title}
                          </h3>
                        )}
                        <div className="flex flex-col md:flex-row gap-5 items-start">
                          <div className="flex-1 prose prose-slate max-w-none text-slate-600 prose-p:text-sm prose-p:md:text-base prose-p:leading-relaxed text-sm md:text-base">
                            <ReactMarkdown>{sec.content}</ReactMarkdown>
                          </div>
                          <SectionImage
                            src={pointImageUrl}
                            alt={sec.title || "注目ポイント画像"}
                            sourceName={sec.source_name}
                            sourceUrl={sec.source_url}
                            className="w-full h-44 md:w-48 md:h-32"
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* 出題傾向＆対策メモ */}
            <div className="bg-white rounded-2xl p-6 md:p-8 border border-slate-200/80 shadow-sm space-y-6">
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-slate-800 font-bold text-sm md:text-base">
                  <BookOpen size={18} className="text-blue-500" />
                  <span>級別 出題傾向＆対策メモ</span>
                </div>

                <div className="w-full bg-slate-100 p-1 rounded-xl overflow-x-auto flex gap-1 scrollbar-none">
                  {LEVEL_TABS.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex-1 min-w-[65px] sm:min-w-0 py-2 text-xs font-bold rounded-lg transition-all whitespace-nowrap ${
                        activeTab === tab.id
                          ? "bg-white text-blue-600 shadow-sm"
                          : "text-slate-500 hover:text-slate-700"
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* メモ本文のカードリスト化 */}
              <div className="prose prose-slate max-w-none prose-blockquote:not-italic prose-blockquote:border-l-4 prose-blockquote:border-amber-500 prose-blockquote:bg-amber-50/40 prose-blockquote:px-4 prose-blockquote:py-3 prose-blockquote:rounded-r-xl prose-blockquote:my-4">
                {examNotesSections.length > 0 ? (
                  <div className="space-y-4">
                    {examNotesSections.map((sec: HeritageSection) => {
                      const examImageUrl = getSectionImageUrl(
                        heritage.code,
                        sec.image_code,
                      );

                      return (
                        <div
                          key={sec.id}
                          className="border border-slate-100 bg-slate-50/50 rounded-xl p-4 md:p-5"
                        >
                          {sec.title && (
                            <h4 className="text-sm md:text-md font-bold text-blue-900 mb-2 flex items-center gap-1.5">
                              <span className="w-1 h-3 bg-blue-500 rounded-full"></span>
                              {sec.title}
                            </h4>
                          )}
                          <div className="flex flex-col md:flex-row gap-5 items-start">
                            <div className="flex-1 text-sm md:text-base text-slate-600 leading-relaxed">
                              <ReactMarkdown>{sec.content}</ReactMarkdown>
                            </div>
                            <SectionImage
                              src={examImageUrl}
                              alt={sec.title || "対策画像"}
                              sourceName={sec.source_name}
                              sourceUrl={sec.source_url}
                              className="w-full h-44 md:w-44 md:h-28"
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="py-10 text-center bg-slate-50/60 rounded-2xl border border-dashed border-slate-200">
                    <p className="text-xs md:text-sm font-bold text-slate-400">
                      {getLevelLabel(activeTab)}
                      向けの対策データは現在準備中です。
                    </p>
                    <p className="text-[11px] text-slate-300 mt-1">
                      今後のコンテンツアップデートをお楽しみに！
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* スマホ用クイズ追従ボタン */}
            <div className="lg:hidden bg-white border border-slate-200 rounded-xl p-4 shadow-sm flex items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-slate-700">
                <BookOpen size={18} className="text-blue-500" />
                <span className="text-xs font-bold">
                  知識が定着したかチェック！
                </span>
              </div>
              <button
                onClick={() => setIsQuizModalOpen(true)}
                className="px-4 py-2.5 bg-blue-600 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 hover:bg-blue-700 transition"
              >
                <PlayCircle size={14} />
                <span>クイズに挑戦</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <QuizSettingsModal
        isOpen={isQuizModalOpen}
        onClose={() => setIsQuizModalOpen(false)}
        code={heritage.code}
        questionTitle={heritage.name}
        category={"h"}
      />
    </div>
  );
}
