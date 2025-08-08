'use client'

import MainText from '../../components/MainText'
import { CheckCircle, AlertCircle, Info } from 'lucide-react'

const TermsPage = () => {
    const sections = [
        {
            id: 'general',
            title: 'الأحكام العامة',
            icon: <Info className="w-6 h-6 text-rasid-blue" />,
            content: [
                'مرحباً بكم في تطبيق ومنصة راصد ويذر للطقس والأخبار الجوية.',
                'باستخدامكم لخدماتنا، فإنكم توافقون على الالتزام بهذه الشروط والأحكام.',
                'نحتفظ بالحق في تعديل هذه الشروط في أي وقت دون إشعار مسبق.',
                'يُنصح بمراجعة هذه الصفحة بشكل دوري للاطلاع على أي تحديثات.'
            ]
        },
        {
            id: 'services',
            title: 'الخدمات المقدمة',
            icon: <CheckCircle className="w-6 h-6 text-rasid-green" />,
            content: [
                'نقدم معلومات الطقس والتوقعات الجوية بناءً على مصادر موثوقة.',
                'نوفر أخبار الطقس والتحديثات الجوية المحلية والعالمية.',
                'نقدم خدمات الإشعارات والتنبيهات الجوية.',
                'جميع المعلومات المقدمة هي للاستخدام الشخصي والمرجعي فقط.'
            ]
        },
        {
            id: 'user-responsibilities',
            title: 'مسؤوليات المستخدم',
            icon: <AlertCircle className="w-6 h-6 text-rasid-orange" />,
            content: [
                'يجب استخدام الخدمة بطريقة قانونية ومناسبة.',
                'عدم محاولة اختراق أو تعطيل النظام أو الخدمات.',
                'عدم نشر محتوى مسيء أو غير لائق في التعليقات.',
                'الحفاظ على سرية معلومات الحساب وكلمة المرور.',
                'عدم استخدام الخدمة لأغراض تجارية دون إذن مسبق.'
            ]
        },
        {
            id: 'privacy',
            title: 'الخصوصية وحماية البيانات',
            icon: <CheckCircle className="w-6 h-6 text-rasid-blue" />,
            content: [
                'نحترم خصوصيتكم ونلتزم بحماية بياناتكم الشخصية.',
                'نجمع البيانات الضرورية فقط لتحسين الخدمة.',
                'لا نشارك معلوماتكم الشخصية مع أطراف ثالثة دون موافقتكم.',
                'نستخدم تقنيات الأمان المتقدمة لحماية بياناتكم.',
                'يمكنكم طلب حذف حسابكم وبياناتكم في أي وقت.'
            ]
        },
        {
            id: 'accuracy',
            title: 'دقة المعلومات',
            icon: <Info className="w-6 h-6 text-rasid-orange" />,
            content: [
                'نبذل قصارى جهدنا لتقديم معلومات دقيقة وحديثة.',
                'معلومات الطقس قابلة للتغيير وقد تختلف الأحوال الفعلية عن التوقعات.',
                'لا نتحمل المسؤولية عن أي أضرار ناتجة عن الاعتماد على توقعاتنا.',
                'يُنصح بالرجوع إلى مصادر متعددة لاتخاذ قرارات مهمة تتعلق بالطقس.'
            ]
        },
        {
            id: 'subscription',
            title: 'الاشتراكات والدفع',
            icon: <CheckCircle className="w-6 h-6 text-rasid-green" />,
            content: [
                'نقدم خدمات مجانية ومدفوعة حسب نوع الاشتراك.',
                'الرسوم المستحقة غير قابلة للاسترداد إلا في حالات خاصة.',
                'يتم تجديد الاشتراك تلقائياً ما لم يتم إلغاؤه.',
                'يمكن إلغاء الاشتراك في أي وقت من إعدادات الحساب.',
                'تختلف المزايا والخدمات حسب نوع الاشتراك المختار.'
            ]
        },
        {
            id: 'intellectual-property',
            title: 'الملكية الفكرية',
            icon: <AlertCircle className="w-6 h-6 text-rasid-blue" />,
            content: [
                'جميع المحتويات والتصاميم محمية بحقوق الطبع والنشر.',
                'لا يجوز نسخ أو توزيع المحتوى دون إذن مسبق.',
                'الشعارات والعلامات التجارية مملوكة لشركة راصد ويذر.',
                'يحق للمستخدمين استخدام المحتوى للأغراض الشخصية فقط.'
            ]
        },
        {
            id: 'liability',
            title: 'إخلاء المسؤولية',
            icon: <AlertCircle className="w-6 h-6 text-rasid-red" />,
            content: [
                'الخدمة مقدمة "كما هي" دون أي ضمانات صريحة أو ضمنية.',
                'لا نتحمل المسؤولية عن أي أضرار مباشرة أو غير مباشرة.',
                'لا نضمن عدم انقطاع الخدمة أو خلوها من الأخطاء.',
                'المستخدم يتحمل مسؤولية استخدام المعلومات المقدمة.',
                'نحتفظ بالحق في تعديل أو إيقاف الخدمة في أي وقت.'
            ]
        },
        {
            id: 'contact',
            title: 'التواصل معنا',
            icon: <Info className="w-6 h-6 text-rasid-green" />,
            content: [
                'لأي استفسارات حول هذه الشروط، يرجى التواصل معنا.',
                'يمكنكم زيارة صفحة "تواصل معنا" لإرسال رسائلكم.',
                'نلتزم بالرد على جميع الاستفسارات في أسرع وقت ممكن.',
                'آراؤكم واقتراحاتكم مهمة لنا لتحسين خدماتنا.'
            ]
        }
    ]

    return (
        <div className="min-h-screen relative pt-24 pb-16">
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: 'url(/images/hero-bg.png)' }}
            >
                <div className="absolute inset-0 bg-black/40"></div>
            </div>

            <div className="relative z-10 px-4 py-8">
                <MainText
                    title="شروط والأحكام"
                    titleHighlight="الـ"
                    description="يرجى قراءة هذه الشروط والأحكام بعناية قبل استخدام خدماتنا"
                />

                <div className="max-w-4xl mx-auto">
                    <div className="bg-rasid-blue-light bg-opacity-10 backdrop-blur-sm rounded-2xl shadow-2xl p-6 mb-8 border border-white/20">
                        <div className="text-center mb-6">
                            <h2 className="text-2xl font-bold text-white mb-3 font-custom">
                                مرحباً بكم في راصد ويذر
                            </h2>
                            <p className="text-white/90 leading-relaxed font-custom text-lg">
                                تطبيق شامل للطقس والأخبار الجوية يوفر لكم أحدث المعلومات والتوقعات الجوية مع نظام تنبيهات ذكي
                            </p>
                        </div>

                        <div className="text-center">
                            <div className="inline-flex items-center space-x-2 space-x-reverse bg-rasid-blue/20 px-6 py-3 rounded-full">
                                <Info className="w-5 h-5 text-rasid-blue" />
                                <span className="text-white font-custom">
                                    آخر تحديث: ديسمبر 2024
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6">
                        {sections.map((section, index) => (
                            <div
                                key={section.id}
                                className="bg-white/5 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-white/10 hover:bg-white/10 transition-all duration-300"
                            >
                                <div className="flex items-center space-x-3 space-x-reverse mb-4">
                                    <div className="flex-shrink-0">
                                        {section.icon}
                                    </div>
                                    <h3 className="text-xl font-bold text-white font-custom">
                                        {index + 1}. {section.title}
                                    </h3>
                                </div>

                                <div className="space-y-3">
                                    {section.content.map((item, itemIndex) => (
                                        <div key={itemIndex} className="flex items-start space-x-3 space-x-reverse">
                                            <div className="flex-shrink-0 mt-2">
                                                <div className="w-2 h-2 bg-rasid-orange rounded-full"></div>
                                            </div>
                                            <p className="text-white/90 leading-relaxed font-custom text-right">
                                                {item}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-12 bg-gradient-to-r from-rasid-blue/20 to-rasid-orange/20 backdrop-blur-sm rounded-2xl shadow-lg p-8 border border-white/10">
                        <div className="text-center">
                            <div className="flex justify-center mb-4">
                                <div className="w-16 h-16 bg-rasid-blue/20 rounded-full flex items-center justify-center">
                                    <CheckCircle className="w-8 h-8 text-rasid-blue" />
                                </div>
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-4 font-custom">
                                شكراً لاختياركم راصد ويذر
                            </h3>
                            <p className="text-white/90 leading-relaxed font-custom text-lg mb-6">
                                نسعى دائماً لتقديم أفضل الخدمات الجوية وتحسين تجربتكم معنا
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <a
                                    href="/contact"
                                    className="bg-rasid-blue hover:bg-rasid-blue/90 text-white font-bold py-3 px-8 rounded-xl transition-colors duration-200 font-custom shadow-lg"
                                >
                                    تواصل معنا
                                </a>
                                <a
                                    href="/"
                                    className="bg-rasid-orange hover:bg-rasid-orange/90 text-white font-bold py-3 px-8 rounded-xl transition-colors duration-200 font-custom shadow-lg"
                                >
                                    العودة للرئيسية
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 text-center">
                        <p className="text-white/70 text-sm font-custom">
                            © 2024 راصد ويذر. جميع الحقوق محفوظة. | تم التحديث في ديسمبر 2024
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TermsPage
