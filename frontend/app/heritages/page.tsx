"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { Heritage, Criterion } from "../types";
import {
  Calendar,
  Search,
  ExternalLink,
  Inbox,
  X,
  Info,
  PlayCircle,
  Globe,
  AlertTriangle,
} from "lucide-react";
import ReactMarkdown from "react-markdown";
import QuizSettingsModal from "../../components/QuizSettingsModal";
import { Pagination } from "../../components/Pagination";

const ITEMS_PER_PAGE = 15;

export default function HeritageListPage() {
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

  // 入力中のテキスト（検索ボタン押下で確定）
  const [inputText, setInputText] = useState(querySearch);

  const [selectedHeritage, setSelectedHeritage] = useState<Heritage | null>(
    null,
  );
  const [isQuizModalOpen, setIsQuizModalOpen] = useState(false);
  const [selectedQuizHeritageCode, setSelectedQuizHeritageCode] =
    useState<string>("");

  // --- データ取得ロジック ---
  const fetchHeritages = useCallback(async () => {
    setLoading(true);
    try {
      const categoryParam =
        queryCategory !== "0" ? `&category=${queryCategory}` : "";
      const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/heritages/?page=${queryPage}&search=${encodeURIComponent(querySearch)}${categoryParam}`;

      const res = await fetch(url);
      const data = await res.json();

      setHeritages(data.results || []);
      setTotalCount(data.count || 0);
    } catch (err) {
      console.error("世界遺産一覧の取得に失敗しました：", err);
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

    // 条件が変わった場合は1ページ目へ、ページ変更のみの場合はそのページへ
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

  const handleQuizClick = (e: React.MouseEvent, heritageCode: string) => {
    e.stopPropagation();
    setSelectedQuizHeritageCode(heritageCode);
    setIsQuizModalOpen(true);
  };

  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);

  // --- サブコンポーネント ---
  const CriterionTooltip = ({
    criterion,
  }: {
    criterion: Criterion | number;
  }) => {
    const [isOpen, setIsOpen] = useState(false);
    if (!criterion || typeof criterion === "number") {
      return (
        <span className="text-sm font-bold text-blue-600 px-1">
          {criterion}
        </span>
      );
    }
    const closeTooltip = (e: React.MouseEvent) => {
      e.stopPropagation();
      setIsOpen(false);
    };
    return (
      <span
        className="relative inline-block mx-0.5"
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
      >
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setIsOpen(!isOpen);
          }}
          className="font-bold text-blue-600 border-b border-dotted border-blue-400 cursor-pointer focus:outline-none"
        >
          {criterion.number}
        </button>
        {isOpen && (
          <>
            <div
              className="fixed inset-0 z-[110] md:hidden bg-black/10"
              onClick={closeTooltip}
            />
            <div
              className="p-6 bg-slate-800 text-white leading-relaxed rounded-3xl shadow-2xl animate-in fade-in zoom-in-95 duration-200 z-[120] fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[85vw] max-w-[320px] text-[13px] md:absolute md:top-auto md:bottom-full md:left-1/2 md:-translate-x-1/2 md:-translate-y-0 md:mb-3 md:w-64 md:p-4 md:text-[11px]"
              onClick={(e) => e.stopPropagation()}
            >
              <p className="font-bold border-b border-slate-600 mb-3 pb-2 text-blue-300 text-sm flex items-center gap-2">
                <Info size={16} className="md:w-3 md:h-3" /> 登録基準{" "}
                {criterion.number}
              </p>
              <div className="space-y-2">
                <p className="font-bold text-slate-100 text-sm md:text-[12px]">
                  {criterion.short_name}
                </p>
                <p className="text-slate-300 font-medium leading-relaxed">
                  {criterion.description}
                </p>
              </div>
              <button
                onClick={closeTooltip}
                className="absolute top-4 right-4 p-1.5 text-slate-400 bg-slate-700/50 rounded-full hover:text-white md:hidden"
              >
                <X size={20} />
              </button>
            </div>
          </>
        )}
      </span>
    );
  };

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
              <div
                key={h.id}
                onClick={() => setSelectedHeritage(h)}
                className="bg-white rounded-xl md:rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition border border-slate-100 group flex flex-col cursor-pointer"
              >
                <div className="relative h-32 md:h-56 bg-slate-200">
                  <Image
                    src={h.image_url || ""}
                    alt={h.name}
                    fill
                    unoptimized
                    className="object-cover"
                    sizes="(max-width: 768px) 50vw, 33vw"
                  />
                  <div className="hidden md:flex absolute bottom-2 right-2 px-1.5 py-0.5 bg-black/60 backdrop-blur-md rounded-md z-20">
                    <a
                      href={h.source_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[9px] text-white flex items-center gap-1"
                      onClick={(e) => e.stopPropagation()}
                    >
                      出典：{h.source_name || "unknown"}{" "}
                      <ExternalLink className="w-2 h-2" />
                    </a>
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

                    {/* 危機遺産表示 */}
                    {h.is_danger && (
                      <div className="flex items-center gap-1 text-red-500 font-bold bg-red-50 px-1.5 py-0.5 rounded">
                        <AlertTriangle className="w-2.5 h-2.5 md:w-3 md:h-3" />
                        <span>危機遺産 ({h.danger_registered_year}〜)</span>
                      </div>
                    )}

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
                  </div>
                  <p className="hidden md:block text-sm text-slate-500 line-clamp-2 leading-relaxed italic mb-6">
                    {h.catchphrase}
                  </p>
                  <button
                    onClick={(e) => handleQuizClick(e, h.code)}
                    className="mt-auto w-full py-2 md:py-2.5 bg-blue-50 text-blue-600 rounded-lg md:rounded-xl text-[10px] md:text-sm font-bold flex items-center justify-center gap-1 md:gap-2 hover:bg-blue-600 hover:text-white transition-all border border-blue-100 active:scale-[0.98]"
                  >
                    <PlayCircle className="w-3 h-3 md:w-4 md:h-4" />
                    <span className="hidden xs:inline">クイズに挑戦</span>
                    <span className="xs:hidden">クイズ</span>
                  </button>
                </div>
              </div>
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
        heritageCode={selectedQuizHeritageCode}
      />

      {/* 詳細モーダル */}
      {selectedHeritage && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setSelectedHeritage(null)}
        >
          <div
            className="bg-white w-full max-w-4xl h-full max-h-[95vh] rounded-3xl overflow-hidden shadow-2xl relative animate-in zoom-in-95 duration-200 flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedHeritage(null)}
              className="absolute top-5 right-5 z-10 p-2.5 bg-white/90 backdrop-blur-md rounded-full shadow-md hover:bg-white transition-all active:scale-95"
            >
              <X className="w-5 h-5 text-slate-600" />
            </button>
            <div className="overflow-y-auto">
              <div className="relative h-64 md:h-[450px]">
                <Image
                  src={selectedHeritage.image_url || ""}
                  alt={selectedHeritage.name}
                  fill
                  unoptimized
                  className="object-cover"
                />
                <div className="absolute bottom-4 right-4 px-3 py-1.5 bg-black/60 backdrop-blur-md rounded-xl opacity-100 transition-opacity duration-300">
                  <a
                    href={selectedHeritage.source_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[10px] text-white flex items-center gap-1.5 hover:text-blue-200"
                  >
                    <span className="font-medium">
                      出典: {selectedHeritage.source_name || "Wikipedia"}
                    </span>
                    <ExternalLink className="w-3 h-3 opacity-70" />
                  </a>
                </div>
              </div>
              <div className="p-6 md:p-8">
                <h2 className="text-2xl font-bold text-slate-800 mb-4">
                  {selectedHeritage.name}
                </h2>
                <CategoryBadge
                  category={selectedHeritage.category}
                  className="text-[10px] md:text-xs uppercase tracking-wider mt-1.5"
                />
                {selectedHeritage.is_danger && (
                  <div className="flex items-center gap-1.5 text-red-600 font-bold text-[11px] md:text-sm bg-red-50 border border-red-100 px-3 py-1 rounded-full animate-pulse-subtle">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    <span>
                      危機遺産リストに登録中 (
                      {selectedHeritage.danger_registered_year}年〜)
                    </span>
                  </div>
                )}
                <div className="grid grid-cols-3 gap-4 py-4 border-y border-slate-100 my-4">
                  <div>
                    <span className="text-xs font-bold text-slate-400 block uppercase">
                      登録年
                    </span>
                    <span className="font-medium">
                      {selectedHeritage.registered_year}年
                    </span>
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-400 block uppercase">
                      所在国
                    </span>
                    <span
                      className="font-medium truncate block"
                      title={selectedHeritage.countries?.join(", ")}
                    >
                      {selectedHeritage.countries?.join(", ")}
                    </span>
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-400 block uppercase">
                      登録基準
                    </span>
                    <div className="flex flex-wrap gap-1 mt-0.5">
                      {selectedHeritage.criteria?.map((c: any, idx: number) => (
                        <CriterionTooltip key={idx} criterion={c} />
                      ))}
                    </div>
                  </div>
                </div>
                <div className="prose prose-slate max-w-none">
                  <ReactMarkdown>
                    {selectedHeritage.description || "詳細情報はありません。"}
                  </ReactMarkdown>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
