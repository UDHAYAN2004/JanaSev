import { useState } from 'react';
import img1 from '../../assets/SearchSchemes/AdobeStock FARMING.jpeg';
import img2 from '../../assets/SearchSchemes/GRARDENING.jpg';
import img3 from '../../assets/SearchSchemes/RICE.jpeg';
import img4 from '../../assets/SearchSchemes/THRASHING.jpg';
import img5 from '../../assets/SearchSchemes/black student.jpg';
import img6 from '../../assets/SearchSchemes/black student2.jpg';
import img7 from '../../assets/SearchSchemes/students.jpg';
import img8 from '../../assets/SearchSchemes/teacher-rounds.jpg';
import { useGetCommunityQuery, useGetStateQuery,useGetCategoryQuery,useLazyGetSchemeQuery } from './Slice';

interface ImageGroup1 {
  one: string;
  two: string;
  three: string;
  four: string;
}

interface ImageGroup2 {
  five: string;
  six: string;
  seven: string;
  eight: string;
}

const SearchSchemes = ({setSchemes,page}) => {
  const images1: ImageGroup1[] = [
    { one: img1, two: img2, three: img3, four: img4 }
  ];
  
  const images2: ImageGroup2[] = [
    { five: img5, six: img6, seven: img7, eight: img8 }
  ];

  const [selectedCommunity, setSelectedCommunity] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const communities=useGetCommunityQuery()
  const states=useGetStateQuery()
  const categories=useGetCategoryQuery()
  const community=(communities?.data?.data)
  const state=(states?.data?.data)
  const categorie=(categories?.data?.data)
  const[searchTrigger]=useLazyGetSchemeQuery()
  
 
  const handleSearch = async() => {
   try {
    const result= await searchTrigger({
      page:page,
      community:selectedCommunity,
      category:selectedCategory,
      state:selectedState
    }).unwrap()
    setSchemes(result)
    
   } catch (error) {
       console.log(error)
   }
  };

  const handleReset = () => {
    setSearchQuery('');
    setSelectedCommunity('');
    setSelectedCategory('');
    setSelectedState('');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-emerald-900 px-4 sm:px-6 lg:px-8 py-16 lg:py-24 overflow-hidden relative">
      
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-green-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
      <div className="absolute top-0 right-0 w-72 h-72 bg-yellow-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-20 w-72 h-72 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center relative z-10">
        
        {/* Left side - Text Content */}
        <div className="text-center lg:text-left space-y-6 lg:space-y-8">
          <div className="space-y-4">
            <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight">
              Search Your 
              <span className="text-green-400 block">Schemes</span>
            </h1>
            <p className="text-lg lg:text-xl text-gray-300 max-w-lg mx-auto lg:mx-0 leading-relaxed">
              Discover tailored government schemes and opportunities that match your profile and aspirations
            </p>
          </div>

          {/* Search Form */}
          <div className="w-full p-6 sm:p-8 flex flex-col gap-6  backdrop-blur-xl rounded-xl border-2 border-white/20 shadow-2xl shadow-green-500/10 hover:shadow-green-500/20 transition-all duration-500">
            
            {/* Search Input */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-green-300 uppercase tracking-wide">Search Schemes</label>
              <div className="relative group flex-1">
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Enter scheme name..." 
                  className="w-full px-6 py-4 bg-white/10 backdrop-blur-sm rounded-2xl border-2 border-white/15 text-white placeholder-gray-400 focus:outline-none focus:border-green-500 focus:ring-4 focus:ring-green-500/20 transition-all duration-300 group-hover:border-white/30 text-lg"
                />
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Filters Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              
              {/* Community Select */}
              <div className="space-y-3 group">
                <label className="text-sm font-semibold text-green-300 uppercase tracking-wide">Community</label>
                <div className="relative">
                  <select 
                    value={selectedCommunity}
                    onChange={(e) => setSelectedCommunity(e.target.value)}
                    className="w-full pl-1 py-3 bg-white/10 backdrop-blur-sm rounded-xl border-2 border-white/15 text-white focus:outline-none focus:border-green-500 focus:ring-4 focus:ring-green-500/20 transition-all duration-300 appearance-none cursor-pointer group-hover:border-white/30"
                  > <option value="" className="bg-slate-800">Select Community</option>
                    {
                      (community ?? []).map((item:string,key:number)=>{
                        return(
                           
                           <option value={item} key={key} className="bg-slate-800">{item}</option>
                        )
                      })
                    }
                   
                  </select>
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Category Select */}
              <div className="space-y-2 group">
                <label className="text-sm font-semibold text-green-300 uppercase tracking-wide">Category</label>
                <div className="relative">
                  <select 
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm rounded-xl border-2 border-white/15 text-white focus:outline-none focus:border-green-500 focus:ring-4 focus:ring-green-500/20 transition-all duration-300 appearance-none cursor-pointer group-hover:border-white/30"
                  >
                    <option value="" className="bg-slate-800">Select Category</option>
                   {
                      (categorie ?? []).map((item:string,key:number)=>{
                        return(
                           
                           <option value={item} key={key} className="bg-slate-800">{item}</option>
                        )
                      })
                    }
                  </select>
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* State Select */}
              <div className="space-y-2 group">
                <label className="text-sm font-semibold text-green-300 uppercase tracking-wide">State</label>
                <div className="relative">
                  <select 
                    value={selectedState}
                    onChange={(e) => setSelectedState(e.target.value)}
                    className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm rounded-xl border-2 border-white/15 text-white focus:outline-none focus:border-green-500 focus:ring-4 focus:ring-green-500/20 transition-all duration-300 appearance-none cursor-pointer group-hover:border-white/30"
                  >
                    <option value="" className="bg-slate-800">Select State</option>
                   {
                      (state ?? []) .map((item:string,key:number)=>{
                        return(
                           
                           <option value={item} key={key} className="bg-slate-800">{item}</option>
                        )
                      })
                    }
                  </select>
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              
              {/* Search Button */}
              <button 
                onClick={handleSearch}
                className="group relative flex-1 px-8 py-4 bg-green-500 text-white rounded-md font-bold text-lg shadow-2xl shadow-green-500/25 hover:shadow-green-500/40 transform hover:-translate-y-1 hover:scale-[1.02] transition-all duration-300 overflow-hidden"
              >
                <div className="absolute inset-0 bg-green-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span className="relative z-10 flex items-center justify-center gap-3">
                  Search Schemes
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </span>
              </button>

              {/* Reset Button */}
              <button 
                onClick={handleReset}
                className="group relative px-8 py-4 bg-white/10 backdrop-blur-sm rounded-2xl border-2 border-white/20 text-white font-bold text-lg hover:bg-white/20 hover:border-white/30 transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <span>Reset</span>
                <svg className="w-5 h-5 group-hover:rotate-180 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </button>
            </div>

            {/* Quick Stats */}
            
          </div>
        </div>

        {/* Right side - Image Gallery */}
        <div className="relative w-full max-w-[650px] h-[550px] p-10 bg-white hover:shadow-green-500 transition-all duration-500 rounded-l-[300px] shadow-2xl overflow-hidden mx-auto">
          <div className="flex gap-4 lg:gap-6 justify-center items-start">
            
            {/* Left Column - Upwards Scroll */}
            <div className="w-28 sm:w-36 lg:w-44">
              <div className="h-80 lg:h-96 overflow-hidden rounded-2xl">
                <div className="animate-upwards space-y-4 lg:space-y-6">
                  {[...Array(4)].map((_, setIndex) => (
                    <div key={setIndex} className="flex flex-col gap-4 lg:gap-6">
                      <div className="relative group">
                        <img 
                          src={images1[0].one} 
                          alt="Farming" 
                          className="w-full h-32 lg:h-60 object-cover rounded-xl shadow-lg group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="relative group">
                        <img 
                          src={images1[0].two} 
                          alt="Gardening" 
                          className="w-full h-60 lg:h-60 object-cover rounded-xl shadow-lg group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Middle Column - Downwards Scroll */}
            <div className="w-28 sm:w-36 lg:w-44 mt-12">
              <div className="h-80 lg:h-96 overflow-hidden rounded-2xl">
                <div className="animate-downwards space-y-4 lg:space-y-6">
                  {[...Array(4)].map((_, setIndex) => (
                    <div key={setIndex} className="flex flex-col gap-4 lg:gap-6">
                      <div className="relative group">
                        <img 
                          src={images2[0].seven} 
                          alt="Students" 
                          className="w-full h-32 lg:h-60 object-cover rounded-xl shadow-lg group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="relative group">
                        <img 
                          src={images2[0].eight} 
                          alt="Teacher" 
                          className="w-full h-60 lg:h-60 object-cover rounded-xl shadow-lg group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Upwards Scroll */}
            <div className="w-28 sm:w-36 lg:w-44">
              <div className="h-80 lg:h-96 overflow-hidden rounded-2xl">
                <div className="animate-upwards space-y-4 lg:space-y-6">
                  {[...Array(4)].map((_, setIndex) => (
                    <div key={setIndex} className="flex flex-col gap-4 lg:gap-6">
                      <div className="relative group">
                        <img 
                          src={images2[0].seven} 
                          alt="Students" 
                          className="w-full h-40 lg:h-60 object-cover rounded-xl shadow-lg group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="relative group">
                        <img 
                          src={images2[0].eight} 
                          alt="Teacher" 
                          className="w-full h-60 lg:h-60 object-cover rounded-xl shadow-lg group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Floating Elements */}
          <div className="absolute -top-4 -right-4 w-20 h-20 bg-yellow-400 rounded-full opacity-20 animate-pulse"></div>
          <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-green-500 rounded-full opacity-20 animate-pulse" style={{animationDelay: '2s'}}></div>
        </div>
      </div>
      

      {/* Add CSS animations */}
      <style>{`
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        .animate-scroll-up {
          animation: scroll-up 20s linear infinite;
        }
        .animate-scroll-down {
          animation: scroll-down 20s linear infinite;
        }
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        @keyframes scroll-up {
          0% { transform: translateY(0); }
          100% { transform: translateY(-50%); }
        }
        @keyframes scroll-down {
          0% { transform: translateY(-50%); }
          100% { transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default SearchSchemes;