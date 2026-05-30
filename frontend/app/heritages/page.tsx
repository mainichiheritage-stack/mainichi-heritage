"use client";
export const dynamic = "force-dynamic";

import { useEffect, useState, useCallback, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Heritage } from "../types";
import {
  Calendar,
  Search,
  ExternalLink,
  Inbox,
  X,
  PlayCircle,
  Globe,
  AlertTriangle,
  AlertCircle,
  Leaf,
} from "lucide-react";
import QuizSettingsModal from "../../components/QuizSettingsModal";
import { Pagination } from "../../components/Pagination";
import { log } from "@/utils/logger";
import { LOG_MESSAGES } from "@/constants/messages";
import { API_BASE_URL, R2_BASE_URL } from "@/config/env";

const ITEMS_PER_PAGE = 12;

function HeritageListContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // --- URLパラメータから現在の状態を同期 ---
  const querySearch = searchParams.get("search") || "";
  const queryCategory = searchParams.get("category") || "0";
  const queryPage = Number(searchParams.get("page")) || 1;

  // --- 状態管理 ---
  const [heritages, setHeritages] = useState<Heritage[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalCount, setTotalCount] = useState(0);

  // 入力中のテキスト
  const [inputText, setInputText] = useState(querySearch);

  const [isQuizModalOpen, setIsQuizModalOpen] = useState(false);
  const [selectedQuizHeritageCode, setSelectedQuizHeritageCode] =
    useState<string>("");
  const [selectedQuizHeritageName, setSelectedQuizHeritageName] =
    useState<string>("");

  const getImageUrl = (code: string | null | undefined) => {
    if (!code) return "";

    const filename = `heritages/${code}.webp`;
    return `${R2_BASE_URL.replace(/\/$/, "")}/${filename}`;
  };

  // --- データ取得ロジック ---
  const fetchHeritages = useCallback(async () => {
    setLoading(true);
    let url = "";

    try {
      const categoryParam =
        queryCategory !== "0" ? `&category=${queryCategory}` : "";
      url = `${API_BASE_URL}/heritages/?page=${queryPage}&search=${encodeURIComponent(querySearch)}${categoryParam}`;

      const res = await fetch(url);
      const data = await res.json();

      setHeritages(data.results || []);
      setTotalCount(data.count || 0);

      if (!data.count || data.count === 0) {
        log.warn(LOG_MESSAGES.WARN.NOT_FOUND_HERITAGES, {
          querySearch,
          queryCategory,
          queryPage,
          url,
        });
      }
    } catch (err) {
      log.error(LOG_MESSAGES.ERROR.FAILED_HERITAGE_FETCH, {
        error: err,
        url,
      });
    } finally {
      setLoading(false);
    }
  }, [queryPage, querySearch, queryCategory]);

  useEffect(() => {
    fetchHeritages();
    setInputText(querySearch);
  }, [fetchHeritages, querySearch]);

  // --- 画面遷移（URL更新）ロジック ---
  const updateNavigation = (updates: {
    search?: string;
    category?: string;
    page?: number;
  }) => {
    const params = new URLSearchParams(searchParams.toString());

    if (updates.search !== undefined) params.set("search", updates.search);
    if (updates.category !== undefined)
      params.set("category", updates.category);

    if (updates.page !== undefined) {
      params.set("page", updates.page.toString());
    } else {
      params.set("page", "1");
    }

    router.push(`?${params.toString()}`);
  };

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateNavigation({ search: inputText });
    window.scrollTo({ top: 0, behavior: "instant" });
  };

  const handleCategoryChange = (val: string) => {
    updateNavigation({ category: val });
  };

  const handlePageChange = (newPage: number) => {
    updateNavigation({ page: newPage });
    window.scrollTo({ top: 0, behavior: "instant" });
  };

  const handleQuizClick = (
    e: React.MouseEvent,
    heritageCode: string,
    heritageName: string,
  ) => {
    e.preventDefault();
    e.stopPropagation();
    setSelectedQuizHeritageCode(heritageCode);
    setSelectedQuizHeritageName(heritageName);
    setIsQuizModalOpen(true);
  };

  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);

  const CategoryBadge = ({
    category,
    className = "",
  }: {
    category: number;
    className?: string;
  }) => {
    const config = {
      1: { label: "文化", color: "#af6700" },
      2: { label: "自然", color: "#008a33" },
      3: { label: "複合", color: "#de00cb" },
    }[category] || { label: "不明", color: "#64748b" };
    return (
      <span
        style={{ backgroundColor: config.color }}
        className={`text-white font-bold px-2 py-0.5 rounded shadow-sm shrink-0 ${className}`}
      >
        {config.label}
      </span>
    );
  };

  const handleClear = () => {
    setInputText("");
    updateNavigation({ search: "", category: "0", page: 1 });
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-6 py-10">
        <h1 className="text-main-title font-bold">世界遺産データベース</h1>

        {/* 検索・フィルターフォーム */}
        <form
          onSubmit={handleSearch}
          className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 mb-8 flex flex-wrap gap-4 items-end"
        >
          <div className="flex-1 min-w-[200px]">
            <label className="text-xs font-bold text-slate-500 mb-2 block">
              キーワード
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="遺産名または国名で検索"
                className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
              />
              <button
                type="button"
                onClick={() => setInputText("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="w-40">
            <label className="text-xs font-bold text-slate-500 mb-2 block">
              カテゴリー
            </label>
            <select
              value={queryCategory}
              onChange={(e) => handleCategoryChange(e.target.value)}
              className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none"
            >
              <option value="0">すべて</option>
              <option value="1">文化遺産</option>
              <option value="2">自然遺産</option>
              <option value="3">複合遺産</option>
            </select>
          </div>

          <button
            type="button"
            onClick={handleClear}
            className="px-4 py-2 rounded-lg text-sm font-bold text-slate-500 hover:bg-slate-100 transition-colors"
          >
            リセット
          </button>

          <button
            type="submit"
            disabled={loading}
            className={`px-6 py-2 rounded-lg text-sm font-bold transition-colors shadow-sm ${
              loading
                ? "bg-slate-300 text-slate-500 cursor-not-allowed"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            {loading ? "検索中..." : "検索する"}
          </button>
        </form>

        <p className="text-sm text-slate-500 mb-6">
          全 {totalCount} 件中 {heritages.length} 件を表示中
          {totalPages > 1 && ` (ページ ${queryPage} / ${totalPages})`}
        </p>

        {/* カード一覧 */}
        {heritages.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-8">
            {heritages.map((h) => (
              <Link
                key={h.id}
                href={`/heritages/${h.code}`}
                className="bg-white rounded-xl md:rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition border border-slate-100 group flex flex-col cursor-pointer"
              >
                <div className="relative h-32 md:h-56 bg-slate-200">
                  <Image
                    src={getImageUrl(h.code)}
                    alt={h.name}
                    fill
                    unoptimized
                    className="object-cover"
                    sizes="(max-width: 768px) 50vw, 33vw"
                  />
                  <div className="hidden md:flex absolute bottom-2 right-2 px-1.5 py-0.5 bg-black/60 backdrop-blur-md rounded-md z-20">
                    <span
                      role="button"
                      className="text-[9px] text-white flex items-center gap-1 hover:text-blue-200 cursor-pointer"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        if (h.source_url)
                          window.open(
                            h.source_url,
                            "_blank",
                            "noopener,noreferrer",
                          );
                      }}
                    >
                      出典：{h.source_name || "unknown"}（加工あり）
                      <ExternalLink className="w-2 h-2" />
                    </span>
                  </div>
                </div>

                <div className="p-3 md:p-6 flex flex-col flex-1">
                  {/* 世界遺産名 */}
                  <h2 className="text-sm md:text-xl font-bold mb-1.5 md:mb-3 group-hover:text-blue-600 transition leading-tight line-clamp-2 md:min-h-[3.5rem]">
                    {h.name}
                  </h2>
                  <div className="flex items-center gap-1.5 md:gap-3 text-[9px] md:text-xs text-slate-500 mb-2 md:mb-4 flex-wrap">
                    {/* 遺産種別 */}
                    <CategoryBadge
                      category={h.category}
                      className="text-[10px] md:text-xs uppercase tracking-wider"
                    />

                    {/* 登録年 */}
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 md:w-3.5 md:h-3.5" />{" "}
                      {h.registered_year}
                    </div>

                    {/* 所在国 */}
                    {h.countries && h.countries.length > 0 && (
                      <div className="flex items-center gap-1 min-w-0">
                        <Globe className="w-3 h-3 md:w-3.5 md:h-3.5 shrink-0" />
                        <span className="truncate">
                          {h.countries.slice(0, 2).join(", ")}
                          {h.countries.length > 2 &&
                            ` +${h.countries.length - 2}`}
                        </span>
                      </div>
                    )}

                    {/* 危機遺産表示 */}
                    {h.is_danger && (
                      <div className="flex items-center gap-1 text-red-500 font-bold bg-red-50 px-1.5 py-0.5 rounded">
                        <AlertTriangle className="w-2.5 h-2.5 md:w-3 md:h-3" />
                        <span>危機遺産 ({h.danger_registered_year}〜)</span>
                      </div>
                    )}

                    {/* 負の遺産表示 */}
                    {h.is_negative_heritage && (
                      <div className="flex items-center gap-1 text-slate-600 font-bold bg-slate-200 px-1.5 py-0.5 rounded">
                        <AlertCircle className="w-2.5 h-2.5 md:w-3 md:h-3" />
                        <span>負の遺産</span>
                      </div>
                    )}

                    {/* 文化的景観表示 */}
                    {h.is_cultural_landscape && (
                      <div className="flex items-center gap-1 text-emerald-600 font-bold bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-100">
                        <Leaf className="w-2.5 h-2.5 md:w-3 md:h-3" />
                        <span>文化的景観</span>
                      </div>
                    )}
                  </div>
                  <p className="hidden md:block text-sm text-slate-500 line-clamp-2 leading-relaxed italic mb-6">
                    {h.catchphrase}
                  </p>
                  <button
                    onClick={(e) => handleQuizClick(e, h.code, h.name)}
                    className="mt-auto w-full py-2 md:py-2.5 bg-blue-50 text-blue-600 rounded-lg md:rounded-xl text-[10px] md:text-sm font-bold flex items-center justify-center gap-1 md:gap-2 hover:bg-blue-600 hover:text-white transition-all border border-blue-100 active:scale-[0.98]"
                  >
                    <PlayCircle className="w-3 h-3 md:w-4 md:h-4" />
                    <span className="hidden xs:inline">クイズに挑戦</span>
                    <span className="xs:hidden">クイズ</span>
                  </button>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          !loading && (
            <div className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl border border-dashed border-slate-300">
              <Inbox className="w-12 h-12 text-slate-300 mb-4" />
              <p className="text-slate-500 font-medium">
                該当する世界遺産が見つかりませんでした
              </p>
            </div>
          )
        )}

        {/* ページネーション */}
        {totalPages > 1 && (
          <div className="mt-12 pb-10">
            <Pagination
              currentPage={queryPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
              loading={loading}
            />
          </div>
        )}
      </div>

      <QuizSettingsModal
        isOpen={isQuizModalOpen}
        onClose={() => setIsQuizModalOpen(false)}
        code={selectedQuizHeritageCode}
        questionTitle={selectedQuizHeritageName}
        category={"h"}
      />
    </div>
  );
}

// --- エクスポートされるデフォルトコンポーネント ---
export default function HeritageListPage() {
  return (
    <Suspense
      fallback={
        <div className="p-10 text-center text-slate-500">読み込み中...</div>
      }
    >
      <HeritageListContent />
    </Suspense>
  );
}
