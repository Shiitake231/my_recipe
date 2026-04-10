export default function Pagination({ page, totalPages, setPage }) {
  return (
    <div className="flex items-center justify-center gap-2 py-10">
      <button
        onClick={() => setPage(page - 1)}
        disabled={page === 1}
        className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-30 transition-all"
      >
        <span className="sr-only">Previous</span>
        ←
      </button>

      {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
        <button
          key={num}
          onClick={() => setPage(num)}
          className={`w-10 h-10 rounded-lg text-sm font-medium transition-all ${
            page === num 
              ? "bg-orange-500 text-white shadow-md shadow-orange-200" 
              : "text-gray-600 hover:bg-gray-100"
          }`}
        >
          {num}
        </button>
      )).slice(Math.max(0, page - 3), Math.min(totalPages, page + 2))}

      <button
        onClick={() => setPage(page + 1)}
        disabled={page === totalPages}
        className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-30 transition-all"
      >
        →
      </button>
    </div>
  );
}