

interface Props {
  currentPage: number;
  totalPage: number;
  onPageChanger: (page: number) => void;
}

const Pagination = ({
  currentPage,
  totalPage,
  onPageChanger,
}:Props) => {
  const pageNumbers: number[] = [];

  for (let i = 1; i <= totalPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="flex justify-center items-center gap-2 mt-6">
      {/* Prev Button */}
      <button
        onClick={() => onPageChanger(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-3 py-1 rounded-md text-sm font-medium transition 
          ${
            currentPage === 1
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-blue-500 text-white hover:bg-blue-600"
          }`}
      >
        Prev
      </button>

      {/* Page Numbers */}
      {pageNumbers.map((page) => (
        <button
          key={page}
          onClick={() => onPageChanger(page)}
          className={`px-3 py-1 rounded-md text-sm font-medium transition
            ${
              currentPage === page
                ? "bg-green-500 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
        >
          {page}
        </button>
      ))}

      {/* Next Button */}
      <button
        onClick={() => onPageChanger(currentPage + 1)}
        disabled={currentPage === totalPage}
        className={`px-3 py-1 rounded-md text-sm font-medium transition
          ${
            currentPage === totalPage
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-blue-500 text-white hover:bg-blue-600"
          }`}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
