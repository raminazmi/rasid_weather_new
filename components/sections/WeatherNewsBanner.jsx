'use client'

import { ArrowLeft } from 'lucide-react'
import CustomButton from '../ui/CustomButton'

const WeatherNewsBanner = () => {
    return (
        <section className="relative w-full h-64 md:h-80 lg:h-96 overflow-hidden rounded-2xl">
            {/* Content Overlay */}
            <div
                className="bg-cover bg-center bg-no-repeat w-full h-full flex items-center justify-start pr-8"
                style={{
                    backgroundImage: "url('/images/bg.svg')"
                }}
            >
                <div className="text-start">
                    {/* Main Text */}
                    <h2 className="text-white text-2xl md:text-3xl lg:text-4xl font-bold font-custom mb-6 leading-tight">
                        لمعرفة المزيد عن اخبار الطقس !
                    </h2>

                    <div className="text-start ms-2 mt-8">
                        <CustomButton
                            text="اعرض الان"
                        />
                    </div>
                </div>
                <div></div>
            </div>
        </section >
    )
}

export default WeatherNewsBanner 