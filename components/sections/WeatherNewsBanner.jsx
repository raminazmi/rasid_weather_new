'use client'

import { useState } from 'react'
import { ArrowLeft } from 'lucide-react'
import CustomButton from '../ui/CustomButton'

const WeatherNewsBanner = () => {
    const [loading, setLoading] = useState(false)

    const handleClick = () => {
        setLoading(true)
        setTimeout(() => {
            console.log('Navigate to weather news')
            setLoading(false)
        }, 1000)
    }

    return (
        <section className="relative w-full h-40 md:h-60 lg:h-80 overflow-hidden rounded-2xl">
            <div
                className="bg-cover bg-center bg-no-repeat w-full h-full flex items-center justify-start ps-6 md:ps-8"
                style={{
                    backgroundImage: "url('/images/bg.svg')"
                }}
            >
                <div className="text-start">
                    <h2 className="text-white text-lg md:text-3xl lg:text-4xl font-bold font-custom mb-6 leading-tight">
                        لمعرفة المزيد عن اخبار الطقس !
                    </h2>

                    <div className="text-start ms-2 mt-8">
                        <CustomButton
                            text={loading ? "جاري التحميل..." : "اعرض الان"}
                            onClick={handleClick}
                            loading={loading}
                        />
                    </div>
                </div>
                <div></div>
            </div>
        </section >
    )
}

export default WeatherNewsBanner 