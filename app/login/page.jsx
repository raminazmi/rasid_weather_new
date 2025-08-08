'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import MainText from '../../components/MainText'
import { login, loginWithFacebook, loginWithApple, loginWithGoogle, saveUserData } from '../../utils/api'

const LoginPage = () => {
    const router = useRouter()
    const [formData, setFormData] = useState({
        username: '',
        password: ''
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

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        setError('')

        try {
            const response = await login(formData.username, formData.password)

            if (response.success && response.body) {
                saveUserData(response.body)
                router.push('/')
            } else {
                setError(response.message || 'فشل في تسجيل الدخول')
            }
        } catch (error) {
            console.error('Login error:', error)
            setError('حدث خطأ أثناء تسجيل الدخول. يرجى المحاولة مرة أخرى.')
        } finally {
            setIsLoading(false)
        }
    }

    const handleSocialLogin = async (provider, accessToken, id) => {
        setIsLoading(true)
        setError('')

        try {
            let response
            switch (provider) {
                case 'facebook':
                    response = await loginWithFacebook(accessToken, id)
                    break
                case 'apple':
                    response = await loginWithApple(accessToken, id)
                    break
                case 'google':
                    response = await loginWithGoogle(accessToken, id)
                    break
                default:
                    throw new Error('مزود الخدمة غير مدعوم')
            }

            if (response.success && response.body) {
                saveUserData(response.body)
                router.push('/')
            } else {
                setError(response.message || `فشل في تسجيل الدخول عبر ${provider}`)
            }
        } catch (error) {
            console.error(`${provider} login error:`, error)
            setError(`حدث خطأ أثناء تسجيل الدخول عبر ${provider}. يرجى المحاولة مرة أخرى.`)
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
                    title="جيل الدخول"
                    titleHighlight="تسـ"
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
                                    name="username"
                                    value={formData.username}
                                    onChange={handleInputChange}
                                    placeholder="اسم المستخدم أو البريد الإلكتروني"
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

                            <div className="flex items-center justify-between text-white text-sm">
                                <div>
                                </div>
                                <a href="#" className="text-white hover:text-gray-300 transition-colors font-custom">
                                    نسيت كلمة المرور؟
                                </a>
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-rasid-blue hover:bg-rasid-blue/90 text-white font-bold py-3 px-6 rounded-xl transition-colors duration-200 font-custom text-lg shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <>
                                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white ml-2"></div>
                                        جاري تسجيل الدخول...
                                    </>
                                ) : (
                                    'تسجيل الدخول'
                                )}
                            </button>
                        </form>

                        <div className="mt-6">
                            <div className="text-center text-white mb-4">أو قم بتسجيل الدخول عبر</div>
                            <div className="flex justify-center space-x-4 space-x-reverse">
                                <button
                                    onClick={() => handleSocialLogin('facebook', 'demo_token', '1000')}
                                    disabled={isLoading}
                                    className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg transition-colors disabled:opacity-50"
                                >
                                    <img src="/images/facebook.svg" alt="Facebook" className="w-6 h-6" />
                                </button>
                                <button
                                    onClick={() => handleSocialLogin('apple', 'demo_token', '1000')}
                                    disabled={isLoading}
                                    className="bg-black hover:bg-gray-800 text-white p-3 rounded-lg transition-colors disabled:opacity-50"
                                >
                                    <img src="/images/apple.svg" alt="Apple" className="w-6 h-6" />
                                </button>
                                <button
                                    onClick={() => handleSocialLogin('google', 'demo_token', '1000')}
                                    disabled={isLoading}
                                    className="bg-red-600 hover:bg-red-700 text-white p-3 rounded-lg transition-colors disabled:opacity-50"
                                >
                                    G
                                </button>
                            </div>
                        </div>

                        <div className="mt-6 text-center">
                            <span className="text-white">ليس لديك حساب؟ </span>
                            <a
                                href="/register"
                                className="text-rasid-orange hover:text-rasid-orange/80 font-bold transition-colors"
                            >
                                إنشاء حساب جديد
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginPage 