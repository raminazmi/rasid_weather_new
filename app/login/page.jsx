'use client'

import { useState } from 'react'
import MainText from '../../components/MainText'

const LoginPage = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        // Handle login submission here
        console.log('Login submitted:', formData)
    }

    return (
        <div className="min-h-screen relative pt-24 pb-44">
            {/* Background Image with hero-bg.png */}
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: 'url(/images/hero-bg.png)' }}
            >
                {/* Dark overlay for better readability */}
                <div className="absolute inset-0 bg-black/40"></div>
            </div>

            {/* Content */}
            <div className="relative z-10 flex flex-col justify-start px-4 py-8">
                {/* Header Section with Lines */}
                <MainText
                    title="جيل الدخول"
                    titleHighlight="تسـ"
                />
                <div className="w-full max-w-md mx-auto">
                    {/* Login Form Card */}
                    <div className="bg-rasid-blue-light bg-opacity-20 backdrop-blur-sm rounded-2xl shadow-2xl p-6 mb-8 border border-gray-700/50">
                        <form onSubmit={handleSubmit} className="space-y-5">
                            {/* Email Field */}
                            <div>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    placeholder="البريد الالكتروني"
                                    className="w-full px-4 py-3 border bg-[#706e75] border-white rounded-xl focus:outline-none focus:ring-2 focus:ring-rasid-blue focus:border-transparent text-right font-custom text-white placeholder-white"
                                    dir="rtl"
                                    required
                                />
                            </div>

                            {/* Password Field */}
                            <div>
                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    placeholder="كلمة المرور"
                                    className="w-full px-4 py-3 border bg-[#706e75] border-white rounded-xl focus:outline-none focus:ring-2 focus:ring-rasid-blue focus:border-transparent text-right font-custom text-white placeholder-white"
                                    dir="rtl"
                                    required
                                />
                            </div>

                            {/* Remember Me & Forgot Password */}
                            <div className="flex items-center justify-between text-white text-sm">
                                <div>
                                </div>
                                <a href="#" className="text-white hover:text-gray-300 transition-colors font-custom">
                                    نسيت كلمة المرور؟
                                </a>
                            </div>

                            {/* Login Button */}
                            <button
                                type="submit"
                                className="w-full bg-rasid-blue hover:bg-rasid-blue/90 text-white font-bold py-3 px-6 rounded-xl transition-colors duration-200 font-custom text-lg shadow-lg"
                            >
                                تسجيل الدخول
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginPage 