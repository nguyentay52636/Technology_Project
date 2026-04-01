"use client"

interface ProductPaginationProps {
  currentPage: number;
  totalPages: number;
  onPrevious: () => void;
  onNext: () => void;
}

export default function ProductPagination({
  currentPage,
  totalPages,
  onPrevious,
  onNext,
}: ProductPaginationProps) {
  return (
    <div className="mt-8 flex items-center justify-center gap-4 rounded-2xl border border-slate-200 bg-gradient-to-r from-slate-50 via-white to-slate-50 px-4 py-3 shadow-sm">
      <button
        onClick={onPrevious}
        disabled={currentPage === 1}
        className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:-translate-y-0.5 hover:bg-slate-100 hover:shadow disabled:cursor-not-allowed disabled:opacity-40"
      >
        ← Prev
      </button>

      <span className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-600 shadow-sm">
        Trang <strong className="text-slate-900">{currentPage}</strong> / {totalPages}
      </span>

      <button
        onClick={onNext}
        disabled={currentPage === totalPages}
        className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:-translate-y-0.5 hover:bg-slate-100 hover:shadow disabled:cursor-not-allowed disabled:opacity-40"
      >
        Next →
      </button>
    </div>
  );
}