import Hero from "./Hero";
import education from "../../assets/ed1.png";
import farming from "../../assets/farming.jpg";
import women from "../../assets/women.jpg";
import CountingNumbers from "../../components/CountingNumbers/CountingNumbers";
import { useState, useEffect } from "react";

const Home = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const categories = [
    { name: "Education", count: 10000, color: "blue", icon: "🎓" },
    { name: "Agriculture", count: 10000, color: "green", icon: "🌱" },
    { name: "Women Empowerment", count: 10000, color: "purple", icon: "💪" }
  ];

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-green-50">
      <Hero />
      
      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            How <span className="text-blue-600">JanaSev</span> Helps You
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover tailored government schemes without the hassle. We match you with the perfect opportunities based on your profile and needs.
          </p>
        </div>

        {/* Features Grid */}
        <div className="flex flex-col gap-12 cursor-context-menu">
          {/* Education Card */}
          <div className={`flex justify-start transform transition-all duration-700 ${
            isVisible ? 'translate-x-0 opacity-100' : '-translate-x-20 opacity-0'
          }`}>
            <div className="relative group">
              {/* Background Decoration */}
              <div className="absolute -inset-4 bg-blue-100 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-lg"></div>
              
              <div className="relative flex flex-col lg:flex-row items-center gap-8 rounded-2xl bg-white p-8 shadow-xl hover:shadow-2xl border border-blue-100 hover:border-green-200 transform hover:-translate-y-2 transition-all duration-300 max-w-6xl">
                {/* Icon Container */}
                <div className="flex shrink-0 relative">
                  <div className="absolute -inset-4 bg-blue-200 rounded-full opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
                  <img
                    src={education}
                    alt="Education Schemes"
                    className="relative w-32 h-32 bg-linear-to-br from-blue-100 to-blue-200 rounded-full border-4 border-white shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300"
                  />
                  <div className="absolute -bottom-2 -right-2 bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
                    Education
                  </div>
                </div>
                
                {/* Content */}
                <div className="flex-1 text-center lg:text-left">
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">
                    Smart Education Scheme Matching
                  </h3>
                  <p className="text-lg text-gray-600 leading-relaxed">
                    Get personalized recommendations for scholarships, educational loans, and skill development programs. 
                    We analyze your academic background and career goals to find the perfect government schemes for your educational journey.
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2 justify-center lg:justify-start">
                    <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">Scholarships</span>
                    <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">Student Loans</span>
                    <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">Skill Development</span>
                  </div>
                </div>
                
                {/* Arrow Indicator */}
                <div className="hidden lg:block text-blue-400 group-hover:text-green-500 transform group-hover:translate-x-2 transition-all duration-300">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Farming Card */}
          <div className={`flex justify-center transform transition-all duration-700 delay-200 ${
            isVisible ? 'translate-x-0 opacity-100' : 'translate-x-20 opacity-0'
          }`}>
            <div className="relative group">
              <div className="absolute -inset-4 bg-green-100 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-lg"></div>
              
              <div className="relative flex flex-col lg:flex-row-reverse items-center gap-8 rounded-2xl bg-white p-8 shadow-xl hover:shadow-2xl border border-green-100 hover:border-green-200 transform hover:-translate-y-2 transition-all duration-300 max-w-6xl">
                {/* Icon Container */}
                <div className="flex shrink-0 relative">
                  <div className="absolute -inset-4 bg-green-200 rounded-full opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
                  <img
                    src={farming}
                    alt="Agriculture Schemes"
                    className="relative w-32 h-32 bg-linear-to-br from-green-100 to-green-200 rounded-full border-4 border-white shadow-lg group-hover:scale-110 group-hover:-rotate-3 transition-all duration-300"
                  />
                  <div className="absolute -bottom-2 -right-2 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
                    Agriculture
                  </div>
                </div>
                
                {/* Content */}
                <div className="flex-1 text-center lg:text-right">
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">
                    Comprehensive Farming Support
                  </h3>
                  <p className="text-lg text-gray-600 leading-relaxed">
                    Access subsidies, crop insurance, modern equipment schemes, and market linkage programs. 
                    We help farmers discover relevant agricultural schemes based on land size, crops, and region-specific opportunities.
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2 justify-center lg:justify-end">
                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">Subsidies</span>
                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">Crop Insurance</span>
                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">Equipment</span>
                  </div>
                </div>
                
                {/* Arrow Indicator */}
                <div className="hidden lg:block text-green-400 group-hover:text-green-500 transform group-hover:-translate-x-2 transition-all duration-300">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Women Empowerment Card */}
          <div className={`flex justify-end transform transition-all duration-700 delay-400 ${
            isVisible ? 'translate-x-0 opacity-100' : '-translate-x-20 opacity-0'
          }`}>
            <div className="relative group">
              <div className="absolute -inset-4 bg-purple-100 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-lg"></div>
              
              <div className="relative flex flex-col lg:flex-row items-center gap-8 rounded-2xl bg-white p-8 shadow-xl hover:shadow-2xl border border-purple-100 hover:border-purple-200 transform hover:-translate-y-2 transition-all duration-300 max-w-6xl">
                {/* Icon Container */}
                <div className="flex shrink-0 relative">
                  <div className="absolute -inset-4 bg-purple-200 rounded-full opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
                  <img
                    src={women}
                    alt="Women Empowerment Schemes"
                    className="relative w-32 h-32 bg-linear-to-br from-purple-100 to-purple-200 rounded-full border-4 border-white shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300"
                  />
                  <div className="absolute -bottom-2 -right-2 bg-purple-500 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
                    Women Empowerment
                  </div>
                </div>
                
                {/* Content */}
                <div className="flex-1 text-center lg:text-left">
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">
                    Empowering Women Entrepreneurs
                  </h3>
                  <p className="text-lg text-gray-600 leading-relaxed">
                    Discover business loans, skill development programs, and entrepreneurship schemes designed for women. 
                    We connect you with financial assistance, training programs, and networking opportunities to boost your entrepreneurial journey.
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2 justify-center lg:justify-start">
                    <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-medium">Business Loans</span>
                    <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-medium">Training</span>
                    <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-medium">Networking</span>
                  </div>
                </div>
                
                {/* Arrow Indicator */}
                <div className="hidden lg:block text-purple-400 group-hover:text-purple-500 transform group-hover:translate-x-2 transition-all duration-300">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Statistics Section */}
        <div className="mt-24 mb-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Our <span className="text-blue-600">Impact</span> in Numbers
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Join thousands of beneficiaries who have successfully discovered and applied for government schemes through JanaSev
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {categories.map((category, index) => (
              <div
                key={category.name}
                className={`transform transition-all duration-700 delay-${index * 200} ${
                  isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                }`}
              >
                <div className="relative group">
                  <div className={`absolute -inset-4 bg-${category.color}-100 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-lg`}></div>
                  
                  <div className="relative bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl border border-gray-100 hover:border-green-200 transform hover:-translate-y-2 transition-all duration-300 text-center">
                    {/* Icon */}
                    <div className={`w-20 h-20 mx-auto mb-6 bg-linear-to-br from-${category.color}-100 to-${category.color}-200 rounded-2xl flex items-center justify-center text-3xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                      {category.icon}
                    </div>
                    
                    {/* Counting Numbers */}
                    <div className="mb-4">
                      <div className="text-4xl font-bold text-gray-800">
                        <CountingNumbers 
                          start={0} 
                          end={category.count} 
                        />
                        <span className="text-2xl text-gray-600">+</span>
                      </div>
                    </div>
                    
                    {/* Category Name */}
                    <h3 className={`text-2xl font-bold text-${category.color}-600 mb-2`}>
                      {category.name}
                    </h3>
                    
                    {/* Description */}
                    <p className="text-gray-600">
                      Schemes successfully matched to beneficiaries
                    </p>
                    
                    {/* Decorative Element */}
                    <div className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-linear-to-r from-${category.color}-400 to-${category.color}-600 rounded-full group-hover:w-24 transition-all duration-300`}></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-20">
          <div className="bg-linear-to-r from-blue-500 to-green-500 rounded-2xl p-12 shadow-2xl relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 left-0 w-32 h-32 bg-white rounded-full -translate-x-16 -translate-y-16"></div>
              <div className="absolute bottom-0 right-0 w-32 h-32 bg-white rounded-full translate-x-16 translate-y-16"></div>
            </div>
            
            <div className="relative z-10">
              <h3 className="text-3xl font-bold text-white mb-4">
                Ready to Discover Your Perfect Scheme?
              </h3>
              <p className="text-blue-50 text-xl mb-8 max-w-2xl mx-auto">
                Join thousands of citizens who have found the perfect government schemes through JanaSev's intelligent matching system
              </p>
              <button className="bg-white text-blue-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
                Get Started Today
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;