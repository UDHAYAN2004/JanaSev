import { useParams } from "react-router-dom"
import { useGetSchemeByIdQuery } from "./Slice"
import { useState, useEffect } from "react"

interface SchemeData {
  title: string
  category: string
  community: string[]
  description?: string
  eligibility?: string
  benefits?: string
  documents?: string
  lastUpdated?: string
  status?: string
}

const ViewSchemes = () => {
  const { id } = useParams()
  const { data, isLoading, isError } = useGetSchemeByIdQuery(id)
  const [activeSection, setActiveSection] = useState("overview")
  const [scheme, setScheme] = useState<SchemeData | null>(null)
  
  const sections = [
    { id: "overview", label: "Overview" },
    { id: "eligibility", label: "Eligibility" },
    { id: "benefits", label: "Benefits" },
    { id: "documents", label: "Required Documents" }
  ]

  useEffect(() => {
    if (data?.data) {
      setScheme(data.data)
    }
  }, [data])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
          <p className="mt-4 text-gray-600">Loading scheme details...</p>
        </div>
      </div>
    )
  }

  if (isError || !scheme) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-5xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Scheme Not Found</h2>
          <p className="text-gray-600">The requested scheme could not be loaded.</p>
          <button 
            onClick={() => window.history.back()}
            className="mt-6 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    )
  }

  // Safely parse category
  const categories = scheme.category ? scheme.category.split(/\s+/) : []
  
  // Get current section content
  const getSectionContent = () => {
    switch(activeSection) {
      case "overview":
        return (scheme.description,
                scheme.apply
        )|| "No overview available."
      case "eligibility":
        return scheme.eligibility || "Eligibility criteria not specified."
      case "benefits":
        return scheme.benefits || "Benefits information not available."
      case "documents":
        return (
          <ul className="list-disc list-inside">
            {scheme.documents?.map((doc, index) => (
              <li key={index} className="text-gray-700 leading-relaxed mb-2">
                {doc}
              </li>
           ))}
         </ul>)
       
      default:
        return "Content not available."
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="mb-6">
          <ol className="flex items-center space-x-2 text-sm text-gray-600">
            <li>
              <a href="/" className="hover:text-green-600 transition-colors">
                Home
              </a>
            </li>
            <li className="text-gray-400">/</li>
            <li>
              <a href="/schemes" className="hover:text-green-600 transition-colors">
                Schemes
              </a>
            </li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-900 font-medium truncate max-w-xs">
              {scheme.title}
            </li>
          </ol>
        </nav>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8  border border-gray-200 p-5">
          {/* Left Column - Scheme Info */}
          <div className="lg:col-span-2">
            {/* Title & Status */}
            <div className="bg-white rounded-xl  p-6 mb-6">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-3">
                    {scheme.title}
                  </h1>
                  
                  {/* Categories */}
                  {categories.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {categories.map((item, index) => (
                        <span 
                          key={index}
                          className="px-4 py-1.5 bg-green-100 text-green-800 text-sm font-medium rounded-full hover:bg-green-200 transition-colors cursor-default"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Communities */}
                  {scheme.community && scheme.community.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      <span className="text-sm text-gray-600 font-medium">Eligible for:</span>
                      {scheme.community.map((item, index) => (
                        <span 
                          key={index}
                          className="px-3 py-1 bg-blue-50 text-blue-700 text-sm rounded-lg border border-blue-100"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Status Badge */}
                {scheme.status && (
                  <div className="flex-shrink-0">
                    <span className={`px-4 py-2 rounded-lg font-medium ${
                      scheme.status.toLowerCase() === 'active' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {scheme.status}
                    </span>
                  </div>
                )}
              </div>

              {/* Last Updated */}
              {scheme.lastUpdated && (
                <div className="mt-6 pt-6 border-t border-gray-100">
                  <p className="text-sm text-gray-500">
                    Last updated: {scheme.lastUpdated}
                  </p>
                </div>
              )}
            </div>

            {/* Content Navigation */}
            <div className="sticky top-4 z-10 bg-white rounded-xl   overflow-hidden mb-6">
              <div className="flex overflow-x-auto scrollbar-hide">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`flex-1 min-w-0 px-6 py-4 text-sm font-medium whitespace-nowrap transition-all ${
                      activeSection === section.id
                        ? 'text-green-600 border-b-2 border-green-600 bg-green-50'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    {section.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Content Section */}
            <div className="bg-white rounded-xl ">
              <h2 className="text-xl font-bold text-gray-900 mb-6">
                {sections.find(s => s.id === activeSection)?.label}
              </h2>
              <div className="prose max-w-none">
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {getSectionContent()}
                </p>
              </div>
            </div>
          </div>

          {/* Right Column - Action Panel */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-gradient-to-l  from-blue-500 via-purple-500 via-white to-green-500 w-90 p-1 rounded-xl ">
               <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Quick Actions
              </h3>
              <div className="space-y-3">
                <button className="w-full px-4 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors flex items-center justify-center gap-2">
                  <span>Apply Now</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>
                <button className="w-full px-4 py-3 border-2 border-green-600 text-green-600 rounded-lg font-medium hover:bg-green-50 transition-colors flex items-center justify-center gap-2">
                  <span>Download Details</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </button>
                <button className="w-full px-4 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
                  <span>Share Scheme</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                  </svg>
                </button>
              </div>
            </div>
           
            </div>

            {/* Help Section */}
            <div className="bg-gradient-to-l  from-blue-500 via-purple-500 via-white to-green-500 p-6 rounded-xl hover: skeleton shrink-0 transition-all">
              <div className="text-green-800 mb-3">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h4 className="text-lg font-semibold text-white mb-2">
                Need Help?
              </h4>
              <p className="text-gray-600 text-sm mb-4">
                Our support team is here to help you with the application process.
              </p>
              <a 
                href="/contact" 
                className="inline-flex items-center text-green-600 hover:text-green-700 font-medium"
              >
                Contact Support
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
            </div>

            {/* Related Info */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">
                Important Notes
              </h4>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-sm text-gray-600">Verify all eligibility criteria before applying</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-sm text-gray-600">Keep all documents ready in digital format</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-sm text-gray-600">Application process may take 7-15 working days</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ViewSchemes