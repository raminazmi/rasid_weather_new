'use client'

import Image from 'next/image'

const Footer = () => {
    return (
        <section className="relative bg-rasid-orange">
            {/* Main Orange Section */}
            <section className="relative bg-rasid-orange rounded-t-3xl -top-5">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0" style={{
                        backgroundImage: `radial-gradient(circle, white 1px, transparent 1px)`,
                        backgroundSize: '20px 20px'
                    }} />
                </div>

                <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                        <div className="space-y-8 order-2 lg:order-1">
                            <div className="text-center lg:text-right">
                                <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6 font-custom">
                                    حمل التطبيق الان
                                </h2>

                                <div className="flex sm:flex-row flex-wrap gap-4 justify-center lg:justify-start">
                                    {/* Google Play Button */}
                                    <button className="w-fit flex justify-center items-center bg-white text-black px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors">
                                        <div className="text-left">
                                            <div className="text-xs font-medium">GET IT ON</div>
                                            <div className="text-sm font-bold">GOOGLE PLAY</div>
                                        </div>
                                        <Image
                                            src="/images/google_play.svg"
                                            alt="Google Play"
                                            width={32}
                                            height={32}
                                            className="mr-3"
                                        />
                                    </button>

                                    {/* App Store Button */}
                                    <button className="w-fit flex justify-center items-center bg-white text-black px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors">
                                        <div className="text-left">
                                            <div className="text-xs font-medium">GET IT ON</div>
                                            <div className="text-sm font-bold">APP STORE</div>
                                        </div>
                                        <Image
                                            src="/images/apple.svg"
                                            alt="App Store"
                                            width={32}
                                            height={32}
                                            className="mr-3"
                                        />
                                    </button>
                                </div>
                            </div>

                            <form className="max-w-md mx-auto lg:mx-0">
                                <div className="relative flex items-center bg-white rounded-lg shadow-lg overflow-hidden">
                                    <input
                                        type="email"
                                        placeholder="البريد الالكتروني"
                                        className="flex-1 px-4 py-3 text-gray-800 placeholder-gray-500 focus:outline-none text-right font-custom"
                                        dir="rtl"
                                    />
                                    <button className="bg-rasid-orange-dark hover:bg-rasid-orange text-white px-4 py-3 rounded-e-lg font-medium transition-colors font-custom">
                                        سجل الان
                                    </button>
                                </div>
                            </form>

                            {/* Footer Links */}
                            <div className="flex flex-wrap justify-center lg:justify-start gap-6 text-white">
                                <a href="/" className="hover:text-gray-200 transition-colors font-custom">الرئيسية</a>
                                <div className="w-px h-4 bg-white/30"></div>
                                <a href="/news" className="hover:text-gray-200 transition-colors font-custom">الاخبار</a>
                                <div className="w-px h-4 bg-white/30"></div>
                                <a href="/terms" className="hover:text-gray-200 transition-colors font-custom">الشروط والاحكام</a>
                                <div className="w-px h-4 bg-white/30"></div>
                                <a href="/contact" className="hover:text-gray-200 transition-colors font-custom">تواصل معنا</a>
                            </div>
                        </div>

                        <div className="relative order-1 lg:order-2">
                            <div className="flex justify-center lg:justify-start">
                                <div className="relative">
                                    <div className="relative z-10 -mt-48">
                                        <img src="/images/mobile.svg" alt="mobile" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </section>
    )
}

export default Footer 