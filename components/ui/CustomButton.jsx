'use client'

import { ArrowLeft } from 'lucide-react'

const CustomButton = ({
    text = "المزيد",
    onClick,
    disabled = false,
    className = "",
    icon = <ArrowLeft className="w-5 h-5" />,
    variant = "primary" // primary, secondary, danger, success
}) => {
    const baseClasses = "relative rounded-2xl inline-flex items-center justify-between font-custom font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"

    const variantClasses = {
        primary: "bg-rasid-blue text-white hover:bg-rasid-blue-dark",
        secondary: "bg-gray-600 text-white hover:bg-gray-700",
        danger: "bg-red-500 text-white hover:bg-red-600",
        success: "bg-green-500 text-white hover:bg-green-600"
    }

    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`${baseClasses} ${variantClasses[variant]} ${className}`}
        >
            {/* Circle with Icon */}
            <div className="absolute -right-3.5 bg-rasid-orange-dark border-2 border-white w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0">
                {icon}
            </div>
            {/* Main Button Area */}
            <div className="flex items-center gap-3 pe-8 ps-12 py-2 ">
                <span className="text-lg">{text}</span>
            </div>
        </button>
    )
}

export default CustomButton 