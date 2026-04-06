'use client';

import { useEffect, useState, useCallback } from 'react';
import Image from 'next/image';
import { Heritage , Criterion } from '../types';
import { MapPin, Calendar, Search, ExternalLink, Inbox, X , Info, PlayCircle } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import QuizSettingsModal from '../../components/QuizSettingsModal';
import {Pagination} from '../../components/Pagination';

const ITEMS_PER_PAGE = 5;

export default function HeritageListPage() {
  const [heritages, setHeritages] = useState<Heritage[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalCount, setTotalCount] = useState(0);
  const [inputText, setInputText] = useState('');
  const [activeSearchTerm, setActiveSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('0');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedHeritage, setSelectedHeritage] = useState<Heritage | null>(null);
  const [isQuizModalOpen, setIsQuizModalOpen] = useState(false);
  const [selectedQuizHeritageId, setSelectedQuizHeritageId] = useState<number>(0);

  const getHeritageImageUrl = (h_id: number) => {
    // IDを5桁でゼロ埋め (例: 1 -> "00001")
    const paddedId = String(h_id).padStart(5, '0');
    const filename = `${paddedId}.jpg`;

    const baseUrl = process.env.NEXT_PUBLIC_IMAGE_BASE_URL || '/images/heritages';
    const separator = baseUrl.endsWith('/') ? '' : '/';
    
    return `${baseUrl}${separator}${filename}`;
  };

  const fetchHeritages = useCallback(async () => {
    setLoading(true);
    try {
      const categoryParam = categoryFilter !== '0' ? `&category=${categoryFilter}` : '';
      const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/heritages/?page=${currentPage}&search=${activeSearchTerm}${categoryParam}`;
      const res = await fetch(url);
      const data = await res.json();
      
      setHeritages(data.results || []);
      setTotalCount(data.count || 0);
    } catch (err) {
      console.error("世界遺産一覧の取得に失敗しました：", err);
    } finally {
      setLoading(false);
    }
  }, [currentPage, activeSearchTerm, categoryFilter]);

  useEffect(() => {
    fetchHeritages();
  }, [fetchHeritages, categoryFilter]);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setActiveSearchTerm(inputText);
    setCurrentPage(1);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const handleQuizClick = (e: React.MouseEvent, heritageId: number) => {
    e.stopPropagation();
    setSelectedQuizHeritageId(heritageId);
    setIsQuizModalOpen(true);
  };

  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  if (loading && heritages.length === 0) return (
    <div className="flex flex-col items-center justify-center min-h-screen text-slate-500 gap-3">
      <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      <p>読み込み中...</p>
    </div>
  );

  const CriterionTooltip = ({ criterion }: { criterion: Criterion | number }) => {
    if (!criterion || typeof criterion === 'number') {
      return <span className="text-sm font-bold text-blue-600 px-1">{criterion}</span>;
    }

    return (
      <span className="group relative inline-block font-bold text-blue-600 border-b border-dotted border-blue-400 cursor-help mx-0.5">
        {criterion.number}
        <span className="pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-64 p-4 bg-slate-800 text-white text-[11px] leading-relaxed rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-[110] shadow-2xl whitespace-normal">
          <p className="font-bold border-b border-slate-600 mb-2 pb-1 text-blue-300 text-xs flex items-center gap-1">
            <Info size={12} /> 登録基準 {criterion.number}
          </p>
          <p className="font-medium text-slate-200 mb-1">{criterion.short_name}</p>
          <span className="text-slate-400 block mt-1">{criterion.description}</span>
          <span className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-slate-800"></span>
        </span>
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-6 py-10">
        <h1 className="text-3xl font-bold mb-8 text-slate-800">世界遺産データベース</h1>

        {/* 検索・フィルター */}
        <form 
          onSubmit={handleSearch} 
          className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 mb-8 flex flex-wrap gap-4 items-end"
        >
          <div className="flex-1 min-w-[200px]">
            <label className="text-xs font-bold text-slate-500 mb-2 block">キーワード</label>
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
            <label className="text-xs font-bold text-slate-500 mb-2 block">カテゴリー</label>
            <select 
              value={categoryFilter}
              onChange={(e) => {
                setCategoryFilter(e.target.value);
                setCurrentPage(1);
              }}
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
              loading ? 'bg-slate-300 text-slate-500 cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            {loading ? '検索中...' : '検索する'}
          </button>
        </form>

        <p className="text-sm text-slate-500 mb-6">
          全 {totalCount} 件中 {heritages.length} 件を表示中
          {totalPages > 1 && ` (ページ ${currentPage} / ${totalPages})`}
        </p>

        {/* カード一覧 */}
        {heritages.length > 0 ? (
          /* 修正ポイント1: 
            grid-cols-2（スマホで2列）を追加。gap-3 でスマホ時の余白を調整。
            md:grid-cols-2 lg:grid-cols-3 でタブレット・PCの挙動を維持。
          */
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-8">
            {heritages.map((h) => (
              <div
                key={h.id}
                onClick={() => setSelectedHeritage(h)}
                className="bg-white rounded-xl md:rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition border border-slate-100 group flex flex-col"
              >
                {/* 修正ポイント2: スマホでは画像の高さを抑える（h-32 md:h-56） */}
                <div className="relative h-32 md:h-56 bg-slate-200">
                  <Image
                    src={getHeritageImageUrl(h.id)}
                    alt={h.name}
                    fill
                    className="object-cover"
                    loading="lazy"
                    sizes="(max-width: 768px) 50vw, 33vw"
                  />
                  {/* 出典リンクはスマホでは少し邪魔になるので、PCのみ表示またはサイズ縮小 */}
                  <div className="absolute bottom-1 right-1 md:bottom-2 md:right-2 px-1.5 py-0.5 bg-black/50 backdrop-blur-md rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <a href={h.source_url} target="_blank" rel="noopener noreferrer" className="text-[7px] md:text-[9px] text-white flex items-center gap-1">
                      出典 <ExternalLink className="w-2 h-2" />
                    </a>
                  </div>
                </div>

                {/* 修正ポイント3: パディングをスマホ用に最適化 (p-3 md:p-6) */}
                <div className="p-3 md:p-6 flex flex-col flex-1">
                  {/* タイトルのフォントサイズを調整 (text-sm md:text-xl) */}
                  <h2 className="text-sm md:text-xl font-bold mb-1.5 md:mb-3 group-hover:text-blue-600 transition leading-tight line-clamp-2 md:min-h-[3.5rem]">
                    {h.name}
                  </h2>

                  {/* 修正ポイント4: メタ情報はスマホでは最小限に（国名などは隠すか縮小） */}
                  <div className="flex items-center gap-1.5 md:gap-3 text-[9px] md:text-xs text-slate-500 mb-2 md:mb-4 flex-wrap">
                    <span 
                      style={{ backgroundColor: h.category === 1 ? '#af6700' : h.category === 2 ? '#008a33' : '#de00cb' }} 
                      className="text-white font-bold px-1.5 py-0.5 md:px-2.5 md:py-1 rounded shadow-sm scale-90 md:scale-100 origin-left"
                    >
                      {h.category === 1 ? '文化' : h.category === 2 ? '自然' : '複合'}
                    </span>
                    <div className="flex items-center gap-1"><Calendar className="w-3 h-3 md:w-3.5 md:h-3.5" /> {h.registered_year}</div>
                  </div>

                  {/* キャッチフレーズはスマホでは非表示にしてスッキリさせる */}
                  <p className="hidden md:block text-sm text-slate-500 line-clamp-2 leading-relaxed italic mb-6">
                    {h.catchphrase}
                  </p>

                  {/* クイズボタンもスマホサイズに最適化 */}
                  <button
                    onClick={(e) => handleQuizClick(e, h.id)}
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
        ) : !loading && (
          <div className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl border border-dashed border-slate-300">
            <Inbox className="w-12 h-12 text-slate-300 mb-4" />
            <p className="text-slate-500 font-medium">該当する世界遺産が見つかりませんでした</p>
          </div>
        )}

        {/* ページネーション */}
        {totalPages > 1 && (
          <div className="mt-12 pb-10">
            <Pagination 
              currentPage={currentPage} 
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
        heritageId={selectedQuizHeritageId} 
      />

      {/* 世界遺産（詳細） */}
      {selectedHeritage && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setSelectedHeritage(null)}
        >
          <div 
            className="bg-white w-full max-w-2xl max-h-[90vh] rounded-3xl overflow-hidden shadow-2xl relative animate-in zoom-in-95 duration-200 flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={() => setSelectedHeritage(null)}
              className="absolute top-4 right-4 z-10 p-2 bg-white/80 backdrop-blur-md rounded-full shadow-sm hover:bg-white transition-colors"
            >
              <X className="w-5 h-5 text-slate-600" />
            </button>

            {/* モーダル内コンテンツ */}
            <div className="overflow-y-auto">
              <div className="relative h-80">
                <Image
                  src={getHeritageImageUrl(selectedHeritage.id)}
                  alt={selectedHeritage.name}
                  fill
                  className="object-cover"
                  loading="lazy"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute bottom-4 right-4 px-3 py-1.5 bg-black/60 backdrop-blur-md rounded-xl opacity-100 transition-opacity duration-300">
                  <a 
                    href={selectedHeritage.source_url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-[10px] text-white flex items-center gap-1.5 hover:text-blue-200"
                  >
                    <span className="font-medium">出典: {selectedHeritage.source_name || 'Wikipedia'}</span>
                    <ExternalLink className="w-3 h-3 opacity-70" />
                  </a>
                </div>
              </div>
              <div className="p-8">
                <h2 className="text-2xl font-bold text-slate-800 mb-4">{selectedHeritage.name}</h2>
                <div className="space-y-4 text-slate-600 leading-relaxed">
                  <div className="grid grid-cols-3 gap-4 py-4 border-y border-slate-100">
                    <div>
                      <span className="text-xs font-bold text-slate-400 block uppercase">登録年</span>
                      <span className="font-medium">{selectedHeritage.registered_year}年</span>
                    </div>
                    <div>
                      <span className="text-xs font-bold text-slate-400 block uppercase">所在国</span>
                      <span className="font-medium truncate block" title={selectedHeritage.countries?.join(', ')}>
                        {selectedHeritage.countries?.join(', ')}
                      </span>
                    </div>
                    <div>
                      <span className="text-xs font-bold text-slate-400 block uppercase">登録基準</span>
                      <div className="flex flex-wrap gap-1 mt-0.5">
                        {selectedHeritage.criteria && selectedHeritage.criteria.length > 0 ? (
                          selectedHeritage.criteria.map((c: number, idx) => (
                            <CriterionTooltip key={idx} criterion={c} />
                          ))
                        ) : (
                          <span className="text-sm text-slate-400 italic">未設定</span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="prose prose-slate max-w-none dark:prose-invert">
                    <ReactMarkdown>
                      {selectedHeritage.description || "詳細情報はありません。"}
                    </ReactMarkdown>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}