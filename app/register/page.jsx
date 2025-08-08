'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import MainText from '../../components/MainText'
import { register, saveUserData } from '../../utils/api'

const RegisterPage = () => {
    const router = useRouter()
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    })
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
        if (error) setError('')
    }

    const validateForm = () => {
        if (!formData.name.trim()) {
            setError('الاسم مطلوب')
            return false
        }

        if (!formData.email.trim()) {
            setError('البريد الإلكتروني مطلوب')
            return false
        }

        if (!formData.password.trim()) {
            setError('كلمة المرور مطلوبة')
            return false
        }

        if (formData.password.length < 6) {
            setError('كلمة المرور يجب أن تكون 6 أحرف على الأقل')
            return false
        }

        if (formData.password !== formData.confirmPassword) {
            setError('كلمة المرور غير متطابقة')
            return false
        }

        return true
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!validateForm()) {
            return
        }

        setIsLoading(true)
        setError('')

        try {
            const response = await register(formData.name, formData.email, formData.password)

            if (response.success && response.body) {
                saveUserData(response.body)
                router.push('/')
            } else {
                setError(response.message || 'فشل في إنشاء الحساب')
            }
        } catch (error) {
            console.error('Register error:', error)
            setError('حدث خطأ أثناء إنشاء الحساب. يرجى المحاولة مرة أخرى.')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="min-h-screen relative pt-24 pb-44">
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: 'url(/images/hero-bg.png)' }}
            >
                <div className="absolute inset-0 bg-black/40"></div>
            </div>

            <div className="relative z-10 flex flex-col justify-start px-4 py-8">
                <MainText
                    title="حساب جديد"
                    titleHighlight="إنشاء"
                />
                <div className="w-full max-w-md mx-auto">
                    {error && (
                        <div className="bg-red-500 text-white p-3 rounded-lg mb-4 text-center">
                            {error}
                        </div>
                    )}

                    <div className="bg-rasid-blue-light bg-opacity-20 backdrop-blur-sm rounded-2xl shadow-2xl p-6 mb-8 border border-gray-700/50">
                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    placeholder="الاسم الكامل"
                                    className="w-full px-4 py-3 border bg-[#706e75] border-white rounded-xl focus:outline-none focus:ring-2 focus:ring-rasid-blue focus:border-transparent text-right font-custom text-white placeholder-white"
                                    dir="rtl"
                                    required
                                    disabled={isLoading}
                                />
                            </div>

                            <div>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    placeholder="البريد الإلكتروني"
                                    className="w-full px-4 py-3 border bg-[#706e75] border-white rounded-xl focus:outline-none focus:ring-2 focus:ring-rasid-blue focus:border-transparent text-right font-custom text-white placeholder-white"
                                    dir="rtl"
                                    required
                                    disabled={isLoading}
                                />
                            </div>

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
                                    disabled={isLoading}
                                />
                            </div>

                            <div>
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleInputChange}
                                    placeholder="تأكيد كلمة المرور"
                                    className="w-full px-4 py-3 border bg-[#706e75] border-white rounded-xl focus:outline-none focus:ring-2 focus:ring-rasid-blue focus:border-transparent text-right font-custom text-white placeholder-white"
                                    dir="rtl"
                                    required
                                    disabled={isLoading}
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-rasid-blue hover:bg-rasid-blue/90 text-white font-bold py-3 px-6 rounded-xl transition-colors duration-200 font-custom text-lg shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <>
                                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white ml-2"></div>
                                        جاري إنشاء الحساب...
                                    </>
                                ) : (
                                    'إنشاء حساب'
                                )}
                            </button>
                        </form>

                        <div className="mt-6 text-center">
                            <span className="text-white">لديك حساب بالفعل؟ </span>
                            <a
                                href="/login"
                                className="text-rasid-orange hover:text-rasid-orange/80 font-bold transition-colors"
                            >
                                تسجيل الدخول
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RegisterPage
