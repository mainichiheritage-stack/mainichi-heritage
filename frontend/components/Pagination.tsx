interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  loading: boolean;
}

export const Pagination = ({ currentPage, totalPages, onPageChange, loading }: PaginationProps) => {

  const getPageNumbers = () => {
    const delta = 2;
    const pages: number[] = [];
    const withDots: (number | string)[] = [];

    // 表示するページ番号を抽出
    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === totalPages || (i >= currentPage - delta && i <= currentPage + delta)) {
        pages.push(i);
      }
    }

    // 数字の間にギャップがあれば '...' を挿入
    pages.forEach((page, index) => {
      if (index > 0 && page - pages[index - 1] > 1) {
        withDots.push('...');
      }
      withDots.push(page);
    });

    return withDots;
  };

  return (
    <div className="flex justify-center items-center gap-1 flex-wrap">
      {getPageNumbers().map((page, index) => (
        <div key={index}>
          {page === '...' ? (
            <span className="px-2 py-2 text-slate-400 font-medium select-none">
              {page}
            </span>
          ) : (
            <button
              onClick={() => onPageChange(Number(page))}
              disabled={loading}
              className={`min-w-[40px] h-10 px-3 rounded-xl text-sm font-bold transition-all active:scale-95 ${
                currentPage === page
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-200'
                  : 'bg-white text-slate-600 border border-slate-200 hover:border-blue-300 hover:text-blue-600 hover:shadow-sm'
              }`}
            >
              {page}
            </button>
          )}
        </div>
      ))}
    </div>
  );
};