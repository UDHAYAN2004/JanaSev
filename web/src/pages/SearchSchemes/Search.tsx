import React, { useEffect, useState } from "react";
import SearchSchemes from "./SearchSchemes";
import Pagination from "../../components/pagination/pagination";
import { useLazyGetSchemeQuery } from "./Slice";
import { Link } from "react-router-dom";

const Search = () => {
  const [page, setPage] = useState(1);
  const [schemes, setSchemes] = useState<any>(null);
  const [totalPages, setTotalPages] = useState(1);

  const [triggerGetScheme] = useLazyGetSchemeQuery();

  // Fetch whenever page changes
  useEffect(() => {
    fetchSchemes();
  }, [page]);

  const fetchSchemes = async () => {
    const response = await triggerGetScheme({ page }).unwrap();
    setSchemes(response);

    if (response) {
      setTotalPages(response.totalPages || 1);
    }
  };

  const schemedata = schemes?.data || [];

  return (
    <>
      {/* Pass fetchSchemes to SearchSchemes so it refreshes results */}
      <SearchSchemes setSchemes={setSchemes} fetchSchemes={fetchSchemes} />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-6 py-8">
  {schemedata.length > 0 ? (
    schemedata.map((scheme: any) => (
      <div
        key={scheme.id}
        className="group p-[3px] bg-gradient-to-r from-blue-500 via-purple-500 to-green-500 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
      >
        <div className="bg-white h-full flex flex-col p-6 rounded-xl relative overflow-hidden">
          {/* Gradient Corner Accent */}
          <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-bl-full hover:duration-300 hover:translate-x-[-4px]"></div>
          
          <div className="flex items-start justify-between mb-4">
            <h1 className="text-xl font-bold text-gray-800 pr-2 leading-tight">
              {scheme.title}
            </h1>
            
          </div>

          <div className="flex flex-wrap gap-2 mb-4">
            {scheme.category.split(" ").map((word: string, index: number) => (
              <span
                key={index}
                className="bg-green-500 to-emerald-600 text-white text-xs px-3 py-1.5 rounded-full font-medium shadow-sm"
              >
                {word}
              </span>
            ))}
          </div>

          <p className="text-gray-600 leading-relaxed mb-6 flex-grow line-clamp-3">
            {scheme.description}
          </p>

          {/* Additional Info Badge */}
          <div className="flex items-center justify-between mb-4">
            <span className="bg-blue-50 text-blue-600 text-xs px-3 py-1.5 rounded-full border border-blue-200">
              <i className="fas fa-clock mr-1"></i>
              Apply Soon
            </span>
            <span className="text-xs text-gray-500">
              <i className="far fa-eye mr-1"></i>
              2.5k views
            </span>
          </div>

          <p
            
            rel="noopener noreferrer"
            className="group bg-green-500  text-white text-center py-3 px-4  font-semibold hover:shadow-lg transition-all duration-300 hover:from-green-600 hover:to-emerald-700 flex items-center justify-center gap-2"
          >
            <Link to={`/schemes/${scheme.id}`}>View Details</Link>
           
          </p>
        </div>
      </div>
    ))
  ) : (
    <div className="col-span-full flex flex-col items-center justify-center py-16 text-center">
      <div className="w-24 h-24 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full flex items-center justify-center mb-4">
        <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      <h3 className="text-xl font-semibold text-gray-600 mb-2">No schemes found</h3>
      <p className="text-gray-500 max-w-md">We couldn't find any schemes matching your criteria. Please try different filters.</p>
    </div>
  )}
</div>
      <Pagination
        currentPage={page}
        totalPage={totalPages}
        onPageChanger={setPage}
      />
    </>
  );
};

export default Search;
