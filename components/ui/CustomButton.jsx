'use client'

import { ArrowLeft } from 'lucide-react'

const CustomButton = ({
    text = "المزيد",
    onClick,
    disabled = false,
    className = "",
    icon = <ArrowLeft className="w-5 h-5" />,
    variant = "primary",
    loading = false
}) => {
    const baseClasses = "relative rounded-xl sm:rounded-2xl inline-flex items-center justify-between font-custom font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"

    const variantClasses = {
        primary: "bg-rasid-blue text-white hover:bg-rasid-blue-dark",
        secondary: "bg-gray-600 text-white hover:bg-gray-700",
        danger: "bg-red-500 text-white hover:bg-red-600",
        success: "bg-green-500 text-white hover:bg-green-600"
    }

    const displayIcon = loading ?
        <div className="animate-spin rounded-full h-4 w-4 sm:h-5 sm:w-5 border-b-2 border-white"></div> :
        icon

    return (
        <button
            onClick={onClick}
            disabled={disabled || loading}
            className={`${baseClasses} ${variantClasses[variant]} ${className}`}
        >
            <div className="absolute -right-2 sm:-right-3.5 bg-rasid-orange-dark border-2 border-white w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center flex-shrink-0">
                {displayIcon}
            </div>
            <div className="flex items-center gap-2 sm:gap-3 pe-6 sm:pe-8 ps-8 sm:ps-12 py-1.5 sm:py-2">
                <span className="text-sm sm:text-lg">{text}</span>
            </div>
        </button>
    )
}

export default CustomButton 