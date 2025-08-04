'use client'

import MainText from '../../components/MainText'

const AboutPage = () => {
    return (
        <div className="min-h-screen relative pt-32 pb-44 bg-gradient-to-b from-blue-50 to-blue-100">
            {/* Content */}
            <div className="relative z-10">
                <MainText
                    title="من نحن"
                    titleHighlight="نحن"
                    description="تعرف على فريق راصد ويذر ورسالتنا في توفير معلومات الطقس الدقيقة"
                    titleColor="text-rasid-blue"
                    highlightColor="text-white"
                    highlightBgColor="bg-rasid-orange"
                    lineColor="bg-rasid-orange"
                    descriptionColor="text-gray-600"
                />

                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-white rounded-lg shadow-lg p-8">
                        <h2 className="text-2xl font-bold text-rasid-blue mb-6 font-custom">
                            راصد ويذر
                        </h2>
                        <p className="text-gray-600 leading-relaxed mb-6 font-custom">
                            نحن فريق متخصص في مجال الأرصاد الجوية، نعمل على توفير معلومات الطقس الدقيقة والموثوقة لجميع مناطق المملكة العربية السعودية والمنطقة العربية.
                        </p>
                        <p className="text-gray-600 leading-relaxed mb-6 font-custom">
                            نستخدم أحدث التقنيات والأجهزة المتطورة لتقديم توقعات جوية دقيقة، ونحرص على تحديث المعلومات بشكل مستمر لضمان حصولكم على أحدث البيانات.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                            <div className="text-center">
                                <div className="bg-rasid-blue-light rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                                    <span className="text-2xl">🌤️</span>
                                </div>
                                <h3 className="text-lg font-semibold text-rasid-blue mb-2 font-custom">دقة المعلومات</h3>
                                <p className="text-gray-600 text-sm font-custom">نقدم معلومات طقس دقيقة وموثوقة</p>
                            </div>
                            <div className="text-center">
                                <div className="bg-rasid-orange-light rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                                    <span className="text-2xl">📱</span>
                                </div>
                                <h3 className="text-lg font-semibold text-rasid-blue mb-2 font-custom">سهولة الاستخدام</h3>
                                <p className="text-gray-600 text-sm font-custom">واجهة سهلة وبسيطة للاستخدام</p>
                            </div>
                            <div className="text-center">
                                <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                                    <span className="text-2xl">⚡</span>
                                </div>
                                <h3 className="text-lg font-semibold text-rasid-blue mb-2 font-custom">تحديث مستمر</h3>
                                <p className="text-gray-600 text-sm font-custom">تحديث مستمر للمعلومات والبيانات</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AboutPage 