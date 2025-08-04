'use client'

import { useState, useEffect } from 'react'
import MainText from '../../components/MainText'
import NewsSection from '../../components/sections/NewsSection'

const NewsPage = () => {
    const [news, setNews] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchNews()
    }, [])

    const fetchNews = async () => {
        try {
            const response = await fetch('https://rasidweather.com/api/news?country_code=sa')
            const data = await response.json()
            setNews(data.data || [])
        } catch (error) {
            console.error('Error fetching news:', error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="relative pt-32 pb-44 bg-rasid-gray-light">
            {/* Background Shapes */}
            <div className="absolute inset-0 overflow-hidden">
                {/* First Shape - Top Left */}
                <img
                    src="/images/shape1.svg"
                    alt="background shape 1"
                    className="absolute top-40 -right-40 w-120 h-120 opacity-15 -rotate-6"
                />

                {/* Second Shape - Top Right */}
                <img
                    src="/images/shape2.svg"
                    alt="background shape 2"
                    className="absolute top-40 -left-80 w-90 h-90 opacity-15 rotate-12"
                />

                {/* Third Shape - Bottom Center */}
                <img
                    src="/images/shape3.svg"
                    alt="background shape 3"
                    className="absolute bottom-28 left-1/2 transform -translate-x-1/2 w-80 h-80 opacity-15 rotate-45"
                />
            </div>

            {/* Content */}
            <div className="relative z-10 px-4">
                <MainText
                    title="أخر الاخبار"
                    titleHighlight="أخر"
                    titleColor="text-rasid-orange-dark"
                    highlightColor="text-orange-dark"
                    highlightBgColor="bg-rasid-blue"
                    lineColor="bg-rasid-blue"
                    descriptionColor="text-rasid-orange-dark"
                />

                <NewsSection news={news} loading={loading} />
            </div>
        </div>
    )
}

export default NewsPage 