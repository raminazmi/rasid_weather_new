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
    showLocation = false,
    location = "",
    locationIconColor = "text-blue-300",
    date = "",
    showDate = false
}) => {
    return (
        <div className="text-center mb-4 md:mb-8 mx-2 md:mx-4">
            <div className="text-center mb-4 md:mb-8">
                <div className="flex items-center justify-center">
                    <h1 className={`text-md sm:text-2xl md:text-3xl lg:text-4xl font-bold ${titleColor} px-4 sm:px-6 pe-4 sm:pe-6 font-custom flex items-center`}>
                        <span className={`${highlightBgColor} w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 rounded-full ${highlightColor} flex items-end justify-end`}>
                            {titleHighlight}
                        </span>
                        {title.replace(titleHighlight, '')}
                    </h1>
                    <div className={`flex-1 h-[1px] sm:h-[2px] md:h-[3px] ${lineColor} mt-2 sm:mt-3`}></div>
                    {location && (
                        <h1 className={`text-sm sm:text-lg md:text-3xl lg:text-4xl font-bold ${titleColor} px-2 sm:px-4 md:px-6 pe-2 sm:pe-4 md:pe-6 font-custom flex items-center`}>
                            <div className='flex items-center justify-center gap-1 sm:gap-2'>
                                <MapPin className={`w-4 h-4 sm:w-6 sm:h-6 md:w-8 md:h-8 ${locationIconColor}`} />
                                <span className='pb-1 sm:pb-2'>
                                    {location}
                                </span>
                            </div>
                        </h1>
                    )}
                </div>
                <p className={`${descriptionColor} text-xs sm:text-sm md:text-base font-custom leading-relaxed text-start ms-8 sm:ms-10 md:ms-12 mt-1 sm:mt-2`}>
                    {description}
                </p>

            </div>
        </div>
    )
}

export default MainText 