'use client'

import { useState } from 'react'
import MainText from '../../components/MainText'

const ContactPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        message: ''
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
        // Handle form submission here
        console.log('Form submitted:', formData)
    }

    return (
        <div className="min-h-screen relative pt-24 pb-44">
            {/* Background Image with Lightning Effect */}
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: 'url(/images/bg_login.svg)' }}
            >
                {/* Dark overlay for better readability */}
                <div className="absolute inset-0 bg-black/40"></div>
            </div>

            {/* Content */}
            <div className="relative z-10 min-h-screen flex flex-col justify-center px-4 py-8">
                {/* Header Section with Lines */}
                <MainText
                    title="تواصل معنا الان"
                    titleHighlight="تو"
                    description="نتشرف بتواصلكم معنا وسيتم الرد على استفساراتكم في أقرب وقت ممكن."
                />
                <div className="w-full max-w-md mx-auto">
                    {/* Contact Form Card */}
                    <div className="bg-[#706e75] backdrop-blur-sm rounded-2xl shadow-2xl p-6 mb-8 border border-gray-700/50">
                        <form onSubmit={handleSubmit} className="space-y-5">
                            {/* Name Field */}
                            <div>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    placeholder="الاسم"
                                    className="w-full px-4 py-3 border bg-[#706e75] border-white rounded-xl focus:outline-none focus:ring-2 focus:ring-rasid-blue focus:border-transparent text-right font-custom text-white placeholder-white"
                                    dir="rtl"
                                />
                            </div>

                            {/* Phone Field */}
                            <div>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    placeholder="رقم الجوال"
                                    className="w-full px-4 py-3 border bg-[#706e75] border-white rounded-xl focus:outline-none focus:ring-2 focus:ring-rasid-blue focus:border-transparent text-right font-custom text-white placeholder-white"
                                    dir="rtl"
                                />
                            </div>

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
                                />
                            </div>

                            {/* Message Field */}
                            <div>
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleInputChange}
                                    placeholder="الرسالة"
                                    rows="5"
                                    className="w-full px-4 py-3 border bg-[#706e75] border-white rounded-xl focus:outline-none focus:ring-2 focus:ring-rasid-blue focus:border-transparent text-right font-custom text-white placeholder-white"
                                    dir="rtl"
                                ></textarea>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                className="w-full bg-rasid-blue hover:bg-rasid-blue/90 text-white font-bold py-3 px-6 rounded-xl transition-colors duration-200 font-custom text-lg shadow-lg"
                            >
                                ارسل رسالتك
                            </button>
                        </form>
                    </div>

                    {/* Or Separator */}
                    <div className="flex items-center justify-center mb-8">
                        <div className="flex-1 h-px bg-white/40"></div>
                        <span className="px-4 text-white font-custom text-lg">او</span>
                        <div className="flex-1 h-px bg-white/40"></div>
                    </div>

                    {/* Social Media Icons */}
                    <div className="flex justify-center space-x-4 space-x-reverse">
                        {/* Snapchat */}
                        <a href="#" className="w-12 h-12 bg-gray-800/60 hover:bg-gray-700/80 rounded-full flex items-center justify-center transition-colors duration-200 border border-gray-600/50">
                            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.746-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24c6.624 0 11.99-5.367 11.99-11.987C24.007 5.367 18.641.001 12.017.001z" />
                            </svg>
                        </a>

                        {/* Facebook */}
                        <a href="#" className="w-12 h-12 bg-gray-800/60 hover:bg-gray-700/80 rounded-full flex items-center justify-center transition-colors duration-200 border border-gray-600/50">
                            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                            </svg>
                        </a>

                        {/* Instagram */}
                        <a href="#" className="w-12 h-12 bg-gray-800/60 hover:bg-gray-700/80 rounded-full flex items-center justify-center transition-colors duration-200 border border-gray-600/50">
                            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                            </svg>
                        </a>

                        {/* Twitter/X */}
                        <a href="#" className="w-12 h-12 bg-gray-800/60 hover:bg-gray-700/80 rounded-full flex items-center justify-center transition-colors duration-200 border border-gray-600/50">
                            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ContactPage 