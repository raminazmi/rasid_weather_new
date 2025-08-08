/**
 * دالة مساعدة موحدة لاستدعاء API المحلية
 */

const BASE_URL = typeof window !== 'undefined' ? window.location.origin : ''

/**
 * دالة عامة لاستدعاء API
 * @param {string} endpoint - نقطة نهاية API (مثل '/api/news/home')
 * @param {object} options - خيارات الطلب
 * @returns {Promise<object>} - البيانات المستلمة
 */
export const fetchAPI = async (endpoint, options = {}) => {
    const url = `${BASE_URL}${endpoint}`

    const defaultOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            ...options.headers
        },
        ...options
    }

    try {
        const response = await fetch(url, defaultOptions)

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        }

        const data = await response.json()
        return data
    } catch (error) {
        console.error(`API Error for ${endpoint}:`, error)
        throw error
    }
}

/**
 * دوال مخصصة لكل نوع من أنواع API
 */

// جلب أخبار الصفحة الرئيسية
export const fetchHomeNews = async (countryCode = 'sa') => {
    return await fetchAPI(`/api/news/home?country_code=${countryCode}`)
}

// جلب الأخبار المميزة
export const fetchFeaturedNews = async (countryCode = 'sa') => {
    return await fetchAPI(`/api/news/featured?country_code=${countryCode}`)
}

// جلب أخبار الفيديو
export const fetchVideoNews = async (onlyVideo = '1') => {
    return await fetchAPI(`/api/news/videos?only_video=${onlyVideo}`)
}

// جلب تصنيفات الأخبار
export const fetchNewsCategories = async () => {
    return await fetchAPI('/api/news/categories')
}

// جلب تفاصيل خبر محدد
export const fetchNewsDetail = async (id) => {
    return await fetchAPI(`/api/news/${id}`)
}

// جلب تعليقات مقال
export const fetchComments = async (articleId) => {
    return await fetchAPI(`/api/article/comments?article_id=${articleId}`)
}

// إضافة تعليق جديد
export const addComment = async (commentData) => {
    // إضافة التوكن إلى بيانات التعليق
    const token = getToken()
    const dataWithToken = {
        ...commentData,
        token: token
    }

    return await fetchAPI('/api/article/comments', {
        method: 'POST',
        body: JSON.stringify(dataWithToken)
    })
}

// جلب خطط الاشتراك
export const fetchSubscriptionPlans = async () => {
    return await fetchAPI('/api/subscription/plans')
}

/**
 * دوال تسجيل الدخول والمصادقة
 */

// تسجيل الدخول العادي
export const login = async (username, password) => {
    return await fetchAPI('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify({
            username: username,
            password: password
        })
    })
}

// إنشاء حساب جديد
export const register = async (name, email, password) => {
    return await fetchAPI('/api/auth/register', {
        method: 'POST',
        body: JSON.stringify({
            name: name,
            email: email,
            password: password
        })
    })
}

// تسجيل الدخول عبر فيسبوك
export const loginWithFacebook = async (accessToken, id) => {
    return await fetchAPI('/api/auth/login/social/facebook', {
        method: 'POST',
        body: JSON.stringify({
            access_token: accessToken,
            id: id
        })
    })
}

// تسجيل الدخول عبر آبل
export const loginWithApple = async (accessToken, id) => {
    return await fetchAPI('/api/auth/login/social/apple', {
        method: 'POST',
        body: JSON.stringify({
            access_token: accessToken,
            id: id
        })
    })
}

// تسجيل الدخول عبر جوجل
export const loginWithGoogle = async (accessToken, id) => {
    return await fetchAPI('/api/auth/login/social/google', {
        method: 'POST',
        body: JSON.stringify({
            access_token: accessToken,
            id: id
        })
    })
}

/**
 * دوال إدارة Token و LocalStorage
 */

// حفظ بيانات المستخدم والتوكن في LocalStorage
export const saveUserData = (userData) => {
    if (typeof window !== 'undefined') {
        localStorage.setItem('user_token', userData.token)
        localStorage.setItem('user_data', JSON.stringify(userData))
        localStorage.setItem('expires_in', userData.expires_in)
    }
}

// جلب التوكن من LocalStorage
export const getToken = () => {
    if (typeof window !== 'undefined') {
        return localStorage.getItem('user_token')
    }
    return null
}

// جلب بيانات المستخدم من LocalStorage
export const getUserData = () => {
    if (typeof window !== 'undefined') {
        const userData = localStorage.getItem('user_data')
        return userData ? JSON.parse(userData) : null
    }
    return null
}

// التحقق من صحة التوكن
export const isTokenValid = () => {
    if (typeof window !== 'undefined') {
        const token = getToken()
        const expiresIn = localStorage.getItem('expires_in')

        if (!token || !expiresIn) {
            return false
        }

        // التحقق من انتهاء صلاحية التوكن (يمكن إضافة منطق أكثر تعقيداً هنا)
        return true
    }
    return false
}

// تسجيل الخروج
export const logout = async () => {
    const token = getToken()

    if (token) {
        try {
            await fetchAPI('/api/auth/logout', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
        } catch (error) {
            console.error('Logout API error:', error)
        }
    }

    if (typeof window !== 'undefined') {
        localStorage.removeItem('user_token')
        localStorage.removeItem('user_data')
        localStorage.removeItem('expires_in')
    }
}

// جلب ملف المستخدم الشخصي
export const fetchUserProfile = async () => {
    const token = getToken()

    if (!token) {
        throw new Error('يجب تسجيل الدخول أولاً')
    }

    return await fetchAPI('/api/user', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
}

/**
 * دوال الإعجاب والمفضلة للأخبار
 */

// جلب إعجابات المقال
export const fetchArticleLikes = async (articleId) => {
    return await fetchAPI(`/api/article/likes?article_id=${articleId}`)
}

// تبديل الإعجاب بالمقال
export const toggleArticleLike = async (articleId, like = true) => {
    const token = getToken()
    if (!token) {
        throw new Error('يجب تسجيل الدخول أولاً')
    }

    const formData = new FormData()
    formData.append('article_id', articleId)
    formData.append('like', like ? 'true' : 'false')

    return await fetchAPI('/api/article/like', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`
        },
        body: formData
    })
}

// جلب المقالات المفضلة
export const fetchArticleFavorites = async () => {
    const token = getToken()
    if (!token) {
        throw new Error('يجب تسجيل الدخول أولاً')
    }

    return await fetchAPI('/api/article/favorites', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
}

// تبديل إضافة المقال للمفضلة
export const toggleArticleFavorite = async (articleId, favorite = true) => {
    const token = getToken()
    if (!token) {
        throw new Error('يجب تسجيل الدخول أولاً')
    }

    const formData = new FormData()
    formData.append('article_id', articleId)
    formData.append('favorite', favorite ? 'true' : 'false')

    return await fetchAPI('/api/article/favorite', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`
        },
        body: formData
    })
}
