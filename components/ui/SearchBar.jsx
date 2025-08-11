'use client'

import { useState, useEffect } from 'react'
import { Search, MapPin, X } from 'lucide-react'

const SearchBar = ({ onSearch, placeholder = "ابحث عن مدينة..." }) => {
  const [query, setQuery] = useState('')
  const [suggestions, setSuggestions] = useState([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [recentSearches, setRecentSearches] = useState([])
  const [debouncedQuery, setDebouncedQuery] = useState('')

  useEffect(() => {
    const savedSearches = localStorage.getItem('recentSearches')
    if (savedSearches) {
      try {
        setRecentSearches(JSON.parse(savedSearches))
      } catch (error) {
        console.error('Error parsing recent searches:', error)
      }
    }
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query)
    }, 300)

    return () => clearTimeout(timer)
  }, [query])

  const cities = [
    'القاهرة، مصر',
    'الإسكندرية، مصر',
    'الجيزة، مصر',
    'شرم الشيخ، مصر',
    'الأقصر، مصر',
    'أسوان، مصر',
    'بورسعيد، مصر',
    'دمياط، مصر',
    'المنصورة، مصر',
    'طنطا، مصر',
    'الزقازيق، مصر',
    'بنها، مصر',
    'المنوفية، مصر',
    'الشرقية، مصر',
    'الغربية، مصر',
    'كفر الشيخ، مصر',
    'المنيا، مصر',
    'أسيوط، مصر',
    'سوهاج، مصر',
    'قنا، مصر',
    'الأقصر، مصر',
    'أسوان، مصر',
    'البحر الأحمر، مصر',
    'الوادي الجديد، مصر',
    'مطروح، مصر',
    'شمال سيناء، مصر',
    'جنوب سيناء، مصر',
    'بني سويف، مصر',
    'الفيوم، مصر',
    'المنيا، مصر',
  ]

  useEffect(() => {
    if (debouncedQuery.length > 1) {
      const filtered = cities.filter(city =>
        city.toLowerCase().includes(debouncedQuery.toLowerCase())
      ).slice(0, 5)
      setSuggestions(filtered)
      setShowSuggestions(true)
    } else {
      setSuggestions([])
      setShowSuggestions(false)
    }
  }, [debouncedQuery])

  const handleSearch = (searchTerm) => {
    if (searchTerm.trim()) {
      onSearch(searchTerm)
      setQuery('')
      setShowSuggestions(false)
      const newSearch = {
        city: searchTerm,
        timestamp: new Date().toISOString(),
      }
      const updatedSearches = [newSearch, ...recentSearches.filter(s => s.city !== searchTerm)].slice(0, 5)
      setRecentSearches(updatedSearches)
      localStorage.setItem('recentSearches', JSON.stringify(updatedSearches))
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    handleSearch(query)
  }

  const clearSearch = () => {
    setQuery('')
    setSuggestions([])
    setShowSuggestions(false)
  }

  return (
    <div className="relative w-full max-w-md">
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative">
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={placeholder}
            className="w-full pr-10 pl-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/90 backdrop-blur-sm"
            onFocus={() => setShowSuggestions(true)}
          />
          {query && (
            <button
              type="button"
              onClick={clearSearch}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </form>

      {showSuggestions && (suggestions.length > 0 || recentSearches.length > 0) && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-lg shadow-lg border border-gray-200 z-50 max-h-60 overflow-y-auto">
          {recentSearches.length > 0 && query.length <= 1 && (
            <div className="p-2">
              <div className="text-xs font-medium text-gray-500 mb-2 px-2">البحث الأخير</div>
              {recentSearches.map((search, index) => (
                <button
                  key={index}
                  onClick={() => handleSearch(search.city)}
                  className="w-full text-right px-2 py-2 hover:bg-gray-100 rounded flex items-center gap-2 text-sm"
                >
                  <MapPin className="w-4 h-4 text-gray-400" />
                  {search.city}
                </button>
              ))}
            </div>
          )}

          {suggestions.length > 0 && (
            <div className="p-2">
              {recentSearches.length > 0 && query.length <= 1 && (
                <div className="border-t border-gray-200 my-2"></div>
              )}
              <div className="text-xs font-medium text-gray-500 mb-2 px-2">اقتراحات</div>
              {suggestions.map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => handleSearch(suggestion)}
                  className="w-full text-right px-2 py-2 hover:bg-gray-100 rounded flex items-center gap-2 text-sm"
                >
                  <MapPin className="w-4 h-4 text-gray-400" />
                  {suggestion}
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default SearchBar 