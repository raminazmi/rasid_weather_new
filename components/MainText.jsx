import { MapPin } from 'lucide-react'

const MainText = ({
    title = "",
    titleHighlight = "",
    description = "",
    titleColor = "text-white",
    highlightColor = "text-white",
    highlightBgColor = "bg-rasid-blue",
    descriptionColor = "text-rasid-blue",
    lineColor = "bg-white",
    // إضافة خصائص الموقع الجديدة
    showLocation = false,
    location = "",
    locationIconColor = "text-blue-300",
    date = "",
    showDate = false
}) => {
    return (
        <div className="text-center mb-8 md:mx-4">
            {/* Location and Title Row */}
            <div className="text-center mb-8 md:mx-4">
                {/* Top Lines */}
                <div className="flex items-center justify-center">
                    <h1 className={`text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold ${titleColor} px-4 sm:px-6 pe-4 sm:pe-6 font-custom flex items-center`}>
                        <span className={`${highlightBgColor} w-8 h-8 sm:w-10 sm:h-10 rounded-full ${highlightColor} flex items-end justify-end`}>
                            {titleHighlight}
                        </span>
                        {title.replace(titleHighlight, '')}
                    </h1>
                    <div className={`flex-1 h-[2px] sm:h-[3px] ${lineColor} mt-3`}></div>
                    {location && (
                        <h1 className={`text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold ${titleColor} px-4 sm:px-6 pe-4 sm:pe-6 font-custom flex items-center`}>
                            <div className='flex items-center justify-center gap-2'>
                                <MapPin className={`w-8 h-8 ${locationIconColor}`} />
                                <span className='pb-2'>
                                    {location}
                                </span>
                            </div>
                        </h1>
                    )}


                </div>

                <p className={`${descriptionColor} text-sm sm:text-base font-custom leading-relaxed text-start ms-12 mt-2`}>
                    {description}
                </p>

            </div>
        </div>
    )
}

export default MainText 