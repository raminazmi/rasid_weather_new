'use client'

import MainText from '../../components/MainText'
import NewsSection from '../../components/sections/NewsSection'

const NewsPage = () => {
    return (
        <div className="relative pt-32 pb-44 bg-rasid-gray-light">
            <div className="absolute inset-0 overflow-hidden">
                <img
                    src="/images/shape1.svg"
                    alt="background shape 1"
                    className="absolute top-40 -right-40 w-120 h-120 opacity-15 -rotate-6"
                />

                <img
                    src="/images/shape2.svg"
                    alt="background shape 2"
                    className="absolute top-40 -left-80 w-90 h-90 opacity-15 rotate-12"
                />

                <img
                    src="/images/shape3.svg"
                    alt="background shape 3"
                    className="absolute bottom-28 left-1/2 transform -translate-x-1/2 w-80 h-80 opacity-15 rotate-45"
                />
            </div>

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

                <NewsSection />
            </div>
        </div>
    )
}

export default NewsPage 