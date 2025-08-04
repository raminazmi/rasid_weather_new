# 🌤️ راصد ويذر - Rasid Weather

تطبيق ويب متقدم لعرض معلومات الطقس والتوقعات الجوية مع واجهة مستخدم عربية حديثة.

## ✨ الميزات

- **🌡️ الطقس الحالي**: عرض درجة الحرارة والرطوبة وسرعة الرياح
- **📅 توقعات 7 أيام**: عرض توقعات الطقس لمدة أسبوع كامل
- **⏰ الطقس الساعي**: توقعات مفصلة لكل ساعة
- **📰 أخبار الطقس**: آخر الأخبار والتحديثات الجوية
- **📍 تحديد الموقع**: دعم تحديد الموقع الحالي
- **📱 تصميم متجاوب**: يعمل على جميع الأجهزة

## 🛠️ التقنيات المستخدمة

- **Frontend**: Next.js 14, React 18
- **Styling**: Tailwind CSS
- **State Management**: Redux Toolkit
- **Icons**: Lucide React
- **Fonts**: Custom Arabic Fonts
- **API**: Weather API Integration

## 🚀 التثبيت والتشغيل

### المتطلبات
- Node.js 18+ 
- npm أو yarn

### خطوات التثبيت

1. **استنساخ المشروع**
```bash
git clone https://github.com/raminazmi/rasid_weather.git
cd rasid_weather
```

2. **تثبيت التبعيات**
```bash
npm install
# أو
yarn install
```

3. **تشغيل المشروع**
```bash
npm run dev
# أو
yarn dev
```

4. **فتح المتصفح**
```
http://localhost:3000
```

## 📁 هيكل المشروع

```
rasid_weather/
├── app/                    # Next.js App Router
│   ├── about/             # صفحة من نحن
│   ├── contact/           # صفحة التواصل
│   ├── login/             # صفحة تسجيل الدخول
│   ├── news/              # صفحة الأخبار
│   └── weather/           # صفحة الطقس
├── components/            # مكونات React
│   ├── layout/           # مكونات التخطيط
│   ├── sections/         # أقسام الصفحات
│   └── ui/               # مكونات واجهة المستخدم
├── public/               # الملفات العامة
│   ├── images/           # الصور
│   └── fonts/            # الخطوط
├── store/                # Redux Store
└── styles/               # ملفات CSS
```

## 🎨 المكونات الرئيسية

- **HeroSection**: القسم الرئيسي مع البحث
- **WeatherSection**: عرض الطقس الحالي والساعي
- **WeeklyForecastSection**: توقعات الطقس لمدة 7 أيام
- **LatestNewsSection**: آخر أخبار الطقس
- **WeatherNewsBanner**: بانر دعائي للأخبار

## 🌐 API Integration

المشروع يتكامل مع:
- [Rasid Weather API](https://rasidweather.com/api) - للحصول على بيانات الطقس
- Geolocation API - لتحديد الموقع الحالي

## 📱 التصميم المتجاوب

- **Desktop**: عرض كامل مع جميع الميزات
- **Tablet**: تصميم محسن للشاشات المتوسطة
- **Mobile**: واجهة مخصصة للهواتف المحمولة

## 🔧 التخصيص

### الألوان
يمكن تخصيص الألوان من خلال ملف `tailwind.config.js`:

```javascript
colors: {
  rasid: {
    blue: '#349ACE',
    orange: '#E7815D',
    'blue-light': '#3DBDFF',
    'orange-dark': '#EA5B3E',
  }
}
```

### الخطوط
المشروع يستخدم خطوط عربية مخصصة في `app/globals.css`

## 📄 الترخيص

هذا المشروع مرخص تحت رخصة MIT.

## 🤝 المساهمة

نرحب بمساهماتكم! يرجى:

1. عمل Fork للمشروع
2. إنشاء branch جديد للميزة
3. عمل Commit للتغييرات
4. عمل Push للbranch
5. إنشاء Pull Request

## 📞 التواصل

- **GitHub**: [@raminazmi](https://github.com/raminazmi)
- **Email**: [your-email@example.com]

## 🙏 الشكر

شكراً لجميع المساهمين والمطورين الذين ساعدوا في تطوير هذا المشروع.

---

**راصد ويذر** - تطبيق الطقس العربي الحديث 🌤️ 